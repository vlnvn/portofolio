import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectChapter({ project }: { project:Project }) {
  return <section id={project.id} className={`project-chapter layout-${project.layout}`} aria-labelledby={`${project.id}-title`}><div className="chapter-copy"><p className="chapter-count">{project.index} / 06</p><h2 id={`${project.id}-title`}>{project.name}</h2><p className="project-role">{project.role}</p><p className="project-context">{project.context}</p><p className="project-summary">{project.summary}</p><div className="project-evidence">{project.evidence.map(item=><p key={item}>{item}</p>)}</div><p className="project-boundary">{project.boundary}</p><div className="project-actions">{project.caseStudy&&<Link href={project.caseStudy}>Case study</Link>}<a href={project.source} target="_blank" rel="noreferrer">{project.id==="colors"?"Instagram Reel":project.sourceAlt?"Frontend source":"Source"}</a>{project.sourceAlt&&<a href={project.sourceAlt} target="_blank" rel="noreferrer">AI/backend source</a>}</div></div><ProjectMedia project={project}/></section>;
}
