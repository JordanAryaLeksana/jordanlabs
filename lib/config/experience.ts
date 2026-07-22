export const EXPERIENCE = [
  {
    organization: "PT. Pertamina EP Cepu",
    location: "Cepu, Central Java",
    roles: [{
      title: "AI Engineer Intern",
      period: "January – May 2025",
      contributions: [
        "Developed an integrated LSTM Autoencoder anomaly-detection system for solvent pumps P9027, P2025, and P9011 to identify early signs of mechanical-seal leak failures.",
        "Processed and analyzed more than 5,000 anomaly events from multivariate pump sensor data and collaborated with field operators to validate anomaly categories.",
        "Applied supervised machine learning to categorize anomalies with 85% validation accuracy.",
        "Implemented rule-based logic from pump specifications and operator knowledge to support early warnings and prescriptive maintenance actions.",
      ],
      technologies: ["Python", "TensorFlow", "LSTM Autoencoder", "Machine Learning"],
    }],
  },
  {
    organization: "Embedded System and Cyber Physical Laboratory (ECS)",
    location: "Surabaya, Indonesia",
    roles: [
      {
        title: "IT Project Manager",
        period: "March – July 2025",
        contributions: [
          "Led end-to-end development planning for ECS Website 2.0 and coordinated developers and designers through an Agile workflow.",
          "Produced a Business Requirement Document covering feature scope, technical tools, hosting costs, subdomain planning, and development priorities.",
        ],
        technologies: ["Agile planning", "ClickUp", "Requirements documentation"],
      },
      {
        title: "Tech Lead Frontend",
        period: "June – November 2024",
        contributions: [
          "Led frontend development for the ECS official website and EPTA annual event portal, supporting more than 100 event participants.",
          "Built reusable UI components and integrated REST endpoints for authentication, registration, uploads, assignments, submissions, and certificates.",
        ],
        technologies: ["Next.js", "React", "Tailwind CSS", "REST API"],
      },
    ],
  },
] as const;
