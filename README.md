# HireMate
> Um assistente de carreira movido a IA que otimiza currículos, acompanha suas candidaturas e dispara follow-ups inteligentes

## Setup
### Instalação
```bash
git clone [https://github.com/usuário/projeto.git](https://github.com/JaianeOliveira/hiremate-front.git)

cd hiremate-front

npm install
```
### Configuração de ambiente
1. Copie `.env.example` para `.env`
2. Preencha as variáveis de ambiente

### Rodando localmente
```bash
npm run dev
```
> OBS: Certifique-se de também estar com o [repositório da API](https://github.com/JaianeOliveira/hiremate-api) rodando localmente.

### Se preferir, pode rodar o projeto no docker
- `Dockerfile` para produção
- `Dockerfile.dev` para desenvolvimento
- Você também pode rodar o projeto completo (front, back e banco) de uma só vez com o `docker-compose.yaml` do repositório [hiremate-infra](https://github.com/JaianeOliveira/hiremate-infra)

## Stack utilizada
- **Frontend**: Next.js, TailwindCSS, ShadcnUI, Zod + React Hook Form, NextAuth
- **Backend**: NestJS, Typescript, Prisma ORM
- **Banco de dados**: PostgreSQL
- **CI/CD**: Github Actions, Docker
- **Testes**: Jest, react-testing-library

## Histórico
- O histórico de desenvolvimento pode ser acompanhado em [CHANGELOG.md](https://github.com/JaianeOliveira/hiremate-front/edit/main/CHANGELOG.md) ou [neste documento](https://docs.google.com/document/d/1bQ7UdGG1WodTpv903-e4fFPKZbGBLNAh-rQtcGIO9Nk/edit?usp=sharing)

## Meta
Jaiane Oliveira - [jaianeoliveira.dev@gmail.com](mailto:jaianeoliveira.dev@gmail.com)

[DEMONSTRATION ONLY LICENSE](LICENSE) – você pode baixar e rodar localmente, mas não redistribuir nem apresentar como seu. Veja `LICENSE` para mais informações.
