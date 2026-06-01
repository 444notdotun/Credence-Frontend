import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ToastProvider from './components/ToastProvider'
import { SettingsProvider } from './context/SettingsContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Bond from './pages/Bond'
import TrustScore from './pages/TrustScore'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="bond" element={<Bond />} />
              <Route path="trust" element={<TrustScore />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </ToastProvider>
      </SettingsProvider>
    </BrowserRouter>
  )
}

export default App
