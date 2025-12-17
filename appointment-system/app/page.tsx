"use client";

import Navbar from '@/components/Navbar';
import AppointmentForm from '@/components/AppointmentForm';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-36 pb-16 text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-(--foreground) mb-6 tracking-tight drop-shadow-lg">
          VELORA
        </h1>
        <p className="text-(--text-muted) tracking-[0.4em] uppercase text-sm font-medium mb-8">
          Where Style Meets Elegance
        </p>
        <p className="text-(--foreground) max-w-2xl mx-auto text-lg leading-relaxed opacity-90">
          Professional Salon services with a modern touch. Book your appointment online and experience luxury styling redefined.
        </p>
      </motion.div>

      {/* Booking Section */}
      <motion.div 
        id="book-now"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-(--foreground)">Book Your Appointment</h2>
        </div>
        <AppointmentForm />
      </motion.div>

      <TeamSection />
      <ContactSection />
    </main>
  );
}