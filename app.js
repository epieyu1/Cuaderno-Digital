// Referencia al contenedor donde se cargará el contenido dinámico
const contenido = document.getElementById("contenido");

// Estructura general de los módulos
const modulos = {
  historia: [
    {
      titulo: "Origen Ancestral",
      texto: "El pueblo Wayuu es originario de la península de La Guajira, una región que se extiende entre Colombia y Venezuela. En su historia ancestral, los Wayuu han sido guardianes de una cultura rica en símbolos, tradiciones orales y textiles únicos...",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "Organización Social",
      texto: "La sociedad Wayuu se estructura en clanes llamados eiruku. Cada clan sigue una línea matrilineal, donde las mujeres son las principales encargadas de transmitir las tradiciones y conocimientos, siendo fundamentales en la organización social y política...",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "El Pueblo Wayuu y su Religión",
      texto: "La religión Wayuu está basada en la creencia en seres espirituales, como los Wüüla y los Jürükü, que representan las fuerzas de la naturaleza y el cosmos. Estas deidades son respetadas a través de rituales, danzas y canciones.",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "La Lengua Wayuunaiki",
      texto: "El idioma Wayuunaiki es hablado por la mayoría de los Wayuu y es fundamental para la identidad cultural del pueblo. La lengua está compuesta por una rica variedad de palabras y frases que reflejan la visión del mundo de los Wayuu.",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "Las Costumbres y el Tejido",
      texto: "El tejido Wayuu es uno de los aspectos más representativos de su cultura. Las mochilas, llamadas 'mochilas Wayuu', son hechas a mano y simbolizan historias, creencias y valores de la comunidad. Cada diseño tiene un significado único...",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "La Influencia de los Españoles",
      texto: "A partir de la llegada de los colonizadores españoles, la vida de los Wayuu sufrió varios cambios. Sin embargo, han logrado mantener muchas de sus costumbres y tradiciones, adaptándose a las nuevas influencias mientras conservan su identidad.",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "La Lucha por la Tierra y Autonomía",
      texto: "Los Wayuu han enfrentado múltiples desafíos en relación a la defensa de sus tierras y su autonomía. A lo largo de los siglos, han luchado por preservar sus territorios frente a la expansión de otras comunidades y la intervención del gobierno.",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "La Economía Tradicional",
      texto: "La economía Wayuu históricamente se ha basado en la ganadería, la agricultura y el comercio de textiles. Los Wayuu han sido expertos en el intercambio de productos, y sus mochilas se han convertido en objetos de gran valor tanto dentro como fuera de su comunidad.",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "Los Desafíos Modernos",
      texto: "Hoy en día, los Wayuu enfrentan desafíos como el acceso al agua potable, la pobreza y la discriminación. Sin embargo, la comunidad sigue siendo resiliente y continúa luchando por sus derechos y por la preservación de su cultura.",
      imagen: "recurso/wayuu.png"
    },
    {
      titulo: "El Futuro del Pueblo Wayuu",
      texto: "A pesar de los desafíos, el futuro del pueblo Wayuu sigue siendo prometedor. La comunidad sigue luchando por sus derechos, el reconocimiento de su lengua y la preservación de su identidad cultural a través de la educación y la participación en procesos políticos y sociales.",
      imagen: "recurso/wayuu.png"
    }
  ],
  // Puedes agregar más módulos aquí como 'tejido', 'wayuunaiki', etc.
};

// Variable que controla la página actual por módulo
let paginaActual = 0;
let moduloActual = 'historia';  // Módulo actual por defecto

// Función para mostrar un módulo
function mostrarModulo(modulo) {
  moduloActual = modulo;
  paginaActual = 0;  // Reinicia la página del módulo
  mostrarContenido();  // Actualiza el contenido
}

// Función para renderizar el contenido del módulo
function mostrarContenido() {
  const moduloData = modulos[moduloActual]; // Obtiene los datos del módulo actual
  const data = moduloData[paginaActual]; // Obtiene los datos de la página actual del módulo

  contenido.innerHTML = `
    <h2>${data.titulo}</h2>
    <img src="${data.imagen}" alt="${data.titulo}" style="width:3rem; height:3rem;   border-radius:3rem; margin-bottom:1rem;" />
    <p style="font-size: 1.1rem;">${data.texto}</p>
    <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
      <button onclick="paginaAnterior()" ${paginaActual === 0 ? 'disabled' : ''}>⬅️ Anterior</button>
      <span style="font-weight: bold;">Página ${paginaActual + 1} de ${moduloData.length}</span>
      <button onclick="paginaSiguiente()" ${paginaActual === moduloData.length - 1 ? 'disabled' : ''}>Siguiente ➡️</button>
    </div>
  `;
}

// Cambia a la página anterior
function paginaAnterior() {
  if (paginaActual > 0) {
    paginaActual--;
    mostrarContenido();  // Actualiza el contenido con la nueva página
  }
}

// Cambia a la página siguiente
function paginaSiguiente() {
  const moduloData = modulos[moduloActual]; // Obtiene los datos del módulo
  if (paginaActual < moduloData.length - 1) {
    paginaActual++;
    mostrarContenido();  // Actualiza el contenido con la nueva página
  }
}

// Mostrar contenido al cargar por defecto el módulo 'historia'
mostrarContenido();
