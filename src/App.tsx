import React, { useState, useEffect } from 'react';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  ink900: '#0A0F1E', ink800: '#12345F', ink700: '#1E4A7F',
  ink500: '#4B5675', ink300: '#A8B6C8', ink100: '#D7E3EF', ink50: '#EDF3FA',
  paper: '#F4F7FF', white: '#ffffff',
  blue: '#2563EB', blueDark: '#1D4FCE', cyan: '#35BDE7', teal: '#19B6C8',
};

function hexA(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ─── useBreakpoint ────────────────────────────────────────────────────────────
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

// ─── NvContainer ─────────────────────────────────────────────────────────────
function NvContainer({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: '100%', maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24, ...style }}>
      {children}
    </div>
  );
}

// ─── NvPill ───────────────────────────────────────────────────────────────────
type PillTone = 'ink' | 'blue' | 'cyan' | 'invert';
function NvPill({ children, tone = 'ink', icon }: { children: React.ReactNode; tone?: PillTone; icon?: React.ReactNode }) {
  const tones: Record<PillTone, { bg: string; bd: string; fg: string }> = {
    ink:    { bg: 'rgba(18,52,95,.07)',    bd: 'rgba(18,52,95,.14)',    fg: C.ink800 },
    blue:   { bg: 'rgba(37,99,235,.10)',  bd: 'rgba(37,99,235,.24)',  fg: C.blueDark },
    cyan:   { bg: 'rgba(53,189,231,.12)', bd: 'rgba(53,189,231,.30)', fg: '#0880A0' },
    invert: { bg: 'rgba(255,255,255,.12)',bd: 'rgba(255,255,255,.28)',fg: '#fff' },
  };
  const t = tones[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', background: t.bg, border: `1px solid ${t.bd}`, color: t.fg }}>
      {icon}{children}
    </span>
  );
}

// ─── NvBtn ────────────────────────────────────────────────────────────────────
type BtnVariant = 'primary' | 'dark' | 'light' | 'ghost' | 'invert';
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

// ─── Icons ────────────────────────────────────────────────────────────────────
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
        {/* Rocket icon */}
        <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #2563EB, #35BDE7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 16px 40px -12px rgba(37,99,235,.45)' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 800, color: C.ink900, letterSpacing: '-.025em', marginBottom: 12 }}>Launching Soon!</h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: C.ink500, marginBottom: 28 }}>
          The SmartBooker mobile app is currently in development and will be available on both the <strong style={{ color: C.ink900 }}>Google Play Store</strong> and <strong style={{ color: C.ink900 }}>Apple App Store</strong> soon.
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

