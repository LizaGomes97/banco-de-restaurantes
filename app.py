import os
import time

lista_restaurantes = [{'nome':'Oxe Baiano','categoria':'Baiana','ativo':False},
                      {'nome':'Club51','categoria':'Bar','ativo':True}, 
                      {'nome':'Suyan Yun','categoria':'Japonesa','ativo':False}]

###EXIBIÇOES

def exibir_subtitulo(texto):
    '''Essa funçao exibi o subtitulo dentro das opções do menu'''

    os.system('cls')
    linha = '*' * len(texto)
    print(linha)
    print(texto)
    print(linha)

def exibir_nome_do_programa():
    '''Essa funçao define o nome principal do programa que aparece no menu inicial'''

    print('''
    ░██████╗░█████╗░██████╗░░█████╗░██████╗░  ███████╗██╗░░██╗██████╗░██████╗░███████╗░██████╗░██████╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗  ██╔════╝╚██╗██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
    ╚█████╗░███████║██████╦╝██║░░██║██████╔╝  █████╗░░░╚███╔╝░██████╔╝██████╔╝█████╗░░╚█████╗░╚█████╗░
    ░╚═══██╗██╔══██║██╔══██╗██║░░██║██╔══██╗  ██╔══╝░░░██╔██╗░██╔═══╝░██╔══██╗██╔══╝░░░╚═══██╗░╚═══██╗
    ██████╔╝██║░░██║██████╦╝╚█████╔╝██║░░██║  ███████╗██╔╝╚██╗██║░░░░░██║░░██║███████╗██████╔╝██████╔╝
    ╚═════╝░╚═╝░░╚═╝╚═════╝░░╚════╝░╚═╝░░╚═╝  ╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝░░╚═╝╚══════╝╚═════╝░╚═════╝░
        ''')

def exibir_lista_restaurantes():
        '''Essa função exibi a lista de restaurantes'''

        print(f'Os restaurantes cadastrados são :\n')

        print(f'{'Nome do restaurante'.ljust(22)} | {'Categoria'.ljust(20)} | {'Estado Restaurante'} \n')
        for  restaurante in lista_restaurantes:
            nome_restaurante = restaurante['nome']
            categoria_restaurante = restaurante['categoria']
            status_restaurante = 'ativado'if restaurante['ativo'] else 'desativado'
            
            print(f'- {nome_restaurante.ljust(20)} | {categoria_restaurante.ljust(20)} | {status_restaurante}')

### MENUS
def menu_pricipal():
    '''Essa funçao define o menu principal, captura a opçao escolhida 
    e direciona para o caminho correto'''

    print('1. Cadastrar restaurante')
    print('2. Listar restaurante')
    print('3. Alternar status dos restaurantes')
    print('4. Sair\n')
    try:
        opcao_escolhida = int(input('Digite uma opção: '))
        print(f'Voce escolheu a opção {opcao_escolhida}')

        match opcao_escolhida:
            case 1:
                cadastrar_novo_restaurante()
            case 2:
                listar_restaurantes()
            case 3:
                alternar_estado_restaurante()
            case 4:
                finalizar_app()
            case _:
                opcao_invalida()
    except:
        opcao_invalida()

def submenu_cadastrar_restaurante():
        '''Essa funçao define o menu que aparece apos cadastrar um restaurante'''

        os.system('cls')
        exibir_subtitulo(''' Restaurante cadastrado com sucesso! ''')
        try:
            print('''\n1. Cadastrar um novo restaurante''')
            print('''Enter para voltar ao menu principal''')
            opcao = int(input('\n Escolha uma opção: '))
            match opcao:
                case 1:
                    cadastrar_novo_restaurante()
                case _:
                    main()
        except:
            main()
  
##VOLTAR AO MENU PRINCIPAL
def voltar_ao_menu_principal():
    '''Essa funçao é para voltar ao menu principal, 
    normalmente chamada no fim de algumas opçoes do menu principal'''

    input('\nTecle Enter para voltar ao menu principal')
    main()

