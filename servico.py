from robo import inicializar, get_resposta as get_resposta_robo, NOME_ROBO
from flask import Flask, Response, send_from_directory
from flask_cors import CORS

import json
import logging
import os

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

servico = Flask(NOME_ROBO)
CORS(servico)
inicializado, robo = inicializar()

if not inicializado:
    logging.error("Não foi possível inicializar o SJBot. O serviço não funcionará corretamente.")
    
STATIC_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)))

@servico.get("/")
def serve_index():
    
    logging.info("Servindo index.html")
    return send_from_directory(STATIC_FOLDER, 'index.html')

@servico.get("/resposta/<string:mensagem>")
def get_resposta(mensagem):

    if not inicializado:
        logging.error("Tentativa de uso do robô não inicializado.")
        return Response(json.dumps({"erro": "Robô não inicializado"}), status=500, mimetype="application/json")

    try:
        resposta_texto, confianca = get_resposta_robo(robo, mensagem)
        resposta_json = {
            "resposta": resposta_texto,
            "confianca": confianca
        }
        logging.info(f"Resposta para '{mensagem}': '{resposta_texto}' (Confiança: {confianca})")
        return Response(json.dumps(resposta_json), status=200, mimetype="application/json")
    except Exception as e:
        logging.exception(f"Erro ao obter resposta para a mensagem '{mensagem}':")
        return Response(json.dumps({"erro": "Erro interno ao processar a mensagem"}), status=500, mimetype="application/json")

@servico.get("/style.css")
def serve_css():
    
    logging.info("Servindo style.css")
    return send_from_directory(STATIC_FOLDER, 'style.css')

@servico.get("/script.js")
def serve_js():
    
    logging.info("Servindo script.js")
    return send_from_directory(STATIC_FOLDER, 'script.js')

if __name__ == "__main__":
    if inicializado:
        
        logging.info("Iniciando serviço SJBot na porta 5000...")
        servico.run(host="0.0.0.0", port=5000, debug=True)
    else:
        logging.critical("Serviço SJBot não pode ser iniciado devido à falha de inicialização do robô.")
