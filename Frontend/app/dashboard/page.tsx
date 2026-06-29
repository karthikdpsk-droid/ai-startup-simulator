"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type StartupReport = {
  startupName: string;
  headline: string;
  overview: string;
  problem: string;
  targetUsers: string;
  features: string[];
  revenueModel: string[];
  marketSize: string;
  competitors: string[];
};

type BackendReport = {
  success: boolean;
  message?: string;
  reportId?: string;
  data: StartupReport;
  score: {
    totalScore: number;
    breakdown: Record<string, number>;
    reason: string;
    strengths: string[];
    weaknesses: string[];
    suggestion: string;
  };
};

import { post } from "../utils/api";

type Report = BackendReport;

const fetchReportFromBackend = async (prompt: string): Promise<BackendReport> => {
  const token = localStorage.getItem("token") ?? undefined;
  return await post("/ai/generate-idea", { prompt }, token);
};

export default function DashboardPage() {
  const [startupName, setStartupName] = useState(() => {
    try {
      return localStorage.getItem("pendingPrompt") ?? "";
    } catch {
      return "";
    }
  });
  const [report, setReport] = useState<Report | null>(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const pending = localStorage.getItem("pendingPrompt");
    if (pending) {
       localStorage.removeItem("pendingPrompt");
       // Trigger a manual fetch using the stored pending prompt
       const runPrompt = async () => {
          setError("");
          setStatus("loading");
          try {
             const backendReport = await fetchReportFromBackend(pending);
             setReport(backendReport);
             setStatus("ready");
          } catch {
             setError("Unable to fetch the backend report.");
             setStatus("error");
          }
       };
       runPrompt();
    }
    // status will reflect current workflow; avoid synchronous setState in effect
  }, [report]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = startupName.trim();
    if (!trimmedName) {
      setError("Please enter a startup name to generate the report.");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const backendReport = await fetchReportFromBackend(trimmedName);
      setReport(backendReport);
      setStatus("ready");
    } catch (fetchError) {
      console.error(fetchError);
      setError("Unable to fetch the backend report. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="w-full max-w-xs border-r border-slate-800 bg-slate-900/95 p-6 shadow-xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-400">AI Dashboard</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Startup Lab</h2>
          <p className="mt-3 text-slate-400 text-sm leading-6">
            Enter your startup name to generate a beautiful report preview.
          </p>
        </div>

        <nav className="space-y-3 text-slate-300">
          <Link href="/dashboard" className="block rounded-3xl px-4 py-3 bg-sky-600 text-white shadow-lg shadow-sky-500/20">
            Search Ideas
          </Link>
          <Link href="/create" className="block rounded-3xl px-4 py-3 bg-slate-800 transition hover:bg-slate-700">
            Create Startup
          </Link>
          <Link href="/profile" className="block rounded-3xl px-4 py-3 bg-slate-800 transition hover:bg-slate-700">
            Profile
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 lg:p-10">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Search & generate</p>
          <h1 className="mt-4 text-4xl font-bold text-white">
            Find your startup idea and preview the generated report.
          </h1>
          
        </header>

        <section className="mb-10 grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/30">
          <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="space-y-3">
              <label htmlFor="startupName" className="block text-sm font-medium text-slate-300">
                Enter startup name
              </label>
              <input
                id="startupName"
                value={startupName}
                onChange={(event) => setStartupName(event.target.value)}
                placeholder="e.g. Quantum Kitchen"
                className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-5 py-4 text-lg text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
              />
              {error ? <p className="text-sm text-rose-400">{error}</p> : null}
            </div>
            <button
              type="submit"
              className="rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-sky-500/20 transition hover:brightness-110"
            >
              Generate Report
            </button>
          </form>

        </section>

        <section className="grid gap-8 xl:grid-cols-[0.7fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/40 transition-all duration-300 hover:shadow-sky-500/5 hover:-translate-y-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-sky-400">Report status</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">{status === "idle" ? "Ready to generate" : status === "loading" ? "Generating your idea" : "Report ready"}</h2>
                </div>
                <span className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-300">
                  {status === "idle" ? "Idle" : status === "loading" ? "Loading" : "Complete"}
                </span>
              </div>

              <p className="mt-6 text-slate-400 leading-7">
                {report ? `Generated high-impact analysis for ${report.data.startupName}. Check the score and blueprint in the right panel.` : "Submit a name and the report panel will show a sharp, AI-generated summary of your startup concept."}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.75rem] bg-slate-900/95 p-6 border border-slate-800 transition-all duration-300 hover:shadow-sky-500/5 hover:-translate-y-1">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Tip</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Use a strong startup name</h3>
                <p className="mt-3 text-slate-300">The more specific the name, the more convincing and tailored the frontend report feels.</p>
              </div>
              <div className="rounded-[1.75rem] bg-slate-900/95 p-6 border border-slate-800 transition-all duration-300 hover:shadow-sky-500/5 hover:-translate-y-1">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Next step</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Replace with real API</h3>
                <p className="mt-3 text-slate-300">This layout is ready for a future backend integration that returns a real startup report.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-950/40">
            {status === "loading" ? (
              <div className="space-y-4">
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-800" />
                <div className="h-72 animate-pulse rounded-[1.5rem] bg-slate-800" />
              </div>
            ) : report ? (
              <div className="space-y-8">
                {/* Score Section */}
                <div className="rounded-[1.75rem] border border-sky-500/30 bg-sky-500/5 p-6 flex items-center justify-between">
                   <div>
                      <p className="text-xs uppercase tracking-widest text-sky-400 font-bold">Concept Score</p>
                      <h3 className="text-4xl font-black text-white mt-1">{report.score.totalScore}<span className="text-lg font-normal text-slate-500">/100</span></h3>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-medium text-slate-300 italic">&ldquo;{report.score.suggestion}&rdquo;</p>
                   </div>
                </div>

                <div className="rounded-[1.75rem] bg-slate-950/95 p-8 border border-slate-800">
                  <p className="text-sm uppercase tracking-[0.18em] text-sky-400">Startup report</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">{report.data.startupName || report.data.headline}</h2>
                  <p className="mt-4 leading-7 text-slate-300">{report.data.overview || report.data.problem}</p>
                </div>

                <div className="grid gap-6">
                  <div className="rounded-[1.75rem] bg-slate-900/95 p-6 border border-slate-800">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Target Audience</p>
                    <p className="mt-4 text-slate-300 leading-7">{report.data.targetUsers}</p>
                  </div>

                  <div className="rounded-[1.75rem] bg-slate-900/95 p-6 border border-slate-800">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Revenue Model</p>
                    <ul className="mt-4 list-disc list-inside space-y-3 text-slate-300">
                      {report.data.revenueModel.map((step: string) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.75rem] bg-slate-900/95 p-6 border border-slate-800">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Key features</p>
                    <div className="mt-4 space-y-3">
                      {report.data.features.map((feature: string) => (
                        <div key={feature} className="rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-slate-200">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.75rem] bg-slate-950/95 p-8 text-slate-400 border border-dashed border-slate-800">
                <p className="text-xl font-semibold text-white">Your report will appear here.</p>
                <p className="mt-4 leading-7">Type a startup name above and click Generate Report to see a polished idea report layout.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
