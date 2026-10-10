# Frota Fácil Pro

Sistema web responsivo para gestão de pequenas frotas. O piloto começa com três caminhões e os novos lançamentos zerados.

## Módulos

- Empresa, veículos, motoristas e clientes.
- Viagens, checklists, ocorrências e documentos.
- Abastecimento, manutenção preventiva e despesas.
- Financeiro com plano de contas, centros de custo, formas de pagamento e valor líquido.
- Regras automáticas para vencimentos de documentos, CNH, manutenção e contas.
- Integração preparada para WhatsApp Cloud API e e-mail transacional.
- Auditoria das operações e banco preparado para separar organizações.

## Arquitetura

- Worker JavaScript em `worker/index.js`.
- Interface responsiva sem dependências externas em `worker/ui.js`.
- Banco Cloudflare D1 com migrações SQL em `drizzle/`.
- Demonstração offline gerada por `scripts/build-offline-demo.mjs`.

## Testes

Com Node.js 22 ou superior:

```text
node scripts/build.mjs
node scripts/validate-artifact.mjs
node scripts/smoke-test.mjs
node scripts/build-offline-demo.mjs
```

O teste de fumaça cria o banco em memória, aplica todas as migrações e valida cadastro, edição, empresa, financeiro e automações sem duplicidade.

## Variáveis das integrações

Copie os nomes de `.env.example` para o ambiente protegido da hospedagem. Tokens e senhas nunca devem entrar no código ou no arquivo HTML.

Para WhatsApp são usados `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TEMPLATE_NAME`, `WHATSAPP_TEMPLATE_LANGUAGE` e `WHATSAPP_WEBHOOK_VERIFY_TOKEN`. O webhook é `/api/whatsapp/webhook`.

Para e-mail são usados `RESEND_API_KEY` e `EMAIL_FROM`.

## Antes de vender

A versão piloto ainda precisa de autenticação por usuário, isolamento real entre empresas, papéis e permissões, anexos, exportações, backup/restauração testados, monitoramento e documentação de privacidade/LGPD. Consulte `PLANO-COMERCIAL-FROTA-FACIL.md`.
