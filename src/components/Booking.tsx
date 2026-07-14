import Cal from "@calcom/embed-react";

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
          <Cal
            calLink="qasim-bokhari"
            style={{ width: "100%", height: "100%", minHeight: "600px", background: "transparent" }}
            config={{
              layout: "month_view",
            }}
          />
        </div>
      </div>
    </section>
  );
}
