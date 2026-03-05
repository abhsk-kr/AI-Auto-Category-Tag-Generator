import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import './ProductHistory.css';

const CATEGORY_COLORS = {
  'Electronics': '#6366f1',
  'Apparel': '#f43f5e',
  'Home & Kitchen': '#f59e0b',
  'Beauty & Personal Care': '#ec4899',
  'Grocery': '#10b981',
  'Toys': '#06b6d4',
};

const ProductHistory = ({ refreshTrigger }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data.data || []);
    } catch {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading) {
    return (
      <div className="history-section">
        <div className="history-header">
          <h2 className="history-title">Saved Products</h2>
        </div>
        <div className="history-loading">
          <span className="spinner-lg" />
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-section">
      <div className="history-header">
        <h2 className="history-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
          Saved Products
        </h2>
        <span className="product-count">{products.length}</span>
      </div>

      {products.length === 0 ? (
        <div className="history-empty">
          <div className="empty-icon">📦</div>
          <p>No products saved yet</p>
          <span>Generated products will appear here after saving</span>
        </div>
      ) : (
        <div className="history-list">
          {products.map((product, i) => (
            <div
              key={product._id}
              className={`history-item ${expanded === product._id ? 'expanded' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => toggleExpand(product._id)}
            >
              <div className="history-item-main">
                <div className="history-item-info">
                  <h4 className="history-item-title">{product.title}</h4>
                  <div className="history-item-meta">
                    <span
                      className="mini-badge"
                      style={{ background: CATEGORY_COLORS[product.primary_category] || '#6366f1' }}
                    >
                      {product.primary_category}
                    </span>
                    <span className="mini-badge sub">{product.sub_category}</span>
                    <span className="history-date">
                      {new Date(product.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <svg
                  className={`expand-icon ${expanded === product._id ? 'rotated' : ''}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {expanded === product._id && (
                <div className="history-item-details">
                  <p className="detail-desc">{product.description}</p>
                  <div className="detail-tags">
                    {product.seo_tags.map((tag, j) => (
                      <span key={j} className="detail-tag">#{tag}</span>
                    ))}
                  </div>
                  {product.sustainability_filters.length > 0 && (
                    <div className="detail-sustainability">
                      {product.sustainability_filters.map((f, j) => (
                        <span key={j} className="detail-sus-badge">{f}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductHistory;
