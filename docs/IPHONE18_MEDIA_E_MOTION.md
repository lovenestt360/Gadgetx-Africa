# iPhone 18 Pro — abertura e novidades

## Direção visual
Referência principal: vídeo de detalhe da câmara e material Apple Newsroom fornecido pelo proprietário. Preservar o preto, a fotografia em grande escala e o bordô do próprio produto. A direção da loja permanece branca/cinza, com tipografia do sistema. A cortina e as saudações existentes ligam a entrada ao vídeo; não adicionar outra introdução entre os dois.

## Sequência implementada
1. As saudações ocupam aproximadamente 2,1 segundos; o scroll fica bloqueado apenas enquanto essa entrada termina.
2. A câmara ocupa a primeira secção, imediatamente após a cortina. O vídeo é silencioso e tem 9,6 segundos.
3. O scroll nativo controla o instante do vídeo. O vídeo termina aos 88% do percurso; os restantes 12% mantêm o último fotograma antes da loja (introdução, categorias e catálogo de iPhone).
4. A escala da superfície desce de 1,12 para 0,78 ao longo do percurso. O título inicial desaparece e a chamada para explorar o modelo entra no final.
5. Voltar atrás no scroll faz o vídeo recuar. Não se capturam eventos wheel/touch nem se força o visitante a terminar a sequência: menu e “Saltar introdução” (leva ao catálogo) permitem acesso direto.
6. “Reproduzir vídeo” permite reprodução contínua com controlos nativos. Scroll posterior regressa ao modo sincronizado.

## Ordem da página
Abertura com vídeo → loja (introdução, categorias, catálogo de iPhone) → AirPods → acessórios → Mais Apple (relógios, casa e TV) → Novidades (acabamentos, A20 Pro, vídeos) → fotografias “O mundo, pelo olhar do iPhone” → entregas → ajuda.

## Vídeos das Novidades
Os três vídeos (controlos da câmara, Dynamic Island, arrefecimento) tocam automaticamente, sem som, em loop e sem controlos nem botões. Só descarregam e tocam quando pelo menos 25% do vídeo está no ecrã e param ao sair. Com movimento reduzido mostram apenas o poster.

## Cores e iPhone Fold
As cores com fotografia própria estão em `STORE.colors` (`public/js/data.js`); cada modelo aponta para uma lista com `colors`. No detalhe do produto, escolher a cor troca a fotografia e a cor fica guardada no carrinho. As fotografias recortadas (PNG transparente, 720 px) estão em `public/assets/iphone18/cores/`. As capacidades do iPhone Fold estão como “Capacidade a confirmar” até haver dados reais.

## Ficheiros
- `public/js/camera-story.js`: sincronização de tempo, estados, reprodução manual, erros, movimento reduzido e vídeos das novidades.
- `public/index.html`: hero, novidades, galeria e crédito de origem.
- `public/css/style.css`: secção 13, responsivo e variantes de acessibilidade.
- `public/assets/iphone18/`: imagens WebP, posters e MP4 preparados para reprodução web.
- `public/js/data.js`: fotografia da família 18 atualizada para a imagem dos dois aparelhos.

## Entrega de media
O vídeo principal carrega no início; usa H.264, sem áudio, faststart e keyframes frequentes para procurar fotogramas. Os outros vídeos só recebem `src` quando entram no ecrã. As fotografias abaixo da abertura têm carregamento diferido. O vídeo original não contém a desmontagem completa do telefone: a animação apresentada é a abertura da câmara e o zoom out da superfície de vídeo.

Movimento reduzido remove a sequência longa e o zoom: apresenta um hero estático com opção de reprodução manual. Erro do vídeo conserva o poster, apresenta uma mensagem e reduz a secção ao tamanho do ecrã. O menu, catálogo e checkout de demonstração continuam independentes da reprodução.

## Origem
Materiais fornecidos: `Media-of-Apple-iPhone-18-Pro-260909.zip` e `Apple-iPhone-18-Pro-camera-close-up-260909.mp4`.
Referência editorial: https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/

O aviso original do ZIP é preservado em `referencias/APPLE_MEDIA_LEGAL_NOTICE.rtf`. Esse aviso limita o uso a fins pessoais/editoriais não comerciais e exige permissão para alterações; a autorização de revenda declarada pelo proprietário não confirma, por si só, autorização para estes media. Validar o âmbito da licença com o proprietário antes da utilização comercial definitiva.

## Verificação
- Abertura em desktop e telemóvel, avanço/recuo do vídeo e último fotograma.
- Menu e salto para Novidades; fotografia correta na seleção da família 18.
- Reprodução manual, vídeos carregados a pedido, erro de carregamento e movimento reduzido.
- `node --check public/js/app.js`, `node --check public/js/camera-story.js` e `node --check public/js/data.js`.

Para testes locais do scroll de vídeo, utilizar um servidor com suporte a HTTP Range (por exemplo `npx serve public`). O servidor simples `python -m http.server` não garante procura de fotogramas em todos os navegadores. O alojamento deve servir MP4 com `Content-Type: video/mp4` e respostas parciais 206.

### Resultado da verificação nesta versão
Chromium em 1440 × 1000 e 390 × 844: sem erros JavaScript nem overflow horizontal. Aos 50% do percurso o vídeo está em 5,44 s; aos 90% e 100% está em 9,57 s; ao recuar para 30% regressa a 3,26 s. Menu, seleção de produto e reprodução dos vídeos editoriais funcionaram. Movimento reduzido apresentou uma secção de um ecrã, sem zoom, com reprodução manual. A falha de carregamento foi simulada e mostrou o poster/mensagem com a sequência longa desativada. Estas verificações não substituem testes em aparelhos físicos iOS e Android.
