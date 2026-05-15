import React, { useState, useEffect } from 'react';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  ink900: '#0A1A33', ink800: '#12345F', ink700: '#1E4A7F',
  ink500: '#6B7C93', ink300: '#A8B6C8', ink100: '#D7E3EF', ink50: '#EDF3FA',
  paper: '#F6F8FC', white: '#ffffff',
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
    ink:    { bg: 'rgba(18,52,95,.06)',    bd: 'rgba(18,52,95,.10)',    fg: C.ink800 },
    blue:   { bg: 'rgba(37,99,235,.08)',  bd: 'rgba(37,99,235,.18)',  fg: C.blueDark },
    cyan:   { bg: 'rgba(53,189,231,.10)', bd: 'rgba(53,189,231,.25)', fg: '#0E8EA4' },
    invert: { bg: 'rgba(255,255,255,.10)',bd: 'rgba(255,255,255,.22)',fg: '#fff' },
  };
  const t = tones[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', background: t.bg, border: `1px solid ${t.bd}`, color: t.fg }}>
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
    sm: { h: 36, px: 14, fs: 13 }, md: { h: 44, px: 20, fs: 14 }, lg: { h: 52, px: 26, fs: 15 },
  };
  const s = sizes[size];
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: s.h, padding: `0 ${s.px}px`, fontSize: s.fs, fontWeight: 600,
    borderRadius: 12, cursor: disabled ? 'default' : 'pointer', border: '1px solid transparent',
    transition: 'transform .18s ease, box-shadow .18s ease, background .18s ease',
    whiteSpace: 'nowrap', textDecoration: 'none', fontFamily: 'inherit',
  };
  const variants: Record<BtnVariant, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg,#12345F 0%,#2563EB 60%,#35BDE7 130%)', color: '#fff', boxShadow: '0 10px 30px -10px rgba(37,99,235,.55),inset 0 1px 0 rgba(255,255,255,.18)' },
    dark:    { background: C.ink900, color: '#fff' },
    light:   { background: '#fff', color: C.ink800, borderColor: 'rgba(18,52,95,.12)', boxShadow: '0 1px 2px rgba(10,26,51,.04)' },
    ghost:   { background: 'transparent', color: C.ink800, borderColor: 'rgba(18,52,95,.18)' },
    invert:  { background: '#fff', color: C.ink900 },
  };
  const merged = { ...base, ...variants[variant], ...style };
  const hoverProps = {
    onMouseEnter: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; },
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
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', paddingTop: 56, paddingBottom: 100, width: '100%' }}>
      {/* Background */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: .7, maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)' } as React.CSSProperties} />
        <div style={{ position: 'absolute', top: -200, right: -100, width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.35)} 0%,${hexA(C.cyan,0)} 60%)`, filter: 'blur(30px)', animation: 'blobShift 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: -220, left: -120, width: 620, height: 620, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.28)} 0%,${hexA(C.blue,0)} 60%)`, filter: 'blur(30px)', animation: 'blobShift 22s ease-in-out infinite reverse' }} />
      </div>

      <NvContainer>
        <div className="nv-hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 56, alignItems: 'center' }}>
          <div className="nv-hero-left">
            <NvPill tone="blue" icon={<Icon.Spark />}>The NesVed Company</NvPill>
            <h1 style={{ margin: '24px 0 0', fontSize: 'clamp(36px, 5.5vw, 76px)', lineHeight: 1.02, fontWeight: 700, letterSpacing: '-0.035em', color: C.ink900 }}>
              Software products,<br />
              <span className="grad-text">precisely engineered</span><br />
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
                <span className="serif" style={{ fontSize: '0.92em', color: C.ink800 }}>for focused</span>
                <span style={{ fontWeight: 700 }}>teams.</span>
              </span>
            </h1>
            <p style={{ marginTop: 28, maxWidth: 520, fontSize: 18, lineHeight: 1.65, color: '#3F4F6B', fontWeight: 400 }}>
              NesVed builds opinionated, premium tools for modern businesses. <strong style={{ color: C.ink900, fontWeight: 600 }}>SmartBooker</strong> is our first — operations software for venues, events &amp; bookings.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
              <NvBtn variant="primary" size="lg" as="a" href="#product">Explore SmartBooker <Icon.Arrow /></NvBtn>
              <NvBtn variant="light" size="lg" as="a" href="#contact"><Icon.Mail /> Talk to us</NvBtn>
            </div>
            <div style={{ marginTop: 40, display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: '#4D6280' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: C.teal, animation: 'pulseDot 2s infinite', flexShrink: 0 }} />
                1 product live · more in build
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon.Globe /> nesved.com</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon.Shield width={14} height={14} /> Built for reliability</span>
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
  const features = [
    { icon: <Icon.Cal />,   title: 'Bookings & calendar', text: 'Manage venues, dates, slots and service bundles from one calendar view.' },
    { icon: <Icon.Card />,  title: 'Payments & dues',     text: 'Track advances, settlements and refunds with a transparent ledger.' },
    { icon: <Icon.Users />, title: 'Staff roles',         text: 'Role-based access keeps your team productive and your data safe.' },
    { icon: <Icon.Chart />, title: 'Reports & exports',   text: 'PDF receipts, rich CSV exports and dashboards your finance team will love.' },
  ];
  return (
    <section id="product" style={{ position: 'relative', padding: '112px 0', background: C.paper, width: '100%' }}>
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(180deg,#fff 0%,rgba(246,248,252,0) 100%)' }} />
      <NvContainer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 56 }}>
          <NvPill tone="cyan">Product 01 — Live now</NvPill>
          <h2 style={{ margin: '18px 0 14px', fontSize: 'clamp(30px,4.5vw,56px)', lineHeight: 1.05, letterSpacing: '-.03em', fontWeight: 700, color: C.ink900, maxWidth: 780 }}>
            Meet <span className="grad-text">SmartBooker</span> — venue operations,<br />
            <span className="serif" style={{ color: C.ink800 }}>quietly running</span> in the background.
          </h2>
          <p style={{ maxWidth: 600, color: '#4D6280', fontSize: 17, lineHeight: 1.55, margin: 0 }}>
            Bookings, payments, staff access, refunds and reporting — in one clean, mobile-first platform.
          </p>
        </div>

        {/* Showcase card */}
        <div className="nv-product-card" style={{ display: 'grid', gap: 0, background: C.ink900, borderRadius: 32, overflow: 'hidden', boxShadow: '0 60px 120px -40px rgba(10,26,51,.45)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: .5, pointerEvents: 'none', background: `radial-gradient(ellipse at 80% 20%,${hexA(C.cyan,.35)} 0%,transparent 55%),radial-gradient(ellipse at 0% 100%,${hexA(C.blue,.4)} 0%,transparent 55%)` }} />
          <div className="nv-product-left" style={{ position: 'relative', padding: 56, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <img src="/images/nesved-short-logo.png" alt="" style={{ height: 28, width: 28, background: '#fff', borderRadius: 8, padding: 3 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.65)' }}>by NesVed</span>
            </div>
            <h3 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-.025em', margin: '0 0 16px' }}>SmartBooker</h3>
            <p style={{ margin: '0 0 26px', color: 'rgba(255,255,255,.75)', fontSize: 16, lineHeight: 1.6, maxWidth: 420 }}>
              All-in-one venue and event operations. Calendar-driven bookings, clean payment ledgers, and reports your team will actually use.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {['Bookings', 'Payments', 'Staff roles', 'PDF receipts', 'CSV exports', 'Analytics'].map(t => (
                <span key={t} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.85)', border: '1px solid rgba(255,255,255,.1)' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <NvBtn variant="invert" size="md" as="a" href="https://smartbooker-web-view.vercel.app/" style={{ color: C.ink900 }}>Start free <Icon.Arrow /></NvBtn>
              <NvBtn variant="ghost" size="md" as="a" href="#contact" style={{ borderColor: 'rgba(255,255,255,.25)', color: '#fff', background: 'transparent' }}>Book a demo</NvBtn>
            </div>
            <div className="nv-product-stats" style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 24 }}>
              {[{ k: 'Mobile-first', v: 'iOS & Android' }, { k: 'Real-time', v: 'Live ledger' }, { k: 'Tenant-scoped', v: 'Secure by default' }].map(s => (
                <div key={s.k}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>{s.k}</div>
                  <div style={{ fontSize: 14, color: '#fff', marginTop: 4, fontWeight: 500 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="nv-product-right" style={{ position: 'relative', padding: '40px 40px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div style={{ position: 'relative', padding: 10, borderRadius: 36, background: 'linear-gradient(180deg,#1B1B22,#0A0A10)', boxShadow: '0 30px 60px -10px rgba(0,0,0,.5)' }}>
              <div style={{ borderRadius: 28, overflow: 'hidden', width: 260, height: 480, transform: 'translateZ(0)' }}>
                <img src="/images/sb-bookings.png" alt="" style={{ width: '104%', height: '104%', marginLeft: '-2%', marginTop: '-2%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="nv-feature-grid" style={{ marginTop: 64, display: 'grid', gap: 16 }}>
          {features.map(f => (
            <div key={f.title} style={{ padding: 24, borderRadius: 18, background: '#fff', border: '1px solid rgba(18,52,95,.08)', transition: 'transform .2s,box-shadow .2s,border-color .2s', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 18px 40px -18px rgba(18,52,95,.25)'; el.style.borderColor = 'rgba(37,99,235,.25)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = 'rgba(18,52,95,.08)'; }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg,${hexA(C.blue,.10)},${hexA(C.cyan,.10)})`, color: C.blueDark }}>{f.icon}</div>
              <h4 style={{ margin: '14px 0 6px', fontSize: 15, fontWeight: 700, color: C.ink900 }}>{f.title}</h4>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: '#4D6280' }}>{f.text}</p>
            </div>
          ))}
        </div>
      </NvContainer>
    </section>
  );
}

// ─── SCREENS ──────────────────────────────────────────────────────────────────
function ScreenCard({ shot }: { shot: { src: string; tag: string; title: string; desc: string; tone: string } }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, padding: '48px 32px 52px' }}>
      {/* Phone frame */}
      <div style={{
        position: 'relative',
        padding: 10, borderRadius: 44,
        background: 'linear-gradient(180deg, #1C1C24 0%, #0E0E16 100%)',
        boxShadow: '0 32px 64px -24px rgba(10,26,51,.45), 0 0 0 1px rgba(255,255,255,.06) inset',
      }}>
        {/* Screen */}
        <div style={{ borderRadius: 35, overflow: 'hidden', width: 248, height: 504, transform: 'translateZ(0)', background: shot.tone }}>
          <img
            src={shot.src} alt={shot.tag}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0%', display: 'block' }}
          />
        </div>
      </div>

      {/* Pill + copy */}
      <div style={{ textAlign: 'center', maxWidth: 300 }}>
        <span style={{
          display: 'inline-block', padding: '6px 18px', borderRadius: 99,
          fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
          background: 'transparent', color: shot.tone,
          border: `1.5px solid ${hexA(shot.tone, .35)}`,
        }}>{shot.tag}</span>
        <h3 style={{ margin: '16px 0 10px', fontSize: 20, fontWeight: 700, color: C.ink900, letterSpacing: '-.02em' }}>{shot.title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#4D6280' }}>{shot.desc}</p>
      </div>
    </div>
  );
}

function Screens() {
  const shots = [
    { src: '/images/sb-dashboard.png', tag: 'Dashboard', title: 'Your day, at a glance',        desc: "Live revenue, quick actions, and today's bookings — the first thing your team sees every morning.", tone: C.blue },
    { src: '/images/sb-bookings.png',  tag: 'Bookings',  title: 'Every event, in one place',    desc: 'Filter by status, search by name or BK-ID, and see paid vs. due balances at a glance.',           tone: C.teal },
    { src: '/images/sb-payments.png',  tag: 'Payments',  title: 'Clean ledger, zero confusion', desc: 'Net collected, pending, refunds and average ticket size — grouped by day, ready to export.',       tone: C.blueDark },
  ];
  return (
    <section id="screens" style={{ position: 'relative', background: '#EBF2FA', width: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ paddingTop: 96, paddingBottom: 0 }}>
        <NvContainer>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 0 }}>
            <NvPill tone="blue">Built mobile-first</NvPill>
            <h2 style={{ margin: '18px 0 14px', fontSize: 'clamp(30px,4.5vw,52px)', lineHeight: 1.05, letterSpacing: '-.03em', fontWeight: 700, color: C.ink900, maxWidth: 760 }}>
              Real screens.<br /><span className="serif" style={{ color: C.ink800 }}>Real</span> <span className="grad-text">operations.</span>
            </h2>
            <p style={{ maxWidth: 560, color: '#4D6280', fontSize: 17, lineHeight: 1.55, margin: 0 }}>
              From the morning huddle to the end-of-day reconciliation — SmartBooker keeps the whole team on the same page.
            </p>
          </div>
        </NvContainer>
      </div>

      {/* Full-width 3-col grid with dividers */}
      <div className="nv-screens-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '100%', maxWidth: 1280, margin: '0 auto' }}>
        {shots.map((s, i) => (
          <div key={s.tag} style={{
            borderRight: i < 2 ? '1px solid rgba(18,52,95,.10)' : 'none',
            borderTop: '1px solid rgba(18,52,95,.10)',
            marginTop: 32,
          }}>
            <ScreenCard shot={s} />
          </div>
        ))}
      </div>
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
    <section id="pricing" style={{ padding: '112px 0', position: 'relative', width: '100%' }}>
      <NvContainer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 56 }}>
          <NvPill tone="ink">Pricing</NvPill>
          <h2 style={{ margin: '18px 0 14px', fontSize: 'clamp(30px,4.5vw,56px)', lineHeight: 1.05, letterSpacing: '-.03em', fontWeight: 700, color: C.ink900, maxWidth: 760 }}>
            Honest pricing,<br /><span className="serif" style={{ color: C.ink800 }}>no surprises.</span>
          </h2>
          <p style={{ maxWidth: 540, color: '#4D6280', fontSize: 17, lineHeight: 1.55, margin: 0 }}>
            Pick a plan that fits where your venue business is today. Move up whenever it makes sense.
          </p>
        </div>
        <div className="nv-pricing-grid" style={{ display: 'grid', gap: 20 }}>
          {plans.map(p => (
            <div key={p.name} style={{ position: 'relative', borderRadius: 24, padding: 32, background: p.featured ? 'linear-gradient(180deg,#0A1A33 0%,#12345F 60%,#1D4FCE 130%)' : '#fff', color: p.featured ? '#fff' : C.ink900, border: p.featured ? '1px solid rgba(255,255,255,.15)' : '1px solid rgba(18,52,95,.10)', boxShadow: p.featured ? '0 40px 80px -30px rgba(18,52,95,.5)' : '0 1px 2px rgba(10,26,51,.04)', transform: p.featured ? 'translateY(-8px)' : 'none', overflow: 'hidden' }}>
              {p.featured && <div aria-hidden style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.4)},transparent 65%)`, filter: 'blur(20px)' }} />}
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{p.name}</h3>
                  {p.featured && <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 999, background: hexA(C.cyan,.18), color: '#7DD7F3', border: `1px solid ${hexA(C.cyan,.3)}`, flexShrink: 0 }}>Most popular</span>}
                </div>
                <p style={{ margin: '8px 0 24px', fontSize: 13.5, color: p.featured ? 'rgba(255,255,255,.7)' : '#4D6280', lineHeight: 1.5 }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 28 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-.03em' }}>{p.price}</span>
                  {p.cadence && <span style={{ fontSize: 13, color: p.featured ? 'rgba(255,255,255,.55)' : C.ink500 }}>{p.cadence}</span>}
                </div>
                <NvBtn variant={p.featured ? 'invert' : 'dark'} size="md" as="a" href="#contact" style={{ width: '100%' }}>Get started <Icon.Arrow /></NvBtn>
                <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {p.points.map(pt => (
                    <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: p.featured ? 'rgba(255,255,255,.85)' : C.ink700 }}>
                      <span style={{ marginTop: 1, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 99, background: p.featured ? hexA(C.cyan,.2) : hexA(C.teal,.12), color: p.featured ? '#7DD7F3' : '#0E8EA4' }}>
                        <Icon.Check width={12} height={12} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 28, textAlign: 'center', fontSize: 13, color: C.ink500 }}>All plans include unlimited bookings and free updates. Cancel any time.</p>
      </NvContainer>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    { q: 'What is NesVed?', a: 'NesVed is a product company building focused software tools for modern businesses. SmartBooker is our first product — more are in active development.' },
    { q: 'Who is SmartBooker for?', a: 'Venue owners and teams managing weddings, events, services, payments and follow-ups. It works for single venues and multi-venue operators alike.' },
    { q: 'Can I track partial payments and refunds?', a: 'Yes. Record advances, additional payments, cancellation refunds, and monitor net collected totals in a clean ledger.' },
    { q: 'Does it support staff access?', a: 'Role-aware permissions let your team see exactly what they need — bookings, payments, reports — without compromising critical actions.' },
    { q: 'Can I export data?', a: 'Absolutely. SmartBooker generates customer-facing PDF receipts and supports rich CSV exports for ops and finance.' },
    { q: 'How do I get started?', a: 'Book a quick demo from this page. We will walk you through the product, help import existing data, and onboard your team.' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ padding: '112px 0', background: C.paper, position: 'relative', width: '100%' }}>
      <NvContainer>
        <div className="nv-faq-grid" style={{ display: 'grid', gap: 64, alignItems: 'flex-start' }}>
          <div className="nv-faq-aside">
            <NvPill tone="cyan">FAQ</NvPill>
            <h2 style={{ margin: '18px 0 14px', fontSize: 'clamp(30px,4vw,50px)', lineHeight: 1.05, letterSpacing: '-.03em', fontWeight: 700, color: C.ink900 }}>
              Common<br /><span className="serif" style={{ color: C.ink800 }}>questions,</span><br />clear answers.
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 16, lineHeight: 1.6, color: '#4D6280', maxWidth: 360 }}>
              Can't find what you need? Reach out — we usually reply within one business day.
            </p>
            <NvBtn variant="light" size="md" as="a" href="mailto:contact@nesved.com"><Icon.Mail /> Ask us anything</NvBtn>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.q} style={{ background: '#fff', borderRadius: 18, border: `1px solid ${isOpen ? 'rgba(37,99,235,.30)' : 'rgba(18,52,95,.08)'}`, boxShadow: isOpen ? '0 18px 40px -22px rgba(18,52,95,.25)' : 'none', transition: 'all .2s ease' }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, color: C.ink900, letterSpacing: '-.005em' }}>
                    <span>{it.q}</span>
                    <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 99, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? 'linear-gradient(135deg,#2563EB,#35BDE7)' : 'rgba(18,52,95,.06)', color: isOpen ? '#fff' : C.ink800, transition: 'all .2s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      <Icon.Plus />
                    </span>
                  </button>
                  <div style={{ maxHeight: isOpen ? 240 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
                    <p style={{ margin: 0, padding: '0 24px 22px', fontSize: 15, lineHeight: 1.65, color: '#4D6280' }}>{it.a}</p>
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
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', company: '', message: '' }); }, 3200);
  };
  const inp: React.CSSProperties = { width: '100%', height: 48, padding: '0 16px', fontSize: 14, fontFamily: 'inherit', border: '1px solid rgba(255,255,255,.18)', borderRadius: 12, background: 'rgba(255,255,255,.08)', color: '#fff', outline: 'none', transition: 'border-color .15s' };
  const ta: React.CSSProperties = { ...inp, height: 120, padding: '14px 16px', resize: 'vertical', lineHeight: 1.5 };
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.85)', marginBottom: 8 };
  const contacts = [
    { icon: <Icon.Mail />,  label: 'Email',     value: 'contact@nesved.com',  href: 'mailto:contact@nesved.com' },
    { icon: <Icon.Phone />, label: 'WhatsApp',  value: '+91 98765 43210',     href: 'https://wa.me/919876543210' },
    { icon: <Icon.Globe />, label: 'Website',   value: 'nesved.com',          href: 'https://nesved.com' },
  ];
  return (
    <section id="contact" style={{ position: 'relative', padding: '112px 0', overflow: 'hidden', background: 'linear-gradient(160deg,#0A1A33 0%,#12345F 60%,#1B4FBE 130%)', color: '#fff', width: '100%' }}>
      <div aria-hidden style={{ position: 'absolute', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.35)},transparent 65%)`, filter: 'blur(40px)', animation: 'blobShift 20s ease-in-out infinite' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -260, left: -150, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.4)},transparent 65%)`, filter: 'blur(40px)', animation: 'blobShift 24s ease-in-out infinite reverse' }} />
      <div className="noise" />
      <NvContainer>
        <div className="nv-contact-grid" style={{ display: 'grid', gap: 64, alignItems: 'center', position: 'relative' }}>
          <div>
            <NvPill tone="invert" icon={<Icon.Spark />}>Contact NesVed</NvPill>
            <h2 style={{ margin: '18px 0 18px', fontSize: 'clamp(30px,4.5vw,56px)', lineHeight: 1.04, letterSpacing: '-.03em', fontWeight: 700, color: '#fff', maxWidth: 520 }}>
              Let's get your<br />business running<br />
              <span style={{ background: 'linear-gradient(100deg,#fff,#7DD7F3,#35BDE7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>smarter.</span>
            </h2>
            <p style={{ margin: '0 0 36px', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,.75)', maxWidth: 460 }}>
              Book a live demo of SmartBooker, request early access to upcoming products, or just say hi. We'd love to hear from you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 440 }}>
              {contacts.map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', textDecoration: 'none', color: '#fff', transition: 'all .15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.10)'; el.style.borderColor = 'rgba(255,255,255,.25)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.06)'; el.style.borderColor = 'rgba(255,255,255,.12)'; }}
                >
                  <span style={{ width: 38, height: 38, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: hexA(C.cyan,.15), color: '#7DD7F3', flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,.55)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>{c.label}</span>
                    <span style={{ display: 'block', fontSize: 15, fontWeight: 600, marginTop: 2 }}>{c.value}</span>
                  </span>
                  <Icon.Arrow />
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={onSubmit} style={{ position: 'relative', padding: 36, borderRadius: 24, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 40px 80px -30px rgba(0,0,0,.5)' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, color: '#fff' }}>Request a demo</h3>
            <p style={{ margin: '0 0 28px', fontSize: 13.5, color: 'rgba(255,255,255,.6)' }}>We'll get back to you within one business day.</p>
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
            <button type="submit" disabled={sent} style={{ marginTop: 24, width: '100%', height: 52, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', borderRadius: 12, cursor: sent ? 'default' : 'pointer', border: 'none', background: sent ? 'rgba(25,182,200,.9)' : '#fff', color: sent ? '#fff' : C.ink900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all .2s', boxShadow: '0 10px 30px -10px rgba(0,0,0,.4)' }}>
              {sent ? <><Icon.Check /> Thanks — we'll be in touch</> : <>Send enquiry <Icon.Arrow /></>}
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
    <footer style={{ padding: '40px 0 32px', background: '#070F1F', color: 'rgba(255,255,255,.6)', width: '100%' }}>
      <NvContainer>
        <div className="nv-footer-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ padding: 6, background: '#fff', borderRadius: 10, flexShrink: 0 }}>
              <img src="/images/nesved-short-logo.png" alt="NesVed" style={{ height: 24, width: 'auto', display: 'block' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>© {new Date().getFullYear()} NesVed. All rights reserved.</span>
          </div>
          <div className="nv-footer-links" style={{ display: 'flex', gap: 24, fontSize: 13 }}>
            {[
              { h: '#product', l: 'SmartBooker' }, { h: '#pricing', l: 'Pricing' },
              { h: '#faq', l: 'FAQ' }, { h: 'mailto:contact@nesved.com', l: 'contact@nesved.com' },
            ].map(lnk => (
              <a key={lnk.l} href={lnk.h} style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', transition: 'color .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.6)'; }}
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
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%' }}>
      <Header />
      <main>
        <Hero />
        <Product />
        <Screens />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
