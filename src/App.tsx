import React, { useState, useEffect, useRef } from 'react';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  // Light warm-white + gold theme. ink900/800/700/500 are dark-on-light text
  // tones (the whole site sits on a warm off-white canvas); `navyText` is
  // kept as the name for the one dark tone used on solid dark chrome (e.g.
  // dark buttons / dark section backgrounds) for compatibility with existing
  // call sites, even though the canvas itself is no longer navy.
  ink900: '#1A1206', ink800: '#241B0A', ink700: '#4A3A1C',
  ink500: '#6B5A3A', ink300: '#8C7A54', ink100: '#E7DCC0', ink50: '#F3ECDA',
  paper: '#FBF8F2', white: '#FFFFFF',
  navyText: '#1A1206',
  blue: '#1D4FCE', blueDark: '#1236A6', cyan: '#2563EB', teal: '#1D4FCE',
  // Role / accent colors
  venueBlue: '#1D4FCE', venueBlueDark: '#1236A6',
  decorPurple: '#6366F1', decorPurpleDark: '#4F46E5',
  caterGreen: '#059669', caterGreenDark: '#047857',
};

function hexA(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ─── Particle Field (fixed full-viewport animated star/particle network) ───
type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number; c: [number, number, number] };

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Brand blue/cyan family (site theme), no gold/indigo — indigo is reserved for Invobuk elsewhere.
    const palette: [number, number, number][] = [
      [29, 79, 206],   // C.blue #1D4FCE
      [37, 99, 235],   // C.cyan #2563EB
      [18, 54, 166],   // C.blueDark #1236A6
    ];

    const particles: Particle[] = Array.from({ length: 110 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      r: Math.random() * 1.4 + 0.4,
      a: Math.random() * 0.3 + 0.06,
      c: palette[Math.floor(Math.random() * palette.length)],
    }));

    let frameId: number;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < Math.min(i + 7, particles.length); j++) {
          const dx = (particles[i].x - particles[j].x) * W;
          const dy = (particles[i].y - particles[j].y) * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x * W, particles[i].y * H);
            ctx.lineTo(particles[j].x * W, particles[j].y * H);
            ctx.strokeStyle = `rgba(37,99,235,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
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
    ink:    { bg: 'rgba(29,79,206,.09)', bd: 'rgba(29,79,206,.28)', fg: C.blueDark },
    blue:   { bg: 'rgba(29,79,206,.10)', bd: 'rgba(29,79,206,.30)', fg: C.blueDark },
    cyan:   { bg: 'rgba(29,79,206,.12)', bd: 'rgba(29,79,206,.32)', fg: C.blueDark },
    invert: { bg: 'rgba(26,18,6,.06)',    bd: 'rgba(26,18,6,.16)',    fg: C.ink900 },
    purple: { bg: 'rgba(99,102,241,.10)', bd: 'rgba(99,102,241,.28)', fg: '#4F46E5' },
    green:  { bg: 'rgba(5,150,105,.10)',  bd: 'rgba(5,150,105,.28)',  fg: '#047857' },
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
    primary: { background: 'linear-gradient(135deg,#1D4FCE 0%,#2563EB 55%,#35BDE7 130%)', color: '#1A1206', boxShadow: '0 12px 32px -10px rgba(29,79,206,.45), 0 0 0 1px rgba(255,255,255,.25) inset, inset 0 1px 0 rgba(255,255,255,.35)' },
    dark:    { background: '#1A1206', color: '#F5EFE0', border: '1px solid rgba(37,99,235,.30)', boxShadow: '0 4px 14px -4px rgba(0,0,0,.3)' },
    light:   { background: '#fff', color: '#1A1206', borderColor: 'rgba(26,18,6,.14)', boxShadow: '0 2px 8px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06)' },
    ghost:   { background: 'transparent', color: C.ink800, borderColor: 'rgba(26,18,6,.20)' },
    invert:  { background: '#fff', color: '#1A1206', boxShadow: '0 4px 14px -4px rgba(0,0,0,.35)' },
    purple:  { background: 'linear-gradient(135deg,#4F46E5,#818CF8)', color: '#fff', boxShadow: '0 12px 32px -10px rgba(99,102,241,.45)' },
    green:   { background: 'linear-gradient(135deg,#059669,#34D399)', color: '#fff', boxShadow: '0 12px 32px -10px rgba(52,211,153,.45)' },
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

// Text/icon monogram used everywhere a product/brand logo image used to sit.
function Monogram({ letter, size = 36, radius, dark = false }: { letter: string; size?: number; radius?: number; dark?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      width: size, height: size, borderRadius: radius ?? Math.round(size * 0.28),
      background: 'linear-gradient(135deg,#1D4FCE 0%,#2563EB 55%,#35BDE7 130%)',
      color: '#1A1206', fontWeight: 800, fontSize: Math.round(size * 0.46),
      letterSpacing: '-.02em', fontFamily: "'Space Grotesk','Inter',sans-serif",
      boxShadow: dark ? '0 4px 14px -4px rgba(37,99,235,.35)' : '0 2px 8px -2px rgba(29,79,206,.35)',
    }}>{letter}</span>
  );
}

// ─── LAUNCHING SOON MODAL ─────────────────────────────────────────────────────
function LaunchingSoonModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(2,6,16,.75)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'fadeIn .2s ease' }}>
      <div onClick={e => e.stopPropagation()} className="glass-dark" style={{ background: 'linear-gradient(160deg,#0B1730 0%,#0A1526 100%)', borderRadius: 28, padding: '48px 40px 40px', maxWidth: 420, width: '100%', boxShadow: '0 60px 120px -30px rgba(0,0,0,.6)', position: 'relative', textAlign: 'center', animation: 'popIn .25s cubic-bezier(.34,1.56,.64,1)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.ink500 }}>
          <Icon.X width={18} height={18} />
        </button>
        <div style={{ margin: '0 auto 24px', display: 'flex', justifyContent: 'center' }}>
          <Monogram letter="Q" size={80} dark />
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 800, color: C.ink900, letterSpacing: '-.025em', marginBottom: 12 }}>Launching Soon!</h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: C.ink500, marginBottom: 28 }}>
          The Quickbuk mobile app is currently in development and will be available on both the <strong style={{ color: C.ink900 }}>Google Play Store</strong> and <strong style={{ color: C.ink900 }}>Apple App Store</strong> soon.
        </p>
        <div style={{ background: 'linear-gradient(135deg, rgba(37,99,235,.10), rgba(53,189,231,.06))', borderRadius: 16, padding: '16px 20px', marginBottom: 28, border: '1px solid rgba(37,99,235,.20)' }}>
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

// ─── DESKTOP DOWNLOAD BADGES (Invobuk) ────────────────────────────────────────
const INVOBUK_RELEASES = 'https://github.com/Nesved-com/invobuk/releases/latest/download';
function DesktopDownloadBadges() {
  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '10px 18px', borderRadius: 12, cursor: 'pointer',
    background: '#0A0F1E', color: '#fff', border: '1px solid rgba(255,255,255,.12)',
    boxShadow: '0 4px 16px -4px rgba(10,15,30,.3)',
    transition: 'transform .18s ease, box-shadow .18s ease',
    textDecoration: 'none', fontFamily: 'inherit',
  };
  const hover = {
    onMouseEnter: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; },
    onMouseLeave: (e: React.MouseEvent) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; },
  };
  const platforms = [
    {
      name: 'Windows', sub: '.exe installer', href: `${INVOBUK_RELEASES}/Invobuk-Setup.exe`, live: true,
      glyph: <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M3 5.5 11 4.4v7.1H3V5.5Zm8.99-1.27L21 3v8.5h-9.01V4.23ZM3 12.5h8v7.1l-8-1.1v-6ZM11.99 12.5H21V21l-9.01-1.27V12.5Z"/></svg>,
    },
    {
      name: 'macOS', sub: 'Coming soon', href: '#', live: false,
      glyph: <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M16.5 3c.1 1.1-.3 2.2-1 3-.7.8-1.9 1.5-3 1.4-.1-1.1.4-2.2 1-3 .7-.8 1.9-1.4 3-1.4Zm3.4 14.7c-.6 1.3-.9 1.9-1.7 3-1.1 1.6-2.7 3.6-4.6 3.6-1.7 0-2.1-1.1-4.4-1.1-2.3 0-2.8 1.1-4.5 1.1-1.9 0-3.4-1.8-4.5-3.4C-1.4 17.5-.8 11.4 2.8 9c1-.6 2.1-1 3.2-1 1.4 0 2.7.9 3.6.9.8 0 2.4-1.1 4-.9.9.1 2.6.5 3.7 2.2-.1.1-2.2 1.3-2.2 3.9 0 3 2.6 4 2.8 4.1-.1.2-.4.9-1 1.5Z"/></svg>,
    },
    {
      name: 'Linux', sub: '.AppImage / .deb', href: `${INVOBUK_RELEASES}/Invobuk.AppImage`, live: true,
      glyph: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="4.5"/><path d="M8.5 13.5c-1 1.5-2 4-1 6.5 1.5 1 5 1.5 9 0 1-2.5 0-5-1-6.5"/><path d="M9.5 8h0M14.5 8h0"/></svg>,
    },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
      {platforms.map(p => (
        <a key={p.name} href={p.live ? p.href : undefined} {...(p.live ? hover : {})}
          style={{ ...badgeStyle, opacity: p.live ? 1 : 0.5, cursor: p.live ? 'pointer' : 'default', pointerEvents: p.live ? 'auto' : 'none' }}
        >
          {p.glyph}
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 9, fontWeight: 500, opacity: .7, textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.2 }}>{p.sub}</div>
            <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>{p.name}</div>
          </div>
        </a>
      ))}
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
    { h: '#product', l: 'Quickbuk' },
    { h: '#invobuk', l: 'Invobuk' },
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
        background: scrolled ? 'rgba(255,255,255,.90)' : 'rgba(255,255,255,.60)',
        borderBottom: scrolled ? '1px solid rgba(29,79,206,.18)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px -4px rgba(26,18,6,.10)' : 'none',
        transition: 'all .25s ease',
      }}>
        <NvContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: headerPadding, paddingBottom: headerPadding }}>
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
              <img src="/images/nesved-full-logo.png" alt="NesVed" style={{ height: isMobile ? 36 : 44, width: isMobile ? 130 : 160, objectFit: 'contain' }} />
            </a>

            <nav className="nv-desktop-nav" style={{ alignItems: 'center', gap: 4 }}>
              {links.map(l => (
                <a key={l.h} href={l.h} style={{ padding: '8px 16px', fontSize: 14, fontWeight: 500, color: C.ink800, textDecoration: 'none', borderRadius: 8, transition: 'background .15s, color .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,.08)'; (e.currentTarget as HTMLElement).style.color = C.blue; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink800; }}
                >{l.l}</a>
              ))}
            </nav>

            <div className="nv-desktop-nav" style={{ alignItems: 'center', gap: 10 }}>
              <a href="#contact" style={{ fontSize: 14, fontWeight: 600, color: C.ink800, textDecoration: 'none', marginRight: 4 }}>Log in</a>
              <NvBtn variant="primary" size="sm" as="a" href="#contact">
                Start Free Trial <Icon.Arrow width={14} height={14} />
              </NvBtn>
            </div>

            <button
              className="nv-mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              style={{ background: 'none', border: '1px solid rgba(37,99,235,.20)', borderRadius: 10, padding: '8px', cursor: 'pointer', color: C.ink800, alignItems: 'center', justifyContent: 'center' }}
              aria-label="Open menu"
            >
              <Icon.Menu />
            </button>
          </div>
        </NvContainer>
      </header>

      {mobileOpen && (
        <div className="nv-mobile-drawer" style={{ background: 'rgba(26,18,6,.45)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '80%', maxWidth: 320,
            background: 'rgba(255,255,255,.98)', borderRadius: 0, boxShadow: '-20px 0 60px rgba(26,18,6,.18)',
            display: 'flex', flexDirection: 'column', padding: '0 0 32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(29,79,206,.18)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/images/nesved-full-logo.png" alt="NesVed" style={{ height: 40, width: 130, objectFit: 'contain' }} />
              </div>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: C.ink500 }} aria-label="Close menu">
                <Icon.X />
              </button>
            </div>
            <nav style={{ flex: 1, padding: '16px 16px' }}>
              {links.map(l => (
                <a key={l.h} href={l.h} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 16px', fontSize: 16, fontWeight: 600, color: C.ink800, textDecoration: 'none', borderRadius: 12, marginBottom: 4, transition: 'background .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,.08)'; }}
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
function Hero() {
  const stats = [
    { v: '2', l: 'Products' },
    { v: 'iOS & Android', l: 'Quickbuk App' },
    { v: 'Windows & Linux', l: 'Invobuk App' },
    { v: '1-Day', l: 'Support Response' },
  ];
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', paddingTop: 64, paddingBottom: 96, width: '100%', background: 'linear-gradient(160deg, #FFFFFF 0%, #FBF8F2 55%, #F7F2E8 100%)' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div className="mesh-bg" style={{ position: 'absolute', inset: 0, opacity: 1 }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: .5, maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)' } as React.CSSProperties} />
        <div style={{ position: 'absolute', top: -240, right: -80, width: 780, height: 780, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.cyan,.22)} 0%,${hexA(C.cyan,0)} 60%)`, filter: 'blur(40px)', animation: 'blobShift 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: -260, left: -140, width: 680, height: 680, borderRadius: '50%', background: `radial-gradient(circle,${hexA(C.blue,.18)} 0%,${hexA(C.blue,0)} 60%)`, filter: 'blur(40px)', animation: 'blobShift 22s ease-in-out infinite reverse' }} />
      </div>

      <NvContainer>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 56 }}>
            <NvPill tone="ink" icon={<span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 99, background: C.blue, animation: 'pulseDot 1.8s ease-in-out infinite' }} />}>Trusted by 1,000+ Businesses Across India</NvPill>

            <h1 style={{ margin: '20px 0 0', fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink900, maxWidth: 840, fontFamily: "'Space Grotesk','Inter',sans-serif" }}>
              One Platform.<br />
              <span className="grad-text-tri">Two Products.</span><br />
              Endless Growth.
            </h1>

            <p style={{ marginTop: 24, maxWidth: 640, fontSize: 17.5, lineHeight: 1.7, color: C.ink500, fontWeight: 400 }}>
              <strong style={{ color: C.ink900, fontWeight: 700 }}>Quickbuk</strong> gives Venue Owners, Banquet Halls, Decorators &amp; Caterers a complete booking, staff and payments platform. <strong style={{ color: C.ink900, fontWeight: 700 }}>Invobuk</strong> gives retail businesses GST-compliant billing and inventory, fully offline. Both powered by NesVed.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 36 }}>
              <NvBtn variant="primary" size="lg" as="a" href="#contact"><Icon.Mail /> Start Free Trial</NvBtn>
              <NvBtn variant="ghost" size="lg" as="a" href="#product" style={{ borderColor: 'rgba(26,18,6,.20)', color: C.ink900, background: 'rgba(255,255,255,.5)' }}>Explore Products</NvBtn>
            </div>
          </div>

          <div className="glass-card nv-hero-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, padding: '32px 8px', borderRadius: 24 }}>
            {stats.map((s, i) => (
              <div key={s.l} style={{ textAlign: 'center', padding: '0 12px', borderLeft: i > 0 ? '1px solid rgba(26,18,6,.10)' : 'none' }}>
                <div className="grad-text" style={{ fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: C.ink500, textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </NvContainer>
      <style>{`
        @media (max-width: 640px) {
          .nv-hero-stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 20px !important; }
          .nv-hero-stats-grid > div:nth-child(3) { border-left: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─── PRODUCTS (tabbed Quickbuk / Invobuk) ─────────────────────────────────────
// Invobuk uses an indigo accent — gold is the primary site-wide brand color,
// so a second gold/green product accent would clash with it.
const INVOBUK_GREEN = '#6366F1';
const INVOBUK_GREEN_DARK = '#312E81';
const INVOBUK_AMBER = '#818CF8';

type ProductKey = 'quickbuk' | 'invobuk';

const PRODUCT_DATA: Record<ProductKey, {
  monogram: string; name: string; tagline: string; headline: React.ReactNode; desc: string;
  chips: string[]; ctaLabel: string; ctaHref: string; secondaryLabel: string;
  stats: { k: string; v: string }[]; accent: string; accentDark: string;
  kpis: { label: string; value: string }[]; rows: { label: string; sub: string; amount: string }[];
}> = {
  quickbuk: {
    monogram: 'Q', name: 'Quickbuk', tagline: 'Live now',
    headline: <>All-in-one platform for<br /><span className="grad-text">venues, decorators &amp; caterers.</span></>,
    desc: 'Purpose-built for the event industry. Venue owners get full booking & revenue control. Decorators manage their packages. Caterers track their orders. All connected.',
    chips: ['Venue Booking', 'Calendar View', 'Staff Login', 'UPI QR Payments', 'PDF & CSV Exports', 'Revenue & Profit Reports', 'Multi-Venue Support', 'Decorator Portal', 'Caterer Portal'],
    ctaLabel: 'Start free', ctaHref: 'https://quickbuk-web-view.vercel.app/', secondaryLabel: 'Book a demo',
    stats: [
      { k: 'Platform', v: 'iOS & Android' },
      { k: 'Venue types', v: 'Halls · Lawns · Hotels' },
      { k: 'Architecture', v: 'Multi-tenant' },
      { k: 'Data exports', v: 'PDF & CSV' },
      { k: 'Roles', v: 'Venue · Decor · Catering' },
      { k: 'Support', v: '1-day response' },
    ],
    accent: '#2563EB', accentDark: '#1236A6',
    kpis: [{ label: 'Revenue this month', value: '₹2,00,000' }, { label: 'Bookings today', value: '1' }, { label: 'Collection rate', value: '92%' }],
    rows: [
      { label: 'Sharma Wedding', sub: 'Grand Lawn · 250 guests', amount: '₹85,000' },
      { label: 'Rao Reception', sub: 'Banquet Hall B · 120 guests', amount: '₹42,500' },
      { label: 'Iyer Anniversary', sub: 'Rooftop Venue · 80 guests', amount: '₹28,000' },
    ],
  },
  invobuk: {
    monogram: 'I', name: 'Invobuk', tagline: 'Live now',
    headline: <>Desktop billing,<br /><span style={{ background: `linear-gradient(100deg, ${INVOBUK_GREEN_DARK} 0%, ${INVOBUK_GREEN} 55%, ${INVOBUK_AMBER} 130%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>built for your business.</span></>,
    desc: 'Invoicing, quotations, purchase orders and delivery challans — a complete GST billing workflow that runs entirely on your computer, with your data stored locally and privately.',
    chips: ['GST Invoices', 'Quotations', 'Purchase Orders', 'Delivery Challans', 'Customer & Product CRM', 'CSV Import', 'Offline-First', 'License Protected'],
    ctaLabel: 'Get a license', ctaHref: '#contact', secondaryLabel: 'Book a demo',
    stats: [
      { k: 'Platform', v: 'Windows & Linux' },
      { k: 'Data storage', v: 'Local & offline' },
      { k: 'Licensing', v: 'One-time, per year' },
      { k: 'Documents', v: 'Invoice · PO · Challan' },
      { k: 'Backup', v: 'Optional Google Drive' },
      { k: 'Support', v: '1-day response' },
    ],
    accent: INVOBUK_AMBER, accentDark: INVOBUK_GREEN_DARK,
    kpis: [{ label: 'Sales this month', value: '₹4,80,000' }, { label: 'Invoices raised', value: '37' }, { label: 'Open purchase orders', value: '4' }],
    rows: [
      { label: 'INV-2044 · Patel Traders', sub: 'GST invoice · Paid', amount: '₹18,200' },
      { label: 'PO-0091 · Raw Materials', sub: 'Purchase order · Pending', amount: '₹64,500' },
      { label: 'CHL-0132 · Delivery', sub: 'Challan · Dispatched', amount: '₹9,750' },
    ],
  },
};

function DashboardMock({ product }: { product: typeof PRODUCT_DATA[ProductKey] }) {
  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 70px -20px rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.12)', background: '#fff' }}>
      {/* Browser-window chrome */}
      <div style={{ height: 34, background: '#F3ECDA', display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', flexShrink: 0, borderBottom: '1px solid rgba(26,18,6,.08)' }}>
        <span style={{ width: 10, height: 10, borderRadius: 99, background: '#ff5f57' }} />
        <span style={{ width: 10, height: 10, borderRadius: 99, background: '#febc2e' }} />
        <span style={{ width: 10, height: 10, borderRadius: 99, background: '#28c840' }} />
        <span style={{ marginLeft: 12, fontSize: 11.5, color: '#8C7A54', fontWeight: 600 }}>{product.name.toLowerCase()}.app/dashboard</span>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {product.kpis.map(k => (
            <div key={k.label} style={{ borderRadius: 12, padding: '14px 14px', background: '#FBF8F2', border: '1px solid rgba(26,18,6,.08)' }}>
              <div style={{ fontSize: 10.5, color: '#8C7A54', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700, marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1206', letterSpacing: '-.02em' }}>{k.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 20, borderRadius: 5, background: product.accent, opacity: .8 }} />
          <div style={{ height: 20, flex: 1, borderRadius: 5, background: 'linear-gradient(90deg, rgba(37,99,235,.35), rgba(37,99,235,.08))' }} />
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#8C7A54', textTransform: 'uppercase', letterSpacing: '.06em', margin: '18px 0 10px' }}>Recent activity</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {product.rows.map(r => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: '#FBF8F2', border: '1px solid rgba(26,18,6,.06)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1206' }}>{r.label}</div>
                <div style={{ fontSize: 11.5, color: '#8C7A54', marginTop: 2 }}>{r.sub}</div>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: product.accentDark }}>{r.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<ProductKey>('quickbuk');
  const p = PRODUCT_DATA[tab];
  const isQuickbuk = tab === 'quickbuk';

  return (
    <section id="product" style={{ position: 'relative', padding: '120px 0', background: C.paper, width: '100%' }}>
      <span id="invobuk" style={{ position: 'relative', top: -80, display: 'block' }} aria-hidden />
      <NvContainer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 48 }}>
          <NvPill tone="cyan">Products — Live now</NvPill>
          <h2 style={{ margin: '20px 0 16px', fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 800, color: C.ink900, maxWidth: 780 }}>
            One account,<br /><span className="grad-text">two ways to grow.</span>
          </h2>
          <p style={{ maxWidth: 640, color: C.ink500, fontSize: 17.5, lineHeight: 1.7, margin: '0 0 32px' }}>
            Explore Quickbuk for event bookings, or Invobuk for GST billing & inventory.
          </p>

          <div className="glass-card" style={{ display: 'inline-flex', padding: 6, borderRadius: 999, gap: 4 }}>
            {(['quickbuk', 'invobuk'] as ProductKey[]).map(key => {
              const active = tab === key;
              const d = PRODUCT_DATA[key];
              return (
                <button key={key} onClick={() => setTab(key)} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, letterSpacing: '-.01em',
                  background: active ? (key === 'quickbuk' ? 'linear-gradient(135deg,#1D4FCE 0%,#2563EB 55%,#35BDE7 130%)' : `linear-gradient(135deg,${INVOBUK_GREEN_DARK},${INVOBUK_GREEN})`) : 'transparent',
                  color: active ? (key === 'quickbuk' ? '#1A1206' : '#fff') : C.ink500,
                  transition: 'all .2s ease',
                }}>
                  <Monogram letter={d.monogram} size={20} />
                  {d.name}
                </button>
              );
            })}
          </div>
        </div>
      </NvContainer>

      {/* Full-bleed showcase */}
      <div style={{ width: '100%', background: isQuickbuk ? 'linear-gradient(135deg, #050B18 0%, #0B1730 45%, #1A1206 130%)' : `linear-gradient(135deg, #050B18 0%, ${INVOBUK_GREEN_DARK} 45%, ${INVOBUK_GREEN} 100%)`, position: 'relative', overflow: 'hidden', transition: 'background .3s ease' }}>
        <div aria-hidden style={{ position: 'absolute', top: -160, right: -100, width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle,${hexA(p.accent,.30)} 0%,transparent 55%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="noise" style={{ position: 'absolute', inset: 0, opacity: .4, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 48px', position: 'relative' }}>
          <div className="nv-products-showcase-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div style={{ color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Monogram letter={p.monogram} size={44} dark />
                <div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1.1 }}>{p.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.50)', letterSpacing: '.03em' }}>by NesVed</div>
                </div>
                <span style={{ marginLeft: 8, padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', background: hexA(p.accent, .18), border: `1px solid ${hexA(p.accent, .35)}`, color: '#fff' }}>{p.tagline}</span>
              </div>

              <h3 style={{ fontSize: 'clamp(28px,3.2vw,46px)', fontWeight: 800, letterSpacing: '-.04em', margin: '0 0 20px', lineHeight: 1.1 }}>{p.headline}</h3>

              <p style={{ margin: '0 0 28px', color: 'rgba(255,255,255,.72)', fontSize: 16, lineHeight: 1.75, maxWidth: 500 }}>{p.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {p.chips.map(c => (
                  <span key={c} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 500, background: 'rgba(255,255,255,.10)', color: 'rgba(255,255,255,.88)', border: '1px solid rgba(255,255,255,.18)' }}>{c}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                <NvBtn variant="invert" size="md" as="a" href={p.ctaHref}>{p.ctaLabel} <Icon.Arrow /></NvBtn>
                <NvBtn variant="ghost" size="md" as="a" href="#contact" style={{ borderColor: 'rgba(255,255,255,.28)', color: '#fff', background: 'rgba(255,255,255,.05)' }}>{p.secondaryLabel}</NvBtn>
              </div>

              {isQuickbuk ? (
                <div style={{ marginBottom: 20 }}>
                  <AppStoreBadges onOpen={() => setShowModal(true)} />
                </div>
              ) : (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.55)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>Download for desktop</div>
                  <DesktopDownloadBadges />
                  <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,.4)', marginTop: 10 }}>macOS build is in progress — Windows &amp; Linux are ready today.</p>
                </div>
              )}
              {showModal && <LaunchingSoonModal onClose={() => setShowModal(false)} />}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 28 }}>
                {p.stats.map((s, i) => (
                  <div key={s.k} style={{ paddingTop: 16, paddingBottom: 16, paddingRight: 16, borderBottom: i < 3 ? '1px solid rgba(255,255,255,.08)' : 'none', borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,.08)' : 'none', paddingLeft: i % 3 !== 0 ? 20 : 0 }}>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.09em', fontWeight: 700 }}>{s.k}</div>
                    <div style={{ fontSize: 14, color: '#fff', marginTop: 5, fontWeight: 600 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <DashboardMock product={p} />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .nv-products-showcase-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── FEATURES ──────────────────────────────────────────────────────────────────
function FeatureGrid({ title, badge, features }: { title: React.ReactNode; badge: string; features: { icon: React.ReactNode; title: string; text: string; color: string; glow: string }[] }) {
  return (
    <div style={{ marginBottom: 72 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <NvPill tone="ink">{badge}</NvPill>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: C.ink900, letterSpacing: '-.02em', margin: 0 }}>{title}</h3>
      </div>
      <div className="nv-feature-grid" style={{ display: 'grid', gap: 20 }}>
        {features.map(f => (
          <div key={f.title} className="glass-card" style={{ padding: 28, cursor: 'default', borderTop: `3px solid ${f.color}` }}>
            <div className="neu-icon" style={{ width: 48, height: 48, color: f.color, flexShrink: 0, boxShadow: `6px 6px 14px ${f.glow}, -6px -6px 14px rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.6)` }}>{f.icon}</div>
            <h4 style={{ margin: '18px 0 8px', fontSize: 16, fontWeight: 700, color: C.ink900, letterSpacing: '-.02em' }}>{f.title}</h4>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: C.ink500 }}>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const quickbukFeatures = [
    { icon: <Icon.Cal />,     title: 'Smart Booking Calendar',     text: 'Visualise availability across all your venues. No double-bookings, no missed slots — ever.', color: C.blueDark, glow: hexA(C.blue,.16) },
    { icon: <Icon.Card />,    title: 'Payments, Dues & UPI QR',     text: 'Record advances, collect balances via UPI QR, issue refunds and export clean tax-ready CSV/PDF sheets.', color: C.blueDark, glow: hexA(C.cyan,.18) },
    { icon: <Icon.Building />,title: 'Multi-Venue Management',     text: 'Run multiple halls, lawns or properties from one account — each with its own calendar and bookings.', color: C.blueDark, glow: hexA(C.blue,.16) },
    { icon: <Icon.Users />,   title: 'Staff & Role Management',    text: 'Add staff members, assign roles, and control who can see bookings, payments, or reports — fully login-protected.', color: C.decorPurpleDark, glow: hexA(C.decorPurple,.18) },
    { icon: <Icon.Chart />,   title: 'Revenue & Profit Reports',   text: 'Collection rate, gross & cash profit, refunds, and 30-day or weekly trends — built for real accounting.', color: C.caterGreenDark, glow: hexA(C.caterGreen,.18) },
    { icon: <Icon.Mail />,    title: 'Enquiries & Lead Inbox',     text: 'Every customer enquiry lands in one inbox with read/unread tracking — never miss a lead again.', color: C.decorPurpleDark, glow: hexA(C.decorPurple,.18) },
    { icon: <Icon.Sparkles />,title: 'Vendor Sponsored Listings',  text: 'Decorators & caterers can boost visibility with paid placements and track impressions, clicks & profile views.', color: C.decorPurpleDark, glow: hexA(C.decorPurple,.20) },
    { icon: <Icon.Shield />,  title: 'Services & Customisation',   text: 'Add decoration, catering, and other services to any booking. Customise packages and pricing per venue.', color: C.caterGreenDark, glow: hexA(C.caterGreen,.18) },
  ];
  const invobukFeatures = [
    { icon: <Icon.Card />,     title: 'GST Invoicing & Quotations',  text: 'Create GST-compliant invoices, quotations, purchase orders and delivery challans in seconds.', color: INVOBUK_GREEN_DARK, glow: hexA(INVOBUK_GREEN, .16) },
    { icon: <Icon.Building />, title: 'Customers & Products',        text: 'Manage your full customer and product catalog, with bulk CSV import for fast onboarding.', color: INVOBUK_GREEN_DARK, glow: hexA(INVOBUK_GREEN, .16) },
    { icon: <Icon.Lock />,     title: 'Fully Offline & Private',     text: 'All your data stays on your own computer in a local database — no internet connection required to work.', color: INVOBUK_GREEN_DARK, glow: hexA(INVOBUK_AMBER, .18) },
    { icon: <Icon.Chart />,    title: 'Dashboard & Reports',         text: 'Track total sales, invoices, customers and purchase orders with a live sales overview chart.', color: INVOBUK_GREEN_DARK, glow: hexA(INVOBUK_GREEN, .16) },
    { icon: <Icon.Shield />,   title: 'One-Time License, No Subscription', text: 'A single license key activates the app on one computer — no recurring fees, no surprises.', color: INVOBUK_GREEN_DARK, glow: hexA(INVOBUK_AMBER, .18) },
    { icon: <Icon.Globe />,    title: 'Optional Google Drive Backup', text: 'Connect your Google Drive to back up and restore your data whenever you want — entirely opt-in.', color: INVOBUK_GREEN_DARK, glow: hexA(INVOBUK_GREEN, .16) },
  ];

  return (
    <section id="features" style={{ position: 'relative', padding: '120px 0 48px', background: C.paper, width: '100%' }}>
      <NvContainer>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 64 }}>
          <NvPill tone="cyan">Features</NvPill>
          <h2 style={{ margin: '20px 0 16px', fontSize: 'clamp(32px,4.5vw,60px)', lineHeight: 1.04, letterSpacing: '-.04em', fontWeight: 800, color: C.ink900, maxWidth: 780 }}>
            Everything both<br /><span className="grad-text">products bring to your business.</span>
          </h2>
        </div>
        <FeatureGrid title="Quickbuk Features" badge="Event bookings" features={quickbukFeatures} />
        <FeatureGrid title="Invobuk Features" badge="GST billing" features={invobukFeatures} />
      </NvContainer>
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
      iconGrad: 'linear-gradient(135deg,#4F46E5,#818CF8)',
      accentColor: '#818CF8',
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
      iconGrad: 'linear-gradient(135deg,#059669,#34D399)',
      accentColor: '#34D399',
      accentBg: 'rgba(16,185,129,.08)',
      points: ['Dedicated caterer login', 'View catering orders per booking', 'Set menu & per-head pricing', 'Confirm / decline orders', 'Direct venue communication', 'Revenue & order tracking'],
      featured: false,
    },
  ];

  const invobukPlan = {
    name: 'Invobuk Desktop License',
    price: '₹4,999',
    cadence: '/ year',
    desc: 'For businesses that need GST billing, invoicing & purchase orders on their own computer.',
    icon: <Icon.Lock />,
    iconGrad: `linear-gradient(135deg,${INVOBUK_GREEN_DARK},${INVOBUK_GREEN})`,
    points: ['GST invoices, quotations, purchase orders & delivery challans', 'Customer & product CRM with CSV import', 'Fully offline — your data stays on your computer', 'Windows & Linux desktop app (macOS coming soon)', 'Free updates for the license term', 'Optional Google Drive backup'],
  };

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
            Two products, two simple pricing models — pick the one that fits your business.
          </p>
        </div>

        {/* ── Quickbuk pricing ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <Monogram letter="Q" size={28} />
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.ink900, letterSpacing: '-.02em', margin: 0 }}>Quickbuk — choose your role</h3>
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
                    {p.featured && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999, background: 'linear-gradient(135deg,rgba(53,189,231,.30),rgba(53,189,231,.18))', color: '#35BDE7', border: `1px solid ${hexA(C.cyan,.40)}` }}>Most popular</span>}
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
                      <span style={{ marginTop: 2, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 99, background: p.featured ? hexA(C.cyan,.22) : hexA(C.teal,.13), color: p.featured ? '#35BDE7' : '#8A6A2F' }}>
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

        <div style={{ marginTop: 32, padding: '18px 28px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(37,99,235,.10), rgba(53,189,231,.08))', border: '1px solid rgba(37,99,235,.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', textAlign: 'center' }}>
          <span style={{ fontSize: 18 }}>🎉</span>
          <p style={{ margin: 0, fontSize: 14.5, color: C.ink800, fontWeight: 600 }}>
            Early access members get <span style={{ color: C.blue }}>1 month free</span> on any Quickbuk plan.{' '}
            <a href="#contact" style={{ color: C.blue, fontWeight: 700, textDecoration: 'none' }}>Claim your spot →</a>
          </p>
        </div>
        <p style={{ marginTop: 16, marginBottom: 72, textAlign: 'center', fontSize: 13.5, color: C.ink500 }}>All Quickbuk plans billed annually. Includes unlimited bookings and free updates.</p>

        {/* ── Invobuk pricing ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <Monogram letter="I" size={28} />
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.ink900, letterSpacing: '-.02em', margin: 0 }}>Invobuk — one simple plan</h3>
        </div>

        <div style={{ maxWidth: 460 }}>
          <div className="glass-dark" style={{ position: 'relative', borderRadius: 24, padding: 36, background: `linear-gradient(160deg,#050B18 0%,${INVOBUK_GREEN_DARK} 55%,${INVOBUK_GREEN} 130%)`, color: '#fff', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle,${hexA(INVOBUK_AMBER,.40)},transparent 65%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: invobukPlan.iconGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{invobukPlan.icon}</div>
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999, background: 'rgba(129,140,248,.18)', color: '#C7D2FE', border: `1px solid ${hexA(INVOBUK_AMBER,.35)}` }}>One-time, per year</span>
              </div>

              <h3 style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 800, letterSpacing: '-.025em' }}>{invobukPlan.name}</h3>
              <p style={{ margin: '0 0 24px', fontSize: 13.5, color: 'rgba(255,255,255,.68)', lineHeight: 1.6 }}>{invobukPlan.desc}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 28 }}>
                <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: '-.04em' }}>{invobukPlan.price}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,.50)' }}>{invobukPlan.cadence}</span>
              </div>

              <NvBtn variant="invert" size="md" as="a" href="#contact" style={{ width: '100%', color: INVOBUK_GREEN_DARK }}>Get a license <Icon.Arrow /></NvBtn>

              <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {invobukPlan.points.map(pt => (
                  <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, color: 'rgba(255,255,255,.85)' }}>
                    <span style={{ marginTop: 2, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 99, background: hexA(INVOBUK_AMBER,.22), color: '#C7D2FE' }}>
                      <Icon.Check width={11} height={11} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p style={{ marginTop: 16, textAlign: 'center', fontSize: 13.5, color: C.ink500 }}>One license activates the app on one computer. No subscriptions, no per-user fees.</p>
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
    <section id="faq" style={{ padding: '120px 0', background: C.white, position: 'relative', width: '100%' }}>
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
                    <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 99, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? `linear-gradient(135deg,${it.color},${hexA(it.color,.7)})` : 'rgba(255,255,255,.08)', color: isOpen ? '#fff' : C.ink800, transition: 'all .22s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
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
    <section id="contact" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden', background: 'linear-gradient(150deg,#050B18 0%,#0A1526 40%,#0B1730 70%,#1A1206 100%)', color: '#fff', width: '100%' }}>
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
              <span style={{ background: 'linear-gradient(100deg,#fff 0%,#35BDE7 40%,#2563EB 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>smarter.</span>
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
                <option value="" style={{ background: '#0B1730' }}>Select your role</option>
                <option value="Venue Owner" style={{ background: '#0B1730' }}>Venue Owner</option>
                <option value="Decorator" style={{ background: '#0B1730' }}>Decorator</option>
                <option value="Caterer" style={{ background: '#0B1730' }}>Caterer</option>
                <option value="Other" style={{ background: '#0B1730' }}>Other</option>
              </select>
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={lbl}>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your venue, decoration, or catering business" style={ta} />
            </div>

            <button type="submit" disabled={status === 'sending' || status === 'sent'} style={{ marginTop: 24, width: '100%', height: 52, fontSize: 15, fontWeight: 600, fontFamily: 'inherit', borderRadius: 12, cursor: (status === 'sending' || status === 'sent') ? 'default' : 'pointer', border: 'none', background: status === 'sent' ? 'rgba(37,99,235,.95)' : status === 'error' ? 'rgba(220,60,60,.85)' : '#fff', color: status === 'idle' ? C.navyText : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all .2s', boxShadow: '0 10px 30px -10px rgba(0,0,0,.4)' }}>
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
    <footer style={{ position: 'relative', zIndex: 1, padding: '48px 0 36px', background: '#040A12', borderTop: '3px solid transparent', borderImage: 'linear-gradient(90deg,#1D4FCE,#2563EB,#35BDE7) 1', color: 'rgba(255,255,255,.55)', width: '100%' }}>
      <NvContainer>
        <div className="nv-footer-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Monogram letter="Q" size={36} dark />
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,.85)' }}>Quickbuk</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', fontWeight: 500 }}>by NesVed · © {new Date().getFullYear()}</div>
              </div>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,.12)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Monogram letter="I" size={36} dark />
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,.85)' }}>Invobuk</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', fontWeight: 500 }}>by NesVed · © {new Date().getFullYear()}</div>
              </div>
            </div>
          </div>
          <div className="nv-footer-links" style={{ display: 'flex', gap: 28, fontSize: 13.5 }}>
            {[
              { h: '#product', l: 'Quickbuk' },
              { h: '#invobuk', l: 'Invobuk' },
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
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.08)', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,.35)' }}>
            © {new Date().getFullYear()} NesVed. All rights reserved. Quickbuk and Invobuk are products of NesVed.
          </p>
        </div>
      </NvContainer>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', width: '100%', fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <ParticleField />
      <Header />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Products />
        <Features />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
