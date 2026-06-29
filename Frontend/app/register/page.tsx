"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AiNeuralBackground from "../components/AiNeuralBackground";
import { post } from "../utils/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await post("/auth/register", { name, email, password });

      if (data.success) {
        router.push("/login?registered=true");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error: any) {
      setError(error?.message || "Failed to connect to live backend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 overflow-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-rose-600/30 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[140px] animate-pulse" />
        <div className="absolute top-[30%] left-[10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
      </div>

      <AiNeuralBackground />

      <div className="w-full max-w-md p-1 px-1 rounded-[3rem] bg-gradient-to-b from-slate-400/20 to-transparent shadow-[0_0_80px_rgba(30,41,59,0.5)] animate-in fade-in zoom-in duration-700">
        <div className="w-full h-full p-10 rounded-[2.9rem] bg-slate-900/60 backdrop-blur-3xl border border-white/10 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

          <div className="relative z-10">
            <h1 className="text-5xl font-black mb-2 text-center tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
                Join Us
              </span>
              <span className="ml-2 subtitle-emoji inline-block animate-bounce text-3xl">🚀</span>
            </h1>

            <p className="text-center text-slate-400 mb-6 font-medium tracking-wide">
              Start your AI startup journey today
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="group space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full p-4 rounded-2xl bg-slate-950/40 text-white border border-slate-800/50 placeholder-slate-700 focus:border-sky-500/50 transition-all outline-none"
                />
              </div>

              <div className="group space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full p-4 rounded-2xl bg-slate-950/40 text-white border border-slate-800/50 placeholder-slate-700 focus:border-sky-500/50 transition-all outline-none"
                />
              </div>

              <div className="group space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-4 rounded-2xl bg-slate-950/40 text-white border border-slate-800/50 placeholder-slate-700 focus:border-sky-500/50 transition-all outline-none"
                />
              </div>

              <div className="group space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-4 rounded-2xl bg-slate-950/40 text-white border border-slate-800/50 placeholder-slate-700 focus:border-sky-500/50 transition-all outline-none"
                />
              </div>

              <button disabled={loading} type="submit" className="w-full group relative bg-gradient-to-br from-sky-400 to-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.03] transition-all mt-4 overflow-hidden disabled:opacity-50">
                <span className="relative z-10">{loading ? "CREATING..." : "CREATE ACCOUNT"}</span>
              </button>

              <p className="text-center text-sm mt-6 text-slate-500 font-medium">
                Already have an account?{" "}
                <Link href="/login" className="text-sky-400 hover:text-sky-200 transition-colors font-bold">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}