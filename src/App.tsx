import React, { useState, useEffect } from 'react';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  ink900: '#0A0F1E', ink800: '#12345F', ink700: '#1E4A7F',
  ink500: '#4B5675', ink300: '#A8B6C8', ink100: '#D7E3EF', ink50: '#EDF3FA',
  paper: '#F4F7FF', white: '#ffffff',
  blue: '#2563EB', blueDark: '#1D4FCE', cyan: '#35BDE7', teal: '#19B6C8',
  // Role colors
  venueBlue: '#2563EB', venueBlueDark: '#1D4FCE',
  decorPurple: '#a855f7', decorPurpleDark: '#9333ea',
  caterGreen: '#10b981', caterGreenDark: '#059669',
};

function hexA(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function useBreakpoint(maxWidth: number) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.innerWidth <= maxWidth);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const fn = (e: MediaQueryListEvent) => setMatch(e.matches);
    mq.addEventListener('change', fn);
    setMatch(mq.matches);
    return () => mq.removeEventListener('change', fn);
  }, [maxWidth]);
  return match;
}

function NvContainer({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: '100%', maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24, ...style }}>
      {children}
    </div>
  );
}

type PillTone = 'ink' | 'blue' | 'cyan' | 'invert' | 'purple' | 'green';
function NvPill({ children, tone = 'ink', icon }: { children: React.ReactNode; tone?: PillTone; icon?: React.ReactNode }) {
  const tones: Record<PillTone, { bg: string; bd: string; fg: string }> = {
    ink:    { bg: 'rgba(18,52,95,.07)',    bd: 'rgba(18,52,95,.14)',    fg: C.ink800 },
    blue:   { bg: 'rgba(37,99,235,.10)',  bd: 'rgba(37,99,235,.24)',  fg: C.blueDark },
    cyan:   { bg: 'rgba(53,189,231,.12)', bd: 'rgba(53,189,231,.30)', fg: '#0880A0' },
    invert: { bg: 'rgba(255,255,255,.12)',bd: 'rgba(255,255,255,.28)',fg: '#fff' },
    purple: { bg: 'rgba(168,85,247,.12)', bd: 'rgba(168,85,247,.30)', fg: '#9333ea' },
    green:  { bg: 'rgba(16,185,129,.12)', bd: 'rgba(16,185,129,.30)', fg: '#059669' },
  };
  const t = tones[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', background: t.bg, border: `1px solid ${t.bd}`, color: t.fg }}>
      {icon}{children}
    </span>
  );
}

type BtnVariant = 'primary' | 'dark' | 'light' | 'ghost' | 'invert' | 'purple' | 'green';
type BtnSize = 'sm' | 'md' | 'lg';
function NvBtn({ children, variant = 'primary', size = 'md', as: Tag = 'button', href, onClick, style = {}, type, disabled }: {
  children: React.ReactNode; variant?: BtnVariant; size?: BtnSize;
  as?: 'button' | 'a'; href?: string; onClick?: () => void;
  style?: React.CSSProperties; type?: 'button' | 'submit'; disabled?: boolean;
}) {
  const sizes: Record<BtnSize, { h: number; px: number; fs: number }> = {
    sm: { h: 36, px: 16, fs: 13 }, md: { h: 46, px: 22, fs: 14 }, lg: { h: 54, px: 28, fs: 15 },
  };
  const s = sizes[size];
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: s.h, padding: `0 ${s.px}px`, fontSize: s.fs, fontWeight: 700,
    borderRadius: 12, cursor: disabled ? 'default' : 'pointer', border: '1px solid transparent',
    transition: 'transform .18s ease, box-shadow .18s ease, background .18s ease',
    whiteSpace: 'nowrap', textDecoration: 'none', fontFamily: 'inherit', letterSpacing: '-.01em',
  };
  const variants: Record<BtnVariant, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg,#0D1F4A 0%,#1D4FCE 55%,#35BDE7 130%)', color: '#fff', boxShadow: '0 12px 32px -10px rgba(37,99,235,.65), 0 0 0 1px rgba(255,255,255,.12) inset, inset 0 1px 0 rgba(255,255,255,.22)' },
    dark:    { background: C.ink900, color: '#fff', boxShadow: '0 4px 14px -4px rgba(10,15,30,.4)' },
    light:   { background: '#fff', color: C.ink800, borderColor: 'rgba(18,52,95,.14)', boxShadow: '0 2px 8px rgba(10,15,30,.06), 0 1px 2px rgba(10,15,30,.04)' },
    ghost:   { background: 'transparent', color: C.ink800, borderColor: 'rgba(18,52,95,.20)' },
    invert:  { background: '#fff', color: C.ink900, boxShadow: '0 4px 14px -4px rgba(0,0,0,.25)' },
    purple:  { background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', boxShadow: '0 12px 32px -10px rgba(168,85,247,.55)' },
    green:   { background: 'linear-gradient(135deg,#059669,#10b981)', color: '#fff', boxShadow: '0 12px 32px -10px rgba(16,185,129,.55)' },
  };
  const merged = { ...base, ...variants[variant], ...style };
  const hoverProps = {
    onMouseEnter: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; },
    onMouseLeave: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; },
  };
  if (Tag === 'a') {
    return <a href={href} style={merged} {...hoverProps}>{children}</a>;
  }
  return <button type={type} onClick={onClick} disabled={disabled} style={merged} {...hoverProps}>{children}</button>;
}

