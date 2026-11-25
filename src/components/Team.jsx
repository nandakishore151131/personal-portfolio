import React from 'react';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';

export default function Team() {
  return (
    <section id="team" className="py-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white mb-2">Team</h2>
          <div className="section-accent-line mx-auto"></div>
        </div>

        <div className="row g-4 justify-content-center">
          {INITIAL_PORTFOLIO_DATA.members.map((member) => (
            <div className="col-md-6 col-lg-4" key={member.id}>
              <div className="glass-card h-100 p-4 text-center">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold text-white"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'linear-gradient(135deg, #6366f1, #22d3ee)'
                  }}
                >
                  0{member.id}
                </div>
                <h5 className="fw-bold text-white mb-2">{member.role}</h5>
                <p className="mb-0 small" style={{ color: '#94a3b8' }}>
                  {member.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}