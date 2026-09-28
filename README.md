# GadgetX Africa

Loja online estática da GadgetX Africa (protótipo: catálogo, carrinho e checkout de demonstração, **sem pagamentos reais**).
A intenção de design e os limites do produto estão no [guia de design e continuação](GADGETX_DESIGN_E_CONTINUACAO.md).

## Estrutura

```
public/               ← tudo o que é publicado (o Vercel serve esta pasta)
  index.html          estrutura da página
  css/style.css       estilos, organizados por secções numeradas
  js/data.js          CONTEÚDO EDITÁVEL: catálogo, acessórios, contactos, políticas, países
  js/app.js           lógica: catálogo, carrinho, checkout, menu e animações
  js/storefront.js    galeria, pesquisa, variantes e barra de compra
  js/news-videos.js   vídeos editoriais das Novidades
  assets/             imagens e logótipos
referencias/          materiais de referência (não publicados)
vercel.json           configuração do Vercel (pasta publicada, cabeçalhos, cache)
```

Não há dependências nem etapa de compilação: os ficheiros em `public/` são servidos tal como estão.

## Como fazer alterações comuns

| Quero… | Onde |
| --- | --- |
| Mudar o link do WhatsApp ou Instagram | `contact` em `public/js/data.js` (atualiza a página toda) |
| Adicionar/editar um modelo de iPhone ou capacidades | `iphones` em `public/js/data.js` |
| Adicionar uma cor (com foto) a um modelo | `colors` em `public/js/data.js` (+ foto em `public/assets/iphone18/cores/`) |
| Mudar imagem, título ou texto de um cartão do catálogo | `families` em `public/js/data.js` |
| Adicionar um acessório, AirPods, etc. | `shop` em `public/js/data.js` (+ imagem em `public/assets/`) |
| Editar Entregas, Devoluções, Privacidade, Termos | `policies` em `public/js/data.js` |
| Mudar cores, tamanhos, espaçamentos | `public/css/style.css` (cores base em `:root`, no topo) |
| Mudar textos fixos (hero, entregas, rodapé) | `public/index.html` |

Não mudar o `id` de modelos já existentes: é guardado no carrinho dos visitantes.

## Executar localmente

Qualquer servidor estático serve. Opções:

- **VS Code**: extensão *Live Server* → botão direito em `public/index.html` → *Open with Live Server*.
- **Node.js** instalado: `npx serve public`
- **Python** instalado: `python -m http.server 8000 --directory public` e abrir http://localhost:8000

Abrir `public/index.html` diretamente no navegador também funciona.

## Publicação (GitHub + Vercel)

1. Criar um repositório no GitHub e enviar este projeto (`git push`).
2. No Vercel: *Add New → Project → Import* o repositório. Preset **Other**, sem build command.
   O `vercel.json` já indica a pasta `public`.
3. A partir daí, cada `git push` para `main` publica automaticamente; outros ramos geram pré-visualizações.

## Antes de cada publicação

Ver a secção 6 do [guia de design](GADGETX_DESIGN_E_CONTINUACAO.md#6-critérios-de-revisão-antes-de-cada-publicação): testar desktop e telemóvel, menu, diálogos, carrinho, formulário e `prefers-reduced-motion`.

## Página de produto e novidades

Depois do Hello, a loja abre na página de produto do iPhone 18 Pro. A antiga secção de vídeo controlada pelo scroll foi removida. A organização atual e as regras de continuação estão em [docs/PRODUCT_PAGE_DESIGN.md](docs/PRODUCT_PAGE_DESIGN.md). Os vídeos das Novidades só carregam quando entram no ecrã e permanecem silenciosos.
