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
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* HERO */}
      <section className="px-6 pt-16 pb-10">
        <div className="max-w-5xl mx-auto text-center">
          <img
            src={LOGO_URL}
            alt="Sheeni Logo"
            className="mx-auto rounded-2xl"
            width={220}
            height={220}
            style={{ maxWidth: '220px', height: 'auto' }}
          />
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Sheeni — The Cleaning Genie
          </h1>

          {/* Taglines */}
          <div className="mt-4 space-y-1 text-gray-300">
            <p>Clean home. Clear mind.</p>
            <p>Trusted pros, on your schedule.</p>
            <p>Book better, not harder.</p>
          </div>

          {/* Launch disclaimer */}
          <p className="mt-6 text-base text-gray-300 max-w-3xl mx-auto">
            We’re preparing our launch. This page is for <span className="font-semibold">interest sign-ups</span>.
            Add your details to get <span className="font-semibold">email/text updates</span> on release and
            instructions to download the app and create your account. Everyone on this list gets
            <span className="font-semibold"> first dibs on access at launch</span>.
          </p>

          {/* Quick CTAs to switch tabs */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setTab('customer')}
              className={`px-5 py-3 rounded-xl font-semibold border ${
                tab === 'customer'
                  ? 'bg-green-600 border-green-500 hover:bg-green-700'
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              }`}
            >
              I’m a Customer
            </button>
            <button
              onClick={() => setTab('cleaner')}
              className={`px-5 py-3 rounded-xl font-semibold border ${
                tab === 'cleaner'
                  ? 'bg-green-600 border-green-500 hover:bg-green-700'
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              }`}
            >
              I’m a Cleaner
            </button>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION SECTION */}
      <section className="px-6 py-10 border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Potential Customers */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="text-xl font-bold mb-2">For Potential Customers</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Tell us your space & needs. We’ll notify you when booking opens in your area.</li>
              <li>Transparent pricing before you confirm.</li>
              <li>In-app chat, rescheduling, and ratings at launch.</li>
            </ul>
          </div>

          {/* Potential Cleaners */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h2 className="text-xl font-bold mb-2">For Potential Cleaners</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Join the early talent pool—get notified when onboarding opens.</li>
              <li>Pick the jobs you want. Keep your own schedule.</li>
              <li>Ratings = more visibility. Bring your experience & earn more.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How it will work at launch</h2>
          <ol className="space-y-3 text-gray-300 list-decimal list-inside">
            <li>Sign up here for early access (customer or cleaner).</li>
            <li>We’ll email/text you when the app is ready in your area.</li>
            <li>Create your account in the app and start booking or accepting jobs.</li>
          </ol>
          <p className="mt-3 text-sm text-gray-400">
            Note: Response times and coverage will improve as we onboard more cleaners and expand regions.
            No service-time guarantees pre-launch.
          </p>
        </div>
      </section>

      {/* FORM SECTION (TABS) */}
      <section className="px-6 pb-16" id="waitlist">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 mb-4">
            <TabButton active={tab==='customer'} onClick={()=>setTab('customer')}>Customer Interest</TabButton>
            <TabButton active={tab==='cleaner'} onClick={()=>setTab('cleaner')}>Cleaner Interest</TabButton>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4 bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
            {tab === 'customer' ? (
              <>
                <Input label="Full Name" value={cust.name} onChange={v=>setCust(s=>({...s, name:v}))} />
                <Input label="Email*" type="email" required value={cust.email} onChange={v=>setCust(s=>({...s, email:v}))} />
                <Input label="Phone*" value={cust.phone} onChange={v=>setCust(s=>({...s, phone:v}))} />
                <TextArea label="What do you need cleaned? (optional)" value={cust.message} onChange={v=>setCust(s=>({...s, message:v}))} />
                <SmallNote>
                  You’ll receive an email or text when Sheeni launches in your area with a link to download the app
                  and create your account. Early sign-ups get priority access.
                </SmallNote>
              </>
            ) : (
              <>
                <Input label="Full Name" value={clean.name} onChange={v=>setClean(s=>({...s, name:v}))} />
                <Input label="Email*" type="email" required value={clean.email} onChange={v=>setClean(s=>({...s, email:v}))} />
                <Input label="Phone*" value={clean.phone} onChange={v=>setClean(s=>({...s, phone:v}))} />
                <TextArea label="About you / availability" value={clean.message} onChange={v=>setClean(s=>({...s, message:v}))} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="City" value={clean.city} onChange={v=>setClean(s=>({...s, city:v}))} />
                  <Input label="Service area" value={clean.service_area} onChange={v=>setClean(s=>({...s, service_area:v}))} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Experience (years)" type="number" value={clean.experience_years} onChange={v=>setClean(s=>({...s, experience_years:v}))} />
                  <Select label="Vehicle" value={clean.vehicle} onChange={v=>setClean(s=>({...s, vehicle:v}))}
                          options={[{v:'',t:'Select…'},{v:'yes',t:'Yes'},{v:'no',t:'No'}]} />
                </div>
                <SmallNote>
                  We’ll notify you by email or text when cleaner onboarding starts in your area. Early sign-ups get priority for invites.
                </SmallNote>
              </>
            )}

            <button disabled={status==='loading'} className={`px-4 py-3 rounded-xl font-semibold ${
              status==='loading' ? 'bg-gray-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}>
              {status==='loading' ? 'Sending…' : (tab==='customer' ? 'Join Customer Interest List' : 'Join Cleaner Interest List')}
            </button>

            {status==='ok' && <div className="p-3 rounded-lg bg-green-900 border border-green-700">Thanks! You’re on the list — we’ll be in touch before launch.</div>}
            {status==='error' && <div className="p-3 rounded-lg bg-red-900 border border-red-700">{error}</div>}
          </form>

          <p className="text-xs text-gray-400 mt-3">
            By submitting, you agree we may contact you about Sheeni updates and availability.
          </p>
        </div>
      </section>

      <footer className="px-6 pb-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sheeni
      </footer>
    </main>
  );
}

/* ---- Reusable UI ---- */

function SmallNote({ children }) {
  return <p className="text-sm text-gray-400">{children}</p>;
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold border ${
        active ? 'bg-green-800 border-green-600' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type='text', required=false }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        type={type}
        required={required}
        className="w-full px-3 py-2 rounded-lg bg-gray-950 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select
        value={value}
        onChange={e=>onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-950 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
      >
        {options.map(o => <option key={o.v} value={o.v}>{o.t}</option>)}
      </select>
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={e=>onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-950 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 resize-y"
      />
    </div>
  );
}
