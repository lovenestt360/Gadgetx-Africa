# GadgetX Africa — guia de design e continuação

## 1. Objetivo e estado atual
Loja online GadgetX Africa para clientes de países africanos, com origem de mercadoria indicada pelo proprietário como África do Sul. A experiência prioriza a família iPhone 18 e apresenta também iPhone 17, iPhone 16 e categorias de acessórios. O idioma principal da interface é português.

**Estado:** protótipo estático navegável. O catálogo, as capacidades, o carrinho guardado no navegador, a recolha temporária de morada e os textos legais de rascunho servem para experimentar o percurso. Não existe inventário confirmado, preço final, encomenda persistida, envio contratado ou pagamento integrado. Não apresentar o protótipo como loja pronta para receber pagamentos.

## 2. Direção visual
- Marca principal: GadgetX, com os ficheiros `public/assets/logo-dark.png` e `logo-light.png` fornecidos pelo proprietário. A presença da assinatura Apple Premium Partner foi declarada pelo proprietário; confirmar documentação e regras de uso da marca antes de publicação comercial.
- Referência de experiência: clareza, espaço, tipografia, fotografias grandes e facilidade de compra do comércio Apple. Preservar autoria e identidade GadgetX; não copiar texto, estrutura completa ou elementos protegidos de terceiros.
- Paleta de base: fundo `#f5f5f7`, superfícies `#ffffff`, texto principal `#1d1d1f`, azul de ação `#0071e3`, carvão `#111111`. Tons bordô das imagens do iPhone 18 podem apoiar uma campanha, sem dominar botões ou legibilidade.
- Sistema tipográfico: fontes de interface do sistema, títulos fortes e poucas variações de peso. Texto de leitura confortável (alvo mínimo 16 px), etiquetas legíveis, contraste adequado e largura de linha controlada.
- Composição: um hero principal do iPhone 18 com imagem inteira e margens generosas; sequência de categorias e catálogo com hierarquia evidente. Reservar proporção de imagem estável; usar `object-fit: contain` nas fotografias de produto. Não cortar a câmara, as laterais ou a base do aparelho.
- Cada modelo deve mostrar a sua própria fotografia correta. Confirmar correspondência entre SKU, capacidade, cor, fotografia e disponibilidade. Evitar cartões quase idênticos, repetição excessiva do mesmo enquadramento e especificações inventadas.
- Em ecrãs estreitos, preservar espaçamentos, dimensão dos alvos táteis e leitura dos textos; não reduzir tudo proporcionalmente à versão desktop.

## 3. Movimento e interação
- A abertura apresenta as saudações “Hello”, “Bonjour”, “Olá”, “Ciao” e “Hallo” por breves instantes, termina automaticamente e nunca impede o acesso se a animação falhar.
- O menu de navegação usa uma transição de cortina curva. A entrada e a saída devem ser suaves, com foco e navegação por teclado funcionais; não ocultar conteúdo da tecnologia assistiva por tempo indefinido.
- Botões podem responder subtilmente ao ponteiro; cartões podem elevar-se poucos píxeis. Preferir transformações e opacidade, evitando animações que causem deslocações de layout ou tremores.
- O hero reage ao deslocamento da página de forma contínua. Manter uma única narrativa visual, sem duplicar a imagem do mesmo iPhone em secções consecutivas. A futura desmontagem acompanhada pelo scroll ainda **não está implementada**.
- Para criar a desmontagem: produzir sequência própria de fotogramas coerentes (mesmo ângulo, enquadramento, escala e luz), exportar em tamanhos adequados a desktop e telemóvel, controlar o fotograma com progresso de scroll entre 0 e 1 e carregar o essencial antes de iniciar. Incluir imagem estática de reserva quando a sequência não estiver pronta.
- Respeitar `prefers-reduced-motion`: simplificar ou remover intro, cortina elaborada e animação de scroll, mantendo todas as funções. Testar rato, toque, teclado e leitores de ecrã.

