import { useMemo, useState } from "react";
import {
  FC_LANGS,
  INTERVAL_LABELS,
  buildAnkiExport,
  buildCsvExport,
  buildCatalog,
  isDue,
  type FlashCard,
} from "../lib/flashcards";
import { saveFile } from "../lib/save";
import type { UseProgressReturn } from "../hooks/useProgress";
import { speak } from "../lib/speech";
import { mulberry32, shuffle } from "../lib/engine";
import { Flag } from "./Flag";
import { Icon } from "./Icons";
import { useToast } from "./Toasts";

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const meta = (code: string) => FC_LANGS.find((l) => l.code === code)!;

const GRADES = [
  { label: "Errei", box: 0, cls: "bg-bus border-bus text-card" },
  { label: "Difícil", box: 1, cls: "bg-mustard border-mustard text-ink" },
  { label: "Boa", box: 2, cls: "bg-leaf border-leaf text-card" },
  { label: "Fácil", box: 3, cls: "bg-teal border-teal text-card" },
];

export function FlashcardsView({ prog }: { prog: UseProgressReturn }) {
  const toast = useToast();
  const catalog = useMemo(() => buildCatalog(prog.store), [prog.store]);

  const [langFilter, setLangFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [queue, setQueue] = useState<FlashCard[] | null>(null);
  const [qi, setQi] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  const stateOf = (c: FlashCard) => prog.store.langs[c.lang]?.cards?.[c.id];

  const unlocked = useMemo(() => catalog.cards.filter((c) => c.unlocked), [catalog]);
  const filtered = useMemo(() => {
    const byLang = langFilter === "all" ? unlocked : unlocked.filter((c) => c.lang === langFilter);
    const q = norm(search.trim());
    if (!q) return byLang;
    return byLang.filter((c) => norm(c.word).includes(q) || norm(c.pt).includes(q) || norm(c.reading ?? "").includes(q));
  }, [unlocked, langFilter, search]);

  const dueCards = useMemo(() => filtered.filter((c) => isDue(stateOf(c))), [filtered, prog.store]);
  const masteredCount = unlocked.filter((c) => (stateOf(c)?.b ?? 0) >= 3).length;
  const current = queue ? queue[qi] : null;
  const currentMeta = current ? meta(current.lang) : null;

  const startSession = () => {
    if (!dueCards.length) {
      toast("Nenhum cartão para revisar agora — destrave mais palavras na rota.", "lock");
      return;
    }
    const rng = mulberry32(Date.now() & 0xffff);
    setQueue(shuffle(dueCards, rng).slice(0, 30));
    setQi(0);
    setFlipped(false);
    setSessionDone(false);
  };

  const grade = (box: number) => {
    if (!current) return;
    prog.gradeCard(current.lang, current.id, box);
    setFlipped(false);
    if (qi + 1 >= queue!.length) {
      setSessionDone(true);
      setQueue(null);
      toast("Sessão de revisão concluída. Até a próxima rodada!", "success");
    } else {
      setQi(qi + 1);
    }
  };

  const doExport = async (kind: "anki" | "csv") => {
    if (!filtered.length) {
      toast("Nenhum cartão para exportar neste filtro.", "lock");
      return;
    }
    const base = langFilter === "all" ? "todos" : langFilter;
    const name = kind === "anki" ? `rumo-cartoes-${base}-anki.txt` : `rumo-cartoes-${base}.csv`;
    const content = kind === "anki" ? buildAnkiExport(filtered) : buildCsvExport(filtered);
    try {
      await saveFile(name, content, kind === "anki" ? "text/plain" : "text/csv");
      toast(`${filtered.length} cartões exportados em ${name}`, "success");
    } catch {
      /* usuário cancelou o seletor */
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* topo */}
      <section className="fade-up relative overflow-hidden rounded-xl border-2 border-ink bg-plum p-6 text-paper shadow-print">
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="spin-slower absolute -top-24 -right-24 h-72 w-72 rounded-full border-2 border-dashed border-paper/15" />
        <div className="float-y absolute right-10 bottom-6 hidden opacity-25 md:block">
          <Icon name="cards" size={92} strokeWidth={1.2} />
        </div>
        <div className="relative">
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.24em] text-mustard uppercase">
            <Icon name="cards" size={14} strokeWidth={2.2} />
            Cartões de memória · todos os idiomas
          </p>
          <h1 className="mt-2 font-display text-[26px] leading-[1.08] font-extrabold tracking-tight sm:text-3xl">
            Cada palavra aprendida vira <span className="text-mustard">um cartão seu</span>
          </h1>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-paper/75">
            Ao concluir o vocabulário de uma semana, as palavras entram aqui; ao concluir o quiz, os verbos.
            Revise com repetição espaçada, ouça a pronúncia e exporte tudo para o <strong className="text-paper">Anki</strong>.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {[
              { n: unlocked.length, l: "aprendidas" },
              { n: dueCards.length, l: "para revisar" },
              { n: masteredCount, l: "dominadas" },
            ].map((s) => (
              <div key={s.l} className="leading-none">
                <p className="font-display text-[34px] font-extrabold text-mustard">{s.n}</p>
                <p className="mt-1 font-mono text-[9.5px] font-semibold tracking-[0.2em] text-paper/60 uppercase">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* filtros por idioma */}
      <div className="fade-up flex flex-wrap gap-1.5" style={{ animationDelay: "70ms" }}>
        <button
          onClick={() => setLangFilter("all")}
          className={`btn-press rounded-full border-2 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase transition-colors ${
            langFilter === "all" ? "border-ink bg-ink text-paper shadow-print-sm" : "border-ink/20 bg-card text-ink-soft hover:border-ink/50"
          }`}
        >
          Todos · {unlocked.length}
        </button>
        {FC_LANGS.map((l) => {
          const un = catalog.unlockedByLang[l.code] ?? 0;
          const tot = catalog.totalByLang[l.code] ?? 0;
          const active = langFilter === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setLangFilter(l.code)}
              className={`btn-press flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase transition-colors ${
                active ? "border-ink bg-ink text-paper shadow-print-sm" : "border-ink/20 bg-card text-ink-soft hover:border-ink/50"
              }`}
            >
              <Flag code={l.flag} size={15} />
              {l.name} · {un}/{tot}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* estudo */}
        <section className="fade-up rounded-xl border-2 border-ink/20 bg-card p-5 shadow-print-sm" style={{ animationDelay: "120ms" }}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-[19px] font-extrabold tracking-tight">Revisão espaçada</h2>
            {queue ? (
              <p className="font-mono text-[11px] font-semibold text-ink-soft uppercase">
                cartão {Math.min(qi + 1, queue.length)}/{queue.length}
              </p>
            ) : (
              <button
                onClick={startSession}
                disabled={!dueCards.length}
                className="btn-press flex items-center gap-1.5 rounded-lg border-2 border-ink bg-plum px-3.5 py-2 font-mono text-[11px] font-bold tracking-wide text-card uppercase shadow-print-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon name="play" size={13} strokeWidth={2.4} />
                Revisar {Math.min(dueCards.length, 30) || ""} cartões
              </button>
            )}
          </div>

          {!queue && !sessionDone && (
            <div className="mt-4 rounded-lg border-2 border-dashed border-ink/20 bg-paper px-4 py-8 text-center">
              {dueCards.length > 0 ? (
                <>
                  <p className="font-display text-[17px] font-bold">{dueCards.length} cartões em dia de revisão</p>
                  <p className="mt-1 text-[12.5px] text-ink-soft">
                    Intervalos: nova → 1 dia → 3 dias → 7 dias. Sessões de até 30 cartões.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-[17px] font-bold">Tudo revisado por agora ✦</p>
                  <p className="mt-1 text-[12.5px] text-ink-soft">
                    {unlocked.length === 0
                      ? "Conclua o Dia 1 da rota para destravar seus primeiros cartões."
                      : "Volte amanhã — ou destrave mais palavras avançando na rota."}
                  </p>
                </>
              )}
            </div>
          )}

          {sessionDone && !queue && (
            <div className="fade-up mt-4 rounded-lg border-2 border-leaf/50 bg-leaf/10 px-4 py-8 text-center">
              <p className="font-display text-[19px] font-extrabold text-leaf">Sessão concluída!</p>
              <p className="mt-1 text-[12.5px] text-ink-soft">Seus cartões foram reagendados conforme suas respostas.</p>
              <button
                onClick={startSession}
                className="btn-press mx-auto mt-4 flex items-center gap-1.5 rounded-lg border-2 border-ink bg-leaf px-4 py-2 font-mono text-[11px] font-bold tracking-wide text-card uppercase shadow-print-sm"
              >
                <Icon name="repeat" size={13} strokeWidth={2.4} />
                Estudar de novo
              </button>
            </div>
          )}

          {current && currentMeta && (
            <div className="mt-4 flex flex-col items-center">
              {/* cartão flip */}
              <div
                className="perspective-900 h-64 w-full max-w-md cursor-pointer select-none"
                onClick={() => setFlipped((f) => !f)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
              >
                <div className={`preserve-3d relative h-full w-full transition-transform duration-500 ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
                  {/* frente */}
                  <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-ink bg-paper px-5 text-center shadow-print-sm">
                    <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-ink/15 bg-card px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-ink-soft">
                      <Flag code={currentMeta.flag} size={13} />
                      {currentMeta.name}
                    </span>
                    <span className="absolute top-3 right-3 rounded-full border border-ink/15 bg-card px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em] text-ink-soft uppercase">
                      {current.kind === "verb" ? "verbo" : `S${String(current.week).padStart(2, "0")}`}
                    </span>
                    <p className="font-display text-[38px] leading-tight font-extrabold tracking-tight">{current.word}</p>
                    {current.reading && (
                      <p className="mt-1.5 font-mono text-[13px] text-ink-soft">
                        {currentMeta.readingLabel}: {current.reading}
                      </p>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(current.word, currentMeta.speech);
                      }}
                      className="mt-4 grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-card text-ink-soft transition-all hover:scale-110 hover:text-plum"
                      title="Ouvir pronúncia"
                    >
                      <Icon name="volume" size={18} strokeWidth={2} />
                    </button>
                    <p className="absolute bottom-3 font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/40 uppercase">
                      toque para virar
                    </p>
                  </div>
                  {/* verso */}
                  <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-ink bg-ink px-5 text-center text-paper [transform:rotateY(180deg)]">
                    <p className="font-mono text-[9.5px] font-bold tracking-[0.2em] text-mustard uppercase">Tradução</p>
                    <p className="mt-2 font-display text-[30px] leading-tight font-extrabold tracking-tight">{current.pt}</p>
                    <p className="mt-2 font-display text-[15px] text-paper/70">{current.word}</p>
                    {current.reading && <p className="mt-0.5 font-mono text-[12px] text-paper/55">{current.reading}</p>}
                  </div>
                </div>
              </div>

              {/* avaliação */}
              {flipped ? (
                <div className="fade-up mt-4 grid w-full max-w-md grid-cols-4 gap-2">
                  {GRADES.map((g) => {
                    const curBox = stateOf(current)?.b ?? 0;
                    const next = g.box === 2 ? Math.min(curBox + 1, 3) : g.box;
                    return (
                      <button
                        key={g.label}
                        onClick={() => grade(g.box === 2 ? Math.min(curBox + 1, 3) : g.box)}
                        className={`btn-press flex flex-col items-center rounded-lg border-2 px-2 py-2 shadow-print-sm ${g.cls}`}
                      >
                        <span className="font-mono text-[11px] font-bold tracking-wide uppercase">{g.label}</span>
                        <span className="mt-0.5 font-mono text-[9px] font-semibold opacity-80">{INTERVAL_LABELS[next]}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <button
                  onClick={() => setFlipped(true)}
                  className="btn-press mt-4 rounded-lg border-2 border-ink bg-card px-5 py-2 font-mono text-[11px] font-bold tracking-wide uppercase shadow-print-sm"
                >
                  Mostrar resposta
                </button>
              )}
            </div>
          )}
        </section>

        {/* exportação */}
        <aside className="fade-up flex flex-col gap-4" style={{ animationDelay: "170ms" }}>
          <div className="rounded-xl border-2 border-ink/20 bg-card p-5 shadow-print-sm">
            <h2 className="flex items-center gap-2 font-display text-[19px] font-extrabold tracking-tight">
              <Icon name="download" size={18} strokeWidth={2.2} className="text-teal" />
              Levar para o Anki
            </h2>
            <p className="mt-1.5 text-[12.5px] leading-snug text-ink-soft">
              Exporte os cartões do filtro atual ({filtered.length}) com frente, verso, leitura ({""}
              IPA/pinyin/romaji) e etiquetas por idioma.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => doExport("anki")}
                className="btn-press flex-1 rounded-lg border-2 border-ink bg-teal px-3 py-2 font-mono text-[11px] font-bold tracking-wide text-card uppercase shadow-print-sm"
              >
                Anki (.txt)
              </button>
              <button
                onClick={() => doExport("csv")}
                className="btn-press flex-1 rounded-lg border-2 border-ink/25 bg-card px-3 py-2 font-mono text-[11px] font-semibold tracking-wide text-ink-soft uppercase shadow-print-sm hover:border-teal hover:text-teal"
              >
                CSV
              </button>
            </div>
            <details className="mt-3 rounded-lg border-2 border-dashed border-ink/20 bg-paper px-3 py-2">
              <summary className="cursor-pointer font-mono text-[10px] font-bold tracking-[0.14em] text-ink-soft uppercase">
                Como importar no Anki
              </summary>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-[11.5px] leading-snug text-ink-soft">
                <li>No Anki: <strong className="text-ink">Arquivo → Importar</strong> e escolha o .txt.</li>
                <li>Confirme: <em>Frente, Verso, Leitura, Tags</em> (o separador tab já vem configurado).</li>
                <li>As etiquetas <span className="font-mono text-[10px]">rumo::fr::vocab</span> permitem filtrar por idioma e tipo.</li>
              </ol>
            </details>
          </div>

          {/* resumo por idioma */}
          <div className="rounded-xl border-2 border-ink/20 bg-card p-5 shadow-print-sm">
            <h2 className="font-display text-[19px] font-extrabold tracking-tight">Baralhos</h2>
            <ul className="mt-3 space-y-2.5">
              {FC_LANGS.map((l) => {
                const un = catalog.unlockedByLang[l.code] ?? 0;
                const tot = catalog.totalByLang[l.code] ?? 0;
                const pct = tot ? Math.round((un / tot) * 100) : 0;
                const due = unlocked.filter((c) => c.lang === l.code && isDue(stateOf(c))).length;
                return (
                  <li key={l.code}>
                    <div className="flex items-center gap-2">
                      <Flag code={l.flag} size={16} />
                      <span className="flex-1 font-display text-[13px] font-bold">{l.name}</span>
                      {due > 0 && (
                        <span className="rounded-full border border-plum/50 bg-plum/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-plum">
                          {due} em dia
                        </span>
                      )}
                      <span className="font-mono text-[10px] font-semibold text-ink-soft">{un}/{tot}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/8">
                      <div className="h-full rounded-full bg-plum transition-[width] duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {/* explorar */}
      <section className="fade-up rounded-xl border-2 border-ink/20 bg-card p-5 shadow-print-sm" style={{ animationDelay: "220ms" }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-[19px] font-extrabold tracking-tight">
            Explorar cartões <span className="font-mono text-[11px] font-semibold text-ink-soft">({filtered.length})</span>
          </h2>
          <div className="relative w-full sm:w-64">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar palavra, tradução ou pinyin…"
              className="w-full rounded-lg border-2 border-ink/20 bg-paper py-2 pr-3 pl-3 font-sans text-[13px] outline-none transition-colors placeholder:text-ink/35 focus:border-ink"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-8 text-center font-mono text-[12px] tracking-wide text-ink-soft uppercase">
            {unlocked.length === 0
              ? "Nenhuma palavra aprendida ainda — conclua o dia 1 da rota."
              : "Nada encontrado para esta busca."}
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.slice(0, 120).map((c) => {
              const m = meta(c.lang);
              const box = stateOf(c)?.b ?? 0;
              const cjk = c.lang === "zh" || c.lang === "ja";
              return (
                <div
                  key={c.id}
                  className="group relative flex flex-col gap-1 rounded-lg border-2 border-ink/15 bg-paper p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-ink hover:shadow-print-sm"
                >
                  {box >= 3 && (
                    <span className="absolute top-1.5 right-1.5 text-mustard" title="Dominada">
                      <Icon name="star" size={13} strokeWidth={2.4} />
                    </span>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Flag code={m.flag} size={13} />
                    <span className="font-mono text-[8.5px] font-bold tracking-[0.14em] text-ink-soft uppercase">
                      {c.kind === "verb" ? "verbo" : `sem ${String(c.week).padStart(2, "0")}`}
                    </span>
                    <button
                      onClick={() => speak(c.word, m.speech)}
                      className="ml-auto text-ink/30 transition-colors hover:text-plum"
                      title={`Ouvir (${m.speech})`}
                    >
                      <Icon name="volume" size={14} strokeWidth={2} />
                    </button>
                  </div>
                  <p className={`leading-tight font-extrabold tracking-tight ${cjk ? "font-display text-[20px]" : "font-display text-[16px]"}`}>
                    {c.word}
                  </p>
                  {c.reading && (
                    <p className="font-mono text-[10.5px] text-plum">
                      {m.readingLabel}: {c.reading}
                    </p>
                  )}
                  <p className="mt-auto border-t border-ink/10 pt-1 text-[12px] font-semibold text-ink-soft">{c.pt}</p>
                </div>
              );
            })}
          </div>
        )}
        {filtered.length > 120 && (
          <p className="mt-3 text-center font-mono text-[10px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
            Mostrando 120 de {filtered.length} — refine a busca ou exporte para ver tudo.
          </p>
        )}
      </section>
    </div>
  );
}
