const SUBJECT_PATHS: Record<string, string> = {
  sante: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z',
  logement: 'm3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7',
  retraites: 'M12 8v4l3 2M4 5v5h5M4.5 9a8 8 0 1 1-.5 7',
  budget: 'M5 3h14v18H5ZM8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2',
  environnement: 'M20 3C9 3 3 7 5 15c2 7 15 4 15-12ZM4 21l11-11M8 17v-5m0 5h5',
  immigration: 'M4 4h16v16H4ZM9 4v16m6-11 3 3-3 3m-3-3h6',
};

export function SubjectIcon({ subject }: { subject: string }) {
  return <svg className="subject-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={SUBJECT_PATHS[subject] ?? SUBJECT_PATHS.budget} /></svg>;
}

export function HeroAtmosphere() {
  return <div className="hero-atmosphere" aria-hidden="true">
    <div className="hero-grid" />
    <div className="hero-orbit hero-orbit-far" />
    <div className="hero-orbit hero-orbit-near" />
    <div className="hero-glow hero-glow-teal" />
    <div className="hero-glow hero-glow-orange" />
    <svg className="hero-document-mark" viewBox="0 0 200 240" fill="none" focusable="false">
      <path d="M45 38 144 22l27 175-99 16Z" stroke="currentColor" />
      <path d="M28 33h108l34 34v150H28Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M136 33v34h34M52 97h91M52 119h91M52 141h58M52 163h42" stroke="currentColor" />
      <circle cx="137" cy="183" r="22" stroke="currentColor" />
      <path d="m127 183 7 7 13-14" stroke="currentColor" strokeWidth="2" />
    </svg>
  </div>;
}
