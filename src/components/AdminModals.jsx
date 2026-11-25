import React, { useState } from 'react';
import { TECH_OPTIONS } from '../data/portfolioData';

export function AdminOtpModal({ show, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState('');

  if (!show) return null;

  const resetAndClose = () => {
    setEmail('');
    setPassword('');
    setStep('credentials');
    setGeneratedOtp('');
    setEnteredOtp('');
    setError('');
    onClose();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const gmailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(trimmedEmail)) {
      setError('Please enter a valid Gmail address (e.g., name@gmail.com).');
      return;
    }

    if (password.length < 4) {
      setError('Please enter your password (at least 4 characters).');
      return;
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setEnteredOtp('');
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp.trim() === generatedOtp) {
      onLoginSuccess(email.trim().toLowerCase());
      resetAndClose();
    } else {
      setError('Incorrect OTP. Please enter the 6-digit code shown above.');
    }
  };

  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
      <div className="modal-card-dark w-100 shadow-lg" style={{ maxWidth: '440px' }}>
        <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom border-secondary border-opacity-25">
          <h5 className="mb-0 fw-bold text-white">Admin Login</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={resetAndClose}
            aria-label="Close"
          ></button>
        </div>

        <div className="p-4">
          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          {step === 'credentials' ? (
            <form onSubmit={handleSendOtp}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-light">Gmail Address *</label>
                <input
                  type="email"
                  className="form-control dark-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-light">Password *</label>
                <input
                  type="password"
                  className="form-control dark-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary text-light rounded-pill px-3"
                  onClick={resetAndClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
                  Send OTP
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="alert alert-info py-2 px-3 small mb-3">
                OTP sent to <strong>{email}</strong>. Demo OTP Code:{' '}
                <strong className="text-dark fs-6">{generatedOtp}</strong>
              </div>

              <label className="form-label fw-semibold text-light">
                Enter 6-Digit OTP *
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                className="form-control dark-input mb-3 fs-5 text-center"
                style={{ letterSpacing: '0.35em' }}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                required
              />

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-link text-info p-0 small text-decoration-none"
                  onClick={() => {
                    setStep('credentials');
                    setError('');
                  }}
                >
                  ← Back
                </button>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-light btn-sm rounded-pill px-3"
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success btn-sm rounded-pill px-4 fw-semibold"
                  >
                    Verify &amp; Login
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function AddProjectModal({ show, onClose, onAddProject }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTechs, setSelectedTechs] = useState(['React', 'Bootstrap 5']);
  const [customTechInput, setCustomTechInput] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  if (!show) return null;

  const toggleTechOption = (tech) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech]
    );
  };

  const resetAndClose = () => {
    setTitle('');
    setDescription('');
    setSelectedTechs(['React', 'Bootstrap 5']);
    setCustomTechInput('');
    setUrl('');
    setError('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customList = customTechInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const combinedTechs = Array.from(new Set([...selectedTechs, ...customList]));

    if (!title.trim() || !description.trim()) {
      setError('Project title and description are required.');
      return;
    }

    if (combinedTechs.length === 0) {
      setError('Select at least one technology option or type a custom technology.');
      return;
    }

    onAddProject({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      technologies: combinedTechs,
      url: url.trim()
    });

    resetAndClose();
  };

  return (
    <div className="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
      <div className="modal-card-dark w-100 shadow-lg" style={{ maxWidth: '540px' }}>
        <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom border-secondary border-opacity-25">
          <h5 className="mb-0 fw-bold text-white">Add Project</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={resetAndClose}
            aria-label="Close"
          ></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold text-light">Project Title *</label>
            <input
              type="text"
              className="form-control dark-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Smart Expense Tracker UI"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-light">Description *</label>
            <textarea
              className="form-control dark-input"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what the project does and its front-end features..."
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-light d-block">
              Technology Used (Pick Options &amp; Fill Custom) *
            </label>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {TECH_OPTIONS.map((tech) => {
                const active = selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 selectable-chip ${
                      active ? 'btn-primary fw-semibold' : 'btn-outline-secondary text-light'
                    }`}
                    onClick={() => toggleTechOption(tech)}
                  >
                    {active ? `✓ ${tech}` : tech}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              className="form-control dark-input"
              value={customTechInput}
              onChange={(e) => setCustomTechInput(e.target.value)}
              placeholder="Type additional technologies separated by commas (e.g., Chart.js, Axios)"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-light">
              Project URL <span className="text-secondary fw-normal">(Optional)</span>
            </label>
            <input
              type="url"
              className="form-control dark-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-demo-or-repo-link.com"
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary text-light rounded-pill px-4"
              onClick={resetAndClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}