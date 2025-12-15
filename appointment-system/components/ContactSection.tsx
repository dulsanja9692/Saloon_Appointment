export default function ContactSection() {
  return (
    <div id="contact" className="py-16 border-t border-(--card-border) bg-(--background) transition-colors duration-300">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold text-(--foreground) mb-6">Our Location</h2>
        <div className="bg-(--card-bg) p-6 rounded-xl border border-(--card-border) shadow-sm">
          <p className="text-(--primary) font-bold text-lg mb-2">123/1, Main Road, Galle.</p>
          <p className="text-(--text-muted)">Galle, Sri Lanka</p>
            <div className="mt-4 pt-4 border-t border-(--card-border)">
              <p className="text-(--text-muted) text-sm">Easy to find! Located on Main Road, Galle</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
             <h3 className="text-(--foreground) font-bold mb-2">Contact</h3>
             <p className="text-(--text-muted)">booking@velora.com</p>
             <p className="text-(--text-muted)">+94 74 160 2288</p>
          </div>
          <div>
             <h3 className="text-(--foreground) font-bold mb-2">Business Hours</h3>
             <p className="text-(--text-muted)">Mon - Fri: 9:00 AM - 8:00 PM</p>
             <p className="text-(--text-muted)">Saturday: 10:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12 text-(--text-muted) text-sm">
        © 2025 VELORA. Where Style Meets Elegance.
      </div>
    </div>
  );
}