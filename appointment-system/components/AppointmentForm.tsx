"use client";

import { useState, useEffect } from 'react';
import { services } from '@/data/services';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
// ✅ Import the type from the List component
import { IAppointment } from './AppointmentList';

interface Props {
  // ✅ Use the real type instead of 'any'
  appointmentToEdit: IAppointment | null;
  onSuccess: () => void;
}

export default function AppointmentForm({ appointmentToEdit, onSuccess }: Props) {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(services[0]);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', date: '', time: '', notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointmentToEdit) {
      setFormData({
        name: appointmentToEdit.name,
        phone: appointmentToEdit.phone || '',
        email: appointmentToEdit.email || '',
        date: appointmentToEdit.date,
        time: appointmentToEdit.time,
        notes: appointmentToEdit.reason
      });
      const matchedService = services.find(s => s.title === appointmentToEdit.service);
      if (matchedService) setSelectedService(matchedService);
    } else {
      setFormData({ name: '', phone: '', email: '', date: '', time: '', notes: '' });
      setSelectedService(services[0]);
    }
  }, [appointmentToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const finalData = {
      ...formData,
      service: selectedService.title,
      price: selectedService.price, 
      reason: formData.notes || 'Standard Appointment' 
    };

    try {
      let res;
      if (appointmentToEdit) {
        res = await fetch(`/api/appointments/${appointmentToEdit._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        });
      } else {
        res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        });
      }

      if (res.ok) {
        alert(appointmentToEdit ? 'Updated Successfully!' : 'Booked Successfully!');
        onSuccess(); 
        router.refresh();
      } else {
        const err = await res.json();
        alert('Error: ' + (err.error || 'Operation failed'));
      }
    } catch {
      alert('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg p-3 text-[var(--foreground)] placeholder-(--text-muted) focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all";

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 backdrop-blur-sm rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-(--text-muted) mb-2">👤 Full Name</label>
            <input required type="text" className={inputClass} placeholder="Enter your name"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-muted) mb-2">📞 Phone Number</label>
            <input required type="tel" className={inputClass} placeholder="+94 XX XXX XXXX"
              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-(--text-muted) mb-2">✉️ Email Address</label>
            <input required type="email" className={inputClass} placeholder="you@example.com"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
        </div>

        {/* Services */}
        <div id="services">
          <h3 className="text-lg font-semibold text-(--foreground) mb-4">Select Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 relative overflow-hidden
                  ${selectedService.id === service.id 
                    ? 'bg-(--input-bg) border-(--primary) shadow-[0_0_20px_rgba(139,92,246,0.15)]' 
                    : 'bg-(--card-bg) border-(--card-border) opacity-80 hover:opacity-100'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl p-2 bg-(--background) rounded-lg">{service.icon}</span>
                    <div>
                      <h4 className="font-bold text-(--foreground)">{service.title}</h4>
                      <p className="text-(--text-muted) text-sm">{service.duration}</p>
                    </div>
                  </div>
                  <p className="font-bold text-(--primary)">Rs. {service.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-(--text-muted) mb-2">📅 Date</label>
            <input required type="date" className={inputClass}
              value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-muted) mb-2">🕒 Time</label>
            <input required type="time" className={inputClass}
              value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
          </div>
        </div>

        {/* Summary & Button */}
        <div className="bg-(--card-bg) backdrop-blur-md p-6 rounded-xl border border-(--card-border) mt-8 shadow-xl">
          <h4 className="text-lg font-bold text-(--foreground) mb-4">Appointment Summary</h4>
          <div className="flex justify-between items-center mb-3 border-b border-(--card-border) pb-3">
            <span className="text-(--text-muted)">Service</span>
            <span className="text-(--primary) font-medium">{selectedService.title}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-(--text-muted)">Time</span>
            <span className="text-(--foreground)">
              {formData.date || '---'} at {formData.time || '--:--'}
            </span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-(--card-border)">
             <span className="text-xl font-bold text-(--foreground)">Total</span>
             <span className="text-2xl font-bold text-(--primary)">Rs. {selectedService.price}</span>
          </div>

          <button type="submit" disabled={loading}
            className="w-full mt-6 bg-linear-to-r from-(--primary) to-purple-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg disabled:opacity-50">
            {loading ? 'Processing...' : (appointmentToEdit ? 'Update Appointment' : 'Confirm Appointment')}
          </button>
        </div>
      </form>
    </div>
  );
}