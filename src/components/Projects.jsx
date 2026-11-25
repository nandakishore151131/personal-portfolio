import React, { useMemo, useState } from 'react';

export default function Projects({
  projects,
  isAdminLoggedIn,
  onRemoveProject,
  onOpenAddProjectModal
}) {
  const [selectedTech, setSelectedTech] = useState('All');

  const availableTechs = useMemo(() => {
    const set = new Set(['All']);
    projects.forEach((proj) => {
      (proj.technologies || []).forEach((tech) => set.add(tech));
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTech === 'All') return projects;
    return projects.filter((proj) =>
      (proj.technologies || []).some(
        (t) => t.toLowerCase() === selectedTech.toLowerCase()
      )
    );
  }, [projects, selectedTech]);

  return (
    <section id="projects" className="section-alt py-5">
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-white mb-2">Projects</h2>
            <div className="section-accent-line"></div>
          </div>

          {isAdminLoggedIn ? (
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4 fw-semibold shadow"
              onClick={onOpenAddProjectModal}
            >
              + Add Project
            </button>
          ) : (
            <span className="small" style={{ color: '#94a3b8' }}>
              Sign in via Admin Login to add or remove projects
            </span>
          )}
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {availableTechs.map((tech) => (
            <button
              key={tech}
              type="button"
              className={`btn btn-sm rounded-pill px-3 ${
                selectedTech === tech
                  ? 'btn-info text-dark fw-semibold'
                  : 'btn-outline-secondary text-light'
              }`}
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="glass-card p-5 text-center">
            <p className="mb-3" style={{ color: '#cbd5e1' }}>
              No projects match "{selectedTech}".
            </p>
            {isAdminLoggedIn && (
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4"
                onClick={onOpenAddProjectModal}
              >
                + Add Project
              </button>
            )}
          </div>
        ) : (
          <div className="row g-4">
            {filteredProjects.map((project) => (
              <div className="col-md-6 col-lg-4" key={project.id}>
                <div className="glass-card h-100 p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h5 className="fw-bold text-white mb-0">{project.title}</h5>
                    {isAdminLoggedIn && (
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm rounded-pill px-2 py-1"
                        onClick={() => onRemoveProject(project.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <p className="flex-grow-1 small mt-2 mb-3" style={{ color: '#cbd5e1' }}>
                    {project.description}
                  </p>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {(project.technologies || []).map((tech, idx) => (
                      <span key={idx} className="badge tech-pill px-2 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.url && project.url.trim() !== '' && (
                    <div className="pt-2 border-top border-secondary border-opacity-25">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-info btn-sm rounded-pill px-3"
                      >
                        Open Project URL ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}