const Icon = {
  Arrow:  (p: React.SVGProps<SVGSVGElement>) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>,
  Check:  (p: React.SVGProps<SVGSVGElement>) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  Mail:   (p: React.SVGProps<SVGSVGElement>) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7L22 7"/></svg>,
  Phone:  (p: React.SVGProps<SVGSVGElement>) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg>,
  Spark:  (p: React.SVGProps<SVGSVGElement>) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
  Plus:   (p: React.SVGProps<SVGSVGElement>) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Cal:    (p: React.SVGProps<SVGSVGElement>) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  Card:   (p: React.SVGProps<SVGSVGElement>) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/></svg>,
  Chart:  (p: React.SVGProps<SVGSVGElement>) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3v18h18"/><path d="m7 14 3-3 3 3 5-6"/></svg>,
  Shield: (p: React.SVGProps<SVGSVGElement>) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>,
  Users:  (p: React.SVGProps<SVGSVGElement>) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Globe:  (p: React.SVGProps<SVGSVGElement>) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg>,
  Menu:   (p: React.SVGProps<SVGSVGElement>) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  X:      (p: React.SVGProps<SVGSVGElement>) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Building:(p: React.SVGProps<SVGSVGElement>) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9M15 21V9"/></svg>,
  Sparkles:(p: React.SVGProps<SVGSVGElement>) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z"/><path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75L19 3z"/></svg>,
  Fork:   (p: React.SVGProps<SVGSVGElement>) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>,
  Lock:   (p: React.SVGProps<SVGSVGElement>) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Star:   (p: React.SVGProps<SVGSVGElement>) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

// ─── LAUNCHING SOON MODAL ─────────────────────────────────────────────────────
function LaunchingSoonModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(6,13,31,.65)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'fadeIn .2s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 28, padding: '48px 40px 40px', maxWidth: 420, width: '100%', boxShadow: '0 60px 120px -30px rgba(6,13,31,.4)', position: 'relative', textAlign: 'center', animation: 'popIn .25s cubic-bezier(.34,1.56,.64,1)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(18,52,95,.06)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.ink500 }}>
          <Icon.X width={18} height={18} />
        </button>
        <div style={{ margin: '0 auto 24px', width: 80, height: 80 }}>
          <img src="/images/quickbuk-logo-new.png" alt="Quickbuk" style={{ width: 80, height: 80, borderRadius: 22, display: 'block', boxShadow: '0 16px 40px -12px rgba(37,99,235,.45)' }} />
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 800, color: C.ink900, letterSpacing: '-.025em', marginBottom: 12 }}>Launching Soon!</h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: C.ink500, marginBottom: 28 }}>
          The Quickbuk mobile app is currently in development and will be available on both the <strong style={{ color: C.ink900 }}>Google Play Store</strong> and <strong style={{ color: C.ink900 }}>Apple App Store</strong> soon.
        </p>
        <div style={{ background: 'linear-gradient(135deg, #F0F5FF, #E8F0FE)', borderRadius: 16, padding: '16px 20px', marginBottom: 28, border: '1px solid rgba(37,99,235,.12)' }}>
          <p style={{ fontSize: 13.5, color: C.blueDark, fontWeight: 600, margin: 0 }}>Want to be notified at launch?</p>
          <p style={{ fontSize: 13, color: C.ink500, margin: '4px 0 0' }}>Reach out at <a href="mailto:contact@nesved.com" style={{ color: C.blue, fontWeight: 600 }}>contact@nesved.com</a> or book a demo below.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
          <NvBtn variant="primary" size="md" as="a" href="#contact" onClick={onClose} style={{ width: '100%' }}>Book a demo <Icon.Arrow /></NvBtn>
          <NvBtn variant="light" size="md" onClick={onClose} style={{ width: '100%' }}>Maybe later</NvBtn>
        </div>
      </div>
    </div>
  );
}

