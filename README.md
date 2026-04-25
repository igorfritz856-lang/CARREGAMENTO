# Transformação de Excel com Macros em Sistema Profissional

Este repositório define um **plano prático** para migrar um arquivo Excel com VBA/macros para um sistema robusto, seguro e escalável, com aparência de aplicação corporativa.

## Objetivo

Remover a característica de “planilha” e evoluir para um produto com:

- Interface de sistema (web).
- Regras de negócio centralizadas no back-end.
- Banco de dados relacional com trilha de auditoria.
- Controle de usuários, perfis e permissões.
- Deploy em ambiente corporativo (cloud/on-premise).

## Arquitetura recomendada

### 1) Front-end (apresentação de sistema)
- Framework: **React + TypeScript** (alternativa: Vue).
- UI Kit: **Material UI** ou Ant Design.
- Funcionalidades:
  - Dashboard executivo.
  - Telas de cadastro com validações.
  - Fluxos com status (ex.: Em análise, Aprovado, Reprovado).
  - Exportação em PDF/Excel para relatórios.

### 2) Back-end (regras de negócio)
- Stack: **FastAPI (Python)** ou **.NET**.
- Padrões:
  - API REST versionada (`/api/v1`).
  - Camada de serviço para regras que hoje estão no VBA.
  - Logs estruturados e tratamento central de erros.

### 3) Banco de dados
- **PostgreSQL**.
- Modelagem com:
  - Entidades principais do processo.
  - Histórico de alterações (auditoria).
  - Tabelas de apoio (domínios, parâmetros).

### 4) Segurança e governança
- Login corporativo (OAuth2/SSO quando possível).
- Controle de acesso por perfil (RBAC).
- Criptografia em trânsito (HTTPS) e backup automatizado.

---

## Estratégia de migração (passo a passo)

1. **Inventário do Excel atual**
   - Mapear planilhas, macros, fórmulas, botões, relatórios e integrações.
   - Identificar regras críticas e dependências manuais.

2. **Mapeamento funcional**
   - Converter cada macro em caso de uso do sistema.
   - Definir prioridade por impacto no negócio.

3. **Modelagem de dados**
   - Transformar abas em entidades relacionais.
   - Definir chaves, validações e integridade referencial.

4. **Prototipação de telas**
   - Wireframes com navegação por módulos.
   - Revisão com usuários-chave antes do desenvolvimento.

5. **Desenvolvimento incremental (MVP → evolução)**
   - Fase 1: cadastros e consulta.
   - Fase 2: workflow e regras avançadas.
   - Fase 3: relatórios, indicadores e integrações.

6. **Testes e homologação**
   - Testes unitários, integração e regressão funcional.
   - Comparação de resultados entre VBA e novo motor de regras.

7. **Go-live assistido**
   - Migração de dados.
   - Treinamento dos usuários.
   - Operação assistida com monitoramento.

---

## Conversão de macros para serviços

Padrão sugerido:

- `Macro VBA`: validações + cálculos + gravação em célula.
- `Serviço de domínio`: recebe payload, valida regras, calcula resultado e persiste no banco.
- `API`: expõe endpoints para UI.
- `UI`: apenas coleta dados, exibe resultados e estados de processo.

**Benefícios:**
- Reutilização da regra em vários pontos.
- Menos risco de quebra por edição manual.
- Rastreabilidade e auditoria nativas.

---

## Padrão visual para “cara de sistema”

Para eliminar o aspecto de planilha, aplicar:

- Menu lateral por módulos.
- Cabeçalho com contexto, usuário e filtros globais.
- Cards/KPIs com indicadores principais.
- Formulários com validações e mensagens amigáveis.
- Tabelas com paginação, ordenação e filtros.
- Tema institucional (cores, tipografia e ícones).

---

## Critérios de qualidade (pronto para produção)

- Cobertura mínima de testes por módulo crítico.
- Logs e observabilidade (monitoramento de erro/performance).
- Tempo de resposta aceitável para operações usuais.
- Processo de deploy controlado (CI/CD).
- Manual do usuário + manual técnico.

---

## Próximo passo recomendado

Se você compartilhar o arquivo Excel (estrutura das abas + lista de macros), o próximo deliverable ideal é:

1. Documento de **engenharia reversa do VBA**.
2. **Backlog técnico** (histórias + critérios de aceitação).
3. **Modelo de dados inicial**.
4. **Protótipo navegável** da nova interface.


---

## Esqueleto técnico inicial (implementado)

Estrutura criada neste repositório:

```text
backend/
  app/
    api/routes/{health.py,auth.py}
    core/{config.py,security.py}
    db/{base.py,session.py}
    models/user.py
    schemas/{auth.py,user.py}
    services/auth_service.py
    main.py
frontend/
  src/
    pages/{LoginPage.tsx,DashboardPage.tsx}
    {App.tsx,main.tsx,auth.tsx,api.ts,styles.css}
infra/
  docker-compose.yml
```

### O que já funciona

- API FastAPI com:
  - endpoint de saúde (`GET /api/v1/health`);
  - cadastro de usuário (`POST /api/v1/auth/register`);
  - login OAuth2 password (`POST /api/v1/auth/token`) com JWT.
- Banco configurado para PostgreSQL via Docker Compose.
- Frontend React + TypeScript com:
  - tela de login;
  - contexto de autenticação;
  - dashboard inicial após autenticação.

### Como subir o ambiente

1. Acesse `infra/`.
2. Execute:

```bash
docker compose up --build
```

3. URLs:
- Frontend: `http://localhost:5173`
- API: `http://localhost:8000`
- Docs API (Swagger): `http://localhost:8000/docs`

### Próximos incrementos recomendados

- Migração de banco com Alembic.
- Refresh token e política de expiração.
- RBAC completo por perfis.
- Módulos funcionais da regra de negócio migrada do VBA.

---

## Onde você aplica tudo isso na prática

Aplicação recomendada por fase:

- **Agora (imediato):** ambiente local para migrar e validar as primeiras macros.
- **Depois (validação com equipe):** ambiente de homologação com usuários reais.
- **Final (operação):** produção em nuvem ou servidor interno com segurança e monitoramento.

Consulte o guia objetivo em: `docs/onde-aplicar.md`.
