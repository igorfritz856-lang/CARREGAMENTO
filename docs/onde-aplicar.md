# Onde aplicar tudo isso (guia prático)

## 1) Ambiente de desenvolvimento (sua máquina)

Use este ambiente para começar a migração das macros e validar o funcionamento do sistema com poucos usuários.

### Quando usar
- Início do projeto.
- Prova de conceito.
- Validação rápida com time interno.

### Como aplicar
1. Instale Docker Desktop.
2. Rode `docker compose up --build` em `infra/`.
3. Acesse:
   - Frontend: `http://localhost:5173`
   - API: `http://localhost:8000`
   - Swagger: `http://localhost:8000/docs`

---

## 2) Ambiente de homologação (teste com usuários reais)

Use para validar processo completo antes de produção.

### Quando usar
- Equipe de negócio testando fluxos.
- Aprovação de regras migradas do VBA.
- Teste de performance inicial.

### Como aplicar
- Suba os mesmos 3 serviços (frontend, backend e PostgreSQL) em um servidor de homologação.
- Cadastre usuários reais por perfil (analista, aprovador, gestor).
- Compare saídas do novo sistema com resultados atuais do Excel.

---

## 3) Ambiente de produção (uso oficial)

Use quando as regras críticas estiverem validadas.

### Quando usar
- Após homologação aprovada.
- Usuários operando diariamente no sistema.

### Como aplicar
- Hospede backend e frontend em nuvem (Azure, AWS, GCP) ou datacenter interno.
- Use PostgreSQL gerenciado ou banco com backup automático.
- Ative HTTPS, monitoramento, logs e política de backup.
- Configure autenticação corporativa (SSO) e perfis de acesso.

---

## Mapeamento direto: do Excel para o sistema

- **Planilhas/abas** → tabelas no banco (PostgreSQL).
- **Macros VBA** → serviços de negócio no backend (FastAPI).
- **Botões/formulários no Excel** → telas web no frontend (React).
- **Usuários editando células** → usuários autenticados com trilha de auditoria.

---

## Ordem de execução recomendada

1. Escolha um processo crítico do Excel (ex.: cálculo de carga).
2. Migre apenas esse fluxo para o backend.
3. Crie uma tela web para entrada e consulta.
4. Valide com usuários e compare resultado com Excel.
5. Repita para os próximos fluxos até aposentar a planilha.
