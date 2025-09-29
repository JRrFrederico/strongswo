# Bíblia Sagrada Online

#### Início do projeto: Agosto de 2024

## Visão Geral

Este projeto é uma aplicação web interativa para leitura e estudo da Bíblia Sagrada, desenvolvida com foco em uma experiência de usuário amigável, intuitiva e completa. A aplicação foi construída com **HTML5, CSS3 e JavaScript puro**, sem o uso de frameworks, como um exercício prático para aprofundar e consolidar conhecimentos fundamentais de desenvolvimento web.

O objetivo principal é oferecer uma ferramenta online robusta e acessível, que vai além da simples leitura, incorporando um ecossistema de recursos complementares para estudo e adoração.

## Recursos

- **Múltiplas Versões da Bíblia**: Inclui diversas traduções populares como Almeida Revista e Atualizada (ARA), Almeida Corrigida e Fiel (ACF), Nova Versão Internacional (NVI), e a Bíblia Católica (Vulgata Latina).
- **Conteúdos Complementares**: Acesso à Harpa Cristã e ao Cantor Cristão (Hinário Batista).
- **Ferramentas de Estudo**:
  - **Dicionário Bíblico**: Para consulta rápida de termos e seus significados.
  - **Concordância Bíblica**: Permite localizar todas as ocorrências de uma palavra ou frase em toda a Bíblia.
- **Projeção de Versículos (Modo Slide)**: Uma interface otimizada para apresentações em tela cheia (Datashow), com controles de navegação simples e design limpo.
- **Downloads**: Disponibiliza diversas versões da Bíblia e estudos em formato PDF para acesso offline.
- **Utilitários**: Links para cursos e outras ferramentas que enriquecem a experiência de estudo.

## Estrutura do Projeto

A estrutura de pastas foi organizada para garantir modularidade e facilitar a manutenção:

```
bibliav1/
├── index.html              # Página inicial da aplicação
├── style.css               # Folha de estilo principal
├── script.js               # Script principal com a lógica geral
├── html/                   # Páginas HTML para as diferentes seções
├── css/                    # Arquivos CSS específicos para cada seção
├── script/                 # Scripts JavaScript modulares
├── ver/                    # Arquivos de documentação do projeto
├── concordancia/           # Dados da Concordância Bíblica (JSON)
├── dicionario/             # Dados do Dicionário Bíblico (JSON)
├── harpacrista/            # Hinos da Harpa Cristã (JSON)
├── cantorcristao/          # Hinos do Cantor Cristão (JSON)
├── versao/                 # Dados das diferentes versões da Bíblia (JSON)
├── baixar/                 # Arquivos PDF para download
└── img/                    # Imagens e ícones
```

## Como Usar

1.  **Clonar o Repositório**:
    ```bash
    git clone https://github.com/seu-usuario/bibliav1.git
    ```
2.  **Abrir o Projeto**: Abra a pasta do projeto em um editor de código (ex: Visual Studio Code).
3.  **Executar**: Abra o arquivo `index.html` em seu navegador de preferência.

## Contribuição

Se você deseja contribuir para a melhoria deste projeto, siga os passos abaixo:

1.  Faça um **fork** do repositório.
2.  Crie uma nova **branch** (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e **commit** (`git commit -m 'Adiciona sua feature'`).
4.  Envie para a sua branch (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato pelo e-mail: wagnerffreitas1973@gmail.com.
