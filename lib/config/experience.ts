/*
 * Source of truth: "Jordan Arya Leksana - Software Engineer Resume.pdf".
 * Newest role first inside each organization, as on the CV.
 */
export const EXPERIENCE = [
  {
    organization: "PT Pertamina EP Cepu",
    shortName: "Pertamina",
    location: "Cepu, Central Java",
    roles: [{
      title: "AI Engineer Intern",
      period: "Jan 2025 – May 2025",
      contributions: [
        "Built an LSTM-Autoencoder anomaly-detection pipeline in Python and TensorFlow on multivariate sensor data from three industrial solvent pumps, flagging early signs of mechanical-seal failure and contributing to zero lost production hours on the monitored pump.",
        "Processed 5,000+ anomaly events, validated them with field operators, and trained a supervised classifier that categorized them at 85% validation accuracy.",
        "Turned pump specifications and operator knowledge into a rule-based early-warning and prescriptive-maintenance layer, with estimated potential cost savings of up to USD 476K.",
        "Contributed to the methodology, experiments and manuscript later presented as SPE-224966-MS (LEADS).",
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
          "Designed the end-to-end architecture of the TETA smart-farming system: React Native mobile app, backend server, ESP32–LoRa–MQTT communication and Raspberry Pi edge devices.",
          "Shipped it to a 1-hectare rice field in Tuban, East Java (5 IoT nodes): real-time pH, NPK, EC, temperature and humidity monitoring plus 24/7 YOLOv5 computer-vision bird-pest deterrence, reducing fertilizer waste and manual field guarding.",
          "Wrote the user guide (registered copyright No. 001036674) so non-technical farmers can run the system on their own.",
        ],
        technologies: ["React Native", "MQTT", "LoRa", "ESP32", "Raspberry Pi", "YOLOv5"],
      },
      {
        title: "IT Project Manager",
        period: "Jan 2025 – Jul 2025",
        contributions: [
          "Led delivery of ECS Website 2.0 and the EPTA event dashboard with a cross-functional team of developers and designers, owning scope, sprint planning and timelines in an Agile process.",
        ],
        technologies: ["Agile / Scrum", "Sprint planning", "Requirements"],
      },
      {
        title: "Frontend Tech Lead",
        period: "Jun 2024 – Nov 2024",
        contributions: [
          "Led frontend development of the ECS website and the EPTA event portal in Next.js and Tailwind CSS, serving 100+ event participants.",
          "Built reusable UI components and integrated REST APIs for authentication, registration, module and certificate uploads, assignments and task submissions.",
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
