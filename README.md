# RUMO — 90 dias de Francês, Italiano, Alemão, Espanhol & Inglês (nível A1)

Aplicativo de aprendizado de idiomas que roda **100% no navegador e offline**, sem backend.
Cada idioma é uma rota de **90 dias / 13 semanas** por paradas reais:

- **Francês** — França, Suíça, Bélgica, Luxemburgo e Mônaco
- **Italiano** — Itália e Suíça
- **Alemão** — Alemanha, Suíça, Áustria e Liechtenstein
- **Espanhol** — Espanha e Portugal (de Barcelona ao Cabo de São Vicente)
- **Inglês** — Reino Unido (Inglaterra, Escócia, Gales, Irlanda do Norte) e Irlanda

Com vocabulário, diálogos com áudio, quizzes, conjugador de verbos, carimbos de
passaporte, diploma final, um **Cahier de copie** (caderno de cópia à mão, em
francês e italiano) e uma central de **cartões de memória** de todos os idiomas
com exportação para o **Anki**.

> **Cada idioma tem seus próprios personagens** — seis companheiros de viagem distintos
> (nome, cidade, profissão, personalidade e avatar), criados para a cultura de cada rota e
> visíveis na aba *Compagnons*. Todos seguem a mesma filosofia: liberdade, amizade profunda
> e apoio mútuo, sem ciúmes. Os temas de astronomia e futebol acompanham todas as rotas.

> Todo o progresso é salvo **automaticamente no navegador** (localStorage) e pode ser
> exportado/restaurado como arquivo `.json`. As **fontes são empacotadas localmente**
> (@fontsource) e há uma **Central Offline** no app para auditar vozes, fixar a preferida
> e baixar corpus de áudio, tabela de verbos e backup — escolhendo o destino dos arquivos.

---

## 1. Pré-requisitos

