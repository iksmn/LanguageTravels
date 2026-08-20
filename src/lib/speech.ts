/** Síntese de voz (en-GB) com fallback seguro quando a API não existe. */

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string): void {
  if (!canSpeak()) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    utter.rate = 0.92;
    utter.pitch = 1;
    const voices = synth.getVoices();
    const gb =
      voices.find((v) => v.lang.replace("_", "-").toLowerCase().startsWith("en-gb")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (gb) utter.voice = gb;
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
