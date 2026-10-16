/**
 * Bandeau de télémétrie : les chiffres bruts du registre, en une ligne, sans
 * mise en scène. Chaque valeur est comptée à la lecture des dossiers publiés —
 * aucune n'est estimée, et une valeur qui ne se compte pas ne figure pas ici.
 */
export default function TelemetryBand({
  items,
}: {
  items: { label: string; value: string; title?: string }[];
}) {
  return (
    <dl className="pp-telemetry pp-marks">
      {items.map((item) => (
        <div key={item.label} className="pp-telemetry__item">
          <dt>{item.label}</dt>
          <dd title={item.title}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
