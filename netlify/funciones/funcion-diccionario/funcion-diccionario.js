const express = require('express');
const cors = require('cors');
const stringSimilarity = require('string-similarity'); // Importamos la librería
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dictionaryData = {
  "saludos": [
    {
      "espanol": "Hola",
      "wayuunaiki": "Ajaa",
      "definicion": "Saludo informal que se utiliza para saludar a alguien al encontrarse o al iniciar una conversación."
    },
    {
      "espanol": "Buenos días",
      "wayuunaiki": "Anaas wattama'at",
      "definicion": "Saludo utilizado en las primeras horas del día."
    },
    {
      "espanol": "Buenas tardes",
      "wayuunaiki": "Anaas alikaa",
      "definicion": "Saludo usado después del mediodía hasta la puesta del sol."
    },
    {
      "espanol": "Buenas noches",
      "wayuunaiki": "Anaas aipa'a",
      "definicion": "Saludo o despedida utilizado durante la noche."
    },
    {
      "espanol": "¿Cómo estás? (Hombre)",
      "wayuunaiki": "¿Anayaashije'e pia?",
      "definicion": "Pregunta dirigida a un hombre para saber cómo se encuentra."
    },
    {
      "espanol": "¿Cómo estás? (Mujer)",
      "wayuunaiki": "¿Anayaasüje'e pia?",
      "definicion": "Pregunta dirigida a una mujer para saber cómo se encuentra."
    },
    {
      "espanol": "Bien (Hombre)",
      "wayuunaiki": "Anashi taya",
      "definicion": "Respuesta afirmativa usada por un hombre para indicar que se encuentra bien."
    },
    {
      "espanol": "Bien (Mujer)",
      "wayuunaiki": "Anasü taya",
      "definicion": "Respuesta afirmativa usada por una mujer para indicar que se encuentra bien."
    },
    {
      "espanol": "Adiós",
      "wayuunaiki": "Wattamaata",
      "definicion": "Expresión de despedida cuando alguien se retira o finaliza un encuentro."
    },
    {
      "espanol": "Bienvenido (Hombre)",
      "wayuunaiki": "Antüshi pia",
      "definicion": "Expresión de bienvenida dirigida a un hombre que llega."
    },
    {
      "espanol": "Bienvenido (Mujer)",
      "wayuunaiki": "Antasü pia",
      "definicion": "Expresión de bienvenida dirigida a una mujer que llega."
    },
    {
      "espanol": "¿Qué tal?",
      "wayuunaiki": "¿Jamayaa pia?",
      "definicion": "Expresión casual para preguntar cómo está alguien o cómo van las cosas."
    },
    {
      "espanol": "Gracias",
      "wayuunaiki": "Anayawachijaa",
      "definicion": "Palabra usada para expresar gratitud o agradecimiento."
    },
    {
      "espanol": "Gracias a Dios",
      "wayuunaiki": "Asajaa Maleiwa",
      "definicion": "Expresión de gratitud religiosa o espiritual."
    },
    {
      "espanol": "Con permiso",
      "wayuunaiki": "Attajaa",
      "definicion": "Expresión usada para pedir permiso o para entrar o retirarse de un lugar."
    },
    {
      "espanol": "Disculpa",
      "wayuunaiki": "Ashaijaa",
      "definicion": "Palabra usada para pedir perdón por una falta o interrupción."
    },
    {
      "espanol": "Hasta luego",
      "wayuunaiki": "Ataakaja",
      "definicion": "Despedida que implica que se verán más adelante."
    },
    {
      "espanol": "Hasta mañana",
      "wayuunaiki": "Ata wayuu",
      "definicion": "Despedida que implica que se verán al día siguiente."
    },
    {
      "espanol": "Nos vemos",
      "wayuunaiki": "Anajawaa",
      "definicion": "Forma casual de despedirse con la intención de reencontrarse."
    },
    {
      "espanol": "¿Cómo amaneciste?",
      "wayuunaiki": "Jamaya pü'lapüin?",
      "definicion": "Pregunta que se hace al iniciar el día para conocer cómo se encuentra alguien."
    },
    {
      "espanol": "¿Cómo están?",
      "wayuunaiki": "Jamaya jia?",
      "definicion": "Forma plural para preguntar cómo se encuentran varias personas."
    },
    {
      "espanol": "¿Cómo te llamas?",
      "wayuunaiki": "Kasaichi pünülia?",
      "definicion": "Pregunta para saber el nombre de una persona."
    },
    {
      "espanol": "¿Qué hay de nuevo?",
      "wayuunaiki": "Kasachiki",
      "definicion": "Expresión informal para preguntar si hay novedades."
    },
    {
      "espanol": "¿De dónde vienes?",
      "wayuunaiki": "Jalejeejatü pia?",
      "definicion": "Pregunta para conocer el lugar de origen o procedencia de una persona."
    },
    {
      "espanol": "¿Para dónde vas?",
      "wayuunaiki": "Jalainjatüka pia yaa?",
      "definicion": "Pregunta para saber la dirección o destino de alguien."
    },
    {
      "espanol": "¿Cómo están tus familiares?",
      "wayuunaiki": "Anayaasüje’e wayuu kasairua pünain?",
      "definicion": "Pregunta para conocer el estado de salud o bienestar de los familiares de alguien."
    },
    {
      "espanol": "Están bien",
      "wayuunaiki": "Anashii",
      "definicion": "Respuesta afirmativa general sobre el estado de varias personas."
    },
    {
      "espanol": "Voy para mi casa",
      "wayuunaiki": "Chainjatü taya piichipa’amüin",
      "definicion": "Expresión usada para indicar que alguien va hacia su hogar."
    },
    {
      "espanol": "Nos vemos otro día",
      "wayuunaiki": "E’rajiraajeena waya wanee ka’i ya’asan",
      "definicion": "Despedida que indica un futuro reencuentro en otro momento."
    },
    {
      "espanol": "Está bien, ando apurada",
      "wayuunaiki": "Anasü, ashapajaasü taya",
      "definicion": "Frase usada para disculparse o salir rápidamente por estar con prisa."
    },
    {
      "espanol": "Te extraño",
      "wayuunaiki": "Jamüsüjee paa'in sümaale pia wanee wayuu sulu'umüin wanee mma naata?",
      "definicion": "Expresión de afecto para comunicar que se echa de menos a alguien."
    },
    {
      "espanol": "Que descanses",
      "wayuunaiki": "Eemerawaa",
      "definicion": "Expresión de buenos deseos para alguien que va a dormir o a descansar."
    }
  ]
  ,
  "animales": [
    {
      "espanol": "Jaguar",
      "wayuunaiki": "Jalia",
      "definicion": "Felino salvaje de gran tamaño, símbolo de fuerza, que habita en selvas y bosques tropicales de América."
    },
    {
      "espanol": "Iguana",
      "wayuunaiki": "Wale’eke",
      "definicion": "Reptil herbívoro de gran tamaño, común en zonas cálidas, conocido por su larga cola y cresta dorsal."
    },
    {
      "espanol": "Tortuga",
      "wayuunaiki": "Ka'ashi",
      "definicion": "Reptil de caparazón duro, puede habitar en agua o tierra, conocida por su longevidad y lentitud."
    },
    {
      "espanol": "Gallina de monte",
      "wayuunaiki": "Kaliina shii",
      "definicion": "Ave silvestre parecida a la gallina doméstica, que habita en zonas boscosas y se alimenta de semillas e insectos."
    },
    {
      "espanol": "Zancudo",
      "wayuunaiki": "Jamülee",
      "definicion": "Insecto volador que se alimenta de sangre, conocido por transmitir enfermedades como el dengue o malaria."
    },
    {
      "espanol": "Puerco",
      "wayuunaiki": "Jooli",
      "definicion": "Animal doméstico criado por su carne, conocido por su capacidad para adaptarse a distintos ambientes."
    },
    {
      "espanol": "Ciempiés",
      "wayuunaiki": "Wüiichi",
      "definicion": "Artrópodo con numerosos pares de patas, algunas especies pueden tener picaduras venenosas."
    },
    {
      "espanol": "Tiburón",
      "wayuunaiki": "Shulo",
      "definicion": "Pez carnívoro de gran tamaño, habitante de mares y océanos, temido por su fuerza y dientes afilados."
    },
    {
      "espanol": "Langosta de mar",
      "wayuunaiki": "Palaka",
      "definicion": "Crustáceo marino grande, apreciado como alimento, con pinzas fuertes y caparazón resistente."
    },
    {
      "espanol": "Ciempiés gigante",
      "wayuunaiki": "Wüiichi ainjaa",
      "definicion": "Versión de gran tamaño del ciempiés común, encontrado en selvas tropicales, con potencial venenoso."
    },
    {
      "espanol": "León",
      "wayuunaiki": "Jepira",
      "definicion": "Gran felino carnívoro conocido como el rey de la selva, caracterizado por su melena y su fuerza."
    },
    {
      "espanol": "Tigre",
      "wayuunaiki": "Jepira",
      "definicion": "Felino salvaje, reconocido por su pelaje a rayas y su agilidad, habita en bosques y selvas."
    },
    {
      "espanol": "Elefante",
      "wayuunaiki": "Aruunaa",
      "definicion": "Mamífero terrestre de gran tamaño, conocido por su trompa, grandes orejas y su piel gruesa."
    },
    {
      "espanol": "Rinoceronte",
      "wayuunaiki": "Püli",
      "definicion": "Gran mamífero herbívoro, de piel gruesa y un cuerno en el hocico, que habita en África y Asia."
    },
    {
      "espanol": "Cebra",
      "wayuunaiki": "Keriwaa",
      "definicion": "Mamífero herbívoro, similar al caballo, con un distintivo pelaje rayado blanco y negro."
    },
    {
      "espanol": "Hiena",
      "wayuunaiki": "Ruwelü",
      "definicion": "Carroñero conocido por su risa característica, es un animal carnívoro que vive en grupos sociales."
    },
    {
      "espanol": "Koala",
      "wayuunaiki": "Kiweru",
      "definicion": "Marsupial australiano conocido por su dulzura, que pasa la mayor parte de su vida en los árboles de eucalipto."
    },
    {
      "espanol": "Canguro",
      "wayuunaiki": "Yuu",
      "definicion": "Marsupial herbívoro australiano conocido por su potente salto y bolsa abdominal para llevar a sus crías."
    },
    {
      "espanol": "Puma",
      "wayuunaiki": "Wari",
      "definicion": "Felino carnívoro también conocido como león de montaña, que habita en América."
    },
    {
      "espanol": "Pantera",
      "wayuunaiki": "Wari'iri",
      "definicion": "Gran felino de pelaje oscuro, conocido por su agilidad y fuerza, habita principalmente en bosques tropicales."
    },
    {
      "espanol": "Lince",
      "wayuunaiki": "Müncheru",
      "definicion": "Felino de tamaño mediano, reconocido por sus orejas puntiagudas y su aguda visión nocturna."
    },
    {
      "espanol": "Guepardo",
      "wayuunaiki": "Jepira alii",
      "definicion": "Felino terrestre conocido por ser el animal terrestre más rápido, con un cuerpo delgado y ágil."
    },
    {
      "espanol": "Oso",
      "wayuunaiki": "Shüshü",
      "definicion": "Gran mamífero omnívoro, que puede habitar en diversos climas y es conocido por su fuerza."
    },
    {
      "espanol": "Bisonte",
      "wayuunaiki": "Jüi",
      "definicion": "Gran mamífero herbívoro, que una vez habitó grandes extensiones de América del Norte."
    },
    {
      "espanol": "Alce",
      "wayuunaiki": "Abaa",
      "definicion": "Gran mamífero de la familia de los ciervos, conocido por sus grandes astas."
    },
    {
      "espanol": "Cebra",
      "wayuunaiki": "Kerwa",
      "definicion": "Animal herbívoro, conocido por sus rayas negras y blancas, que habita las sabanas de África."
    },
    {
      "espanol": "León marino",
      "wayuunaiki": "Wüi'do",
      "definicion": "Mamífero marino, similar a la foca, conocido por su habilidad para nadar y su melena en los machos."
    },
    {
      "espanol": "Ballena",
      "wayuunaiki": "Waliina",
      "definicion": "Gran mamífero marino, conocido por su tamaño masivo y su migración a través de los océanos."
    },
    {
      "espanol": "Delfín",
      "wayuunaiki": "Wiiri",
      "definicion": "Mamífero acuático conocido por su inteligencia, agilidad y comportamiento social en grupos."
    },
    {
      "espanol": "Pingüino",
      "wayuunaiki": "Wuurarü",
      "definicion": "Ave no voladora adaptada al frío, conocida por su forma de nadar y caminar en grupo."
    },
    {
      "espanol": "Cocodrilo",
      "wayuunaiki": "Molokoono",
      "definicion": "Reptil acuático de gran tamaño, con una piel gruesa y dientes afilados, conocido por su comportamiento territorial."
    },
    {
      "espanol": "Morsa",
      "wayuunaiki": "Sükü",
      "definicion": "Gran mamífero marino, reconocido por sus colmillos largos y su capacidad para vivir en aguas frías."
    },
    {
      "espanol": "Tiburón blanco",
      "wayuunaiki": "Shulo",
      "definicion": "Gran pez depredador marino, conocido por su agudeza sensorial y su capacidad para nadar a alta velocidad."
    },
    {
      "espanol": "Erizo",
      "wayuunaiki": "Wüiku",
      "definicion": "Pequeño mamífero cubierto de espinas, que se enrolla en una bola como defensa."
    },
    {
      "espanol": "Hámster",
      "wayuunaiki": "Häamsäteru",
      "definicion": "Pequeño roedor domesticado, conocido por su costumbre de almacenar alimentos en sus mejillas."
    },
    {
      "espanol": "Guacamayo",
      "wayuunaiki": "Wääla",
      "definicion": "Ave tropical colorida, conocida por su gran tamaño, su pico curvado y su habilidad para imitar sonidos."
    },
    {
      "espanol": "Cóndor",
      "wayuunaiki": "Waanüka",
      "definicion": "Gran ave carroñera de los Andes, conocida por su impresionante envergadura y su capacidad para volar a gran altitud."
    },
    {
      "espanol": "Águila",
      "wayuunaiki": "Wainuu",
      "definicion": "Ave rapaz de gran tamaño, símbolo de fuerza y libertad, conocida por su aguda visión y su vuelo majestuoso."
    },
    {
      "espanol": "Leopardo",
      "wayuunaiki": "Wari",
      "definicion": "Felino salvaje conocido por su pelaje moteado y su agilidad en la caza, habita en selvas y sabanas."
    }
  ]
  ,
  "familia": [
    {
      "espanol": "Madre",
      "wayuunaiki": "A'ain",
      "definicion": "Mujer que ha dado a luz o que ejerce la maternidad."
    },
    {
      "espanol": "Padre",
      "wayuunaiki": "A'ain",
      "definicion": "Hombre que ha engendrado a un hijo o que ejerce la paternidad."
    },
    {
      "espanol": "Hermano",
      "wayuunaiki": "Tawa'la",
      "definicion": "Persona que tiene un mismo padre o madre que otra."
    },
    {
      "espanol": "Hermana",
      "wayuunaiki": "Tawa'la",
      "definicion": "Persona del sexo femenino que tiene un mismo padre o madre que otra."
    },
    {
      "espanol": "Hijo",
      "wayuunaiki": "Tawa'la",
      "definicion": "Persona que desciende de otra por línea directa."
    },
    {
      "espanol": "Hija",
      "wayuunaiki": "Tawa'la",
      "definicion": "Persona del sexo femenino que desciende de otra por línea directa."
    },
    {
      "espanol": "Abuelo",
      "wayuunaiki": "A'ain",
      "definicion": "Padre del padre o de la madre."
    },
    {
      "espanol": "Abuela",
      "wayuunaiki": "A'ain",
      "definicion": "Madre del padre o de la madre."
    },
    {
      "espanol": "Nieto",
      "wayuunaiki": "Tawa'la",
      "definicion": "Hijo de los hijos."
    },
    {
      "espanol": "Nieta",
      "wayuunaiki": "Tawa'la",
      "definicion": "Hija de los hijos."
    },
    {
      "espanol": "Tío",
      "wayuunaiki": "Tawa'la",
      "definicion": "Hermano del padre o de la madre."
    },
    {
      "espanol": "Tía",
      "wayuunaiki": "Tawa'la",
      "definicion": "Hermana del padre o de la madre."
    },
    {
      "espanol": "Sobrino",
      "wayuunaiki": "Tawa'la",
      "definicion": "Hijo del hermano o hermana."
    },
    {
      "espanol": "Sobrina",
      "wayuunaiki": "Tawa'la",
      "definicion": "Hija del hermano o hermana."
    },
    {
      "espanol": "Primo",
      "wayuunaiki": "Tawa'la",
      "definicion": "Hijo del hermano o hermana del padre o de la madre."
    },
    {
      "espanol": "Prima",
      "wayuunaiki": "Tawa'la",
      "definicion": "Hija del hermano o hermana del padre o de la madre."
    }
  ]
  ,
  "objetos": [
    {"espanol": "Casa", "wayuunaiki": "Miichi", "definicion": "Edificio construido para ser habitado."},
    {"espanol": "Agua", "wayuunaiki": "Wuin", "definicion": "Sustancia líquida sin olor, color ni sabor que se encuentra en la naturaleza en ríos, lagos y mares."},
    {"espanol": "Sol", "wayuunaiki": "Kashi", "definicion": "Estrella luminosa que constituye el centro de nuestro sistema planetario."}
  ],
  "numeros": [
    {"espanol": "Uno", "wayuunaiki": "Wanee", "definicion": "Primer número natural."},
    {"espanol": "Dos", "wayuunaiki": "Piama", "definicion": "Número natural que sigue al uno."},
    {"espanol": "Tres", "wayuunaiki": "Apünüin", "definicion": "Número natural que sigue al dos."}
  ],
  "colores": [
    {"espanol": "Amarillo", "wayuunaiki": "Maloukata", "definicion": "Color semejante al del oro o al de la yema de huevo."},
    {"espanol": "Azul", "wayuunaiki": "Wulit", "definicion": "Color del cielo despejado."},
    {"espanol": "Rojo", "wayuunaiki": "Isho", "definicion": "Color de la sangre."}
  ]
};

