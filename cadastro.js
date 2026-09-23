// ===============================
// CONFIGURAÇÃO DO CADASTRO
// ===============================

const cadastroForm = document.getElementById("cadastroForm");
const nomeInput = document.getElementById("nome");
const usuarioInput = document.getElementById("usuario");
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");


// ===============================
// USUÁRIOS
// ===============================

// Busca os usuários salvos no navegador.
// Caso não exista nenhum, cria um usuário padrão
// (o mesmo usado na tela de login).
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

    let mensagem = document.getElementById("mensagemCadastro");

    if (!mensagem) {

        mensagem = document.createElement("p");

        mensagem.id = "mensagemCadastro";

        mensagem.style.textAlign = "center";
        mensagem.style.marginTop = "15px";
        mensagem.style.fontWeight = "600";

        cadastroForm.appendChild(mensagem);
    }

    mensagem.textContent = texto;

    if (sucesso) {
        mensagem.style.color = "#90ee90";
    } else {
        mensagem.style.color = "#ff8080";
    }
}


// ===============================
// CADASTRO
// ===============================

cadastroForm.addEventListener("submit", function (event) {

    // Impede o formulário de recarregar a página
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    // Verifica campos vazios
    if (nome === "" || usuario === "" || senha === "" || confirmarSenha === "") {

        mostrarMensagem("Preencha todos os campos.");

        return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {

        mostrarMensagem("As senhas não coincidem.");

        return;
    }

    // Verifica se o usuário já existe
    const usuarioExiste = usuarios.some(function (pessoa) {

        return pessoa.usuario.toLowerCase() === usuario.toLowerCase();

    });

    if (usuarioExiste) {

        mostrarMensagem("Este e-mail já está cadastrado.");

        return;
    }

    // Cria o novo usuário
    usuarios.push({

        nome: nome,
        usuario: usuario,
        senha: senha

    });

    // Salva no navegador
    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    mostrarMensagem(
        "Cadastro realizado com sucesso! Redirecionando...",
        true
    );

    // Redireciona para o login depois de um instante
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);

});
