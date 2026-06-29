"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AiNeuralBackground from "../components/AiNeuralBackground";
import { post } from "../utils/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your credentials.");
      return;
    }

    try {
      const data = await post("/auth/login", { email, password });

      if (data.success) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error: any) {
      setError(error?.message || "Connection error. Please check your backend URL and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 overflow-hidden relative">
      
      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/30 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/30 blur-[140px] animate-pulse" />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-sky-600/20 blur-[120px] animate-pulse" />
      </div>

      <AiNeuralBackground />

      <div className="
        w-full max-w-md p-1 px-1 rounded-[3rem]
        bg-gradient-to-b from-slate-400/20 to-transparent
        shadow-[0_0_80px_rgba(30,41,59,0.5)]
        animate-in fade-in zoom-in duration-700
      ">
        <div className="
          w-full h-full p-10 rounded-[2.9rem]
          bg-slate-900/60 backdrop-blur-3xl
          border border-white/10
          flex flex-col relative overflow-hidden
        ">
          
          {/* Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

          <div className="relative z-10">
            <h1 className="text-5xl font-black mb-2 text-center tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
                Login
              </span>
              <span className="ml-2 inline-block animate-bounce text-3xl">🔐</span>
            </h1>

            <p className="text-center text-slate-400 mb-6 font-medium tracking-wide">
              Step into the future of startups
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 transition-colors group-focus-within:text-sky-400">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="john@startup.ai"
                    className="
                      w-full p-4 rounded-2xl
                      bg-slate-950/40 text-white
                      border border-slate-800/50
                      placeholder-slate-700
                      focus:border-sky-500/50 focus:ring-8 focus:ring-sky-500/5
                      transition-all duration-500 outline-none
                      hover:bg-slate-950/60
                    "
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 transition-colors group-focus-within:text-sky-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="
                      w-full p-4 rounded-2xl
                      bg-slate-950/40 text-white
                      border border-slate-800/50
                      placeholder-slate-700
                      focus:border-sky-500/50 focus:ring-8 focus:ring-sky-500/5
                      transition-all duration-500 outline-none
                      hover:bg-slate-950/60
                    "
                  />
                </div>
              </div>

              <button
                type="submit"
                className="
                  w-full group relative
                  bg-gradient-to-br from-sky-400 to-blue-700
                  text-white py-4 rounded-2xl font-black text-lg
                  shadow-xl shadow-blue-900/20
                  hover:shadow-2xl hover:shadow-sky-500/30
                  hover:scale-[1.03] active:scale-[0.97]
                  transition-all duration-300 mt-4 overflow-hidden
                "
              >
                <span className="relative z-10">ENTER SIMULATOR</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
            </form>

            <p className="text-center text-sm mt-10 text-slate-500 font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-sky-400 hover:text-sky-200 transition-colors font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}