"use client";

import Link from "next/link";
import { useState } from "react";
import AiNeuralBackground from "../components/AiNeuralBackground";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <AiNeuralBackground />
      {/* Sidebar */}
      <aside className="w-full max-w-xs border-r border-slate-800 bg-slate-900/95 p-6 shadow-xl flex-shrink-0">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-400">AI Dashboard</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Startup Lab</h2>
          <p className="mt-3 text-slate-400 text-sm leading-6">
            Define and shape your next venture idea.
          </p>
        </div>

        <nav className="space-y-3 text-slate-300">
          <Link href="/dashboard" className="block rounded-3xl px-4 py-3 bg-slate-800 transition hover:bg-slate-700">
            Search Ideas
          </Link>
          <Link href="/create" className="block rounded-3xl px-4 py-3 bg-sky-600 text-white shadow-lg shadow-sky-500/20">
            Create Startup
          </Link>
          <Link href="/profile" className="block rounded-3xl px-4 py-3 bg-slate-800 transition hover:bg-slate-700">
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Launch Pad</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Create your startup idea</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Define your startup concept. Give it a name, describe the vision, and let the AI Startup Simulator bring it to life.
          </p>
        </header>

        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl max-w-2xl transition-all duration-500 hover:shadow-sky-500/5 hover:-translate-y-1">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Startup Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Quantum Kitchen"
                className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-5 py-4 text-lg text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 placeholder-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Vision & Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your startup in a few sentences... What problem does it solve?"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 placeholder-slate-600 resize-none"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <Link
                href="/dashboard"
                className="flex-1 text-center rounded-3xl border border-slate-700 px-6 py-4 text-slate-300 font-semibold transition hover:bg-slate-800"
              >
                Cancel
              </Link>
              <button
                onClick={() => {
                   if (name || description) {
                      localStorage.setItem("pendingPrompt", `${name}: ${description}`);
                      window.location.href = "/dashboard";
                   }
                }}
                className="flex-1 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 text-white font-bold shadow-xl shadow-sky-500/20 transition hover:brightness-110"
              >
                Analyze with AI →
              </button>
            </div>
          </div>
        </section>

        {/* Informational Feature Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-4xl">
          <div className="group rounded-[2rem] bg-slate-900/90 p-8 border border-slate-800 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-sky-500/10 hover:border-sky-500/30">
            <p className="text-sm uppercase tracking-[0.18em] text-sky-400 font-bold">Design</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Premium styling</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">The simulator blends glassmorphism, gradients, and modern card layouts for a polished product feel.</p>
          </div>
          <div className="group rounded-[2rem] bg-slate-900/90 p-8 border border-slate-800 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/10 hover:border-blue-500/30">
            <p className="text-sm uppercase tracking-[0.18em] text-sky-400 font-bold">Interaction</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Instant preview</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">Experience zero-latency report previews as the AI synthesizes your venture architectural blueprint.</p>
          </div>
          <div className="group rounded-[2rem] bg-slate-900/90 p-8 border border-slate-800 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-indigo-500/10 hover:border-indigo-500/30">
            <p className="text-sm uppercase tracking-[0.18em] text-sky-400 font-bold">Intelligence</p>
            <h3 className="mt-4 text-2xl font-bold text-white">AI Analysis</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">Leverage state-of-the-art LLMs to identify market gaps and refine your startup mission statement.</p>
          </div>
        </div>

        {/* Feature Steps */}
        <div className="mt-12 grid gap-4 md:grid-cols-3 max-w-2xl">
          <div className="group rounded-[1.75rem] bg-slate-950/50 p-6 border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-black">Step 1</p>
            <p className="mt-2 font-bold text-white">Name your idea</p>
          </div>
          <div className="group rounded-[1.75rem] bg-slate-950/50 p-6 border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-black">Step 2</p>
            <p className="mt-2 font-bold text-white">Describe the vision</p>
          </div>
          <div className="group rounded-[1.75rem] bg-slate-950/50 p-6 border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-black">Step 3</p>
            <p className="mt-2 font-bold text-white">Generate report</p>
          </div>
        </div>
      </main>
    </div>
  );
}
