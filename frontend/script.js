// Dados iniciais - no caso real viriam do seu backend Python
let listaRestaurantes = [
  { nome: "Oxe Baiano", categoria: "Baiana", ativo: false },
  { nome: "Club51", categoria: "Bar", ativo: true },
  { nome: "Suyan Yun", categoria: "Japonesa", ativo: false },
];

// Elementos da interface
const areaMenuPrincipal = document.getElementById("area-menu-principal");
const areaCadastro = document.getElementById("area-cadastro");
const areaSucessoCadastro = document.getElementById("area-sucesso-cadastro");
const areaListagem = document.getElementById("area-listagem");
const areaAlternarStatus = document.getElementById("area-alternar-status");

// Botões do menu principal
document
  .getElementById("btn-cadastrar")
  .addEventListener("click", mostrarTelaDecadastro);
document
  .getElementById("btn-listar")
  .addEventListener("click", mostrarTelaListagem);
document
  .getElementById("btn-alternar")
  .addEventListener("click", mostrarTelaAlternarStatus);
document.getElementById("btn-sair").addEventListener("click", finalizarApp);

// Botões de voltar
document
  .getElementById("btn-voltar-cadastro")
  .addEventListener("click", voltarParaMenuPrincipal);
document
  .getElementById("btn-menu-apos-cadastro")
  .addEventListener("click", voltarParaMenuPrincipal);
document
  .getElementById("btn-voltar-listagem")
  .addEventListener("click", voltarParaMenuPrincipal);
document
  .getElementById("btn-voltar-alternar")
  .addEventListener("click", voltarParaMenuPrincipal);
document
  .getElementById("btn-novo-cadastro")
  .addEventListener("click", mostrarTelaDecadastro);

// Formulário de cadastro
const formCadastro = document.getElementById("form-cadastro");
formCadastro.addEventListener("submit", cadastrarRestaurante);

// Alternar status
document
  .getElementById("select-restaurante")
  .addEventListener("change", habilitarBotaoAlternarStatus);
document
  .getElementById("btn-alternar-status")
  .addEventListener("click", alternarStatus);

// Funções para mostrar/ocultar áreas da aplicação
function esconderTodasAsAreas() {
  areaMenuPrincipal.classList.add("hidden");
  areaCadastro.classList.add("hidden");
  areaSucessoCadastro.classList.add("hidden");
  areaListagem.classList.add("hidden");
  areaAlternarStatus.classList.add("hidden");
}

function mostrarTelaDecadastro() {
  esconderTodasAsAreas();
  areaCadastro.classList.remove("hidden");

  // Limpar formulário
  document.getElementById("nome-restaurante").value = "";
  document.getElementById("categoria-restaurante").value = "";
  document.getElementById("mensagem-erro").classList.add("hidden");
}

function mostrarTelaListagem() {
  esconderTodasAsAreas();
  atualizarTabelaRestaurantes();
  areaListagem.classList.remove("hidden");
}

function mostrarTelaAlternarStatus() {
  esconderTodasAsAreas();
  atualizarTabelaAlternarStatus();
  atualizarSelectRestaurantes();
  areaAlternarStatus.classList.remove("hidden");

  // Limpar mensagem de alteração
  const mensagemAlteracao = document.getElementById("mensagem-alteracao");
  mensagemAlteracao.classList.add("hidden");
  mensagemAlteracao.textContent = "";

  // Desabilitar botão de alternar
  document.getElementById("btn-alternar-status").disabled = true;
}

function voltarParaMenuPrincipal() {
  esconderTodasAsAreas();
  areaMenuPrincipal.classList.remove("hidden");
}

