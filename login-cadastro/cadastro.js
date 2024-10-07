


//campos obrigatorios para o login que ja recebem variaveis com o parametro false 

var email = document.querySelector('#email');
var labelemail = document.querySelector('#labelemail');
var valideemail = false;

var senha = document.querySelector('#senha');
var labelsenha = document.querySelector('#labelsenha');
var validesenha = false;

var confirmarsenha = document.querySelector('#confirmarsenha');
var labelconfirmarsenha = document.querySelector('#labelconfirmarsenha');
var valideconfirmarsenha = false;

//os feedbecks para o usuario tanto prodseguindo quanto sendo recusada a ação de cadastro 
var msgerror = document.querySelector('#msgerror');
var msgsucess = document.querySelector('#msgsucess');

var nome = document.querySelector('#nome');
var labelnome = document.querySelector('#labelnome');
var validenome = false;

//verificação em tempo em real da digitação dos campos do formulario


document.addEventListener('DOMContentLoaded', function() {

//as validações pcorrem com um evento de keyup a cada caracter digitado, adicionando parametros para serem analisados em tempo real
  nome.addEventListener('keyup', () => {
    if (nome.value.length < 15 || nome.value.length > 60) {
      labelnome.setAttribute('style', 'color: red');
      labelnome.innerHTML = 'Insira um nome com 15 a 60 caracteres';
      nome.setAttribute('style', 'border-color: red');
      validenome = false;
    } else {
      labelnome.setAttribute('style', 'color: green');
      labelnome.innerHTML = 'Nome';
      nome.setAttribute('style', 'border-color: darkblue');
      validenome = true;
    }
  });
  
//alguns parametros utilizam de bibliotecas que fora mencionadas no inicio do meu documento html, assim me permitindo utilizar as suas formatações
  $('#email').on('keyup', function() {
    var emailValue = $(this).val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailValue)) {
      labelemail.setAttribute('style', 'color: green');
      labelemail.innerHTML = 'E-mail';
      $(this).attr('style', 'border-color: darkblue');
      valideemail = true;
    } else {
      labelemail.setAttribute('style', 'color: red');
      labelemail.innerHTML = 'Insira um e-mail válido';
      $(this).attr('style', 'border-color: red');
      valideemail = false;
    }
  });

  senha.addEventListener('keyup', () => {
    validarSenhaFormato();
  });

  function validarSenhaFormato() {
    const senhaRegex = /^[a-zA-Z]{8,}$/;

    if (senha.value.match(senhaRegex)) {
      labelsenha.setAttribute('style', 'color: green');
      labelsenha.innerHTML = 'Senha';
      senha.setAttribute('style', 'border-color: darkblue');
      validesenha = true;
    } 

  else {
      labelsenha.setAttribute('style', 'color: red');
      labelsenha.innerHTML = 'Insira um nome com pelo menos 8 caracteres alfabéticos';
      senha.setAttribute('style', 'border-color: red');
      validesenha = false;
    }
  }

  confirmarsenha.addEventListener ('keyup', ()=> {
    if(senha.value != confirmarsenha.value){
      labelconfirmarsenha.setAttribute('style', 'color: red')
      labelconfirmarsenha.innerHTML = 'Confirmar Senha *As senhas não coincidência'
      confirmarsenha.setAttribute('style', 'border-color: red')
      valideconfirmarsenha = false;

    } else {
      labelconfirmarsenha.setAttribute('style', 'color: green')
      labelconfirmarsenha.innerHTML = 'Confrimar Senha'
      confirmarsenha.setAttribute('style', 'border-color: darkblue')
      valideconfirmarsenha = true;

    }
  })


$(document).ready(function() {
  

  // Adicione a máscara ao campo CPF
  $('#cpf').inputmask('999.999.999-99', { placeholder: '___.___.___-__' });
  
  // Adicione a máscara ao campo de telefone
  $('#telefone').inputmask('(99) 99999-9999', { placeholder: '(__) ______-____' });
  
  // Adicione a máscara ao campo de telefone fixo
  $('#telfixo').inputmask('(99) 9999-9999', { placeholder: '(__) ____-____' });


  $('#cep').on('blur', function() {
    var cepValue = $(this).val().replace(/\D/g, '');

    if (cepValue.length === 8) {
      consultarCEP(cepValue);
    } else {
      $('#labelcep').css('color', 'red').html('CEP inválido');
    }
  });



});

  
  function consultarCEP(cep) {
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        if (!data.erro) {
          preencherCamposEndereco(data);
        } else {
          $('#labelcep').css('color', 'red').html('CEP não encontrado');
        }
      },
      error: function() {
        $('#labelcep').css('color', 'red').html('Erro na consulta do CEP');
      }
    });
  }

  function preencherCamposEndereco(data) {
    $('#labelcep').css('color', 'green').html('CEP válido');

    // Preencha os campos do endereço com os dados da API
    $('#logradouro').val(data.logradouro);
    $('#bairro').val(data.bairro);
    $('#cidade').val(data.localidade);
    $('#estado').val(data.uf);
  }




  
})

//função de cadastro caso sejam verdadeiros os parametros passados no formulario

function cadastrar(){










  

  //caso esses sejam verdadeiros o cadastro é feito
  if(validenome && valideemail && validesenha && valideconfirmarsenha){
    
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push(
    {
    nomeCad:nome.value,
      emailCad: email.value,
      senhaCad: senha.value
    }
     )

    localStorage.setItem('listaUser', JSON.stringify(listaUser));
      
    //mensagem de feedbeck 
    msgsucess.setAttribute('style', 'display: block')
    msgsucess.innerHTML = 'Cadastrando Usuário...'
    msgerror.setAttribute('style', 'display: none')
    msgerror.innerHTML = '' ;
    
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 3000);

    
  }else{


    
    msgerror.setAttribute('style', 'display: block')
    msgerror.innerHTML = 'Preencha todos os campos corretamente'
    msgsucess.setAttribute('style', 'display: none')
    msgsucess.innerHTML = ''
    
  }
}

//funçao que utiliza um icon como uma checkbox que transforma o valor recebido em senha e confirmar senha em string e passam a ser visiveis, assim como podem passar de string para senha escondendo novamente 

function mostrarsenha(){
  var inputpass = document.getElementById('senha');
  var btnshowpass = document.getElementById('btn-senha');

  if(inputpass.type === 'password'){
    inputpass.setAttribute('type', 'text');
    btnshowpass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
  
}else{
    inputpass.setAttribute('type', 'password');
    btnshowpass.classList.replace('bi-eye-slash-fill','bi-eye-fill')
  }
};

function mostrarsenha2(){
  var inputpass2 = document.getElementById('confirmarsenha');
  var btnshowpass2 = document.getElementById('btn-senha2');

  if(inputpass2.type === 'password'){
    inputpass2.setAttribute('type', 'text');
    btnshowpass2.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')

}else{
    inputpass2.setAttribute('type', 'password');
    btnshowpass2.classList.replace('bi-eye-slash-fill','bi-eye-fill')
  }
};
    
  function aplicarMascaraCEP() {
    $('#cep').inputmask('00000-000');
  }
