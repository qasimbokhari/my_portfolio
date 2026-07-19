import { useNavigate } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";

import Header from "../components/Header";
import WhatsAppButton from "../components/WhatsAppButton";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#080808] selection:bg-gold selection:text-black">
      <Header />

      <main id="main-content" className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="text-center max-w-2xl">
          <h1 className="font-display text-[clamp(4rem,12vw,9rem)] font-light text-gold leading-none mb-6">
            404
          </h1>
          
          <h2 className="font-sans text-2xl md:text-3xl text-white mb-4">
            Page not found
          </h2>
          
          <p className="font-sans text-silver text-lg mb-12 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 bg-gold text-black px-8 py-4 font-sans font-medium hover:bg-gold/90 transition-colors no-underline"
          >
            <Home className="w-5 h-5" />
            <span>Back to Homepage</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      <WhatsAppButton />
    </div>
  );
}