// App Store badge buttons
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
      {/* Google Play */}
      <button onClick={onOpen} style={{ ...badgeStyle, border: 'none' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px -6px rgba(10,15,30,.4)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px -4px rgba(10,15,30,.3)'; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 20.5v-17c0-.83 1-.83 1.5-.5L19 12l-14.5 8.5c-.5.33-1.5.33-1.5-.5z" fill="#fff" opacity=".85"/><path d="M3 3.5 13.5 12 3 20.5" stroke="#34A853" strokeWidth="1.2"/><path d="M3 3.5l10.5 8.5H19" stroke="#FBBC04" strokeWidth="1.2"/><path d="M3 20.5 13.5 12H19" stroke="#EA4335" strokeWidth="1.2"/></svg>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 9, fontWeight: 500, opacity: .7, textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.2 }}>Get it on</div>
          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>Google Play</div>
        </div>
      </button>
      {/* App Store */}
      <button onClick={onOpen} style={{ ...badgeStyle, border: 'none' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px -6px rgba(10,15,30,.4)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px -4px rgba(10,15,30,.3)'; }}
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

  // lock body scroll when drawer open
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
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: headerPadding, paddingBottom: headerPadding,
          }}>
            {/* Logo — perfectly centred via flexbox align-items: center */}
            <a href="#home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              {/* Clip container strips the logo's built-in whitespace */}
            <div style={{ overflow: 'hidden', height: isMobile ? 44 : 56, width: isMobile ? 130 : 180, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/nesved-full-logo.png"
                alt="NesVed"
                style={{ height: isMobile ? 110 : 140, width: 'auto', objectFit: 'contain', display: 'block', flexShrink: 0 }}
              />
            </div>
            </a>

            {/* Desktop nav */}
            <nav className="nv-desktop-nav" style={{ alignItems: 'center', gap: 4 }}>
              {links.map(l => (
                <a key={l.h} href={l.h} style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500, color: C.ink800, textDecoration: 'none', borderRadius: 8, transition: 'background .15s, color .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(18,52,95,.05)'; (e.currentTarget as HTMLElement).style.color = C.blue; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink800; }}
                >{l.l}</a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="nv-desktop-nav" style={{ alignItems: 'center', gap: 10 }}>
              <NvBtn variant="primary" size="sm" as="a" href="#contact">
                Book a demo <Icon.Arrow width={14} height={14} />
              </NvBtn>
            </div>

            {/* Mobile hamburger */}
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

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="nv-mobile-drawer" style={{ background: 'rgba(10,26,51,.55)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '80%', maxWidth: 320,
            background: '#fff', boxShadow: '-20px 0 60px rgba(10,26,51,.2)',
            display: 'flex', flexDirection: 'column', padding: '0 0 32px',
          }}>
            {/* Drawer header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(18,52,95,.08)' }}>
              <img src="/images/nesved-full-logo.png" alt="NesVed" style={{ height: 48, width: 'auto' }} />
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: C.ink500 }} aria-label="Close menu">
                <Icon.X />
              </button>
            </div>
            {/* Drawer links */}
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
function HeroPhone() {
  return (
    <div className="nv-hero-phone" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 620, padding: '40px 60px' }}>

      {/* Background card — dark blue, rotated left */}
      <div aria-hidden style={{
        position: 'absolute',
        width: 320, height: 560,
        background: 'linear-gradient(160deg, #1D4FCE 0%, #2563EB 100%)',
        borderRadius: 40,
        transform: 'rotate(-8deg) translate(-40px, 10px)',
        boxShadow: '0 40px 80px -20px rgba(18,52,95,.5)',
        zIndex: 0,
      }} />
      {/* Background card — light blue/white, rotated right */}
      <div aria-hidden style={{
        position: 'absolute',
        width: 300, height: 540,
        background: 'linear-gradient(160deg, rgba(180,210,255,.75) 0%, rgba(210,232,255,.6) 100%)',
        borderRadius: 36,
        transform: 'rotate(7deg) translate(44px, 12px)',
        border: '1px solid rgba(100,160,255,.25)',
        zIndex: 0,
      }} />

      {/* Phone frame */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: 12, borderRadius: 50,
        background: 'linear-gradient(180deg, #1C1C22 0%, #08080E 100%)',
        boxShadow: '0 48px 96px -24px rgba(10,26,51,.6), 0 0 0 1px rgba(255,255,255,.07) inset',
        animation: 'floaty 6s ease-in-out infinite',
      }}>
        {/* Notch bar */}
        <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', width: 90, height: 6, borderRadius: 99, background: '#2a2a32', zIndex: 2 }} />
        <div style={{ borderRadius: 40, overflow: 'hidden', width: 290, height: 580, background: C.ink900, transform: 'translateZ(0)' }}>
          <img
            src="/images/sb-dashboard.png"
            alt="SmartBooker dashboard"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0%', display: 'block' }}
          />
        </div>
      </div>

      {/* Chip — Booking confirmed (top-left) */}
      <div className="nv-hero-chips" style={{
        position: 'absolute', top: 48, left: 0, zIndex: 3,
        padding: '10px 16px 10px 10px',
        background: '#fff', borderRadius: 16,
        boxShadow: '0 8px 32px -8px rgba(18,52,95,.22), 0 1px 4px rgba(18,52,95,.08)',
        display: 'flex', alignItems: 'center', gap: 10,
        animation: 'floaty 7s ease-in-out infinite .5s',
      }}>
        <span style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#19B6C8,#35BDE7)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
          <Icon.Check />
        </span>
        <div>
          <div style={{ fontSize: 11, color: C.ink500, fontWeight: 500, lineHeight: 1.3 }}>Booking confirmed</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink900, lineHeight: 1.4 }}>Sat · 24 Aug · ₹2,40,000</div>
        </div>
      </div>

      {/* Chip — Total revenue (bottom-right) */}
      <div className="nv-hero-chips" style={{
        position: 'absolute', bottom: 60, right: 0, zIndex: 3,
        padding: '14px 18px',
        background: '#0D1B35', borderRadius: 18,
        boxShadow: '0 16px 48px -12px rgba(10,26,51,.65)',
        minWidth: 190,
        animation: 'floaty 8s ease-in-out infinite 1s',
      }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 4 }}>Total revenue</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.2 }}>₹36,59,500</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, color: '#35BDE7', fontSize: 13, fontWeight: 600 }}>
          <Icon.Chart width={13} height={13} /> +18.4% this month
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [showModal, setShowModal] = useState(false);
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', paddingTop: 64, paddingBottom: 120, width: '100%', background: 'linear-gradient(160deg, #F8FAFF 0%, #EEF4FF 60%, #F0F7FF 100%)' }}>
      {/* Background */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: .65, maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)' } as React.CSSProperties} />
        <div style={{ position: 'absolute', top: -240, right: -80, width: 780, height: 780, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.28)} 0%,${hexA(C.cyan,0)} 60%)`, filter: 'blur(40px)', animation: 'blobShift 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: -260, left: -140, width: 680, height: 680, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.22)} 0%,${hexA(C.blue,0)} 60%)`, filter: 'blur(40px)', animation: 'blobShift 22s ease-in-out infinite reverse' }} />
      </div>

      <NvContainer>
        <div className="nv-hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 56, alignItems: 'center' }}>
          <div className="nv-hero-left">
            {/* Badge pill with live dot */}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px 6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', background: 'rgba(37,99,235,.09)', border: '1px solid rgba(37,99,235,.22)', color: C.blueDark }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: '#19B6C8', animation: 'pulseDot 2s infinite', flexShrink: 0, boxShadow: '0 0 0 3px rgba(25,182,200,.25)' }} />
                NesVed — Software Products Company
              </span>
            </span>
            <h1 style={{ margin: '28px 0 0', fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1.0, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink900 }}>
              Venue &amp; event<br />
              <span className="grad-text">operations made</span><br />
              <span style={{ fontWeight: 800, color: C.ink900 }}>effortlessly simple.</span>
            </h1>
            <p style={{ marginTop: 28, maxWidth: 530, fontSize: 18.5, lineHeight: 1.72, color: C.ink500, fontWeight: 400 }}>
              <strong style={{ color: C.ink900, fontWeight: 600 }}>NesVed</strong> is a software products company. <strong style={{ color: C.ink900, fontWeight: 600 }}>SmartBooker</strong> is our flagship product — an all-in-one booking &amp; management platform for marriage halls, banquet halls, marriage lawns, and hotels.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 40 }}>
              <NvBtn variant="primary" size="lg" as="a" href="#product">Explore SmartBooker <Icon.Arrow /></NvBtn>
              <NvBtn variant="light" size="lg" as="a" href="#contact"><Icon.Mail /> Talk to us</NvBtn>
            </div>
            <AppStoreBadges onOpen={() => setShowModal(true)} />
            {showModal && <LaunchingSoonModal onClose={() => setShowModal(false)} />}
            {/* Stat chips */}
            <div className="nv-hero-chips" style={{ marginTop: 44, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { icon: <Icon.Globe width={13} height={13} />, text: 'nesved.com' },
                { icon: <Icon.Shield width={13} height={13} />, text: 'Secure & multi-tenant' },
                { icon: <Icon.Users width={13} height={13} />, text: 'Used by venue owners' },
              ].map(s => (
                <span key={s.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 999, fontSize: 13, fontWeight: 500, color: C.ink500, background: 'rgba(255,255,255,.85)', border: '1px solid rgba(18,52,95,.10)', boxShadow: '0 1px 4px rgba(18,52,95,.06)', backdropFilter: 'blur(8px)' }}>
                  {s.icon}{s.text}
                </span>
              ))}
            </div>
          </div>
          <HeroPhone />
        </div>
      </NvContainer>
    </section>
  );
}

