import Link from 'next/link';
import { voteTopicsForTitle } from '@/lib/vote-subjects';

export function VoteTopics({ title, institution }: { title: string; institution?: string | null }) {
  const topics = voteTopicsForTitle(title);
  if (!topics.length) return null;
  const prefix = institution === 'senat' ? 'institution=senat&' : institution === 'assemblee' ? 'institution=assemblee&' : '';
  return <div className="vote-topic-paths" aria-label="Thèmes et sous-thèmes repérés dans le titre officiel">
    {topics.map(({ category, subjects }) => <div className="vote-topic-path" key={category.id}>
      <Link className="vote-topic-category" href={`/scrutins?${prefix}category=${category.id}`}>{category.label}</Link>
      <span aria-hidden="true">/</span>
      {subjects.map((subject) => <Link key={subject.id} href={`/scrutins?${prefix}subject=${subject.id}`}>{subject.label}</Link>)}
    </div>)}
    <small>Repères dans le titre · sens de la mesure à lire dans la source</small>
  </div>;
}