## 4. Estrutura do projeto
| Caminho | Finalidade |
| --- | --- |
| `public/index.html` | Estrutura, metadados e pontos de entrada da página. |
| `public/css/style.css` | Identidade visual, grelhas, estados responsivos e transições (secções numeradas). |
| `public/js/data.js` | Conteúdo editável: catálogo, acessórios, contactos, políticas e países. |
| `public/js/app.js` | Filtros, modais, carrinho, checkout demonstrativo e animações. |
| `public/assets/` | Imagens e logótipos usados pelo site. |
| `referencias/` | Markdown, captura e arquivos de imagens enviados como referência; não são necessários para servir o site (os `.zip` não são versionados). |
| `vercel.json` | Configuração do alojamento no Vercel. |

Para experimentar localmente e publicar, ver o `README.md`. Não há etapa de compilação nem dependências npm nesta versão.

## 5. Regras da experiência de compra
- Percurso pretendido: escolher produto e variante → acrescentar ao carrinho → indicar país e endereço → rever custos finais e prazo → pagar → receber confirmação e acompanhamento. WhatsApp permanece opcional para apoio.
- Antes de ativar compras: criar catálogo real no servidor com SKU, preço, moeda, cor, capacidade, stock e fotografia por variante; calcular portes, taxas e disponibilidade por destino; apresentar total completo antes do pagamento.
- Ligar Stripe ou EscalePay a partir do servidor, guardar encomendas num sistema persistente, validar stock e montantes no servidor, usar webhooks assinados e operações idempotentes. Um regresso do navegador à página de sucesso não comprova pagamento.
- Não recolher nem guardar números completos de cartões no frontend. Dados pessoais e moradas exigem aviso de privacidade, retenção definida e medidas de segurança adequadas.
- Informar claramente quem vende, contactos, países abrangidos, transportadora, prazos, impostos/importação, garantias e política de devoluções por mercado. Os textos atuais são apenas rascunhos a rever com os dados reais da empresa e aconselhamento local.
- A origem sul-africana dos produtos não estabelece, por si só, as regras aplicáveis a todos os países de destino. Não declarar parceria, certificação, disponibilidade, preço ou especificações sem prova verificável.

## 6. Critérios de revisão antes de cada publicação
1. Abrir em desktop e telemóvel e conferir o hero, cortes de imagem, contraste, legibilidade e adaptação da grelha.
2. Confirmar que intro termina, cortina abre/fecha, links e botões têm destino e estado visível, e todos os diálogos abrem, fecham e devolvem o foco.
3. Verificar filtros, variantes, carrinho, quantidades e formulário com endereço longo e países distintos; verificar que nenhum valor fictício se apresenta como preço final.
4. Testar com `prefers-reduced-motion`, teclado e toque, além de ligação lenta; eliminar recursos que bloqueiem a experiência.
5. Confirmar direitos de uso e origem das imagens. Os arquivos de referência incluem materiais fornecidos pelo utilizador e recursos da Apple; rever permissões para uso comercial.
6. Quando houver pagamentos: testar ambientes de teste com aprovado, recusado, cancelado, duplicado, pendente e reembolso; publicar apenas depois da reconciliação no servidor.

## 7. Prioridades de continuação
1. Rever em conjunto a apresentação visual atual no navegador e corrigir imagens cortadas ou repetidas.
2. Substituir informação demonstrativa por catálogo, preços, inventário e logística reais.
3. Produzir e integrar os fotogramas da animação de desmontagem do iPhone 18.
4. Construir backend de encomendas, checkout e pagamentos; validar políticas e identificação empresarial.
5. Realizar revisão de acessibilidade, desempenho e testes de compra completos antes da abertura pública.

Este documento descreve a intenção do produto e os limites conhecidos em 24 de setembro de 2026. Alterações futuras devem atualizar este guia e o `README.md`.
