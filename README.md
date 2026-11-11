# Frota (versão simples)

Sistema para controlar 3 caminhões e o financeiro pessoal, no mesmo formato das planilhas que já eram usadas. Funciona no celular e no computador.

## Telas

- **Caminhões**: escolha o caminhão e o mês. Os lançamentos aparecem separados em **01 a 15** e **16 a 31**, com as mesmas colunas da planilha: data, região, KM inicial, KM final, KM excedente, valor saída, diesel, valor frete, motorista, ajudante e obs.
  - O KM excedente é calculado sozinho: KM rodado menos a franquia do caminhão (130 km por padrão). Marcando **Pernoite**, aparece "PERNOITE".
  - Um lançamento novo já vem com o último KM do caminhão, o último valor de saída e as diárias do motorista e do ajudante.
  - Em **Editar caminhão** dá para mudar placa, nomes do motorista e do ajudante (aparecem nas colunas), diárias e franquia de KM.
  - Se num dia outra pessoa dirigiu ou ajudou, troque o nome no lançamento. Na tabela o nome aparece ao lado do valor.
- **Fechar quinzena** (botão em cada quinzena e no Financeiro): soma o frete de todos os caminhões e o que cada motorista e ajudante tem a receber, e grava no Financeiro com um clique.
  - Mostra o que já está lançado e avisa antes de trocar um valor diferente. Fechar de novo não duplica nada.
  - Se o nome da pessoa for diferente do nome da linha (ex.: Francisco → "Chico"), escolha a linha uma vez; o sistema lembra nas próximas.
- **Financeiro**: igual à planilha de controle financeiro. Entradas por quinzena, despesas de 01 a 15 e de 16 a 31, totais, saldo de cada quinzena, saldo do mês e acumulado do ano.
  - No computador mostra o ano inteiro; no celular mostra um mês por vez.
  - Clique no nome de uma linha para renomear, excluir ou **repetir o valor até dezembro** (contas fixas).
  - Abaixo de cada receita aparece, como referência, o total de frete dos caminhões naquela quinzena.
  - Ao abrir um ano novo, as linhas do ano anterior são copiadas (sem valores).
- **Resumo**: frete, diesel, motoristas/ajudantes e sobra dos caminhões por mês, e o financeiro por mês com acumulado.
  - **Baixar backup**: baixa um arquivo `.json` com tudo. Guarde de vez em quando.
  - **Importar arquivo**: carrega um backup ou o arquivo de importação das planilhas. Importar o mesmo arquivo de novo não duplica nada: lançamentos com o mesmo código são substituídos e as linhas do financeiro são achadas pelo nome.

## Arquitetura

- Worker JavaScript em `worker/index.js` (API) e `worker/ui.js` (tela, sem dependências).
- Banco Cloudflare D1. A versão simples usa as tabelas criadas em `drizzle/0009_versao_simples.sql` (`cam_caminhoes`, `cam_lancamentos`, `fin_linhas`, `fin_valores`). As tabelas da versão anterior continuam no banco, sem uso.

## Teste

Com Node.js 22 ou superior:

```text
node scripts/build.mjs
node scripts/validate-artifact.mjs
node scripts/smoke-test.mjs
```
