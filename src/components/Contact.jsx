import React, { useState } from 'react';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      subject: suggestion,
      message: prev.message || `Hello, reaching out regarding: ${suggestion}.`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4500);
    }
  };

  return (
    <section id="contact" className="py-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white mb-2">Contact</h2>
          <div className="section-accent-line mx-auto mb-3"></div>
          <p className="mb-0" style={{ color: '#94a3b8' }}>
            Send a message or tap a quick topic suggestion to fill the form.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="mb-4">
              <div className="small fw-semibold mb-2" style={{ color: '#cbd5e1' }}>
                Quick Suggestions:
              </div>
              <div className="d-flex flex-wrap gap-2">
                {INITIAL_PORTFOLIO_DATA.suggestions.map((item, idx) => (
                  <span
                    key={idx}
                    className="badge rounded-pill px-3 py-2 suggestion-chip"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {submitted && (
              <div className="alert alert-success mb-4" role="alert">
                Message submitted successfully (front-end confirmation).
              </div>
            )}

            <form onSubmit={handleSubmit} className="glass-card p-4 p-md-5">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-light">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control dark-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold text-light">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control dark-input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold text-light">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control dark-input"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject or pick a suggestion above"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold text-light">Message *</label>
                  <textarea
                    name="message"
                    rows="4"
                    className="form-control dark-input"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                <div className="col-12 text-end pt-2">
                  <button type="submit" className="btn btn-primary btn-lg rounded-pill px-4 fw-semibold">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}