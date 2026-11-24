/*
 * Source of truth: "Jordan Arya Leksana - Software Engineer CV.pdf" (Nov 2026).
 * Newest role first inside each organization, as on the CV.
 */
export const EXPERIENCE = [
  {
    organization: "PT Pertamina EP Cepu",
    shortName: "Pertamina",
    location: "Cepu, Central Java",
    roles: [{
      title: "IT Intern (extended)",
      period: "Jan 2025 – May 2025",
      contributions: [
        "Built an LSTM-Autoencoder anomaly detector in Python and TensorFlow on a year of 15-minute data from six gas-plant solvent pumps, after a 2023 seal failure had caused a USD 393K plant shutdown. It flagged 5,800+ anomalies, verified by the operations team.",
        "Trained a decision-tree classifier (73% F1, versus 12% for logistic regression) that labels each anomaly as start-up, nomination change, process change or equipment fault.",
        "Wrote a Python rule engine that checks pumps against the manufacturer's curves and is designed to raise email alerts and maintenance work orders. With the classifier, it forms the next phase of LEADS (SPE-224966-MS, estimated savings up to USD 476K).",
        "Contributed to the methodology and manuscript of SPE-224966-MS (not a listed author). The official internship ran January–February 2025; the project continued until May 2025.",
      ],
      technologies: ["Python", "TensorFlow", "LSTM Autoencoder", "Supervised classification", "Rule-based systems"],
    }],
  },
  {
    organization: "Embedded System and Cyber-Physical Laboratory (ECS), ITS",
    shortName: "ECS",
    location: "Surabaya, Indonesia",
    roles: [
      {
        title: "Deep Learning Researcher",
        period: "Dec 2025 – Jul 2026",
        contributions: [
          "Built a ResNet-based PyTorch pipeline (EMQNET, undergraduate thesis) that detects geomagnetic earthquake precursors across 25,000+ events from 24 stations in Indonesia, reaching 88.25% accuracy and 88.4% F1 and automating a manual analysis method.",
        ],
        technologies: ["Python", "PyTorch", "ResNet", "Signal processing"],
      },
      {
        title: "Software Development Lead",
        period: "Jun 2025 – Nov 2025",
        contributions: [
          "Led a 3-person software team that built TETA's software for a farmer group in Tuban: five ESP32 sensor nodes stream soil data over LoRa to a Mosquitto MQTT broker and an Expo React Native app, released as an Android APK.",
          "Automated 24/7 bird deterrence on the 1-hectare rice field: a YOLOv5n detector (82% accuracy after retraining) triggers sound and mechanical scarers, alongside real-time pH, NPK, EC, temperature and humidity monitoring.",
          "Wrote the user guide (registered copyright No. 001036674) so non-technical farmers can run the system on their own.",
        ],
        technologies: ["Expo React Native", "MQTT (Mosquitto)", "LoRa", "ESP32", "Raspberry Pi", "YOLOv5"],
      },
      {
        title: "IT Project Manager",
        period: "Jan 2025 – Jul 2025",
        contributions: [
          "Planned the scope, sprints and timeline for ECS Website 2.0 with developers and designers; the next lab cohort will build it.",
        ],
        technologies: ["Agile / Scrum", "Sprint planning", "Requirements"],
      },
      {
        title: "Frontend Tech Lead",
        period: "Jun 2024 – Nov 2024",
        contributions: [
          "Led frontend development of the ECS website and the EPTA event portal in Next.js and Tailwind CSS, serving 100+ event participants.",
          "Built reusable UI components and integrated REST APIs for authentication, registration, module and certificate uploads, assignments and task submissions.",
          "Mentored 18+ mostly first-time developers and reviewed their code.",
        ],
        technologies: ["Next.js", "React", "Tailwind CSS", "REST APIs"],
      },
    ],
  },
] as const;

export const PUBLICATIONS_AND_AWARDS = [
  "Meta Global AI Developer Hackathon 2026: solo participant (Indie track) with IntentCut.",
  "SPE-224966-MS, LEADS: Leading Equipment Anomaly Detection System. Research and technical-writing contributor.",
  "A CNN-Based Approach for Earthquake Precursor Detection Using Geomagnetic Data: first author, manuscript in preparation (2026).",
  "IoT-Based Soil Quality and Pest Monitoring for Sustainable Farming (Gapoktan Manunggal Rejeki): co-author, BIMA/ITS community-service publication (2025).",
] as const;