// Função para cadastrar um novo restaurante
function cadastrarRestaurante(event) {
  event.preventDefault();

  const nomeRestaurante = document
    .getElementById("nome-restaurante")
    .value.trim();
  const categoriaRestaurante = document
    .getElementById("categoria-restaurante")
    .value.trim();
  const mensagemErro = document.getElementById("mensagem-erro");

  // Validações
  if (nomeRestaurante.length < 3) {
    mensagemErro.textContent =
      "O nome do restaurante precisa ter ao menos 3 caracteres";
    mensagemErro.classList.remove("hidden");
    return;
  }

  if (categoriaRestaurante.length < 3) {
    mensagemErro.textContent = "A categoria precisa ter ao menos 3 caracteres";
    mensagemErro.classList.remove("hidden");
    return;
  }

  // Adicionar restaurante à lista
  const novoRestaurante = {
    nome: nomeRestaurante,
    categoria: categoriaRestaurante,
    ativo: false,
  };

  listaRestaurantes.push(novoRestaurante);

  // Mostrar mensagem de sucesso
  document.getElementById(
    "mensagem-sucesso"
  ).textContent = `O restaurante ${nomeRestaurante} foi adicionado à categoria ${categoriaRestaurante}.`;

  esconderTodasAsAreas();
  areaSucessoCadastro.classList.remove("hidden");

  // No caso real, aqui você enviaria os dados para seu backend Python
  console.log("Restaurante cadastrado:", novoRestaurante);

  // Comunicação com o backend Python
  fetch("/api/restaurantes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoRestaurante),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

// Função para atualizar a tabela de restaurantes
function atualizarTabelaRestaurantes() {
  const tabelaRestaurantes = document.getElementById("tabela-restaurantes");
  tabelaRestaurantes.innerHTML = "";

  listaRestaurantes.forEach((restaurante, indice) => {
    const linha = document.createElement("tr");
    linha.className = indice % 2 === 0 ? "bg-gray-100" : "bg-white";

    const tdNome = document.createElement("td");
    tdNome.className = "py-3 px-4 border-b";
    tdNome.textContent = restaurante.nome;

    const tdCategoria = document.createElement("td");
    tdCategoria.className = "py-3 px-4 border-b";
    tdCategoria.textContent = restaurante.categoria;

    const tdStatus = document.createElement("td");
    tdStatus.className = "py-3 px-4 border-b";

    const spanStatus = document.createElement("span");
    spanStatus.className = `px-2 py-1 rounded text-white ${
      restaurante.ativo ? "bg-green-500" : "bg-red-500"
    }`;
    spanStatus.textContent = restaurante.ativo ? "Ativado" : "Desativado";

    tdStatus.appendChild(spanStatus);

    linha.appendChild(tdNome);
    linha.appendChild(tdCategoria);
    linha.appendChild(tdStatus);

    tabelaRestaurantes.appendChild(linha);
  });
}

// Função para atualizar a tabela na tela de alternar status
function atualizarTabelaAlternarStatus() {
  const tabelaAlternarStatus = document.getElementById(
    "tabela-alternar-status"
  );
  tabelaAlternarStatus.innerHTML = "";

  listaRestaurantes.forEach((restaurante, indice) => {
    const linha = document.createElement("tr");
    linha.className = `${
      indice % 2 === 0 ? "bg-gray-100" : "bg-white"
    } cursor-pointer hover:bg-blue-50`;
    linha.addEventListener("click", () => {
      document.getElementById("select-restaurante").value = restaurante.nome;
      document.getElementById("btn-alternar-status").disabled = false;

      // Destacar a linha selecionada
      const todasLinhas = tabelaAlternarStatus.querySelectorAll("tr");
      todasLinhas.forEach((tr) => tr.classList.remove("bg-blue-100"));
      linha.classList.add("bg-blue-100");
    });

    const tdNome = document.createElement("td");
    tdNome.className = "py-3 px-4 border-b";
    tdNome.textContent = restaurante.nome;

    const tdCategoria = document.createElement("td");
    tdCategoria.className = "py-3 px-4 border-b";
    tdCategoria.textContent = restaurante.categoria;

    const tdStatus = document.createElement("td");
    tdStatus.className = "py-3 px-4 border-b";

    const spanStatus = document.createElement("span");
    spanStatus.className = `px-2 py-1 rounded text-white ${
      restaurante.ativo ? "bg-green-500" : "bg-red-500"
    }`;
    spanStatus.textContent = restaurante.ativo ? "Ativado" : "Desativado";

    tdStatus.appendChild(spanStatus);

    linha.appendChild(tdNome);
    linha.appendChild(tdCategoria);
    linha.appendChild(tdStatus);

    tabelaAlternarStatus.appendChild(linha);
  });
}

// Função para atualizar o select de restaurantes
function atualizarSelectRestaurantes() {
  const selectRestaurante = document.getElementById("select-restaurante");

  // Limpar opções anteriores (exceto a primeira)
  while (selectRestaurante.options.length > 1) {
    selectRestaurante.remove(1);
  }

  // Adicionar restaurantes ao select
  listaRestaurantes.forEach((restaurante) => {
    const option = document.createElement("option");
    option.value = restaurante.nome;
    option.textContent = restaurante.nome;
    selectRestaurante.appendChild(option);
  });

  // Resetar seleção
  selectRestaurante.value = "";
}

// Habilitar botão de alternar status quando um restaurante é selecionado
function habilitarBotaoAlternarStatus() {
  const selectRestaurante = document.getElementById("select-restaurante");
  const btnAlternarStatus = document.getElementById("btn-alternar-status");

  btnAlternarStatus.disabled = !selectRestaurante.value;

  // Destacar linha na tabela
  if (selectRestaurante.value) {
    const tabelaAlternarStatus = document.getElementById(
      "tabela-alternar-status"
    );
    const todasLinhas = tabelaAlternarStatus.querySelectorAll("tr");

    todasLinhas.forEach((linha) => {
      const nomeCelula = linha.querySelector("td:first-child");
      if (nomeCelula && nomeCelula.textContent === selectRestaurante.value) {
        todasLinhas.forEach((tr) => tr.classList.remove("bg-blue-100"));
        linha.classList.add("bg-blue-100");
      }
    });
  }
}

// Função para alternar o status de um restaurante
function alternarStatus() {
  const nomeRestaurante = document.getElementById("select-restaurante").value;
  const mensagemAlteracao = document.getElementById("mensagem-alteracao");

  // Buscar restaurante
  const restaurante = listaRestaurantes.find((r) => r.nome === nomeRestaurante);

  if (!restaurante) {
    mensagemAlteracao.textContent = "Restaurante não encontrado";
    mensagemAlteracao.className = "my-4 p-3 rounded bg-red-100 text-red-700";
    mensagemAlteracao.classList.remove("hidden");
    return;
  }

  // Alternar status
  restaurante.ativo = !restaurante.ativo;

  // Atualizar mensagem
  const novoStatus = restaurante.ativo ? "ativado" : "desativado";
  mensagemAlteracao.textContent = `O restaurante ${nomeRestaurante} foi ${novoStatus} com sucesso`;
  mensagemAlteracao.className = "my-4 p-3 rounded bg-green-100 text-green-700";
  mensagemAlteracao.classList.remove("hidden");

  // Atualizar tabela
  atualizarTabelaAlternarStatus();

  // Na implementação real, aqui você enviaria os dados para seu backend Python
  console.log("Status alterado:", restaurante);

  // Comunicação com o backend Python
  fetch(`/api/restaurantes/${nomeRestaurante}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ativo: restaurante.ativo }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

// Função para finalizar o app
function finalizarApp() {
  alert("Obrigado por usar o Sabor Express!");
  // Você pode adicionar outras ações aqui, como limpar dados, etc.
}

// Inicialização da aplicação
function inicializarApp() {
  // Carregar restaurantes do backend
  carregarRestaurantesDoBackend();

  // Mostrar menu principal
  voltarParaMenuPrincipal();
}

// Função para carregar restaurantes do backend
function carregarRestaurantesDoBackend() {
  fetch("/api/restaurantes")
    .then((response) => response.json())
    .then((data) => {
      // Atualizar lista de restaurantes com os dados do backend
      listaRestaurantes = data;
      console.log("Restaurantes carregados:", listaRestaurantes);
    })
    .catch((error) => {
      console.error("Erro ao carregar restaurantes:", error);
      // Em caso de erro, continua usando os dados locais
    });
}

// Iniciar o app quando a página carregar
document.addEventListener("DOMContentLoaded", inicializarApp);
