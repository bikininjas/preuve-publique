// Correspondances explicites. Le nom officiel et l'identifiant sont recoupés
// à chaque import avec le référentiel AN archivé ; aucun rapprochement flou.
export const IDENTITIES = [
  ['le-pen', 'Marine Le Pen', 'PA720614'],
  ['dupont-aignan', 'Nicolas Dupont-Aignan', 'PA1206'],
  ['le-maire', 'Bruno Le Maire', 'PA331481'],
  ['philippe', 'Édouard Philippe', 'PA345619'],
  ['guedj', 'Jérôme Guedj', 'PA1567'],
  ['bertrand', 'Xavier Bertrand', 'PA267080'],
  ['hollande', 'François Hollande', 'PA1654'],
  ['melenchon', 'Jean-Luc Mélenchon', 'PA2150'],
  ['faure', 'Olivier Faure', 'PA609332'],
  ['attal', 'Gabriel Attal', 'PA722190'],
  ['roussel', 'Fabien Roussel', 'PA720692'],
  ['ruffin', 'François Ruffin', 'PA722142'],
  ['darmanin', 'Gérald Darmanin', 'PA607846'],
  ['royal', 'Ségolène Royal', 'PA2650'],
].map(([slug, name, reference]) => ({ slug, name, reference }));
