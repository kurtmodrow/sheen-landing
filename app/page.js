'use client';
import { useState } from 'react';

const LOGO_URL = '/logo.png';

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

    const url = tab === 'customer' ? '/api/waitlist/customer' : '/api/waitlist/cleaner';
    const body = tab === 'customer' ? { ...cust } : { ...clean };

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
    <main style={{ minHeight:'100dvh', display:'grid', placeItems:'center', padding:24, background:'#0b0f14', color:'#e7f0ff' }}>
      <div style={{ width:'100%', maxWidth:760 }}>
        <header style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <img src={LOGO_URL} alt="Sheeni" width={48} height={48} style={{ borderRadius:12 }} />
          <h1 style={{ margin:0, fontSize:28 }}>Sheeni — Cleaners in under 60 minutes</h1>
        </header>

        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          <TabButton active={tab==='customer'} onClick={()=>setTab('customer')}>Customer</TabButton>
          <TabButton active={tab==='cleaner'} onClick={()=>setTab('cleaner')}>Cleaner</TabButton>
        </div>

        <form onSubmit={onSubmit} style={{ display:'grid', gap:12, background:'#111827', padding:20, borderRadius:16, border:'1px solid #1f2937' }}>
          {tab === 'customer' ? (
            <>
              <Input label="Name" value={cust.name} onChange={v=>setCust(s=>({...s, name:v}))} />
              <Input label="Email*" type="email" required value={cust.email} onChange={v=>setCust(s=>({...s, email:v}))} />
              <Input label="Phone" value={cust.phone} onChange={v=>setCust(s=>({...s, phone:v}))} />
              <TextArea label="What do you need cleaned?" value={cust.message} onChange={v=>setCust(s=>({...s, message:v}))} />
            </>
          ) : (
            <>
              <Input label="Name" value={clean.name} onChange={v=>setClean(s=>({...s, name:v}))} />
              <Input label="Email*" type="email" required value={clean.email} onChange={v=>setClean(s=>({...s, email:v}))} />
              <Input label="Phone" value={clean.phone} onChange={v=>setClean(s=>({...s, phone:v}))} />
              <TextArea label="About you / availability" value={clean.message} onChange={v=>setClean(s=>({...s, message:v}))} />
              <div style={{ display:'grid', gap:12, gridTemplateColumns:'1fr 1fr' }}>
                <Input label="City" value={clean.city} onChange={v=>setClean(s=>({...s, city:v}))} />
                <Input label="Service area" value={clean.service_area} onChange={v=>setClean(s=>({...s, service_area:v}))} />
              </div>
              <div style={{ display:'grid', gap:12, gridTemplateColumns:'1fr 1fr' }}>
                <Input label="Experience (years)" type="number" value={clean.experience_years} onChange={v=>setClean(s=>({...s, experience_years:v}))} />
                <Select label="Vehicle" value={clean.vehicle} onChange={v=>setClean(s=>({...s, vehicle:v}))}
                        options={[{v:'',t:'Select…'},{v:'yes',t:'Yes'},{v:'no',t:'No'}]} />
              </div>
            </>
          )}

          <button disabled={status==='loading'} style={{
            padding:'12px 16px', borderRadius:12,
            background: status==='loading' ? '#374151' : '#1f8a5b',
            color:'#fff', border:'none', fontWeight:600, cursor: status==='loading' ? 'not-allowed':'pointer'
          }}>
            {status==='loading' ? 'Sending…' : (tab==='customer' ? 'Join Customer Waitlist' : 'Apply as Cleaner')}
          </button>

          {status==='ok' && <div style={okStyle}>Thanks! We’ll be in touch.</div>}
          {status==='error' && <div style={errStyle}>{error}</div>}
        </form>
      </div>
    </main>
  );
}

/* UI helpers */
function TabButton({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding:'10px 14px', borderRadius:10, fontWeight:600,
      border: active ? '1px solid #22c55e' : '1px solid #374151',
      background: active ? '#052e1c' : '#0b1220', color:'#e5e7eb', cursor:'pointer'
    }}>{children}</button>
  );
}

function Input({ label, value, onChange, type='text', required=false, placeholder='' }) {
  return (
    <div>
      <label style={{ display:'block', fontSize:14, marginBottom:6 }}>{label}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} type={type} required={required} placeholder={placeholder} style={inputStyle}/>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label style={{ display:'block', fontSize:14, marginBottom:6 }}>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)} style={inputStyle}>
        {options.map(o => <option key={o.v} value={o.v}>{o.t}</option>)}
      </select>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder='' }) {
  return (
    <div>
      <label style={{ display:'block', fontSize:14, marginBottom:6 }}>{label}</label>
      <textarea rows={4} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, resize:'vertical' }}/>
    </div>
  );
}

const inputStyle = { width:'100%', padding:'12px 14px', borderRadius:12, border:'1px solid #374151', background:'#0b1220', color:'#e5e7eb', outline:'none' };
const okStyle = { padding:12, borderRadius:12, background:'#062e1f', border:'1px solid #14532d' };
const errStyle = { padding:12, borderRadius:12, background:'#2b1111', border:'1px solid #7f1d1d' };
