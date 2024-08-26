# Monitoramento de Sistema Remoto via SSH

## Descrição
Este projeto consiste em uma aplicação web que se conecta a servidores remotos via SSH para monitorar o estado do sistema em tempo real. O painel exibe informações sobre uso de CPU, memória, espaço em disco, processos em execução e uptime do servidor. Além disso, a aplicação permite a execução remota de comandos personalizados e a configuração de alertas e notificações.

## Arquitetura

O projeto segue a arquitetura MVC (Model-View-Controller):

- **Model (Modelo):**
  - Representa a lógica de negócios e os dados da aplicação.
  - Gerencia as informações sobre servidores SSH, conexões, métricas de monitoramento, histórico de comandos, e configuração de alertas.

- **View (Visão):**
  - Responsável pela apresentação dos dados ao usuário.
  - Utiliza HTML, CSS e JavaScript simples para renderizar as páginas web, sem o uso de frameworks de front-end.
  - As páginas são renderizadas diretamente pelo Express.js, usando templates como EJS, Pug, ou HTML puro.

- **Controller (Controlador):**
  - Atua como intermediário entre Model e View.
  - Recebe as requisições do usuário, processa-as através do Model e retorna as respostas formatadas via View.

## Funcionalidades

### Funcionalidades Básicas
- **Conexão SSH:**
  - Adicionar conexão em servidor SSH atraves de ip(ipv4 && ipv6).
  - Suporte para autenticação por senha.
  
- **Monitoramento em Tempo Real:**
  - Exibir uso de CPU (%), memória (%), espaço em disco (%), processos em execução e uptime do servidor.
  
- **Execução Remota de Comandos:**
  - Permitir a execução de comandos personalizados no servidor conectados.
  - Exibir o resultado dos comandos no painel.

- **Alertas e Notificações:**
  - Configurar alertas para quando determinados limites forem ultrapassados (ex.: CPU acima de 90%).
  - Enviar notificações por e-mail ou via Telegram.

### Funcionalidades Avançadas (Opcional)
- **Automação de Tarefas:**
  - Criação de scripts de automação que executam automaticamente sob certas condições.
  
- **Logs e Histórico:**
  - Registro de todas as conexões, comandos executados e dados de monitoramento.
  
- **Segurança Avançada:**
  - Implementação de autenticação em dois fatores (2FA) para acesso ao painel.
  - Criptografia de todas as comunicações entre a aplicação e o servidor.

## Tecnologias Utilizadas
- **Linguagem:** Node.js (ssh2)
- **Backend:** Express.js (seguindo a arquitetura MVC)
- **Frontend:** HTML, CSS, JavaScript (sem frameworks ou bibliotecas específicas)
- **Banco de Dados:** SQLite, PostgreSQL
- **Notificações:** SMTP para e-mail, Telegram API para mensagens

## Como Usar
1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/monitoramento-ssh.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd monitoramento-ssh
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Configure os servidores SSH no arquivo de configuração.

5. Execute a aplicação:
    ```bash
    npm start
    ```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.
