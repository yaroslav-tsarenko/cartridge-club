/**
 * PayNT / OPPWA Copy & Pay Gateway Client
 * Documentation: https://paynt.docs.oppwa.com/integrations/widget
 */

// Default configuration based on PayNT / OPPWA standards
export const PAYNT_BASE_URL = (
  process.env.PAYNT_BASE_URL || "https://eu-test.oppwa.com"
).replace(/\/+$/, "");

export const PAYNT_ENTITY_ID =
  process.env.PAYNT_ENTITY_ID || "8ac9a4c9a0ce496501a10b62873b1817";

export const PAYNT_BEARER_TOKEN = process.env.PAYNT_BEARER_TOKEN || "";

export const PAYNT_WEBHOOK_SECRET = process.env.PAYNT_WEBHOOK_SECRET || "";

export interface PrepareCheckoutParams {
  amount: number;
  currency: string;
  merchantTransactionId: string;
  customer?: {
    email?: string;
    givenName?: string;
    surname?: string;
  };
  billing?: {
    street1?: string;
    city?: string;
    postcode?: string;
    country?: string;
  };
  shopperResultUrl?: string;
}

export interface PrepareCheckoutResult {
  checkoutId: string;
  integrity?: string;
  scriptUrl: string;
  baseUrl: string;
  raw?: Record<string, any>;
}

export interface PaymentStatusResult {
  id: string;
  paymentType: string;
  paymentBrand?: string;
  amount: string;
  currency: string;
  descriptor?: string;
  result: {
    code: string;
    description: string;
  };
  merchantTransactionId?: string;
  card?: {
    bin?: string;
    last4Digits?: string;
    holder?: string;
    expiryMonth?: string;
    expiryYear?: string;
  };
  customer?: {
    email?: string;
  };
  raw: Record<string, any>;
}

/**
 * Checks if an OPPWA transaction result code indicates success.
 * Pattern per OPPWA documentation: /^(000\.000\.|000\.100\.1|000\.[36])/
 * Specifically includes:
 *  - 000.000.000: Transaction succeeded
 *  - 000.100.110 / 000.100.112: Request successfully processed in 'Merchant in Integrator Mode'
 */
export function isPaymentSuccessful(code: string): boolean {
  if (!code) return false;
  return /^(000\.000\.|000\.100\.1|000\.[36])/.test(code);
}

/**
 * Checks if an OPPWA transaction result code indicates a pending transaction.
 * Pattern: /^(000\.200)/
 */
export function isPaymentPending(code: string): boolean {
  if (!code) return false;
  return /^(000\.200)/.test(code);
}

function getValidToken(): string {
  const token = (process.env.PAYNT_BEARER_TOKEN || "").trim();
  if (!token || token === "ВАШ_BEARER_TOKEN" || /[^\x00-\x7F]/.test(token)) {
    throw new Error(
      "PAYNT_BEARER_TOKEN не настроен. Пожалуйста, укажите реальный API Bearer Token шлюза PayNT в файле .env (сейчас там заглушка с русскими буквами)."
    );
  }
  return token;
}

/**
 * Step 1: Prepare Checkout
 * Server-to-server POST request to /v1/checkouts
 */
export async function prepareCheckout(
  params: PrepareCheckoutParams
): Promise<PrepareCheckoutResult> {
  const token = getValidToken();

  const endpoint = `${PAYNT_BASE_URL}/v1/checkouts`;

  const body = new URLSearchParams();
  body.set("entityId", PAYNT_ENTITY_ID);
  body.set("amount", params.amount.toFixed(2));
  body.set("currency", params.currency.toUpperCase());
  body.set("paymentType", "DB");
  body.set("integrity", "true");
  body.set("merchantTransactionId", params.merchantTransactionId);

  if (params.customer?.email) body.set("customer.email", params.customer.email);
  if (params.customer?.givenName) body.set("customer.givenName", params.customer.givenName);
  if (params.customer?.surname) body.set("customer.surname", params.customer.surname);

  if (params.billing?.street1) body.set("billing.street1", params.billing.street1);
  if (params.billing?.city) body.set("billing.city", params.billing.city);
  if (params.billing?.postcode) body.set("billing.postcode", params.billing.postcode);
  if (params.billing?.country) {
    body.set("billing.country", toCountryCode2(params.billing.country));
  }

  if (params.shopperResultUrl) {
    body.set("shopperResultUrl", params.shopperResultUrl);
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.id) {
    const errorMsg =
      data?.result?.description ||
      data?.message ||
      `PayNT prepare checkout failed with HTTP ${res.status}`;
    console.error("[PayNT] prepareCheckout error:", data || res.statusText);
    throw new Error(errorMsg);
  }

  const checkoutId = data.id as string;
  const integrity = data.integrity as string | undefined;
  const scriptUrl = `${PAYNT_BASE_URL}/v1/paymentWidgets.js?checkoutId=${checkoutId}`;

  return {
    checkoutId,
    integrity,
    scriptUrl,
    baseUrl: PAYNT_BASE_URL,
    raw: data,
  };
}

