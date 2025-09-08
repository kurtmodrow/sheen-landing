'use client';
import { useState } from 'react';

const LOGO_URL = '/logo.png'; // upload your Sheeni logo as /public/logo.png
const API_BASE = https://sheeni-server.onrender.com;

export default function Page() {
  const [tab, setTab] = useState('customer');
  return (
    <main className="min-h-screen">
      <Header/>
      <Hero/>
      <How/>
      <Features/>
      <Reviews/>
      <CleanerCTA/>
      <SignupSection tab={tab} setTab={setTab}/>
      <Footer/>
    </main>
  );
}

function Header(){
  return (
    <header className="sticky top-0 backdrop-blur bg-night/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} className="h-8 w-8" alt="Sheeni"/>
          <span className="font-semibold text-lg">Sheeni</span>
          <span className="text-emerald-300/80 text-sm border border-emerald-300/30 rounded-full px-2 py-0.5 ml-2">The Cleaning Genie</span>
        </div>
        <nav className="hidden md:flex gap-4 text-white/80">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#signup" className="hover:text-white">Sign up</a>
        </nav>
      </div>
    </header>
  );
}

function Hero(){
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
          New in Orlando ✨
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
          Your wish for a clean home, <span className="text-emerald-400">granted</span>.
        </h1>
        <p className="mt-4 text-white/80">
          Book exactly the time you need — quick 1-hour spruce-ups, focused 2-hour refreshes, or longer deep-cleans. Upload photos and describe the task. Cleaners get an Instacart-style alert; first to accept claims it and heads your way.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#signup" className="bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg font-medium">I want cleaning</a>
          <a href="#signup" className="bg-purple-600/30 border border-purple-400/30 hover:bg-purple-600/40 px-4 py-2 rounded-lg font-medium">I want to clean</a>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-2 bg-emerald-600/20 blur-3xl rounded-3xl"></div>
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-white/10 rounded"></div>
            <div className="h-10 bg-white/10 rounded"></div>
            <div className="h-24 bg-white/10 rounded col-span-2"></div>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="px-3 py-2 bg-emerald-500/80 rounded text-sm">Create Job</div>
            <div className="px-3 py-2 bg-white/10 rounded text-sm">Assign Nearest</div>
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
        <Step n={2} title="Show & tell" text="Upload photos and describe the task — kitchen, bath, living areas, you decide."/>
        <Step n={3} title="Claimed in-app" text="Cleaners get the alert like Instacart. First to accept claims it and heads out."/>
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

function CleanerCTA(){
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-700/30 to-emerald-700/30 p-8 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-2xl font-semibold">Become a Genie — work on your terms</h3>
          <ul className="mt-4 space-y-2 text-white/85">
            <li>• See pay + tip before accepting</li>
            <li>• Choose jobs near you</li>
            <li>• Instant payouts (coming soon)</li>
          </ul>
        </div>
        <div className="md:text-right">
          <a href="#signup" className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-lg font-medium">Apply as a cleaner</a>
        </div>
      </div>
    </section>
  );
}

function SignupSection({tab,setTab}){
  return (
    <section id="signup" className="mx-auto max-w-6xl px-4 py-16">
      <h3 className="text-2xl font-semibold">Join the waitlist</h3>
      <div className="mt-4 inline-flex bg-white/10 border border-white/15 rounded-lg overflow-hidden">
        <button onClick={()=>setTab('customer')} className={`px-4 py-2 ${tab==='customer'?'bg-emerald-500/30':''}`}>Customers</button>
        <button onClick={()=>setTab('cleaner')} className={`px-4 py-2 ${tab==='cleaner'?'bg-purple-500/30':''}`}>Cleaners</button>
      </div>
      <div className="mt-6">{tab==='customer'?<CustomerForm/>:<CleanerForm/>}</div>
    </section>
  );
}

function CustomerForm(){
  const [sent,setSent] = useState(false);
  async function submit(e){
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const r = await fetch(`${API_BASE}/waitlist/customer`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(r.ok){ setSent(true); e.currentTarget.reset(); } else { alert('Error submitting form'); }
  }
  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
      <input name="name" placeholder="Full name" className="bg-white/10 border border-white/15 rounded px-3 py-2" required />
      <input type="email" name="email" placeholder="Email" className="bg-white/10 border border-white/15 rounded px-3 py-2" required />
      <input name="phone" placeholder="Phone" className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <input name="zip" placeholder="ZIP code" className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <textarea name="notes" placeholder="What needs cleaning? (rooms, priorities)" className="md:col-span-2 bg-white/10 border border-white/15 rounded px-3 py-2 h-28"></textarea>
      <button className="bg-emerald-500 hover:bg-emerald-400 rounded px-4 py-2 font-medium md:col-span-2">Join waitlist</button>
      {sent && <p className="text-emerald-300 md:col-span-2">Wish received! ✨</p>}
    </form>
  );
}

function CleanerForm(){
  const [sent,setSent] = useState(false);
  async function submit(e){
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const r = await fetch(`${API_BASE}/waitlist/cleaner`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(r.ok){ setSent(true); e.currentTarget.reset(); } else { alert('Error submitting form'); }
  }
  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
      <input name="name" placeholder="Full name" className="bg-white/10 border border-white/15 rounded px-3 py-2" required />
      <input type="email" name="email" placeholder="Email" className="bg-white/10 border border-white/15 rounded px-3 py-2" required />
      <input name="phone" placeholder="Phone" className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <input name="service_area" placeholder="Service area (ZIPs or neighborhoods)" className="bg-white/10 border border-white/15 rounded px-3 py-2" />
      <textarea name="experience" placeholder="Experience (years, specialties)" className="md:col-span-2 bg-white/10 border border-white/15 rounded px-3 py-2 h-28"></textarea>
      <button className="bg-purple-500 hover:bg-purple-400 rounded px-4 py-2 font-medium md:col-span-2">Apply as a cleaner</button>
      {sent && <p className="text-emerald-300 md:col-span-2">Wish received! ✨</p>}
    </form>
  );
}

function Footer(){
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="h-7 w-7" alt="Sheeni"/>
          <span className="font-semibold">Sheeni</span>
        </div>
        <div className="text-white/60">© {new Date().getFullYear()} Sheeni</div>
      </div>
    </footer>
  );
}
