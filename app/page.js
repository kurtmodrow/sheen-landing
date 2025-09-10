'use client';
import { useState } from 'react';

const LOGO_URL = '/logo.png'; // keep your /public/logo.png
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''; // e.g. https://sheeni-server.onrender.com

// helper to post JSON with good errors
async function postJSON(path, payload) {
  const r = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
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
              className={`px-4 py-2 rounded-lg border ${tab==='customer'
                ? 'bg-purple-600 border-purple-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              I’m a Customer
            </button>
            <button
              onClick={() => setTab('cleaner')}
              className={`px-4 py-2 rounded-lg border ${tab==='cleaner'
                ? 'bg-purple-600 border-purple-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
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
          <img src={LOGO_URL} alt="Sheeni logo" className="h-10 w-10 rounded-md shadow" />
          <span className="font-semibold text-lg tracking-tight">Sheeni</span>
        </div>
        <div className="hidden md:flex gap-6 text-white/80">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </div>
      </div>
    </header>
  );
}

function Hero({ switchTab, active }) {
  return (
    <section className="mx-a
