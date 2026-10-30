// ==========================================================================
// HASNAIN IMTIAZ — LE:MMA STUDIO PORTFOLIO ENGINE
// Precision Editorial Dynamics · Video Theater · Tactile Feedback
// ==========================================================================

(function() {
  'use strict';

  // 1. LIVE TIME INDICATOR (DHAKA, GMT+6)
  function initTimeTicker() {
    const timeEl = document.getElementById('liveTimeTicker');
    if (!timeEl) return;

    function update() {
      const now = new Date();
      // Format in UTC+6 (Dhaka)
      const options = {
        timeZone: 'Asia/Dhaka',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
        timeEl.textContent = `${timeStr} [GMT+6]`;
      } catch (e) {
        timeEl.textContent = now.toTimeString().split(' ')[0] + ' [GMT+6]';
      }
    }
    update();
    setInterval(update, 1000);
  }

  // 2. TACTILE ACOUSTIC ENGINE (ZERO-ASSET SYNTHESIZER)
  let audioCtx = null;
  function playClickSound(freq = 820, duration = 0.04) {
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback
    }
  }

  // 3. CUSTOM KINETIC CURSOR (DESKTOP)
  function initCustomCursor() {
    const dot = document.querySelector('.custom-cursor-dot');
    const ring = document.querySelector('.custom-cursor-ring');
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, .theater-tab-lemma, .metric-strip-cell, .work-item-row');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // 4. TOAST NOTIFICATION UTILITY
  function showToast(message) {
    let toast = document.getElementById('lemmaToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'lemmaToast';
      toast.className = 'lemma-toast';
      document.body.appendChild(toast);
    }
    const marker = document.createElement('span');
    marker.style.color = 'var(--accent-cyan)';
    marker.textContent = '■';
    const text = document.createElement('span');
    text.textContent = message;
    toast.replaceChildren(marker, document.createTextNode(' '), text);
    toast.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 5. COPY EMAIL CLIPBOARD ACTION
  function initEmailCopy() {
    const copyBtn = document.getElementById('copyEmailBtn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
      const email = 'sakibimtiaz669@gmail.com';
      Promise.resolve().then(() => navigator.clipboard.writeText(email)).then(() => {
        copyBtn.textContent = 'COPIED ✓';
        showToast('Email address copied to clipboard');
        playClickSound(980, 0.06);
        setTimeout(() => {
          copyBtn.textContent = 'COPY EMAIL ↗';
        }, 2200);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

  // 6. VIDEO LAB THEATER ENGINE
  const theaterData = {
    'prismsense': {
      title: 'PrismSense — Social Research Intelligent System',
      desc: 'Autonomous social research intelligence ecosystem uniting 4 specialized agents (Query, Desk, Research, Graph) with a structured Evidence Library and cloud LLM synthesis.',
      src: 'assets/videos/prismsense.mp4',
      liveUrl: 'https://prism-sense.vercel.app/',
      badge: 'SOCIAL RESEARCH AI',
      specs: [
        { key: 'Domain', val: 'Research Intelligence Suite' },
        { key: 'Agent Topology', val: 'Query, Desk, Research, Graph' },
        { key: 'LLM Orchestration', val: 'OpenRouter Multi-Model' },
        { key: 'Cloud Preview', val: 'prism-sense.vercel.app' }
      ]
    },
    'edgesmatrix': {
      title: 'EdgesMatrix, R&D — Research Intelligence Studio',
      desc: 'Strategic business research and development intelligence platform for competitive analysis, technological landscape synthesis, and autonomous market discovery.',
      src: 'assets/videos/edgesmatrix.mp4',
      liveUrl: 'https://edgesmatrix-xhpb.vercel.app/',
      badge: 'BUSINESS R&D STUDIO',
      specs: [
        { key: 'Domain', val: 'Enterprise Business R&D' },
        { key: 'Intelligence Engine', val: 'Multi-Agent Autonomous Workflows' },
        { key: 'Synthesis Layer', val: 'Market & Tech Landscape Mapping' },
        { key: 'Cloud Preview', val: 'edgesmatrix-xhpb.vercel.app' }
      ]
    },
    'relogic-ai': {
      title: 'Relogic AI Assistant — Enterprise Intelligence',
      desc: 'Production enterprise conversational AI assistant powering client interaction workflows, automated query routing, and contextual business knowledge synthesis.',
      src: null, // No local recording was supplied; show the live application link.
      liveUrl: 'https://www.relogiclabs.com/',
      badge: 'ENTERPRISE AI ASSISTANT',
      specs: [
        { key: 'Domain', val: 'Conversational Intelligence' },
        { key: 'Deployment', val: 'Relogic Solutions (USA & AU)' },
        { key: 'Capability', val: 'Contextual Knowledge Routing' },
        { key: 'Live Portal', val: 'relogiclabs.com' }
      ]
    },
    'gesture-object': {
      title: 'Gesture & Object Detection Pipeline',
      desc: 'Real-time computer vision capturing 21 hand landmarks and bounding-box physical object classification executing locally on an RGB camera stream.',
      src: 'assets/videos/gestures.mp4',
      badge: 'SPATIAL COMPUTER VISION',
      specs: [
        { key: 'Framework', val: 'MediaPipe & OpenCV' },
        { key: 'Input Feed', val: 'RGB Live Camera' },
        { key: 'Inference', val: 'Client Edge Execution' },
        { key: 'Latency', val: 'Sub-16ms (60 FPS)' }
      ]
    },
    'new-video': {
      title: 'Velos — Gesture Presentation Workspace',
      desc: 'In-browser hand gesture presentation workspace with hands-free slide navigation and a virtual laser pointer.',
      src: 'assets/videos/velos.mp4',
      liveUrl: 'https://velosspace.vercel.app/',
      badge: 'GESTURE WORKSPACE',
      specs: [
        { key: 'Framework', val: 'MediaPipe Hands' },
        { key: 'Tracking', val: '21 hand landmarks' },
        { key: 'Execution', val: 'In-browser' },
        { key: 'Interaction', val: 'Hands-free slide navigation' }
      ]
    }
  };

  function initVideoTheater() {
    const tabs = document.querySelectorAll('.theater-tab-lemma');
    const video = document.getElementById('theaterVideo');
    const videoWrapper = document.querySelector('.video-screen-wrapper');
    const title = document.getElementById('theaterTitle');
    const desc = document.getElementById('theaterDesc');
    const specsContainer = document.getElementById('theaterSpecs');
    const liveLinkContainer = document.getElementById('theaterLiveLinkContainer');

    if (!tabs.length || !video) return;

    function makeText(tag, text, className) {
      const node = document.createElement(tag);
      node.textContent = text;
      if (className) node.className = className;
      return node;
    }

    function makeLiveLink(data, label) {
      const url = new URL(data.liveUrl);
      if (url.protocol !== 'https:') throw new Error('Live links must use HTTPS');
      const link = makeText('a', label, 'btn-editorial-link');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return link;
    }

    function loadItem(vidId) {
      const data = theaterData[vidId];
      if (!data) return;

      tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-vid') === vidId));

      // Remove any existing preview overlay
      const oldOverlay = document.getElementById('theaterPreviewOverlay');
      if (oldOverlay) oldOverlay.remove();

      video.style.display = 'block';

      // Setup fallback overlay if local video is not yet present
      video.onerror = function() {
        video.style.display = 'none';
        if (!document.getElementById('theaterPreviewOverlay')) {
          const overlay = document.createElement('div');
          overlay.id = 'theaterPreviewOverlay';
          overlay.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg, #0b0b12 0%, #050508 100%);padding:36px;text-align:center;gap:18px;border:1px solid rgba(255,255,255,0.08);';
          
          overlay.append(
            makeText('div', `[ ${data.badge} // LIVE PREVIEW ]`, 'preview-badge'),
            makeText('h4', data.placeholderTitle || data.title, 'preview-title'),
            makeText('p', data.placeholderDesc || data.desc, 'preview-description')
          );
          if (data.liveUrl) overlay.append(makeLiveLink(data, 'LAUNCH LIVE APPLICATION ↗'));
          videoWrapper.appendChild(overlay);
        }
      };

      video.pause();
      if (data.src) {
        video.src = data.src;
        video.load();
        video.play().catch(() => {});
      } else {
        video.removeAttribute('src');
        video.querySelectorAll('source').forEach(source => source.remove());
        video.load();
        video.onerror();
      }

      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      if (specsContainer) {
        specsContainer.replaceChildren(...data.specs.map(spec => {
          const row = document.createElement('div');
          row.className = 'spec-line';
          row.append(makeText('span', spec.key, 'spec-key'), makeText('span', spec.val, 'spec-value'));
          return row;
        }));
      }

      if (liveLinkContainer) {
        if (data.liveUrl) {
          const link = makeLiveLink(data, `OPEN LIVE ${data.badge} ↗`);
          link.style.cssText = 'display:inline-flex;margin-top:16px;';
          liveLinkContainer.replaceChildren(link);
        } else {
          liveLinkContainer.replaceChildren();
        }
      }

      playClickSound(720, 0.05);
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        loadItem(tab.getAttribute('data-vid'));
      });
    });

    // Initial load
    loadItem('prismsense');
  }

  // 7. INQUIRY FORM SUBMISSION
  function initInquiryForm() {
    const form = document.getElementById('lemmaInquiryForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const nameInput = document.getElementById('inquiryName');
      const emailInput = document.getElementById('inquiryEmail');
      const scopeInput = document.getElementById('inquiryScope');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const scope = scopeInput ? scopeInput.value.trim() : '';

      if (!form.reportValidity() || !name || !email || !scope) {
        showToast('Please complete all fields before transmission.');
        return;
      }

      const mailtoUrl = `mailto:sakibimtiaz669@gmail.com?subject=Project Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(scope + '\n\nSender Email: ' + email)}`;
      window.location.href = mailtoUrl;
      showToast('Opening your email application...');
      playClickSound(1020, 0.08);

      if (scopeInput) scopeInput.value = '';
    });
  }

  // 8. MOBILE MENU TOGGLE
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-links-cluster');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isVisible = nav.style.display === 'flex';
      nav.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '72px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = '#0b0b0f';
        nav.style.padding = '24px';
        nav.style.borderBottom = '1px solid var(--border-hairline)';
      }
    });
  }

  // Native touch scrolling, mouse dragging, and accessible carousel controls.
  function initAnalystCarousel() {
    const track = document.getElementById('analyst-track');
    if (!track) return;
    const carousel = track.closest('.analyst-carousel');
    const cards = Array.from(track.querySelectorAll('.analyst-card'));
    const previous = carousel.querySelector('[data-analyst-prev]');
    const next = carousel.querySelector('[data-analyst-next]');
    const position = carousel.querySelector('[data-analyst-position]');
    const dots = Array.from(carousel.querySelectorAll('[data-analyst-slide]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = 0;
    let frame = 0;
    let drag = null;
    let suppressClick = false;

    function cardLeft(card) {
      return card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    }
    function update() {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 1 || track.scrollLeft <= 1) active = 0;
      else if (track.scrollLeft >= max - 2) active = cards.length - 1;
      else active = cards.reduce((best, card, index) =>
        Math.abs(cardLeft(card) - track.scrollLeft) < Math.abs(cardLeft(cards[best]) - track.scrollLeft) ? index : best, 0);
      previous.disabled = active === 0;
      next.disabled = active === cards.length - 1;
      const label = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      if (position.textContent !== label) position.textContent = label;
      dots.forEach((dot, i) => {
        if (i === active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }
    function goTo(index) {
      const target = Math.max(0, Math.min(cards.length - 1, index));
      track.scrollTo({ left: cardLeft(cards[target]), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
    previous.addEventListener('click', () => goTo(active - 1));
    next.addEventListener('click', () => goTo(active + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
    track.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', () => { if (!frame) frame = requestAnimationFrame(update); });
    track.addEventListener('keydown', event => {
      if (event.target !== track) return;
      const targets = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: cards.length - 1 };
      if (!(event.key in targets)) return;
      event.preventDefault();
      goTo(targets[event.key]);
    });
    track.addEventListener('dragstart', event => event.preventDefault());
    track.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      suppressClick = false;
      drag = { id: event.pointerId, x: event.clientX, scroll: track.scrollLeft, moved: false };
    });
    track.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.id) return;
      const distance = event.clientX - drag.x;
      if (!drag.moved && Math.abs(distance) < 6) return;
      if (!drag.moved) {
        drag.moved = true;
        track.setPointerCapture(event.pointerId);
        track.classList.add('is-dragging');
      }
      event.preventDefault();
      track.scrollLeft = drag.scroll - distance;
    });
    function finishDrag(event) {
      if (!drag || event.pointerId !== drag.id) return;
      const moved = drag.moved;
      drag = null;
      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
      if (moved) {
        suppressClick = true;
        update();
        goTo(active);
        setTimeout(() => { suppressClick = false; }, 0);
      }
    }
    window.addEventListener('pointerup', finishDrag);
    track.addEventListener('pointercancel', finishDrag);
    track.addEventListener('click', event => {
      if (suppressClick) { event.preventDefault(); event.stopPropagation(); }
    }, true);
    update();
  }

  // INITIALIZE ALL MODULES
  document.addEventListener('DOMContentLoaded', () => {
    initTimeTicker();
    initCustomCursor();
    initEmailCopy();
    initVideoTheater();
    initInquiryForm();
    initMobileMenu();
    initAnalystCarousel();

    // Attach sound to interactive links & buttons
    document.querySelectorAll('a, button').forEach(btn => {
      btn.addEventListener('click', () => playClickSound(660, 0.03));
    });
  });

})();
