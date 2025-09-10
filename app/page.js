'use client';
import { useState } from 'react';

// ========= CONFIG =========
// If your file is literally "Sheeni Logo.png", set LOGO_URL to '/Sheeni%20Logo.png'
// or (recommended) rename it to /public/logo.png and keep '/logo.png'
const LOGO_URL = '/logo.png';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''; // e.g. https://sheeni-server.onrender.com

// POST helper with solid error handling
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
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />
      <Header />

      <Hero tab={tab} setTab={setTab} />

      <Section className="py-12">
        <Card>
          <Tabs tab={tab} setTab={setTab} />
          {tab === 'customer' ? <CustomerForm /> : <CleanerForm />}
        </Card>
      </Section>

      <Features />
      <HowItWorks />
      <SocialProof />
      <CTA />

      <Footer />
    </main>
  );
}

/* ----------------- UI SECTIONS ----------------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Sheeni logo"
            className="h-7 w-7 rounded-md object-contain ring-1 ring-white/10 shadow"
            width={28}
            height={28}
          />
          <span className="font-semibold tracking-tight">Sheeni</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-white/80">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ tab, setTab }) {
  return (
    <Section className="py-14 md:py-20">
      <div className="grid md:grid-cols-2 items-center gap-10">
        <div>
          <Badge>✨ Sheeni the Genie — small mess, big relief.</Badge>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[1.05]">
            Book a trusted cleaner in minutes.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
              Track arrival. Relax sooner.
            </span>
          </h1>
          <p className="mt-4 text-white/80 max-w-prose">
            Join the interest list to be first in line when Sheeni launches in your area.
            Our goal is <span className="text-white">under 60 minutes</span> from request to cleaner on-route —
            <span className="text-white/70"> this is a target, not a guarantee</span>. Early sign-ups get first-dibs at launch.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              variant={tab === 'customer' ? 'primary' : 'ghost'}
              onClick={() => setTab('customer')}
            >
              Join as Customer
            </Button>
            <Button
              variant={tab === 'cleaner' ? 'primary' : 'ghost'}
              onClick={() => setTab('cleaner')}
            >
              Apply as Cleaner
            </Button>
          </div>
        </div>

        {/* Compact above-the-fold form card */}
        <Card className="p-6">
          {tab === 'customer' ? <CustomerForm compact /> : <CleanerForm compact />}
        </Card>
      </div>
    </Section>
  );
}