function AppStoreBadges({ onOpen }: { onOpen: () => void }) {
  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '10px 20px', borderRadius: 12, cursor: 'pointer',
    background: '#0A0F1E', color: '#fff', border: '1px solid rgba(255,255,255,.12)',
    boxShadow: '0 4px 16px -4px rgba(10,15,30,.3)',
    transition: 'transform .18s ease, box-shadow .18s ease',
    textDecoration: 'none', fontFamily: 'inherit',
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
      <button onClick={onOpen} style={{ ...badgeStyle, border: 'none' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 20.5v-17c0-.83 1-.83 1.5-.5L19 12l-14.5 8.5c-.5.33-1.5.33-1.5-.5z" fill="#fff" opacity=".85"/><path d="M3 3.5 13.5 12 3 20.5" stroke="#34A853" strokeWidth="1.2"/><path d="M3 3.5l10.5 8.5H19" stroke="#FBBC04" strokeWidth="1.2"/><path d="M3 20.5 13.5 12H19" stroke="#EA4335" strokeWidth="1.2"/></svg>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 9, fontWeight: 500, opacity: .7, textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.2 }}>Get it on</div>
          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>Google Play</div>
        </div>
      </button>
      <button onClick={onOpen} style={{ ...badgeStyle, border: 'none' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 9, fontWeight: 500, opacity: .7, textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.2 }}>Download on the</div>
          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>App Store</div>
        </div>
      </button>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useBreakpoint(860);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { h: '#home', l: 'Home' },
    { h: '#product', l: 'Product' },
    { h: '#pricing', l: 'Pricing' },
    { h: '#faq', l: 'FAQ' },
    { h: '#contact', l: 'Contact' },
  ];

  const headerPadding = isMobile ? 12 : 14;

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50, width: '100%',
        backdropFilter: 'saturate(180%) blur(16px)',
        WebkitBackdropFilter: 'saturate(180%) blur(16px)',
        background: scrolled ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.70)',
        borderBottom: scrolled ? '1px solid rgba(18,52,95,.10)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px -4px rgba(18,52,95,.10)' : 'none',
        transition: 'all .25s ease',
      }}>
        <NvContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: headerPadding, paddingBottom: headerPadding }}>
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
              <div style={{ overflow: 'hidden', height: isMobile ? 44 : 52, width: isMobile ? 130 : 170, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <img src="/images/nesved-full-logo.png" alt="NesVed" style={{ height: isMobile ? 110 : 130, width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>
            </a>

            <nav className="nv-desktop-nav" style={{ alignItems: 'center', gap: 4 }}>
              {links.map(l => (
                <a key={l.h} href={l.h} style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500, color: C.ink800, textDecoration: 'none', borderRadius: 8, transition: 'background .15s, color .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(18,52,95,.05)'; (e.currentTarget as HTMLElement).style.color = C.blue; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink800; }}
                >{l.l}</a>
              ))}
            </nav>

            <div className="nv-desktop-nav" style={{ alignItems: 'center', gap: 10 }}>
              <NvBtn variant="primary" size="sm" as="a" href="#contact">
                Book a demo <Icon.Arrow width={14} height={14} />
              </NvBtn>
            </div>

            <button
              className="nv-mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              style={{ background: 'none', border: '1px solid rgba(18,52,95,.12)', borderRadius: 10, padding: '8px', cursor: 'pointer', color: C.ink800, alignItems: 'center', justifyContent: 'center' }}
              aria-label="Open menu"
            >
              <Icon.Menu />
            </button>
          </div>
        </NvContainer>
      </header>

      {mobileOpen && (
        <div className="nv-mobile-drawer" style={{ background: 'rgba(10,26,51,.55)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)}>
          <div onClick={e => e.stopPropagation()} className="glass-card" style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '80%', maxWidth: 320,
            background: 'rgba(255,255,255,.85)', borderRadius: 0, boxShadow: '-20px 0 60px rgba(10,26,51,.2)',
            display: 'flex', flexDirection: 'column', padding: '0 0 32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(18,52,95,.08)' }}>
              <div style={{ overflow: 'hidden', height: 44, width: 130, display: 'flex', alignItems: 'center' }}>
                <img src="/images/nesved-full-logo.png" alt="NesVed" style={{ height: 110, width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: C.ink500 }} aria-label="Close menu">
                <Icon.X />
              </button>
            </div>
            <nav style={{ flex: 1, padding: '16px 16px' }}>
              {links.map(l => (
                <a key={l.h} href={l.h} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 16px', fontSize: 16, fontWeight: 600, color: C.ink800, textDecoration: 'none', borderRadius: 12, marginBottom: 4, transition: 'background .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(18,52,95,.05)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >{l.l}</a>
              ))}
            </nav>
            <div style={{ padding: '0 24px' }}>
              <NvBtn variant="primary" size="lg" as="a" href="#contact" style={{ width: '100%' }} onClick={() => setMobileOpen(false)}>
                Book a demo <Icon.Arrow />
              </NvBtn>
              <p style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: C.ink500 }}>contact@nesved.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
const SIGNIN_SCREEN = { src: '/images/app-partner-signin.jpg', label: 'Sign in', color: '#f59e0b', bg: 'rgba(245,158,11,.14)' };

const SHOWCASE_SCREENS = [
  { src: '/images/app-dashboard-new.jpg', label: 'Venue Owner', color: '#2563EB', bg: 'rgba(37,99,235,.14)' },
  { src: '/images/app-decorator-dashboard.jpg', label: 'Decorator', color: '#a855f7', bg: 'rgba(168,85,247,.14)' },
  { src: '/images/app-caterer-dashboard.jpg', label: 'Caterer', color: '#10b981', bg: 'rgba(16,185,129,.14)' },
];

const ACTIVITY_FEED = [
  { icon: <Icon.Check />, title: 'Booking confirmed', sub: 'Sat · 24 Aug · ₹2,40,000', grad: 'linear-gradient(135deg,#19B6C8,#35BDE7)' },
  { icon: <Icon.Chart />, title: 'Revenue this month', sub: '₹3,18,000 · +12% vs last', grad: 'linear-gradient(135deg,#1D4FCE,#2563EB)' },
  { icon: <Icon.Sparkles />, title: 'Decor package booked', sub: 'Royal Floral Setup · ₹45,000', grad: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
  { icon: <Icon.Fork />, title: 'Catering order confirmed', sub: '250 plates · Veg + Non-veg', grad: 'linear-gradient(135deg,#059669,#10b981)' },
];

function HeroPhones() {
  const [screen, setScreen] = useState(0);
  const [activity, setActivity] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setScreen(s => (s + 1) % SHOWCASE_SCREENS.length), 3600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActivity(a => (a + 1) % ACTIVITY_FEED.length), 3200);
    return () => clearInterval(t);
  }, []);

  const active = SHOWCASE_SCREENS[screen];
  const feed = ACTIVITY_FEED[activity];

  return (
    <div className="nv-hero-phone" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 640, padding: '40px 40px' }}>
      {/* Glow behind the glass phone */}
      <div aria-hidden style={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle, ${active.bg} 0%, transparent 70%)`, filter: 'blur(20px)', transition: 'background 1s ease', zIndex: 0 }} />

      {/* Back phone — auto-cycling through role dashboards */}
      <div className="glass-dark" style={{
        position: 'absolute', right: -56, top: 90, zIndex: 0,
        padding: 10, borderRadius: 44,
        transform: 'rotate(7deg)',
        animation: 'floaty 8s ease-in-out infinite .3s',
      }}>
        <div style={{ borderRadius: 36, overflow: 'hidden', width: 260, height: 520, background: C.ink900, position: 'relative' }}>
          {SHOWCASE_SCREENS.map((s, i) => (
            <img key={s.src} src={s.src} alt={s.label} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0%', display: 'block',
              opacity: i === screen ? 1 : 0, transition: 'opacity .6s ease',
            }} />
          ))}
        </div>
        {/* Role indicator pill, glass */}
        <div className="glass-chip" style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', padding: '6px 14px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: active.color, transition: 'background .4s ease' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '-.01em' }}>{active.label} dashboard</span>
        </div>
        {/* Dots */}
        <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
          {SHOWCASE_SCREENS.map((s, i) => (
            <span key={s.label} style={{ width: i === screen ? 16 : 5, height: 5, borderRadius: 99, background: i === screen ? s.color : 'rgba(255,255,255,.25)', transition: 'all .35s ease' }} />
          ))}
        </div>
      </div>

      {/* Front phone — static sign-in screen */}
      <div className="glass-dark" style={{
        position: 'relative', zIndex: 1, padding: 14, borderRadius: 52,
        animation: 'floaty 7s ease-in-out infinite',
      }}>
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 90, height: 6, borderRadius: 99, background: 'rgba(255,255,255,.18)', zIndex: 2 }} />
        <div style={{ borderRadius: 40, overflow: 'hidden', width: 290, height: 580, background: C.ink900, position: 'relative' }}>
          <img src={SIGNIN_SCREEN.src} alt={SIGNIN_SCREEN.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0%', display: 'block' }} />
        </div>
        {/* Sign-in pill, glass */}
        <div className="glass-chip" style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', padding: '7px 18px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: SIGNIN_SCREEN.color }} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: '#fff', letterSpacing: '-.01em' }}>One-tap sign in</span>
        </div>
      </div>

      {/* Floating activity feed — glass chip, cycles through live events */}
      <div key={activity} className="nv-hero-chips glass-chip" style={{
        position: 'absolute', top: 56, left: 0, zIndex: 3,
        padding: '10px 16px 10px 10px',
        borderRadius: 16,
        display: 'flex', alignItems: 'center', gap: 10,
        animation: 'activityIn .5s cubic-bezier(.2,.8,.3,1), floaty 7s ease-in-out infinite .5s',
        minWidth: 220,
      }}>
        <span style={{ width: 32, height: 32, borderRadius: 10, background: feed.grad, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
          {feed.icon}
        </span>
        <div>
          <div style={{ fontSize: 11, color: C.ink500, fontWeight: 500, lineHeight: 1.3 }}>{feed.title}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink900, lineHeight: 1.4 }}>{feed.sub}</div>
        </div>
      </div>

      {/* Chip — Revenue, glass+neumorphic */}
      <div className="nv-hero-chips glass-dark" style={{
        position: 'absolute', bottom: 70, right: -4, zIndex: 3,
        padding: '14px 18px',
        borderRadius: 18,
        minWidth: 190,
        animation: 'floaty 8s ease-in-out infinite 1s',
      }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 4 }}>Revenue this month</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.2 }}>₹3,18,000</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, color: '#35BDE7', fontSize: 13, fontWeight: 600 }}>
          <Icon.Chart width={13} height={13} /> +New booking
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [showModal, setShowModal] = useState(false);
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', paddingTop: 64, paddingBottom: 120, width: '100%', background: 'linear-gradient(160deg, #F8FAFF 0%, #EEF4FF 60%, #F0F7FF 100%)' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div className="mesh-bg" style={{ position: 'absolute', inset: 0, opacity: 1 }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: .5, maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)' } as React.CSSProperties} />
        <div style={{ position: 'absolute', top: -240, right: -80, width: 780, height: 780, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.28)} 0%,${hexA(C.cyan,0)} 60%)`, filter: 'blur(40px)', animation: 'blobShift 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: -260, left: -140, width: 680, height: 680, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.22)} 0%,${hexA(C.blue,0)} 60%)`, filter: 'blur(40px)', animation: 'blobShift 22s ease-in-out infinite reverse' }} />
      </div>

      <NvContainer>
        <div className="nv-hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 56, alignItems: 'center' }}>
          <div className="nv-hero-left">
            {/* Badge with 3 role pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              <span className="glass-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.blueDark }}>
                <Icon.Building width={13} height={13} /> Venue Owner
              </span>
              <span className="glass-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.decorPurpleDark }}>
                <Icon.Sparkles width={13} height={13} /> Decorator
              </span>
              <span className="glass-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.caterGreenDark }}>
                <Icon.Fork width={13} height={13} /> Caterer
              </span>
            </div>

            <h1 style={{ margin: '0 0 0', fontSize: 'clamp(44px, 5.5vw, 82px)', lineHeight: 1.0, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink900 }}>
              One app for<br />
              <span className="grad-text-tri">venues, decorators</span><br />
              <span style={{ fontWeight: 800, color: C.ink900 }}>&amp; caterers.</span>
            </h1>

            <p style={{ marginTop: 28, maxWidth: 530, fontSize: 18.5, lineHeight: 1.72, color: C.ink500, fontWeight: 400 }}>
              <strong style={{ color: C.ink900, fontWeight: 600 }}>Quickbuk</strong> by NesVed — an all-in-one booking &amp; management platform. Separate logins and dashboards for Venue Owners, Decorators, and Caterers. Bookings · Payments · Reports, all in one app.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 40 }}>
              <NvBtn variant="primary" size="lg" as="a" href="#product">Explore product <Icon.Arrow /></NvBtn>
              <NvBtn variant="light" size="lg" as="a" href="#contact"><Icon.Mail /> Talk to us</NvBtn>
            </div>

            <AppStoreBadges onOpen={() => setShowModal(true)} />
            {showModal && <LaunchingSoonModal onClose={() => setShowModal(false)} />}

            {/* 3-role stat strip */}
            <div className="nv-hero-chips" style={{ marginTop: 44, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { color: '#2563EB', bg: 'rgba(37,99,235,.08)', bd: 'rgba(37,99,235,.18)', icon: <Icon.Building width={13} height={13} />, text: 'Venue Management' },
                { color: '#a855f7', bg: 'rgba(168,85,247,.08)', bd: 'rgba(168,85,247,.18)', icon: <Icon.Sparkles width={13} height={13} />, text: 'Decorator Portal' },
                { color: '#10b981', bg: 'rgba(16,185,129,.08)', bd: 'rgba(16,185,129,.18)', icon: <Icon.Fork width={13} height={13} />, text: 'Caterer Portal' },
              ].map(s => (
                <span key={s.text} className="glass-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, color: s.color }}>
                  {s.icon}{s.text}
                </span>
              ))}
            </div>
          </div>

          <HeroPhones />
        </div>
      </NvContainer>
    </section>
  );
}

