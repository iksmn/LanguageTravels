# RUMO — 90 dias de Francês & Italiano (nível A1)

Aplicativo de aprendizado de idiomas que roda **100% no navegador**, sem backend.
Cada idioma é uma rota de **90 dias / 13 semanas** por paradas reais (França, Suíça,
Bélgica, Luxemburgo e Mônaco no francês; Itália e Suíça no italiano), com vocabulário,
diálogos com áudio, quizzes, conjugador de verbos, carimbos de passaporte e diploma final.

> Todo o progresso é salvo **automaticamente no navegador** (localStorage) e pode ser
> exportado/restaurado como arquivo `.json`.

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

## 7. Zerar o progresso

- **Pelo app:** aba *Passaporte* → *Zerar progresso* (pede confirmação em dois cliques).
  Apaga apenas o idioma ativo.
- **Pelo console:** `localStorage.removeItem("rumo:store:v2")` apaga **todos** os idiomas.
  Recarregue a página em seguida.

---

## 8. Observações

- **Áudio / pronúncia** usa a Web Speech API do sistema (`fr-FR` e `it-IT`). Se o seu
  sistema não tiver essas vozes, o app continua funcionando — apenas sem som.
- **Sem internet:** depois de carregado uma vez, o app funciona offline (é um SPA estático),
  mas vozes de síntese em nuvem e os links externos do conjugador (Reverso) exigem conexão.
- **Sem cookies / sem conta:** nada é enviado a servidor algum. Tudo fica no seu navegador.

---

## 9. Comandos rápidos (resumo)

```bash
npm install     # 1x — instala dependências
npm run dev     # desenvolvimento (http://localhost:5173)
npm run build   # versão de produção em dist/
npm run preview # testa o build localmente
```

**Bonne route e buon viaggio!** 🇫🇷 🇮🇹
