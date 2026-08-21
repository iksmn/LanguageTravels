/**
 * Síntese de voz com idioma parametrizável, vozes locais priorizadas
 * e voz preferida fixada por idioma (persistida em localStorage).
 */

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

const VOICE_KEY = (lang: string) => `rumo:voice:${lang.slice(0, 2)}`;

export function getPinnedVoice(lang: string): string | null {
  try {
    return localStorage.getItem(VOICE_KEY(lang));
  } catch {
    return null;
  }
}

export function pinVoice(lang: string, voiceName: string | null): void {
  try {
    if (voiceName) localStorage.setItem(VOICE_KEY(lang), voiceName);
    else localStorage.removeItem(VOICE_KEY(lang));
  } catch {
    /* noop */
  }
}

/** Lista de vozes instaladas (aguarda o carregamento assíncrono, se necessário). */
export function listVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!canSpeak()) return resolve([]);
    const synth = window.speechSynthesis;
    const current = synth.getVoices();
    if (current.length > 0) return resolve(current);
    const timer = window.setTimeout(() => resolve(synth.getVoices()), 900);
    synth.addEventListener(
      "voiceschanged",
      () => {
        window.clearTimeout(timer);
        resolve(synth.getVoices());
      },
      { once: true },
    );
  });
}

function pickVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | null {
  const prefix = lang.slice(0, 2).toLowerCase();
  const pinned = getPinnedVoice(lang);
  if (pinned) {
    const p = voices.find((v) => v.name === pinned);
    if (p) return p;
  }
  // prioridade: voz local exata do idioma > qualquer local do idioma > exata > qualquer
  const exact = voices.filter((v) => v.lang.replace("_", "-").toLowerCase() === lang.toLowerCase());
  const byPrefix = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  return (
    exact.find((v) => v.localService) ??
    byPrefix.find((v) => v.localService) ??
    exact[0] ??
    byPrefix[0] ??
    null
  );
}

export function speak(text: string, lang: string = "fr-FR"): void {
  if (!canSpeak()) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.92;
    utter.pitch = 1;
    const match = pickVoice(synth.getVoices(), lang);
    if (match) utter.voice = match;
    synth.speak(utter);
  } catch {
    /* silencioso — a lição funciona sem áudio */
  }
}

export function stopSpeaking(): void {
  if (!canSpeak()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* noop */
  }
}
