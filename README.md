<a href="https://github.com/SEFAZ-AC#gh-light-mode-only">
  <img src="conjunto-verde-horizontal.png" alt="Assinatura Sefaz-AC e Governo do Estado do Acre" style="max-width: 500px; margin-left:auto; margin-right:auto; display:block">
</a>


<a href="https://github.com/SEFAZ-AC#gh-dark-mode-only">
  <img src="conjunto-branco-horizontal.png" alt="Assinatura Sefaz-AC e Governo do Estado do Acre" style="max-width: 500px; margin-left:auto; margin-right:auto; display:block">
</a>


#### `Manuais de Usuário - SICAF`


[![Gene\ric badge](https://img.shields.io/badge/TypeScript-gray?logo=typescript)](https://shields.io/)
[![Gene\ric badge](https://img.shields.io/badge/Node.js-gray?logo=nodedotjs)](https://shields.io/)
[![Gene\ric badge](https://img.shields.io/badge/npm-gray?logo=npm)](https://shields.io/)
[![Gene\ric badge](https://img.shields.io/badge/Prisma-gray?logo=prisma)](https://shields.io/)
[![Gene\ric badge](https://img.shields.io/badge/Next.js-gray?logo=nextdotjs)](https://shields.io/)
[![Gene\ric badge](https://img.shields.io/badge/React-gray?logo=react)](https://shields.io/)
[![Gene\ric badge](https://img.shields.io/badge/Tailwind_CSS-gray?logo=tailwindcss)](https://shields.io/)
[![Gene\ric badge](https://img.shields.io/badge/v.-1.0.0-silver)](https://shields.io/)


# manuais-sicaf


> O **manuais-sicaf** é um guia interativo para usuários e gestores do Sistema Integrado de Contabilidade e Administração Financeira do Estado do Acre (SICAF). O projeto foi idealizado e é mantido pelo time de TI da Diretoria da Contabilidade Geral do Estado, da Secretaria de Estado da Fazenda do Estado do Acre (DICONGE-SEFAZ/AC).


## 💻 Pré-requisitos


Antes de começar, verifique se seu ambiente atende aos seguintes requisitos:


- Node.js (v18.0+)
- npm ou yarn
- MySQL / MariaDB (v8.0+) || SQLite (v3.0+)
- Git


## 🚀 Instalação


Para instalar o **manuais-sicaf** localmente, siga os passos abaixo:


1. Clone o repositório:


```bash
git clone https://github.com/SEFAZ-AC/manuais-sicaf.git
cd manuais-sicaf
```


2. Instale as dependências:


```bash
npm install
```


3. Crie o arquivo de variáveis de ambiente:


```bash
cp .env.example .env
```


4.  Configure as credenciais de banco de dados e autenticação indicadas no arquivo `.env`.


> Opcional: Altere o provider de banco de dados no arquivo `prisma/schema.prisma` (sqlite por padrão)


5.  Execute as migrações do Prisma:


```bash
npx prisma migrate dev
```


## ☕ Rodando a aplicação


Após [clonar e configurar](#-instalação) o projeto, inicie o servidor de desenvolvimento:


```bash
npm run dev
```

Ou prepare o build de produção e veja o preview:


```bash
npm run build
npm run start
```

Em ambos os casos, você poderá acessar o SICAF localmente em `http://localhost:3000`.


## 📫 Contribuindo


Para contribuir com manuais-sicaf, siga estas etapas:


1. Fork este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin develop`
5. Crie a solicitação de pull.


Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).


## ☎️ Contato


Se tiver dúvidas ou sugestões, escreva para sosnoski.dev@gmail.com.


---


Criado com ❤️ pela equipe de TI da DICONGE - SEFAZ - AC

