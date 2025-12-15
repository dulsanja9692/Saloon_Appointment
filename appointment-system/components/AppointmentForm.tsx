"use client";

import { useState } from 'react';
import { services } from '@/data/services';
import { useRouter } from 'next/navigation';

export default function AppointmentForm() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(services[0]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Format data for backend
    const finalData = {
      name: formData.name,
      date: formData.date,
      time: formData.time,
      service: selectedService.title,
      reason: formData.notes || 'Standard Appointment' 
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        alert('Appointment Confirmed Successfully!');
        setFormData({ name: '', phone: '', email: '', date: '', time: '', notes: '' });
        router.refresh(); 
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch  {
      alert('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-(--input-bg) border border-(--card-border) rounded-lg p-3 text-(--foreground) placeholder-(--text-muted) focus:outline-none focus:border-(--primary) transition-colors";

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-(--text-muted) mb-2">👤 Full Name *</label>
            <input required type="text" className={inputClass} placeholder="Enter your name"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-muted) mb-2">📞 Phone Number *</label>
            <input required type="tel" className={inputClass} placeholder="+94 XX XXX XXXX"
              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-(--text-muted) mb-2">✉️ Email Address</label>
            <input required type="email" className={inputClass} placeholder="velora@email.com"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
        </div>

        {/* Service Selection Cards */}
        <div>
          <h3 className="text-lg font-semibold text-(--foreground) mb-4">Select Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 relative overflow-hidden
                  ${selectedService.id === service.id 
                    ? 'bg-(--input-bg) border-(--primary) shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                    : 'bg-(--card-bg) border-(--card-border) hover:border-(--text-muted)'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h4 className="font-bold text-(--foreground)">{service.title}</h4>
                      <p className="text-(--text-muted) text-sm">{service.duration}</p>
                    </div>
                  </div>
                  <p className="font-bold text-(--foreground)">Rs. {service.price}.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-(--text-muted) mb-2">📅 Appointment Date *</label>
            <input required type="date" className={inputClass}
              value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-(--text-muted) mb-2">🕒 Select Time *</label>
            <input required type="time" className={inputClass}
              value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
          </div>
        </div>

        {/* Notes */}
        <div>
           <label className="block text-sm font-medium text-(--text-muted) mb-2">Additional Notes (Optional)</label>
           <textarea className={inputClass} rows={2} placeholder="Any special requests..."
             value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
        </div>

        {/* Summary & Submit */}
        <div className="bg-(--card-bg) p-6 rounded-xl border border-(--card-border) mt-6">
          <h4 className="text-lg font-bold text-(--foreground) mb-4">Appointment Summary</h4>
          <div className="flex justify-between items-center mb-2 border-b border-(--card-border) pb-2">
            <span className="text-(--text-muted)">Service</span>
            <span className="text-(--primary) font-medium">{selectedService.title}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-(--text-muted)">Date & Time</span>
            <span className="text-(--foreground)">
              {formData.date || '---'} at {formData.time || '--:--'}
            </span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-(--card-border)">
             <span className="text-xl font-bold text-(--foreground)">Total</span>
             <span className="text-xl font-bold text-(--primary)">Rs. {selectedService.price}.00</span>
          </div>

          <button type="submit" disabled={loading}
            className="w-full mt-6 bg-(--primary) text-white font-bold py-4 rounded-lg hover:bg-(--primary-hover) transition-colors disabled:opacity-50">
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </div>

      </form>
    </div>
  );
}