/**
 * Step 3: Get Payment Status
 * Server-to-server GET request to {baseUrl}{resourcePath}?entityId={entityId}
 */
export async function getPaymentStatus(
  resourcePath: string
): Promise<PaymentStatusResult> {
  const token = getValidToken();

  const cleanPath = resourcePath.startsWith("/") ? resourcePath : `/${resourcePath}`;
  const url = new URL(`${PAYNT_BASE_URL}${cleanPath}`);
  url.searchParams.set("entityId", PAYNT_ENTITY_ID);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.result) {
    const errorMsg =
      data?.result?.description ||
      data?.message ||
      `PayNT status check failed with HTTP ${res.status}`;
    console.error("[PayNT] getPaymentStatus error:", data || res.statusText);
    throw new Error(errorMsg);
  }

  return {
    id: data.id,
    paymentType: data.paymentType,
    paymentBrand: data.paymentBrand,
    amount: data.amount,
    currency: data.currency,
    descriptor: data.descriptor,
    result: {
      code: data.result.code,
      description: data.result.description,
    },
    merchantTransactionId: data.merchantTransactionId,
    card: data.card,
    customer: data.customer,
    raw: data,
  };
}

/**
 * Maps common country names to 2-letter ISO 3166-1 alpha-2 codes.
 */
export function toCountryCode2(country: string): string {
  if (!country) return "GB";
  const trimmed = country.trim();
  if (trimmed.length === 2) return trimmed.toUpperCase();

  const map: Record<string, string> = {
    "united kingdom": "GB",
    "great britain": "GB",
    "england": "GB",
    "scotland": "GB",
    "wales": "GB",
    "ireland": "IE",
    "united states": "US",
    "usa": "US",
    "canada": "CA",
    "australia": "AU",
    "new zealand": "NZ",
    "germany": "DE",
    "france": "FR",
    "spain": "ES",
    "italy": "IT",
    "netherlands": "NL",
    "belgium": "BE",
    "luxembourg": "LU",
    "austria": "AT",
    "switzerland": "CH",
    "portugal": "PT",
    "denmark": "DK",
    "sweden": "SE",
    "norway": "NO",
    "finland": "FI",
    "iceland": "IS",
    "poland": "PL",
    "czech republic": "CZ",
    "czechia": "CZ",
    "slovakia": "SK",
    "hungary": "HU",
    "romania": "RO",
    "bulgaria": "BG",
    "greece": "GR",
    "croatia": "HR",
    "slovenia": "SI",
    "estonia": "EE",
    "latvia": "LV",
    "lithuania": "LT",
    "ukraine": "UA",
    "turkey": "TR",
    "united arab emirates": "AE",
    "saudi arabia": "SA",
    "israel": "IL",
    "japan": "JP",
    "south korea": "KR",
    "singapore": "SG",
    "hong kong": "HK",
    "malaysia": "MY",
    "thailand": "TH",
    "philippines": "PH",
    "indonesia": "ID",
    "india": "IN",
    "brazil": "BR",
    "mexico": "MX",
    "argentina": "AR",
    "chile": "CL",
    "south africa": "ZA",
  };

  return map[trimmed.toLowerCase()] || "GB";
}
