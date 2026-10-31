/**
 * Arovia Healthcare — Home Care Services Central Dataset
 * Source of truth: AROVIA_A4_Trifold_Leaflet (2)(1).pdf
 * Contains all 8 core Home Care services (01-08) categorized into Clinical Care and Non-Clinical Care.
 */

const HOME_CARE_SERVICES = [
  // ==========================================
  // CLINICAL CARE SERVICES (01, 02, 03, 04)
  // ==========================================
  {
    id: 'nursing-care',
    number: '01',
    category: 'Clinical Care',
    categoryType: 'clinical',
    title: 'Home-based Nursing Care',
    slug: 'home-based-nursing-care',
    tagline: 'CLINICAL IN-HOME NURSING & MEDICAL MONITORING',
    shortDesc: 'Clinical support in the familiarity of home: vital-sign monitoring, medication administration, and skilled wound and catheter care.',
    intro: 'Clinical support in the familiarity of home. Our qualified registered nurses deliver physician-prescribed medical treatments, systematic vital-sign observations, and skilled nursing interventions to ensure continuous, safe healing in comfortable surroundings.',
    image: 'assets/images/nurse_clinical.jpg',
    imageAlt: 'Arovia registered nurse checking vital signs with blood pressure monitor and stethoscope for a patient at home',
    icon: 'medical-cross',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>',
    keyFeatures: [
      'Vital-sign monitoring and clinical observations',
      'Medication administration & injections as prescribed',
      'Wound care, dressings & surgical suture hygiene',
      'Catheter, tube & medical recovery line management',
      'Saline, electrolyte & infusion therapy support',
      'Treating physician coordination & clinical logging'
    ],
    bullets: [
      'Clinical support in the familiarity of home',
      'Vital-sign monitoring and care observations',
      'Medication administration and injections as prescribed',
      'Wound, catheter and feeding-tube care as advised'
    ],
    whoIsItFor: [
      'Patients recovering from major surgical procedures requiring sterile wound dressings or drain maintenance.',
      'Individuals receiving physician-prescribed intravenous (IV), intramuscular (IM), or subcutaneous therapies.',
      'Patients with chronic medical conditions requiring daily vital-sign logging and clinical observation.',
      'Individuals requiring sterile Foley urinary catheter or Ryle\'s feeding tube maintenance at home.'
    ],
    eligibility: [
      'Active prescription or formal treatment orders from a licensed treating physician.',
      'Clear clinical instructions outlining required medication dosages and treatment duration.',
      'Safe, accessible household recovery setting with adequate lighting and clean water.',
      'Family member or responsible adult present during clinical nursing visits.'
    ],
    carePlanning: 'All home nursing care is delivered strictly in accordance with your primary doctor\'s written prescription and clinical oversight. Our coordinator verifies your requisition slip, prescription details, and nurse availability before confirming care.',
    clinicalDistinction: 'Home nursing is not an emergency service. Sudden worsening, severe respiratory distress, or acute trauma requires immediate hospital emergency services. Registered nurses do not alter prescribed medications independently.',
    processSteps: [
      { step: '1', title: 'Share Doctor\'s Prescription', desc: 'Call our care desk with your treating physician\'s written orders and clinical treatment summary.' },
      { step: '2', title: 'Clinical Coordination', desc: 'Our coordinator verifies nurse qualifications, procedure requirements, and schedules preferred visit slots.' },
      { step: '3', title: 'In-Home Nursing Care', desc: 'Registered nurse arrives on schedule to deliver sterile treatments, log vitals, and coordinate with your doctor.' }
    ]
  },
  {
    id: 'physiotherapy',
    number: '02',
    category: 'Clinical Care',
    categoryType: 'clinical',
    title: 'Physiotherapy & Rehabilitation',
    slug: 'physiotherapy-rehabilitation',
    tagline: 'TARGETED PHYSICAL REHABILITATION & MOBILITY RESTORATION',
    shortDesc: 'Individual support for movement and daily function: assessment by a physiotherapist, exercise plans, and stroke rehabilitation.',
    intro: 'Individual support for movement and daily function. Qualified physiotherapists visit your home to assess mobility, reduce joint and muscle pain, and guide progressive physical recovery through structured, individualized therapeutic exercise plans.',
    image: 'assets/images/physiotherapy_home.jpg',
    imageAlt: 'Arovia physiotherapist guiding an adult patient through home mobility and resistance band rehabilitation exercises',
    icon: 'physio-movement',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/></svg>',
    keyFeatures: [
      'Comprehensive mobility & musculoskeletal assessment',
      'Post-surgery & joint replacement physical therapy',
      'Neurological stroke recovery & motor retraining',
      'Targeted gait training, balance & fall prevention',
      'Pain relief, joint mobilization & muscle strengthening',
      'Customized home exercise regimens & family guidance'
    ],
    bullets: [
      'Individual support for movement and daily function',
      'Assessment by a qualified physiotherapist',
      'Exercise plans for mobility and strength',
      'Post-surgery / stroke rehabilitation as advised'
    ],
    whoIsItFor: [
      'Patients recovering from joint replacement surgeries (total knee or hip replacement).',
      'Individuals undergoing neurological rehabilitation to restore balance and motor control following a stroke.',
      'Seniors experiencing reduced joint flexibility, muscle weakness, or chronic lower back and neck stiffness.',
      'Patients recovering from fractures or prolonged immobilization who need progressive gait and transfer training.'
    ],
    eligibility: [
      'Physician recommendation or clearance for active physical rehabilitation exercises.',
      'Orthopedic or neurological discharge summary outlining surgical precautions or limitations.',
      'Patient physical stamina adequate for 30–45 minute progressive movement sessions.',
      'Safe, open floor area free from trip hazards to conduct therapeutic exercises.'
    ],
    carePlanning: 'Therapy frequency and intensity are established following an initial in-home assessment by the physiotherapist, tailored to the patient\'s clinical stamina and orthopedic goals.',
    clinicalDistinction: 'All rehabilitation exercises are conducted under treating physician advice. Therapists do not perform invasive medical procedures or modify surgical protocols.',
    processSteps: [
      { step: '1', title: 'Initial Assessment', desc: 'Physiotherapist visits home to evaluate joint range of motion, muscle power, and functional balance.' },
      { step: '2', title: 'Targeted Plan', desc: 'A customized rehabilitation protocol is developed aligned with your orthopedic or neurological milestones.' },
      { step: '3', title: 'Progressive Sessions', desc: 'Regular guided therapy sessions with measured progression in strength, mobility, and confidence.' }
    ]
  },
  {
    id: 'post-hospitalization',
    number: '03',
    category: 'Clinical Care',
    categoryType: 'clinical',
    title: 'Post-hospitalization Care',
    slug: 'post-hospitalization-care',
    tagline: 'CONTINUOUS CLINICAL TRANSITION FROM HOSPITAL TO HOME',
    shortDesc: 'A supported transition from hospital to home: discharge plan support, post-surgery assistance, and medication routines.',
    intro: 'A supported transition from hospital to home. Navigating the crucial first weeks following hospital discharge requires careful coordination of recovery instructions, medication timetables, and gradual physical recuperation in familiar home surroundings.',
    image: 'assets/images/bento_homecare_pristine_2x.jpg',
    imageAlt: 'Arovia home healthcare nurse smiling with a recovering post-hospitalization patient at home',
    icon: 'hospital-recovery',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm1 11h-2v2H9v-2H7v-2h2v-2h2v2h2v2z"/></svg>',
    keyFeatures: [
      'Discharge plan interpretation & clinical adherence',
      'Post-surgery wound monitoring & sterile dressings',
      'Medication schedule organization & compliance checks',
      'Vital signs observation & early warning surveillance',
      'Assisted transfer support & safe mobility in the home',
      'Follow-up appointment reminders & doctor coordination'
    ],
    bullets: [
      'A supported transition from hospital to home',
      'Support with the hospital discharge plan',
      'Post-surgery assistance and wound-care coordination',
      'Medication routines and follow-up coordination'
    ],
    whoIsItFor: [
      'Patients discharged following orthopedic, cardiac, abdominal, or general surgical procedures.',
      'Individuals transitioning home from step-down or high-dependency units needing watchful support.',
      'Families seeking guidance in implementing complicated hospital discharge instructions and medication timetables.',
      'Patients recovering stamina who need assisted mobility to prevent accidental falls during early recovery.'
    ],
    eligibility: [
      'Official hospital discharge summary and written post-discharge orders from the hospital.',
      'Medication prescription list and surgical follow-up dates documented.',
      'Stable clinical vitals suitable for non-intensive home convalescence.',
      'Dedicated recovery space with accessible bathroom facilities.'
    ],
    carePlanning: 'Have your hospital discharge summary ready when dialing our desk. We align our caregiver or nursing schedule with the doctor\'s prescribed follow-up appointments and recovery milestones.',
    clinicalDistinction: 'Post-hospitalization support operates as an extension of the hospital discharge plan. Any sudden chest pain, high fever, or unexpected bleeding requires immediate contact with your treating hospital.',
    processSteps: [
      { step: '1', title: 'Review Discharge Summary', desc: 'Share your discharge papers and physician instructions with our care coordinator.' },
      { step: '2', title: 'Recovery Schedule', desc: 'We align nursing visits, caregiver shifts, and medication timetables with your doctor\'s instructions.' },
      { step: '3', title: 'Supported Recovery', desc: 'Trained professionals ensure safe recuperation, clean wound healing, and timely medical follow-up.' }
    ]
  },
  {
    id: 'medical-support',
    number: '04',
    category: 'Clinical Care',
    categoryType: 'clinical',
    title: 'Medical Support',
    slug: 'medical-support',
    tagline: 'EQUIPMENT RENTALS, DIAGNOSTICS & CLINICAL RESOURCES',
    shortDesc: 'Equipment rentals and medicine delivery, home lab tests, sample collection, doctor visits, and ECG at home.',
    intro: 'Integrated medical supplies, diagnostics, and essential clinical resources brought straight to your doorstep. Arovia simplifies home recovery by coordinating equipment, prescription medicines, and home diagnostics on a single phone call.',
    image: 'assets/images/equipment_home_setup.jpg',
    imageAlt: 'Arovia healthcare technician and family reviewing medical equipment and clinical support setup in home bedroom',
    icon: 'medical-support-bag',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2zm-1 9h-2v2h-2v-2H7v-2h2v-2h2v2h2v2z"/></svg>',
    keyFeatures: [
      'Hospital beds, oxygen concentrators & bipap/cpap rental',
      'Bedside blood & urine sample collection by phlebotomists',
      'Prompt doorstep delivery of prescription pharmaceuticals',
      'In-home general & specialist physician consultations',
      'Portable 12-lead resting electrocardiogram (ECG) at home',
      'Suction machines, infusion stands & medical consumables'
    ],
    bullets: [
      'Coordinated medical support brought closer to home',
      'Equipment rentals and medicine delivery',
      'Home lab tests and sample collection',
      'Doctor visits and ECG at home'
    ],
    whoIsItFor: [
      'Families setting up a recovery room requiring hospital beds, oxygen concentrators, or suction units.',
      'Patients requiring periodic blood sugar, CBC, lipid, or thyroid blood tests drawn at their bedside.',
      'Homebound patients who need prompt doorstep delivery of prescription pharmaceuticals and consumables.',
      'Seniors or non-ambulatory patients who require an in-home physician consultation or portable resting 12-lead ECG.'
    ],
    eligibility: [
      'Doctor requisition for medical equipment rentals, laboratory tests, or prescription medicines.',
      'Verified delivery address and contact person available in Guntur and surrounding areas.',
      'Adequate electrical outlet capacity for powered respiratory or medical bed equipment.'
    ],
    carePlanning: 'Dial our medical desk to check equipment inventory, schedule home phlebotomy visits, or arrange prescription deliveries. Transparent charges are quoted directly over the phone.',
    clinicalDistinction: 'All medical equipment rentals and diagnostic tests require appropriate physician requisitions. Urgent life-threatening emergencies must dial emergency ambulance services.',
    processSteps: [
      { step: '1', title: 'Call Medical Desk', desc: 'Inform our coordinator about requested equipment, laboratory tests, or doctor visit requirements.' },
      { step: '2', title: 'Verification & Delivery', desc: 'Technicians deliver, install, and demonstrate medical equipment safely at your home.' },
      { step: '3', title: 'Seamless Support', desc: 'Bedside sample collection, certified lab reporting, and 24/7 equipment troubleshooting support.' }
    ]
  },

  // ==========================================
  // NON-CLINICAL CARE SERVICES (05, 06, 07, 08)
  // ==========================================
  {
    id: 'elderly-care',
    number: '05',
    category: 'Non-Clinical Care',
    categoryType: 'non-clinical',
    title: 'Elderly Care Services',
    slug: 'elderly-care-services',
    tagline: 'COMPASSIONATE SENIOR SUPPORT & EVERYDAY WELLBEING',
    shortDesc: 'Respectful support for ageing with dignity: personal care, daily routines, medication reminders, and companionship.',
    intro: 'Respectful support for ageing with dignity. Dedicated caregivers provide gentle, compassionate assistance for older adults, supporting daily personal routines, relieving family burden, and fostering safety and peace of mind at home.',
    image: 'assets/images/caregiver_daily.jpg',
    imageAlt: 'Arovia caregiver helping an older adult walk comfortably at home with everyday personal assistance',
    icon: 'heart-hands',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    keyFeatures: [
      'Gentle personal hygiene, assisted bathing & grooming',
      'Assisted indoor mobility, walking support & fall safety',
      'Timely non-clinical prompts for prescribed medicines',
      'Attentive companionship, emotional warmth & conversation',
      'Support with balanced nutrition, meal serving & fluids',
      'Family respite care for scheduled daytime or overnight shifts'
    ],
    bullets: [
      'Respectful support for ageing with dignity',
      'Personal care, grooming and daily routines',
      'Medication reminders and wellbeing checks',
      'Companionship, mobility and respite support'
    ],
    whoIsItFor: [
      'Senior citizens living at home who experience age-related fatigue, reduced mobility, or balance difficulties.',
      'Older adults living independently who benefit from friendly companionship and daily check-ins.',
      'Families seeking trusted respite support so primary family caregivers can attend to work or rest.',
      'Seniors navigating early cognitive decline, mild memory changes, or physical frailty.'
    ],
    eligibility: [
      'Senior individual requiring supportive personal care and everyday living assistance.',
      'No acute, unmanaged clinical instability requiring hospital intensive care.',
      'Agreed shift duration (day duty, night assistance, or continuous care plan).'
    ],
    carePlanning: 'Care arrangements can be customized for scheduled day shifts, overnight assistance, or ongoing daily support. Dial our care desk to discuss your loved one\'s daily routine and location in Guntur.',
    clinicalDistinction: 'Elderly care attendants provide non-clinical support. They offer timely prompts for prescribed medicines according to the doctor\'s timetable but do not alter dosages or administer injections.',
    processSteps: [
      { step: '1', title: 'Consultation Call', desc: 'Describe your senior loved one\'s daily schedule, mobility level, and specific personal care preferences.' },
      { step: '2', title: 'Caregiver Alignment', desc: 'We match a trained, background-verified attendant with the empathy and patience suited to your family.' },
      { step: '3', title: 'Warm Home Assistance', desc: 'Caregiver begins on schedule, providing respectful routine help, companionship, and constant safety.' }
    ]
  },
  {
    id: 'bedridden-care',
    number: '06',
    category: 'Non-Clinical Care',
    categoryType: 'non-clinical',
    title: 'Bedridden Patient Care',
    slug: 'bedridden-patient-care',
    tagline: 'ATTENTIVE BEDSIDE COMFORT & DIGNIFIED HYGIENE',
    shortDesc: 'Attentive assistance for people with limited mobility: position changes, bed baths, continence care, and safe transfers.',
    intro: 'Attentive assistance for people with limited mobility. Experienced patient attendants provide dedicated bedside hygiene, scheduled pressure-area repositioning, and dignified personal comfort for individuals confined to bed.',
    image: 'assets/images/homecare_bedridden.png',
    imageAlt: 'Arovia patient attendant assisting an elderly bedridden patient with comfortable positioning in bed',
    icon: 'bed-comfort',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4zm1 8h-8V9h7c1.1 0 2 .9 2 2v4zM7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3z"/></svg>',
    keyFeatures: [
      'Scheduled 2-hour pressure-area turning & comfort padding',
      'Daily assisted bed baths, skin cleansing & oral care',
      'Dignified continence management & hygienic diaper changes',
      'Safe assisted patient transfers between bed and wheelchair',
      'Patient feeding assistance, fluid logging & routine intake',
      'Bed linen changing, skin moisture barrier care & observations'
    ],
    bullets: [
      'Attentive assistance for people with limited mobility',
      'Position changes and pressure-area care',
      'Bed baths, oral hygiene and continence care',
      'Feeding, safe transfers and care observations'
    ],
    whoIsItFor: [
      'Individuals who are temporarily or permanently non-ambulatory following acute illness, fracture, or surgery.',
      'Patients at elevated risk of pressure ulcers (bedsores) requiring scheduled 2-hour repositioning.',
      'Individuals requiring dignified, assisted sponge baths, diaper hygiene, and skin protection in bed.',
      'Bed-bound seniors requiring patient feeding assistance, fluid hydration reminders, and oral hygiene.'
    ],
    eligibility: [
      'Patient confined to bed needing non-invasive physical hygiene, repositioning, and daily routines.',
      'Proper bed setup available (hospital cot and alternating-pressure air mattress recommended).',
      'Prescribed skincare creams and personal hygiene supplies accessible at the bedside.'
    ],
    carePlanning: 'Our coordinators assess patient weight, mobility constraints, and required transfer equipment (such as medical beds or air mattresses) to arrange appropriately trained attendant support.',
    clinicalDistinction: 'Attendants provide non-invasive hygiene, comfort, and transfers. Active wound debridement or surgical ulcer dressing is coordinated through our registered nurses under medical direction.',
    processSteps: [
      { step: '1', title: 'Care Assessment', desc: 'Detail the patient\'s mobility constraints, current bed setup, and hygiene requirements.' },
      { step: '2', title: 'Schedule Planning', desc: 'Determine required shift coverage (12-hour day/night or 24-hour round-the-clock attendant).' },
      { step: '3', title: 'Dedicated Bedside Care', desc: 'Attendant delivers punctual repositioning, skin moisture protection, gentle baths, and feeding.' }
    ]
  },
  {
    id: 'daily-living',
    number: '07',
    category: 'Non-Clinical Care',
    categoryType: 'non-clinical',
    title: 'Daily Living Assistance',
    slug: 'daily-living-assistance',
    tagline: 'PRACTICAL HELP FOR ACTIVITIES OF DAILY LIVING (ADLS)',
    shortDesc: 'Bathing, grooming and meal assistance, mobility support, daily physical routines, and friendly companionship.',
    intro: 'Attentive care and personal comfort for daily living. Our personal care attendants offer patient, hands-on support for activities of daily living (ADLs), ensuring personal hygiene, safety, and self-confidence in every routine.',
    image: 'assets/images/homecare_daily_living.png',
    imageAlt: 'Arovia caregiver sitting comfortably with an elderly lady on sofa during daily home living assistance',
    icon: 'daily-lifestyle',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
    keyFeatures: [
      'Hands-on support for bathing, showering & dental hygiene',
      'Help with dressing, fastening buttons & putting on shoes',
      'Assistance with meal serving, feeding & daily hydration',
      'Steady support during indoor walking & chair transfers',
      'Accompaniment to physician appointments & lab visits',
      'Friendly social interaction & encouragement in daily habits'
    ],
    bullets: [
      'Attentive care and personal comfort for daily living',
      'Bathing, grooming and meal assistance',
      'Mobility support and daily routines',
      'Companionship and appointment support'
    ],
    whoIsItFor: [
      'Individuals with arthritis, hand tremors, or reduced grip making buttons, zippers, or cutlery difficult.',
      'Patients needing steady assistance during bathroom visits and shower transfers to prevent slips.',
      'Seniors seeking a trustworthy attendant to accompany them to doctor visits or diagnostic testing centers.',
      'Adults living independently who require everyday practical help to maintain an organized home routine.'
    ],
    eligibility: [
      'Person needing non-clinical physical assistance with standard daily living routines.',
      'Clear definition of daily tasks and preferred timing for assistance.'
    ],
    carePlanning: 'Daily living assistance is completely flexible. Discuss your preferred days of the week, morning or evening hours, and specific daily chores with our telephone coordination team.',
    clinicalDistinction: 'Daily living assistance is non-clinical. Attendants assist with personal routines, nutrition, and comfort, but do not provide medical nursing or diagnosis.',
    processSteps: [
      { step: '1', title: 'Identify Routines', desc: 'List the everyday activities (showering, dressing, meals, walking) requiring steady assistance.' },
      { step: '2', title: 'Select Hours', desc: 'Choose part-time morning/evening routines or full-day assistance matching your lifestyle.' },
      { step: '3', title: 'Empowered Living', desc: 'Care attendant arrives to provide patient, dignified support that preserves independence.' }
    ]
  },
  {
    id: 'mother-newborn',
    number: '08',
    category: 'Non-Clinical Care',
    categoryType: 'non-clinical',
    title: 'Mother & Newborn Care',
    slug: 'mother-newborn-care',
    tagline: 'GENTLE POSTNATAL REST & DEDICATED INFANT HYGIENE',
    shortDesc: 'Thoughtful support for mothers and their little ones: postnatal rest, newborn bathing, diaper hygiene, and feeding guidance.',
    intro: 'Thoughtful support for mothers and their little ones. The postpartum period brings immense joy alongside physical recovery and round-the-clock newborn needs. Dedicated care attendants offer gentle, practical support so mothers can rest and bond peacefully.',
    image: 'assets/images/mother_newborn_care.jpg',
    imageAlt: 'Newborn baby wrapped in soft white blanket receiving gentle postpartum care at home',
    icon: 'baby-carriage',
    iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 7.5C18.5 5.57 16.93 4 15 4H7.13L8.4 8.44C9.17 7.86 10.12 7.5 11.16 7.5c2.39 0 4.39 1.67 4.88 3.92.74-.27 1.54-.42 2.46-.42v-3.5zm-10 13c1.38 0 2.5-1.12 2.5-2.5S9.88 15.5 8.5 15.5 6 16.62 6 18s1.12 2.5 2.5 2.5zm9 0c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5zM22 6.5l-2.07-.69L18.4 10.6C17.15 9.61 15.65 9 14 9c-.35 0-.7.03-1.04.09L10.74 2H5C3.34 2 2 3.34 2 5v1h2v8c0 1.1.9 2 2 2h1.18c.41 1.16 1.52 2 2.82 2s2.41-.84 2.82-2h2.36c.41 1.16 1.52 2 2.82 2s2.41-.84 2.82-2H22v-2h-1.15l1.15-7.5z"/></svg>',
    keyFeatures: [
      'Postnatal rest, maternal comfort & nutrition support',
      'Gentle newborn sponge baths & hygienic cord maintenance',
      'Hygienic diaper changes, skin protection & burping support',
      'Swaddling, soothing routines & safe infant sleep habits',
      'Assistance enabling restorative, uninterrupted sleep for mother',
      'Patient feeding support & routine household settling'
    ],
    bullets: [
      'Thoughtful support for mothers and their little ones',
      'Postnatal personal care and rest support',
      'Newborn bathing, hygiene and diaper care',
      'Feeding support and newborn-care guidance'
    ],
    whoIsItFor: [
      'New mothers recovering from cesarean section (C-section) or natural delivery needing physical rest.',
      'First-time parents seeking patient, hygienic guidance with baby bathing, swaddling, and cord care.',
      'Families welcoming twins or multiples needing an extra pair of experienced hands at home.',
      'Mothers experiencing postpartum fatigue who need uninterrupted restorative sleep.'
    ],
    eligibility: [
      'Mother and newborn baby discharged home in healthy, stable clinical status.',
      'Care attendants provide non-clinical maternal comfort and infant care routines.',
      'Emergency or acute pediatric questions referred directly to pediatrician.'
    ],
    carePlanning: 'Call our care coordinator prior to delivery or shortly after discharge to arrange newborn attendant visits tailored to your family\'s routine and preferred schedule.',
    clinicalDistinction: 'Postnatal attendants provide non-clinical maternal comfort and infant hygiene. Medical questions regarding newborn jaundice, pediatric illness, or surgical incisions are referred to your pediatrician or obstetrician.',
    processSteps: [
      { step: '1', title: 'Pre-Discharge Call', desc: 'Call our desk with your estimated delivery date or hospital discharge timing.' },
      { step: '2', title: 'Schedule Setup', desc: 'Arrange morning newborn bathing support or night-shift maternal rest assistance.' },
      { step: '3', title: 'Nurturing Start', desc: 'Experienced care attendant provides gentle baby hygiene and attentive care so mother can recover.' }
    ]
  }
];

// Helper: Get service by slug or id
function getHomeCareService(slugOrId) {
  if (!slugOrId) return null;
  const clean = slugOrId.toLowerCase().trim().replace(/^\/|\/$/g, '');
  return HOME_CARE_SERVICES.find(s => 
    s.slug.toLowerCase() === clean || 
    s.id.toLowerCase() === clean ||
    s.number === clean
  ) || null;
}

// Export for module or browser window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HOME_CARE_SERVICES, getHomeCareService };
}
if (typeof window !== 'undefined') {
  window.HOME_CARE_SERVICES = HOME_CARE_SERVICES;
  window.getHomeCareService = getHomeCareService;
}
