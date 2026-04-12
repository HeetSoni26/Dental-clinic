"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

// Simple mock portal — no NextAuth required
const MOCK_CREDENTIALS = { email: "patient@smilecraft.com", password: "smile2024" };

const mockAppointments = [
  { id: "1", service: "Teeth Whitening", doctor: "Dr. Sarah Mitchell", date: "Nov 15, 2024", time: "10:30 AM", status: "Upcoming" },
  { id: "2", service: "Dental Implant", doctor: "Dr. James Chen", date: "Dec 02, 2024", time: "02:00 PM", status: "Upcoming" },
  { id: "3", service: "Clinical Exam", doctor: "Dr. Sarah Mitchell", date: "Oct 01, 2024", time: "09:00 AM", status: "Completed" },
  { id: "4", service: "Scaling & Polishing", doctor: "Dr. James Chen", date: "Sep 15, 2024", time: "11:00 AM", status: "Completed" },
];

const mockRecords = [
  { name: "Dental X-Ray — Oct 2024", size: "2.4 MB", date: "Oct 01, 2024", type: "X-Ray" },
  { name: "Treatment Plan — Implant", size: "0.8 MB", date: "Oct 01, 2024", type: "Document" },
  { name: "Periapical X-Ray — Sep 2024", size: "1.9 MB", date: "Sep 15, 2024", type: "X-Ray" },
];

