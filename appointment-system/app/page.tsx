import Navbar from '@/components/Navbar';
import AppointmentForm from '@/components/AppointmentForm';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-(--background) transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-(--foreground) mb-4 tracking-tight">
          VELORA
        </h1>
        <p className="text-(--text-muted) tracking-[0.3em] uppercase text-sm mb-8">
          Where Style Meets Elegance
        </p>
        <p className="text-(--foreground) max-w-2xl mx-auto text-lg opacity-80">
          Professional Salon services with a modern touch. Book your appointment online and experience luxury styling.
        </p>
      </div>

      {/* Booking Section */}
      <div id="book-now" className="bg-(--card-bg) py-12 transition-colors duration-300">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-(--foreground)">Book Your Appointment</h2>
        </div>
        <AppointmentForm />
      </div>

      <TeamSection />
      <ContactSection />
    </main>
  );
}