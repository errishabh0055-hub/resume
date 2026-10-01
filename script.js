/**
 * Rishabh Parashar — Data Analyst & Analytics Engineer
 * Interactive Scripting: Case Study Modals, Metric Counters, Skills Filter & Resume Viewer
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMetricCounters();
  initSkillsFilter();
  initCaseStudyModals();
  initResumeModal();
  initQuickCopy();
  initScrollReveals();
});

/* ==========================================================================
   1. NAVIGATION & STICKY HEADER
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll Header Shadow & Size
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileBtn.classList.toggle('open', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
      });
    });
  }

  // Active Section Spy via IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* ==========================================================================
   2. ANIMATED METRIC COUNTERS
   ========================================================================== */
function initMetricCounters() {
  const counterElements = document.querySelectorAll('.metric-number[data-target]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            counter.textContent = currentVal.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString();
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const heroMetrics = document.querySelector('.hero-metrics-strip');
  if (heroMetrics) observer.observe(heroMetrics);
}

/* ==========================================================================
   3. SKILLS FILTERING TABS
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. CASE STUDY MODAL MANAGER
   Rich, accurate resume-backed details for each project
   ========================================================================== */
const projectData = {
  'sales-dashboard': {
    eyebrow: 'Power BI &bull; Executive Analytics (2024)',
    title: 'Sales Performance Dashboard',
    bodyHtml: `
      <div class="modal-section-block">
        <h4 class="modal-h4">Business Problem &amp; Stakeholder Context</h4>
        <p>Retail sales leadership needed continuous, self-serve visibility across multi-regional performance and product category trends. Teams previously spent hours manually gathering disparate spreadsheets to report weekly sales figures, creating delays in addressing underperforming branches.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Technical Architecture &amp; Data Modeling</h4>
        <p>Designed a structured Star Schema in <strong>Power BI</strong>, linking a central fact sales table to dimension tables for Region, Date, and Product Categories. Developed complex, dynamic <strong>DAX measures</strong> for accurate multi-tier aggregations.</p>
        <div class="modal-code-box">
<span class="c-comment">// Sample DAX Measures Implemented</span>
Total Revenue = SUM(FactSales[Revenue])

YoY Revenue Growth % = 
VAR PriorYearSales = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('DimDate'[Date]))
RETURN
DIVIDE([Total Revenue] - PriorYearSales, PriorYearSales, 0)

Category Profit Margin % = DIVIDE(SUM(FactSales[Profit]), [Total Revenue], 0)
        </div>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Key Features &amp; User Experience</h4>
        <ul class="timeline-bullets">
          <li><strong>Dynamic Slicers:</strong> Instant cross-filtering by geographic territory, quarter, and product hierarchy.</li>
          <li><strong>Drill-Through Capabilities:</strong> Empowered regional directors to click any summarized category and inspect sub-brand margin variances.</li>
          <li><strong>Executive KPI Barometer:</strong> Instant view of Total Revenue, Category Profit Margin %, and YoY Growth indicators.</li>
        </ul>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Quantifiable Impact &amp; Operational Adoption</h4>
        <div class="modal-stats-grid">
          <div class="stat-box">
            <span class="stat-title">Dashboard Adoption</span>
            <span class="stat-value">Weekly Reviews</span>
          </div>
          <div class="stat-box">
            <span class="stat-title">Manual Reporting Time</span>
            <span class="stat-value">Significantly Cut</span>
          </div>
          <div class="stat-box">
            <span class="stat-title">Data Granularity</span>
            <span class="stat-value">Real-Time Slicers</span>
          </div>
        </div>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Core Takeaway</h4>
        <p>Proved how thoughtful semantic modeling and intuitive DAX time intelligence eliminate reporting bottlenecks and empower executive leadership with real-time clarity.</p>
      </div>
    `
  },

  'customer-segmentation': {
    eyebrow: 'Power BI &bull; Clustering &bull; RFM Modeling (2024)',
    title: 'Customer Segmentation & Behavior Analysis',
    bodyHtml: `
      <div class="modal-section-block">
        <h4 class="modal-h4">The Challenge</h4>
        <p>Generic customer marketing resulted in suboptimal campaign conversion rates. Stakeholders needed to understand distinct purchasing behaviors, frequency of visits, and monetary contributions to maximize retention ROI.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Analytical Approach (RFM Framework)</h4>
        <p>Built an analytical pipeline calculating three critical behavioral vectors for every active customer account:</p>
        <ul class="timeline-bullets">
          <li><strong>Recency (R):</strong> Days lapsed since the customer's last verified transaction.</li>
          <li><strong>Frequency (F):</strong> Cumulative count of unique orders over the evaluation window.</li>
          <li><strong>Monetary Value (M):</strong> Total net gross revenue attributed to the customer.</li>
        </ul>
        <p>Applied clustering algorithms and quantiles to bucket customers into actionable tiers: <em>Champions</em>, <em>Loyal Customers</em>, <em>At-Risk High-Spenders</em>, and <em>New Prospects</em>.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Key Findings &amp; Business Strategy</h4>
        <div class="modal-stats-grid">
          <div class="stat-box">
            <span class="stat-title">Revenue Driver Cohort</span>
            <span class="stat-value">Top 20% Customers</span>
          </div>
          <div class="stat-box">
            <span class="stat-title">Revenue Share</span>
            <span class="stat-value">80% Total Sales</span>
          </div>
          <div class="stat-box">
            <span class="stat-title">Retention Strategy</span>
            <span class="stat-value">Targeted Uplift</span>
          </div>
        </div>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Actionable Recommendations</h4>
        <p>Presented data-backed recommendations to pivot marketing budget: allocate dedicated VIP re-engagement and concierge retention initiatives toward the 20% champion accounts, while building automated drip sequences for dormant accounts.</p>
      </div>
    `
  },

  'ecommerce-eda': {
    eyebrow: 'Python &bull; Pandas &bull; Seaborn &bull; 50,000+ Records (2024)',
    title: 'E-Commerce Data Cleaning & Exploratory Data Analysis',
    bodyHtml: `
      <div class="modal-section-block">
        <h4 class="modal-h4">The Dataset &amp; Data Wrangling Challenge</h4>
        <p>Analyzed a comprehensive retail dataset encompassing <strong>50,000+ transaction rows</strong>. The raw data suffered from missing customer identifiers, duplicate line items, date parsing errors, negative quantity anomalies, and price outliers.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Python Engineering Pipeline</h4>
        <p>Engineered an end-to-end preprocessing workflow in Jupyter Notebook using Pandas and NumPy:</p>
        <div class="modal-code-box">
<span class="c-comment"># Data Cleaning Pipeline Snapshot</span>
df.drop_duplicates(subset=[<span class="c-str">'Order_ID'</span>, <span class="c-str">'Product_ID'</span>], inplace=True)
df[<span class="c-str">'Order_Date'</span>] = pd.to_datetime(df[<span class="c-str">'Order_Date'</span>], errors=<span class="c-str">'coerce'</span>)

<span class="c-comment"># Outlier Treatment using Interquartile Range (IQR)</span>
Q1 = df[<span class="c-str">'Amount'</span>].quantile(0.25)
Q3 = df[<span class="c-str">'Amount'</span>].quantile(0.75)
IQR = Q3 - Q1
df_clean = df[(df[<span class="c-str">'Amount'</span>] >= Q1 - 1.5 * IQR) &amp; (df[<span class="c-str">'Amount'</span>] <= Q3 + 1.5 * IQR)]
        </div>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Statistical Visualization &amp; Insights</h4>
        <p>Crafted <strong>15+ publication-quality statistical visualizations</strong> with Matplotlib and Seaborn communicating:</p>
        <ul class="timeline-bullets">
          <li>Seasonal surges during festive quarters and discount weekends.</li>
          <li>Category-wise profitability variations identifying high-volume yet margin-diluting lines.</li>
          <li>Customer payment mode preferences impacting order cancellation rates.</li>
        </ul>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Outcome</h4>
        <p>Delivered an audit-ready, 100% clean dataset and visual slide deck that non-technical management could readily utilize for supply-chain re-stocking decisions.</p>
      </div>
    `
  },

  'sql-pipeline': {
    eyebrow: 'SQL &bull; PostgreSQL &bull; SQLite &bull; Python (2023)',
    title: 'SQL + Python Integrated Analytics Pipeline',
    bodyHtml: `
      <div class="modal-section-block">
        <h4 class="modal-h4">Problem &amp; Goal</h4>
        <p>Data analysts often encounter fragmented storage where transactional records sit in normalized relational databases while visualization tools demand processed, denormalized metrics. The goal was to build a reproducible, automated extraction and aggregation pipeline.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Relational Database Query Design</h4>
        <p>Constructed relational databases in <strong>PostgreSQL</strong> and <strong>SQLite</strong>. Authored complex SQL queries leveraging Common Table Expressions (CTEs), multi-table joins, subqueries, and advanced window functions.</p>
        <div class="modal-code-box">
<span class="c-comment">-- Advanced Window Function Query</span>
<span class="c-kw">WITH</span> MonthlyProductStats <span class="c-kw">AS</span> (
    <span class="c-kw">SELECT</span> 
        p.category_name,
        DATE_TRUNC(<span class="c-str">'month'</span>, o.order_date) <span class="c-kw">AS</span> sales_month,
        SUM(oi.quantity * oi.unit_price) <span class="c-kw">AS</span> monthly_revenue,
        DENSE_RANK() <span class="c-kw">OVER</span> (
            PARTITION <span class="c-kw">BY</span> DATE_TRUNC(<span class="c-str">'month'</span>, o.order_date)
            <span class="c-kw">ORDER BY</span> SUM(oi.quantity * oi.unit_price) <span class="c-kw">DESC</span>
        ) <span class="c-kw">AS</span> category_rank
    <span class="c-kw">FROM</span> orders o
    <span class="c-kw">JOIN</span> order_items oi <span class="c-kw">ON</span> o.order_id = oi.order_id
    <span class="c-kw">JOIN</span> products p <span class="c-kw">ON</span> oi.product_id = p.product_id
    <span class="c-kw">GROUP BY</span> 1, 2
)
<span class="c-kw">SELECT</span> * <span class="c-kw">FROM</span> MonthlyProductStats <span class="c-kw">WHERE</span> category_rank &lt;= 3;
        </div>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Downstream Python Integration</h4>
        <p>Connected Jupyter environments directly to the databases via SQLAlchemy / psycopg2, piping query outputs into Pandas DataFrames for automated analytical summaries and KPI tracking.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Impact</h4>
        <p>Standardized reproducible query patterns, eliminated redundant manual exports, and established a modular codebase for collaborative analytics.</p>
      </div>
    `
  },

  'tata-experience': {
    eyebrow: 'Tata iQ &bull; Financial Services &bull; Forage Simulation (Completed June 2026)',
    title: 'Tata Group Data Analytics Job Simulation',
    bodyHtml: `
      <div class="modal-section-block">
        <h4 class="modal-h4">Simulation Context &amp; Mandate</h4>
        <p>Completed an enterprise simulation for the Financial Services group at <strong>Tata iQ</strong>. The mandate addressed consumer credit delinquency risk, customer collection strategy optimization, and responsible AI deployment standards.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Key Analytical Contributions</h4>
        <ul class="timeline-bullets">
          <li><strong>GenAI-Assisted Exploratory Data Analysis:</strong> Leveraged generative AI tooling to audit large portfolio data, identify data quality blindspots, and surface early delinquency warning indicators.</li>
          <li><strong>Predictive Delinquency Modeling Framework:</strong> Developed a no-code risk assessment architecture detailing feature selection, evaluation benchmarks (ROC-AUC / Precision-Recall), and customer risk-tier segmentation.</li>
          <li><strong>Agentic AI Collections Strategy:</strong> Formulated an automated, multi-tiered borrower outreach framework balancing recovery efficiency with empathetic customer touchpoints.</li>
        </ul>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Responsible AI &amp; Governance Framework</h4>
        <p>Formulated executive recommendations safeguarding algorithmic fairness, explainability (XAI), compliance with lending regulations, and systemic bias minimization in automated financial decision systems.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-h4">Core Competencies Demonstrated</h4>
        <div class="modal-stats-grid">
          <div class="stat-box">
            <span class="stat-title">Domain</span>
            <span class="stat-value">Financial Analytics</span>
          </div>
          <div class="stat-box">
            <span class="stat-title">Innovation</span>
            <span class="stat-value">GenAI EDA</span>
          </div>
          <div class="stat-box">
            <span class="stat-title">Governance</span>
            <span class="stat-value">Responsible AI</span>
          </div>
        </div>
      </div>
    `
  }
};

function initCaseStudyModals() {
  const modal = document.getElementById('caseStudyModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalEyebrow = document.getElementById('modalEyebrow');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('closeModalBtn');
  const triggers = document.querySelectorAll('.open-case-study');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalEyebrow.innerHTML = data.eyebrow;
    modalBody.innerHTML = data.bodyHtml;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  // Also make clicking the card open the case study
  document.querySelectorAll('.case-study-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.open-case-study') || e.target.closest('a')) return;
      const projectId = card.getAttribute('data-project-id');
      if (projectId) openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. RESUME PREVIEW MODAL
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const closeBtn = document.getElementById('closeResumeModalBtn');
  const triggers = [
    document.getElementById('openResumeModalBtn'),
    document.getElementById('heroPreviewResumeBtn'),
    document.getElementById('ctaPreviewResumeBtn'),
    document.getElementById('mobileResumeBtn')
  ];

  if (!resumeModal) return;

  function openResume() {
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    if (btn) btn.addEventListener('click', openResume);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeResume);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
      closeResume();
    }
  });
}

/* ==========================================================================
   6. QUICK EMAIL COPY & TOAST NOTIFICATION
   ========================================================================== */
function initQuickCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyBadge = document.getElementById('copyBadge');
  const emailText = 'er.rishabh0055@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailText);
      } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = emailText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (copyBadge) {
        copyBadge.textContent = 'Copied!';
        copyBadge.style.backgroundColor = '#16a34a';
      }

      showToast('Email copied to clipboard: er.rishabh0055@gmail.com');

      setTimeout(() => {
        if (copyBadge) {
          copyBadge.textContent = 'Copy';
          copyBadge.style.backgroundColor = '';
        }
      }, 2500);
    } catch (err) {
      showToast('Click to open default mail app');
      window.location.href = `mailto:${emailText}`;
    }
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-success-icon">✓</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

/* ==========================================================================
   7. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(
    '.section-header, .about-story-card, .about-pipeline-card, .skill-category-card, .case-study-card, .timeline-item, .education-card, .contact-card, .contact-action-card, .resume-cta-banner'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });
}