export default function PortalPage() {
  const [authed, setAuthed] = useState(false);
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (creds.email === MOCK_CREDENTIALS.email && creds.password === MOCK_CREDENTIALS.password) {
      setAuthed(true);
    } else {
      setError("Invalid credentials. Try: patient@smilecraft.com / smile2024");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>lock_person</span>
            </div>
            <h1 className="font-serif text-3xl text-primary mb-1">Patient Portal</h1>
            <p className="text-on-surface-variant text-sm">Your health records, securely accessible.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 editorial-shadow">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={creds.email}
                  onChange={e => setCreds({ ...creds, email: e.target.value })}
                  placeholder="patient@smilecraft.com"
                  className="w-full bg-surface-container-low border border-transparent focus:border-tertiary rounded-xl px-5 py-4 outline-none transition-all"
                />
              </div>
              <div>
                <label className="font-display text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={creds.password}
                  onChange={e => setCreds({ ...creds, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-surface-container-low border border-transparent focus:border-tertiary rounded-xl px-5 py-4 outline-none transition-all"
                />
              </div>
              {error && <p className="text-error text-sm bg-error/5 px-4 py-3 rounded-lg">{error}</p>}
              <Button variant="primary" className="w-full py-5" type="submit" icon="login">Sign In</Button>
            </form>
            <p className="text-center text-xs text-on-surface-variant mt-5">
              Demo credentials shown in the error message above if login fails.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const upcoming = mockAppointments.filter(a => a.status === "Upcoming");
  const past = mockAppointments.filter(a => a.status === "Completed");

  return (
    <div className="bg-surface-container-low min-h-screen pb-24">
      {/* Portal Header */}
      <div className="bg-primary-container text-white py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-display text-[10px] md:text-xs uppercase tracking-widest text-tertiary mb-1">Good day</p>
            <h1 className="font-serif text-2xl md:text-3xl text-white">Alex Johnson</h1>
            <p className="text-white/60 text-xs md:text-sm mt-1">Member since January 2024 · Premium Plan</p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-white/60 hover:text-white transition-colors font-display text-[9px] md:text-xs uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-[18px] md:text-base">logout</span> <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-outline-variant/10 px-0 md:px-8 sticky top-16 z-40">
        <div className="max-w-screen-2xl mx-auto flex gap-0 overflow-x-auto">
          {[
            { id: "dashboard", label: "Dashboard", icon: "dashboard" },
            { id: "appointments", label: "Appointments", icon: "calendar_month" },
            { id: "records", label: "Dental Records", icon: "folder_open" },
            { id: "membership", label: "Membership", icon: "workspace_premium" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-display text-[10px] uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id ? "border-tertiary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-6 md:pt-8">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Visits", value: "4", icon: "local_hospital" },
                { label: "Upcoming", value: upcoming.length.toString(), icon: "calendar_today" },
                { label: "Membership", value: "Premium", icon: "workspace_premium" },
                { label: "Next Visit", value: "Nov 15", icon: "event" },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl p-4 md:p-6 editorial-shadow-sm border border-outline-variant/10">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-tertiary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary text-base">{stat.icon}</span>
                    </div>
                  </div>
                  <p className="font-serif text-3xl text-primary mb-1">{stat.value}</p>
                  <p className="font-display text-[9px] uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Upcoming appointments */}
            <div className="bg-white rounded-2xl p-6 editorial-shadow border border-outline-variant/10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl text-primary">Upcoming Appointments</h2>
                <Link href="/book" className="font-display text-[10px] uppercase tracking-widest text-tertiary hover:brightness-110">+ Book Again</Link>
              </div>
              <div className="space-y-4">
                {upcoming.map(appt => (
                  <div key={appt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 bg-surface-container-low rounded-xl border border-outline-variant/10 gap-3">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-container flex items-center justify-center text-white font-serif text-base md:text-lg shrink-0">
                        {appt.date.split(" ")[1].replace(",", "")}
                      </div>
                      <div>
                        <p className="font-serif text-base text-primary">{appt.service}</p>
                        <p className="font-display text-[9px] uppercase tracking-widest text-tertiary">{appt.doctor} · {appt.date} · {appt.time}</p>
                      </div>
                    </div>
                    <span className="bg-secondary-container text-secondary font-display text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full self-start sm:self-auto">{appt.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-2xl editorial-shadow border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h2 className="font-serif text-xl text-primary">All Appointments</h2>
              <Link href="/book"><Button variant="primary" icon="add" className="py-3 px-5">Book New</Button></Link>
            </div>
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Service", "Doctor", "Date", "Time", "Status"].map(h => (
                    <th key={h} className="text-left px-6 py-4 font-display text-[9px] uppercase tracking-widest text-on-surface-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {mockAppointments.map(appt => (
                  <tr key={appt.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4 font-serif text-primary text-sm">{appt.service}</td>
                    <td className="px-6 py-4 font-display text-xs text-tertiary uppercase tracking-widest">{appt.doctor.replace("Dr. ", "")}</td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{appt.date}</td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">{appt.time}</td>
                    <td className="px-6 py-4">
                      <span className={`font-display text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        appt.status === "Upcoming" ? "bg-secondary-container text-secondary" : "bg-surface-container text-on-surface-variant"
                      }`}>{appt.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* RECORDS */}
        {activeTab === "records" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 editorial-shadow border border-outline-variant/10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl text-primary">Dental Records</h2>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low rounded-lg font-display text-[10px] uppercase tracking-widest hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-base text-tertiary">upload</span>
                  Upload Record
                </button>
              </div>
              <div className="space-y-3">
                {mockRecords.map(rec => (
                  <div key={rec.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 bg-surface-container-low rounded-xl border border-outline-variant/10 group gap-3">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                      </div>
                      <div>
                        <p className="font-serif text-base text-primary">{rec.name}</p>
                        <p className="text-xs text-on-surface-variant">{rec.date} · {rec.size} · {rec.type}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 font-display text-[10px] uppercase tracking-widest text-tertiary sm:opacity-0 sm:group-hover:opacity-100 transition-opacity self-start sm:self-auto">
                      <span className="material-symbols-outlined text-base">download</span>
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MEMBERSHIP */}
        {activeTab === "membership" && (
          <div className="bg-white rounded-2xl p-8 editorial-shadow border border-outline-variant/10 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-tertiary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <div>
                <p className="font-display text-[10px] uppercase tracking-widest text-tertiary">Active Plan</p>
                <h2 className="font-serif text-2xl text-primary">Premium Membership</h2>
              </div>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Valid until December 31, 2024 · Auto-renews at ₹9,999/year</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {["4 Clinical Examinations", "2 Whitening touch-ups", "15% off all treatments", "Dedicated concierge", "Free X-rays annually", "Emergency priority"].map(perk => (
                <div key={perk} className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-on-surface-variant">{perk}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6">
              <Button variant="outline" className="px-6 py-3 justify-center">View Invoice</Button>
              <Link href="/pricing"><Button variant="primary" className="px-6 py-3 justify-center w-full sm:w-auto">Upgrade Plan</Button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
