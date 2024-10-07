//a função entrar busca dentro do local storage as informações que foram salvas apartir do cadastro 
function entrar() {
  var email = document.querySelector("#email");
  var labelemail = document.querySelector("#labelemail");

  var senha = document.querySelector("#senha");
  var labelsenha = document.querySelector("#labelsenha");

  var msgerror = document.querySelector("#msgerror");
  var msgsucess = document.querySelector("#msgsucess");

  // caso não exista o usuário, os parâmetros são passados como nulo 
  var uservalide = {
    nome: '',
    email: '',
    senha: ''
  }
//mas caso exista ele cria uma nova lista de usuario replicando os dados para poderem ser comparados 
  var listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

  listaUser.forEach((item) => {
    if ((email.value === item.emailCad || email.value === item.nomeCad) && senha.value === item.senhaCad) {
      uservalide = {
        nome: item.nomeCad,
        email: item.emailCad,
        senha: item.senhaCad
      };
    }
  });

  // caso o usuário tenha colocado no campo de login o email ou o nome e senha corretos, então o usuário entra no sistema
  if ((email.value && email.value === uservalide.email) || (email.value && email.value === uservalide.nome) && senha.value === uservalide.senha) {
    msgsucess.setAttribute("style", "display:block");
    msgsucess.innerHTML = "Login efetuado com sucesso!";
    msgerror.setAttribute("style", "display:none");

    // ocorre o redirecionamento para a página principal de serviços da CPaaS
    window.location.href = "../paginas/CPaasS/CPaasS.html";

    // gera um token de 32 caracteres que é jogado para dentro do localStorage para armazenar a informação de status de usuário cadastrado
    var token = generateSecureToken();
    localStorage.setItem('token', token);

    localStorage.setItem('userlogado', JSON.stringify(uservalide));
  } else {
    // caso não exista o usuário ou tenha algumas das informações divergentes do que está armazenado no localStorage,
    // então alerta o usuário que algo está errado
    labelemail.setAttribute("style", "color: red");
    email.setAttribute("style", "border-color: red");
    labelsenha.setAttribute("style", "color: red");
    senha.setAttribute("style", "border-color: red");

    msgsucess.setAttribute("style", "display:none");
    msgerror.setAttribute("style", "display:block");
    msgerror.innerHTML = 'Email ou senha incorretos!';
    email.focus();
  }
}
function generateSecureToken() {
  // Use crypto.getRandomValues() para gerar um token seguro
  var array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}