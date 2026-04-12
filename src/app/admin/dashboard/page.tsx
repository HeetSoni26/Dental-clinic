import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default async function AdminDashboard() {
  const [appointments, leads, patients, doctors] = await Promise.all([
    prisma.appointment.findMany({
      include: { patient: true, service: true, doctor: true },
      orderBy: { date: "desc" },
      take: 5,
    }),
    prisma.contactLead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.patient.count(),
    prisma.doctor.count(),
  ]);

  const stats = [
    { label: "Total Patients", value: patients, icon: "person", color: "blue" },
    { label: "Recent Leads", value: leads.length, icon: "contact_emergency", color: "orange" },
    { label: "Doctors Active", value: doctors, icon: "medical_services", color: "teal" },
    { label: "Pending Appts", value: appointments.filter(a => a.status === "pending").length, icon: "schedule", color: "amber" },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-12">
        <header className="mb-12">
          <h1 className="font-serif text-4xl text-slate-800 mb-2">Practice Insights</h1>
          <p className="text-slate-500 font-sans text-sm tracking-wide uppercase">Real-time Clinical Operations Overview</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-tertiary transition-all">
              <div>
                <p className="font-display text-[10px] text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <div className="font-serif text-3xl text-slate-900">{stat.value}</div>
              </div>
              <span className={`material-symbols-outlined text-4xl text-${stat.color}-500/20 group-hover:text-tertiary transition-colors`}>{stat.icon}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Appointments */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="font-serif text-2xl text-slate-800 mb-8">Recent Appointments</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 font-display text-[10px] text-slate-400 uppercase tracking-widest">Patient</th>
                    <th className="pb-4 font-display text-[10px] text-slate-400 uppercase tracking-widest">Service</th>
                    <th className="pb-4 font-display text-[10px] text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="pb-4 font-display text-[10px] text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {appointments.map((a, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-5 font-medium text-slate-900">{a.patient.name}</td>
                      <td className="py-5 text-sm text-slate-600">{a.service.name}</td>
                      <td className="py-5 text-sm">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          a.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-teal-100 text-teal-700"
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-5 text-right">
                        <button className="material-symbols-outlined text-slate-400 hover:text-tertiary">edit_note</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Leads */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="font-serif text-2xl text-slate-800 mb-8">New Inquiries</h2>
            <div className="flex flex-col gap-6">
              {leads.map((lead, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-tertiary transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2 text-slate-800">
                    <span className="font-medium text-sm">{lead.name}</span>
                    <span className="text-[9px] text-slate-400 uppercase font-sans">{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-2">{lead.message || "Requested clinical consultation."}</p>
                </div>
              ))}
              {leads.length === 0 && <p className="text-slate-400 text-sm italic">No new leads today.</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
