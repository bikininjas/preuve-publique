/**
 * Affiche, pour chaque dossier de référence, la chaîne canonique et l'empreinte
 * de ses preuves, plus la racine d'intégrité du dossier.
 *
 * Sert de contrôle indépendant : n'importe qui peut recalculer ce qui est
 * imprimé ici à partir des seuls champs publiés.
 */
import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import { log } from "../src/server/middleware/logger.ts";
import {
  canonicalProofText,
  computeIntegrityRoot,
} from "../src/server/services/crypto.service.ts";
import { withDerivedProofHashes } from "../src/server/validators/dossier.schema.ts";

for (const raw of publishedSeedDossiers()) {
  const dossier = withDerivedProofHashes(raw);
  const hashes: string[] = [];
  log.info(`dossier ${dossier.slug}`, {
    sources: dossier.sources.length,
    verdict: dossier.verdict,
  });
  for (const source of dossier.sources) {
    if (source.archive_sha256 !== null) {
      hashes.push(source.archive_sha256);
    }
    process.stdout.write(
      [
        `  [${source.spectrum}] ${source.source_name}`,
        `    canonique : ${canonicalProofText(source)}`,
        `    sha256    : ${source.archive_sha256}`,
        "",
      ].join("\n"),
    );
  }
  process.stdout.write(`  racine d'intégrité : ${computeIntegrityRoot(hashes)}\n\n`);
}