| Ferramenta | Versão mínima | Como conferir |
|------------|---------------|---------------|
| [Node.js](https://nodejs.org) | 18 (recomendado 20+) | `node -v` |
| npm (vem com o Node) | 9+ | `npm -v` |

---

## 2. Instalar as dependências

Na raiz do projeto:

```bash
npm install
```

---

## 3. Rodar em modo desenvolvimento

```bash
npm run dev
```

O Vite imprime a URL local (normalmente <http://localhost:5173>). Abra-a no navegador.
Qualquer alteração no código recarrega a página na hora (HMR) **sem perder o progresso**,
porque ele fica no localStorage.

---

## 4. Gerar a versão de produção

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve a pasta dist/ localmente para testar o build
```

A pasta `dist/` contém apenas arquivos estáticos (`index.html`, `assets/`). Você pode
abri-la com qualquer servidor estático (ou publicar em Netlify, Vercel, GitHub Pages, etc.).

> Dica: para testar o build sem servidor, um `npx serve dist` também funciona.

---

## 5. Onde o progresso fica salvo

O progresso é gravado **automaticamente** a cada sessão concluída em:

```
localStorage  →  chave "rumo:store:v2"
```

Estrutura (resumo):

```jsonc
{
  "active": "fr",              // idioma em uso no momento (ou null = tela de escolha)
  "langs": {
    "fr": {
      "xp": 1240,              // pontos acumulados
      "streak": 6,             // dias seguidos com sessão
      "lastActive": "2026-02-10",
      "days": { "1": { "xp": 20, "date": "2026-02-05" }, "...": "..." },
      "verbs": { "être": 6, "avoir": 4 }   // melhor nota no conjugador (0–6)
    },
    "it": { "xp": 0, "streak": 0, "lastActive": null, "days": {}, "verbs": {} }
  }
}
```

Cada idioma tem seu próprio progresso independente. Trocar de idioma **não apaga** nada.

---

## 6. Fazer backup e restaurar (recomendado)

### Pelo aplicativo (mais fácil)

1. Abra a aba **Passaporte**.
2. No painel **Backup local**:
   - **Exportar** → baixa `rumo-progresso.json` com todo o progresso (todos os idiomas).
   - **Importar** → selecione um arquivo `.json` exportado anteriormente para restaurar.

### Pelo console do navegador (avançado)

Exportar (copia o JSON para a área de transferência):

```js
copy(localStorage.getItem("rumo:store:v2"))
```

Importar (cole o JSON entre as aspas e recarregue a página):

```js
localStorage.setItem("rumo:store:v2", '{"active":"fr","langs":{...}}')
location.reload()
```

---

## 7. Refazer uma lição & zerar o progresso

### Refazer uma lição do zero
Dias já concluídos abrem em **modo revisão** (selo verde *Revisão*), valendo um bônus
menor de XP. Para refazer valendo **XP cheio**:

- Abra o dia concluído e clique em **"Refazer do zero"** (no topo da lição ou na tela
  de resultado). O registro do dia (sessão + cópia) é apagado, as questões são
  sorteadas de novo e a lição recomeça do início.

### Zerar o progresso
Na aba *Passaporte* há duas opções, ambas com confirmação em dois cliques:

- **Zerar idioma** — apaga XP, carimbos, sequência e cópias **apenas do idioma ativo**.
- **Zerar curso inteiro** — apaga o progresso de **todos os idiomas** de uma vez.

Pelo console: `localStorage.removeItem("rumo:store:v2")` apaga tudo; recarregue a página.

---

## 8. Cahier de copie (cópia à mão)

Toda lição termina com um **caderno de cópia** no estilo dos *cahiers* franceses
(pauta Seyes, margem vermelha, letra manuscrita). O aluno recopia as frases do
diálogo da semana digitando, com feedback caractere a caractere (verde/vermelho)
e um medidor de precisão.

- **Progressão de complexidade:** cada semana tem 3 frases (simples → complexa).
  Nos dias 1–2 copia-se 1 frase; nos dias 3–4, duas; do dia 5 em diante, as três.
  As frases das últimas semanas são mais longas e ricas.
- **Referências temporais:** as frases trazem **dias da semana** (*lundi…dimanche*),
  **meses** (*janvier…décembre*) e **estações** (*printemps, été, automne, hiver*),
  ancorando esse léxico A1 ao longo da rota.
- **Recompensa:** concluir a cópia do dia dá **+15 XP** (uma vez por dia, salvo
  em `progress.copies`).
- **Por idioma:** disponível para **francês** (`src/data/dictees-fr.ts`),
  **italiano** (`src/data/dictees-it.ts`, com temas de automobilismo, Vaticano e
  locais históricos) e **alemão** (`src/data/dictees-de.ts`, com temas de
  futebol, automobilismo e história alemã). Os demais idiomas exibem o caderno
  assim que seus corpora forem adicionados.

---

## 9. Cartões de memória (aba *Cartões*)

Uma central de **flashcards de todos os idiomas**, integrada ao progresso:

- **Desbloqueio automático:** ao concluir o dia de vocabulário de uma semana, as
  palavras entram nos cartões; ao concluir o dia de quiz, os verbos do conjugador
  entram também. Nada fica disponível antes de ser aprendido na rota.
- **Repetição espaçada (Leitner, 4 caixas):** nova → 1 dia → 3 dias → 7 dias.
  Estude em sessões de até 30 cartões avaliando *Errei / Difícil / Boa / Fácil*.
- **Mandarim e japonês:** os cartões mostram **pinyin / romaji** e a pronúncia
  por síntese de voz (`zh-CN` / `ja-JP`).
- **Exportação para o Anki:** botão *Anki (.txt)* gera um arquivo de importação
  (separador tab, HTML, etiquetas `rumo::<idioma>::<tipo>`); há também *CSV*.
  O destino do arquivo é escolhido pelo usuário (File System Access API).

---

## 10. Central Offline (aba *Offline*)

Tudo foi pensado para rodar **sem internet**:

- **Fontes** empacotadas via `@fontsource` (os arquivos `.woff2` vão junto no build —
  nenhum CDN é chamado).
- **Vozes (TTS):** a aba *Offline* lista as vozes instaladas no sistema para o idioma ativo
  (`fr-FR`, `it-IT` ou `de-DE`), marca as que são **locais** (offline) e permite **fixar**
  a preferida — usada em todas as falas do app.
- **Rotinas de download** (com escolha de destino via File System Access API):
  - `rumo-corpus-XX.txt` — todas as frases e diálogos da rota (para usar num TTS offline).
  - `rumo-verbos-XX.csv` — os verbos conjugados no presente.
  - `rumo-progresso.json` — backup completo.

> Os links para o conjugador Reverso são externos (opcionais) e exigem conexão; tudo o
> mais funciona offline.

---

## 11. Observações

- **Áudio / pronúncia** usa a Web Speech API do sistema. Se o seu sistema não tiver vozes
  no idioma, o app continua funcionando — apenas sem som.
- **Sem cookies / sem conta:** nada é enviado a servidor algum. Tudo fica no seu navegador.

---

## 12. Comandos rápidos (resumo)

```bash
npm install     # 1x — instala dependências
npm run dev     # desenvolvimento (http://localhost:5173)
npm run build   # versão de produção em dist/
npm run preview # testa o build localmente
```

**Bonne route, buon viaggio, gute Reise, buen viaje and have a good trip!** 🇫🇷 🇮🇹 🇩🇪 🇪🇸 🇬🇧
