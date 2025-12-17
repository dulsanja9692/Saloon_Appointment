"use client";

import { motion } from 'framer-motion';

interface IAppointment {
  _id: string;
  name: string;
  date: string;
  time: string;
  service: string;
  reason: string;
}

interface Props {
  appointments: IAppointment[];
  onDelete: (id: string) => void;
  onEdit: (apt: IAppointment) => void;
}

export default function AppointmentList({ appointments, onDelete, onEdit }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-8 text-center text-(--foreground)">Scheduled Sessions</h2>
      
      <div className="bg-(--card-bg) backdrop-blur-md rounded-2xl border border-(--card-border) shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-(--background) border-b border-(--card-border)">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-(--text-muted)">Client</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-(--primary)">Service</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-(--text-muted)">Date & Time</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-(--text-muted)">Notes</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-right text-(--text-muted)">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--card-border)">
              {appointments.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-(--text-muted)">No active appointments.</td></tr>
              ) : (
                appointments.map((apt) => (
                  <motion.tr initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={apt._id} className="hover:bg-(--background) transition-colors duration-200">
                    <td className="p-4 font-medium text-(--foreground)">{apt.name}</td>
                    <td className="p-4 text-(--primary) font-semibold">{apt.service}</td>
                    <td className="p-4 text-(--text-muted)">{apt.date} at <span className="text-(--foreground) font-mono text-xs bg-(--card-border) px-2 py-1 rounded ml-1">{apt.time}</span></td>
                    <td className="p-4 text-(--text-muted) italic text-sm">{apt.reason}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => onEdit(apt)} className="text-blue-500 hover:text-blue-600 p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">✏️</button>
                      <button onClick={() => onDelete(apt._id)} className="text-red-500 hover:text-red-600 p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">🗑️</button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}