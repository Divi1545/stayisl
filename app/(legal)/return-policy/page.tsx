import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return / Refund Policy | IslandLoafStay",
  description: "Return / Refund Policy for IslandLoafStay (AI CODE AGENCY PVT LTD).",
};

const LAST_UPDATED = "21 Feb 2026";

export default function ReturnPolicyPage() {
  return (
    <article className="text-gray-700 leading-relaxed">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Return / Refund Policy</h1>
        <p className="mt-3 text-sm text-gray-500">
          <strong>Last updated:</strong> {LAST_UPDATED}
        </p>
      </header>

      <div className="space-y-8">
        <p>
          This Return / Refund Policy applies to bookings and purchases made through IslandLoafStay / IslandLoaf (the
          "Service"), operated by <strong>AI CODE AGENCY PVT LTD</strong>.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">1. No physical returns</h2>
          <p className="mt-3">
            IslandLoafStay offers travel-related services (stays, tours, vehicles, wellness, tickets, and experiences).
            Because these are time-bound services, there are generally no "returns" like a physical product. Refunds (if
            any) depend on cancellation eligibility.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">2. Cancellations and refunds</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>
              <strong>Vendor policy applies</strong>: Refund eligibility and amounts depend on the specific vendor/service
              cancellation policy and the timing of your request.
            </li>
            <li>
              <strong>Non-refundable cases</strong>: Some bookings may be non-refundable or partially refundable (e.g., late
              cancellations, no-shows, special promotions).
            </li>
            <li>
              <strong>Changes</strong>: Date/time changes may be treated as a cancellation and rebooking depending on the
              vendor rules and availability.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">3. Refund processing time</h2>
          <p className="mt-3">
            If a refund is approved, we will initiate it to the original payment method. Processing times vary by payment
            provider and bank, and typically take <strong>7–14 business days</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">4. Payment disputes / chargebacks</h2>
          <p className="mt-3">
            If you believe a transaction is unauthorized or incorrect, please contact us first so we can help resolve it.
            Initiating a chargeback may delay resolution and can impact any associated bookings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">5. How to request a cancellation or refund</h2>
          <p className="mt-3">
            Email{" "}
            <a className="text-rose-600 hover:text-rose-700 underline underline-offset-2" href="mailto:support@islandloafstay.com">
              support@islandloafstay.com
            </a>{" "}
            with:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>Your booking reference (if available)</li>
            <li>The email address used for booking</li>
            <li>What you want to cancel/change and why</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">6. Policy updates</h2>
          <p className="mt-3">We may update this policy from time to time. The "Last updated" date indicates when changes were made.</p>
        </section>
      </div>
    </article>
  );
}

