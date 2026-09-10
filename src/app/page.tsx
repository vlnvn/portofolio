import { AdaptiveNav } from "@/components/portfolio/AdaptiveNav";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { Hero } from "@/components/portfolio/Hero";
import { ProjectChapter } from "@/components/portfolio/ProjectChapter";
import { projects, siteLinks } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function Home() {
  const url=siteUrl("/").href;
  const profile={
    "@context":"https://schema.org",
    "@type":"ProfilePage",
    url,
    mainEntity:{
      "@type":"Person",
      name:"Valensius Alven",
      url,
      sameAs:[siteLinks.github,siteLinks.linkedin],
      affiliation:{"@type":"CollegeOrUniversity",name:"Universitas Padjadjaran"},
    },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(profile).replace(/</g,"\\u003c")}}/>
    <a className="skip-link" href="#main">Skip to content</a>
    <AdaptiveNav/>
    <main id="main"><Hero/>{projects.map(project=><ProjectChapter key={project.id} project={project}/>)}</main>
    <ContactFooter/>
  </>;
}
