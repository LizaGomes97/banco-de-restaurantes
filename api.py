from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import time

# Importando seu código original
# (assumindo que está no mesmo diretório como app.py)
import app

# Configuração do diretório de frontend
FRONTEND_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frontend')

# Criando a aplicação Flask
api = Flask(__name__, static_folder=FRONTEND_FOLDER)
CORS(api)  # Habilita CORS para permitir requisições do frontend

# Rota para a página inicial (frontend)
@api.route('/')
def index():
    return send_from_directory(FRONTEND_FOLDER, 'index.html')

# Rota para os arquivos estáticos
@api.route('/<path:path>')
def static_files(path):
    return send_from_directory(FRONTEND_FOLDER, path)

# Rota para listar todos os restaurantes
@api.route('/api/restaurantes', methods=['GET'])
def listar_restaurantes():
    return jsonify(app.lista_restaurantes)

# Rota para adicionar um novo restaurante
@api.route('/api/restaurantes', methods=['POST'])
def adicionar_restaurante():
    dados = request.json
    
    # Validação dos dados
    if not dados or 'nome' not in dados or 'categoria' not in dados:
        return jsonify({"erro": "Dados incompletos"}), 400
    
    nome = dados['nome']
    categoria = dados['categoria']
    
    # Validação do tamanho do nome e categoria
    if len(nome) < 3:
        return jsonify({"erro": "O nome do restaurante precisa ter ao menos 3 caracteres"}), 400
    
    if len(categoria) < 3:
        return jsonify({"erro": "A categoria precisa ter ao menos 3 caracteres"}), 400
    
    # Criar e adicionar o novo restaurante
    novo_restaurante = {
        'nome': nome,
        'categoria': categoria,
        'ativo': False
    }
    
    app.lista_restaurantes.append(novo_restaurante)
    
    return jsonify({"mensagem": "Restaurante cadastrado com sucesso", "restaurante": novo_restaurante}), 201

# Rota para alterar o status de um restaurante
@api.route('/api/restaurantes/<nome>/status', methods=['PUT'])
def alterar_status_restaurante(nome):
    # Buscar o restaurante pelo nome
    restaurante_encontrado = False
    for restaurante in app.lista_restaurantes:
        if restaurante['nome'] == nome:
            restaurante_encontrado = True
            restaurante['ativo'] = not restaurante['ativo']  # Inverter o status
            status = "ativado" if restaurante['ativo'] else "desativado"
            return jsonify({
                "mensagem": f"O restaurante {nome} foi {status} com sucesso",
                "restaurante": restaurante
            })
    
    # Se o restaurante não foi encontrado
    if not restaurante_encontrado:
        return jsonify({"erro": "Restaurante não encontrado"}), 404

# Inicialização do servidor
if __name__ == '__main__':
    print("Verificando diretório de frontend:", FRONTEND_FOLDER)
    if not os.path.exists(FRONTEND_FOLDER):
        print("Criando diretório frontend...")
        os.makedirs(FRONTEND_FOLDER, exist_ok=True)
        print("Por favor, coloque os arquivos HTML, JS e CSS na pasta 'frontend'.")
    else:
        print("Diretório frontend encontrado.")
        index_path = os.path.join(FRONTEND_FOLDER, 'index.html')
        if not os.path.exists(index_path):
            print("AVISO: Arquivo index.html não encontrado em:", index_path)
            print("Certifique-se de criar o arquivo index.html na pasta 'frontend'.")
    
    print("Iniciando API do Sabor Express...")
    api.run(debug=True, host='0.0.0.0', port=5000)