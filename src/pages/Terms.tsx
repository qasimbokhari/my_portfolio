import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Terms() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] selection:bg-gold selection:text-black">
      <Header />

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="font-sans text-[11px] uppercase tracking-[0.25em] text-silver hover:text-gold transition-colors duration-300 mb-12 cursor-pointer"
          >
            ← Back to Home
          </button>

          <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-4">
            Terms of <span className="italic text-gold">Service</span>
          </h1>

          <p className="font-sans text-sm text-silver mb-12">
            Last updated: July 19, 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="font-display text-xl text-gold mb-4">Services</h2>
              <p className="text-sm text-silver leading-relaxed">
                I provide commercial video production, photography, motion graphics, and brand identity/creative direction services, delivered on a project or package basis as described on the Services page. Specific scope, timeline, and pricing for any project are agreed upon individually between you and me before work begins — nothing on this site constitutes a binding quote until confirmed directly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Bookings & Inquiries</h2>
              <p className="text-sm text-silver leading-relaxed">
                Submitting the contact/quote form or booking a call via Cal.com does not create a contractual obligation on either side. A project only begins once scope, pricing, and timeline are mutually agreed, typically via direct communication (WhatsApp or email) following your inquiry.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Payment</h2>
              <p className="text-sm text-silver leading-relaxed">
                This website does not process payments. Payment terms (deposit requirements, milestones, final payment) are agreed on a per-project basis and communicated directly. All payments are handled off-platform via bank transfer or other mutually agreed methods.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Deliverables & Revisions</h2>
              <p className="text-sm text-silver leading-relaxed">
                The number of revisions, delivery formats, and turnaround times are agreed per project. Delays caused by late client feedback, incomplete assets, or scheduling changes may affect delivery timelines.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Intellectual Property</h2>
              <p className="text-sm text-silver leading-relaxed">
                Unless otherwise agreed in writing, final delivered work (edited video, photos, graphics) is licensed to the client for their intended use upon full payment. I retain the right to display completed work in my portfolio and on social media unless the client requests otherwise in writing (e.g., for confidential/NDA projects).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Cancellations</h2>
              <p className="text-sm text-silver leading-relaxed">
                Cancellation terms (deposits, rescheduling fees) are agreed on a per-project basis at booking.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Limitation of Liability</h2>
              <p className="text-sm text-silver leading-relaxed">
                Services are provided on a professional best-effort basis. I am not liable for indirect or consequential damages arising from the use of delivered work or delays outside my reasonable control (e.g., venue issues, weather, third-party vendor delays at events).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Third-Party Tools</h2>
              <p className="text-sm text-silver leading-relaxed">
                This site uses Cal.com for booking, Brevo for email delivery, and Google Analytics for site analytics (see Privacy Policy) — each governed by their own respective terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Changes to These Terms</h2>
              <p className="text-sm text-silver leading-relaxed">
                These terms may be updated periodically. The "Last updated" date reflects the most recent revision.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Contact</h2>
              <p className="text-sm text-silver leading-relaxed">
                For questions about these terms, email <a href="mailto:contact@qasim.live" className="text-gold hover:underline">contact@qasim.live</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
