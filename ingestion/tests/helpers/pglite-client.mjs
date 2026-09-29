// Adapter exposing a PGlite database through the same surface as the
// node-postgres client used in production: query(text, params) → { rows, rowCount }.

export function pgliteClient(pglite) {
  return {
    driver: 'pglite',
    async query(text, params = []) {
      const result = await pglite.query(text, params);
      const hasFields = Array.isArray(result.fields) && result.fields.length > 0;
      const rowCount = hasFields
        ? result.rows.length
        : (typeof result.affectedRows === 'number' ? result.affectedRows : result.rows.length);
      return { rows: result.rows, rowCount };
    },
  };
}