## OPÇAO 1 DO MENU PRINCIPAL
def cadastrar_novo_restaurante():
    ''' 
    Essa funçao é responsavel por cadastrar um novo restaurante
    
    Inputs:
    - Nome do restaurante
    - Categoria
    
    Outputs:
    - Adiciona um novo restaurante a lista de restaurantes
    '''

    exibir_subtitulo(''' Cadastrar Restaurantes ''')

    nome_restaurante = input('\nDigite o nome do restaurante que deseja cadastrar: ')
    while len(nome_restaurante) < 3:
        print('Restaurante precisa ter ao menos 3 caracteres')
        print('Tente novamente')
        nome_restaurante = input('\nDigite o nome do restaurante que deseja cadastrar: ')

    categoria_restaurante = input(f'Digite o nome da categoria do restaurante {nome_restaurante}: ')
    while len(categoria_restaurante) < 3:
        print('Categoria precisa ter ao menos 3 caracteres')
        print('Tente novamente')
        categoria_restaurante = input(f'Digite o nome da categoria do restaurante {nome_restaurante}: ')

    dados_de_restaurante = {'nome':nome_restaurante,'categoria':categoria_restaurante, 'ativo':False}
    lista_restaurantes.append(dados_de_restaurante)
    print(f'Restaurante {nome_restaurante} cadastrado com sucesso na categoria {categoria_restaurante}\n')
    submenu_cadastrar_restaurante()

## OPÇAO 2 DO MENU PRINCIPAL
def listar_restaurantes():
    '''
    Essa funçao é uma das opçoes do menu principal

    Output:
    - Lista de restaurantes
    '''
    exibir_subtitulo('Listar Restaurantes')
    exibir_lista_restaurantes()
    voltar_ao_menu_principal()

## OPÇAO 3 DO MENU PRINCIPAL
def alternar_estado_restaurante():
    '''
    Essa funçao muda o estado do restaurante para ativo
    ou inativo no sistema

    Input: 
    - Qual restaurante alterar

    Output:
    - Restaurante com status contrario ao inicial
    '''

    exibir_subtitulo('Alterando estado do restaurante')

    exibir_lista_restaurantes()
    alterar_este_restaurante = input(f'\nQual restaurante voce gostaria de alterar? ')
    restaurante_encontrado = False
    for restaurante in lista_restaurantes:
        if alterar_este_restaurante == restaurante['nome']:
            restaurante_encontrado = True;
            restaurante['ativo'] = not restaurante['ativo'] #muda o status para ao contrario do atual
            mensagem = f'O restaurante {alterar_este_restaurante} foi ativado com sucesso' if restaurante['ativo'] else f'O restaurante {alterar_este_restaurante} foi desativado com sucesso'
            print(mensagem)
            voltar_ao_menu_principal()
    if not restaurante_encontrado:
        print('O restaurante não foi encontrado\n')
        print('Para tentar novamente aperte 1')
        print('Aperte enter para voltar ao menu principal')
        try:
            opcao = int(input('\n Escolha uma opção:'))
            match opcao:
                case 1:
                    alternar_estado_restaurante()
                case _:
                    opcao_invalida()
        except:
            main()
                
## OPÇAO 4 DO MENU PRINCIPAL
def finalizar_app():
    '''
    Essa funçao encerra o app
    '''

    os.system('cls')
    print('Finalizando o programa\n')
    time.sleep(3)

## OPÇAO INVALIDA
def opcao_invalida():
    '''
    Funçao utilizada para quando o usuario digita uma opçao invalida
    '''

    print('Opção invalida, voltando ao menu principal...')
    voltar_ao_menu_principal()       

##FUNÇAO PRINCIPAL  
def main():
    '''
    Função principal que inicia o programa
    '''
    
    os.system('cls')
    exibir_nome_do_programa()
    menu_pricipal()
  
if __name__ == '__main__':
    main()