import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";

import { trackEvent } from "../utils/analytics";
import Header from "../components/Header";
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

      <main className="confirm-page-main">
        <div className="confirm-page-container">
          <CheckCircle className="confirm-page-icon animate-pulse" />
          
          <h1 className="confirm-page-title">
            Got it — your request is in.
          </h1>
          
          <p className="confirm-page-text">
            Thanks for reaching out. I personally review every quote request and typically respond within 24 hours with next steps or a few quick questions to scope your project.
          </p>

          <div className="confirm-page-card">
            <h2 className="confirm-page-card-title">
              What happens next
            </h2>
            
            <div className="confirm-page-steps">
              <div className="confirm-page-step">
                <div className="confirm-page-step-num">
                  <span>1</span>
                </div>
                <p className="confirm-page-step-text">
                  I'll review your project details
                </p>
              </div>
              
              <div className="confirm-page-step">
                <div className="confirm-page-step-num">
                  <span>2</span>
                </div>
                <p className="confirm-page-step-text">
                  You'll hear from me on WhatsApp or email within 24 hours
                </p>
              </div>
              
              <div className="confirm-page-step">
                <div className="confirm-page-step-num">
                  <span>3</span>
                </div>
                <p className="confirm-page-step-text">
                  We'll set up a quick call to finalize scope and pricing
                </p>
              </div>
            </div>
          </div>

          <div className="confirm-page-button-group flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => navigate("/")}
              className="confirm-btn-portfolio"
            >
              <span>View Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              href="https://wa.me/923395261532"
              target="_blank"
              rel="noopener noreferrer"
              className="confirm-btn-whatsapp no-underline"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <WhatsAppButton />
    </div>
  );
}
