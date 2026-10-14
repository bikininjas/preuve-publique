/** Lecture minimale des drapeaux de ligne de commande. */
export function truthyFlag(name: string): boolean {
  return process.argv.includes(name);
}
