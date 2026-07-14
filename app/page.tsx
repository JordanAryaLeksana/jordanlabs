import { Typography } from "@/components/ui/Typography/Typography";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Pill } from "@/components/ui/Pill";
import { ColorBlockBar } from "@/components/retro/ColorBlockBar";
import { SplitCard } from "@/components/retro/SplitCard";
import { HexGrid } from "@/components/retro/HexGrid";
import { SeatGrid } from "@/components/retro/SeatGrid";
import { PerspectiveScene } from "@/components/retro/PerspectiveScene";
import { DiagonalStripes } from "@/components/retro/DiagonalStripes";
import { PreviewCard } from "@/components/retro/PreviewCard";
import { NestedFrame } from "@/components/retro/NestedFrame";
import { KineticHeading } from "@/components/retro/KineticHeading";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-16 bg-ink-base px-6 py-16 text-text-on-dark">
      <section className="flex flex-col gap-4">
        <Typography variant="big-header" size="8xl">
          <KineticHeading text="JORDAN" />
        </Typography>
        <Typography variant="text" size="lg">
          Showcase komponen flat-retro dari components/retro/ dan components/ui/.
        </Typography>
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">ColorBlockBar</Typography>
        <ColorBlockBar icon={<span>@</span>}>
          <Typography as="span" variant="text">
            Kirim pesan
          </Typography>
        </ColorBlockBar>
        <ColorBlockBar
          barColorClassName="bg-mustard"
          textColorClassName="text-text-on-light"
          tileColorClassName="bg-cream-shape"
          icon={<span>*</span>}
        >
          <Typography as="span" variant="text">
            Highlight proyek
          </Typography>
        </ColorBlockBar>
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">SplitCard</Typography>
        <div className="grid max-w-xl grid-cols-3 gap-4">
          <SplitCard primaryColorClassName="bg-slate" secondaryColorClassName="bg-pine" />
          <SplitCard primaryColorClassName="bg-pine" secondaryColorClassName="bg-coral" />
          <SplitCard primaryColorClassName="bg-plum" secondaryColorClassName="bg-teal-dark" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">HexGrid</Typography>
        <HexGrid />
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">SeatGrid</Typography>
        <SeatGrid />
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">PerspectiveScene</Typography>
        <PerspectiveScene className="max-w-sm" />
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">DiagonalStripes</Typography>
        <DiagonalStripes className="h-24 max-w-xl" />
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">PreviewCard</Typography>
        <PreviewCard className="max-w-xs">
          <div className="h-0 w-0 border-x-[28px] border-b-[36px] border-x-transparent border-b-slate" />
        </PreviewCard>
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">NestedFrame</Typography>
        <NestedFrame className="h-40 w-40">
          <Typography variant="text" size="sm">
            fokus
          </Typography>
        </NestedFrame>
      </section>

      <section className="flex flex-col gap-3">
        <Typography variant="header">UI primitives</Typography>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Kirim CV</Button>
          <Button variant="secondary">Buka LinkedIn</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge color="pine">RAG</Badge>
          <Badge color="mustard">Baru</Badge>
          <Pill active>Aktif</Pill>
          <Pill>Nonaktif</Pill>
        </div>
      </section>
    </div>
  );
}