// ─── PRODUCT ──────────────────────────────────────────────────────────────────
function Product() {
  const [showModal, setShowModal] = useState(false);
  const features = [
    { icon: <Icon.Cal />,   title: 'Venue Booking & Calendar',     text: 'Book marriage halls, banquet halls, marriage lawns and hotel spaces. Visualise availability on a calendar — no double-bookings, ever.' },
    { icon: <Icon.Card />,  title: 'Payments, Dues & Tax Exports', text: 'Record advances, collect balances, issue refunds and export clean tax-ready sheets with one click.' },
    { icon: <Icon.Users />, title: 'Staff & Role Management',      text: 'Add staff members, assign roles, and control who can see bookings, payments, or reports — fully login-protected.' },
    { icon: <Icon.Chart />, title: 'Full Analytics Dashboard',     text: 'Live revenue trends, booking activity charts, occupancy rates and month-on-month comparisons — all in one dashboard.' },
    { icon: <Icon.Shield />, title: 'Services & Customisation',   text: 'Add decoration, catering, and other services to any booking. Customise service packages and pricing per venue.' },
    { icon: <Icon.Globe />, title: 'End-User Live Booking View',   text: 'Customers can check live availability and slot status of your venue in real time — no calls, no confusion.' },
  ];
  return (
    <section id="product" style={{ position: 'relative', padding: '120px 0', background: C.paper, width: '100%' }}>
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(180deg,#fff 0%,rgba(244,247,255,0) 100%)' }} />
      <NvContainer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 64 }}>
          <NvPill tone="cyan">Product 01 — Live now</NvPill>
          <h2 style={{ margin: '20px 0 16px', fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 800, color: C.ink900, maxWidth: 780 }}>
            Meet <span className="grad-text">SmartBooker</span> — built for<br />
            marriage halls &amp; venues, end to end.
          </h2>
          <p style={{ maxWidth: 640, color: C.ink500, fontSize: 17.5, lineHeight: 1.7, margin: 0 }}>
            Used by marriage hall owners, banquet operators, and hotel managers to handle bookings, staff, services, payments, receipts, and analytics — all from one mobile-first platform.
          </p>
        </div>

        {/* Showcase card */}
        <div className="nv-product-card" style={{ display: 'grid', gap: 0, background: 'linear-gradient(135deg, #060D1F 0%, #0D1F4A 50%, #1A3A8F 100%)', borderRadius: 32, overflow: 'hidden', boxShadow: '0 60px 120px -40px rgba(10,26,51,.55), 0 0 0 1px rgba(255,255,255,.05)', position: 'relative' }}>
          {/* Cyan orb glow */}
          <div aria-hidden style={{ position: 'absolute', top: -120, right: -80, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.40)} 0%,transparent 60%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', bottom: -100, left: -60, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.35)} 0%,transparent 60%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div className="nv-product-left" style={{ position: 'relative', padding: 56, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <img src="/images/nesved-short-logo.png" alt="" style={{ height: 28, width: 28, background: '#fff', borderRadius: 8, padding: 3 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.60)' }}>by NesVed</span>
            </div>
            <h3 style={{ fontSize: 'clamp(30px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-.035em', margin: '0 0 18px' }}>SmartBooker</h3>
            <p style={{ margin: '0 0 28px', color: 'rgba(255,255,255,.72)', fontSize: 16.5, lineHeight: 1.7, maxWidth: 460 }}>
              SmartBooker is NesVed's flagship product — purpose-built for marriage hall owners, banquet halls, marriage lawns, and hotel operators who want full control over their bookings, staff, and revenue.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 34 }}>
              {['Venue Booking', 'Calendar View', 'Staff Login', 'Services & Catering', 'PDF Receipts', 'Tax Exports', 'Analytics Dashboard', 'Live Availability', 'Subscriptions', 'Sponsored Ads'].map(t => (
                <span key={t} style={{ padding: '7px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 500, background: 'rgba(255,255,255,.10)', color: 'rgba(255,255,255,.88)', border: '1px solid rgba(255,255,255,.18)' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <NvBtn variant="invert" size="md" as="a" href="https://smartbooker-web-view.vercel.app/" style={{ color: C.ink900 }}>Start free <Icon.Arrow /></NvBtn>
              <NvBtn variant="ghost" size="md" as="a" href="#contact" style={{ borderColor: 'rgba(255,255,255,.28)', color: '#fff', background: 'rgba(255,255,255,.05)' }}>Book a demo</NvBtn>
            </div>
            {/* App store badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
              {[
                { label: 'Google Play', sub: 'Get it on', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 20.5v-17c0-.83 1-.83 1.5-.5L19 12l-14.5 8.5c-.5.33-1.5.33-1.5-.5z" fill="#fff" opacity=".85"/><path d="M3 3.5 13.5 12 3 20.5" stroke="#34A853" strokeWidth="1.2"/><path d="M3 3.5l10.5 8.5H19" stroke="#FBBC04" strokeWidth="1.2"/><path d="M3 20.5 13.5 12H19" stroke="#EA4335" strokeWidth="1.2"/></svg> },
                { label: 'App Store', sub: 'Download on the', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,.9)"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
              ].map(b => (
                <button key={b.label} onClick={() => setShowModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 12, cursor: 'pointer', background: 'rgba(255,255,255,.08)', color: '#fff', border: '1px solid rgba(255,255,255,.18)', fontFamily: 'inherit', transition: 'background .15s, transform .18s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.14)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  {b.icon}
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 9, fontWeight: 500, opacity: .65, textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.2 }}>{b.sub}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>{b.label}</div>
                  </div>
                </button>
              ))}
            </div>
            {showModal && <LaunchingSoonModal onClose={() => setShowModal(false)} />}
            <div className="nv-product-stats" style={{ marginTop: 52, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 28 }}>
              {[{ k: 'Mobile-first', v: 'iOS & Android' }, { k: 'Who uses it', v: 'Hall & hotel owners' }, { k: 'Multi-tenant', v: 'Secure by default' }].map(s => (
                <div key={s.k}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.50)', textTransform: 'uppercase', letterSpacing: '.09em', fontWeight: 700 }}>{s.k}</div>
                  <div style={{ fontSize: 14.5, color: '#fff', marginTop: 5, fontWeight: 600 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="nv-feature-grid" style={{ marginTop: 72, display: 'grid', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} style={{ padding: 28, borderRadius: 20, background: '#fff', border: '1px solid #E8EDF5', transition: 'transform .22s ease,box-shadow .22s ease,border-color .22s ease', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 20px 48px -16px rgba(18,52,95,.22), 0 0 0 1.5px rgba(37,99,235,.30)'; el.style.borderColor = 'rgba(37,99,235,.28)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = '#E8EDF5'; }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg,${hexA(C.blue,.12)},${hexA(C.cyan,.14)})`, color: C.blueDark, flexShrink: 0 }}>{f.icon}</div>
              <h4 style={{ margin: '18px 0 8px', fontSize: 16, fontWeight: 700, color: C.ink900, letterSpacing: '-.02em' }}>{f.title}</h4>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: C.ink500 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </NvContainer>
    </section>
  );
}


// ─── PRICING ──────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    { name: 'Starter', price: '₹1,999', cadence: '/ month', desc: 'For single-venue teams getting organised.', points: ['Bookings & calendar', 'Payment & due tracking', 'PDF receipts', 'CSV exports'], featured: false },
    { name: 'Pro',     price: '₹4,999', cadence: '/ month', desc: 'For busy venue businesses that need depth.', points: ['Everything in Starter', 'Staff roles & permissions', 'Refunds & adjustments', 'Advanced reports'], featured: true },
    { name: 'Scale',   price: 'Custom',  cadence: '',        desc: 'For multi-venue operators and chains.',      points: ['Multi-team workflows', 'Priority support', 'Custom onboarding', 'API access'], featured: false },
  ];
  return (
    <section id="pricing" style={{ padding: '120px 0', position: 'relative', width: '100%', background: '#fff' }}>
      <NvContainer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 64 }}>
          <NvPill tone="ink">Pricing</NvPill>
          <h2 style={{ margin: '20px 0 16px', fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 800, color: C.ink900, maxWidth: 760 }}>
            Honest pricing,<br />no surprises.
          </h2>
          <p style={{ maxWidth: 540, color: C.ink500, fontSize: 17.5, lineHeight: 1.7, margin: 0 }}>
            Pick a plan that fits where your venue business is today. Move up whenever it makes sense.
          </p>
        </div>
        <div className="nv-pricing-grid" style={{ display: 'grid', gap: 20, alignItems: 'start' }}>
          {plans.map(p => (
            <div key={p.name} style={{ position: 'relative', borderRadius: 24, padding: 36, background: p.featured ? 'linear-gradient(160deg,#060D1F 0%,#0D1F4A 55%,#1A3A8F 100%)' : '#fff', color: p.featured ? '#fff' : C.ink900, border: p.featured ? '1px solid rgba(255,255,255,.14)' : '1px solid rgba(18,52,95,.10)', boxShadow: p.featured ? '0 48px 96px -30px rgba(10,26,51,.65), 0 0 0 1px rgba(53,189,231,.10)' : '0 2px 12px rgba(10,15,30,.05)', transform: p.featured ? 'translateY(-12px)' : 'none', overflow: 'hidden' }}>
              {p.featured && <div aria-hidden style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.45)},transparent 65%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />}
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, letterSpacing: '-.025em' }}>{p.name}</h3>
                  {p.featured && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999, background: 'linear-gradient(135deg,rgba(53,189,231,.30),rgba(53,189,231,.18))', color: '#7DD7F3', border: `1px solid ${hexA(C.cyan,.40)}`, flexShrink: 0 }}>Most popular</span>}
                </div>
                <p style={{ margin: '0 0 26px', fontSize: 13.5, color: p.featured ? 'rgba(255,255,255,.68)' : C.ink500, lineHeight: 1.6 }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 28 }}>
                  <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: '-.04em' }}>{p.price}</span>
                  {p.cadence && <span style={{ fontSize: 13, color: p.featured ? 'rgba(255,255,255,.50)' : C.ink500 }}>{p.cadence}</span>}
                </div>
                <NvBtn variant={p.featured ? 'invert' : 'dark'} size="md" as="a" href="#contact" style={{ width: '100%' }}>Get started <Icon.Arrow /></NvBtn>
                <ul style={{ listStyle: 'none', padding: 0, margin: '30px 0 0', display: 'flex', flexDirection: 'column', gap: 13 }}>
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
        <p style={{ marginTop: 32, textAlign: 'center', fontSize: 13.5, color: C.ink500 }}>All plans include unlimited bookings and free updates. Cancel any time.</p>
      </NvContainer>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    { q: 'What is NesVed?', a: 'NesVed is a software products company. We design and build focused, opinionated tools for modern businesses. SmartBooker is our flagship product — purpose-built for the venue and events industry.' },
    { q: 'Who is SmartBooker for?', a: 'SmartBooker is built for marriage hall owners, banquet hall managers, marriage lawn operators, and hotel owners. Anyone who takes bookings, manages staff, and handles event payments will find it useful.' },
    { q: 'What venues can I manage?', a: 'You can add and manage multiple venues — marriage halls, banquet halls, marriage lawns, hotel banquet spaces, and more. Each venue has its own availability, calendar, and booking list.' },
    { q: 'Can I add staff and control their access?', a: 'Yes. You can add staff members, assign roles, and control exactly what each staff member can see or do — bookings, payments, reports — all behind secure login.' },
    { q: 'What services can I add to a booking?', a: 'You can add and customise services like decoration, catering, sound, photography, and more. Each service can be priced individually and attached to any booking.' },
    { q: 'Can customers see live venue availability?', a: 'Yes. End users can view the live booking status and availability of your venue in real time — reducing calls and making it easy for customers to check open slots.' },
    { q: 'How does the analytics dashboard work?', a: 'The full analytics dashboard shows you revenue trends, booking activity, occupancy, pending dues, and month-on-month comparisons — updated in real time so you always know how your business is performing.' },
    { q: 'Can I export data for tax purposes?', a: 'Absolutely. SmartBooker generates PDF receipts for customers and supports CSV exports of bookings and payment data — ready for your accountant or tax filing.' },
    { q: 'Does SmartBooker support subscriptions and advertisements?', a: 'Yes. SmartBooker includes subscription plans for venue owners, and a sponsored advertisement feature that lets venues promote themselves to more customers on the platform.' },
    { q: 'How do I get started?', a: 'Book a quick demo from this page. We will walk you through the product, set up your venue, and get your team onboarded within a day.' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ padding: '120px 0', background: C.paper, position: 'relative', width: '100%' }}>
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
                <div key={it.q} style={{ background: '#fff', borderRadius: 18, border: `1px solid ${isOpen ? 'rgba(37,99,235,.28)' : 'rgba(18,52,95,.08)'}`, borderLeft: isOpen ? '4px solid #2563EB' : '4px solid transparent', boxShadow: isOpen ? '0 16px 40px -20px rgba(18,52,95,.22)' : 'none', transition: 'all .22s ease', overflow: 'hidden' }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 24px 20px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 15.5, fontWeight: 700, color: C.ink900, letterSpacing: '-.02em' }}>
                    <span>{it.q}</span>
                    <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 99, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? 'linear-gradient(135deg,#1D4FCE,#35BDE7)' : 'rgba(18,52,95,.06)', color: isOpen ? '#fff' : C.ink800, transition: 'all .22s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
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
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // get free key at web3forms.com

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
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
          subject: `New SmartBooker enquiry from ${form.name}`,
          from_name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', company: '', message: '' }); }, 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };
  const inp: React.CSSProperties = { width: '100%', height: 48, padding: '0 16px', fontSize: 14, fontFamily: 'inherit', border: '1px solid rgba(255,255,255,.16)', borderRadius: 12, background: 'rgba(255,255,255,.07)', color: '#fff', outline: 'none', transition: 'border-color .18s, background .18s' };
  const ta: React.CSSProperties = { ...inp, height: 120, padding: '14px 16px', resize: 'vertical', lineHeight: 1.6 };
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.80)', marginBottom: 8, letterSpacing: '.03em', textTransform: 'uppercase' };
  const contacts = [
    { icon: <Icon.Mail />,  label: 'Email',     value: 'contact@nesved.com',  href: 'mailto:contact@nesved.com' },
    { icon: <Icon.Phone />, label: 'WhatsApp',  value: '+91 88060 12475',     href: 'https://wa.me/918806012475' },
    { icon: <Icon.Globe />, label: 'Website',   value: 'nesved.com',          href: 'https://nesved.com' },
  ];
  return (
    <section id="contact" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden', background: 'linear-gradient(150deg,#040B1C 0%,#091840 40%,#0D2460 70%,#132F7A 100%)', color: '#fff', width: '100%' }}>
      <div aria-hidden style={{ position: 'absolute', top: -220, right: -180, width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.30)},transparent 60%)`, filter: 'blur(50px)', animation: 'blobShift 20s ease-in-out infinite' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -280, left: -160, width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.38)},transparent 60%)`, filter: 'blur(50px)', animation: 'blobShift 24s ease-in-out infinite reverse' }} />
      <div aria-hidden style={{ position: 'absolute', top: '40%', left: '40%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.15)},transparent 60%)`, filter: 'blur(60px)' }} />
      <div className="noise" />
      <NvContainer>
        <div className="nv-contact-grid" style={{ display: 'grid', gap: 72, alignItems: 'center', position: 'relative' }}>
          <div>
            <NvPill tone="invert" icon={<Icon.Spark />}>Contact NesVed</NvPill>
            <h2 style={{ margin: '22px 0 20px', fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1.03, letterSpacing: '-.04em', fontWeight: 800, color: '#fff', maxWidth: 520 }}>
              Let's get your<br />business running<br />
              <span style={{ background: 'linear-gradient(100deg,#fff 0%,#A8D8F0 40%,#35BDE7 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>smarter.</span>
            </h2>
            <p style={{ margin: '0 0 40px', fontSize: 17.5, lineHeight: 1.7, color: 'rgba(255,255,255,.70)', maxWidth: 460 }}>
              Book a live demo of SmartBooker, request early access to upcoming products, or just say hi. We'd love to hear from you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440 }}>
              {contacts.map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderRadius: 14, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.11)', textDecoration: 'none', color: '#fff', transition: 'all .18s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.11)'; el.style.borderColor = 'rgba(255,255,255,.24)'; el.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.06)'; el.style.borderColor = 'rgba(255,255,255,.11)'; el.style.transform = 'translateX(0)'; }}
                >
                  <span style={{ width: 40, height: 40, borderRadius: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: hexA(C.cyan,.16), color: '#7DD7F3', flexShrink: 0 }}>{c.icon}</span>
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
              <label style={lbl}>Company / venue</label>
              <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Where do you work?" style={inp} />
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={lbl}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your venue size or requirements" style={ta} />
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
    <footer style={{ padding: '48px 0 36px', background: '#040B1C', borderTop: '1px solid rgba(255,255,255,.06)', color: 'rgba(255,255,255,.55)', width: '100%' }}>
      <NvContainer>
        <div className="nv-footer-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ padding: 7, background: '#fff', borderRadius: 11, flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,.3)' }}>
              <img src="/images/nesved-short-logo.png" alt="NesVed" style={{ height: 22, width: 'auto', display: 'block' }} />
            </div>
            <span style={{ fontSize: 13.5, fontWeight: 500, color: 'rgba(255,255,255,.50)' }}>© {new Date().getFullYear()} NesVed. All rights reserved.</span>
          </div>
          <div className="nv-footer-links" style={{ display: 'flex', gap: 28, fontSize: 13.5 }}>
            {[
              { h: '#product', l: 'SmartBooker' }, { h: '#pricing', l: 'Pricing' },
              { h: '#faq', l: 'FAQ' }, { h: 'mailto:contact@nesved.com', l: 'contact@nesved.com' },
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
        <Product />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
