import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col gap-8">
      <div className="text-2xl font-serif font-bold text-tertiary">SmileCraft Admin</div>
      
      <nav className="flex flex-col gap-4 flex-1">
        <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all font-display text-[10px] uppercase tracking-widest text-white">
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </Link>
        <Link href="/admin/appointments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all font-display text-[10px] uppercase tracking-widest text-slate-400 hover:text-white">
          <span className="material-symbols-outlined">calendar_today</span>
          Appointments
        </Link>
        <Link href="/admin/leads" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all font-display text-[10px] uppercase tracking-widest text-slate-400 hover:text-white">
          <span className="material-symbols-outlined">contact_emergency</span>
          Contact Leads
        </Link>
        <Link href="/admin/blog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all font-display text-[10px] uppercase tracking-widest text-slate-400 hover:text-white">
          <span className="material-symbols-outlined">edit_note</span>
          Blog Manager
        </Link>
      </nav>

      <div className="pt-8 border-t border-white/10">
        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-error hover:bg-error/10 transition-all font-display text-[10px] uppercase tracking-widest">
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
