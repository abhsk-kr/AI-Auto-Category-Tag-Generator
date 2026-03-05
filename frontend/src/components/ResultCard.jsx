import './ResultCard.css';

const SUSTAINABILITY_ICONS = {
  'plastic-free': '♻️',
  'compostable': '🌱',
  'vegan': '🌿',
  'recycled': '🔄',
  'organic': '🌾',
  'cruelty-free': '🐰',
  'energy-efficient': '⚡',
};

const CATEGORY_COLORS = {
  'Electronics': '#6366f1',
  'Apparel': '#f43f5e',
  'Home & Kitchen': '#f59e0b',
  'Beauty & Personal Care': '#ec4899',
  'Grocery': '#10b981',
  'Toys': '#06b6d4',
};

const ResultCard = ({ data, onSave, isSaving, isSaved }) => {
  if (!data) return null;

  const catColor = CATEGORY_COLORS[data.primary_category] || '#6366f1';

  return (
    <div className="result-card" style={{ '--cat-color': catColor }}>
      <div className="result-header">
        <div className="result-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h2 className="result-title">AI Analysis Complete</h2>
          <p className="result-subtitle">{data.title}</p>
        </div>
      </div>

      {/* ── Categories ─────────────────────────────────────── */}
      <div className="result-section">
        <h3 className="section-label">Categories</h3>
        <div className="category-row">
          <span className="category-badge primary" style={{ background: catColor }}>
            {data.primary_category}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="category-badge sub">
            {data.sub_category}
          </span>
        </div>
      </div>

      {/* ── SEO Tags ───────────────────────────────────────── */}
      <div className="result-section">
        <h3 className="section-label">
          SEO Tags
          <span className="tag-count">{data.seo_tags.length}</span>
        </h3>
        <div className="tags-container">
          {data.seo_tags.map((tag, i) => (
            <span key={i} className="seo-tag" style={{ animationDelay: `${i * 60}ms` }}>
              # {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Sustainability ─────────────────────────────────── */}
      <div className="result-section">
        <h3 className="section-label">Sustainability</h3>
        {data.sustainability_filters.length > 0 ? (
          <div className="sustainability-container">
            {data.sustainability_filters.map((filter, i) => (
              <span key={i} className="sustainability-badge" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="sustainability-icon">{SUSTAINABILITY_ICONS[filter] || '🌍'}</span>
                {filter}
              </span>
            ))}
          </div>
        ) : (
          <p className="no-data">No sustainability filters applicable</p>
        )}
      </div>

      {/* ── Save Button ────────────────────────────────────── */}
      <button
        className={`save-btn ${isSaved ? 'saved' : ''}`}
        onClick={onSave}
        disabled={isSaving || isSaved}
      >
        {isSaved ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Saved to Database
          </>
        ) : isSaving ? (
          <>
            <span className="spinner" />
            Saving...
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save to Database
          </>
        )}
      </button>
    </div>
  );
};

export default ResultCard;
