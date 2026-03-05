import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ResultCard from './components/ResultCard';
import ProductHistory from './components/ProductHistory';
import { generateMetadata, saveProduct } from './services/api';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleGenerate = async (title, description) => {
    setIsLoading(true);
    setError('');
    setResult(null);
    setIsSaved(false);

    try {
      const res = await generateMetadata(title, description);
      if (res.data.success) {
        setResult(res.data.data);
      } else {
        setError(res.data.error || 'Generation failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setIsSaving(true);
    setError('');

    try {
      const res = await saveProduct(result);
      if (res.data.success) {
        setIsSaved(true);
        setRefreshTrigger((prev) => prev + 1);
      } else {
        setError(res.data.error || 'Save failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Network error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="app">
      {/* ── Background Orbs ──────────────────────────────── */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      {/* ── Header ───────────────────────────────────────── */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <h1 className="app-title">AI Auto-Category</h1>
              <p className="app-tagline">Smart product categorization powered by Gemini AI</p>
            </div>
          </div>
          <div className="header-badge">
            <span className="pulse-dot" />
            Gemini 2.0
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────── */}
      <main className="app-main">
        {/* Error Toast */}
        {error && (
          <div className="error-toast">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
            <button className="toast-close" onClick={() => setError('')}>×</button>
          </div>
        )}

        {/* Two-Column Grid */}
        <div className="content-grid">
          <div className="col-form">
            <ProductForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
          <div className="col-result">
            {result ? (
              <ResultCard
                data={result}
                onSave={handleSave}
                isSaving={isSaving}
                isSaved={isSaved}
              />
            ) : (
              <div className="result-placeholder">
                <div className="placeholder-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <h3>AI Results Will Appear Here</h3>
                <p>Enter a product title and description, then click Generate</p>
              </div>
            )}
          </div>
        </div>

        {/* ── History Section ──────────────────────────────── */}
        <section className="history-wrapper">
          <ProductHistory refreshTrigger={refreshTrigger} />
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="app-footer">
        <p>Built with React + Express + Gemini AI · MongoDB</p>
      </footer>
    </div>
  );
}

export default App;
