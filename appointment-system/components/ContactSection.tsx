export default function ContactSection() {
  return (
    <div id="contact" className="py-20 border-t border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-(--foreground) mb-6">Our Location</h2>
          <div className="bg-[var(--input-bg)] p-6 rounded-xl border border-[var(--card-border)] shadow-sm">
            <p className="text-[var(--primary)] font-bold text-lg mb-2">123/1, Main Road, Galle.</p>
            <p className="text-[var(--text-muted)]">Galle, Sri Lanka</p>
          </div>
        </div>
        <div className="space-y-8">
          <div><h3 className="text-(--foreground) font-bold mb-2 text-lg">Contact</h3><p className="text-[var(--text-muted)]">booking@velora.com</p></div>
          <div><h3 className="text-(--foreground) font-bold mb-2 text-lg">Business Hours</h3><p className="text-[var(--text-muted)]">Mon - Sat: 9:00 AM - 8:00 PM</p></div>
        </div>
      </div>
    </div>
  );
}