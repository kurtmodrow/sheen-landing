'use client';
import { useState } from 'react';

// ====== BRAND ======
const LOGO_URL = '/logo.png'; // ensure /public/logo.png exists

// ====== API BASE ======
// Uses Vercel env if present, otherwise falls back to your working Render URL.
// If you change your Render domain, update the fallback string.
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://sheeni-server.onrender.com"; // <— your API

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header/>
      <Hero/>
      <How/>
      <Features/>
      <Reviews/>
      <CustomerSignup/>   {/* separate section */}
      <CleanerSignup/>    {/* separate section */}
      <Footer/>
    </main>
  );
}

function Header(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-night/70 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          {/* Bigger header logo */}
          <img src={LOGO_URL} className="h-12 w-12 rounded-lg shadow ring-1 ring-white/10" alt="Sheeni logo"/>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-xl tracking-tight">Sheeni</span>
            <span className="text-emerald-300/80 text-[11px] border border-emerald-300/30 rounded-full px-2 py-[1px] w-fit">
              The Cleaning Genie
            </span>
          </div>
        </a>
        <nav className="hidden md:flex gap-5 text-white/80">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#signup-customers" className="hover:text-white">Customers</a>
          <a href="#signup-cleaners" className="hover:text-white">Cleaners</a>
        </nav>
      </div>
    </header>
  );
}

function Hero(){
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-12 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
          New in Orlando ✨
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
          Your wish for a clean home, <span className="text-emerald-400">granted</span>.
        </h1>
        <p className="mt-4 text-white/80">
          Book exactly the time you need—quick 1-hour spruce-ups, focused 2-hour refreshes,
          or longer deep cleans. Upload photos and describe the job. Cleaners get an Instacart-style alert;
          first to accept claims it and heads your way.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#signup-customers" className="bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg font-medium">I want cleaning</a>
          <a href="#signup-cleaners" className="bg-purple-600/30 border border-purple-400/30 hover:bg-purple-600/40 px-4 py-2 rounded-lg font-medium">I want to clean</a>
        </div>
      </div>

      {/* BIG mascot showcase */}
      <div className="relative">
        <div className="absolute -inset-10 bg-emerald-600/15 blur-3xl rounded-3xl"></div>
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col items-center">
          {/* MASSIVE center-stage logo */}
          <img
            src={LOGO_URL}
            alt="Sheeni mascot"
            className="h-40 w-40 md:h-52 md:w-52 rounded-2xl shadow-2xl ring-1 ring-white/10"
          />
          <p className="mt-6 text-white/80 text-center max-w-md">
            Meet <span className="text-emerald-300">Sheeni</span>, your Cleaning Genie. Rub the lamp (okay, click the button),
            and a nearby pro appears—ready to grant spotless wishes.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#signup-customers" className="px-4 py-2 bg-emerald-500/90 rounded">Register Interest</a>
            <a href="#signup-cleaners" className="px-4 py-2 bg-white/10 rounded border border-white/15">Become a Genie</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function How(){
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-semibold">How it works</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Step n={1} title="Pick your time" text="Choose 1 hour, 2 hours, or more. Pay for exactly what you need."/>
        <Step n={2} title="Show & tell" text="Upload photos and describe the task—kitchen, bath, living areas, your call."/>
        <Step n={3} title="Claimed in-app" text="Cleaners get an alert. First to accept claims it and heads your way."/>
      </div>
    </section>
  );
}

function Step({n,title,text}){
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-300/30 text-emerald-300">{n}</div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="text-white/80 mt-1">{text}</p>
    </div>
  );
}

function Features(){
  const items = [
    ["Transparent pay & tips", "Set a tip upfront. Cleaners see rate + tip before accepting."],
    ["Profiles & reviews", "See cleaner ratings and past jobs before booking."],
    ["Live arrival ETA", "Track your Genie to your door and chat in-app."],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-3 gap-6">
      {items.map(([t,d],i)=>(
        <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h3 className="font-semibold">{t}</h3>
          <p className="text-white/80 mt-1">{d}</p>
        </div>
      ))}
    </section>
  );
}

function Reviews(){
  const quotes=[
    ["Booked a 2-hour kitchen reset before guests. Lifesaver.", "— Mia, Baldwin Park"],
    ["As a cleaner I see pay + tip upfront. No surprises.", "— Andre, Winter Garden"],
    ["Uploading photos kept the job focused on what mattered.", "— Leah, Thornton Park"],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-3 gap-6">
      {quotes.map(([q,a],i)=>(
        <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-white/90">“{q}”</p>
          <p className="text-white/60 mt-3">{a}</p>
        </div>
      ))}
    </section>
  );
}

