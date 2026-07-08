export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] px-6 md:px-14 py-16 border-t border-white/5">
      {/* Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4 text-center">
        <div className="footer-logo font-display text-xl md:text-2xl font-light tracking-[0.1em] text-[#f0ede8] md:text-left md:justify-self-start">
          Qasim Bokhari
        </div>
        
        <div className="footer-links flex gap-6 md:gap-8 justify-center items-center md:justify-self-center">
          <a
            href="https://instagram.com/qasim.arw"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.15em] text-silver hover:text-gold no-underline transition-colors duration-300 cursor-pointer uppercase font-medium"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/923395261532"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.15em] text-silver hover:text-gold no-underline transition-colors duration-300 cursor-pointer uppercase font-medium"
          >
            WhatsApp
          </a>
          <a
            href="mailto:contact@qasim.live"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.15em] text-silver hover:text-gold no-underline transition-colors duration-300 cursor-pointer uppercase font-medium"
          >
            Email
          </a>
        </div>
        
        <div className="footer-copy text-[10px] tracking-[0.2em] text-silver uppercase md:text-right md:justify-self-end">
          © {currentYear} · Islamabad · All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
