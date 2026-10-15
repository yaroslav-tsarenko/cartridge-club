"use client";

import { useEffect, useRef, useState } from "react";

interface PayntWidgetProps {
  checkoutId: string;
  scriptUrl: string;
  integrity?: string;
  shopperResultUrl: string;
  brands?: string;
}

export function PayntWidget({
  checkoutId,
  scriptUrl,
  integrity,
  shopperResultUrl,
  brands = "VISA MASTER AMEX",
}: PayntWidgetProps) {
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Configure OPPWA / PayNT widget options
    (window as any).wpwlOptions = {
      locale: "en",
      style: "plain",
      brandDetection: true,
      showCVVHint: true,
      labels: {
        cvv: "CVC / CVV",
        cardHolder: "Cardholder Name",
      },
      onReady: function () {
        setLoading(false);
      },
    };

    // Load the script
    const script = document.createElement("script");
    script.src = scriptUrl;
    if (integrity) {
      script.integrity = integrity;
      script.crossOrigin = "anonymous";
    }
    script.async = true;

    // Fallback timer in case onReady doesn't fire immediately
    const timer = setTimeout(() => setLoading(false), 2500);

    script.onload = () => {
      // The widget will initialize inside .paymentWidgets
    };

    script.onerror = () => {
      setLoading(false);
      console.error("[PayntWidget] Failed to load payment widget script:", scriptUrl);
    };

    document.body.appendChild(script);

    return () => {
      clearTimeout(timer);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Clean up any stray iframes or widget artifacts
      const widgets = document.querySelectorAll(".wpwl-container");
      widgets.forEach((w) => w.remove());
    };
  }, [scriptUrl, integrity]);

  return (
    <div className="paynt-widget-wrapper w-full">
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 text-center text-sm text-muted">
          <div className="mb-3 h-8 w-8 animate-spin rounded-full border-3 border-cobalt border-t-transparent" />
          <p className="font-medium text-ink">Loading secure payment form…</p>
          <p className="text-xs text-muted mt-1">Connecting to 256-bit encrypted gateway</p>
        </div>
      )}

      <form
        ref={formRef}
        action={shopperResultUrl}
        className="paymentWidgets"
        data-brands={brands}
      />
    </div>
  );
}
