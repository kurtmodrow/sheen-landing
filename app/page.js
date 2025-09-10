'use client';
import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''; // e.g. https://sheeni-server.onrender.com
// If your file is literally "Sheeni Logo.png", either rename it to /public/logo.png
// or set LOGO_URL = '/Sheeni%20Logo.png'
const LOGO_URL = '/logo.png';

// ---- helper: JSON POST with friendly errors
async function postJSON(path, payload) {
  const r = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j?.message || j?.error || `HTTP ${r.status}`);
  return j;
}

export default function Page() {
  const [tab, setTab] = useState('customer'); // 'customer' | 'cleaner'
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-900 via-indigo-900 to-slate-900 text-white">
      <Header />
      <Hero switchTab={setTab} active={tab} />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl p-4 md:p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab('customer')}
              className={`px-4 py-2 rounded-lg border ${
                tab === 'customer'
                  ? 'bg-purple-600 border-purple-500'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              I’m a Customer
            </button>
            <button
              onClick={() => setTab('cleaner')}
              className={`px-4 py-2 rounded-lg border ${
                tab === 'cleaner'
                  ? 'bg-purple-600 border-purple-500'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              I’m a Cleaner
            </button>
          </div>

          {tab === 'customer' ? <CustomerForm /> : <CleanerForm />}
        </div>
      </section>

      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* small, crisp logo (no oversized look) */}
          <img
            src={LOGO_URL}
            alt="Sheeni logo"
            className="h-8 w-8 rounded-md shadow object-contain"
            width={32}
            height={32}
          />
          <span className="font-semibold text-lg tracking-tight">Sheeni</span>
        </div>
        <nav className="hidden md:flex gap-6 text-white/80">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ switchTab, active }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-sm mb-4">
            ✨ Sheeni the Genie — small mess, big relief.
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
            Book a trusted cleaner, fast.<br />
            Track arrival. Relax sooner.
          </h1>
          <p className="text-white/80 mb-6 max-w-prose">
            Join the interest list to be first in line when Sheeni launches in your area.
            Our goal is <span className="text-white">under 60 minutes</span> from request to cleaner on-route —
            <span className="text-white/70"> this is a target, not a guarantee</span>. We’ll email/text updates
            as soon as the app is ready in your city. Early sign-ups get first dibs at launch.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => switchTab('customer')}
              className={`px-4 py-2 rounded-lg border ${
                active === 'customer'
                  ? 'bg-purple-600 border-purple-500'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              Join as Customer
            </button>
            <button
              onClick={() => switchTab('cleaner')}
              className={`px-4 py-2 rounded-lg b
