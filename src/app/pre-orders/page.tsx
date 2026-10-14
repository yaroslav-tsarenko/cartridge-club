import { LegalPage, LegalHeading, Mail } from "@/components/site/LegalPage";

export const metadata = { title: "Pre-order Policy — Cartridge Club" };

export default function PreOrderPolicyPage() {
  return (
    <LegalPage title="Pre-order Policy" updated="14 October 2026">
      <p>
        This Policy applies when a customer orders a digital product before its scheduled release or
        before its activation key is available for delivery.
      </p>

      <LegalHeading>1. What a pre-order is</LegalHeading>
      <p>
        1.1 A pre-order is an order for a Digital Product expected to become available at a future
        date. It does not guarantee that a publisher will release the product on the first announced
        date.
      </p>
      <p>
        1.2 The product page identifies the expected Platform, edition, region and release
        information available to us when the order is placed.
      </p>
      <p>
        1.3 The Terms and Conditions, Refund and Cancellation Policy and Digital Delivery and
        Activation Policy also apply to pre-orders.
      </p>

      <LegalHeading>2. Payment</LegalHeading>
      <p>
        2.1 The checkout will state whether payment is taken when the pre-order is placed or at a
        later fulfilment stage.
      </p>
      <p>
        2.2 If payment is taken at order, the displayed total is charged to the selected card or
        Balance. If payment is scheduled later, fulfilment depends on successful authorisation at
        that time.
      </p>
      <p>
        2.3 Card issuer, currency conversion and Balance rules apply in the same way as for in-stock
        products.
      </p>

      <LegalHeading>3. Release dates</LegalHeading>
      <p>
        3.1 Release dates and times are supplied by publishers, Platforms or distributors and may
        vary by country, time zone, edition or Platform.
      </p>
      <p>
        3.2 An advertised date is an estimate unless expressly identified as guaranteed. Publishers
        may postpone, advance or stagger a release.
      </p>
      <p>
        3.3 We will update material release information on the product page or by email where
        reasonably practicable after receiving confirmed information.
      </p>

      <LegalHeading>4. Key delivery</LegalHeading>
      <p>
        4.1 The Key is sent to the order email address after it becomes available to us and the order
        passes payment and security checks.
      </p>
      <p>
        4.2 Delivery may occur before, on or shortly after the official release. We do not control
        the exact time at which a supplier allocates Keys.
      </p>
      <p>
        4.3 A pre-order is not considered delivered merely because payment was taken. Delivery begins
        when a Key, bonus Key, preload or other redeemable entitlement is dispatched or disclosed.
      </p>

      <LegalHeading>5. Preload, early access and bonuses</LegalHeading>
      <p>
        5.1 Preload, beta access, early access and bonus content are included only when expressly
        stated on the Cartridge Club product page for the purchased edition.
      </p>
      <p>
        5.2 Publisher or Platform marketing may describe benefits that are not available through
        every retailer. Only benefits stated by Cartridge Club form part of the order.
      </p>
      <p>
        5.3 Timing and operation of early access or preload are controlled by the relevant publisher
        and Platform, without limiting remedies where the purchased entitlement is not supplied as
        described.
      </p>

      <LegalHeading>6. Cancellation before delivery</LegalHeading>
      <p>
        6.1 You may cancel a pre-order before any Key or redeemable entitlement has been dispatched
        by contacting <Mail />.
      </p>
      <p>
        6.2 An eligible cancellation receives a full refund through the original payment route. For a
        Credits-funded purchase, the corresponding Credits are normally restored to Balance.
        Mandatory refund methods take precedence.
      </p>
      <p>
        6.3 Submit the request as early as possible. A cancellation cannot be treated as pre-delivery
        once automated fulfilment has dispatched the Key following the required immediate-supply
        consent.
      </p>

      <LegalHeading>7. After delivery</LegalHeading>
      <p>
        7.1 Once a Key or entitlement is dispatched, the rules for delivered digital content in the
        Refund and Cancellation Policy apply.
      </p>
      <p>
        7.2 A change of release date after delivery does not automatically create a refund right, but
        we will assess whether the content remains as described and whether mandatory law provides a
        remedy.
      </p>
      <p>
        7.3 Statutory rights relating to a faulty, invalid, revoked or misdescribed Key remain
        unaffected.
      </p>

      <LegalHeading>8. Publisher cancellation or inability to supply</LegalHeading>
      <p>
        8.1 If the publisher cancels the product or we determine that we cannot supply the ordered
        edition or region, we will cancel the affected pre-order.
      </p>
      <p>
        8.2 A cancelled pre-order is refunded in full through the original payment route. A
        Credits-funded purchase normally restores Credits. You are not required to accept a
        replacement product or to accept Credits instead of a refund of a card payment. Mandatory
        legal requirements take precedence.
      </p>
      <p>
        8.3 If only a separable bonus is cancelled, we will provide the remedy required by law having
        regard to the materiality and value of the missing content.
      </p>

      <LegalHeading>9. Material product changes</LegalHeading>
      <p>
        9.1 Publishers may change a title, release model, system requirement, supported language,
        edition content or Platform before release.
      </p>
      <p>
        9.2 Where we learn of a material change before delivery, we will take reasonable steps to
        notify affected customers and offer cancellation where the change means the product no longer
        materially matches the accepted order.
      </p>
      <p>
        9.3 Minor artwork, packaging, release-time or non-material feature changes do not necessarily
        create a cancellation right beyond applicable law.
      </p>

      <LegalHeading>10. Support</LegalHeading>
      <p>
        10.1 Questions, cancellations and delivery reports should be sent to <Mail /> with the order
        number and Account email.
      </p>
      <p>
        10.2 Do not send passwords, authentication codes, full card numbers or card security codes.
      </p>
      <p>10.3 We may require reasonable verification before modifying or refunding a pre-order.</p>
    </LegalPage>
  );
}
