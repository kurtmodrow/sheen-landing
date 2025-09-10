"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ""; // e.g. https://sheeni-server.onrender.com
// If your logo file has a space (e.g., "Sheeni Logo.png"), either rename it to /public/logo.png
// or set LOGO_URL = '/Sheeni%20Logo.png'
const LOGO_URL = "/logo.png";

// ---- helper: JSON POST with friendly errors
async function postJSON(path, payload) {
  const r = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j?.message || j?.error || `HTTP ${r.status}`);
  return j;
}

export default function Page() {
  const [tab, setTab] = useState("customer"); // 'customer' | 'cleaner'
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-900 via-indigo-900 to-slate-900 text-white">
      <Header />
      <Hero switchTab={setTab} active={tab} />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl p-4 md:p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab("customer")}
              className={`px-4 py-2 rounded-lg border ${
                tab === "customer"
                  ? "bg-purple-600 border-purple-500"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              I’m a Customer
            </button>
            <button
              onClick={() => setTab("cleaner")}
              className={`px-4 py-2 rounded-lg border ${
                tab === "cleaner"
                  ? "bg-purple-600 border-purple-500"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              I’m a Cleaner
            </button>
          </div>

          {tab === "customer" ? <CustomerForm /> : <CleanerForm />}
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
          {/* small, crisp logo */}
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
          <a href="#how" className="hover:text-white">
            How it works
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
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
            Book a trusted cleaner, fast.
            <br />
            Track arrival. Relax sooner.
          </h1>
          <p className="text-white/80 mb-6 max-w-prose">
            Join the interest list to be first in line when Sheeni launches in
            your area. Our goal is{" "}
            <span className="text-white">under 60 minutes</span> from request to
            cleaner on-route —
            <span className="text-white/70">
              {" "}
              this is a target, not a guarantee
            </span>
            . We’ll email/text updates as soon as the app is ready in your city.
            Early sign-ups get first dibs at launch.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => switchTab("customer")}
              className={`px-4 py-2 rounded-lg border ${
                active === "customer"
                  ? "bg-purple-600 border-purple-500"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              Join as Customer
            </button>
            <button
              onClick={() => switchTab("cleaner")}
              className={`px-4 py-2 rounded-lg border ${
                active === "cleaner"
                  ? "bg-purple-600 border-purple-500"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              Apply as Cleaner
            </button>
          </div>
        </div>

        {/* simple compact card like the preview */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          {active === "customer" ? (
            <CustomerForm compact />
          ) : (
            <CleanerForm compact />
          )}
        </div>
      </div>
    </section>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`bg-white/10 border border-white/15 rounded px-3 py-2 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/60 ${className}`}
    />
  );
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      className={`bg-white/10 border border-white/15 rounded px-3 py-2 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/60 ${className}`}
    />
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
    data.role = "customer";

    try {
      await postJSON("/api/waitlist/customer", data);
      e.currentTarget.reset();
      setFormKey((k) => k + 1);
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
      className={`grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}
    >
      <Input name="name" required placeholder="Full name" autoComplete="off" />
      <Input
        type="email"
        name="email"
        required
        placeholder="Email"
        autoComplete="off"
      />
      <Input
        name="phone"
        placeholder="Phone (for launch SMS)"
        autoComplete="off"
        className={compact ? "" : "md:col-span-2"}
      />
      <Input name="city" placeholder="City" autoComplete="off" />
      <Input name="zip" placeholder="ZIP code" autoComplete="off" />
      <Textarea
        name="notes"
        placeholder="What kind of clean do you need most?"
        className={compact ? "" : "md:col-span-2 h-28"}
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-purple-500 hover:bg-purple-400 rounded px-4 py-2 font-medium ${
          compact ? "" : "md:col-span-2"
        }`}
      >
        {loading ? "Submitting…" : "Join the interest list"}
      </button>
      {sent && (
        <p className={`${compact ? "" : "md:col-span-2"} text-emerald-300`}>
          Wish received! ✨
        </p>
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
    data.role = "cleaner";

    try {
      // working path with API base
      const r = await fetch(`${API_BASE}/api/waitlist/cleaner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.message || j?.error || `HTTP ${r.status}`);

      e.currentTarget.reset();
      setFormKey((k) => k + 1);
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
      className={`grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}
    >
      <Input name="name" required placeholder="Full name" autoComplete="off" />
      <Input
        type="email"
        name="email"
        required
        placeholder="Email"
        autoComplete="off"
      />
      <Input name="phone" placeholder="Phone" autoComplete="off" />
      <Input
        name="service_area"
        placeholder="Service area (ZIPs or neighborhoods)"
        autoComplete="off"
      />
      <Textarea
        name="experience"
        placeholder="Experience (years, specialties)"
        className={compact ? "" : "md:col-span-2 h-28"}
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-purple-500 hover:bg-purple-400 rounded px-4 py-2 font-medium ${
          compact ? "" : "md:col-span-2"
        }`}
      >
        {loading ? "Submitting…" : "Apply as a cleaner"}
      </button>
      {sent && (
        <p className={`${compact ? "" : "md:col-span-2"} text-emerald-300`}>
          Wish received! ✨
        </p>
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
          [
            "Fast matching",
            "Request a clean and get paired with the nearest available pro.",
          ],
          [
            "Live ETA tracking",
            "See your cleaner on the map and get accurate arrival estimates.",
          ],
          [
            "Flexible jobs",
            "Quick tidy-ups, spill rescues, or deeper cleans — you choose.",
          ],
        ].map(([t, d]) => (
          <div
            key={t}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
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
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="font-medium">Is “under 60 minutes” guaranteed?</div>
          <div className="text-white/75">
            It’s a <span className="text-white">goal</span>, not a guarantee.
            We’ll always show realistic ETAs.
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="font-medium">What happens after I join?</div>
          <div className="text-white/75">
            We’ll email/text when your city goes live and give interest-list
            members first access at launch.
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="font-medium">Are cleaners vetted?</div>
          <div className="text-white/75">
            Yes — onboarding includes ID verification, experience review, and
            community ratings once live.
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="mx-auto max-w-6xl px-4 py-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            className="h-6 w-6 rounded-md shadow object-contain"
            alt="Sheeni logo"
            width={24}
            height={24}
          />
          <span className="font-semibold">Sheeni</span>
        </div>
        <div className="text-white/60">
          © {new Date().getFullYear()} Sheeni
        </div>
      </div>
    </footer>
  );
}
