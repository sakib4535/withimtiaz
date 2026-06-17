// ============================================================
// PROJECT CONSTELLATION - Interactive Star Map for Your Work
// ============================================================
(function() {
  // ---------- PROJECT DATA (enriched with key findings & tools) ----------
  const projectsData = [
    {
      title: "Advanced Persistent Threat Detection",
      shortDesc: "Ensemble learning model to detect sophisticated cyber threats in real-time network traffic.",
      keyFindings: "97.3% detection rate, 1.2% false positive; outperformed standalone models by 8-12% F1 score.",
      toolsUsed: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Matplotlib"]
    },
    {
      title: "GamersHub: Opinion Mining",
      shortDesc: "Sentiment analysis on 2.5M+ Reddit comments from gaming subreddits using NLP.",
      keyFindings: "Indie games receive 73% positive sentiment vs 58% for AAA titles; toxicity patterns identified.",
      toolsUsed: ["Python", "NLTK", "spaCy", "Transformers", "Seaborn"]
    },
    {
      title: "Multi-Label Sentiment",
      shortDesc: "Emotion recognition from text using TensorFlow (anger, joy, sadness, fear).",
      keyFindings: "Achieved 84% macro F1 on multi-label classification; emotion shift analysis over time.",
      toolsUsed: ["TensorFlow", "Keras", "BERT", "Pandas", "Plotly"]
    },
    {
      title: "Customer Churn Prediction",
      shortDesc: "ANN-based churn predictor for telecom operator using usage and demographic data.",
      keyFindings: "89% accuracy, AUC-ROC 0.85; identified top 3 drivers: contract type, monthly charges, tenure.",
      toolsUsed: ["Python", "TensorFlow", "Scikit-learn", "SHAP", "Tableau"]
    },
    {
      title: "Liver Cirrhosis Survival",
      shortDesc: "Time-stratified ensemble model for cirrhosis prognosis using clinical data.",
      keyFindings: "C-index 0.81; bilirubin and albumin as strongest predictors; improved early detection.",
      toolsUsed: ["R", "Survival", "RandomForest", "ggplot2", "Python"]
    },
    {
      title: "Social Media Network Analysis",
      shortDesc: "Graph analysis of academic Twitter interactions during COVID-19.",
      keyFindings: "Dual role of social media: information diffusion vs misinformation; key influencers detected.",
      toolsUsed: ["NetworkX", "Gephi", "Python", "Pandas", "Plotly"]
    }
  ];

  // DOM elements
  const projectsContainer = document.getElementById('projectsGrid');
  if (!projectsContainer) return;
  
  // Clear any existing content
  projectsContainer.innerHTML = '';
  
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'constellationCanvas';
  canvas.style.width = '100%';
  canvas.style.height = '500px';
  canvas.style.backgroundColor = 'rgba(3, 8, 15, 0.4)';
  canvas.style.borderRadius = '2rem';
  canvas.style.cursor = 'pointer';
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  projectsContainer.appendChild(canvas);
  
  // Modal for project details (game-like)
  const modal = document.createElement('div');
  modal.id = 'projectModal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
  modal.style.backdropFilter = 'blur(8px)';
  modal.style.zIndex = '2000';
  modal.style.display = 'none';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.fontFamily = "'Segoe UI', system-ui, sans-serif";
  
  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = 'rgba(10, 25, 45, 0.95)';
  modalContent.style.backdropFilter = 'blur(20px)';
  modalContent.style.borderRadius = '2rem';
  modalContent.style.maxWidth = '600px';
  modalContent.style.width = '90%';
  modalContent.style.padding = '2rem';
  modalContent.style.border = '1px solid #00c8ff';
  modalContent.style.boxShadow = '0 0 50px rgba(0,200,255,0.4)';
  modalContent.style.color = '#e0f4ff';
  modalContent.style.position = 'relative';
  modalContent.style.transition = 'transform 0.3s ease';
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '15px';
  closeBtn.style.right = '20px';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.fontSize = '2rem';
  closeBtn.style.color = '#00c8ff';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.transition = '0.2s';
  closeBtn.onmouseover = () => closeBtn.style.color = '#fff';
  closeBtn.onmouseout = () => closeBtn.style.color = '#00c8ff';
  
  const modalTitle = document.createElement('h2');
  modalTitle.style.marginBottom = '1rem';
  modalTitle.style.fontSize = '1.8rem';
  modalTitle.style.background = 'linear-gradient(to right, #fff, #80e8ff)';
  modalTitle.style.webkitBackgroundClip = 'text';
  modalTitle.style.webkitTextFillColor = 'transparent';
  
  const modalDesc = document.createElement('p');
  modalDesc.style.marginBottom = '1rem';
  modalDesc.style.lineHeight = '1.6';
  
  const modalFindings = document.createElement('div');
  modalFindings.style.marginBottom = '1rem';
  const findingsTitle = document.createElement('h3');
  findingsTitle.innerHTML = '<i class="fas fa-chart-line"></i> Key Findings';
  findingsTitle.style.color = '#00c8ff';
  findingsTitle.style.marginBottom = '0.5rem';
  const findingsText = document.createElement('p');
  findingsText.style.color = 'rgba(160,220,255,0.85)';
  
  const modalTools = document.createElement('div');
  const toolsTitle = document.createElement('h3');
  toolsTitle.innerHTML = '<i class="fas fa-tools"></i> Tools Used';
  toolsTitle.style.color = '#00c8ff';
  toolsTitle.style.marginBottom = '0.5rem';
  const toolsList = document.createElement('div');
  toolsList.style.display = 'flex';
  toolsList.style.flexWrap = 'wrap';
  toolsList.style.gap = '0.6rem';
  
  modalFindings.appendChild(findingsTitle);
  modalFindings.appendChild(findingsText);
  modalTools.appendChild(toolsTitle);
  modalTools.appendChild(toolsList);
  
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDesc);
  modalContent.appendChild(modalFindings);
  modalContent.appendChild(modalTools);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  function showProjectDetails(project) {
    modalTitle.innerText = project.title;
    modalDesc.innerText = project.shortDesc;
    findingsText.innerText = project.keyFindings;
    toolsList.innerHTML = '';
    project.toolsUsed.forEach(tool => {
      const badge = document.createElement('span');
      badge.innerText = tool;
      badge.style.backgroundColor = 'rgba(0, 200, 255, 0.15)';
      badge.style.padding = '0.4rem 1.2rem';
      badge.style.borderRadius = '30px';
      badge.style.fontSize = '0.8rem';
      badge.style.border = '1px solid rgba(0,200,255,0.3)';
      badge.style.transition = '0.2s';
      toolsList.appendChild(badge);
    });
    modal.style.display = 'flex';
  }
  
  closeBtn.onclick = () => modal.style.display = 'none';
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
  
  // ---------- CONSTELLATION RENDERING ----------
  let stars = [];
  let connections = [];
  let ctx, width, height;
  let animationFrame;
  
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 500;
    width = canvas.width;
    height = canvas.height;
    ctx = canvas.getContext('2d');
    generateConstellation();
    drawConstellation();
  }
  
  function generateConstellation() {
    const n = projectsData.length;
    stars = [];
    // Position stars in a circle with some radius variation to mimic constellation
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      const rad = radius + (Math.random() - 0.5) * 40;
      const x = centerX + Math.cos(angle) * rad;
      const y = centerY + Math.sin(angle) * rad;
      stars.push({
        x, y,
        radius: 8 + Math.random() * 6,
        project: projectsData[i],
        label: projectsData[i].title,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    // Create connections (constellation lines) – connect stars that are close or sequential
    connections = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i+1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 || (Math.abs(i - j) === 1) || (i === 0 && j === stars.length-1)) {
          connections.push({ from: i, to: j, dist });
        }
      }
    }
    // Also add some random lines for constellation feel
    for (let k = 0; k < n * 1.2; k++) {
      const i = Math.floor(Math.random() * n);
      let j = Math.floor(Math.random() * n);
      if (i !== j) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150 && !connections.some(c => (c.from === i && c.to === j) || (c.from === j && c.to === i))) {
          connections.push({ from: i, to: j, dist });
        }
      }
    }
  }
  
  let time = 0;
  function drawConstellation() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    // Draw dark background with subtle gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(3, 8, 15, 0.9)');
    grad.addColorStop(1, 'rgba(8, 20, 40, 0.9)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    
    // Draw constellation lines
    ctx.beginPath();
    for (let conn of connections) {
      const from = stars[conn.from];
      const to = stars[conn.to];
      if (from && to) {
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(0, 180, 230, ${0.2 + Math.sin(time * 0.5) * 0.05})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
    
    // Draw stars with glow effect
    for (let star of stars) {
      const pulse = 0.6 + 0.3 * Math.sin(time * 2 + star.pulsePhase);
      const rad = star.radius + (star.radius * 0.2 * (1 - pulse));
      // Outer glow
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(star.x, star.y, rad*0.2, star.x, star.y, rad*1.5);
      gradient.addColorStop(0, 'rgba(0, 200, 255, 0.7)');
      gradient.addColorStop(1, 'rgba(0, 200, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(star.x, star.y, rad*1.5, 0, Math.PI*2);
      ctx.fill();
      // Core star
      ctx.beginPath();
      ctx.arc(star.x, star.y, rad * 0.8, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255, 235, 150, ${0.9})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(star.x, star.y, rad * 0.4, 0, Math.PI*2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      
      // Draw label
      ctx.font = `bold ${Math.floor(12 + rad * 0.6)}px "Segoe UI", system-ui`;
      ctx.fillStyle = '#b8eaff';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00c8ff';
      ctx.fillText(star.label.substring(0, 20), star.x - 30, star.y - 12);
      ctx.shadowBlur = 0;
    }
    time += 0.02;
    animationFrame = requestAnimationFrame(drawConstellation);
  }
  
  // Handle clicks on canvas – detect which star was clicked
  function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    let minDist = 25;
    let selectedStar = null;
    for (let star of stars) {
      const dx = star.x - mouseX;
      const dy = star.y - mouseY;
      const dist = Math.hypot(dx, dy);
      if (dist < minDist) {
        minDist = dist;
        selectedStar = star;
      }
    }
    if (selectedStar) {
      showProjectDetails(selectedStar.project);
    }
  }
  
  // Add hover cursor change on canvas
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    let isOver = false;
    for (let star of stars) {
      const dx = star.x - mouseX;
      const dy = star.y - mouseY;
      if (Math.hypot(dx, dy) < 20) {
        isOver = true;
        break;
      }
    }
    canvas.style.cursor = isOver ? 'pointer' : 'default';
  });
  
  canvas.addEventListener('click', handleCanvasClick);
  
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationFrame);
    resizeCanvas();
  });
  
  // Initialize
  resizeCanvas();
  
  // Add a small title hint
  const hint = document.createElement('p');
  hint.innerText = '✨ Click any star to discover project insights ✨';
  hint.style.textAlign = 'center';
  hint.style.marginTop = '1rem';
  hint.style.color = 'rgba(160,220,255,0.7)';
  hint.style.fontSize = '0.9rem';
  hint.style.letterSpacing = '1px';
  projectsContainer.appendChild(hint);
})();