'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const LOGO_URL = '/logo.png'; // keep your /public/logo.png (rename your file to this)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''; // e.g., https://sheeni-server.onrender.com

// Reusable POST helper (good errors)
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
    <main className={`${inter.className} relative min-h-screen bg-slate-950 text-white`}>
      {/* subtle modern gradient and grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80rem_40rem_at_50%_-10%,rgba(139,92,246,0.15),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)] bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Header />

      <Hero switchTab={setTab} active={tab} />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border border-white/10 bg-white/5/50 backdrop-blur supports-[backdrop-filter]:bg-white/5 p-4 md:p-8 shadow-2xl ring-1 ring-white/10">
          <TabSwitcher tab={tab} setTab={setTab} />
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
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Smaller, crisp logo (no more “giant old-school” look) */}
          <div className="relative h-7 w-7 md:h-8 md:w-8 rounded-md overflow-hidden ring-1 ring-white/10 shadow">
            <Image
              src={LOGO_URL}
              alt="Sheeni logo"
              fill
              sizes="(max-width: 768px) 32px, 36px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-semibold tracking-tight text-sm md:text-base bg-gradient-to-r from-sky-300 to-purple-300 bg-clip-text text-transparent">
            Sheeni
          </span>
        </div>
        <nav className="hidden md:flex gap-6 text-white/80">
          <a href="#how" className="hover:text-white transition">How it works</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ switchTab, active }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full text-xs md:text-sm mb-4">
            ✨ Sheeni the Genie — small mess, big relief.
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Book a trusted cleaner, fast.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 to-sky-300 bg-clip-text text-transparent">
              Track arrival. Relax sooner.
            </span>
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
                  ? 'bg-purple-600/90 border-purple-500 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              } transition`}
            >
              Join as Customer
            </button>
            <button
              onClick={() => switchTab('cleaner')}
              className={`px-4 py-2 rounded-lg border ${
                active === 'cleaner'
                  ? 'bg-purple-600/90 border-purple-500 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              } transition`}
            >
              Apply as Cleaner
            </button>
          </div>
        </div>

        {/* compact “glass” form card */}
        <div className="rounded-2xl border border-white/10 bg-white/5/50 backdrop-blur p-6 ring-1 ring-white/10">
          {active === 'customer' ? <CustomerForm compact /> : <CleanerForm compact />}
        </div>
      </div>
    </section>
  );
}

function TabSwitcher({ tab, setTab }) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => setTab('customer')}
        className={`px-4 py-2 rounded-lg border ${
          tab === 'customer'
            ? 'bg-purple-600/90 border-purple-500 shadow-lg'
            : 'bg-white/5 border-white/10 hover:bg-white/10'
        } transition`}
      >
        I’m a Customer
      </button>
      <button
        onClick={() => setTab('cleaner')}
        className={`px-4 py-2 rounded-lg border ${
          tab === 'cleaner'
            ? 'bg-purple-600/90 border-purple-500 shadow-lg'
            : 'bg-white/5 border-white/10 hover:bg-white/10'
        } transition`}
      >
        I’m a Cleaner
      </button>
    </div>
  );
}

function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`rounded-xl bg-white/5 border border-white/10 ring-1 ring-inset ring-white/10 px-3 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition ${className}`}
    />
  );
}

function Textarea({ className = '', ...props }) {
  return (
    <textarea
      {...props}
      className={`rounded-xl bg-white/5 border border-white/10 ring-1 ring-inset ring-white/10 px-3 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition ${className}`}
    />
  );
}

