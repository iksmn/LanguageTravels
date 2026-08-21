import { GROUP_PRINCIPLES, type Character } from "../data/cast";
import { castList, groupQuote, langMeta, weeks } from "../data/content";
import { Avatar } from "./Avatar";
import { Icon } from "./Icons";

/** Semanas (do currículo ativo) em que o personagem aparece. */
const weeksForChar = (id: string): number[] =>
  weeks()
    .filter((w) => w.cast.includes(id))
    .map((w) => w.num);

function CharacterCard({ char, index, onOpenWeek }: { char: Character; index: number; onOpenWeek: (w: number) => void }) {
  const first = char.name.split(" ")[0];
  return (
    <article
      className="fade-up group relative flex flex-col overflow-hidden rounded-xl border-2 border-ink/20 bg-card shadow-print-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-print"
      style={{ animationDelay: `${140 + index * 80}ms` }}
    >
      <div className="absolute top-0 left-0 h-1.5 w-full transition-all duration-300 group-hover:h-2" style={{ background: char.color }} />
      <div className="flex items-start gap-3.5 p-4 pb-3">
        <span className="shrink-0 rounded-full ring-2 ring-paper transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
          <Avatar char={char} size={74} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h3 className="font-display text-[18px] leading-tight font-extrabold tracking-tight">{char.name}</h3>
            <span className="font-mono text-[10px] font-semibold text-ink-soft">{char.age} ans</span>
          </div>
          <p className="mt-0.5 text-[13px] leading-snug font-semibold" style={{ color: char.color }}>
            {char.profFr}
          </p>
          <p className="text-[12px] text-ink-soft">{char.profPt}</p>
          <p className="mt-1 flex items-center gap-1 font-mono text-[10px] font-semibold tracking-wide text-ink-soft uppercase">
            <Icon name="pin" size={11} strokeWidth={2.4} />
            {char.city}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 px-4">
        {char.traits.map((t) => (
          <span
            key={t.fr}
            title={t.pt}
            className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold"
            style={{ borderColor: `${char.color}55`, color: char.color, background: `${char.color}0d` }}
          >
            {t.fr}
          </span>
        ))}
      </div>

      <ul className="mt-3 space-y-1 px-4">
        {char.interests.map((i) => (
          <li key={i.fr} className="flex items-baseline gap-2 text-[12.5px]">
            <span className="font-mono text-[10px] font-bold" style={{ color: char.color }}>
              ›
            </span>
            <span className="font-semibold">{i.fr}</span>
            <span className="text-ink-soft">· {i.pt}</span>
          </li>
        ))}
      </ul>

      <blockquote className="mx-4 mt-3 border-l-2 pl-3 italic" style={{ borderColor: char.color }}>
        <p className="font-display text-[13.5px] leading-snug">« {char.quote.fr} »</p>
        <p className="mt-0.5 text-[11.5px] text-ink-soft">{char.quote.pt}</p>
      </blockquote>

      <div className="mt-auto flex items-center justify-between gap-2 border-t-2 border-dashed border-ink/12 px-4 py-2.5">
        <p className="font-mono text-[9.5px] font-semibold tracking-[0.14em] text-ink-soft uppercase">Complices</p>
        <div className="flex items-center gap-1">
          {char.complices.map((n) => (
            <span key={n} className="rounded-full border border-ink/15 bg-paper px-2 py-0.5 font-mono text-[10px] font-semibold text-ink-soft">
              {n}
            </span>
          ))}
          <span className="mx-1 h-3 w-px bg-ink/15" />
          {weeksForChar(char.id).map((w) => (
            <button
              key={w}
              onClick={() => onOpenWeek(w)}
              className="btn-press rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold shadow-print-sm"
              style={{ background: char.color, color: "#fffdf4" }}
              title={`Ver a semana ${w} no mapa`}
            >
              S{String(w).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

export function CastView({ onOpenWeek }: { onOpenWeek: (week: number) => void }) {
  return (
    <div className="flex flex-col gap-5">
      {/* abertura */}
      <section className="fade-up relative overflow-hidden rounded-xl border-2 border-ink bg-navy p-5 text-paper shadow-print sm:p-7">
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.24em] text-mustard uppercase">
              <Icon name="users" size={14} strokeWidth={2.2} />
              Les compagnons de voyage
            </p>
            <h1 className="mt-2 font-display text-[26px] leading-[1.08] font-extrabold tracking-tight sm:text-3xl">
              Seis amigos, uma rota de {langMeta().name.toLowerCase()}, <span className="text-mustard">liberdade para aprender junto</span>
            </h1>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-paper/80">
              Eles se cruzam entre observatórios, bistrôs, estádios e terraços ao longo de toda a rota. Sem ciúmes, sem
              rivalidade — amizade profunda, apoio mútuo e conexões que fluem no tempo certo. Conheça quem vai acompanhar
              você nos próximos 90 dias.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {GROUP_PRINCIPLES.map((p) => (
                <span key={p.fr} title={p.pt} className="rounded-full border border-paper/25 bg-paper/10 px-3 py-1 font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase">
                  {p.fr}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 lg:pl-4">
            <div className="relative rounded-xl border-2 border-paper/20 bg-paper/8 p-5 text-center" style={{ background: "rgba(255,253,244,0.07)" }}>
              <div className="flex -space-x-2.5 justify-center">
                {castList().map((c) => (
                  <span key={c.id} className="rounded-full ring-2 ring-navy transition-transform duration-200 hover:-translate-y-1.5 hover:rotate-3">
                    <Avatar char={c} size={44} />
                  </span>
                ))}
              </div>
              <p className="mt-3 font-display text-[15px] font-bold italic">« {groupQuote().fr} »</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-paper/60 uppercase">{groupQuote().pt}</p>
            </div>
          </div>
        </div>
      </section>

      {/* elenco */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {castList().map((c, i) => (
          <CharacterCard key={c.id} char={c} index={i} onOpenWeek={onOpenWeek} />
        ))}
      </div>

      <p className="px-1 text-[12px] text-ink-soft italic">
        Os seis aparecem nos diálogos das semanas — procure os avatares ao lado de cada fala. Na semana 12, em Ajaccio, o grupo inteiro se despede com você.
      </p>
    </div>
  );
}
