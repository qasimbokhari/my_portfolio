import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, Instagram } from "lucide-react";
import ReactGA from "react-ga4";
import { trackEvent } from "../utils/analytics";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function NewsletterConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    if (import.meta.env.PROD) {
      trackEvent("Conversion", "Newsletter Confirmation Viewed", "Newsletter Flow");
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] selection:bg-gold selection:text-black">
      <Header />

      <main className="pt-32 pb-20 px-6 md:px-14">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-8 animate-pulse" />
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 italic">
            You're in.
          </h1>
          
          <p className="font-sans text-sm md:text-base text-silver font-light leading-relaxed max-w-2xl mx-auto mb-12">
            Thanks for subscribing — you'll be the first to hear about new work, seasonal discounts, and availability openings. I keep these emails occasional and useful, never spammy.
          </p>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 mb-12">
            <p className="font-sans text-sm text-silver font-light leading-relaxed">
              Keep an eye on your inbox for the next update. In the meantime, feel free to connect on social media for behind-the-scenes content and daily inspiration.
            </p>
          </div>

          <a
            href="https://instagram.com/qasim.arw"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-gold/30 text-gold hover:border-gold px-8 py-3 text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 rounded-none bg-transparent hover:bg-gold hover:text-black font-medium no-underline"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
