'use client';
import { useState } from 'react';

const LOGO_URL = '/logo.png'; // ensure /public/logo.png exists

export default function Page() {
  const [tab, setTab] = useState('customer'); // 'customer' | 'cleaner'
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const [cust, setCust] = useState({ name: '', email: '', phone: '', message: '' });
  const [clean, setClean] = useState({
    name: '', email: '', phone: '', message: '',
    city: '', service_area: '', experience_years: '', vehicle: ''
  });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading'); setError('');

    const url = tab === 'customer'
      ? '/api/waitlist/customer'
      : '/api/waitlist/cleaner';

    const body = tab === 'customer'
      ? { ...cust }
      : { ...clean, experience_years: clean.experience_years ? Number(clean.experience_years) : null };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus('error'); setError(json?.error || 'Submit failed'); return;
      }
      setStatus('ok');
      if (tab === 'customer') setCust({ name:'', email:'', phone:'', message:'' });
      else setClean({ name:'', email:'', phone:'', message:'', city:'', service_area:'', experience_years:'', vehicle:'' });
    } catch (err) {
      setStatus('error'); setError(err?.message || 'Network error');
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-10%,#1b3b2e_0%,transparent_60%),linear-gradient(180deg,#060908_0%,#0a0f13_100%)] text-gray-100">
      {/* NAV/LOGO + HERO */}
      <header className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-10">
          <div className="flex items-center justify-center">
            <img
              src={LOGO_URL}
              alt="Sheeni"
              className="h-28 w-28 rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-emerald-900/30"
            />
          </div>

          <div className="mx-auto max-w-3xl text-center mt-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Sheeni — The Cleaning Genie
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              We’re getting ready to launch. This page is for <span className="font-semibold">interest sign-ups</span>.
              Add your details to get <span className="font-semibold">email/text updates</span> on release and a link to download the app and create your account.
              Everyone on this list gets <span className="font-semibold">first dibs on access at launch</span>.
            </p>

            {/* Taglines */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-300">
              <Badge>Clean home. Clear mind.</Badge>
              <Badge>Trusted pros, on your schedule.</Badge>
              <Badge>Book better, not harder.</Badge>
            </div>

            {/* Segmented Switch */}
            <div className="mt-8 inline-flex rounded-2xl bg-white/5 p-1 ring-1 ring-white/10 backdrop-blur">
              <SegButton active={tab==='customer'} onClick={()=>setTab('customer')}>I’m a Customer</SegButton>
              <SegButton active={tab==='cleaner'} onClick={()=>setTab('cleaner')}>I’m a Cleaner</SegButton>
            </div>
          </div>
        </div>
      </header>

      {/* DIFFERENTIATION */}
      <section className="mx-auto max-w-7xl px-6 mt-12">
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <h2 className="text-xl font-semibold">For Potential Customers</h2>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li className="flex gap-2"><Dot />Tell us your space & needs. We’ll notify you when booking opens in your area.</li>
              <li className="flex gap-2"><Dot />Transparent pricing before you confirm.</li>
              <li className="flex gap-2"><Dot />In-app chat, rescheduling, and ratings at launch.</li>
            </ul>
          </GlassCard>
          <GlassCard>
            <h2 className="text-xl font-semibold">For Potential Cleaners</h2>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li className="flex gap-2"><Dot />Join the early talent pool—get notified when onboarding opens.</li>
              <li className="flex gap-2"><Dot />Pick the jobs you want. Keep your own schedule.</li>
              <li className="flex gap-2"><Dot />Ratings = more visibility. Bring your experience & earn more.</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 mt-10">
        <GlassCard>
          <h3 className="text-lg font-semibold">How it will work at launch</h3>
          <ol className="mt-3 space-y-2 text-gray-300 list-decimal list-inside">
            <li>Sign up here for early access (customer or cleaner).</li>
            <li>We’ll email/text you when the app is ready in your area.</li>
            <li>Create your account in the app and start booking or accepting jobs.</li>
          </ol>
          <p className="mt-3 text-xs text-gray-400">
            Note: Response times and coverage will improve as we onboard more cleaners and expand regions. No service-time guarantees pre-launch.
          </p>
        </GlassCard>
      </section>

      {/* FORMS */}
      <section className="mx-auto max-w-4xl px-6 my-12">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-sm uppercase tracking-wider text-emerald-300/80">Interest Sign-Up</span>
            <span className="text-xs text-gray-400">Early sign-ups receive priority access at launch</span>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            {tab === 'customer' ? (
              <>
                <Row><Input label="Full Name" value={cust.name} onChange={v=>setCust(s=>({...s, name:v}))} /></Row>
                <Row>
                  <Input label="Email*" type="email" required value={cust.email} onChange={v=>setCust(s=>({...s, email:v}))} />
                  <Input label="Phone*" value={cust.phone} onChange={v=>setCust(s=>({...s, phone:v}))} />
                </Row>
                <Row><TextArea label="What do you need cleaned? (optional)" value={cust.message} onChange={v=>setCust(s=>({...s, message:v}))} /></Row>
                <SmallNote>
                  We’ll email/text on launch with a link to download the app and create your account.
                </SmallNote>
              </>
            ) : (
              <>
                <Row><Input label="Full Name" value={clean.name} onChange={v=>setClean(s=>({...s, name:v}))} /></Row>
                <Row>
                  <Input label="Email*" type="email" required value={clean.email} onChange={v=>setClean(s=>({...s, email:v}))} />
                  <Input label="Phone*" value={clean.phone} onChange={v=>setClean(s=>({...s, phone:v}))} />
                </Row>
                <Row>
                  <Input label="City" value={clean.city} onChange={v=>setClean(s=>({...s, city:v}))} />
                  <Input label="Service area" value={clean.service_area} onChange={v=>setClean(s=>({...s, service_area:v}))} />
                </Row>
                <Row>
                  <Input label="Experience (years)" type="number" value={clean.experience_years} onChange={v=>setClean(s=>({...s, experience_years:v}))} />
                  <Select label="Vehicle" value={clean.vehicle} onChange={v=>setClean(s=>({...s, vehicle:v}))}
                          options={[{v:'',t:'Select…'},{v:'yes',t:'Yes'},{v:'no',t:'No'}]} />
                </Row>
                <Row><TextArea label="About you / availability" value={clean.message} onChange={v=>setClean(s=>({...s, message:v}))} /></Row>
                <SmallNote>
                  We’ll notify you when onboarding opens in your area. Early sign-ups get priority invites.
                </SmallNote>
              </>
            )}

            <button
              disabled={status==='loading'}
              className={`mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] transition ${
                status==='loading'
                  ? 'bg-emerald-700/50 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-gray-900'
              }`}
            >
              {status==='loading' ? 'Sending…' : (tab==='customer' ? 'Join Customer Interest List' : 'Join Cleaner Interest List')}
            </button>

            {status==='ok' && <Alert tone="success">Thanks! You’re on the list — we’ll be in touch before launch.</Alert>}
            {status==='error' && <Alert tone="error">{error}</Alert>}
          </form>

          <p className="mt-4 text-[11px] text-gray-400">
            By submitting, you agree we may contact you about Sheeni updates and availability.
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sheeni
      </footer>
    </main>
  );
}

