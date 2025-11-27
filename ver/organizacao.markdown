# Organização do Projeto

## Estrutura de Arquivos
```
biblia/
├── baixar/                  # PDFs e recursos para download
│   ├── A_Biblia_Catolica.pdf
│   ├── A_Biblia_Sagrada_NVT.pdf
│   ├── A_Biblia_Viva.pdf
│   └── ...
├── concordancia/            # Dados de concordância bíblica
│   ├── /a/a1.json, ...  # Concordância por letra
│   ├── /b/b1.json, ...
│   ├── /c/c1.json, ...  # Subpastas por letra com temas
│   
├── css/                     # Arquivos de estilo
│   ├── biblia_realizabusca.css
│   ├── cantor_cristao.css
│   ├── capitulos.css
│   ├── concordancia.css
│   ├── cursos.css
│   ├── dicionario.css
│   ├── dicionario_concordancia.css
│   ├── harpa_cantor.css
│   ├── modo_leitura.css
│   ├── slide_biblia.css
│   ├── slide_harpacantor.css
│   ├── slide_harpacantor1.css
│   ├── style.css
│   ├── style_versoes.css
│   ├── versoes.css
│   ├── versoes_base.css
│   ├── versoes_busca.css
│   ├── versoes_cabecalho.css
│   ├── versoes_conteudo.css
│   ├── versoes_interface.css
│   ├── versoes_menulateral.css
│   ├── versoes_navegacao.css
│   ├── versoes_rodape.css
│   └── ...
├── dicionario/              # Dados do dicionário bíblico
│   ├── a.json, b.json, ...
│   └── ...
├── html/                    # Páginas HTML
│   ├── concordancia.html
│   ├── cursos.html
│   ├── dicionario.html
│   ├── dicionario_concordancia.html
│   └── versoes.html
├── img/                     # Imagens e ícones
│   ├── acf.png, ara.png, ...
│   ├── biblia.png
│   ├── marcadagua.png
│   └── ...
├── harpacrista/             # Dados auxiliares em JSON
│   ├── 1.json
│   ├── 2.json
│   └── ...
├── cantorcristao/           # Dados auxiliares em JSON
│   ├── 1.json
│   ├── 2.json
│   └── ...
├── script/                  # Scripts JavaScript
│   ├── acf.js, ara.js, ...  # Scripts de versões
│   ├── biblia-navegacao.js
│   ├── config_dicionarioeconcordancia.js
│   ├── concordancia.js
│   ├── dicionario.js
│   ├── dicionario_concordancia.js
│   ├── dropdown.js
│   ├── dropdown_concordancia.js
│   ├── livros_capitulos.js
│   ├── marcadagua.js
│   ├── original.js
│   ├── slide_biblia_coordenador.js
│   ├── slide_biblia_dados.js
│   ├── slide_biblia_interface.js
│   ├── slide_biblia_janela.js
│   ├── slide_biblia_utils.js
│   ├── sobre.js
│   ├── versoes.js
│   └── ...
```

## Padrão de Organização CSS Aplicado

Todos os arquivos CSS da pasta `/css/` foram reorganizados (ou estão em processo de reorganização) seguindo um padrão profissional e claro, com foco na legibilidade para iniciantes em programação. O padrão segue as diretrizes abaixo:

### Ordem das Propriedades CSS
As propriedades CSS devem ser organizadas na seguinte ordem, com seções claramente definidas por comentários:

1. **Layout e Posicionamento**:
   - `position`, `top`, `right`, `bottom`, `left`, `z-index`
   - `display`, `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `align-content`
   - `float`, `clear`

2. **Box Model**:
   - `width`, `min-width`, `max-width`
   - `height`, `min-height`, `max-height`
   - `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
   - `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
   - `overflow`

3. **Bordas e Fundo**:
   - `border`, `border-width`, `border-style`, `border-color`, `border-radius`
   - `box-shadow`
   - `background`, `background-color`, `background-image`, `background-repeat`, `background-position`, `background-size`

4. **Tipografia**:
   - `color`, `font`, `font-family`, `font-size`, `font-weight`, `font-style`
   - `line-height`, `letter-spacing`, `text-align`, `text-decoration`, `text-transform`, `text-shadow`, `white-space`

5. **Efeitos e Outros**:
   - `opacity`, `cursor`, `transition`, `transform`, `animation`, `clip-path`, `filter`

### Padrão de Comentários
- **Blocos de seção**: Usar `/*=====================================================*/` para separar grandes seções do arquivo, com um título descritivo.
- **Comentários de bloco**: Iniciar cada bloco CSS com um comentário descrevendo o propósito, no formato `/* O bloco abaixo configura [descrição] */`.
- **Comentários de linha**: Alinhados à direita, com verbos de ação, descrevendo o propósito de cada propriedade (ex.: `/* Define largura máxima */`).
- **Estrutura hierárquica**: Organizar os estilos do mais geral para o mais específico.

### Arquivos Organizados
Abaixo está o status de padronização dos arquivos CSS:
- ✅ `versoes_base.css` - Reset e configurações globais
- ✅ `versoes_cabecalho.css` - Cabeçalho e títulos
- ✅ `versoes_navegacao.css` - Barra de navegação
- ✅ `versoes_conteudo.css` - Área de conteúdo principal
- ✅ `versoes_interface.css` - Elementos de interface
- ✅ `versoes_menulateral.css` - Menu lateral
- ✅ `versoes_busca.css` - Barra de busca
- ✅ `versoes_rodape.css` - Rodapé
- ✅ `modo_leitura.css` - Modo de leitura
- ✅ `biblia_realizabusca.css` - Sobreposição de busca
- ✅ `capitulos.css` - Capítulos e versículos
- ✅ `cursos.css` - Página de cursos
- ✅ `concordancia.css` - Concordância bíblica
- ✅ `dicionario.css` - Dicionário
- ✅ `dicionario_concordancia.css` - Integração dicionário e concordância
- ✅ `harpa_cantor.css` - Harpa Cristã
- ✅ `cantor_cristao.css` - Cantor Cristão
- ✅ `slide_biblia.css` - Slides bíblicos
- ✅ `slide_harpacantor.css` - Slides para Harpa Cristã
- ✅ `slide_harpacantor1.css` - Slides alternativos para Harpa Cristã

### Notas Adicionais
- **Preservação de comentários**: Todos os comentários existentes foram mantidos e, quando necessário, ajustados para seguir o padrão de verbos de ação e alinhamento à direita.
- **Consistência visual**: As cores, espaçamentos e fontes foram mantidos consistentes com os arquivos `versoes_*.css`, utilizando tons como `#d4ac0d` (dourado), `#181818` (fundo escuro) e `#4CAF50` (verde) onde aplicável.
- **Responsividade**: Media queries foram mantidas e organizadas no final dos arquivos, seguindo a mesma ordem de propriedades.

### Exemplo de Arquivo CSS
Os arquivos foram revisados para seguir o padrão exemplificado em `versoes_*.css`. Um exemplo de estrutura de bloco CSS:

```css
/* O bloco abaixo configura o container principal */
.container {
    /* === Layout e posicionamento === */
    display: flex;                    /* Habilita flexbox */
    position: relative;               /* Define posicionamento relativo */
    z-index: 1;                      /* Define ordem de sobreposição */
    /* === Box model === */
    width: 100%;                     /* Define largura total */
    margin: 0 auto;                  /* Centraliza horizontalmente */
    padding: 20px;                   /* Adiciona espaço interno */
    /* === Bordas e fundo === */
    background-color: #181818;        /* Define cor de fundo escura */
    border-radius: 8px;              /* Arredonda bordas */
    /* === Tipografia === */
    color: #fff;                     /* Define cor do texto */
    font-size: 16px;                 /* Define tamanho da fonte */
    /* === Efeitos e outros === */
    transition: all 0.3s ease;       /* Adiciona transição suave */
}
```