function Features() {
  const items = [
    {
      t: 'Fast matching',
      d: 'Get paired with a nearby pro the moment you submit a request.',
    },
    {
      t: 'Live ETA tracking',
      d: 'See your cleaner on the map with precise arrival estimates.',
    },
    {
      t: 'Flexible jobs',
      d: 'Quick tidy-ups or deeper cleans — choose exactly what you need.',
    },
  ];
  return (
    <Section id="features" className="py-14">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Made for real life messes</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map(({ t, d }) => (
          <Card key={t}>
            <div className="text-lg font-medium mb-1">{t}</div>
            <div className="text-white/75">{d}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    ['Request', 'Tell us what you need and where.'],
    ['Match', 'We connect you to a nearby cleaner.'],
    ['Track', 'See live ETA and arrival updates.'],
    ['Relax', 'Pay securely after the job is done.'],
  ];
  return (
    <Section id="how" className="py-14">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">How it works</h2>
      <ol className="grid md:grid-cols-4 gap-4 counter-reset">
        {steps.map(([t, d], i) => (
          <li key={t} className="relative">
            <Card>
              <div className="text-sm text-white/60 mb-1">Step {i + 1}</div>
              <div className="text-lg font-medium">{t}</div>
              <div className="text-white/75 mt-1">{d}</div>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function SocialProof() {
  return (
    <Section className="py-14">
      <Card className="text-center p-8">
        <p className="text-xl md:text-2xl font-medium">
          “It felt like food delivery, but for cleaning — the ETA was spot on.”
        </p>
        <p className="mt-2 text-white/70">— Early beta tester</p>
      </Card>
    </Section>
  );
}

function CTA() {
  return (
    <Section className="py-14">
      <Card className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">Be first at launch</h3>
          <p className="text-white/75">Join now and get priority access when your city goes live.</p>
        </div>
        <a href="#top-form" className="inline-flex">
          <Button variant="primary">Join the interest list</Button>
        </a>
      </Card>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="mx-auto max-w-7xl px-4 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Sheeni logo"
            className="h-6 w-6 rounded-md object-contain ring-1 ring-white/10 shadow"
            width={24}
            height={24}
          />
          <span className="font-semibold">Sheeni</span>
        </div>
        <div className="text-white/60">© {new Date().getFullYear()} Sheeni</div>
      </div>
    </footer>
  );
}

/* ----------------- FORMS ----------------- */

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
      setFormKey(k => k + 1);
      setSent(true);
    } catch (err) {
      alert('Submission failed: ' + (err.message || 'network error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      id="top-form"
      key={formKey}
      onSubmit={submit}
      autoComplete="off"
      className={`grid gap-3 ${compact ? '' : 'md:grid-cols-2'}`}
    >
      <Input name="name" required placeholder="Full name" />
      <Input type="email" name="email" required placeholder="Email" />
      <Input name="phone" placeholder="Phone (for launch SMS)" className={compact ? '' : 'md:col-span-2'} />
      <Input name="city" placeholder="City" />
      <Input name="zip" placeholder="ZIP code" />
      <Textarea name="notes" placeholder="What kind of clean do you need most?" className={compact ? '' : 'md:col-span-2 h-28'} />

      <Button type="submit" loading={loading} className={compact ? '' : 'md:col-span-2'}>
        Join the interest list
      </Button>
      {sent && <p className={`${compact ? '' : 'md:col-span-2'} text-emerald-300`}>Wish received! ✨</p>}
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
      // Uses your server base + path
      const r = await fetch(`${API_BASE}/api/waitlist/cleaner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.message || j?.error || `HTTP ${r.status}`);

      e.currentTarget.reset();
      setFormKey(k => k + 1);
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
      <Input name="name" required placeholder="Full name" />
      <Input type="email" name="email" required placeholder="Email" />
      <Input name="phone" placeholder="Phone" />
      <Input name="service_area" placeholder="Service area (ZIPs or neighborhoods)" />
      <Textarea name="experience" placeholder="Experience (years, specialties)" className={compact ? '' : 'md:col-span-2 h-28'} />

      <Button type="submit" loading={loading} className={compact ? '' : 'md:col-span-2'}>
        Apply as a cleaner
      </Button>
      {sent && <p className={`${compact ? '' : 'md:col-span-2'} text-emerald-300`}>Wish received! ✨</p>}
    </form>
  );
}

/* ----------------- TINY PRIMITIVES ----------------- */

function Section({ className = '', id, children }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 ${className}`}>{children}</section>
  );
}

function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 ring-1 ring-white/10 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/90">
      {children}
    </span>
  );
}

function Tabs({ tab, setTab }) {
  return (
    <div className="mb-6 inline-flex rounded-xl border border-white/15 bg-white/[0.06] p-1">
      <TabButton active={tab === 'customer'} onClick={() => setTab('customer')}>
        I’m a Customer
      </TabButton>
      <TabButton active={tab === 'cleaner'} onClick={() => setTab('cleaner')}>
        I’m a Cleaner
      </TabButton>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border transition ${
        active
          ? 'bg-purple-600 border-purple-500 text-white shadow'
          : 'bg-transparent border-transparent text-white/85 hover:bg-white/5'
      }`}
    >
      {children}
    </button>
  );
}

function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      autoComplete="off"
      className={`w-full rounded-xl bg-white/5 border border-white/12 px-3 py-2 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/60 ${className}`}
    />
  );
}

function Textarea({ className = '', ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl bg-white/5 border border-white/12 px-3 py-2 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/60 ${className}`}
    />
  );
}

function Button({ variant = 'primary', loading = false, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition';
  const styles =
    variant === 'primary'
      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30'
      : 'border border-white/20 text-white/85 hover:bg-white/5';
  return (
    <button
      {...props}
      disabled={loading}
      className={`${base} ${styles} disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? 'Submitting…' : props.children}
    </button>
  );
}
