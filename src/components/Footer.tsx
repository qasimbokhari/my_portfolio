export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Logo */}
        <div className="font-display text-xl md:text-2xl font-light tracking-[0.1em] text-[#f0ede8]">
          Qasim Bokhari
        </div>

        {/* Center: Social Links */}
        <div className="flex gap-8 items-center">
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

        {/* Right: Legal Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex gap-6 items-center">
            <a
              href="/privacy"
              className="font-sans text-[10px] tracking-[0.2em] text-silver hover:text-gold no-underline transition-colors duration-300 cursor-pointer uppercase"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="font-sans text-[10px] tracking-[0.2em] text-silver hover:text-gold no-underline transition-colors duration-300 cursor-pointer uppercase"
            >
              Terms
            </a>
          </div>
          <div className="text-[10px] tracking-[0.2em] text-silver uppercase">
            © {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
}
