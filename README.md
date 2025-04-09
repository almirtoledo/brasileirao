# Brasileirão Scraper App 🏆

### ⚠️ Atenção! _Este projeto é apenas pra finalidade de estudos sobre scraping de dados e não deve ser utilizado pra fins comerciais ou replicação de conteúdo sem a prévia autorização dos portais produtores dos conteúdos_

Aplicação backend construída com [Bun](https://bun.sh/) e [Elysia](https://elysiajs.com/), utilizando arquitetura hexagonal, Clean Code, Domain-Driven Design (DDD) e CQRS para expor dados da tabela do Campeonato Brasileiro Série A.

## 📌 O que esse projeto faz

Esse microserviço realiza a raspagem de dados (web scraping) de sites que publicam a tabela atualizada do Brasileirão. Os dados são estruturados em uma entidade de domínio (`Team`) e expostos via uma rota HTTP.

A arquitetura desacoplada permite alternar facilmente entre diferentes fontes de dados (ex: Lance, Terra) sem alterar a lógica de aplicação ou domínio.

---

## 🚀 Rota disponível

### `GET /teams`

Retorna a lista de times da Série A com estatísticas atualizadas.

#### ✅ Exemplo de resposta:

```json
[
  {
    "position": 1,
    "teamName": "Botafogo",
    "teamLogo": "https://lance.com.br/logo-botafogo.png",
    "points": 59,
    "wins": 18,
    "draws": 5,
    "losses": 4,
    "goalsFor": 47,
    "goalsAgainst": 20,
    "goalDifference": 27,
    "efficiency": 73.2
  },
  {
    "position": 2,
    "teamName": "Palmeiras",
    "teamLogo": "https://lance.com.br/logo-palmeiras.png",
    "points": 57,
    "wins": 17,
    "draws": 6,
    "losses": 4,
    "goalsFor": 45,
    "goalsAgainst": 21,
    "goalDifference": 24,
    "efficiency": 70.3
  }
  // ...
]
```

---

## 🔁 Alternar fonte de dados

O sistema permite trocar facilmente a origem dos dados da tabela. Isso é possível graças ao uso de repositórios na camada de infraestrutura:

- Fonte atual: `LanceTeamRepository`
- Outra opção: `TerraTeamRepository`

Para trocar a fonte, basta alterar o repositório instanciado no arquivo:

```ts
// ./infra/http/teams.controller.ts

// de:
const repo = new LanceTeamRepository();

// para:
const repo = new TerraTeamRepository();
```

---

## 🧱 Arquitetura

- `domain/`: entidades, interfaces e regras de negócio
- `application/`: comandos, queries e casos de uso (CQRS)
- `infra/`: implementações concretas (scraper, http)
- `main.ts`: bootstrap da aplicação com Elysia

---

## 📦 Requisitos

- [Bun](https://bun.sh/) >= 1.0

## ▶️ Rodar o projeto

```bash
bun install
bun run main.ts
```

O servidor estará rodando em:

```
http://localhost:3000/teams
```

---

## 📄 Licença

MIT © 2025