// ─── PRODUCT ──────────────────────────────────────────────────────────────────
function Product() {
  const [showModal, setShowModal] = useState(false);
  const features = [
    { icon: <Icon.Cal />,     title: 'Smart Booking Calendar',     text: 'Visualise availability across all your venues. No double-bookings, no missed slots — ever.', color: C.blueDark, glow: hexA(C.blue,.16) },
    { icon: <Icon.Card />,    title: 'Payments, Dues & UPI QR',     text: 'Record advances, collect balances via UPI QR, issue refunds and export clean tax-ready CSV/PDF sheets.', color: C.blueDark, glow: hexA(C.cyan,.18) },
    { icon: <Icon.Building />,title: 'Multi-Venue Management',     text: 'Run multiple halls, lawns or properties from one account — each with its own calendar and bookings.', color: C.blueDark, glow: hexA(C.blue,.16) },
    { icon: <Icon.Users />,   title: 'Staff & Role Management',    text: 'Add staff members, assign roles, and control who can see bookings, payments, or reports — fully login-protected.', color: C.decorPurpleDark, glow: hexA(C.decorPurple,.18) },
    { icon: <Icon.Chart />,   title: 'Revenue & Profit Reports',   text: 'Collection rate, gross & cash profit, refunds, and 30-day or weekly trends — built for real accounting.', color: C.caterGreenDark, glow: hexA(C.caterGreen,.18) },
    { icon: <Icon.Mail />,    title: 'Enquiries & Lead Inbox',     text: 'Every customer enquiry lands in one inbox with read/unread tracking — never miss a lead again.', color: C.decorPurpleDark, glow: hexA(C.decorPurple,.18) },
    { icon: <Icon.Sparkles />,title: 'Vendor Sponsored Listings',  text: 'Decorators & caterers can boost visibility with paid placements and track impressions, clicks & profile views.', color: C.decorPurpleDark, glow: hexA(C.decorPurple,.20) },
    { icon: <Icon.Shield />,  title: 'Services & Customisation',   text: 'Add decoration, catering, and other services to any booking. Customise packages and pricing per venue.', color: C.caterGreenDark, glow: hexA(C.caterGreen,.18) },
  ];

  return (
    <section id="product" style={{ position: 'relative', padding: '120px 0', background: C.paper, width: '100%' }}>
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(180deg,#fff 0%,rgba(244,247,255,0) 100%)' }} />
      <NvContainer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 64 }}>
          <NvPill tone="cyan">Product — Live now</NvPill>
          <h2 style={{ margin: '20px 0 16px', fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 800, color: C.ink900, maxWidth: 780 }}>
            <span className="grad-text">Quickbuk</span> — built for the<br />
            event industry, end to end.
          </h2>
          <p style={{ maxWidth: 640, color: C.ink500, fontSize: 17.5, lineHeight: 1.7, margin: 0 }}>
            Used by venue owners, decorators, and caterers to handle bookings, staff, services, payments, receipts, and analytics — all from one mobile-first platform.
          </p>
        </div>
      </NvContainer>

      {/* Full-bleed showcase */}
      <div style={{ width: '100%', background: 'linear-gradient(135deg, #060D1F 0%, #0D1F4A 45%, #1A3A8F 100%)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: -160, right: -100, width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.38)} 0%,transparent 55%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', bottom: -180, left: -120, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.40)} 0%,transparent 55%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div className="noise" style={{ position: 'absolute', inset: 0, opacity: .4, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: 720, margin: '0 auto' }}>
            <div style={{ color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <img src="/images/quickbuk-logo-new.png" alt="Quickbuk" style={{ height: 44, width: 44, borderRadius: 12, display: 'block' }} />
                <div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.1 }}>Quickbuk</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.50)', letterSpacing: '.03em' }}>by NesVed</div>
                </div>
                <span style={{ marginLeft: 8, padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', background: 'rgba(25,182,200,.18)', border: '1px solid rgba(53,189,231,.35)', color: '#7DD7F3' }}>Live now</span>
              </div>

              <h3 style={{ fontSize: 'clamp(28px,3.2vw,46px)', fontWeight: 800, letterSpacing: '-.04em', margin: '0 0 20px', lineHeight: 1.1 }}>
                All-in-one platform for<br />
                <span style={{ background: 'linear-gradient(100deg,#fff 0%,#A8D8F0 40%,#35BDE7 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>venues, decorators &amp; caterers.</span>
              </h3>

              <p style={{ margin: '0 0 28px', color: 'rgba(255,255,255,.72)', fontSize: 16, lineHeight: 1.75, maxWidth: 500 }}>
                Purpose-built for the event industry. Venue owners get full booking & revenue control. Decorators manage their packages. Caterers track their orders. All connected.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {[
                  { label: 'Venue Booking', live: true },
                  { label: 'Calendar View', live: true },
                  { label: 'Staff Login', live: true },
                  { label: 'UPI QR Payments', live: true },
                  { label: 'PDF & CSV Exports', live: true },
                  { label: 'Revenue & Profit Reports', live: true },
                  { label: 'Multi-Venue Support', live: true },
                  { label: '🎨 Decorator Portal', live: true },
                  { label: '🍽️ Caterer Portal', live: true },
                ].map(t => (
                  <span key={t.label} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 500, background: t.live ? 'rgba(255,255,255,.10)' : 'rgba(168,85,247,.15)', color: t.live ? 'rgba(255,255,255,.88)' : '#d8b4fe', border: `1px solid ${t.live ? 'rgba(255,255,255,.18)' : 'rgba(168,85,247,.35)'}` }}>
                    {t.label}{!t.live && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, letterSpacing: '.05em', opacity: .8 }}>SOON</span>}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                <NvBtn variant="invert" size="md" as="a" href="https://quickbuk-web-view.vercel.app/" style={{ color: C.ink900 }}>Start free <Icon.Arrow /></NvBtn>
                <NvBtn variant="ghost" size="md" as="a" href="#contact" style={{ borderColor: 'rgba(255,255,255,.28)', color: '#fff', background: 'rgba(255,255,255,.05)' }}>Book a demo</NvBtn>
              </div>

              <div style={{ marginBottom: 48 }}>
                <AppStoreBadges onOpen={() => setShowModal(true)} />
              </div>
              {showModal && <LaunchingSoonModal onClose={() => setShowModal(false)} />}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 28 }}>
                {[
                  { k: 'Platform', v: 'iOS & Android' },
                  { k: 'Venue types', v: 'Halls · Lawns · Hotels' },
                  { k: 'Architecture', v: 'Multi-tenant' },
                  { k: 'Data exports', v: 'PDF & CSV' },
                  { k: 'Roles', v: 'Venue · Decor · Catering' },
                  { k: 'Support', v: '1-day response' },
                ].map((s, i) => (
                  <div key={s.k} style={{ paddingTop: 16, paddingBottom: 16, paddingRight: 16, borderBottom: i < 3 ? '1px solid rgba(255,255,255,.08)' : 'none', borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,.08)' : 'none', paddingLeft: i % 3 !== 0 ? 20 : 0 }}>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.09em', fontWeight: 700 }}>{s.k}</div>
                    <div style={{ fontSize: 14, color: '#fff', marginTop: 5, fontWeight: 600 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature strip */}
          <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,.10)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {[
              { icon: <Icon.Cal />,    title: 'Smart Calendar',    desc: 'Visual availability grid across all your venues. No double-bookings, ever.' },
              { icon: <Icon.Card />,   title: 'Payments & Dues',   desc: 'Advance, balance, refunds — tracked per booking with clean PDF receipts.' },
              { icon: <Icon.Chart />,  title: 'Revenue Analytics', desc: 'Live trends, occupancy rates and month-on-month comparisons at a glance.' },
              { icon: <Icon.Users />,  title: 'Multi-Role Access',  desc: 'Venue, Decorator & Caterer logins — each sees only what they need.' },
            ].map((h, i) => (
              <div key={h.title} style={{ padding: '0 32px 0', borderRight: i < 3 ? '1px solid rgba(255,255,255,.10)' : 'none', paddingLeft: i === 0 ? 0 : 32 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#35BDE7', marginBottom: 14 }}>{h.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-.02em', marginBottom: 6 }}>{h.title}</div>
                <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.55)', lineHeight: 1.65 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NvContainer>
        <div className="nv-feature-grid" style={{ marginTop: 72, display: 'grid', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} className="glass-card" style={{ padding: 28, cursor: 'default', borderTop: `3px solid ${f.color}` }}>
              <div className="neu-icon" style={{ width: 48, height: 48, color: f.color, flexShrink: 0, boxShadow: `6px 6px 14px ${f.glow}, -6px -6px 14px rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.6)` }}>{f.icon}</div>
              <h4 style={{ margin: '18px 0 8px', fontSize: 16, fontWeight: 700, color: C.ink900, letterSpacing: '-.02em' }}>{f.title}</h4>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: C.ink500 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </NvContainer>
    </section>
  );
}

// ─── SIGN-IN SHOWCASE ────────────────────────────────────────────────────────
function SignInShowcase() {
  return (
    <section style={{ position: 'relative', padding: '100px 0', background: '#fff', overflow: 'hidden', width: '100%' }}>
      {/* Subtle grid bg */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: .35, maskImage: 'radial-gradient(ellipse at 60% 50%, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 60% 50%, black 20%, transparent 70%)' } as React.CSSProperties}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
      </div>
      {/* Orb */}
      <div aria-hidden style={{ position: 'absolute', right: -120, top: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(37,99,235,.10) 0%,transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <NvContainer>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'start', width: '100%' }} className="signin-grid">

          {/* Copy */}
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', background: 'rgba(37,99,235,.09)', border: '1px solid rgba(37,99,235,.22)', color: '#1D4FCE', marginBottom: 28 }}>
              <Icon.Lock width={12} height={12} /> No password needed
            </span>

            <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.04, color: '#0A0F1E' }}>
              Sign in takes<br />
              <span className="grad-text">under 10 seconds.</span>
            </h2>

            <p style={{ margin: '0 0 36px', maxWidth: 480, fontSize: 17.5, lineHeight: 1.75, color: '#4B5675' }}>
              No passwords to remember. Just enter your business email and we'll send you a one-tap sign-in code. Choose your role — Venue Owner, Decorator, or Caterer — and you're in.
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { n: '01', title: 'Choose your role', desc: 'Venue Owner, Decorator, or Caterer — pick what fits your business.', color: '#2563EB', bg: 'rgba(37,99,235,.09)', bd: 'rgba(37,99,235,.20)' },
                { n: '02', title: 'Enter your email', desc: 'Your business email is all you need — no password setup required.', color: '#a855f7', bg: 'rgba(168,85,247,.09)', bd: 'rgba(168,85,247,.20)' },
                { n: '03', title: 'Tap the sign-in code', desc: 'We send a code instantly. Tap it and you\'re inside your dashboard.', color: '#10b981', bg: 'rgba(16,185,129,.09)', bd: 'rgba(16,185,129,.20)' },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div className="neu-icon" style={{ width: 40, height: 40, flexShrink: 0, fontWeight: 800, fontSize: 13, color: s.color, letterSpacing: '-.01em' }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 700, color: '#0A0F1E', marginBottom: 4, letterSpacing: '-.02em' }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: '#4B5675', lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            {[
              { icon: <Icon.Cal />, label: "Today's Bookings", val: '12 Events', color: '#2563EB', bg: 'rgba(37,99,235,.07)', bd: 'rgba(37,99,235,.15)' },
              { icon: <Icon.Card />, label: 'Monthly Revenue', val: '₹1,24,500', color: '#10b981', bg: 'rgba(16,185,129,.07)', bd: 'rgba(16,185,129,.15)' },
              { icon: <Icon.Chart />, label: 'Collection Rate', val: '94% done', color: '#a855f7', bg: 'rgba(168,85,247,.07)', bd: 'rgba(168,85,247,.15)' },
              { icon: <Icon.Building />, label: 'Active Listings', val: '3 Venues', color: '#f59e0b', bg: 'rgba(245,158,11,.07)', bd: 'rgba(245,158,11,.15)' },
            ].map(stat => (
              <div key={stat.label} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 18px', borderRadius: 14 }}>
                <span style={{ color: stat.color, flexShrink: 0 }}>{stat.icon}</span>
                <div>
                  <div style={{ fontSize: 10.5, color: '#4B5675', fontWeight: 500, lineHeight: 1.2 }}>{stat.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0A0F1E', lineHeight: 1.3 }}>{stat.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </NvContainer>
      <style>{`
        @media (max-width: 860px) {
          .signin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: 'Decorator',
      price: '₹4,999',
      cadence: '/ year',
      desc: 'For decorators managing their portfolio and bookings.',
      icon: <Icon.Sparkles />,
      iconGrad: 'linear-gradient(135deg,#7c3aed,#a855f7)',
      accentColor: '#a855f7',
      accentBg: 'rgba(168,85,247,.08)',
      points: ['Dedicated decorator login', 'View assigned venue bookings', 'Manage decor packages & pricing', 'Track payments & dues', 'Availability calendar', 'Direct venue communication', 'Portfolio showcase'],
      featured: false,
    },
    {
      name: 'Venue Owner',
      price: '₹9,999',
      cadence: '/ year',
      desc: 'For hotels, marriage halls & resort owners.',
      icon: <Icon.Building />,
      iconGrad: 'linear-gradient(135deg,#1D4FCE,#2563EB,#35BDE7)',
      accentColor: '#2563EB',
      accentBg: 'rgba(37,99,235,.10)',
      points: ['Full venue booking & calendar', 'Staff roles & permissions', 'Services & catering add-ons', 'PDF receipts & CSV exports', 'Revenue analytics dashboard', 'Live availability for customers', 'Subscriptions & sponsored ads'],
      featured: true,
    },
    {
      name: 'Caterer',
      price: '₹5,999',
      cadence: '/ year',
      desc: 'For caterers listing packages and getting bookings.',
      icon: <Icon.Fork />,
      iconGrad: 'linear-gradient(135deg,#059669,#10b981)',
      accentColor: '#10b981',
      accentBg: 'rgba(16,185,129,.08)',
      points: ['Dedicated caterer login', 'View catering orders per booking', 'Set menu & per-head pricing', 'Confirm / decline orders', 'Direct venue communication', 'Revenue & order tracking'],
      featured: false,
    },
  ];

  return (
    <section id="pricing" style={{ padding: '120px 0', position: 'relative', width: '100%', background: C.paper, overflow: 'hidden' }}>
      <div aria-hidden className="mesh-bg" style={{ position: 'absolute', inset: 0, opacity: .5, pointerEvents: 'none', zIndex: 0 }} />
      <NvContainer style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 64 }}>
          <NvPill tone="ink">Pricing</NvPill>
          <h2 style={{ margin: '20px 0 16px', fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 800, color: C.ink900, maxWidth: 760 }}>
            Honest pricing,<br />no surprises.
          </h2>
          <p style={{ maxWidth: 560, color: C.ink500, fontSize: 17.5, lineHeight: 1.7, margin: 0 }}>
            One plan per role. Venue Owners, Decorators, and Caterers each get a plan built for their needs.
          </p>
        </div>

        <div className="nv-pricing-grid" style={{ display: 'grid', gap: 20, alignItems: 'start' }}>
          {plans.map(p => (
            <div key={p.name} className={p.featured ? 'glass-dark' : 'glass-card'} style={{ position: 'relative', borderRadius: 24, padding: 36, background: p.featured ? 'linear-gradient(160deg,rgba(6,13,31,.65) 0%,rgba(13,31,74,.65) 55%,rgba(26,58,143,.65) 100%)' : undefined, color: p.featured ? '#fff' : C.ink900, transform: p.featured ? 'translateY(-12px)' : 'none', overflow: 'hidden' }}>
              {p.featured && <div aria-hidden style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.45)},transparent 65%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />}
              <div style={{ position: 'relative' }}>
                {/* Role icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: p.iconGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{p.icon}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {p.featured && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999, background: 'linear-gradient(135deg,rgba(53,189,231,.30),rgba(53,189,231,.18))', color: '#7DD7F3', border: `1px solid ${hexA(C.cyan,.40)}` }}>Most popular</span>}
                    {(p as { comingSoon?: boolean }).comingSoon && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999, background: 'rgba(252,211,77,.12)', color: '#b45309', border: '1px solid rgba(252,211,77,.35)' }}>Coming soon</span>}
                  </div>
                </div>

                <h3 style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 800, letterSpacing: '-.025em' }}>{p.name}</h3>
                <p style={{ margin: '0 0 24px', fontSize: 13.5, color: p.featured ? 'rgba(255,255,255,.68)' : C.ink500, lineHeight: 1.6 }}>{p.desc}</p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 28 }}>
                  <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: '-.04em' }}>{p.price}</span>
                  <span style={{ fontSize: 13, color: p.featured ? 'rgba(255,255,255,.50)' : C.ink500 }}>{p.cadence}</span>
                </div>

                <NvBtn variant={p.featured ? 'invert' : 'dark'} size="md" as="a" href="#contact" style={{ width: '100%' }}>Get started <Icon.Arrow /></NvBtn>

                <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {p.points.map(pt => (
                    <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, color: p.featured ? 'rgba(255,255,255,.85)' : C.ink700 }}>
                      <span style={{ marginTop: 2, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 99, background: p.featured ? hexA(C.cyan,.22) : hexA(C.teal,.13), color: p.featured ? '#7DD7F3' : '#0E8EA4' }}>
                        <Icon.Check width={11} height={11} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: '18px 28px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(37,99,235,.08), rgba(53,189,231,.10))', border: '1px solid rgba(37,99,235,.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', textAlign: 'center' }}>
          <span style={{ fontSize: 18 }}>🎉</span>
          <p style={{ margin: 0, fontSize: 14.5, color: C.ink800, fontWeight: 600 }}>
            Early access members get <span style={{ color: C.blue }}>1 month free</span> on any plan.{' '}
            <a href="#contact" style={{ color: C.blue, fontWeight: 700, textDecoration: 'none' }}>Claim your spot →</a>
          </p>
        </div>
        <p style={{ marginTop: 16, textAlign: 'center', fontSize: 13.5, color: C.ink500 }}>All plans billed annually. Includes unlimited bookings and free updates.</p>
      </NvContainer>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    { q: 'What is Quickbuk?', a: 'Quickbuk is a booking and management platform by NesVed, purpose-built for the event industry. It provides separate logins for Venue Owners, Decorators, and Caterers — all connected to the same booking ecosystem.', color: C.blue },
    { q: 'Who can use Quickbuk?', a: 'Quickbuk is built for three types of partners: Venue Owners (marriage halls, banquet halls, lawns, hotels), Decorators, and Caterers. Each gets their own dedicated dashboard and login.', color: C.blue },
    { q: 'What can Venue Owners do?', a: 'Venue owners get full control over bookings, staff management, services, payments, PDF receipts, CSV tax exports, analytics dashboard, live availability for customers, subscriptions, and sponsored ads.', color: C.blue },
    { q: 'What can Decorators do?', a: 'Decorators log in to view assigned venue bookings, manage their decoration packages and pricing, track payments and dues, manage their availability calendar, and communicate directly with venue owners.', color: C.decorPurple },
    { q: 'What can Caterers do?', a: 'Caterers see upcoming event menus linked to bookings, confirm or decline catering orders, set per-head pricing, track revenue, and communicate with venue owners.', color: C.caterGreen },
    { q: 'Can I manage multiple venues?', a: 'Yes. You can add and manage multiple venues — each with its own availability, calendar, and booking list — all from one account.', color: C.blue },
    { q: 'How does the analytics dashboard work?', a: 'The dashboard shows revenue trends, booking activity, occupancy, pending dues, and month-on-month comparisons — updated in real time so you always know how your business is performing.', color: C.caterGreen },
    { q: 'Can customers see live venue availability?', a: 'Yes. End users can view the live booking status and availability of your venue in real time — reducing calls and making it easy for customers to check open slots.', color: C.decorPurple },
    { q: 'How do I get started?', a: 'Book a quick demo from this page. We will walk you through the product, set up your account, and get your team onboarded within a day.', color: C.blue },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ padding: '120px 0', background: '#fff', position: 'relative', width: '100%' }}>
      <NvContainer>
        <div className="nv-faq-grid" style={{ display: 'grid', gap: 72, alignItems: 'flex-start' }}>
          <div className="nv-faq-aside">
            <NvPill tone="cyan">FAQ</NvPill>
            <h2 style={{ margin: '20px 0 16px', fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 800, color: C.ink900 }}>
              Common questions,<br />clear answers.
            </h2>
            <p style={{ margin: '0 0 28px', fontSize: 16.5, lineHeight: 1.7, color: C.ink500, maxWidth: 360 }}>
              Can't find what you need? Reach out — we usually reply within one business day.
            </p>
            <NvBtn variant="light" size="md" as="a" href="mailto:contact@nesved.com"><Icon.Mail /> Ask us anything</NvBtn>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.q} className="glass-card" style={{ borderRadius: 18, borderLeft: isOpen ? `4px solid ${it.color}` : '4px solid transparent', transition: 'all .22s ease', overflow: 'hidden' }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 24px 20px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 15.5, fontWeight: 700, color: C.ink900, letterSpacing: '-.02em' }}>
                    <span>{it.q}</span>
                    <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 99, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? `linear-gradient(135deg,${it.color},${hexA(it.color,.7)})` : 'rgba(18,52,95,.06)', color: isOpen ? '#fff' : C.ink800, transition: 'all .22s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      <Icon.Plus />
                    </span>
                  </button>
                  <div style={{ maxHeight: isOpen ? 400 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
                    <p style={{ margin: 0, padding: '0 24px 22px 20px', fontSize: 15, lineHeight: 1.7, color: C.ink500 }}>{it.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </NvContainer>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = '29ca0629-24ae-487a-b3a8-8515ac4ba09d';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Quickbuk enquiry from ${form.name} (${form.role || 'Role not specified'})`,
          from_name: form.name,
          email: form.email,
          role: form.role,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', role: '', message: '' }); }, 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inp: React.CSSProperties = { width: '100%', height: 48, padding: '0 16px', fontSize: 14, fontFamily: 'inherit', border: '1px solid rgba(255,255,255,.16)', borderRadius: 12, background: 'rgba(255,255,255,.07)', color: '#fff', outline: 'none', transition: 'border-color .18s' };
  const ta: React.CSSProperties = { ...inp, height: 120, padding: '14px 16px', resize: 'vertical', lineHeight: 1.6 };
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.80)', marginBottom: 8, letterSpacing: '.03em', textTransform: 'uppercase' };

  const contacts = [
    { icon: <Icon.Mail />,  label: 'Email',    value: 'contact@nesved.com', href: 'mailto:contact@nesved.com', color: C.cyan },
    { icon: <Icon.Phone />, label: 'WhatsApp', value: '+91 88060 12475',    href: 'https://wa.me/918806012475', color: C.caterGreen },
    { icon: <Icon.Globe />, label: 'Website',  value: 'nesved.com',         href: 'https://nesved.com', color: C.decorPurple },
  ];

  return (
    <section id="contact" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden', background: 'linear-gradient(150deg,#040B1C 0%,#091840 40%,#0D2460 70%,#132F7A 100%)', color: '#fff', width: '100%' }}>
      <div aria-hidden className="mesh-bg-dark" style={{ position: 'absolute', inset: 0, opacity: .8 }} />
      <div aria-hidden style={{ position: 'absolute', top: -220, right: -180, width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.30)},transparent 60%)`, filter: 'blur(50px)', animation: 'blobShift 20s ease-in-out infinite' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -280, left: -160, width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.caterGreen,.30)},transparent 60%)`, filter: 'blur(50px)', animation: 'blobShift 24s ease-in-out infinite reverse' }} />
      <div className="noise" />
      <NvContainer style={{ position: 'relative', zIndex: 1 }}>
        <div className="nv-contact-grid" style={{ display: 'grid', gap: 72, alignItems: 'center', position: 'relative' }}>
          <div>
            <NvPill tone="invert" icon={<Icon.Spark />}>Contact NesVed</NvPill>
            <h2 style={{ margin: '22px 0 20px', fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1.03, letterSpacing: '-.04em', fontWeight: 800, color: '#fff', maxWidth: 520 }}>
              Let's get your<br />business running<br />
              <span style={{ background: 'linear-gradient(100deg,#fff 0%,#A8D8F0 40%,#35BDE7 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>smarter.</span>
            </h2>
            <p style={{ margin: '0 0 40px', fontSize: 17.5, lineHeight: 1.7, color: 'rgba(255,255,255,.70)', maxWidth: 460 }}>
              Book a live demo of Quickbuk, request early access, or just say hi. Whether you're a venue owner, decorator, or caterer — we'd love to hear from you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440 }}>
              {contacts.map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderRadius: 14, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.11)', textDecoration: 'none', color: '#fff', transition: 'all .18s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.11)'; el.style.borderColor = 'rgba(255,255,255,.24)'; el.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.06)'; el.style.borderColor = 'rgba(255,255,255,.11)'; el.style.transform = 'translateX(0)'; }}
                >
                  <span style={{ width: 40, height: 40, borderRadius: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: hexA(c.color,.18), color: c.color, flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,.50)', textTransform: 'uppercase', letterSpacing: '.09em', fontWeight: 700 }}>{c.label}</span>
                    <span style={{ display: 'block', fontSize: 15.5, fontWeight: 600, marginTop: 3 }}>{c.value}</span>
                  </span>
                  <Icon.Arrow />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} style={{ position: 'relative', padding: 40, borderRadius: 28, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 48px 96px -32px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.10)' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 23, fontWeight: 800, color: '#fff', letterSpacing: '-.03em' }}>Request a demo</h3>
            <p style={{ margin: '0 0 30px', fontSize: 14, color: 'rgba(255,255,255,.55)', lineHeight: 1.6 }}>We'll get back to you within one business day.</p>

            <div className="nv-contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={lbl}>Full name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Your name" style={inp} />
              </div>
              <div>
                <label style={lbl}>Work email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="you@company.com" style={inp} />
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={lbl}>I am a...</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ ...inp, appearance: 'none', WebkitAppearance: 'none' }}>
                <option value="" style={{ background: '#0D1F4A' }}>Select your role</option>
                <option value="Venue Owner" style={{ background: '#0D1F4A' }}>Venue Owner</option>
                <option value="Decorator" style={{ background: '#0D1F4A' }}>Decorator</option>
                <option value="Caterer" style={{ background: '#0D1F4A' }}>Caterer</option>
                <option value="Other" style={{ background: '#0D1F4A' }}>Other</option>
              </select>
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={lbl}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your venue, decoration, or catering business" style={ta} />
            </div>

            <button type="submit" disabled={status === 'sending' || status === 'sent'} style={{ marginTop: 24, width: '100%', height: 52, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', borderRadius: 12, cursor: (status === 'sending' || status === 'sent') ? 'default' : 'pointer', border: 'none', background: status === 'sent' ? 'rgba(25,182,200,.9)' : status === 'error' ? 'rgba(220,60,60,.85)' : '#fff', color: status === 'idle' ? C.ink900 : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all .2s', boxShadow: '0 10px 30px -10px rgba(0,0,0,.4)' }}>
              {status === 'sent' ? <><Icon.Check /> Thanks — we'll be in touch!</> : status === 'error' ? <>Something went wrong — try again</> : status === 'sending' ? <>Sending…</> : <>Send enquiry <Icon.Arrow /></>}
            </button>
            <p style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,.5)', textAlign: 'center' }}>By submitting, you agree to be contacted by the NesVed team.</p>
          </form>
        </div>
      </NvContainer>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '48px 0 36px', background: '#040B1C', borderTop: '3px solid transparent', borderImage: 'linear-gradient(90deg,#2563EB,#a855f7,#10b981) 1', color: 'rgba(255,255,255,.55)', width: '100%' }}>
      <NvContainer>
        <div className="nv-footer-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/images/quickbuk-logo-new.png" alt="Quickbuk" style={{ height: 36, width: 36, borderRadius: 10, display: 'block' }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,.85)' }}>Quickbuk</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', fontWeight: 500 }}>by NesVed · © {new Date().getFullYear()}</div>
            </div>
          </div>
          <div className="nv-footer-links" style={{ display: 'flex', gap: 28, fontSize: 13.5 }}>
            {[
              { h: '#product', l: 'Product' },
              { h: '#pricing', l: 'Pricing' }, { h: '#faq', l: 'FAQ' },
              { h: '/privacy', l: 'Privacy Policy' }, { h: '/terms', l: 'Terms & Conditions' },
            ].map(lnk => (
              <a key={lnk.l} href={lnk.h} style={{ color: 'rgba(255,255,255,.50)', textDecoration: 'none', transition: 'color .18s', fontWeight: 500 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.50)'; }}
              >{lnk.l}</a>
            ))}
          </div>
        </div>
      </NvContainer>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', fontFamily: "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <Header />
      <main>
        <Hero />
        <SignInShowcase />
        <Product />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
