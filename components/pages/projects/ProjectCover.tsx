import type { Project } from "@/lib/config/projects";

/**
 * Generated cover for projects that have no real screenshot yet.
 * Purely decorative: the project title is announced by the surrounding card.
 */
type Motif = "stack" | "server" | "signal" | "wave" | "nodes" | "phone" | "grid";

const MOTIF_BY_CATEGORY: Record<string, Motif> = {
  "Full-stack AI": "stack",
  Backend: "server",
  "Industrial AI": "signal",
  "Deep Learning": "wave",
  "IoT Mobile": "nodes",
  "Mobile Development": "phone",
};

function MotifShape({ motif }: { motif: Motif }) {
  switch (motif) {
    case "stack":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={250 + i * 14} y={150 + i * 46} width={300} height={30} rx={8} fill="none" stroke={["#e07856", "#dda83e", "#93ae86", "#5b6b8a", "#ede6d6"][i]} strokeWidth={3} />
          ))}
        </g>
      );
    case "server":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={240} y={140 + i * 78} width={320} height={58} rx={10} fill="none" stroke="#ede6d6" strokeOpacity={0.55} strokeWidth={3} />
              <circle cx={270} cy={169 + i * 78} r={7} fill={i === 1 ? "#e07856" : "#93ae86"} />
              <line x1={300} y1={169 + i * 78} x2={520} y2={169 + i * 78} stroke="#ede6d6" strokeOpacity={0.25} strokeWidth={3} strokeDasharray="10 10" />
            </g>
          ))}
        </g>
      );
    case "signal":
      return (
        <g fill="none" strokeWidth={4} strokeLinejoin="round">
          <polyline points="120,260 200,250 260,268 320,246 380,262 420,130 450,330 490,248 560,262 640,250 700,258" stroke="#ede6d6" strokeOpacity={0.7} />
          <circle cx={420} cy={130} r={18} stroke="#e07856" />
          <line x1={120} y1={200} x2={700} y2={200} stroke="#dda83e" strokeOpacity={0.5} strokeDasharray="8 10" strokeWidth={2} />
        </g>
      );
    case "wave":
      return (
        <g fill="none" strokeWidth={3}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M 100 ${220 + i * 40} C 220 ${140 + i * 40}, 300 ${300 + i * 40}, 400 ${220 + i * 40} S 600 ${140 + i * 40}, 700 ${220 + i * 40}`} stroke={["#93ae86", "#dda83e", "#e07856"][i]} strokeOpacity={0.75} />
          ))}
        </g>
      );
    case "nodes":
      return (
        <g>
          {[[260, 170], [400, 140], [540, 180], [320, 300], [480, 300]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={34} fill="none" stroke="#93ae86" strokeOpacity={0.35} strokeWidth={2} />
              <circle cx={cx} cy={cy} r={9} fill={i === 1 ? "#e07856" : "#dda83e"} />
            </g>
          ))}
          <polyline points="260,170 400,140 540,180 480,300 320,300 260,170" fill="none" stroke="#ede6d6" strokeOpacity={0.3} strokeWidth={2} strokeDasharray="6 8" />
        </g>
      );
    case "phone":
      return (
        <g>
          <rect x={330} y={110} width={140} height={250} rx={22} fill="none" stroke="#ede6d6" strokeOpacity={0.6} strokeWidth={3} />
          <rect x={350} y={160} width={80} height={26} rx={13} fill="#5b6b8a" />
          <rect x={370} y={200} width={80} height={26} rx={13} fill="#e07856" />
          <rect x={350} y={240} width={64} height={26} rx={13} fill="#5b6b8a" />
        </g>
      );
    default:
      return null;
  }
}

export function ProjectCover({ project }: { project: Pick<Project, "title" | "category"> }) {
  const motif = MOTIF_BY_CATEGORY[project.category] ?? "grid";

  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
      <rect width="800" height="450" fill="#1e1e26" />
      <g stroke="#ede6d6" strokeOpacity={0.06}>
        {Array.from({ length: 17 }, (_, i) => <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={450} />)}
        {Array.from({ length: 10 }, (_, i) => <line key={`h${i}`} x1={0} y1={i * 50} x2={800} y2={i * 50} />)}
      </g>
      <MotifShape motif={motif} />
      <text x={40} y={410} fill="#ede6d6" fillOpacity={0.9} style={{ fontFamily: "var(--font-display), sans-serif" }} fontSize={44} fontWeight={700}>
        {project.title}
      </text>
    </svg>
  );
}
