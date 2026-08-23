/**
 * Salvamento de arquivos com escolha de destino (File System Access API)
 * e fallback para o download padrão.
 */

type SavePickerWindow = Window & {
  showSaveFilePicker?: (opts: {
    suggestedName: string;
    types: { description: string; accept: Record<string, string[]> }[];
  }) => Promise<{ createWritable: () => Promise<{ write: (d: string) => Promise<void>; close: () => Promise<void> }> }>;
};

export const hasSavePicker = () =>
  typeof window !== "undefined" && Boolean((window as SavePickerWindow).showSaveFilePicker);

/** Retorna "picker" (usuário escolheu o destino) ou "download" (fallback). */
export async function saveFile(name: string, content: string, mime: string): Promise<"picker" | "download"> {
  const w = window as SavePickerWindow;
  if (w.showSaveFilePicker) {
    try {
      const handle = await w.showSaveFilePicker({
        suggestedName: name,
        types: [{ description: name, accept: { [mime]: [".txt", ".csv", ".json"] } }],
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
