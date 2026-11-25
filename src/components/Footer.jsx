import React from 'react';

export default function Footer() {
  return (
    <footer className="py-4 text-center border-top border-secondary border-opacity-25" style={{ backgroundColor: '#05080f' }}>
      <div className="container">
        <p className="mb-0 small" style={{ color: '#64748b' }}>
          &copy; {new Date().getFullYear()} Personal Portfolio — Front-End Hackathon Project
        </p>
      </div>
    </footer>
  );
}