import React from 'react';
import { Link } from 'react-router-dom';

const C = {
  ink900: '#0A0F1E', ink800: '#12345F', ink500: '#4B5675', ink100: '#D7E3EF',
  blue: '#2563EB',
};

export function LegalShell({ title, effectiveDate, children }: { title: string; effectiveDate: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', fontFamily: "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50, width: '100%',
        background: 'linear-gradient(135deg,#0D1F4A 0%,#1D4FCE 70%,#2563EB 100%)',
        padding: '18px 0',
      }}>
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Back
          </Link>
          <h1 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#fff' }}>{title}</h1>
        </div>
      </header>

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '36px 24px 80px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '6px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 700,
          background: 'rgba(37,99,235,.08)', border: '1px solid rgba(37,99,235,.20)', color: C.blue, marginBottom: 24,
        }}>
          Effective Date: {effectiveDate}
        </span>
        <div style={{ fontSize: 14.5, lineHeight: 1.75, color: C.ink500 }}>
          {children}
        </div>
      </main>

      <footer style={{ padding: '28px 0', background: '#040B1C', color: 'rgba(255,255,255,.45)', textAlign: 'center', fontSize: 13 }}>
        Quickbuk by NesVed &middot; &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export function Section({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 16.5, fontWeight: 800, color: C.ink900, margin: '28px 0 10px' }}>{children}</h2>;
}

export function SubSection({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#374151', margin: '16px 0 6px' }}>{children}</h3>;
}

export function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '0 0 12px', whiteSpace: 'pre-line' }}>{children}</p>;
}

export function Intro({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '0 0 8px', color: C.ink800, fontSize: 15 }}>{children}</p>;
}

export const legalColors = C;
export const legalInk100 = C.ink100;
