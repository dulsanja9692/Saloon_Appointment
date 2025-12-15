interface IAppointment {
  _id: string;
  name: string;
  date: string;
  time: string;
  service: string; // ✅ Added service field
  reason: string;
}

interface Props {
  appointments: IAppointment[];
}

export default function AppointmentList({ appointments }: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradien-to-r from-purple-400 to-pink-400">
        Scheduled Sessions
      </h2>
      
      <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-700">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-purple-300">Client Name</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-pink-400">Service Requested</th> {/* ✅ New Header */}
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-purple-300">Date</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-purple-300">Time</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-purple-300">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No active appointments found in the database.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-slate-800/50 transition-colors duration-200 group">
                    <td className="p-4 text-slate-200 font-medium group-hover:text-cyan-400 transition-colors">
                      {apt.name}
                    </td>
                    <td className="p-4 text-pink-400 font-semibold shadow-purple-500/20">
                      {apt.service} {/* ✅ Displaying the Service */}
                    </td>
                    <td className="p-4 text-slate-400">
                      {apt.date}
                    </td>
                    <td className="p-4 text-cyan-500 font-mono">
                      {apt.time}
                    </td>
                    <td className="p-4 text-slate-300 italic">
                      {apt.reason}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        </div>
    </div>
  );
}