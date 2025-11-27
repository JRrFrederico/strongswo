📋 GUIA COMPLETO REVISADO (v2.0)
(última versão – substituição total)
✅ 1. ESCOPO E LIMITES (O QUE NÃO MUDA)
Table
Copy
Categoria	O que permanece INTACTO	Motivo
Tags HTML	<body>, <header>, <div> …	Palavras-chave da linguagem
Atributos HTML	id, class, href, src …	Especificação oficial
Atributos data-*	data-livro, data-capitulo	Padrão HTML5
Palavras-chave JS	function, async, const, if	Sintaxe fixa
APIs do navegador	document, window, fetch	Objetos globais
Propriedades CSS	background-color, display	Sintaxe da linguagem
Pseudo-classes/elementos	:hover, ::before, ::-webkit-scrollbar	Seletores fixos
✅ 2. O QUE SERÁ TRADUZIDO NO CÓDIGO
Table
Copy
Escopo	O que será alterado	Base de tradução
Classes / IDs CSS	Nome do seletor	Lista § 4.1
Variáveis JS	Nome da variável	Lista § 4.2
Funções JS	Nome da função	Lista § 4.3
Classes JS	Nome da classe	Lista § 4.4
Constantes JS	Nome da constante	Lista § 4.2
Elementos HTML	id e class	Lista § 4.1
✅ 3. PADRÕES DE NOMENCLATURA APLICADOS
Table
Copy
Tipo	Padrão	Exemplo
Classes / IDs	kebab-case	.btn-buscar → .botao-buscar
Variáveis / Funções	camelCase	searchTerm → termoBusca
Classes JS	PascalCase	DataManager → GerenciadorDados
✅ 4. LISTA AUTORIZADA DE TRADUÇÃO (CÓDIGO + COMENTÁRIOS)
4.1 Seletores CSS / IDs / Classes HTML
Table
Copy
Original	Traduzido
#search-overlay-content	#conteudo-overlay-busca
.search-overlay-resultado-item	.item-resultado-overlay-busca
.palavra-section	.selecao-palavra
.palavra-header	.palavra-cabecalho
.expand-indicator	.indicador-expansao
.menu-button	.botao-menu
.hino-container	.conteiner-hino
.reading-mode-header	.cabecalho-modo-leitura
.chapter-verses	.capitulo-versiculos
#voltar-botao, #proximo-botao	#botao-voltar, #botao-proximo
.container	.conteiner
.container-titulo	.conteiner-titulo
.btn-letra	.botao-letra
.custom-select	.selecao-personalizada
#btn-buscar	#botao-buscar
#btn-carregar-mais	#botao-carregar-mais
.btn-paginacao	.botao-paginacao
.dicionario-btn	.botao-dicionario
4.2 Variáveis / Constantes JS
Table
Copy
Original	Traduzido
content	areaConteudo
response	resposta
data	dados
searchTerm	termoBusca
isLoading	estaCarregando
currentLetter	letraAtual
currentPage	paginaAtual
itemsPerPage	itensPorPagina
allTermos / allData	todosTermosLetra
listaLetras	indiceLetras
hasMore	temMaisResultados
activeHinario	hinarioAtivo
activeHinoData	dadosHinoAtivo
livroKey	chaveLivro
BIBLE_VERSION	VERSAO_BIBLIA
NOME_VERSAO_COMPLETA_BIBLIA	NOME_COMPLETO_VERSAO_BIBLIA
activeLivro	livroAtivo
activeCapitulo	capituloAtivo
activeVersiculoButton	botaoVersiculoAtivo
4.3 Funções JS
Table
Copy
Original	Traduzido
loadSpecificVerse	carregarVersiculoEspecifico
getSpecificVerseCount	obterContagemVersiculosEspecifica
getSpecificChapterTitle	obterTituloCapituloEspecifico
toggleReadingMode	alternarModoLeitura
initializeDropdowns	inicializarMenusSuspensos
loadBook	carregarLivro
createCapitulosButtons	criarBotoesCapitulos
toggleVersiculos	alternarVersiculos
performGlobalSearch	executarBuscaGlobal
updateResultsCounter	atualizarContadorResultados
showLoading	mostrarCarregamento
loadLetterList	carregarIndiceLetras
loadLetterData	carregarDadosPorLetra
handleSearch	manipularBusca
getLivroDisplayName	obterNomeExibicaoLivro
4.4 Classes JS
Table
Copy
Original	Traduzido
DataManager	GerenciadorDados
ConcordanciaOptimized	ConcordanciaOtimizada
MainApp	AppPrincipal
InterfaceManager	GerenciadorInterface
VersiculosManager	GerenciadorVersiculos
✅ 5. FORMATO PADRÃO DE COMENTÁRIOS
CSS
css
Copy
/*=====================================================*/
/* NOME DA SEÇÃO EM MAIÚSCULAS                         */
/* Descrição breve do propósito                        */
/*=====================================================*/

/* [Bloco] Descrição do conjunto de regras */
.seletor {
    propriedade: valor; /* Explicação */
}
JavaScript
JavaScript
Copy
/*===============================================================================*/
/* NOME DO MÓDULO EM MAIÚSCULAS                                                */
/*===============================================================================*/
/* [Bloco] Descrição do que o bloco faz */
const exemplo = valor; // Explicação
✅ 6. ORDEM DE SEÇÕES CSS
Reset / normalização
Variáveis globais
Estrutura básica (body, tipografia)
Layouts principais (header, main, footer)
Componentes (botões, formulários)
Utilitários / responsividade
✅ 7. CHECKLIST DE ARQUIVOS A REVISAR
Table
Copy
Arquivo CSS	Status	Ação
versoes_botoeacapitulosversiculo.css	❌	Renomear seletores + padronizar comentários
versoes_responsivo.css	❌	Renomear seletores + padronizar comentários
versoes_busca.css	❌	Renomear seletores + padronizar comentários
slide_harpacantor.css	❌	Renomear seletores + padronizar comentários
slide_biblia.css	❌	Renomear seletores + padronizar comentários
modo_leitura.css	❌	Renomear seletores + padronizar comentários
menu_dicionarioconcordancia.css	❌	Renomear seletores + padronizar comentários
harpa_crista.css	❌	Renomear seletores + padronizar comentários
harpa_cantor.css	❌	Renomear seletores + padronizar comentários
dicionario.css	❌	Renomear seletores + padronizar comentários
cursos.css	❌	Renomear seletores + padronizar comentários
concordancia.css	❌	Renomear seletores + padronizar comentários
cantor_cristao.css	❌	Renomear seletores + padronizar comentários
biblia_realizabusca.css	❌	Renomear seletores + padronizar comentários
✅ 8. REGRA FINAL
Código será traduzido conforme a lista oficial.
Comentários seguirão o padrão uniforme.
Nada será removido ou perdido.
