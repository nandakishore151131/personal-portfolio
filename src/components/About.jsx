import React from 'react';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="section-alt py-5">
      <div className="container py-4">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="fw-bold text-white mb-2">About</h2>
            <div className="section-accent-line mx-auto mb-4"></div>
            <p className="fs-5 mb-0" style={{ color: '#cbd5e1' }}>
              {INITIAL_PORTFOLIO_DATA.about}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}