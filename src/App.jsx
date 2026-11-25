import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AdminOtpModal, AddProjectModal } from './components/AdminModals';
import { INITIAL_PORTFOLIO_DATA } from './data/portfolioData';
import './App.css';

export default function App() {
  const [projects, setProjects] = useState(INITIAL_PORTFOLIO_DATA.initialProjects);
  const [adminEmail, setAdminEmail] = useState('');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const isAdminLoggedIn = Boolean(adminEmail);

  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleRemoveProject = (projectId) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== projectId));
  };

  const handleLogout = () => {
    setAdminEmail('');
    setShowAddProjectModal(false);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar
        adminEmail={adminEmail}
        onOpenAdminModal={() => setShowAdminModal(true)}
        onLogout={handleLogout}
      />

      <main className="flex-grow-1">
        <Hero
          adminEmail={adminEmail}
          onOpenAdminModal={() => setShowAdminModal(true)}
        />
        <About />
        <Team />
        <Projects
          projects={projects}
          isAdminLoggedIn={isAdminLoggedIn}
          onRemoveProject={handleRemoveProject}
          onOpenAddProjectModal={() => setShowAddProjectModal(true)}
        />
        <Contact />
      </main>

      <Footer />

      <AdminOtpModal
        show={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onLoginSuccess={(verifiedGmail) => setAdminEmail(verifiedGmail)}
      />

      <AddProjectModal
        show={showAddProjectModal}
        onClose={() => setShowAddProjectModal(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}