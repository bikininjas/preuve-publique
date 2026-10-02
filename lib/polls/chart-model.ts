import type { PollResult, PollScenario, PublishedPoll } from './types.ts';

export interface PollChartPoint { poll: PublishedPoll; scenario: PollScenario; result: PollResult }
export interface PollChartCluster { key: string; date: number; score: number; points: PollChartPoint[] }
export interface PollChartSeries { id: string; name: string; points: PollChartPoint[]; clusters: PollChartCluster[]; ceiling: number }

/** Preserve every measurement, including identical coordinates from distinct scenarios. */
export function pollChartSeries(polls: PublishedPoll[], selected: string[]): PollChartSeries[] {
  return selected.flatMap((id) => {
    const points = polls.flatMap((poll) => poll.scenarios.flatMap((scenario) => scenario.results
      .filter((result) => result.candidate_external_id === id)
      .map((result) => ({ poll, scenario, result }))));
    if (!points.length) return [];
    const clusters = new Map<string, PollChartCluster>();
    for (const point of points) {
      const key = `${point.poll.fieldwork_end}/${point.result.score}`;
      const cluster = clusters.get(key) ?? { key, date: Date.parse(point.poll.fieldwork_end), score: point.result.score, points: [] };
      cluster.points.push(point);
      clusters.set(key, cluster);
    }
    const ceiling = Math.max(5, Math.ceil(Math.max(...points.map((point) => point.result.score)) / 5) * 5);
    return [{ id, name: points[0].result.candidate_name, points, clusters: [...clusters.values()].sort((a, b) => a.date - b.date || a.score - b.score), ceiling }];
  });
}
