'use client';
import { useState } from 'react';

const LOGO_URL = '/logo.png'; // put your logo file at /public/logo.png

export default function Page() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | ok | error
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus('error');
        setError(json?.error ?? 'Failed to submit. Try again.');
        return;
        }
      setStatus('ok');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err?.message ?? 'Network error.');
    }
  }

  return (
    <main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 24, background: '#0b0f14', color: '#e7f0ff' }}>
      <div style={{ width: '100%', maxWidth: 680 }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <img src={LOGO_URL} alt="Sheeni" width={48} height={48} style={{ borderRadius: 12 }} />
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 0.3 }}>Sheeni — Cleaners in under 60 minutes</h1>
        </header>

        <p style={{ opacity: 0.9, marginBottom: 24 }}>
          Order a cleaner, get matched to the nearest pro, and track their ETA. Join the waitlist below—we’ll reach out.
        </p>

        <form onSubmit={onSubmit} style={{
          display: 'grid', gap: 12, background: '#111827', padding: 20, borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)', border: '1px solid #1f2937'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Email*</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>Message</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Tell us your needs…"
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <button
            disabled={status === 'loading'}
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: status === 'loading' ? '#374151' : '#1f8a5b',
              color: 'white',
              border: 'none',
              fontWeight: 600,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer'
            }}
          >
            {status === 'loading' ? 'Sending…' : 'Join Waitlist'}
          </button>

          {status === 'ok' && (
            <div style={{ padding: 12, borderRadius: 12, background: '#062e1f', border: '1px solid #14532d' }}>
              Thanks! We’ll be in touch.
            </div>
          )}
          {status === 'error' && (
            <div style={{ padding: 12, borderRadius: 12, background: '#2b1111', border: '1px solid #7f1d1d' }}>
              {error}
            </div>
          )}
        </form>

        <footer style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
          © {new Date().getFullYear()} Sheeni
        </footer>
      </div>
    </main>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  border: '1px solid #374151',
  background: '#0b1220',
  color: '#e5e7eb',
  outline: 'none',
};
