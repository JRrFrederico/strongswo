/*===============================================================================*/
/*                     SCRIPT PRINCIPAL DE VERSÕES BÍBLICAS                      */
/*===============================================================================*/
/* O QUE ESTE SCRIPT FAZ:                                                        */
/*     1. Gerencia qual tradução da Bíblia está sendo lida (ARC, NVI, etc).      */
/*     2. Carrega arquivos extras de forma inteligente.                          */
/*     3. Cria uma tela de busca (pesquisa) que aparece por cima do site.        */
/*     4. Faz a navegação automática para livros, capítulos e versículos.        */
/*===============================================================================*/

(function () {                                                                                          // Inicia a função autoexecutável
    'use strict';                                                                                       // Ativa o modo de escrita rígido

    // Bloco: Função para ler informações que aparecem na barra de endereço do navegador (URL)
    function obterParametroUrl(parametro) {                                                             // Inicia função de leitura de URL
        const parametrosUrl = new URLSearchParams(window.location.search);                              // Captura os parâmetros da barra
        return parametrosUrl.get(parametro);                                                            // Retorna o valor do item pedido
    }

    // Bloco: Função "Mágica" para carregar outros arquivos de código (.js) enquanto o site roda
    function carregaScriptAssincrono(origem, id) {                                                      // Inicia função de carga externa
        return new Promise((resolve, reject) => {                                                       // Cria uma promessa de trabalho
            const scriptAntigo = document.getElementById(id);                                           // Busca script antigo pelo nome
            if (scriptAntigo) scriptAntigo.remove();                                                    // Se existir, apaga o antigo
            const novoScript = document.createElement('script');                                        // Cria nova etiqueta de código
            novoScript.src = origem;                                                                    // Define o caminho do arquivo
            novoScript.id = id;                                                                         // Define o nome de ID dele
            novoScript.async = false;                                                                   // Mantém a ordem sequencial
            novoScript.onload = () => resolve();                                                        // Resolve ao terminar de baixar
            novoScript.onerror = (evento) => {                                                          // Trata falha no carregamento
                console.error(`Falha ao carregar: ${origem}`, evento);                                  // Registra erro no console
                reject(new Error(`Falha ${origem}`));                                                   // Rejeita a promessa no erro
            };
            document.body.appendChild(novoScript);                                                      // Adiciona o script ao documento
        }); 
    } 

    window.NOME_VERSAO_COMPLETA_BIBLIA = 'Versão King James';                                           // Nome global da bíblia ativa

    window.modoLeituraAtivo = false;                                                                    // Estado do modo tela cheia
    window.ultimoLivroSelecionado = null;                                                               // Cache do último livro lido
    window.ultimoCapituloSelecionado = null;                                                            // Cache do último capítulo lido
    window.ultimoVersiculoSelecionado = null;                                                           // Cache do último versículo lido

    // Bloco: A função de Navegação - O "GPS" que te leva ao versículo certo
    window.navegarParaVersiculo = async function(livro, cap, vers) {                                    // Função global de navegação
        console.log(`[Navegação] Solicitado navegar para: ${livro} ${cap}:${vers}`);                    // Loga o destino no console
        if (typeof window.atualizaBotoesCapitulos !== 'function' || typeof window.toggleVersiculos !== 'function') {
            alert("Erro: Funções de navegação da página principal não encontradas.");                   // Alerta falta de sistema
            return;                                                                                     // Aborta a navegação
        } 
        if (window.modoLeituraAtivo) {                                                                  // Se estiver em modo leitura
            await window.toggleReadingMode(false);                                                      // Desativa para trocar de tela
        }
        await window.atualizaBotoesCapitulos(livro, cap);                                               // Monta a régua de capítulos
        await window.toggleVersiculos(livro, cap);                                                      // Gera a lista de versículos
        setTimeout(() => {                                                                              // Aguarda o desenho do site
            const conteinerCapitulos = document.querySelector('#dynamic-chapter-buttons-conteiner');    // Acha o local dos capítulos
            if (conteinerCapitulos) {                                                                   // Se o local existir
                conteinerCapitulos.querySelectorAll('button').forEach(btn => {                          // Varre todos os botões
                    btn.classList.toggle('active', btn.dataset.capitulo == cap);                        // Destaca o capítulo ativo
                });
            }
            const conteinerVersiculos = document.querySelector('.conteudo-versiculos');                 // Acha o local dos versículos
            if (!conteinerVersiculos) {                                                                 // Se não achar o local
                console.error("Conteiner de versículos não encontrado após o toggle.");                 // Loga falha de interface
                return;                                                                                 // Para a execução
            } 
            const botaoVersiculo = conteinerVersiculos.querySelector(`button[data-versiculo="${vers}"]`); // Procura o número exato
            if (botaoVersiculo && typeof botaoVersiculo.click === 'function') {                         // Se o botão existir
                console.log(`[Navegação] Clicando no botão do versículo ${vers}.`);                     // Loga clique automático
                botaoVersiculo.click();                                                                 // Simula o clique do mouse
            } else {                                                                                    // Caso o botão suma
                console.error(`[Navegação] Botão para o versículo ${vers} não foi encontrado.`);        // Loga erro de localização
            } 
        }, 150);                                                                                        // Espera 150 milissegundos
    }; 


    // Bloco: Inicializador da Versão - Carrega todos os "ingredientes" necessários para a Bíblia funcionar
    async function inicializarVersao(codigoVersao) {                                                    // Função que monta a bíblia
        console.log(`[Principal] Inicializando ${codigoVersao.toUpperCase()}`);                         // Loga início do sistema
        document.body.className = '';                                                                   // Limpa classes do corpo
        document.body.classList.add(['arc'].includes(codigoVersao.toLowerCase()) ? 'versao-html-ativa' : 'versao-json-ativa');
        try {                                                                                           // Tenta carregar módulos externos
            await carregaScriptAssincrono('../script/versoes_cache.js', 'script-versoes-cache');
            await carregaScriptAssincrono('../script/versoes_navegacao.js', 'script-versoes-navegacao');
            await carregaScriptAssincrono('../script/versoes_capitulos.js', 'script-versoes-capitulos');
            await carregaScriptAssincrono('../script/versoes_versiculos.js', 'script-versoes-versiculos');
            await carregaScriptAssincrono('../script/versoes_interface.js', 'script-versoes-interface');
            await carregaScriptAssincrono('../script/versoes_navegacao_modoleitura.js', 'script-versoes-navegacao-modoleitura');
            await carregaScriptAssincrono('../script/versoes_modoleitura.js', 'script-versoes-modoleitura');
            await carregaScriptAssincrono('../script/versoes_realizabusca.js', 'script-versoes-realizabusca');
            await carregaScriptAssincrono(`../script/${codigoVersao.toLowerCase()}.js`, 'script-versao-biblica');

            window.defineTituloPagina(codigoVersao);                                                    // Atualiza nomes no topo

            await carregaScriptAssincrono('../script/slide_biblia_dados.js', 'script-slide-dados');      // Dados do projetor
            await carregaScriptAssincrono('../script/slide_biblia_utils.js', 'script-slide-utils');      // Utilidades do projetor
            await carregaScriptAssincrono('../script/slide_biblia_interface.js', 'script-slide-interface');
            await carregaScriptAssincrono('../script/slide_biblia_janela.js', 'script-slide-janela');    // Janela do projetor
            await carregaScriptAssincrono('../script/slide_biblia_preload.js', 'script-slide-preload');  // Pré-carga do projetor
            await carregaScriptAssincrono('../script/slide_biblia_coordenador.js', 'script-slide-coordenador');

            if (typeof window.inicializarDropdowns === 'function') window.inicializarDropdowns();       // Liga menus suspensos
            if (typeof window.inicializarSobre === 'function') window.inicializarSobre();               // Liga tela de créditos
            if (typeof window.inicializarSlide === 'function') window.inicializarSlide();               // Liga sistema de slide

            const botaoModoLeitura = document.getElementById('modo-leitura');                           // Acha botão de leitura
            if (botaoModoLeitura) {                                                                     // Se o botão existir
                const novoBotao = botaoModoLeitura.cloneNode(true);                                     // Clona para limpar ordens
                botaoModoLeitura.parentNode.replaceChild(novoBotao, botaoModoLeitura);                  // Substitui no site
                novoBotao.addEventListener('click', (e) => {                                            // Adiciona novo clique
                    e.preventDefault();                                                                 // Não recarrega a página
                    window.toggleReadingMode(!window.modoLeituraAtivo, window.activeLivro, window.activeCapitulo);
                });
            } 
            console.log(`[Principal] ${codigoVersao.toUpperCase()} inicializada.`);                     // Loga sucesso final
        } catch (erro) {                                                                                // Em caso de falha grave
            console.error(`[Principal] Erro init ${codigoVersao.toUpperCase()}:`, erro);                // Loga erro técnico
            window.defineTituloPagina(codigoVersao);                                                    // Mantém título básico
            alert(`Erro ao inicializar ${codigoVersao.toUpperCase()}.`);                                // Alerta o usuário
        } 
    }

    window.defineTituloPagina = function (codigoVersao) {                                               // Função de escrita visual
        const elementoTituloPrincipal = document.getElementById('titulo-principal-versao');             // Acha título h1/h2
        const elementoSubtituloExtenso = document.getElementById('subtitulo-versao-extenso');           // Acha local do subtítulo
        if (elementoTituloPrincipal) elementoTituloPrincipal.textContent = `Bíblia Sagrada ${codigoVersao.toUpperCase()}`;
        if (elementoSubtituloExtenso) elementoSubtituloExtenso.textContent = window.NOME_VERSAO_COMPLETA_BIBLIA || '';
    }; 

    // Bloco: A função principal que arruma tudo assim que o site abre
    function initializePage() {                                                                         // Motor de arranque do site
        const seletor = document.getElementById('seletor-versao-principal');                            // Acha menu de bíblias
        let opcoesValidas = ['arc', 'ara', 'nvi', 'acf', 'ntlh', 'kjv', 'naa', 'original'];             // Lista de permitidas
        let versaoPadrao = 'arc';                                                                       // Define padrão de segurança

        if (seletor && seletor.options.length > 0) {                                                    // Se menu tiver opções
            opcoesValidas = Array.from(seletor.options).map(opcao => opcao.value);                      // Pega códigos reais
            versaoPadrao = seletor.value || opcoesValidas[0];                                           // Define a bíblia ativa
        } 

        let versaoInicial = obterParametroUrl('versao') ||                                              // Vê se há versão na URL
            (typeof window.obterPreferencia === 'function' ? window.obterPreferencia('versaoBiblicaSelecionada', 'arc') : localStorage.getItem('versaoBiblicaSelecionada') || 'arc');

        if (!opcoesValidas.includes(versaoInicial.toLowerCase())) versaoInicial = opcoesValidas[0];     // Se estranha, usa padrão
        if (seletor) seletor.value = versaoInicial;                                                     // Marca visualmente
        if (window.salvarPreferencia) window.salvarPreferencia('versaoBiblicaSelecionada', versaoInicial);
        else localStorage.setItem('versaoBiblicaSelecionada', versaoInicial);                           // Grava escolha

        inicializarVersao(versaoInicial);                                                               // Começa carga da bíblia
        
        // FUNÇÃO GLOBAL PARA ATUALIZAR A BARRA DE PROGRESSO
        window.updateSearchIndexProgress = function(progresso, livro) {                                 // Função de barra de carga
            const overlay = document.getElementById('search-overlay');                                  // Acha tela de pesquisa
            if (overlay && overlay.shadowRoot) {                                                        // Se estiver aberta
                const progressoBar = overlay.shadowRoot.querySelector('#progress-bar-inner');           // Acha barra amarela
                const progressoTexto = overlay.shadowRoot.querySelector('#progress-text');              // Acha texto de carga
                if (progressoBar) progressoBar.style.width = progresso + '%';                           // Move a barra
                if (progressoTexto) progressoTexto.textContent = `Indexando ${livro}...`;               // Mostra livro atual
            } 
        };

        // Bloco: Esta função traduz os nomes internos dos livros da Bíblia para nomes legíveis e acentuados
        function getLivroDisplayName(livro) {                                                           // Tradutor de nomes internos
            const nomes = {                                                                             // Dicionário de tradução
                genesis: "Gênesis", exodo: "Êxodo", levitico: "Levítico", numeros: "Números", deuteronomio: "Deuteronômio",
                josue: "Josué", juizes: "Juízes", rute: "Rute", "1samuel": "1º Samuel", "2samuel": "2º Samuel",
                "1reis": "1º Reis", "2reis": "2º Reis", "1cronicas": "1º Crônicas", "2cronicas": "2º Crônicas",
                esdras: "Esdras", neemias: "Neemias", ester: "Ester", jo: "Jó", salmos: "Salmos", proverbios: "Provérbios",
                eclesiastes: "Eclesiastes", cantares: "Cantares de Salomão", isaias: "Isaías", jeremias: "Jeremias",
                lamentacoes: "Lamentações de Jeremias", ezequiel: "Ezequiel", daniel: "Daniel", oseias: "Oseias", joel: "Joel",
                amos: "Amós", obadias: "Obadias", jonas: "Jonas", miqueias: "Miqueias", naum: "Naum", habacuque: "Habacuque",
                sofonias: "Sofonias", ageu: "Ageu", zacarias: "Zacarias", malaquias: "Malaquias", mateus: "Mateus", marcos: "Marcos",
                lucas: "Lucas", joao: "João", atos: "Atos dos Apóstolos", romanos: "Romanos", "1corintios": "1º Coríntios",
                "2corintios": "2º Coríntios", galatas: "Gálatas", efesios: "Efésios", filipenses: "Filipenses", colossenses: "Colossenses",
                "1tessalonicenses": "1º Tessalonicenses", "2tessalonicenses": "2º Tessalonicenses", "1timoteo": "1º Timóteo",
                "2timoteo": "2º Timóteo", tito: "Tito", filemom: "Filemom", hebreus: "Hebreus", tiago: "Tiago", "1pedro": "1º Pedro",
                "2pedro": "2º Pedro", "1joao": "1º João", "2joao": "2º João", "3joao": "3º João", judas: "Judas", apocalipse: "Apocalipse"
            }; 
            return nomes[livro] || livro;                                                               // Retorna nome ou ID puro
        } 
                
        async function realizarBusca(termo) {                                                           // Função de pesquisa
            if (!termo) return;                                                                         // Ignora buscas vazias

            const overlayAntigo = document.getElementById('search-overlay');                            // Procura busca aberta
            if (overlayAntigo) overlayAntigo.remove();                                                  // Limpa busca anterior

            const overlay = document.createElement('div');                                              // Cria cortina da busca
            overlay.id = 'search-overlay';                                                              // Define ID da cortina
            
            const shadow = overlay.attachShadow({ mode: 'open' });                                      // Isola estilos da busca

            let mensagemInicial = '<p>Buscando...</p>';                                                 // Texto de espera
            if (window.searchEngine && !window.searchEngine.isReady) {                                  // Se busca estiver carregando
                mensagemInicial = `
                    <div id="progress-conteiner">
                        <p>Preparando a busca rápida (só na primeira vez)...</p>
                        <div id="progress-bar-outer">
                            <div id="progress-bar-inner"></div>
                        </div>
                        <p id="progress-text">Iniciando...</p>
                    </div>`;                                                                            // HTML da barra de carga
            } 

shadow.innerHTML = `<style>
    /*======================================================*/
    /*         CONTÊINER PRINCIPAL (SOBREPOSIÇÃO)           */
    /*======================================================*/
    :host {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        z-index: 10000;
        overflow: hidden;
        background-color: #181818;
        background-image: url('../img/biblia.png');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        padding: 40px 2.5%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    :host::-webkit-scrollbar { display: none; }
    
    /*======================================================*/
    /*           CONTÊINER DE CONTEÚDO DA BUSCA             */
    /*======================================================*/
    #search-content {
        font-family: sans-serif; font-style: normal; font-weight: normal; color: #f0f0f0;
        width: 100%;
        max-width: 100%; /* Garante que o contêiner não exceda o tamanho da sobreposição */
        margin: 0;
        text-align: left;
        opacity: 0; transition: opacity 0.2s ease-in-out;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 10px; /* Reduz o padding geral para telas menores */
        border-radius: 8px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex-grow: 1; 
        min-height: 0;
    }

    #search-content.loaded { opacity: 1; }

    /*======================================================*/
    /*            CONTÊINER DOS RESULTADOS                  */
    /*======================================================*/
    #resultados-busca-conteiner {
        flex-grow: 1;
        overflow-y: auto;
        scrollbar-width: none;
        padding-left: 0; /* Remove padding excessivo para maximizar a área */
        padding-right: 0;
    }

    #resultados-busca-conteiner::-webkit-scrollbar {
        display: none;
    }
    
    /*======================================================*/
    /*                TÍTULO DA BUSCA (H2)                  */
    /*======================================================*/
    #search-content h2 {
        color: yellow; 
        text-align: center; 
        font-size: 3em; 
        font-weight: bold;
        margin-bottom: 30px; 
        text-shadow: 2px 2px 2px #000;
        flex-shrink: 0;
    }

    /*======================================================*/
    /*                BOTÃO DE FECHAR                       */
    /*======================================================*/
    .botao-fechar-busca {
        position: fixed; top: 20px; right: 30px;
        background-color: #f44336; color: white; padding: 10px 15px;
        border: none; border-radius: 4px; cursor: pointer; z-index: 10;
    }

    /*======================================================*/
    /*           ITEM INDIVIDUAL DO RESULTADO               */
    /*======================================================*/
    .resultado-item {
        padding: 10px 5px; /* Ajuste o padding para 5px nas laterais para telas menores */
        border-bottom: 1px solid #444; 
        line-height: 1.6;
    }

    /*======================================================*/
    /*          LINK DO TÍTULO DO RESULTADO (STRONG)        */
    /*======================================================*/
    .resultado-item strong a {
        color: #FFD700; 
        font-size: 1.8em; 
        font-weight: bold;
        display: block; 
        margin-bottom: 5px; 
        text-decoration: underline; 
        cursor: pointer;
    }

    /*======================================================*/
    /*        LINK DO TÍTULO DO RESULTADO — HOVER           */
    /*======================================================*/
    .resultado-item strong a:hover { 
        text-decoration: none; 
        opacity: 0.8; 
    }
    
    /*======================================================*/
    /*         TEXTO DO VERSÍCULO DO RESULTADO              */
    /*======================================================*/
    .resultado-item span { 
        color: #eee; 
        font-size: 1.5em;
        /* Esses ajustes garantem que o texto inicie na margem esquerda */
        display: inline; /* Não força uma nova linha, permitindo fluxo normal */
        margin: 0;
        padding: 0;
        text-align: left; /* Garante alinhamento à esquerda */
    }

    /*======================================================*/
    /*         MENSAGEM DE "NENHUM RESULTADO"               */
    /*======================================================*/
    #resultados-busca-conteiner p { 
        text-align: center; 
        font-size: 1.5em; 
        padding: 40px 0; 
        color: #ccc;
    }

    /*======================================================*/
    /*        CONTÊINER DA BARRA DE PROGRESSO               */
    /*======================================================*/
    #progress-conteiner { 
        padding: 20px; 
        text-align: center; 
    }

    /*======================================================*/
    /*       PARTE EXTERNA DA BARRA DE PROGRESSO            */
    /*======================================================*/
    #progress-bar-outer { 
        background-color: #555; 
        border-radius: 13px; 
        padding: 3px; 
        margin: 15px auto; 
        width: 80%; 
    }

    /*======================================================*/
    /*       PARTE INTERNA DA BARRA DE PROGRESSO            */
    /*======================================================*/
    #progress-bar-inner { 
        background-color: #FFD700; 
        width: 0%; 
        height: 20px; 
        border-radius: 10px; 
        transition: width 0.4s ease-in-out; 
    }

    /*======================================================*/
    /*          TEXTO DE PROGRESSO DA BUSCA                 */
    /*======================================================*/
    #progress-text { 
        margin-top: 10px; 
        font-style: italic; 
        color: #ccc; 
    }
</style>
<div id="search-content">
    <h2>Resultados da Busca</h2>
    <div id="resultados-busca-conteiner">${mensagemInicial}</div>
</div>`;                                                                                                // Injeta HTML e CSS da busca
            document.body.appendChild(overlay);                                                         // Mostra a busca no site
            document.body.style.overflow = 'hidden';                                                    // Trava a rolagem do fundo

            if (typeof window.realizarBuscaAvancada === 'function') {                                   // Se o motor de busca existir
                const resultados = await window.realizarBuscaAvancada(termo);                           // Processa a pesquisa real
                exibirResultados(resultados, overlay, getLivroDisplayName);                             // Desenha os itens na tela
            } else {                                                                                    // Caso o código falhe
                const conteiner = overlay.shadowRoot.querySelector('#resultados-busca-conteiner');      // Acha local do texto
                conteiner.innerHTML = '<p>Funcionalidade de busca não carregada.</p>';                  // Avisa erro técnico
            } 
        } 
        
        function exibirResultados(resultados, overlay, getLivroDisplayNameFunc) {                       // Inicia desenho de resultados
            const shadow = overlay.shadowRoot;                                                          // Acessa Shadow DOM
            const conteiner = shadow.querySelector('#resultados-busca-conteiner');                      // Local onde versos entram
            conteiner.innerHTML = '';                                                                   // Limpa texto de espera
            
            const botaoFechar = document.createElement('button');                                       // Cria botão de sair
            botaoFechar.className = 'botao-fechar-busca';                                               // Define estilo visual
            botaoFechar.textContent = 'Fechar Busca';                                                   // Escreve nome no botão
            botaoFechar.onclick = () => {                                                               // Ação ao clicar em fechar
                document.body.style.overflow = '';                                                      // Devolve rolagem ao site
                overlay.remove();                                                                       // Apaga a tela de busca
            }; 
            shadow.appendChild(botaoFechar);                                                            // Fixa botão na tela

            if (resultados.length === 0) {                                                              // Se busca deu em nada
                conteiner.innerHTML = '<p>Nenhum resultado encontrado.</p>';                            // Avisa o usuário
            } else {                                                                                    // Se houver versículos
                resultados.forEach(r => {                                                               // Loop por cada verso
                    const div = document.createElement('div');                                          // Cria linha do item
                    div.className = 'resultado-item';                                                   // Define estilo da linha
                    div.innerHTML = `<strong><a href="#">${getLivroDisplayNameFunc(r.livro)} ${r.cap}:${r.vers}</a></strong><span>${r.texto}</span>`;
                    const link = div.querySelector('a');                                                // Pega link do resultado
                    link.addEventListener('click', (e) => {                                             // Clique para navegar
                        e.preventDefault();                                                             // Não recarrega o site
                        if (typeof window.navegarParaVersiculo === 'function') {                        // Se GPS existir
                            window.navegarParaVersiculo(r.livro, r.cap, r.vers);                        // Pula para o local
                        }
                        botaoFechar.click();                                                            // Fecha tela de busca
                    });
                    conteiner.appendChild(div);                                                         // Fixa item na lista
                });
            }
            setTimeout(() => {                                                                          // Pequeno delay visual
                shadow.querySelector('#search-content').classList.add('loaded');                        // Faz a tela surgir suave
            }, 10);                                                                                     // 10 milissegundos
        }

        const botaoBuscar = document.querySelector('.barra-pesquisa button');                           // Acha botão da lupa
        const inputBusca = document.querySelector('.barra-pesquisa input');                             // Acha caixa de texto
        if (botaoBuscar && inputBusca) {                                                                // Se existirem na página
            botaoBuscar.addEventListener('click', () => {                                               // Clique na lupa
                const termo = inputBusca.value.trim();                                                  // Limpa espaços extras
                realizarBusca(termo);                                                                   // Inicia motor de busca
            });                                                                                         // Fecha clique lupa
            inputBusca.addEventListener('keypress', (e) => {                                            // Ouve teclado
                if (e.key === 'Enter') {                                                                // Se for tecla Enter
                    const termo = inputBusca.value.trim();                                              // Pega o que digitou
                    realizarBusca(termo);                                                               // Inicia motor de busca
                } 
            });
        } 

        if (seletor) {                                                                                  // Se menu de bíblias on
            seletor.addEventListener('change', (e) => {                                                 // Quando trocar bíblia
                if (window.salvarPreferencia) window.salvarPreferencia('versaoBiblicaSelecionada', e.target.value);
                else localStorage.setItem('versaoBiblicaSelecionada', e.target.value);                  // Grava preferência
                window.location.search = `?versao=${e.target.value}`;                                   // Recarrega página
            });
        } 

        const listaVersoes = document.getElementById('versoes-list');                                   // Acha lista rodapé
        if (listaVersoes && seletor && opcoesValidas.length > 0) {                                      // Se tudo existir
            listaVersoes.innerHTML = '';                                                                // Limpa links velhos
            const opcoesTexto = Object.fromEntries(Array.from(seletor.options).map(opcao => [opcao.value, opcao.textContent]));
            opcoesValidas.forEach(versao => {                                                           // Loop bíblias válidas
                const itemLista = document.createElement('li');                                         // Cria marcador lista
                const link = document.createElement('a');                                               // Cria link de troca
                link.href = `?versao=${versao}`;                                                        // Define endereço
                link.textContent = opcoesTexto[versao] || versao.toUpperCase();                         // Nome da tradução
                itemLista.appendChild(link);                                                            // Fixa link no marcador
                listaVersoes.appendChild(itemLista);                                                    // Fixa marcador na lista
            });
        } 
    } 
    
    document.addEventListener('DOMContentLoaded', initializePage);                                      // Inicia tudo ao abrir site
})(); 