/**
 * Función para eliminar acentos de una cadena de texto.
 * @param {string} str La cadena de texto a procesar.
 * @returns {string} La cadena de texto sin acentos.
 */
function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

app.get('/api/translate', (req, res) => {
  const terminoBusqueda = removerAcentos(req.query.word ? req.query.word.toLowerCase().trim() : '');
  const resultados = [];
  const umbralSimilitud = 0.6; // Define el umbral de similitud (puede ajustarse)

  console.log("Término de búsqueda del usuario:", terminoBusqueda);

  for (const categoria in dictionaryData) {
    const palabras = dictionaryData[categoria];
    for (const parPalabras of palabras) {
      const palabraEspanol = removerAcentos(parPalabras.espanol.toLowerCase().trim());
      const similitud = stringSimilarity.compareTwoStrings(terminoBusqueda, palabraEspanol);

      console.log(`Comparando "${terminoBusqueda}" con "${palabraEspanol}" - Similitud:`, similitud);

      if (similitud >= umbralSimilitud && terminoBusqueda.length > 0) {
        const resultado = {
          spanish: parPalabras.espanol,
          wayuunaiki: parPalabras.wayuunaiki,
          similitud: similitud
        };
        if (typeof parPalabras.wayuunaiki === 'object') {
          resultado.wayuunaiki = parPalabras.wayuunaiki;
        }
        if (parPalabras.definicion) {
          resultado.definicion = parPalabras.definicion;
        }
        resultados.push(resultado);
      }
    }
  }

  if (resultados.length > 0) {
    resultados.sort((a, b) => b.similitud - a.similitud);
    res.json(resultados);
  } else {
    res.status(404).json({ error: 'No se encontraron traducciones con un porcentaje de coincidencia suficiente.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});