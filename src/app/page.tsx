import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { ControlPanel } from "@/components/home/ControlPanel";
import { Beliefs } from "@/components/home/Beliefs";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { Marquee } from "@/components/home/Marquee";
import { LookingFor } from "@/components/home/LookingFor";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ControlPanel />
      <Beliefs />
      <WorkCarousel />
      <Marquee />
      <LookingFor />
    </>
  );
}
