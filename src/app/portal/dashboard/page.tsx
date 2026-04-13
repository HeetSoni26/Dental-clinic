"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

export default function PortalDashboard() {
  const history = [
    { date: "Aug 12, 2024", procedure: "Enamel Micro-abrasion", specialist: "Dr. Sarah Mitchell", status: "Completed" },
    { date: "Jun 04, 2024", procedure: "Deep Tissue Cleaning", specialist: "Hygienist Miller", status: "Completed" },
    { date: "Feb 19, 2024", procedure: "Initial Consultation", specialist: "Dr. James Chen", status: "Completed" },
  ];

  const records = [
    { title: "X-Ray Scans (Panoramic)", date: "Aug 2024", size: "4.2 MB", icon: "picture_as_pdf" },
    { title: "Post-Op Instructions", date: "Aug 2024", size: "1.1 MB", icon: "description" },
    { title: "Oral Care Plan 2024", date: "Feb 2024", size: "2.8 MB", icon: "picture_as_pdf" },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl text-primary mb-4 tracking-tight">Welcome back, Priya 👋</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Your oral health journey is our priority. Explore your clinical records, upcoming appointments, and exclusive loyalty rewards below.
          </p>
        </div>
        
        {/* Loyalty Badge */}
        <div className="bg-secondary-container p-6 rounded-xl flex items-center gap-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center text-white shadow-inner">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          </div>
          <div>
            <div className="font-display text-[10px] text-on-secondary-container tracking-widest uppercase mb-1">Platinum Member</div>
            <div className="font-serif text-2xl text-primary">1,250 Points</div>
          </div>
        </div>
      </header>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Upcoming Appointment */}
        <div className="md:col-span-8 bg-white p-8 rounded-xl relative overflow-hidden group editorial-shadow">
          <div className="absolute top-0 right-0 p-8">
            <span className="material-symbols-outlined text-surface-container-highest text-8xl opacity-10">calendar_today</span>
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-2xl text-primary mb-6">Upcoming Appointment</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="bg-surface-container-low p-6 rounded-lg min-w-[200px] text-center border border-outline-variant/10">
                <div className="font-display text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">October</div>
                <div className="font-serif text-5xl text-primary mb-1">24</div>
                <div className="font-sans text-xs text-on-surface-variant">Thursday, 10:30 AM</div>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-primary mb-1">Routine Dental Prophylaxis</h3>
                <p className="text-on-surface-variant mb-6 text-sm">Dr. James Chen • Private Suite 04</p>
                <div className="flex gap-4">
                  <Button variant="primary" className="px-5 py-2.5 text-xs">Reschedule</Button>
                  <Button variant="outline" className="px-5 py-2.5 text-xs">Details</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <button className="flex items-center justify-between p-6 bg-primary-container text-white rounded-xl group transition-transform active:scale-95 duration-300">
            <span className="font-display text-[10px] uppercase tracking-widest font-bold">Book Again</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          <button className="flex items-center justify-between p-6 bg-white text-primary rounded-xl border-l-4 border-tertiary transition-all hover:translate-x-1 shadow-sm">
            <span className="font-display text-[10px] uppercase tracking-widest font-bold">Download Invoice</span>
            <span className="material-symbols-outlined">download</span>
          </button>
          <button className="flex items-center justify-between p-6 bg-secondary-container text-secondary-container text-on-secondary-container rounded-xl transition-all hover:bg-secondary-container/80 shadow-sm">
            <span className="font-display text-[10px] uppercase tracking-widest font-bold">Chat with Clinic</span>
            <span className="material-symbols-outlined">forum</span>
          </button>
        </div>

        {/* Clinical History Table */}
        <div className="md:col-span-12 lg:col-span-8 bg-white p-8 rounded-xl editorial-shadow">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl text-primary">Clinical History</h2>
            <button className="text-tertiary font-display text-[10px] uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="pb-4 font-display text-[10px] text-on-surface-variant uppercase tracking-widest">Date</th>
                  <th className="pb-4 font-display text-[10px] text-on-surface-variant uppercase tracking-widest">Procedure</th>
                  <th className="pb-4 font-display text-[10px] text-on-surface-variant uppercase tracking-widest">Specialist</th>
                  <th className="pb-4 font-display text-[10px] text-on-surface-variant uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {history.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-surface-container-low transition-colors">
                    <td className="py-5 text-sm text-on-surface">{row.date}</td>
                    <td className="py-5 font-serif text-primary text-lg">{row.procedure}</td>
                    <td className="py-5 text-sm text-on-surface-variant">{row.specialist}</td>
                    <td className="py-5 text-right">
                      <span className="px-3 py-1 bg-secondary-container/50 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* digital records */}
        <div className="md:col-span-12 lg:col-span-4 bg-white p-8 rounded-xl flex flex-col editorial-shadow">
          <h2 className="font-serif text-2xl text-primary mb-6">Patient Records</h2>
          <div className="space-y-4 flex-1">
            {records.map((record, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low border border-transparent hover:border-tertiary/30 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-tertiary">{record.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-primary">{record.title}</div>
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">{record.date} • {record.size}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-4">Secured by SmileCraft Vault</p>
            <button className="w-full py-3 bg-surface-container-high rounded-lg text-[10px] font-display uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
              Access Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
e x p o r t   c o n s t   d y n a m i c   =   ' f o r c e - d y n a m i c ' ;  
 