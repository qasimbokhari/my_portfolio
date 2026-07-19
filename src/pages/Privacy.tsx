import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Privacy() {
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
            Privacy <span className="italic text-gold">Policy</span>
          </h1>

          <p className="font-sans text-sm text-silver mb-12">
            Last updated: July 19, 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="font-display text-xl text-gold mb-4">Information I Collect</h2>
              <div className="space-y-4 text-sm text-silver leading-relaxed">
                <p>
                  <strong className="text-white">Contact/Quote Form:</strong> When you submit the contact form, I collect your name, email address, phone number (optional), project type, preferred date (optional), and message details. This information is sent via email through Brevo directly to me and is used solely to respond to your inquiry.
                </p>
                <p>
                  <strong className="text-white">Analytics:</strong> With your consent, Google Analytics (GA4) tracks pages viewed, general location, device type, and referral source. This data is anonymized and aggregated — it does not identify you personally. Analytics only runs if you accept the cookie consent banner.
                </p>
                <p>
                  <strong className="text-white">Booking:</strong> When you book a consultation via Cal.com, that service handles your booking data directly under their own privacy policy. I do not store booking information on this site.
                </p>
                <p>
                  <strong className="text-white">Cookies:</strong> A single localStorage entry remembers your cookie consent choice (accepted or declined). No tracking cookies are set until you explicitly consent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">How I Use Information</h2>
              <p className="text-sm text-silver leading-relaxed">
                Your information is used only to respond to your inquiry and, if you become a client, to deliver agreed-upon work. I do not sell, rent, or share your data with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Third-Party Services</h2>
              <div className="space-y-3 text-sm text-silver leading-relaxed">
                <p>
                  <strong className="text-white">Brevo:</strong> Used for email delivery. Governed by Brevo's privacy policy.
                </p>
                <p>
                  <strong className="text-white">Google Analytics:</strong> Used for site analytics, only with your consent. Governed by Google's privacy policy.
                </p>
                <p>
                  <strong className="text-white">Cal.com:</strong> Used for booking consultations. Governed by Cal.com's privacy policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Data Retention</h2>
              <p className="text-sm text-silver leading-relaxed">
                Contact form submissions are retained only as long as needed to respond to your inquiry or complete a project, unless you request deletion sooner.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Your Rights</h2>
              <p className="text-sm text-silver leading-relaxed">
                You may request access, correction, or deletion of your personal data by emailing <a href="mailto:contact@qasim.live" className="text-gold hover:underline">contact@qasim.live</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Changes to This Policy</h2>
              <p className="text-sm text-silver leading-relaxed">
                This policy may be updated periodically. The "Last updated" date reflects the most recent revision.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-gold mb-4">Contact</h2>
              <p className="text-sm text-silver leading-relaxed">
                For privacy-related questions, email <a href="mailto:contact@qasim.live" className="text-gold hover:underline">contact@qasim.live</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
