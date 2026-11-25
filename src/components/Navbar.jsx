import React from 'react';

export default function Navbar({ adminEmail, onOpenAdminModal, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark hackathon-nav sticky-top py-3">
      <div className="container">
        <a className="navbar-brand fw-bold fs-5 brand-mark" href="#home">
          &lt;Personal Portfolio /&gt;
        </a>

        <button
          className="navbar-toggler border-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {['Home', 'About', 'Team', 'Projects', 'Contact'].map((item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link px-2 text-light" href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              </li>
            ))}

            <li className="nav-item ms-lg-2 mt-3 mt-lg-0">
              {adminEmail ? (
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <span className="badge rounded-pill bg-success bg-opacity-25 text-success border border-success px-3 py-2">
                    {adminEmail}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm rounded-pill px-3"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-sm rounded-pill px-3 fw-semibold"
                  onClick={onOpenAdminModal}
                >
                  Admin Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}