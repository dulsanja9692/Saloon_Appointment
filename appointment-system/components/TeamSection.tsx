"use client";

export default function TeamSection() {
  const team = [
    { name: "Sarah Jenkins", role: "Senior Stylist", bg: "bg-pink-500" },
    { name: "David Kim", role: "Color Specialist", bg: "bg-purple-500" },
    { name: "Elena Rossi", role: "Nail Expert", bg: "bg-blue-500" },
  ];

  return (
    <div id="team" className="py-20 bg-(--background) transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-12 text-(--foreground)">
        Our Beauty Experts
      </h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {team.map((member, index) => (
          <div key={index} className="bg-(--card-bg) p-6 rounded-xl border border-(--card-border) flex flex-col items-center text-center hover:transition-transform duration-300 shadow-lg">
            <div className={`w-20 h-20 rounded-full ${member.bg} mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-md`}>
              {member.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-(--foreground)">{member.name}</h3>
            <p className="text-(--primary) text-sm uppercase tracking-widest mt-1">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}