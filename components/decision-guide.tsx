'use client';

import Link from 'next/link';
import { useState } from 'react';
import { VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';
import { decisionNotebook, decisionRoutes, type DecisionPerson } from '@/lib/decision-guide';

export function DecisionGuide({ people }: { people: DecisionPerson[] | null }) {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [candidates, setCandidates] = useState(['', '', '']);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [downloaded, setDownloaded] = useState(false);
  const available = people ?? [];
  const selectedPeople = candidates.flatMap((id) => available.filter((person) => person.id === id));
  const routes = decisionRoutes(subjects, candidates, available.map((person) => person.id));

  const selectSubject = (id: string) => {
    setSubjects((current) => current.includes(id) ? current.filter((value) => value !== id) : current.length < 3 ? [...current, id] : current);
    setDownloaded(false);
  };
  const download = () => {
    const file = new Blob([decisionNotebook(routes, selectedPeople, notes)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mon-carnet-preuve-publique.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  };

  return <div className="decision-workspace">
    <div className="decision-choices">
      <section aria-labelledby="decision-subjects-title">
        <div className="eyebrow">01 · Partir de ce qui vous importe</div>
        <h2 id="decision-subjects-title">Vos sujets, vos questions.</h2>
        <p id="decision-subjects-help">Choisissez un à trois sujets pour commencer. Vous pourrez en explorer d’autres ensuite.</p>
        {subjects.length ? <nav className="decision-waypoints" aria-label="Étapes de mon parcours"><a href="#mes-personnes">Choisir des personnes →</a><a href="#mon-carnet">Voir mon carnet →</a></nav> : null}
        <div className="decision-subjects">{VOTE_SUBJECT_GROUPS.map((group) => <fieldset key={group.id} aria-describedby="decision-subjects-help decision-selection-status">
          <legend>{group.label}</legend>
          {group.subjects.map((subject) => <label key={subject.id}>
            <input type="checkbox" checked={subjects.includes(subject.id)} disabled={subjects.length === 3 && !subjects.includes(subject.id)} onChange={() => selectSubject(subject.id)} />
            <span>{subject.label}</span>
          </label>)}
        </fieldset>)}</div>
        <p className="hint" id="decision-selection-status" role="status">{subjects.length} / 3 sujets choisis.{subjects.length === 3 ? ' Décochez un sujet pour en choisir un autre.' : ''}</p>
      </section>

      <section className="decision-people" id="mes-personnes" aria-labelledby="decision-people-title">
        <div className="eyebrow">02 · Mettre les mêmes pièces côte à côte</div>
        <h2 id="decision-people-title">Qui souhaitez-vous examiner ?</h2>
        <p>Vous pouvez choisir jusqu’à trois personnes, ou commencer par les scrutins seuls.</p>
        {people === null ? <p className="empty">La liste des personnes est temporairement indisponible. Votre parcours par sujet reste utilisable.</p>
          : people.length === 0 ? <p className="empty">Aucune personne testée n’est disponible dans le corpus publié.</p>
          : <><div className="decision-person-inputs">{candidates.map((candidate, index) => <label key={index}>
            Personne {index + 1}<select value={candidate} onChange={(event) => {
              setCandidates((current) => current.map((value, slot) => slot === index ? event.target.value : value));
              setDownloaded(false);
            }}><option value="">À choisir, si vous le souhaitez</option>{available.map((person) => <option key={person.id} value={person.id} disabled={candidates.includes(person.id) && candidate !== person.id}>{person.name}</option>)}</select>
          </label>)}</div><p className="hint">Personnes citées dans les sondages de 2027, par ordre alphabétique. Figurer ici n’établit pas une candidature officielle. Leurs bulletins peuvent être absents du corpus.</p></>}
      </section>
    </div>

    <section className="decision-itinerary" id="mon-carnet" aria-labelledby="decision-itinerary-title">
      <div className="eyebrow">03 · Une feuille de route, à votre rythme</div>
      <h2 id="decision-itinerary-title">Votre carnet de choix</h2>
      <p className="decision-private-note">Vos notes restent dans cette page, sans envoi ni sauvegarde par le site. Téléchargez le carnet avant de quitter la page pour les conserver.</p>
      <p className="hint">Les pièces s’ouvrent dans un nouvel onglet pour garder votre carnet sous les yeux.</p>
      {routes.length ? <div className="decision-route-list">{routes.map((route) => <article key={route.id}>
        <h3>{route.label}</h3>
        <div className="decision-route-links">
          <Link href={route.votes} prefetch={false} target="_blank" rel="noopener noreferrer"><span>Lire ce qui a été soumis au vote</span><b aria-hidden="true">↗</b></Link>
          <Link href={route.comparison} prefetch={false} target="_blank" rel="noopener noreferrer"><span>{selectedPeople.length ? 'Comparer les bulletins personnels' : 'Choisir des personnes à comparer'}</span><b aria-hidden="true">↗</b></Link>
          <Link href={route.parties} prefetch={false} target="_blank" rel="noopener noreferrer"><span>Comparer deux partis sur ce sujet</span><b aria-hidden="true">↗</b></Link>
        </div>
        <label className="decision-note">Ma question et ce qu’il reste à vérifier — {route.label}
          <textarea rows={3} maxLength={2000} value={notes[route.id] ?? ''} placeholder="Le changement précis qui m’intéresse, un lien vers une pièce, mes doutes…" onChange={(event) => {
            setNotes((current) => ({ ...current, [route.id]: event.target.value }));
            setDownloaded(false);
          }} />
        </label>
      </article>)}</div> : <div className="decision-start"><span aria-hidden="true">↖</span><p>Choisissez un premier sujet : les liens vers les scrutins et leur comparaison apparaîtront ici.</p></div>}
      <button type="button" className="button" disabled={!routes.length} onClick={download}>Télécharger mon carnet <span aria-hidden="true">↓</span></button>
      <p className="hint" role="status">{downloaded ? 'Carnet préparé pour téléchargement. Il contient vos notes et les liens de votre parcours.' : 'Fichier texte, modifiable et imprimable sur votre appareil.'}</p>
      {routes.length ? <details className="decision-copy"><summary>Afficher le carnet à copier</summary><label>Carnet texte<textarea readOnly rows={10} value={decisionNotebook(routes, selectedPeople, notes)} onFocus={(event) => event.currentTarget.select()} /></label><p className="hint">Vous pouvez aussi copier ce texte dans un document sur votre appareil.</p></details> : null}
    </section>
  </div>;
}
