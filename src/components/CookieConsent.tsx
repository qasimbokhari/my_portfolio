import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent";

type ConsentChoice = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(CONSENT_KEY) as ConsentChoice;
    if (saved) {
      setConsent(saved);
    }
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    localStorage.setItem(CONSENT_KEY, "accepted");
    // Dispatch event for App.tsx to initialize GA4
    window.dispatchEvent(new CustomEvent("cookie-consent-accepted"));
  };

  const handleDecline = () => {
    setConsent("declined");
    localStorage.setItem(CONSENT_KEY, "declined");
  };

  if (!mounted || consent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#080808] border-t border-gold/20">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-silver text-sm flex-1">
          This site uses cookies for analytics. By accepting, you consent to GA4 tracking.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 font-sans text-sm text-silver hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 font-sans text-sm bg-gold text-black hover:bg-gold/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
