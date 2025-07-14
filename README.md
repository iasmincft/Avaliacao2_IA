# Avaliacao2_IA
 Resolução da segunda avaliação da disciplina de Inteligência Artificial 

# SJBot - Robô de Atendimento do Arraiá da Conquista

## Visão Geral do Projeto

O SJBot é um robô de atendimento (chatbot) desenvolvido como forma de avaliação da disciplina de Inteligência Artificial do curso de sistemas de Informação do IFBA, em que ele fornece informações rápidas e precisas sobre o "Arraiá da Conquista", um evento sediado em Vitória da Conquista, Bahia. O bot é construído utilizando a biblioteca `ChatterBot` em Python e expõe suas funcionalidades através de uma interface web responsiva, desenvolvida com `Flask` no backend e HTML, CSS e JavaScript no frontend.

O objetivo do SJBot é auxiliar os participantes do evento a obterem informações essenciais, como local, datas, programação, atrações e valor de ingresso, de forma intuitiva e acessível.

## Funcionalidades

* **Chatbot Interativo:** Responde a perguntas sobre o Arraiá da Conquista.

* **Interface Web:** Acesso ao chatbot via navegador web, com um design simples e intuitivo.

* **Persistência de Conversa:** O histórico da conversa é salvo localmente no navegador (`localStorage`).

* **Treinamento Personalizado:** O bot é treinado com um conjunto de dados JSON específico sobre o evento.

* **Indicador de Digitação:** Exibe "Digitando..." para uma melhor experiência do usuário enquanto aguarda a resposta do bot.

## Tecnologias Utilizadas

* **Backend:**

  * Python 3.x

  * Flask (Framework Web)

  * ChatterBot (Biblioteca de Chatbot)

  * ChatterBot Corpus (Dependência do ChatterBot, mesmo usando corpora personalizados)

  * SQLAlchemy (Para o adaptador de armazenamento do ChatterBot)

* **Frontend:**

  * HTML5

  * CSS3

  * JavaScript (ES6+)

## Estrutura do Projeto

.├── conversas/│   ├── informacoes_basicas.json│   └── saudacoes.json├── data/│   └── db.sqlite3  (Gerado após o treinamento do bot)├── index.html├── script.js├── servico.py├── style.css├── testes.py├── treinamento.py├── robo.py└── requirements.txt
* `conversas/`: Contém os arquivos JSON com os dados de treinamento para o chatbot.

* `data/`: Diretório para o arquivo de banco de dados SQLite do ChatterBot.

* `index.html`: A página principal da interface web do chatbot.

* `script.js`: Lógica JavaScript para a interatividade do frontend, comunicação com a API e manipulação do DOM.

* `servico.py`: Aplicação Flask que expõe a API do chatbot.

* `style.css`: Estilos CSS para a interface web.

* `testes.py`: Testes unitários para validar o comportamento do chatbot.

* `treinamento.py`: Script para treinar o chatbot com os dados dos arquivos JSON.

* `robo.py`: Módulo Python que encapsula a lógica principal do chatbot (inicialização e obtenção de respostas).

* `requirements.txt`: Lista de dependências Python do projeto.

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o SJBot em seu ambiente local.

### Pré-requisitos

* Python 3.9+ (recomendado 3.9 a 3.11, versões mais recentes como 3.12 podem exigir versões específicas de bibliotecas)

* `pip` (gerenciador de pacotes do Python)

### 1. Clonar o Repositório (ou organizar os arquivos)

Certifique-se de que todos os arquivos estejam organizados na estrutura de diretórios mostrada acima.

### 2. Criar e Ativar o Ambiente Virtual

É **altamente recomendado** usar um ambiente virtual para isolar as dependências do projeto do seu sistema Python global.

Navegue até a pasta raiz do projeto no seu terminal:

cd /caminho/para/seu/projeto/SJBot
Crie o ambiente virtual:

python3 -m venv venv
Ative o ambiente virtual:

* **No Linux / macOS:**

source venv/bin/activate
* **No Windows (Prompt de Comando):**

venv\Scripts\activate.bat
* **No Windows (PowerShell):**

.\venv\Scripts\Activate.ps1
Após a ativação, você verá `(venv)` no início da linha de comando.

### 3. Instalar as Dependências

Com o ambiente virtual ativado, instale as bibliotecas necessárias usando o `requirements.txt`:

pip install -r requirements.txt
**Nota:** Caso encontre erros de compatibilidade do `chatterbot` com sua versão do Python (por exemplo, `Requires-Python <=3.8`), certifique-se de que seu `requirements.txt` especifica `chatterbot==1.2.7` ou uma versão mais recente compatível com seu Python (o erro deve indicar as versões compatíveis). Se você seguiu as sugestões de usar `database_uri` no `robo.py` e `treinamento.py`, certifique-se de que `SQLAlchemy==1.4.49` (ou uma versão compatível) também esteja no seu `requirements.txt`.

### 4. Treinar o Chatbot

Antes de executar o serviço, você precisa treinar o chatbot para que ele aprenda com os dados fornecidos em `conversas/`.

Com o ambiente virtual ativado:

python treinamento.py
Este processo pode levar alguns segundos, dependendo do volume de dados. Ele criará (ou atualizará) o arquivo `db.sqlite3` dentro da pasta `data/`.

### 5. Iniciar o Serviço Web (API)

Após o treinamento, inicie o servidor Flask que irá expor a API do chatbot:

Com o ambiente virtual ativado:

python servico.py
Você verá uma mensagem no terminal indicando que o serviço está rodando, geralmente em `http://0.0.0.0:6000/` ou `http://127.0.0.1:6000/`.

### 6. Acessar a Interface Web

Abra seu navegador de preferência e acesse a URL:

http://localhost:6000
Você deverá ver a interface do SJBot. Digite suas perguntas na caixa de texto e pressione Enter ou clique em "Enviar" para interagir com o bot.

### Testando a API diretamente (opcional)

Você pode testar os endpoints da API diretamente no navegador ou usando ferramentas como `curl` ou Postman:

* **Informações do serviço:** `http://localhost:6000/`

* **Obter resposta do bot (exemplo):** `http://localhost:6000/resposta/ola`

## Executando os Testes

Para garantir que o bot está respondendo corretamente às perguntas esperadas, você pode rodar os testes unitários:

Com o ambiente virtual ativado:

python testes.py
## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões para melhorar o bot, adicionar mais dados de treinamento ou aprimorar a interface, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Nome da Licença, ex: Licença MIT]. (Você pode adicionar um arquivo `LICENSE` no projeto).
