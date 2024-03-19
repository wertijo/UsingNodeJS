
//Funciones de index.html
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validar campos
  if (username === '' || password === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  //Enviar datos con fetch
  const name1 = document.getElementById('username').value;
  const password1 = document.getElementById('password').value.trim();

  fetch('/buscarUsuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name1, password1 })
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/home.html';
      } else {
        alert('Usuario o contraseña equivocados');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });


}

function openCreateAccount() {
  window.open('createAccount.html', '_self');
}

/** xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */

//Funciones de createAccount.html
function createAccount() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validar campos
  if (name === '' || email === '' || password === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }

  //Enviar datos con fetch
  const name1 = document.getElementById('name').value;
  const email1 = document.getElementById('email').value;
  const password1 = document.getElementById('password').value.trim();

  fetch('/insertarUsuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name1, email1, password1 })
  })
    .then(response => {
      if (response.ok) {
        alert('Datos enviados correctamente');
        window.location.href = '/index.html';
      } else {
        alert('Error al enviar datos');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });


}

