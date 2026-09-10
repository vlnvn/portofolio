import { AdaptiveNav } from "@/components/portfolio/AdaptiveNav";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { Hero } from "@/components/portfolio/Hero";
import { ProjectChapter } from "@/components/portfolio/ProjectChapter";
import { SignalCanvas } from "@/components/signal-form/SignalCanvas";
import { projects } from "@/lib/projects";
export default function Home(){return <><a className="skip-link" href="#main">Skip to content</a><AdaptiveNav/><SignalCanvas/><main id="main"><Hero/>{projects.map(project=><ProjectChapter key={project.id} project={project}/>)}</main><ContactFooter/></>}
