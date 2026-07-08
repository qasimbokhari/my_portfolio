import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import ReactGA from "react-ga4";
import { trackEvent } from "../utils/analytics";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function QuoteConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    if (import.meta.env.PROD) {
      trackEvent("Conversion", "Quote Confirmation Viewed", "Quote Flow");
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] selection:bg-gold selection:text-black">
      <Header />

      <main className="pt-32 pb-20 px-6 md:px-14">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-8 animate-pulse" />
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 italic">
            Got it — your request is in.
          </h1>
          
          <p className="font-sans text-sm md:text-base text-silver font-light leading-relaxed max-w-2xl mx-auto mb-12">
            Thanks for reaching out. I personally review every quote request and typically respond within 24 hours with next steps or a few quick questions to scope your project.
          </p>

          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 mb-12">
            <h2 className="font-display text-xl md:text-2xl text-gold font-light mb-8 italic">
              What happens next
            </h2>
            
            <div className="space-y-6 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <span className="text-gold font-display text-sm">1</span>
                </div>
                <p className="font-sans text-sm text-silver font-light leading-relaxed pt-1">
                  I'll review your project details
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <span className="text-gold font-display text-sm">2</span>
                </div>
                <p className="font-sans text-sm text-silver font-light leading-relaxed pt-1">
                  You'll hear from me on WhatsApp or email within 24 hours
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <span className="text-gold font-display text-sm">3</span>
                </div>
                <p className="font-sans text-sm text-silver font-light leading-relaxed pt-1">
                  We'll set up a quick call to finalize scope and pricing
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 border border-gold/30 text-gold hover:border-gold px-8 py-3 text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 rounded-none bg-transparent hover:bg-gold hover:text-black font-medium"
            >
              <span>View Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              href="https://wa.me/923395261532"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-white text-black hover:bg-gold px-8 py-3 text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 rounded-none font-medium no-underline"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
