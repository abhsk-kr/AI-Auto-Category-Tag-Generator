import { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onGenerate, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onGenerate(title.trim(), description.trim());
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div className="form-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18M3 12h18" />
          </svg>
        </div>
        <div>
          <h2 className="form-title">Add Product</h2>
          <p className="form-subtitle">Enter product details for AI analysis</p>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="product-title" className="form-label">
          Product Title
        </label>
        <input
          id="product-title"
          type="text"
          className="form-input"
          placeholder="e.g., Bamboo Toothbrush with Charcoal Bristles"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="product-description" className="form-label">
          Product Description
        </label>
        <textarea
          id="product-description"
          className="form-textarea"
          placeholder="Describe the product's features, materials, use-case, and any sustainability aspects..."
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <button
        type="submit"
        className={`form-submit ${isLoading ? 'loading' : ''}`}
        disabled={isLoading || !title.trim() || !description.trim()}
      >
        {isLoading ? (
          <>
            <span className="spinner" />
            Analyzing with AI...
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Generate with AI
          </>
        )}
      </button>
    </form>
  );
};

export default ProductForm;
