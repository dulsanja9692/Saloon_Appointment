"use client";
import { motion } from 'framer-motion';

export default function TeamSection() {
  const team = [
    { name: "Sarah Jenkins", role: "Senior Stylist", color: "from-pink-500 to-rose-500" },
    { name: "David Kim", role: "Color Specialist", color: "from-purple-500 to-indigo-500" },
    { name: "Elena Rossi", role: "Nail Expert", color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <div id="team" className="py-24">
      <h2 className="text-3xl font-bold text-center mb-16 text-(--foreground)">
        Our Experts
      </h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {team.map((member, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-(--card-bg) backdrop-blur-md p-8 rounded-2xl border border-(--card-border) flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg"
          >
            <div className={`w-24 h-24 rounded-full bg-linear-to-r ${member.color} mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-md`}>
              {member.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-(--foreground)">{member.name}</h3>
            <p className="text-(--primary) text-sm uppercase tracking-widest mt-2">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}