import { LegalPage, LegalHeading } from "@/components/site/LegalPage";

export const metadata = { title: "Pre-order Policy — Cartridge Club" };

const EMAIL = "info@cartridge-club.com";

export default function PreOrderPolicyPage() {
  return (
    <LegalPage title="Pre-order Policy" updated="26 August 2026">
      <p>
        This Policy applies when a customer orders a digital product before its scheduled release or
        before its activation key is available for delivery.
      </p>

      <LegalHeading>What a pre-order is</LegalHeading>
      <p>
        A pre-order is an order for a Digital Product expected to become available at a future date. It
        does not guarantee that a publisher will release the product on the first announced date.
      </p>
      <p>The product page identifies the expected Platform, edition, region and release information available to us when the order is placed.</p>
      <p>The Terms and Conditions, Refund Policy and Digital Delivery Policy also apply to pre-orders.</p>

      <LegalHeading>Payment</LegalHeading>
      <p>The checkout will state whether payment is taken when the pre-order is placed or at a later fulfilment stage.</p>
      <p>If payment is taken at order, the displayed total is charged to the selected card or Balance. If payment is scheduled later, fulfilment depends on successful authorisation at that time.</p>
      <p>Card issuer, currency conversion and Balance rules apply in the same way as for in-stock products.</p>

      <LegalHeading>Release dates</LegalHeading>
      <p>Release dates and times are supplied by publishers, Platforms or distributors and may vary by country, time zone, edition or Platform.</p>
      <p>An advertised date is an estimate unless expressly identified as guaranteed. Publishers may postpone, advance or stagger a release.</p>
      <p>We will update material release information on the product page or by email where reasonably practicable after receiving confirmed information.</p>

      <LegalHeading>Key delivery</LegalHeading>
      <p>The Key is sent to the order email address after it becomes available to us and the order passes payment and security checks.</p>
      <p>Delivery may occur before, on or shortly after the official release. We do not control the exact time at which a supplier allocates Keys.</p>
      <p>A pre-order is not considered delivered merely because payment was taken. Delivery begins when a Key, bonus Key, preload or other redeemable entitlement is dispatched or disclosed.</p>

      <LegalHeading>Preload, early access and bonuses</LegalHeading>
      <p>Preload, beta access, early access and bonus content are included only when expressly stated on the Cartridge Club product page for the purchased edition.</p>
      <p>Publisher or Platform marketing may describe benefits that are not available through every retailer. Only benefits stated by Cartridge Club form part of the order.</p>
      <p>Timing and operation of early access or preload are controlled by the relevant publisher and Platform, without limiting remedies where the purchased entitlement is not supplied as described.</p>

      <LegalHeading>Cancellation before delivery</LegalHeading>
      <p>
        You may cancel a pre-order before any Key or redeemable entitlement has been dispatched by
        contacting{" "}
        <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        .
      </p>
      <p>An eligible cancellation receives a full refund to the original payment method. Balance-funded amounts return to Balance and may then be withdrawn under the Balance Terms.</p>
      <p>Submit the request as early as possible. A cancellation cannot be treated as pre-delivery once automated fulfilment has dispatched the Key following the required immediate-supply consent.</p>

      <LegalHeading>After delivery</LegalHeading>
      <p>Once a Key or entitlement is dispatched, the rules for delivered digital content in the Refund Policy apply.</p>
      <p>A change of release date after delivery does not automatically create a refund right, but we will assess whether the content remains as described and whether mandatory law provides a remedy.</p>
      <p>Statutory rights relating to a faulty, invalid, revoked or misdescribed Key remain unaffected.</p>

      <LegalHeading>Publisher cancellation or inability to supply</LegalHeading>
      <p>If the publisher cancels the product or we determine that we cannot supply the ordered edition or region, we will cancel the affected pre-order.</p>
      <p>A cancelled pre-order is refunded in full. We may offer an alternative only as an optional choice; you are not required to accept store credit, Balance or a substitute product.</p>
      <p>If only a separable bonus is cancelled, we will provide the remedy required by law having regard to the materiality and value of the missing content.</p>

      <LegalHeading>Material product changes</LegalHeading>
      <p>Publishers may change a title, release model, system requirement, supported language, edition content or Platform before release.</p>
      <p>Where we learn of a material change before delivery, we will take reasonable steps to notify affected customers and offer cancellation where the change means the product no longer materially matches the accepted order.</p>
      <p>Minor artwork, packaging, release-time or non-material feature changes do not necessarily create a cancellation right beyond applicable law.</p>

      <LegalHeading>Support</LegalHeading>
      <p>Questions, cancellations and delivery reports should be sent to {EMAIL} with the order number and Account email.</p>
      <p>Do not send passwords, authentication codes, full card numbers or card security codes.</p>
      <p>We may require reasonable verification before modifying or refunding a pre-order.</p>
    </LegalPage>
  );
}
