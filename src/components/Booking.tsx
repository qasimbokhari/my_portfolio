export default function Booking() {
  return (
    <section id="booking" className="site-section">
      <div className="contact-inner reveal">
        {/* Section Header */}
        <div className="contact-header">
          <span className="section-label">Schedule</span>
          <h2>
            Book a <em>Consultation</em>
          </h2>
          <p>Skip the back-and-forth emails. Select a time that works for you.</p>
        </div>

        {/* Cal.com Inline Embed */}
        <div className="booking-embed-container">
          <iframe
            src="https://cal.com/qasim-bokhari/30-minute-consultation?embed=true&layout=month_view"
            style={{ width: "100%", height: "700px", border: "none" }}
            title="Book a consultation"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
