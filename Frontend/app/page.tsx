import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <h1 className="font-bold text-xl">AI Startup Simulator</h1>

        <div className="flex gap-4">
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>

          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="text-center mt-24 px-6">
        <h1 className="text-5xl font-bold">
          Build Startup Ideas with AI
        </h1>

        <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
          Generate business plans, technical architecture,
          MVP roadmaps, and startup insights in seconds.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Start Free
          </Link>

          <Link
            href="/login"
            className="border px-6 py-3 rounded-lg"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-10 mt-24">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold">Business Analysis</h2>
          <p className="text-gray-600 mt-2">
            Understand your startup idea clearly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold">Tech Stack Suggestions</h2>
          <p className="text-gray-600 mt-2">
            AI recommends best technologies.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold">MVP Roadmap</h2>
          <p className="text-gray-600 mt-2">
            Step-by-step execution plan.
          </p>
        </div>
      </section>
    </main>
  );
}