/* ---------- UI bits (no external libs) ---------- */

function Dot() {
  return <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400 inline-block flex-none translate-y-1" />;
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs backdrop-blur">
      {children}
    </span>
  );
}

function SegButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
        active
          ? 'bg-emerald-500 text-gray-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function GlassCard({ children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

function SmallNote({ children }) {
  return <p className="text-sm text-gray-300">{children}</p>;
}

function Alert({ tone, children }) {
  const styles = tone === 'success'
    ? 'bg-emerald-900/60 border-emerald-700/60 text-emerald-100'
    : 'bg-red-900/60 border-red-700/60 text-red-100';
  return <div className={`mt-3 rounded-2xl border px-4 py-3 ${styles}`}>{children}</div>;
}

function Input({ label, value, onChange, type='text', required=false }) {
  return (
    <div className="col-span-1">
      <label className="block text-xs uppercase tracking-wide text-gray-400 mb-1">{label}</label>
      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-gray-500 focus:border-emerald-400/60 focus:bg-white/[0.06]"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div className="col-span-1">
      <label className="block text-xs uppercase tracking-wide text-gray-400 mb-1">{label}</label>
      <select
        value={value}
        onChange={e=>onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-emerald-400/60 focus:bg-white/[0.06]"
      >
        {options.map(o => <option key={o.v} value={o.v}>{o.t}</option>)}
      </select>
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div className="col-span-1 sm:col-span-2">
      <label className="block text-xs uppercase tracking-wide text-gray-400 mb-1">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={e=>onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none resize-y focus:border-emerald-400/60 focus:bg-white/[0.06]"
      />
    </div>
  );
}

