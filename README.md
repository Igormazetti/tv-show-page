# Tela de Detalhes de Programas de TV

Uma aplicação moderna e responsiva de navegação de programas de TV, desenvolvida com JavaScript ES6+ vanilla e SCSS. Este projeto exibe informações detalhadas sobre programas de TV, incluindo episódios, elenco e metadados.

## Demo Online

[Ver Aplicação](https://igormazetti.github.io/tv-show-page/)

## Funcionalidades

- **Navegador de Episódios**: Navegue através de temporadas e episódios com uma interface intuitiva
- **Detalhes Interativos**: Clique em qualquer episódio para ver informações detalhadas
- **Navegação por Abas**: Alterne entre informações Gerais, Elenco e Prêmios
- **Design Responsivo**: Layout totalmente responsivo que funciona em desktop, tablet e dispositivos móveis
- **Integração com API**: Busca de dados em tempo real de API externa

## Tecnologias Utilizadas

### Tecnologias Principais
- **HTML5**: Estrutura de marcação semântica
- **CSS3**: Estilização moderna com animações e transições
- **JavaScript ES6+**: JavaScript vanilla com arquitetura baseada em componentes
  - Classes e módulos
  - Arrow functions
  - Promises e async/await
  - Desestruturação e spread operators

### Ferramentas de Build e Dependências
- **Vite**: Ferramenta moderna de build e servidor de desenvolvimento
- **SASS/SCSS**: Pré-processador CSS para estilos sustentáveis
- **Bluebird**: Biblioteca utilitária de Promises para operações assíncronas paralelas
- **gh-pages**: Deploy automatizado para GitHub Pages

### Arquitetura CSS
  - Estrutura SCSS organizada:
  - `abstracts/`: Variáveis e mixins
  - `base/`: Reset e tipografia
  - `components/`: Estilos específicos de componentes
  - `layout/`: Estilos de layout
- **Nomenclatura baseada em componentes**: Classes claras e descritivas
- **Design responsivo**: Abordagem mobile-first com breakpoints

## Estrutura do Projeto

```
testes/
├── src/
│   ├── js/
│   │   ├── main.js                    # Ponto de entrada principal da aplicação
│   │   ├── api/
│   │   │   └── tvShowService.js       # Serviço de API para buscar dados
│   │   ├── components/
│   │   │   ├── Header.js              # Cabeçalho do programa com metadados
│   │   │   ├── Tabs.js                # Componente de navegação por abas
│   │   │   ├── EpisodeList.js         # Seletor de temporada e lista de episódios
│   │   │   ├── EpisodeDetail.js       # Visualização detalhada do episódio
│   │   │   └── CastSection.js         # Carrossel de membros do elenco
│   │   └── utils/
│   │       └── helpers.js             # Funções utilitárias
│   ├── styles/
│   │   ├── main.scss                  # Importação principal de estilos
│   │   ├── abstracts/
│   │   │   ├── _variables.scss        # Tokens de design (cores, espaçamento, etc.)
│   │   │   └── _mixins.scss           # Mixins SCSS reutilizáveis
│   │   ├── base/
│   │   │   ├── _reset.scss            # Reset CSS
│   │   │   └── _typography.scss       # Estilos de tipografia
│   │   ├── components/
│   │   │   ├── _header.scss           # Estilos do componente Header
│   │   │   ├── _tabs.scss             # Estilos de navegação por abas
│   │   │   ├── _episode-list.scss     # Estilos da lista de episódios
│   │   │   ├── _episode-detail.scss   # Estilos de detalhes do episódio
│   │   │   ├── _cast-section.scss     # Estilos da seção de elenco
│   │   │   └── _synopsis.scss         # Estilos da seção de sinopse
│   │   └── layout/
│   │       ├── _overlay.scss          # Estilos do container overlay
│   │       └── _content.scss          # Estilos da área de conteúdo principal
│   └── assets/
│       └── telecine.png               # Logo da marca
├── index.html                         # Ponto de entrada HTML
├── vite.config.js                     # Configuração do Vite
├── package.json                       # Dependências e scripts do projeto
└── README.md                          # Documentação do projeto
```

## Instalação e Configuração

### Pré-requisitos
- Node.js
- npm ou yarn

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/igormazetti/tv-show-page.git
cd tv-show-page
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
A aplicação será iniciada em `http://localhost:3000` e abrirá automaticamente no navegador.

### Passo 4: Build para Produção
```bash
npm run build
```
Isso cria um build de produção otimizado na pasta `dist/`.

### Passo 5: Visualizar o Build de Produção
```bash
npm run preview
```
Visualize o build de produção localmente antes do deploy.

## Deploy

### Deploy no GitHub Pages

O projeto está configurado para deploy automatizado no GitHub Pages.

#### Opção 1: Deploy Automatizado (Recomendado)
```bash
npm run deploy
```
Este comando irá:
1. Criar o build de produção
2. Fazer o deploy no GitHub Pages
3. Disponibilizar o site em `https://[seu-usuario].github.io/tv-show-page/`

#### Opção 2: Deploy Manual
1. Crie o build do projeto: `npm run build`
2. Faça push da pasta `dist/` para o branch `gh-pages`
3. Habilite o GitHub Pages nas configurações do repositório

### Configuração do Repositório GitHub
1. Vá para as configurações do seu repositório
2. Navegue até a seção "Pages"
3. A source deve estar configurada para o branch `gh-pages`
4. O site será publicado na URL mostrada

## Integração com API

### Endpoints da API
A aplicação busca dados dos seguintes endpoints:

**URL Base**: `https://agile-releases.s3.us-east-1.amazonaws.com/tests`

1. **Dados do Programa**:
   - Endpoint: `/tv-shows/SHOW123.json`
   - Retorna: Metadados do programa (título, gêneros, ano, elenco, sinopse, imagens)

2. **Dados de Episódios**:
   - Endpoint: `/episodes/SHOW123.json`
   - Retorna: Array de episódios com informações de temporada, títulos, sinopses, imagens, durações

### Estratégia de Busca de Dados
- Busca paralela de dados usando `Promise.props()` do Bluebird
- Tratamento de erros para requisições falhadas
- Filtragem de dados para remover episódios nulos/inválidos
- Estados de carregamento durante a busca de dados

## Sistema de Design

### Paleta de Cores
- **Cor Primária**: `#e50914`
- **Cor de Destaque**: `#46d369` 
- **Fundo**: `#141414`
- **Texto**: `#ffffff` / `#808080` 

### Tipografia
- **Família da Fonte**: Nunito (Google Fonts)
- **Pesos**: 300, 400, 600, 700, 800

### Escala de Espaçamento
- Unidade base: 8px
- Escala: 8px, 16px, 24px, 32px, 40px, 48px

### Breakpoints
- **Mobile**: 576px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Desktop Grande**: 1280px

## Arquitetura de Componentes

A aplicação segue um padrão de arquitetura baseada em componentes:

### Estrutura de Componentes
Cada componente é uma classe JavaScript com:
- Construtor aceitando dados como props
- Método `render()` retornando elementos DOM
- Event listeners para interações do usuário
- Gerenciamento de estado interno

### Componentes Principais
1. **App** (`main.js`): Orquestrador da aplicação
2. **Header**: Exibe título e metadados do programa
3. **Tabs**: Navegação entre Geral, Elenco e Prêmios
4. **EpisodeList**: Seletor de temporada e lista de episódios
5. **EpisodeDetail**: Informações detalhadas do episódio
6. **CastSection**: Carrossel de membros do elenco

### Fluxo de Dados
```
Inicialização do App
    ↓
Busca de dados da API (paralela)
    ↓
Dados passados para componentes
    ↓
Componentes renderizam no DOM
    ↓
Interações do usuário atualizam o estado
    ↓
Componentes re-renderizam conforme necessário
```
## Qualidade de Código

### Melhores Práticas JavaScript
- Sintaxe moderna ES6+
- Arquitetura baseada em componentes
- Separação de responsabilidades
- Princípio DRY (Don't Repeat Yourself)
- Convenções de nomenclatura claras

### Melhores Práticas CSS
- Estilos com escopo de componente
- Mixins e variáveis reutilizáveis
- Design responsivo mobile-first
- Convenções de nomenclatura consistentes


## Autor

**Igor Mazetti de Azevedo**