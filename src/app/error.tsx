"use client";

import Link from "next/link";
import { StaticSignalPoster } from "@/components/signal-form/StaticSignalPoster";

export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){
  return <main className="not-found error-state">
    <div className="not-found-mark" aria-hidden="true"><StaticSignalPoster/></div>
    <p className="chapter-count">Runtime error</p>
    <h1>Something went wrong.</h1>
    <p>This view could not finish rendering. Retry it, or return to the project index.</p>
    <div className="error-state-actions">
      <button type="button" onClick={reset}>Try again</button>
      <Link href="/">Return home</Link>
    </div>
  </main>;
}
