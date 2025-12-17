"use client";

import Navbar from '@/components/Navbar';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentList from '@/components/AppointmentList';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IAppointment {
  _id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  reason: string;
}

export default function Home() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<IAppointment | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Failed to fetch', error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAppointments();
    })();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      fetchAppointments();
    } catch {
      alert('Failed to delete');
    }
  };

  const handleEdit = (appointment: IAppointment) => {
    setEditingAppointment(appointment);
    document.getElementById('book-now')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSuccess = () => {
    setEditingAppointment(null);
    fetchAppointments();
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="pt-36 pb-16 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-(--foreground) mb-6 tracking-tight drop-shadow-lg">VELORA</h1>
        <p className="text-(--text-muted) tracking-[0.4em] uppercase text-sm font-medium mb-8">Where Style Meets Elegance</p>
      </motion.div>

      <motion.div id="book-now" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-(--foreground)">{editingAppointment ? 'Update Appointment' : 'Book Your Appointment'}</h2>
          {editingAppointment && <button onClick={() => setEditingAppointment(null)} className="text-sm text-(--primary) underline mt-2 hover:opacity-80">Cancel Edit</button>}
        </div>
        <AppointmentForm appointmentToEdit={editingAppointment} onSuccess={handleSuccess} />
      </motion.div>

      <AppointmentList appointments={appointments} onDelete={handleDelete} onEdit={handleEdit} />
      <TeamSection />
      <ContactSection />
    </main>
  );
}