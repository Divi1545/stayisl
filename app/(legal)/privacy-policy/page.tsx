import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | IslandLoafStay",
  description: "Privacy Policy for IslandLoafStay (AI CODE AGENCY PVT LTD).",
};

const LAST_UPDATED = "21 Feb 2026";

export default function PrivacyPolicyPage() {
  return (
    <article className="text-gray-700 leading-relaxed">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-gray-500">
          <strong>Last updated:</strong> {LAST_UPDATED}
        </p>
      </header>

      <div className="space-y-8">
        <p>
          This Privacy Policy explains how <strong>AI CODE AGENCY PVT LTD</strong> ("we", "us", "our") collects, uses,
          shares, and protects information when you use IslandLoafStay / IslandLoaf (the "Service").
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Information we collect</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">
        <li>
          <strong>Information you provide</strong>: name, email address, phone number (if provided), trip preferences,
          traveler counts, dates, notes, and messages you send through the chat/booking flows.
        </li>
        <li>
          <strong>Booking and transaction details</strong>: items in your trip/cart, booking references, and payment
          status information received from payment processors.
        </li>
        <li>
          <strong>Device and usage data</strong>: IP address, browser type, pages viewed, approximate location (derived
          from IP), and basic diagnostics (e.g., errors) to keep the Service reliable.
        </li>
        <li>
          <strong>Cookies and similar technologies</strong>: used for session functionality, preferences, and measuring
          performance. You can control cookies through your browser settings.
        </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">How we use your information</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">
        <li>
          <strong>Provide the Service</strong>: generate recommendations, enable checkout, create and manage bookings,
          and respond to support requests.
        </li>
        <li>
          <strong>Improve and secure the Service</strong>: debug issues, prevent fraud/abuse, and maintain quality.
        </li>
        <li>
          <strong>Communications</strong>: send booking-related messages and important notices.
        </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">How we share information</h2>
          <p className="mt-3">We may share information only as needed to operate the Service, including with:</p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
        <li>
          <strong>Payment processors</strong> (e.g., PayHere/Stripe or similar) to process payments and handle refunds.
        </li>
        <li>
          <strong>Service providers and partners</strong> (e.g., stays/tour operators/transport providers) to fulfill
          your booking requests.
        </li>
        <li>
          <strong>Infrastructure providers</strong> (hosting, analytics, error monitoring) to run the website.
        </li>
        <li>
          <strong>Legal and safety</strong>: if required by law, to protect rights/safety, or to prevent fraud/abuse.
        </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">AI features</h2>
          <p className="mt-3">
            The Service may use AI to generate recommendations and responses based on your prompts and context (such as
            trip preferences and items in your cart). AI output can be inaccurate; please verify critical details
            (availability, inclusions, pricing, schedules) before booking.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Data retention</h2>
          <p className="mt-3">
            We retain information for as long as necessary to provide the Service, comply with legal obligations,
            resolve disputes, and enforce agreements. We may retain certain records longer where required (e.g.,
            payment/booking records).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Your choices</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2">
        <li>
          <strong>Access/update</strong>: you may request access to or correction of certain information.
        </li>
        <li>
          <strong>Delete</strong>: you may request deletion of certain personal data, subject to legal/operational
          requirements.
        </li>
        <li>
          <strong>Cookies</strong>: manage cookies through your browser settings.
        </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Security</h2>
          <p className="mt-3">
            We use reasonable technical and organizational measures to protect information. However, no method of
            transmission or storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
          <p className="mt-3">
            If you have questions or requests about this policy, contact us at{" "}
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

