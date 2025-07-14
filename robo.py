from chatterbot import ChatBot
from chatterbot.logic import BestMatch

NOME_ROBO = "SJBot"
CONFIANCA_MINIMA = 0.65

def inicializar():
    inicializado, robo = False, None

    try:
        robo = ChatBot(NOME_ROBO, read_only=True, logic_adapters=[{
            "import_path": "chatterbot.logic.BestMatch",
            "statement_comparison_function": "chatterbot.comparisons.JaccardSimilarity",
            "response_selection_method": "chatterbot.response_selection.get_first_response"
                
        }])

        inicializado = True
    except Exception as e:
        print(f"erro inicilizando o {NOME_ROBO}: {str(e)}")
        
    return inicializado, robo

def get_resposta(robo, mensagem):
    resposta = robo.get_response(mensagem.lower())

    return resposta.text, resposta.confidence
