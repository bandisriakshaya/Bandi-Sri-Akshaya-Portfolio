const projects = [
  {
    id: "ckd-detection",
    title: "Chronic Kidney Disease Detection",
    category: "Machine Learning",
    description: "Research project enhancing CKD detection using hybrid ML models with Explainable AI techniques",
    longDescription: "A research project at University of Malaya focusing on enhancing Chronic Kidney Disease Detection using Machine Learning. Developed a hybrid machine learning model integrating Random Forest and XGBoost to enhance CKD detection accuracy. Implemented Explainable AI (XAI) techniques such as SHAP to improve model interpretability for clinicians. Optimized ensemble weighting through empirical validation, achieving improved model performance with a 39:61 ratio favoring XGBoost.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
    link: "#",
    technologies: ["Python", "XGBoost", "Random Forest", "SHAP", "Scikit-Learn", "NumPy", "Pandas"],
    gradient: "from-blue-600 to-blue-800",
    features: [
      "Hybrid ML model (Random Forest + XGBoost)",
      "Explainable AI (XAI) with SHAP",
      "Optimized ensemble weighting",
      "Clinical interpretability",
      "High accuracy detection"
    ],
    status: "Development",
    launchDate: "2025"
  },
  {
    id: "nephrology-prediction",
    title: "ML Driven Prediction of Chronic Nephrology-Related Diseases",
    category: "Machine Learning",
    description: "Predictive models using XGBoost and Transformers for early detection of chronic nephrology diseases",
    longDescription: "Developed predictive models using XGBoost and Transformers to enhance early detection and intervention strategies for chronic nephrology-related diseases, achieving an overall accuracy of 98.9%. Applied advanced data preprocessing and feature engineering techniques to optimize performance and robustness. Implemented model evaluation metrics, including AUC-ROC and precision-recall curves, ensuring reliable clinical applicability.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    link: "#",
    technologies: ["Python", "XGBoost", "Transformers", "TensorFlow", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib"],
    gradient: "from-blue-600 to-blue-800",
    features: [
      "98.9% overall accuracy",
      "XGBoost and Transformer models",
      "Advanced feature engineering",
      "AUC-ROC and precision-recall evaluation",
      "Clinical applicability"
    ],
    status: "Live",
    launchDate: "March 2024"
  },
  {
    id: "compass-app",
    title: "Compass - College Interface App",
    category: "Full Stack",
    description: "Full-stack college interface application with MongoDB and SQL database integration",
    longDescription: "Designed and implemented a comprehensive college interface app with MongoDB (NoSQL) and SQL database schemas to manage student data, improving data retrieval speed by 30%. Designed an intuitive user interface using Figma, increasing user engagement and interaction with college resources by about 40%. Integrated SQL databases for robust data management, improving data retrieval efficiency by approximately 30%.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center",
    link: "#",
    technologies: ["Figma", "MongoDB", "SQL", "JavaScript", "HTML", "CSS", "Bootstrap"],
    gradient: "from-purple-600 to-purple-800",
    features: [
      "MongoDB and SQL integration",
      "30% faster data retrieval",
      "Intuitive UI design",
      "40% increased user engagement",
      "Robust data management"
    ],
    status: "Live",
    launchDate: "June 2023"
  }
];

let currentFilter = 'All';

function init() {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProjects();
  setupNavigation();
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['about', 'skills', 'projects', 'contact'];

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 80;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

function filterProjects(category) {
  currentFilter = category;
  
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    if (btn.textContent === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProjects();
}

function renderProjects() {
  const filteredProjects = currentFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === currentFilter);

  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';

  filteredProjects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const statusClass = project.status === 'Live' ? 'status-live' : 
                       project.status === 'Development' ? 'status-dev' : 'status-beta';

    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
        <div class="project-badge">${project.category}</div>
        <div class="project-status ${statusClass}">${project.status}</div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          ${project.technologies.length > 4 ? `<span class="tech-tag">+${project.technologies.length - 4} more</span>` : ''}
        </div>
        <div class="project-buttons">
          <button class="btn-primary" onclick="openModal('${project.id}')">Learn More</button>
          ${project.link !== "#" ? `<button class="btn-secondary" onclick="window.open('${project.link}', '_blank')">Visit</button>` : ''}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');

  const statusClass = project.status === 'Live' ? 'status-live' : 
                     project.status === 'Development' ? 'status-dev' : 'status-beta';

  modalBody.innerHTML = `
    <h3 class="modal-title">${project.title}</h3>
    <div class="modal-badges">
      <span class="project-badge">${project.category}</span>
    </div>
    <div class="modal-section">
      <h4>Description</h4>
      <p>${project.longDescription}</p>
    </div>
    <div class="modal-section">
      <h4>Key Features</h4>
      <ul class="modal-features">
        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
    <div class="modal-section">
      <h4>Technologies Used</h4>
      <div class="modal-tech">
        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
      </div>
    </div>
    <div class="modal-buttons">
      ${project.link !== "#" ? `<button class="btn-secondary" onclick="window.open('${project.link}', '_blank')">Visit Project</button>` : ''}
      <button class="btn-secondary" onclick="closeModal()">Close</button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('modal');
    if (modal.classList.contains('active')) {
      closeModal();
    }
  }
});

function downloadResume() {
  const link = document.createElement('a');
  link.href = 'public/Bandi_Sri_Akshaya_Resume.pdf';
  link.download = 'Bandi_Sri_Akshaya_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name.trim() && email.trim() && message.trim()) {
    const subject = encodeURIComponent('Message from Portfolio');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:bandisriakshaya@gmail.com?subject=${subject}&body=${body}`;
    
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  }
}

window.addEventListener('DOMContentLoaded', init);

