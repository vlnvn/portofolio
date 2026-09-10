import Image from "next/image";
import { siteLinks } from "@/lib/projects";
import { SignalCanvas } from "@/components/signal-form/SignalCanvas";

export function Hero() {
  return <section className="hero" id="top" aria-labelledby="intro-title"><p className="discipline">Informatics Engineering · Universitas Padjadjaran</p><h1 id="intro-title"><span>VALENSIUS</span><span>ALVEN</span></h1><p className="scope">Software, AI systems and student-led project work.</p><div className="hero-links"><a href="#kairos">View work</a><a href={siteLinks.github} target="_blank" rel="noreferrer">GitHub</a><a href={siteLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div><SignalCanvas/><div className="portrait"><Image src="/media/portrait/valensius-alven.jpg" alt="Valensius Alven seated at a desk in a dark shirt" fill sizes="(max-width: 699px) 46vw, 500px" priority/></div></section>;
}