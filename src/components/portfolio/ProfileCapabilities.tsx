export function ProfileCapabilities(){
  return <section className="profile-capabilities" id="profile" aria-labelledby="profile-title">
    <div className="profile-intro">
      <p className="section-kicker">Profile</p>
      <h2 id="profile-title">Informatics Engineering student building AI and product systems.</h2>
      <p>I build software across model evaluation, data workflows, interfaces and quality engineering, with an emphasis on reproducible results and evidence-backed delivery.</p>
    </div>
    <div className="capability-grid" aria-label="Core capabilities">
      <article><p>01</p><h3>AI & Data</h3><span>Python · SQL · CatBoost · model evaluation</span></article>
      <article><p>02</p><h3>Product Engineering</h3><span>TypeScript · React / Next.js · APIs · UI engineering</span></article>
      <article><p>03</p><h3>Quality & Delivery</h3><span>Testing · accessibility · Git / CI · reproducibility</span></article>
    </div>
  </section>;
}