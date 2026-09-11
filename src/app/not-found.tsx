import type { Metadata } from "next";
import Link from "next/link";
import { SignalCanvas } from "@/components/signal-form/SignalCanvas";

export const metadata:Metadata={title:"Page not found",robots:{index:false,follow:false}};

export default function NotFound(){
  return <main className="not-found">
    <div className="not-found-copy">
      <p className="chapter-count">404</p>
      <h1>That page is not here.</h1>
      <p>The project index is still available from the homepage.</p>
      <Link href="/">Return home</Link>
    </div>
    <SignalCanvas hostSelector=".not-found"/>
  </main>;
}
