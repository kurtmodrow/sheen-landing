'use client';
import { useState, useRef } from 'react';

const LOGO_URL = '/logo.png';        // big header logo
const CARD_IMG = '/logo.png';        // right hero card image (use another if you have it)

export default function Page() {
  const [tab, setTab] = useState('customer'); // 'customer' | 'cleaner'
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const [cust, setCust] = useState({ name: '', email: '', phone: '', message: '' });
  const [clean, setClean] = useState({
    name: '', email: '', phone: '', message: '',
    city: '', service_area: '', experience_years: '', vehicle: ''
  });

  function goToForm(nextTab) {
    if (nextTab) setTab(nextTab);
    setStatus('idle');
    setError('');
    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading'); setError('');

    const url = tab === 'customer' ? '/api/waitlist/customer' : '/api/waitlist/cleaner';
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
    <main className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_-10%,#0f2e25_0%,transparent_60%),linear-gradient(180deg,#0a0f13_0%,#06090a_100%)] text-gray-100">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Sheeni" className="h-8 w-8 rounded-lg" />
            <div className="text-sm">
              <div className="font-semibold leading-tight">Sheeni</div>
              <div className="text-emerald-300/90 text-[11px] -mt-0.5">The Cleaning Genie</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-white/95 text-white/75">How it works</a>
            <a href="#waitlist" className="hover:text-white/95 text-white/75">Customers</a>
            <a href="#waitlist" className="hover:text-white/95 text-white/75">Cleaners</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-700/30 bg-emerald-900/20 px-3 py-1 text-xs text-emerald-200">
              <span>New in Orlando</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 inline-block" />
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
              Your wish for a clean<br />
              home, <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 bg-clip-text text-transparent">granted.</span>
            </h1>

            <p className="mt-4 text-gray-300 max-w-prose">
              Book exactly the time you need—quick 1-hour spruce-ups, focused 2-hour refreshes, or longer deep cleans.
              Upload photos and describe the job. Cleaners get an instant-style alert; first to accept claims it and heads your way.
              <span className="block mt-3 text-gray-400 text-sm">
                We’re pre-launch. This page is for interest sign-ups. We’ll email/text when the app is ready to download so you can create your account. Interest list gets priority access at launch.
              </span>
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => goToForm('customer')}
                className="rounded-xl px-4 py-2 font-semibold bg-emerald-500 text-gray-900 hover:bg-emerald-400 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]">
                Book a Cleaner
              </button>
              <button onClick={() => goToForm('cleaner')}
                className="rounded-xl px-4 py-2 font-semibold border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur">
                Become a Cleaner
              </button>
            </div>
          </div>

          {/* Right card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 shadow-2xl backdrop-blur">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl ring-1 ring-white/10 p-4 bg-black/30">
                <img src={CARD_IMG} alt="Sheeni card" className="h-28 w-28 rounded-xl" />
              </div>
              <div className="mt-4 text-3xl font-bold">Sheeni</div>
              <div className="text-emerald-300/90 text-sm -mt-1 mb-4">The Cleaning Genie</div>
              <p className="text-gray-300 text-sm max-w-sm">
                Meet Sheeni, your Cleaning Genie. Rub the lamp (okay, click the button), and a nearby pro appears—ready to grant spotless wishes.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => goToForm('customer')}
                  className="rounded-xl px-4 py-2 font-semibold bg-emerald-500 text-gray-900 hover:bg-emerald-400">
                  Join Waitlist
                </button>
                <button onClick={() => goToForm('cleaner')}
                  className="rounded-xl px-4 py-2 font-semibold border border-white/15 bg-white/5 hover:bg-white/10">
                  Become a Genie
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-6 pb-4">
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StepCard n={1} title="Pick your time">
            Choose 1 hour, 2 hours, or more. Pay for exactly what you need.
          </StepCard>
          <StepCard n={2} title="Show & tell">
            Upload photos and describe the task—kitchen, bath, living area; your call.
          </StepCard>
          <StepCard n={3} title="Claimed in-app">
            Cleaners get an alert. First to accept claims it and heads your way.
          </StepCard>
        </div>
      </section>

      {/* FORMS */}
      <section id="waitlist" ref={formRef} className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <Seg onClick={() => setTab('customer')} active={tab==='customer'}>Customer</Seg>
          <Seg onClick={() => setTab('cleaner')} active={tab==='cleaner'}>Cleaner</Seg>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 shadow-2xl backdrop-blur grid gap-4">
          {tab === 'customer' ? (
            <>
              <Row><Input label="Full Name" value={cust.name} onChange={v=>setCust(s=>({...s, name:v}))} /></Row>
              <Row>
                <Input label="Email*" type="email" required value={cust.email} onChange={v=>setCust(s=>({...s, email:v}))} />
                <Input label="Phone*" value={cust.phone} onChange={v=>setCust(s=>({...s, phone:v}))} />
              </Row>
              <Row><TextArea label="What do you need cleaned? (optional)" value={cust.message} onChange={v=>setCust(s=>({...s, message:v}))} /></Row>
              <p className="text-xs text-gray-400">
                We’ll email/text on launch with a link to download the app and create your account. Interest list gets priority access.
              </p>
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
              <p className="text-xs text-gray-400">
                We’ll notify you when onboarding opens in your area. Early sign-ups get priority invites.
              </p>
            </>
          )}

          <button
            disabled={status==='loading'}
            className={`mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition ${
              status==='loading'
                ? 'bg-emerald-700/50 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-gray-900 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]'
            }`}
          >
            {status==='loading' ? 'Sending…' : (tab==='customer' ? 'Join Customer Interest List' : 'Join Cleaner Interest List')}
          </button>

          {status==='ok' && <Alert tone="success">Thanks! You’re on the list — we’ll be in touch before launch.</Alert>}
          {status==='error' && <Alert tone="error">{error}</Alert>}
        </form>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sheeni
      </footer>
    </main>
  );
}

/* ---------- UI primitives ---------- */

function StepCard({ n, title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-emerald-300">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/50">{n}</span>
        <div className="font-semibold">{title}</div>
      </div>
      <p className="mt-2 text-sm text-gray-300">{children}</p>
    </div>
  );
}

function Seg({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-medium border ${
        active ? 'bg-emerald-500 text-gray-900 border-emerald-400' : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}

function Row({ children }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
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
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-emerald-400/60"
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
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-emerald-400/60"
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
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none resize-y focus:border-emerald-400/60"
      />
    </div>
  );
}

function Alert({ tone, children }) {
  const styles = tone === 'success'
    ? 'bg-emerald-900/60 border-emerald-700/60 text-emerald-100'
    : 'bg-red-900/60 border-red-700/60 text-red-100';
  return <div className={`mt-3 rounded-xl border px-4 py-3 ${styles}`}>{children}</div>;
}
