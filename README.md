# SPA Starter – Template de Disciplina/Curso

Este repositório é um projeto base (template) para hospedar materiais de aulas e listas de exercícios de disciplinas/treinamentos. Ele foi desacoplado da disciplina LPOO e agora usa constantes centralizadas para facilitar a migração para outros projetos.

## Como configurar (5 minutos)

- Arquivo de configuração: `js/config.js`
  - `APP_NOME_DISCIPLINA`: nome curto da disciplina (ex.: "Algoritmos").
  - `APP_NOME_PROFESSOR`: nome do professor/responsável (ex.: "Prof. João Silva").
  - `APP_INSTITUICAO`: instituição/organização (opcional).
  - `APP_SEMESTRE`: semestre/edição (opcional, ex.: "2025.2").
  - `APP_CONTATO_EMAIL`: e-mail de contato (opcional).
  - `APP_STORAGE_PREFIX`: prefixo das chaves no `localStorage` (ex.: "alg"). Use um valor único por projeto.

Após ajustar, o branding é aplicado automaticamente nas páginas.

## Onde o branding é aplicado

- `index.html` (via JS):
  - Título da página e meta description.
  - Cabeçalho lateral (nome da disciplina e instituição).
  - Cabeçalho dos cards ("DISCIPLINA · PROFESSOR").
  - Favicon e Apple Touch gerados como SVG contendo a sigla (`APP_SIGLA`).
- `politica_uso/politica-uso.html`:
  - Título, autor, subtítulo (incluindo semestre), citação, exemplo ABNT genérico, rodapé e e-mail de contato.
- `js/main.js`:
  - Títulos dinâmicos (ex.: `DISCIPLINA - Nome da aula`).
  - Prefixos de `localStorage` agora usam `APP_STORAGE_PREFIX`.
- `sw.js` e `js/sw-config.js`:
  - Service Worker agora lê prefixo/versão do cache de `js/sw-config.js` (edite `APP_CACHE_VERSION` para forçar atualização dos clientes).
- Manifesto PWA dinâmico:
  - O `link rel=manifest` é atualizado em runtime com `APP_NOME_DISCIPLINA` e `APP_INSTITUICAO`, evitando edição manual.
  - Ícones do PWA são SVG dinâmicos com a sigla (192/512), baseados na cor do `theme-color`.

Observação: Mantivemos `manifest.webmanifest` no repositório para portabilidade, mas o app gera um manifesto dinâmico em runtime com base na config. Ícones ficam em `imagens/`.

## Estrutura rápida

- `aulas/` – páginas HTML de aulas + `aulas.json` (manifesto das aulas)
- `listas/` – listas de exercícios em JSON + `listas.json`
- `js/main.js` – SPA e UI
- `js/config.js` – constantes de branding e prefixos
- `css/style.css` – estilos
- `politica_uso/` – página de política de uso
- `sw.js`, `manifest.webmanifest` – PWA

## Dicas de migração

- Clone este projeto e ajuste apenas `js/config.js` e ícones (o manifesto é gerado dinamicamente).
- Se quiser preservar progresso de alunos ao renomear o projeto, mantenha o mesmo `APP_STORAGE_PREFIX`. Para “zerar” o progresso em um novo projeto, altere o prefixo.
- Para mudar o título base (sem depender de aula aberta), altere `APP_NOME_DISCIPLINA` e `APP_INSTITUICAO`.
- Para publicar uma nova versão que invalide o cache do PWA, edite `js/sw-config.js` e incremente `APP_CACHE_VERSION`.
 - Para alterar a sigla exibida nos ícones, ajuste `APP_SIGLA` em `js/config.js`.

## Deploy no GitHub Pages

Um workflow (`.github/workflows/deploy.yml`) publica o conteúdo do repositório no GitHub Pages sempre que há push na branch `main`.

## Desenvolvimento local

Qualquer servidor HTTP estático funciona. Exemplo no Linux (já incluso):

```
./linux_start_server_open_browser.sh
```

Ou usando Python:

```
python3 -m http.server 8080
```

Acesse: `http://localhost:8080`.

## Licença e uso

Mantenha a página de Política de Uso atualizada conforme sua instituição e preferências. O exemplo de citação ABNT é genérico e pode exigir ajustes à sua norma específica.
