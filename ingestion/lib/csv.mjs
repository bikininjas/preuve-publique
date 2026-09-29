// Small RFC 4180 CSV scanner for the Sénat open-data files: ';' delimiter,
// quoted fields, doubled quotes inside quoted fields, newlines inside quotes.

/**
 * @param {string} text
 * @param {string} delimiter
 * @returns {string[][]}
 */
export function parseCsv(text, delimiter = ';') {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let sawAny = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 1; }
        else inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') { inQuotes = true; sawAny = true; continue; }
    if (char === delimiter) { row.push(field); field = ''; sawAny = true; continue; }
    if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      if (field !== '' || row.length || sawAny) { row.push(field); rows.push(row); }
      row = []; field = ''; sawAny = false;
      continue;
    }
    field += char;
    sawAny = true;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/** CSV rows → objects keyed by header cell, values trimmed. */
export function rowsToObjects(rows) {
  if (!rows.length) return [];
  const header = rows[0].map((cell) => cell.trim());
  return rows.slice(1).map((cells) => {
    const object = {};
    header.forEach((key, index) => { object[key] = (cells[index] ?? '').trim(); });
    return object;
  });
}
