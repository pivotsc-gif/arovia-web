/**
 * Arovia Healthcare — Diagnostic Lab Tests Catalog & Modal Controller
 * Authoritative data structure for laboratory tests, category filtering, search, and educational modal.
 */

const LAB_TESTS_DATA = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
    abbreviation: 'CBC',
    subtitle: 'Blood health & infection screening',
    parametersCount: 21,
    parametersText: '21 Parameter(s) Covered',
    categories: ['all', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Whole Blood (EDTA)',
    iconType: 'blood-cells',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'A foundational hematology investigation that evaluates the cellular components of your blood, including oxygen-transporting red cells, immune white cells, and blood-clotting platelets.',
    whyNeeded: 'Frequently ordered for general wellness reviews, to investigate unexplained fatigue or pale skin (anemia), check for active bacterial or viral infections, and monitor response to medical therapies.',
    whatEvaluates: [
      'Hemoglobin & Hematocrit (oxygen transport capacity)',
      'Total Red Blood Cell (RBC) count & indices (MCV, MCH, MCHC)',
      'Total White Blood Cell (WBC) count & 5-part differential',
      'Platelet count & Mean Platelet Volume (MPV)'
    ],
    preparation: 'No mandatory fasting is required for CBC. Drinking plenty of water prior to venipuncture is advised for smooth sample collection.'
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    abbreviation: 'HbA1c',
    subtitle: '3-month average blood sugar',
    parametersCount: 2,
    parametersText: '2 Parameter(s) Covered',
    categories: ['all', 'diabetes', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Whole Blood (EDTA)',
    iconType: 'sugar-cube',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'The HbA1c test measures the percentage of blood hemoglobin coated with glucose, reflecting your average blood sugar levels over the past 2 to 3 months.',
    whyNeeded: 'Essential for screening and diagnosing prediabetes and type 2 diabetes, and for ongoing evaluation of glycemic management in individuals with established diabetes.',
    whatEvaluates: [
      'Percentage of Glycated Hemoglobin (HbA1c %)',
      'Estimated Average Glucose (eAG in mg/dL)',
      'Quarterly blood glucose trajectory and treatment response'
    ],
    preparation: 'No fasting is required. Blood can be drawn at any convenient time of day, regardless of when you last consumed meals.'
  },
  {
    id: 'thyroid-profile',
    name: 'Thyroid Profile Total',
    abbreviation: 'T3, T4, TSH',
    subtitle: 'Comprehensive thyroid panel',
    parametersCount: 3,
    parametersText: '3 Parameter(s) Covered',
    categories: ['all', 'thyroid', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Serum (Plain/Gel Tube)',
    iconType: 'thyroid',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'A tri-hormone endocrine panel evaluating Total Triiodothyronine (T3), Total Thyroxine (T4), and Thyroid Stimulating Hormone (TSH) to assess how effectively your thyroid gland regulates metabolism.',
    whyNeeded: 'Recommended when experiencing unexplained weight fluctuations, chronic lethargy, sensitivity to heat or cold, heart palpitations, hair loss, or for routine thyroid medication dosing checks.',
    whatEvaluates: [
      'Total T3 (Triiodothyronine)',
      'Total T4 (Thyroxine)',
      'Thyroid Stimulating Hormone (TSH)',
      'Pituitary-thyroid feedback axis functionality'
    ],
    preparation: 'Food fasting is typically not required, but early morning sample collection is recommended due to diurnal TSH variation. Inform your doctor if you take biotin supplements.'
  },
  {
    id: 'urine-routine',
    name: 'Urine Examination Routine (Routine R/E)',
    abbreviation: 'Urine R/E',
    subtitle: 'Physical, chemical & microscopic urinalysis',
    parametersCount: 12,
    parametersText: '12 Parameter(s) Covered',
    categories: ['all', 'urine'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Urine (Midstream Clean Catch)',
    iconType: 'flask',
    image: 'assets/images/lab_sample_urine.jpg',
    whatIs: 'A comprehensive multi-parameter urinalysis assessing the physical clarity, chemical biochemistry, and microscopic cellular constituents of urine.',
    whyNeeded: 'Routine checkups, pre-operative clearances, or when evaluating urinary discomfort, flank/back pain, blood in urine, or suspected kidney and metabolic conditions.',
    whatEvaluates: [
      'Physical traits (Color, transparency, specific gravity, pH)',
      'Chemical markers (Protein/Albumin, glucose, ketones, bilirubin, urobilinogen, nitrites)',
      'Microscopic elements (Pus cells, RBCs, epithelial cells, casts, crystals, bacteria)'
    ],
    preparation: 'Collect a midstream clean-catch urine specimen in the provided sterile container, preferably from the first morning urination for maximum diagnostic concentration.'
  },
  {
    id: 'lft',
    name: 'Liver Function Test (LFT)',
    abbreviation: 'LFT',
    subtitle: 'Hepatic enzymes, bilirubin & proteins',
    parametersCount: 12,
    parametersText: '12 Parameter(s) Covered',
    categories: ['all', 'liver', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Serum (Plain/Gel Tube)',
    iconType: 'liver',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'A clinical biochemistry panel measuring vital enzymes, proteins, and bile pigments cleared or synthesized by the liver to measure hepatic cellular health.',
    whyNeeded: 'Used to check for liver inflammation, screen for jaundice, evaluate abdominal symptoms, monitor fatty liver or hepatitis, and confirm drug safety during ongoing medications.',
    whatEvaluates: [
      'Bilirubin profile (Total, Direct, and Indirect Bilirubin)',
      'Liver transaminases & enzymes (SGOT/AST, SGPT/ALT, Alkaline Phosphatase - ALP)',
      'Serum proteins (Total Protein, Albumin, Globulin, and Albumin/Globulin Ratio)'
    ],
    preparation: 'Overnight fasting for 8 to 10 hours is advised. Avoid alcohol and vigorous physical exertion for 24 hours prior to sample collection.'
  },
  {
    id: 'glucose-fasting-pp',
    name: 'Glucose Fasting (F) and Post Prandial',
    abbreviation: 'FBS & PPBS',
    subtitle: 'Dual fasting & 2-hr post-meal glucose',
    parametersCount: 2,
    parametersText: '2 Parameter(s) Covered',
    categories: ['all', 'diabetes', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Fluoride Plasma (Grey Tube)',
    iconType: 'clock-glucose',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'A paired diagnostic evaluation measuring blood glucose levels under basal overnight fasting conditions and precisely 2 hours following a regular meal.',
    whyNeeded: 'Crucial for detecting impaired glucose tolerance, assessing insulin secretion kinetics after eating, and calibrating anti-diabetic medications with precision.',
    whatEvaluates: [
      'Fasting Plasma Glucose (basal insulin efficacy)',
      'Post Prandial Plasma Glucose (post-meal clearance response)',
      'Excursion dynamics between fasting and fed metabolic states'
    ],
    preparation: 'Sample 1 requires 8–10 hours of overnight fasting. Sample 2 must be drawn exactly 2 hours after commencing your regular meal (water permitted, no other snacks).'
  },
  {
    id: 'kft',
    name: 'Kidney Function Test (KFT)',
    abbreviation: 'KFT / Renal Panel',
    subtitle: 'Creatinine, urea & serum electrolytes',
    parametersCount: 16,
    parametersText: '16 Parameter(s) Covered',
    categories: ['all', 'kidney', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Serum (Plain/Gel Tube)',
    iconType: 'kidneys',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'A renal biochemistry panel evaluating metabolic filtration waste products and electrolyte balance managed by the kidneys.',
    whyNeeded: 'Ordered to assess kidney filtration efficiency, screen for renal impairment, monitor chronic kidney disease or hypertension, and check hydration and electrolyte balance.',
    whatEvaluates: [
      'Blood Urea Nitrogen (BUN) & Blood Urea',
      'Serum Creatinine & Estimated Glomerular Filtration Rate (eGFR)',
      'Serum Uric Acid level',
      'Electrolyte balance (Sodium, Potassium, Chloride, Calcium, Phosphorus)'
    ],
    preparation: 'Overnight fasting for 8–10 hours is standard. Maintain normal hydration with plain water before venipuncture.'
  },
  {
    id: 'lipid-profile',
    name: 'Lipid Profile Basic',
    abbreviation: 'Lipid Panel',
    subtitle: 'Cholesterol & cardiovascular risk',
    parametersCount: 6,
    parametersText: '6 Parameter(s) Covered',
    categories: ['all', 'heart', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Serum (Plain/Gel Tube)',
    iconType: 'heart-pulse',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'A cardiovascular screening panel measuring circulating blood lipids and cholesterol fractions that correlate with arterial plaque risk and heart health.',
    whyNeeded: 'Recommended as a baseline health screening for all adults, especially individuals with elevated blood pressure, family history of coronary disease, diabetes, or obesity.',
    whatEvaluates: [
      'Total Serum Cholesterol',
      'High-Density Lipoprotein (HDL - "protective" cholesterol)',
      'Low-Density Lipoprotein (LDL - atherogenic cholesterol)',
      'Very Low-Density Lipoprotein (VLDL) & Triglycerides',
      'Total Cholesterol to HDL Risk Ratio'
    ],
    preparation: 'Strict 10–12 hours overnight fasting is required (only plain water is permitted). Avoid high-fat meals and alcohol for 24 hours prior.'
  },
  {
    id: 'glucose-fasting',
    name: 'Glucose Fasting (F)',
    abbreviation: 'FBS',
    subtitle: 'Morning baseline blood sugar',
    parametersCount: 1,
    parametersText: '1 Parameter(s) Covered',
    categories: ['all', 'diabetes', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Fluoride Plasma (Grey Tube)',
    iconType: 'glucose-drop',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'A targeted glucose test measuring blood sugar levels after an overnight fast to establish baseline carbohydrate metabolism.',
    whyNeeded: 'Standard initial test for screening prediabetes and diabetes mellitus, and for checking day-to-day fasting glycemic stability in diagnosed patients.',
    whatEvaluates: [
      'Fasting plasma glucose concentration (mg/dL)',
      'Basal pancreatic insulin regulatory balance'
    ],
    preparation: 'Strict overnight fasting of 8 to 10 hours is necessary. Plain drinking water is allowed; avoid tea, coffee, smoking, or morning lozenges.'
  },
  {
    id: 'lft-kft-combo',
    name: 'Liver & Kidney Function Test (LFT & KFT)',
    abbreviation: 'LFT & KFT Combo',
    subtitle: 'Dual vital organ comprehensive screening',
    parametersCount: 28,
    parametersText: '28 Parameter(s) Covered',
    categories: ['all', 'liver', 'kidney', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Serum (Plain/Gel Tube)',
    iconType: 'dual-organs',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'A dual organ biochemistry panel consolidating complete liver enzymes, biliary pigments, renal waste filtration, and electrolyte metrics into a single blood draw.',
    whyNeeded: 'Ideal for annual preventive health reviews, pre-anesthesia clearances, multi-system chronic care, or when taking multiple therapeutic medications.',
    whatEvaluates: [
      'Complete Liver Panel (Bilirubin Total/Direct, SGOT, SGPT, ALP, Total Proteins, Albumin)',
      'Complete Renal Panel (Creatinine, Blood Urea, BUN, Uric Acid, eGFR)',
      'Serum Electrolyte Screen (Sodium, Potassium, Chloride, Calcium)'
    ],
    preparation: 'Fasting for 10–12 hours overnight is recommended. Drink plain water to maintain comfortable hydration prior to sample collection.'
  },
  {
    id: 'tsh',
    name: 'TSH (Thyroid Stimulating Hormone)',
    abbreviation: 'TSH',
    subtitle: 'Pituitary-thyroid regulator',
    parametersCount: 1,
    parametersText: '1 Parameter(s) Covered',
    categories: ['all', 'thyroid', 'blood'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Serum (Plain/Gel Tube)',
    iconType: 'tsh-pulse',
    image: 'assets/images/lab_sample_blood.jpg',
    whatIs: 'Measures the master pituitary hormone that stimulates the thyroid gland to release T3 and T4, serving as the most sensitive single indicator of thyroid balance.',
    whyNeeded: 'First-line clinical screen for suspected hypothyroidism or hyperthyroidism, and the primary test used to monitor and titrate thyroid replacement therapy dosage.',
    whatEvaluates: [
      'Serum Thyroid Stimulating Hormone (μIU/mL)',
      'Early detection of subtle subclinical thyroid irregularities'
    ],
    preparation: 'Fasting is not strictly required, but an early morning collection is preferred as TSH follows a natural diurnal rhythm. Notify your doctor if taking biotin.'
  },
  {
    id: 'culture-urine',
    name: 'Culture Urine',
    abbreviation: 'Urine C&S',
    subtitle: 'Bacterial identification & antibiotic sensitivity',
    parametersCount: 2,
    parametersText: '2 Parameter(s) Covered',
    categories: ['all', 'urine', 'other'],
    homeCollection: true,
    labVisit: true,
    sampleType: 'Sterile Container Urine',
    iconType: 'petri-dish',
    image: 'assets/images/lab_sample_urine.jpg',
    whatIs: 'A microbiological laboratory culture that isolates bacterial or fungal pathogens from a urine sample and determines which specific antibiotics inhibit their growth.',
    whyNeeded: 'Prescribed for recurrent or complicated urinary tract infections (UTIs), fever with flank tenderness, or when a routine urinalysis shows elevated pus cells.',
    whatEvaluates: [
      'Pathogen colony growth count (CFU/mL)',
      'Precise microorganism species identification',
      'Targeted Antibiotic Sensitivity & Resistance profile'
    ],
    preparation: 'Collect a clean-catch midstream urine sample in the sterile container provided prior to beginning any antibiotic therapy, or inform the lab if antibiotics are active.'
  }
];

// SVG Medical Icons matching the Seht reference design style
const LAB_ICONS = {
  'blood-cells': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3.5"/><circle cx="7" cy="16" r="3.5"/><circle cx="17" cy="16" r="3.5"/><path d="M10 9l-1.5 4M14 9l1.5 4M10.5 16h3"/></svg>',
  'sugar-cube': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M9.5 13.5l2.5-1.5 2.5 1.5v3l-2.5 1.5-2.5-1.5z"/><path d="M12 12v6M9.5 13.5l5 3M14.5 13.5l-5 3"/></svg>',
  'thyroid': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 6c-2 2-3 5-3 8 0 4 3 7 5 7s2-2 3-5c1 3 1 5 3 5s5-3 5-7c0-3-1-6-3-8-1-1-2-1-3 0-1 1-1 3-2 3s-1-2-2-3c-1-1-2-1-3 0z"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/><circle cx="10" cy="16" r="1"/><circle cx="14" cy="16" r="1"/></svg>',
  'flask': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v5.5L5 18a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-10.5V2"/><path d="M8.5 2h7M7 15h10"/><circle cx="10" cy="17.5" r=".75"/><circle cx="14" cy="17.5" r=".75"/></svg>',
  'liver': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14c0-5 3-9 8-10 5-1 8 3 8 7 0 5-4 9-9 9-4 0-7-2-7-6z"/><path d="M8 12c2 1 5 1 8-1M12 7v8"/></svg>',
  'clock-glucose': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/><path d="M18 4l2-2M6 4L4 2"/></svg>',
  'kidneys': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5c-3 0-5 3-5 7s2 7 5 7 3-3 3-7-1-7-3-7z"/><path d="M15 5c3 0 5 3 5 7s-2 7-5 7-3-3-3-7 1-7 3-7z"/><path d="M9 12h1M14 12h1"/></svg>',
  'heart-pulse': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 20.8l7.65-7.77.77-.78a5.4 5.4 0 0 0 0-7.67z"/><polyline points="8 12 10.5 12 12 9 13.5 15 15 12 17 12"/></svg>',
  'glucose-drop': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M12 9v5M9.5 11.5h5"/></svg>',
  'dual-organs': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="8" height="16" rx="4"/><rect x="13" y="4" width="8" height="16" rx="4"/><path d="M7 10h.01M17 10h.01M7 14h.01M17 14h.01"/></svg>',
  'tsh-pulse': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 6c-2 2-3 5-3 8 0 4 3 7 5 7s2-2 3-5c1 3 1 5 3 5s5-3 5-7c0-3-1-6-3-8-1-1-2-1-3 0-1 1-1 3-2 3s-1-2-2-3c-1-1-2-1-3 0z"/><path d="M2 12h3M19 12h3"/></svg>',
  'petri-dish': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="14" rx="9" ry="6"/><ellipse cx="12" cy="10" rx="9" ry="6"/><path d="M3 10v4c0 3.3 4 6 9 6s9-2.7 9-6v-4"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="9" r="1.5"/><circle cx="12" cy="12" r="1"/></svg>',
  'sedimentation': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><circle cx="12" cy="18" r="1.5"/></svg>',
  'sun-vitality': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
};

// Application Controller
document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.getElementById('labGrid');
  const countEl = document.getElementById('labCount');
  const searchInput = document.getElementById('labSearch');
  const clearBtn = document.getElementById('labSearchClear');
  const catContainer = document.getElementById('labCategories');
  const emptyStateEl = document.getElementById('labEmptyState');
  const emptyResetBtn = document.getElementById('labEmptyReset');

  // Modal elements
  const modal = document.getElementById('labModal');
  const modalCloseBtn = document.getElementById('labModalCloseBtn');
  const modalTestTitle = document.getElementById('modalTestTitle');
  const modalTestSubtitle = document.getElementById('modalTestSubtitle');
  const modalIconWrap = document.getElementById('modalIconWrap');
  const modalTestImg = document.getElementById('modalTestImg');
  const modalSampleType = document.getElementById('modalSampleType');
  const modalWhatIs = document.getElementById('modalWhatIs');
  const modalWhyNeeded = document.getElementById('modalWhyNeeded');
  const modalWhatEvaluates = document.getElementById('modalWhatEvaluates');
  const modalPreparation = document.getElementById('modalPreparation');

  let activeCategory = 'all';
  let searchQuery = '';
  let lastFocusedBtn = null;

  if (!gridEl) return;

  function getFilteredData() {
    const query = searchQuery.trim().toLowerCase();
    return LAB_TESTS_DATA.filter(test => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || test.categories.includes(activeCategory);
      if (!matchesCategory) return false;

      // Search filter (name, abbreviation, subtitle, whatIs)
      if (!query) return true;
      const matchName = test.name.toLowerCase().includes(query);
      const matchAbbr = test.abbreviation.toLowerCase().includes(query);
      const matchSub = test.subtitle.toLowerCase().includes(query);
      const matchWhat = test.whatIs.toLowerCase().includes(query);
      return matchName || matchAbbr || matchSub || matchWhat;
    });
  }

  function renderGrid() {
    const filtered = getFilteredData();

    if (countEl) {
      countEl.textContent = filtered.length;
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';

    gridEl.innerHTML = filtered.map(test => {
      const iconSvg = LAB_ICONS[test.iconType] || LAB_ICONS['blood-cells'];
      return `
        <article class="lab-card" data-id="${test.id}">
          <div class="lab-card__top">
            <div class="lab-card__icon-badge" aria-hidden="true">
              ${iconSvg}
            </div>
            <div class="lab-card__verified" title="Verified Diagnostic Test" aria-label="Verified diagnostic investigation">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>

          <div class="lab-card__content">
            <h3 class="lab-card__title">${test.name}</h3>
            <p class="lab-card__subtitle">${test.subtitle}</p>

            <div class="lab-card__availability">
              <span class="avail-badge">
                <svg viewBox="0 0 16 16" fill="currentColor"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>
                Home Collection
              </span>
              <span class="avail-badge">
                <svg viewBox="0 0 16 16" fill="currentColor"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>
                Lab Visit
              </span>
            </div>
          </div>

          <div class="lab-card__action">
            <button type="button" class="btn--know-more" data-test-id="${test.id}" aria-label="Know more about ${test.name}">
              <span>Know More</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12l4-4-4-4"/></svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to all Know More buttons
    gridEl.querySelectorAll('.btn--know-more').forEach(btn => {
      btn.addEventListener('click', () => {
        const testId = btn.getAttribute('data-test-id');
        openModal(testId, btn);
      });
    });
  }

  function openModal(testId, triggerBtn) {
    const test = LAB_TESTS_DATA.find(t => t.id === testId);
    if (!test || !modal) return;

    lastFocusedBtn = triggerBtn || document.activeElement;

    // Populate visual column
    modalTestTitle.textContent = test.name;
    modalTestSubtitle.textContent = test.subtitle;
    modalIconWrap.innerHTML = LAB_ICONS[test.iconType] || LAB_ICONS['blood-cells'];
    modalTestImg.src = test.image;
    modalTestImg.alt = `${test.name} clinical laboratory sample collection`;
    modalSampleType.textContent = `Sample: ${test.sampleType}`;

    // Populate information column
    modalWhatIs.textContent = test.whatIs;
    modalWhyNeeded.textContent = test.whyNeeded;
    modalPreparation.textContent = test.preparation;

    modalWhatEvaluates.innerHTML = test.whatEvaluates.map(item => `
      <li>${item}</li>
    `).join('');

    // Open modal
    modal.classList.add('lab-modal-overlay--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    if (modalCloseBtn) {
      setTimeout(() => modalCloseBtn.focus(), 100);
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('lab-modal-overlay--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedBtn && typeof lastFocusedBtn.focus === 'function') {
      lastFocusedBtn.focus();
    }
  }

  // Search input interaction
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = searchQuery.length > 0 ? 'flex' : 'none';
      }
      renderGrid();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      if (searchInput) searchInput.focus();
      renderGrid();
    });
  }

  // Category filter tabs
  if (catContainer) {
    const tabs = catContainer.querySelectorAll('.lab-category-tab, .category-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('lab-category-tab--active', 'category-tab--active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('lab-category-tab--active');
        tab.setAttribute('aria-selected', 'true');
        activeCategory = tab.getAttribute('data-cat') || 'all';
        renderGrid();
      });
    });
  }

  // Reset filter when empty
  if (emptyResetBtn) {
    emptyResetBtn.addEventListener('click', () => {
      searchQuery = '';
      activeCategory = 'all';
      if (searchInput) searchInput.value = '';
      if (clearBtn) clearBtn.style.display = 'none';

      if (catContainer) {
        catContainer.querySelectorAll('.lab-category-tab, .category-tab').forEach(t => {
          const isAll = t.getAttribute('data-cat') === 'all';
          t.classList.toggle('lab-category-tab--active', isAll);
          t.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
      }
      renderGrid();
    });
  }

  // Modal close handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('lab-modal-overlay--open')) {
      closeModal();
    }
  });

  // Initial render
  renderGrid();
});
