import Image from "next/image";
import type { Project } from "@/lib/projects";
export function ProjectMedia({ project, priority=false }: { project:Project; priority?:boolean }) {
  return <figure className={`project-media media-${project.id}`}><div className="media-primary"><Image src={project.media.src} alt={project.media.alt} fill sizes="(max-width: 699px) calc(100vw - 32px), (max-width: 1100px) 52vw, 710px" priority={priority} style={{pointerEvents:"none"}}/></div>{project.media.secondary&&<div className="media-secondary"><Image src={project.media.secondary.src} alt={project.media.secondary.alt} fill sizes="(max-width: 699px) 42vw, 260px" style={{pointerEvents:"none"}}/></div>}<figcaption>{project.media.caption}</figcaption></figure>;
}
