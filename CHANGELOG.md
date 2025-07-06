# Changelog

## [Unreleased]

### Todo

- Criar testes para os módulos:
  - Users
  - Accounts
  - Sessions
  - Applications
- Cron job para:
  - Envio de e-mails de follow-up e arquivamento de candidaturas
  - Atualização automática de status de candidaturas por tempo

## [0.4.0] – 2025-07-05

### Added

- (API) CRUD de candidaturas e endpoint de listagem de empresas
- Tabela de listagem de candidaturas com os filtros de status, empresa, busca por título e paginação.

## [0.3.0] – 2025-06-29

### Changed

- Atualização na forma que o login social é feito. Agora usamos JWT com criação de usuário no banco. Futuramente pretendo expandir para uma abordagm mista de sessão + JWT.

### Added

- Sidebar global da área privada da aplicação
- Tabela e modais mockados na página de aplicações

## [0.2.0] – 2025-06-28

### Added

- Autenticação social com Google via NextAuth
  - Adapter personalizado para conectar à API
  - Proteção de rotas e recuperação de sessão
- Página inicial do projeto
- Tema escuro na aplicação

## [0.1.0] – 2025-06-22

### Added

- Planejamento e idealização da plataforma (lista de funcionalidades e definição do MVP)
- Documentos iniciais:
  - Documento de Requisitos (“Plataforma Assistente de Processos Seletivos.docx”)
  - Backlog do Projeto (“Backlog do Projeto.docx”)
- Setup inicial do repositório:
  - Criação dos repositórios **front** e **back**
  - Configuração de testes
- Infraestrutura em Docker:
  - Dockerfiles para front e back
  - Docker Compose para front, back e banco de dados
