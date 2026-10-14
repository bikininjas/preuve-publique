export default function OriginNotice({ origin }: { origin: "supabase" | "seed" }) {
  if (origin === "supabase") {
    return null;
  }
  return (
    <p
      className="border-2 border-warnbd bg-warnbg px-4 py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-warnbd"
      role="status"
    >
      Supabase n&apos;est pas configuré : le site sert les dossiers de référence
      locaux. Les empreintes sont calculées sur place, et rien n&apos;est présenté
      comme lu en base.
    </p>
  );
}
