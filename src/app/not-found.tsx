import type { Metadata } from "next";
import Link from "next/link";
import { StaticSignalPoster } from "@/components/signal-form/StaticSignalPoster";

export const metadata:Metadata={title:"Page not found",robots:{index:false,follow:false}};

export default function NotFound(){
  return <main className="not-found">
    <div className="not-found-mark" aria-hidden="true"><StaticSignalPoster/></div>
    <p className="chapter-count">404</p>
    <h1>That page is not here.</h1>
    <p>The project index is still available from the homepage.</p>
    <Link href="/">Return home</Link>
  </main>;
}
