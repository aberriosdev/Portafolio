(function() {
  "use strict"; 

  // Desplazamiento suave y cierre de menú responsive
  document.querySelectorAll('.js-scroll-trigger').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Desplazamiento suave
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = document.querySelector(this.hash); 
        target = target ? target : document.querySelector('[name=' + this.hash.slice(1) + ']'); 
        if (target) { 
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
          e.preventDefault(); 
        }
      }

      // Cerrar el menú de navegación responsive
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse) {
        navbarCollapse.classList.remove('show'); 
      }
    });
  });

  // Activar scrollspy para agregar la clase "activo" a los elementos de la barra de navegación durante el desplazamiento
  document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY;

    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const link = document.querySelector(`a[href="#${sectionId}"]`);
      
      if (link) {
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;

        if (scrollPos >= offsetTop - 100 && scrollPos < offsetTop + offsetHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

})();

// Función para enviar el formulario
function enviarForm() {
  // Verificar si los campos obligatorios están completos
  var campos = ["nombre", "apellido", "email", "asunto", "mensaje"];
  for (let campo of campos) {
    if (document.getElementById(campo).value.trim() === "") {
      alert("Por favor, completa todos los campos obligatorios.");
      return false;
    }
  }

  // Validar el formato del email
  var email = document.getElementById("email").value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, introduce un email válido.");
    return false;
  }

  // Mostrar mensaje de éxito
  alert("Formulario enviado. Gracias, " + document.getElementById("nombre").value.trim() + "!");

  // Resetear el formulario
  document.getElementById("formulario").reset(); // Asegúrate de que tu formulario tenga id="formulario"

  return false; // Evitar el envío tradicional del formulario
}

// Función para cambiar el tema
document.getElementById("toggleTheme").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");

  // Guardar la preferencia de tema en el localStorage
  const darkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
});

// Restaurar la preferencia de tema al cargar la página
window.addEventListener("load", function() {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add("dark-mode");
  }
});
