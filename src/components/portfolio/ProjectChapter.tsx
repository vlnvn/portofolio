import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectMedia } from "./ProjectMedia";
import { StaticSignalPoster } from "@/components/signal-form/StaticSignalPoster";
export function ProjectChapter({ project }: { project:Project }) {
  return <section id={project.id} className={`project-chapter layout-${project.layout}`} aria-labelledby={`${project.id}-title`}><div className="chapter-copy"><p className="chapter-count">{project.index} / 06</p><h2 id={`${project.id}-title`}>{project.name}</h2><p className="project-role">{project.role}</p><p className="project-context">{project.context}</p><p className="project-summary">{project.summary}</p><div className="project-evidence">{project.evidence.map(item=><p key={item}>{item}</p>)}</div><p className="project-boundary">{project.boundary}</p><div className="project-actions">{project.caseStudy&&<Link href={project.caseStudy}>Case study</Link>}<a href={project.source} target="_blank" rel="noreferrer">{project.id==="colors"?"Instagram Reel":"Source"}</a>{project.id==="sambut"&&<a href="https://github.com/danial-computer/sambut-ai" target="_blank" rel="noreferrer">AI source</a>}</div></div><ProjectMedia project={project}/><div className="chapter-signal"><StaticSignalPoster state={Number(project.index)}/></div></section>;
}
