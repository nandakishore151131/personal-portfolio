import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="py-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Technical Skills</h2>
          <div className="bg-primary mx-auto" style={{ height: '3px', width: '60px' }}></div>
        </div>
        <div className="row g-4">
          {PORTFOLIO_DATA.skills.map((skill, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-sm skill-card p-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">{skill.name}</span>
                    <span className="text-primary fw-semibold">{skill.level}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{ width: `${skill.level}%` }} 
                      aria-valuenow={skill.level} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
