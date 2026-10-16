/**
 * Soumission IndexNow : prévient Bing (et les moteurs participants) qu'une URL
 * est nouvelle ou a changé — sans compte ni clé d'API, seulement la clé
 * publique hébergée sur le site (`public/<clé>.txt`).
 *
 * Usage :
 *   npm run indexnow                    # tout le plan de site de production
 *   npm run indexnow /dossiers/<slug>   # une ou plusieurs URL (chemins ou URL absolues)
 *
 * Le script vérifie que la clé est bien servie par le site avant d'envoyer
 * quoi que ce soit : un échec net vaut mieux qu'un 403 silencieux.
 */

const HOST = "preuve-publique.fr";
const BASE_URL = `https://${HOST}`;
const KEY = "f2ec9f80e5d2c4f6a2f959804e2e849d";
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function sitemapUrls(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`plan de site illisible : HTTP ${response.status}`);
  }
  const xml = await response.text();
  const urls: string[] = [];
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    if (match[1] !== undefined) {
      urls.push(match[1]);
    }
  }
  return urls;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2).filter((arg) => arg !== "--");
  const urls =
    args.length === 0
      ? await sitemapUrls()
      : args.map((arg) =>
          arg.startsWith("http") ? arg : `${BASE_URL}${arg.startsWith("/") ? arg : `/${arg}`}`,
        );
  if (urls.length === 0) {
    throw new Error("aucune URL à soumettre");
  }

  const keyResponse = await fetch(KEY_LOCATION);
  const served = (await keyResponse.text()).trim();
  if (!keyResponse.ok || served !== KEY) {
    throw new Error(`clé absente ou différente sur ${KEY_LOCATION} (HTTP ${keyResponse.status})`);
  }

  console.log(`IndexNow : ${urls.length} URL vers ${ENDPOINT}`);
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  if (response.status !== 200 && response.status !== 202 && response.status !== 204) {
    throw new Error(`réponse inattendue : HTTP ${response.status} ${await response.text()}`);
  }
  console.log(`IndexNow : accepté (HTTP ${response.status}) — ${urls.length} URL soumises`);
}

main().catch((error: unknown) => {
  console.error(`IndexNow : échec — ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
