import { useEffect, useMemo, useState } from "react";
import { conjugateLang, pronouns, speechLang, verbList, weeks } from "../data/content";
import type { UseProgressReturn } from "../hooks/useProgress";
import { canSpeak, getPinnedVoice, listVoices, pinVoice, speak } from "../lib/speech";
import { Icon, type IconName } from "./Icons";

/* ---------------------- File System Access API ---------------------- */

type SavePickerWindow = Window & {
  showSaveFilePicker?: (opts: {
    suggestedName: string;
    types: { description: string; accept: Record<string, string[]> }[];
  }) => Promise<{ createWritable: () => Promise<{ write: (d: string) => Promise<void>; close: () => Promise<void> }> }>;
};

const hasSavePicker = () =>
  typeof window !== "undefined" && Boolean((window as SavePickerWindow).showSaveFilePicker);

async function saveFile(name: string, content: string, mime: string): Promise<"picker" | "download"> {
  const w = window as SavePickerWindow;
  if (w.showSaveFilePicker) {
    try {
      const handle = await w.showSaveFilePicker({
        suggestedName: name,
        types: [{ description: name, accept: { [mime]: [".json", ".txt", ".csv"].filter(() => true) } }],
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      return "picker";
    } catch (e) {
      if ((e as Error).name === "AbortError") throw e;
      // cai no fallback
    }
  }
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return "download";
}

/* ------------------------- geradores de corpus ----------------------- */

function buildCorpus(langLabel: string): string {
  const lines: string[] = [
    `# RUMO — corpus de frases · ${langLabel}`,
    `# Gerado em ${new Date().toLocaleString("pt-BR")} — use com qualquer TTS offline`,
    "",
  ];
  for (const w of weeks()) {
    lines.push(`## Semana ${String(w.num).padStart(2, "0")} — ${w.place}`);
    for (const v of w.vocab) lines.push(`${v.fr} — ${v.pt}`);
    lines.push("");
    for (const d of w.dialogue) lines.push(`${d.speaker ? d.speaker + ": " : ""}${d.fr}`);
    lines.push("");
  }
  return lines.join("\n");
}

function buildVerbCsv(): string {
  const cols = ["infinitivo", "grupo", "traducao", ...pronouns()];
  const rows = verbList().map((v) => {
    const forms = conjugateLang(v.inf) ?? [];
    return [v.inf, String(v.g), `"${v.pt.replace(/"/g, "'")}"`, ...forms.map((f) => `"${(f ?? "").replace(/"/g, "'")}"`)].join(",");
  });
  return [cols.join(","), ...rows].join("\n");
}

/* ----------------------------- card base ----------------------------- */

function Section({
  icon,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section className="fade-up rounded-xl border-2 border-ink/20 bg-card p-5 shadow-print-sm" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border-2 border-ink bg-navy text-paper shadow-print-sm">
          <Icon name={icon} size={19} strokeWidth={2} />
        </span>
        <div>
          <h2 className="font-display text-[18px] leading-tight font-extrabold tracking-tight">{title}</h2>
          <p className="text-[12.5px] text-ink-soft">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function StatusBadge({ ok, label, warn }: { ok: boolean; label: string; warn?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wide uppercase ${
        ok ? "border-leaf/50 bg-leaf/10 text-leaf" : warn ? "border-mustard/60 bg-mustard/10 text-mustard" : "border-bus/50 bg-bus/8 text-bus"
      }`}
    >
      <Icon name={ok ? "check" : warn ? "volume" : "x"} size={11} strokeWidth={2.6} />
      {label}
    </span>
  );
}

/* ------------------------------ view --------------------------------- */

const TEST_PHRASES: Record<string, string> = {
  fr: "Bonjour ! Les étoiles brillent ce soir.",
  it: "Ciao! Le stelle brillano stasera.",
  de: "Hallo! Die Sterne funkeln heute Abend.",
  es: "¡Hola! Las estrellas brillan esta noche.",
  en: "Hello! The stars are shining tonight.",
  zh: "你好！今晚星星很亮。",
  ja: "こんにちは！今夜は星がきれいです。",
  ru: "Привет! Сегодня звёзды яркие.",
  fa: "سلام! امشب ستاره‌ها می‌درخشند.",
  ar: "مرحبًا! النجوم ساطعة الليلة.",
};

export function OfflineView({ prog }: { prog: UseProgressReturn }) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [pinned, setPinned] = useState<Record<string, string | null>>({});
  const [fontsOk, setFontsOk] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const lang = prog.lang ?? "fr";
  const code = lang.slice(0, 2);
  const langLabel =
    code === "fr"
      ? "Francês"
      : code === "it"
        ? "Italiano"
        : code === "de"
          ? "Alemão"
          : code === "es"
            ? "Espanhol"
            : code === "en"
              ? "Inglês"
              : code === "zh"
                ? "Mandarim"
                : code === "ja"
                  ? "Japonês"
                  : code === "ru"
                    ? "Russo"
                    : code === "fa"
                      ? "Farsi"
                      : "Árabe";

  useEffect(() => {
    listVoices().then((vs) => {
      setVoices(vs);
      setPinned({
        fr: getPinnedVoice("fr-FR"),
        it: getPinnedVoice("it-IT"),
        de: getPinnedVoice("de-DE"),
        es: getPinnedVoice("es-ES"),
        en: getPinnedVoice("en-GB"),
        zh: getPinnedVoice("zh-CN"),
        ja: getPinnedVoice("ja-JP"),
        ru: getPinnedVoice("ru-RU"),
        fa: getPinnedVoice("fa-IR"),
        ar: getPinnedVoice("ar-SA"),
      });
    });
    const t = window.setTimeout(() => {
      if (typeof document !== "undefined" && document.fonts?.check) {
        setFontsOk(document.fonts.check('16px "Instrument Sans"') || document.fonts.check("16px sans-serif"));
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [lang]);

  const voicesFor = useMemo(
    () => voices.filter((v) => v.lang.toLowerCase().startsWith(code)).slice(0, 12),
    [voices, code],
  );
  const localCount = voicesFor.filter((v) => v.localService).length;

  const doSave = async (kind: "corpus" | "verbs" | "backup") => {
    setBusy(kind);
    try {
      let name = "";
      let content = "";
      let mime = "text/plain";
      if (kind === "corpus") {
        name = `rumo-corpus-${code}.txt`;
        content = buildCorpus(langLabel);
      } else if (kind === "verbs") {
        name = `rumo-verbos-${code}.csv`;
        content = buildVerbCsv();
        mime = "text/csv";
      } else {
        name = "rumo-progresso.json";
        content = prog.exportStore();
        mime = "application/json";
      }
      await saveFile(name, content, mime);
    } catch {
      /* usuário cancelou o seletor */
    }
    setBusy(null);
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5">
      {/* topo */}
      <div className="fade-up relative overflow-hidden rounded-xl border-2 border-ink bg-navy p-6 text-paper shadow-print">
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="spin-slower absolute -top-20 -right-20 h-64 w-64 rounded-full border-2 border-dashed border-paper/15" />
        <div className="relative">
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.24em] text-mustard uppercase">
            <Icon name="harddrive" size={14} strokeWidth={2.2} />
            Central Offline
          </p>
          <h1 className="mt-2 font-display text-[26px] leading-[1.08] font-extrabold tracking-tight sm:text-3xl">
            Tudo roda <span className="text-mustard">no seu computador</span>
          </h1>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-paper/75">
            Fontes empacotadas, conteúdo embutido, progresso no navegador — nenhuma requisição externa para funcionar.
            Aqui você audita as vozes, fixa a preferida e baixa áudios-corpus, verbos e backups <strong className="text-paper">escolhendo o destino</strong>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge ok label="Fontes locais" />
            <StatusBadge ok={Boolean(prog.lang)} label="Conteúdo embutido" />
            <StatusBadge ok label="Progresso: localStorage" />
            <StatusBadge ok={voicesFor.length > 0} warn={voicesFor.length === 0 && !canSpeak()} label={voicesFor.length > 0 ? `${voicesFor.length} vozes ${code}` : "sem vozes"} />
          </div>
        </div>
      </div>

      {/* vozes */}
      <Section icon="mic" title="Vozes de pronúncia (TTS)" subtitle={`As falas usam as vozes instaladas no seu sistema em ${langLabel.toLowerCase()} (${speechLang()}). Vozes locais funcionam sem internet.`} delay={80}>
        {voicesFor.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-mustard/50 bg-mustard/8 p-4 text-[13px] text-ink-soft">
            Nenhuma voz de {langLabel.toLowerCase()} encontrada. Instale vozes offline no sistema operacional
            (Configurações → Hora e idioma → Vozes, no Windows; ou System Settings → Accessibility → Spoken Content, no macOS)
            e recarregue a página. O app continua funcionando 100% sem áudio.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {voicesFor.map((v) => {
              const isPinned = pinned[`${code}`] === v.name;
              return (
                <div
                  key={v.name}
                  className={`flex flex-wrap items-center gap-2 rounded-lg border-2 px-3 py-2 transition-colors ${
                    isPinned ? "border-leaf bg-leaf/8" : "border-ink/12 bg-paper hover:border-ink/30"
                  }`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${v.localService ? "bg-leaf" : "bg-mustard"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[13.5px] font-bold">{v.name}</p>
                    <p className="font-mono text-[9.5px] tracking-wide text-ink-soft uppercase">
                      {v.lang} · {v.localService ? "offline (instalada)" : "online (rede)"}
                    </p>
                  </div>
                  <button
                    onClick={() => speak(TEST_PHRASES[code] ?? TEST_PHRASES.fr, speechLang())}
                    className="btn-press flex items-center gap-1 rounded-md border-2 border-ink/20 bg-card px-2.5 py-1 font-mono text-[10px] font-semibold uppercase shadow-print-sm"
                    title="Ouvir frase de teste"
                  >
                    <Icon name="volume" size={12} strokeWidth={2.2} />
                    Testar
                  </button>
                  <button
                    onClick={() => {
                      pinVoice(speechLang(), isPinned ? null : v.name);
                      setPinned((p) => ({ ...p, [code]: isPinned ? null : v.name }));
                    }}
                    className={`btn-press flex items-center gap-1 rounded-md border-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase shadow-print-sm ${
                      isPinned ? "border-leaf bg-leaf text-card" : "border-ink/20 bg-card text-ink-soft hover:border-leaf hover:text-leaf"
                    }`}
                  >
                    <Icon name={isPinned ? "check" : "pin"} size={12} strokeWidth={2.4} />
                    {isPinned ? "Fixada" : "Fixar"}
                  </button>
                </div>
              );
            })}
            <p className="text-[11.5px] text-ink-soft italic">
              A voz fixada vale para todas as falas de {langLabel.toLowerCase()} e fica salva neste navegador.
            </p>
          </div>
        )}
      </Section>

      {/* rotinas de download */}
      <Section icon="download" title="Rotinas de download" subtitle={hasSavePicker() ? "Seu navegador permite escolher o destino de cada arquivo (File System Access API)." : "Seu navegador usa o download padrão — o arquivo vai para a pasta de downloads."} delay={160}>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { kind: "corpus" as const, icon: "type" as IconName, title: "Corpus de áudio", desc: "Todas as frases e diálogos da rota, prontos para um TTS offline.", file: `rumo-corpus-${code}.txt` },
            { kind: "verbs" as const, icon: "book" as IconName, title: "Tabela de verbos", desc: `${verbList().length} verbos conjugados no presente, em CSV.`, file: `rumo-verbos-${code}.csv` },
            { kind: "backup" as const, icon: "passport" as IconName, title: "Backup do progresso", desc: "XP, carimbos, sequência e notas — tudo em JSON.", file: "rumo-progresso.json" },
          ].map((c) => (
            <button
              key={c.kind}
              onClick={() => doSave(c.kind)}
              disabled={busy !== null}
              className="btn-press group flex flex-col items-start gap-2 rounded-xl border-2 border-ink/20 bg-paper p-4 text-left transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-print-sm disabled:opacity-60"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-teal text-card shadow-print-sm transition-transform group-hover:-rotate-6">
                <Icon name={c.icon} size={17} strokeWidth={2.1} />
              </span>
              <span className="font-display text-[15px] leading-tight font-bold">{c.title}</span>
              <span className="text-[11.5px] leading-snug text-ink-soft">{c.desc}</span>
              <span className="mt-auto font-mono text-[9.5px] font-semibold tracking-wide text-teal uppercase">
                {busy === c.kind ? "Gerando…" : c.file}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* como rodar offline */}
      <Section icon="harddrive" title="Como rodar 100% offline" subtitle="O app já nasce local — estas etapas garantem que nada dependa da rede." delay={240}>
        <ol className="flex flex-col gap-2.5">
          {[
            { t: "Fontes", d: "Empacotadas via @fontsource (woff2 dentro do build) — nenhum CDN é chamado." },
            { t: "Aplicação", d: "npm run build gera dist/ estático. Sirva com `npm run preview` ou qualquer servidor local — funciona até num pen drive." },
            { t: "Áudio", d: "Usa as vozes instaladas no sistema (fixe uma voz local acima). O corpus .txt alimenta qualquer TTS offline (piper, espeak…)." },
            { t: "Progresso", d: "Gravado em localStorage a cada sessão. Exporte o JSON para mover entre navegadores/máquinas." },
          ].map((s, i) => (
            <li key={s.t} className="flex items-start gap-3 rounded-lg border-2 border-ink/10 bg-paper px-3.5 py-2.5">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-ink font-mono text-[11px] font-bold">
                {i + 1}
              </span>
              <p className="text-[13px] leading-snug">
                <strong className="font-display">{s.t}.</strong> <span className="text-ink-soft">{s.d}</span>
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
