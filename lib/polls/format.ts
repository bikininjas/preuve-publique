export const pollDate = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString('fr-FR', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });
export const pollScore = (score: number) => `${score.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} %`;
