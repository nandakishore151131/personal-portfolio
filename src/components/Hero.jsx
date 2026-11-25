import React from 'react';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';

export default function Hero({ onOpenAdminModal, adminEmail }) {
  return (
    <section id="home" className="hero-hackathon py-5">
      <div className="container py-5">
        <div className="row align-items-center gy-4">
          <div className="col-lg-8">
            <h1 className="display-3 fw-bold mb-3 hero-title-gradient">
              Personal Portfolio
            </h1>
            <p className="lead text-secondary mb-4 fs-5" style={{ color: '#cbd5e1' }}>
              {INITIAL_PORTFOLIO_DATA.tagline}
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary btn-lg px-4 rounded-pill fw-semibold shadow">
                Explore Projects
              </a>
              <a href="#contact" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                Contact
              </a>
              {!adminEmail && (
                <button
                  type="button"
                  className="btn btn-outline-info btn-lg px-4 rounded-pill"
                  onClick={onOpenAdminModal}
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="glass-card p-4">
              <div className="small text-uppercase fw-semibold text-info mb-2">
                Front-End Architecture
              </div>
              <h5 className="fw-bold text-white mb-2">React + Bootstrap 5</h5>
              <p className="small mb-3" style={{ color: '#94a3b8' }}>
                Modular components, live technology filtering, OTP-gated admin controls, and responsive grid layouts.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge tech-pill px-2 py-1">React 18</span>
                <span className="badge tech-pill px-2 py-1">Bootstrap 5</span>
                <span className="badge tech-pill px-2 py-1">Vite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}