function CTAButton({ loading, children, className = '' }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 font-medium shadow-lg shadow-purple-900/30 transition ${className}`}
    >
      {loading ? 'Submitting…' : children}
    </button>
  );
}

function CustomerForm({ compact = false }) {
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [sent, setSent] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setSent(false);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    data.role = 'customer';

    try {
      await postJSON('/api/waitlist/customer', data);
      e.currentTarget.reset();
      setFormKey((k) => k + 1);
      setSent(true);
    } catch (err) {
      alert('Submission failed: ' + (err.message || 'network error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      key={formKey}
      onSubmit={submit}
      autoComplete="off"
      className={`grid gap-3 ${compact ? '' : 'md:grid-cols-2'}`}
    >
      <Input name="name" required placeholder="Full name" autoComplete="off" />
      <Input type="email" name="email" required placeholder="Email" autoComplete="off" />
      <Input
        name="phone"
        placeholder="Phone (for launch SMS)"
        autoComplete="off"
        className={compact ? '' : 'md:col-span-2'}
      />
      <Input name="city" placeholder="City" autoComplete="off" />
      <Input name="zip" placeholder="ZIP code" autoComplete="off" />
      <Textarea
        name="notes"
        placeholder="What kind of clean do you need most?"
        className={compact ? '' : 'md:col-span-2 h-28'}
      />
      <CTAButton loading={loading} className={compact ? '' : 'md:col-span-2'}>
        Join the interest list
      </CTAButton>
      {sent && (
        <p className={`${compact ? '' : 'md:col-span-2'} text-emerald-300`}>Wish received! ✨</p>
      )}
    </form>
  );
}

function CleanerForm({ compact = false }) {
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [sent, setSent] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setSent(false);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    data.role = 'cleaner';

    try {
      // Uses your API base (env) + working path
      const r = await fetch(`${API_BASE}/api/waitlist/cleaner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.message || j?.error || `HTTP ${r.status}`);

      e.currentTarget.reset();
      setFormKey((k) => k + 1);
      setSent(true);
    } catch (err) {
      alert('Submission failed: ' + (err.message || 'network error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      key={formKey}
      onSubmit={submit}
      autoComplete="off"
      className={`grid gap-3 ${compact ? '' : 'md:grid-cols-2'}`}
    >
      <Input name="name" required placeholder="Full name" autoComplete="off" />
      <Input type="email" name="email" required placeholder="Email" autoComplete="off" />
      <Input name="phone" placeholder="Phone" autoComplete="off" />
      <Input name="service_area" placeholder="Service area (ZIPs or neighborhoods)" autoComplete="off" />
      <Textarea
        name="experience"
        placeholder="Experience (years, specialties)"
        className={compact ? '' : 'md:col-span-2 h-28'}
      />
      <CTAButton loading={loading} className={compact ? '' : 'md:col-span-2'}>
        Apply as a cleaner
      </CTAButton>
      {sent && (
        <p className={`${compact ? '' : 'md:col-span-2'} text-emerald-300`}>Wish received! ✨</p>
      )}
    </form>
  );
}

function Features() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Why Sheeni?</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          ['Fast matching', 'Request a clean and get paired with the nearest available pro.'],
          ['Live ETA tracking', 'See your cleaner on the map and get accurate arrival estimates.'],
          ['Flexible jobs', 'Quick tidy-ups, spill rescues, or deeper cleans — you choose.'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-lg font-medium mb-1">{t}</div>
            <div className="text-white/75">{d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Good to know</h2>
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
          <div className="font-medium">Is “under 60 minutes” guaranteed?</div>
          <div className="text-white/75">
            It’s a <span className="text-white">goal</span>, not a guarantee. We’ll always show realistic ETAs.
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
          <div className="font-medium">What happens after I join?</div>
          <div className="text-white/75">
            We’ll email/text when your city goes live and give interest-list members first access at launch.
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
          <div className="font-medium">Are cleaners vetted?</div>
          <div className="text-white/75">
            Yes — onboarding includes ID verification, experience review, and community ratings once live.
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Smaller, consistent footer logo */}
          <div className="relative h-6 w-6 md:h-7 md:w-7 rounded-md overflow-hidden ring-1 ring-white/10 shadow">
            <Image
              src={LOGO_URL}
              alt="Sheeni logo"
              fill
              sizes="(max-width: 768px) 28px, 32px"
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-sm md:text-base">Sheeni</span>
        </div>
        <div className="text-white/60 text-xs md:text-sm">© {new Date().getFullYear()} Sheeni</div>
      </div>
    </footer>
  );
}

