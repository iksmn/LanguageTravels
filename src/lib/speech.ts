/** Síntese de voz com idioma parametrizável e fallback seguro. */

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
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
    const voices = synth.getVoices();
    const prefix = lang.slice(0, 2).toLowerCase();
    const match =
      voices.find((v) => v.lang.replace("_", "-").toLowerCase() === lang.toLowerCase()) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
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
