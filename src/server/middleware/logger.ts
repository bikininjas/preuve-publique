/**
 * Journalisation structurée, au format attendu par Google Cloud Logging : une
 * ligne JSON par événement, avec le champ `severity` sur stdout (ou stderr pour
 * les erreurs), sans dépendance externe.
 *
 * Aucun `console.log` brut ailleurs dans le code serveur : un message non
 * structuré est illisible pour les filtres et les alertes de Cloud Logging, et
 * c'est exactement ce qu'on veut éviter ici.
 */

export type Severity = "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL";

type Fields = Record<string, unknown>;

const SECRETS = [
  /postgres(?:ql)?:\/\/[^\s"']+/gi,
  /eyJ[A-Za-z0-9_-]{20,}/g,
  /service_role[^\s"']*/gi,
];

function scrub(line: string): string {
  return SECRETS.reduce((current, pattern) => current.replace(pattern, "[redacted]"), line);
}

function emit(severity: Severity, message: string, fields: Fields): void {
  const payload = {
    severity,
    message,
    service: "preuve-publique",
    timestamp: new Date().toISOString(),
    ...fields,
  };
  let line: string;
  try {
    line = JSON.stringify(payload);
  } catch {
    line = JSON.stringify({ severity, message, service: "preuve-publique" });
  }
  const safe = scrub(line);
  if (severity === "ERROR" || severity === "CRITICAL") {
    process.stderr.write(`${safe}\n`);
  } else {
    process.stdout.write(`${safe}\n`);
  }
}

export const log = {
  debug: (message: string, fields: Fields = {}) => emit("DEBUG", message, fields),
  info: (message: string, fields: Fields = {}) => emit("INFO", message, fields),
  warn: (message: string, fields: Fields = {}) => emit("WARNING", message, fields),
  error: (message: string, fields: Fields = {}) => emit("ERROR", message, fields),
  critical: (message: string, fields: Fields = {}) => emit("CRITICAL", message, fields),
};

export const logger = log;
