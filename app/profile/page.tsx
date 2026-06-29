"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { get } from "../utils/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await get("/profile", token ?? undefined);
        if (data.success) {
          setUser(data.data);
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Founders Data...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-full max-w-xs border-r border-slate-800 bg-slate-900/95 p-6 shadow-xl flex-shrink-0">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-400">AI Dashboard</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Startup Lab</h2>
          <p className="mt-3 text-slate-400 text-sm leading-6">
            Manage your account and simulator settings.
          </p>
        </div>

        <nav className="space-y-3 text-slate-300">
          <Link href="/dashboard" className="block rounded-3xl px-4 py-3 bg-slate-800 transition hover:bg-slate-700">
            Search Ideas
          </Link>
          <Link href="/create" className="block rounded-3xl px-4 py-3 bg-slate-800 transition hover:bg-slate-700">
            Create Startup
          </Link>
          <Link href="/profile" className="block rounded-3xl px-4 py-3 bg-sky-600 text-white shadow-lg shadow-sky-500/20">
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Account Settings</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Your Profile</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            View and manage your AI Startup Simulator account details and preferences.
          </p>
        </header>

        <div className="grid gap-6 xl:grid-cols-2">
          {/* Avatar Card */}
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-full flex-shrink-0 shadow-2xl shadow-sky-500/30 flex items-center justify-center text-4xl">
              👤
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name || "Founder"}</h2>
              <p className="text-slate-400 mt-1">{user?.email || "ai.user@simulator.com"}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-sky-600/20 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
                {user?.stats?.status || "Founders Edition"} 🚀
              </span>
            </div>
          </div>

          {/* Stats Card */}
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-4 text-center">
              <p className="text-3xl font-black text-white">{user?.stats?.totalReports || 0}</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Reports</p>
            </div>
            <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-4 text-center">
              <p className="text-3xl font-black text-sky-400">∞</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Ideas</p>
            </div>
            <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-4 text-center col-span-2">
              <p className="text-lg font-bold text-white">Verified ✅</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Email Status</p>
            </div>
          </div>

          {/* Account Details */}
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl space-y-4 xl:col-span-2">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Account Details</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-4">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Plan</label>
                <p className="text-white mt-1 font-semibold">{user?.stats?.status || "Founders Edition 🚀"}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-4">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Member Since</label>
                <p className="text-white mt-1 font-semibold">June 2026</p>
              </div>
              <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-4 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Access Level</label>
                <p className="text-white mt-1 font-semibold">Full Platform Access · All AI Features Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