/* ----------------------  CUSTOMER SIGNUP  ---------------------- */
function CustomerSignup(){
  return (
    <section id="signup-customers" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center gap-3 mb-4">
        <img src={LOGO_URL} alt="" className="h-10 w-10 rounded-md ring-1 ring-white/10"/>
        <h3 className="text-2xl font-semibold">Join the waitlist — Customers</h3>
      </div>
      <p className="text-white/75 mb-6">
        Tell us where you are and what you want cleaned. We’ll notify you as soon as Genies go live in your area.
      </p>
      <CustomerForm/>
    </section>
  );
}

function CustomerForm(){
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  async function submit(e){
    e.preventDefault();
    setLoading(true); setSent(false);
    try {
      const fd = new FormData(e.currentTarget);
      const payload = Object.fromEntries(fd.entries());
      const r = await fetch(`${API_BASE}/waitlist/customer`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const j = await r.json().catch(()=>({}));
      if (!r.ok) throw new Error(j?.message || j?.error || `HTTP ${r.status}`);

      e.currentTarget.reset();
      setFormKey(k => k + 1);
      setSent(true);
    } catch (err) {
      alert("Submission failed: " + (err.message || "network error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      key={formKey}
      onSubmit={submit}
      autoComplete="off"
      className="grid md:grid-cols-2 gap-3"
    >
      <input name="name" required placeholder="Full name" autoComplete="off"
             className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <input type="email" name="email" required placeholder="Email" autoComplete="off"
             className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <input name="phone" placeholder="Phone" autoComplete="off"
             className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <input name="zip" placeholder="ZIP code" autoComplete="off"
             className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <textarea name="notes" placeholder="What needs cleaning? (rooms, priorities)"
                className="md:col-span-2 bg-white/10 border border-white/15 rounded px-3 py-2 h-28"></textarea>
      <button type="submit" disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 rounded px-4 py-2 font-medium md:col-span-2">
        {loading ? "Submitting…" : "Join waitlist"}
      </button>
      {sent && <p className="text-emerald-300 md:col-span-2">Wish received! ✨</p>}
    </form>
  );
}

/* ----------------------  CLEANER SIGNUP  ---------------------- */
function CleanerSignup(){
  return (
    <section id="signup-cleaners" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center gap-3 mb-4">
        <img src={LOGO_URL} alt="" className="h-10 w-10 rounded-md ring-1 ring-white/10"/>
        <h3 className="text-2xl font-semibold">Apply to clean — Become a Genie</h3>
      </div>
      <p className="text-white/75 mb-6">
        Flexible jobs near you. See pay + tip before accepting. Get notified first; claim jobs Instacart-style.
      </p>
      <CleanerForm/>
    </section>
  );
}

function CleanerForm(){
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);

  async function submit(e){
    e.preventDefault();
    setLoading(true); setSent(false);
    try {
      const fd = new FormData(e.currentTarget);
      const payload = Object.fromEntries(fd.entries());
      const r = await fetch(`${API_BASE}/waitlist/cleaner`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const j = await r.json().catch(()=>({}));
      if (!r.ok) throw new Error(j?.message || j?.error || `HTTP ${r.status}`);

      e.currentTarget.reset();
      setFormKey(k => k + 1);
      setSent(true);
    } catch (err) {
      alert("Submission failed: " + (err.message || "network error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      key={formKey}
      onSubmit={submit}
      autoComplete="off"
      className="grid md:grid-cols-2 gap-3"
    >
      <input name="name" required placeholder="Full name" autoComplete="off"
             className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <input type="email" name="email" required placeholder="Email" autoComplete="off"
             className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <input name="phone" placeholder="Phone" autoComplete="off"
             className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <input name="service_area" placeholder="Service area (ZIPs or neighborhoods)" autoComplete="off"
             className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <textarea name="experience" placeholder="Experience (years, specialties)"
                className="md:col-span-2 bg-white/10 border border-white/15 rounded px-3 py-2 h-28"></textarea>
      <button type="submit" disabled={loading}
              className="bg-purple-500 hover:bg-purple-400 rounded px-4 py-2 font-medium md:col-span-2">
        {loading ? "Submitting…" : "Apply as a cleaner"}
      </button>
      {sent && <p className="text-emerald-300 md:col-span-2">Wish received! ✨</p>}
    </form>
  );
}

function Footer(){
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="mx-auto max-w-6xl px-4 py-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Keep logo visible down here too */}
          <img src={LOGO_URL} className="h-10 w-10 rounded-md shadow" alt="Sheeni logo"/>
          <span className="font-semibold">Sheeni</span>
        </div>
        <div className="text-white/60">© {new Date().getFullYear()} Sheeni</div>
      </div>
    </footer>
  );
}
