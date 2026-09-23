// ===============================
// CONFIGURAÇÃO DA RECUPERAÇÃO DE SENHA
// ===============================

const recuperarForm = document.getElementById("recuperarForm");
const usuarioInput = document.getElementById("usuario");
const novaSenhaInput = document.getElementById("novaSenha");
const confirmarNovaSenhaInput = document.getElementById("confirmarNovaSenha");


// ===============================
// USUÁRIOS
// ===============================

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
    {
        nome: "Usuário Padrão",
        usuario: "evertonryan985@gmail.com",
        senha: "100721"
    }
];


// ===============================
// MENSAGEM
// ===============================

function mostrarMensagem(texto, sucesso = false) {

    let mensagem = document.getElementById("mensagemRecuperar");

    if (!mensagem) {

        mensagem = document.createElement("p");

        mensagem.id = "mensagemRecuperar";

        mensagem.style.textAlign = "center";
        mensagem.style.marginTop = "15px";
        mensagem.style.fontWeight = "600";

        recuperarForm.appendChild(mensagem);
    }

    mensagem.textContent = texto;

    if (sucesso) {
        mensagem.style.color = "#90ee90";
    } else {
        mensagem.style.color = "#ff8080";
    }
}


// ===============================
// REDEFINIR SENHA
// ===============================

recuperarForm.addEventListener("submit", function (event) {

    // Impede o formulário de recarregar a página
    event.preventDefault();

    const usuario = usuarioInput.value.trim();
    const novaSenha = novaSenhaInput.value;
    const confirmarNovaSenha = confirmarNovaSenhaInput.value;

    // Verifica campos vazios
    if (usuario === "" || novaSenha === "" || confirmarNovaSenha === "") {

        mostrarMensagem("Preencha todos os campos.");

        return;
    }

    // Verifica se as senhas coincidem
    if (novaSenha !== confirmarNovaSenha) {

        mostrarMensagem("As senhas não coincidem.");

        return;
    }

    // Procura o usuário
    const usuarioEncontrado = usuarios.find(function (pessoa) {

        return pessoa.usuario.toLowerCase() === usuario.toLowerCase();

    });

    if (!usuarioEncontrado) {

        mostrarMensagem("E-mail não encontrado.");

        return;
    }

    // Atualiza a senha do usuário
    usuarioEncontrado.senha = novaSenha;

    // Salva no navegador
    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    mostrarMensagem(
        "Senha redefinida com sucesso! Redirecionando...",
        true
    );

    // Redireciona para o login depois de um instante
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);

});
