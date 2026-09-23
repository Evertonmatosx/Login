// Verifica se existe um usuário logado
const usuarioLogado = sessionStorage.getItem("usuarioLogado");


// Se não estiver logado, volta para a página de login
if (!usuarioLogado) {
    window.location.href = "index.html";
}


// Mostra o usuário na página
const nomeUsuario = document.getElementById("nomeUsuario");

if (nomeUsuario) {
    nomeUsuario.textContent = usuarioLogado;
}


// Botão de sair
const botaoSair = document.getElementById("sair");

if (botaoSair) {
    botaoSair.addEventListener("click", function () {

        // Remove o usuário da sessão
        sessionStorage.removeItem("usuarioLogado");

        // Volta para o login
        window.location.href = "index.html";
    });
}