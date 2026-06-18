import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import PrivacyPage from './PrivacyPage.tsx'
import TermsPage from './TermsPage.tsx'
import DeleteAccountPage from './DeleteAccountPage.tsx'
import './lib/firebase.ts'
import { captureUtmParams } from './lib/utm.ts'
import './index.css'

captureUtmParams()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
