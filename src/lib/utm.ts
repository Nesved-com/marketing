import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const STORAGE_KEY = 'nv_utm_params';

export function captureUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }

  if (Object.keys(found).length === 0) return;

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  logEvent(analytics, 'campaign_landing', found);
}

export function getStoredUtmParams(): Record<string, string> {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}
