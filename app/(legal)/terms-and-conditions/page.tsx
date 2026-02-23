import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Terms & Conditions | IslandLoafStay",
  description: "Business Terms & Conditions for IslandLoafStay (AI CODE AGENCY PVT LTD).",
};

const LAST_UPDATED = "21 Feb 2026";

export default function TermsAndConditionsPage() {
  return (
    <article className="text-gray-700 leading-relaxed">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Business Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm text-gray-500">
          <strong>Last updated:</strong> {LAST_UPDATED}
        </p>
      </header>

      <div className="space-y-8">
        <p>
          These Business Terms &amp; Conditions ("Terms") govern your use of IslandLoafStay / IslandLoaf (the "Service"),
          operated by <strong>AI CODE AGENCY PVT LTD</strong> ("we", "us", "our"). By accessing or using the Service, you
          agree to these Terms.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">1. The Service</h2>
          <p className="mt-3">
            IslandLoafStay provides discovery and booking facilitation for travel-related services (such as stays, tours,
            vehicles, wellness, tickets, and other experiences). Availability, inclusions, and fulfillment may be
            provided by third-party vendors/partners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">2. Eligibility and user responsibilities</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>You must provide accurate information during booking and checkout.</li>
            <li>You agree not to misuse the Service, attempt unauthorized access, or interfere with operations.</li>
            <li>
              You are responsible for reviewing booking details before confirming payment (dates, traveler counts,
              inclusions, pricing).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">3. Pricing, payments, and taxes</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>
              Prices shown may be subject to change until your booking is confirmed and payment is successfully
              completed.
            </li>
            <li>
              Payments are processed by third-party payment processors (e.g., PayHere/Stripe or similar). We do not
              store full card details on our servers.
            </li>
            <li>Any applicable taxes, fees, or service charges may be included in the final amount shown during checkout.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">4. Cancellations, changes, and refunds</h2>
          <p className="mt-3">
            Cancellation and refund eligibility depends on the specific service/vendor terms and the timing of your
            request. Please review our{" "}
            <a className="text-rose-600 hover:text-rose-700 underline underline-offset-2" href="/return-policy">
              Return Policy
            </a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">5. AI-generated content</h2>
          <p className="mt-3">
            The Service may provide AI-generated suggestions. These are for informational purposes only and may be
            incomplete or inaccurate. You should independently verify critical information (availability, safety,
            schedules, and pricing) before making decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">6. Third-party vendors and links</h2>
          <p className="mt-3">
            The Service may reference or connect you with third-party vendors. We are not responsible for third-party
            services, content, or actions. Your bookings may be fulfilled by vendors subject to their policies and
            constraints.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">7. Intellectual property</h2>
          <p className="mt-3">
            The Service, including its design, text, graphics, and software, is owned by or licensed to AI CODE AGENCY
            PVT LTD and is protected by applicable intellectual property laws. You may not copy, modify, or distribute
            any part of the Service without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">8. Disclaimers</h2>
          <p className="mt-3">
            The Service is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we
            disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">9. Limitation of liability</h2>
          <p className="mt-3">
            To the maximum extent permitted by law, AI CODE AGENCY PVT LTD will not be liable for indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits, data, or goodwill arising from your use
            of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">10. Changes to these Terms</h2>
          <p className="mt-3">
            We may update these Terms from time to time. The "Last updated" date indicates when changes were made.
            Continued use of the Service after changes means you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">11. Contact</h2>
          <p className="mt-3">
            Questions about these Terms can be sent to{" "}
            <a className="text-rose-600 hover:text-rose-700 underline underline-offset-2" href="mailto:support@islandloafstay.com">
              support@islandloafstay.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

