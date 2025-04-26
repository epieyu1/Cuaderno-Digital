const express = require('express');
const cors = require('cors');
const stringSimilarity = require('string-similarity');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.use(cors());
router.use(express.json());

const dictionaryData = {
  "saludos": [
    {
      "espanol": "Hola",
      "wayuunaiki": "Ajaa",
      "definicion": "Saludo informal utilizado en cualquier momento del día al encontrarse con alguien o al iniciar una conversación."
    },
    {
      "espanol": "Buenos días",
      "wayuunaiki": "Anaas wattama'at",
      "definicion": "Saludo utilizado desde el amanecer hasta aproximadamente las 11:00 a.m."
    },
    {
      "espanol": "Buenas tardes",
      "wayuunaiki": "Anaas alikaa",
      "definicion": "Saludo utilizado desde aproximadamente el mediodía hasta que comienza a oscurecer."
    },
    {
      "espanol": "Buenas noches",
      "wayuunaiki": "Anaas aipa'a",
      "definicion": "Saludo o despedida utilizado desde que oscurece hasta el amanecer. También se usa al irse a dormir."
    },
    {
      "espanol": "¿Cómo estás? (Hombre, informal)",
      "wayuunaiki": "¿Anayaashije'e pia?",
      "definicion": "Pregunta informal dirigida a un hombre para saber cómo se encuentra."
    },
    {
      "espanol": "¿Cómo estás? (Mujer, informal)",
      "wayuunaiki": "¿Anayaasüje'e pia?",
      "definicion": "Pregunta informal dirigida a una mujer para saber cómo se encuentra."
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
      "definicion": "Expresión de bienvenida dirigida a un hombre que llega a un lugar."
    },
    {
      "espanol": "Bienvenido (Mujer)",
      "wayuunaiki": "Antasü pia",
      "definicion": "Expresión de bienvenida dirigida a una mujer que llega a un lugar."
    },
    {
      "espanol": "¿Qué tal? (Informal)",
      "wayuunaiki": "¿Jamayaa pia?",
      "definicion": "Expresión casual para preguntar cómo está alguien o cómo van las cosas en general."
    },
    {
      "espanol": "Gracias",
      "wayuunaiki": "Anayawachijaa",
      "definicion": "Palabra usada para expresar gratitud o agradecimiento."
    },
    {
      "espanol": "Gracias a Dios",
      "wayuunaiki": "Asajaa Maleiwa",
      "definicion": "Expresión de gratitud religiosa o espiritual, reconociendo la bendición divina."
    },
    {
      "espanol": "Con permiso",
      "wayuunaiki": "Attajaa",
      "definicion": "Expresión usada para pedir permiso al pasar entre personas o al entrar o retirarse de un lugar."
    },
    {
      "espanol": "Disculpa",
      "wayuunaiki": "Ashaijaa",
      "definicion": "Palabra usada para pedir perdón por una falta leve, una interrupción o una molestia."
    },
    {
      "espanol": "Hasta luego",
      "wayuunaiki": "Ataakaja",
      "definicion": "Despedida común que implica que se verán más adelante, sin especificar cuándo."
    },
    {
      "espanol": "Hasta mañana",
      "wayuunaiki": "Ata wayuu",
      "definicion": "Despedida que se utiliza al final del día, indicando que el próximo encuentro será al día siguiente."
    },
    {
      "espanol": "Nos vemos (informal)",
      "wayuunaiki": "Anajawaa",
      "definicion": "Forma casual de despedirse con la intención de reencontrarse en el futuro."
    },
    {
      "espanol": "¿Cómo amaneciste?",
      "wayuunaiki": "Jamaya pü'lapüin?",
      "definicion": "Pregunta que se hace al iniciar el día para conocer cómo fue el descanso nocturno de alguien."
    },
    {
      "espanol": "¿Cómo están? (plural, informal)",
      "wayuunaiki": "Jamaya jia?",
      "definicion": "Forma plural informal para preguntar cómo se encuentran varias personas."
    },
    {
      "espanol": "¿Cómo te llamas?",
      "wayuunaiki": "Kasaichi pünülia?",
      "definicion": "Pregunta directa para saber el nombre de una persona."
    },
    {
      "espanol": "¿Qué hay de nuevo?",
      "wayuunaiki": "Kasachiki",
      "definicion": "Expresión informal para preguntar si hay alguna novedad o noticia reciente."
    },
    {
      "espanol": "¿De dónde vienes? (Hombre)",
      "wayuunaiki": "¿Jalejeejachi pia?",
      "definicion": "Pregunta dirigida a un hombre para conocer su lugar de origen o de dónde viene en ese momento."
    },
    {
      "espanol": "¿Para dónde vas?",
      "wayuunaiki": "¿Jalainjatüka pia yaa?",
      "definicion": "Pregunta para saber el destino o la dirección a la que se dirige alguien."
    },
    {
      "espanol": "¿Cómo están tus familiares?",
      "wayuunaiki": "¿Anayaasüje’e wayuu kasairua pünain?",
      "definicion": "Pregunta para conocer el estado de salud o bienestar de los familiares de alguien."
    },
    {
      "espanol": "Están bien",
      "wayuunaiki": "Anashii",
      "definicion": "Respuesta afirmativa general sobre el estado de salud o bienestar de varias personas."
    },
    {
      "espanol": "Voy para mi casa",
      "wayuunaiki": "Chainjatü taya piichipa’amüin",
      "definicion": "Expresión usada para indicar que alguien se dirige a su hogar."
    },
    {
      "espanol": "Nos vemos otro día",
      "wayuunaiki": "E’rajiraajeena waya wanee ka’i ya’asan",
      "definicion": "Despedida que indica un futuro reencuentro en un momento no especificado."
    },
    {
      "espanol": "Está bien, ando apurada",
      "wayuunaiki": "Anasü, ashapajaasü taya",
      "definicion": "Frase usada para disculparse por tener que irse rápidamente debido a la prisa."
    },
    {
      "espanol": "Te extraño",
      "wayuunaiki": "Jamüsüjee paa'in sümaale pia wanee wayuu sulu'umüin wanee mma naata?",
      "definicion": "Expresión de afecto para comunicar que se siente la falta de alguien que está lejos."
    },
    {
      "espanol": "Que descanses",
      "wayuunaiki": "Eemerawaa",
      "definicion": "Expresión de buenos deseos para alguien que va a dormir o a descansar."
    },
    {
      "espanol": "¡Bienvenidos! (plural)",
      "wayuunaiki": "Antüshii Jia",
      "definicion": "Forma plural de la expresión de bienvenida dirigida a varias personas que llegan."
    },
    {
      "espanol": "¿Cómo se responde? ¡aquí estoy! (singular)",
      "wayuunaiki": "¡Ani'iya taya!",
      "definicion": "Respuesta común a un saludo o pregunta sobre el estado de una persona."
    },
    {
      "espanol": "¿Cómo se responde? ¡aquí estamos! (plural)",
      "wayuunaiki": "¡Ani'iya waya!",
      "definicion": "Respuesta común a un saludo o pregunta sobre el estado de un grupo de personas."
    },
    {
      "espanol": "¿Qué novedad hay, que traes?",
      "wayuunaiki": "¿Kasachiki?",
      "definicion": "Pregunta informal sobre posibles noticias, regalos o algo nuevo que la persona pueda traer."
    },
    {
      "espanol": "¿De dónde vienes? (Hombre)",
      "wayuunaiki": "¿Jalejeejachi pia?",
      "definicion": "Pregunta dirigida a un hombre para saber su lugar de procedencia en ese momento."
    },
    {
      "espanol": "¿De dónde vienes? (Mujer)",
      "wayuunaiki": "¿Jalejeejatü pia?",
      "definicion": "Pregunta dirigida a una mujer para saber su lugar de procedencia en ese momento."
    },
    {
      "espanol": "¿Para dónde vas? (Hombre)",
      "wayuunaiki": "¿Jalainjachi pia?",
      "definicion": "Pregunta dirigida a un hombre para conocer su destino."
    },
    {
      "espanol": "¿Para dónde van? (plural)",
      "wayuunaiki": "¿Jalainjana jia?",
      "definicion": "Pregunta dirigida a varias personas para conocer su destino."
    },
    {
      "espanol": "¿Con quién te vas? (Hombre)",
      "wayuunaiki": "¿Jarai pu'unajachikai amaa?",
      "definicion": "Pregunta dirigida a un hombre para saber quién lo acompaña."
    },
    {
      "espanol": "¿Con quién te vas? (Mujer)",
      "wayuunaiki": "¿Jaralü pu'unajatükaa amaa?",
      "definicion": "Pregunta dirigida a una mujer para saber quién la acompaña."
    },
    {
      "espanol": "Tenga la bondad, sea amable conmigo",
      "wayuunaiki": "Kamanee maa pia tamüin",
      "definicion": "Expresión utilizada para solicitar ayuda o un favor de manera cortés."
    },
    {
      "espanol": "Ya va. Un momento",
      "wayuunaiki": "Jiatta paala",
      "definicion": "Expresión para pedir a alguien que espere un instante."
    },
    {
      "espanol": "Óigame un momento",
      "wayuunaiki": "Paapa paala tanüiki",
      "definicion": "Expresión utilizada para captar la atención de alguien brevemente."
    },
    {
      "espanol": "Sea amable conmigo, léame que dice este papel",
      "wayuunaiki": "Kamanee maa pia paashaje'era tamüin karalo'utakaa tüü",
      "definicion": "Petición amable para que alguien lea un documento."
    },
    {
      "espanol": "Cántame una canción",
      "wayuunaiki": "Pii'iraja wanee jayeechi tamüin",
      "definicion": "Solicitud para que alguien interprete una canción."
    },
    {
      "espanol": "Sea amable conmigo, dame de beber agua",
      "wayuunaiki": "Kamanee maa pia püsira taya wuin",
      "definicion": "Petición cortés para que alguien proporcione agua para beber."
    },
    {
      "espanol": "Sea amable conmigo, dame de comer",
      "wayuunaiki": "Kamanee maa pia pikira taya",
      "definicion": "Petición amable para que alguien ofrezca alimento."
    },
    {
      "espanol": "Anda, enséñame a leer y escribir",
      "wayuunaiki": "Pii'ika maa taya sünain atijaa aashaje'eraa jee ashajaa",
      "definicion": "Solicitud de instrucción en lectura y escritura."
    },
    {
      "espanol": "Tenga la amabilidad de pasarme eso (objeto)",
      "wayuunaiki": "Kamanee maa pia, pülatira tamüin türa",
      "definicion": "Petición cortés para que alguien alcance un objeto cercano."
    },
    {
      "espanol": "Vámonos para la fiesta a bailar",
      "wayuunaiki": "Joo'uya wayonnajai eemüin mii'irakaa",
      "definicion": "Invitación a asistir a una celebración para bailar."
    },
    {
      "espanol": "Yo te quiero mucho",
      "wayuunaiki": "Tacheküin ma'in pia",
      "definicion": "Expresión de profundo afecto hacia otra persona."
    },
    {
      "espanol": "¿Cómo estás Juan?",
      "wayuunaiki": "¿Jamayaa pia Juan?",
      "definicion": "Saludo informal dirigido específicamente a una persona llamada Juan, preguntando por su estado."
    },
    {
      "espanol": "Hace tiempo que no nos vemos",
      "wayuunaiki": "Kakaliairü nnojolüin we'rajirain",
      "definicion": "Comentario sobre el tiempo transcurrido desde el último encuentro."
    },
    {
      "espanol": "Pues sí, ¿qué tal si hablamos un día de estos?",
      "wayuunaiki": "Shiimüinja, ¿aashajaweenaja'a waya soo'u wanee ka'i?",
      "definicion": "Sugerencia para programar una conversación futura."
    },
    {
      "espanol": "¿Puedo ir a tu casa el viernes?",
      "wayuunaiki": "¿Eeshii süpüla to'unüin pipialu'umüin pietno'ulü?",
      "definicion": "Pregunta sobre la posibilidad de visitar el hogar de alguien en un día específico."
    },
    {
      "espanol": "El sábado por la tarde",
      "wayuunaiki": "¿Saawano'ulü aliika?",
      "definicion": "Pregunta específica sobre el momento del día sábado para un posible encuentro."
    },
    {
      "espanol": "Después de comer",
      "wayuunaiki": "Süchikejee ekaa",
      "definicion": "Indicación de tiempo que se refiere al periodo posterior a la ingesta de alimentos."
    },
    {
      "espanol": "Te espero",
      "wayuunaiki": "Ta'atapajeechi pia",
      "definicion": "Expresión que comunica la intención de aguardar a otra persona."
    },
    {
      "espanol": "¿A qué hora?",
      "wayuunaiki": "¿Jalapüshi?",
      "definicion": "Pregunta para determinar la hora específica de un evento o encuentro."
    },
    {
      "espanol": "Bueno, me voy",
      "wayuunaiki": "Ajaa, anashi to'unai",
      "definicion": "Expresión utilizada para anunciar la propia partida o retirada."
    },
    {
      "espanol": "¿Cuándo viene?",
      "wayuunaiki": "¿Joujeechi nüntaka?",
      "definicion": "Pregunta para saber el momento en que alguien llegará."
    },
    {
      "espanol": "Mañana",
      "wayuunaiki": "Watta'a",
      "definicion": "Indicación del día siguiente al presente."
    },
    {
      "espanol": "¿Qué deseaba?",
      "wayuunaiki": "¿Kasa keireeka paa'in?",
      "definicion": "Pregunta formal para indagar sobre las necesidades o requerimientos de otra persona."
    },
    {
      "espanol": "Buenos días (6 a 11 de la mañana)",
      "wayuunaiki": "Wattamare",
      "definicion": "Saludo específico para las primeras horas de la mañana."
    },
    {
      "espanol": "Buenas tardes (mediodía)",
      "wayuunaiki": "Careo",
      "definicion": "Saludo utilizado durante el mediodía."
    },
    {
      "espanol": "Buenas tardes (tardecita)",
      "wayuunaiki": "Arika",
      "definicion": "Saludo utilizado al final de la tarde, antes de la noche."
    },
    {
      "espanol": "¿Cómo estás? (informal)",
      "wayuunaiki": "¿Anasü pía?",
      "definicion": "Saludo informal y breve preguntando por el estado de alguien."
    },
    {
      "espanol": "¿Cómo está? (formal)",
      "wayuunaiki": "¿Anasü püi'?",
      "definicion": "Saludo formal preguntando por el estado de alguien a quien se le tiene respeto o mayor jerarquía."
    },
    {
      "espanol": "¿Cómo le va?",
      "wayuunaiki": "¿Jamaya apüshi?",
      "definicion": "Saludo formal y respetuoso para preguntar cómo le está yendo a alguien en general."
    },
    {
      "espanol": "Bien, gracias a Dios",
      "wayuunaiki": "Anasü, asajaa Maleiwa",
      "definicion": "Respuesta común indicando un buen estado de salud o bienestar, con agradecimiento religioso."
    },
    {
      "espanol": "Hasta pronto",
      "wayuunaiki": "Atawakajaa",
      "definicion": "Despedida que implica un reencuentro cercano en el tiempo."
    },
    {
      "espanol": "¿Qué cuentas? (informal)",
      "wayuunaiki": "¿Kasa pünüiki?",
      "definicion": "Saludo informal para preguntar sobre las últimas noticias o acontecimientos en la vida de alguien."
    },
    {
      "espanol": "Nada en especial",
      "wayuunaiki": "Nnojotsü naalin",
      "definicion": "Respuesta común indicando que no hay novedades o algo destacable para contar."
    }
  ],
  "animales": {
    "animales": [
      {
        "espanol": "Abeja",
        "wayuunaiki": "Jümüi",
        "definicion": "Insecto himenóptero volador, social o solitario, crucial para la polinización y productor de miel y cera (en el caso de Apis mellifera)."
      },
      {
        "espanol": "Agutí / Ñeque",
        "wayuunaiki": "Oulii / Oüli",
        "definicion": "Roedor diurno de tamaño mediano, pelaje áspero, patas largas y delgadas, común en bosques neotropicales, se alimenta de frutos y semillas."
      },
      {
        "espanol": "Alacrán / Escorpión",
        "wayuunaiki": "Jime'e",
        "definicion": "Arácnido depredador nocturno con pinzas delanteras (pedipalpos) y cola segmentada con aguijón venenoso."
      },
      {
        "espanol": "Almeja",
        "wayuunaiki": "Alemeja / Peerü ma'aküi",
        "definicion": "Molusco bivalvo marino o de agua dulce, concha simétrica ovalada o redondeada que vive enterrado en fondos blandos."
      },
      {
        "espanol": "Anémona de Mar",
        "wayuunaiki": "Wüinsütpa'a (aprox.)",
        "definicion": "Animal marino (antozoo) sésil con forma de flor, cuerpo cilíndrico y tentáculos urticantes alrededor de la boca."
      },
      {
        "espanol": "Anguila",
        "wayuunaiki": "Je'echi",
        "definicion": "Pez de cuerpo muy alargado y serpentiforme, piel viscosa, capaz de vivir en agua dulce y salada (catádromo)."
      },
      {
        "espanol": "Atún",
        "wayuunaiki": "Atuuna / Watsu",
        "definicion": "Pez marino grande, pelágico, rápido nadador (familia Scombridae), de gran importancia comercial por su carne."
      },
      {
        "espanol": "Babosa",
        "wayuunaiki": "Kolomchon sü'ütpa'a (aprox.)",
        "definicion": "Molusco gasterópodo terrestre sin concha externa visible (o muy reducida), cuerpo blando y mucoso."
      },
      {
        "espanol": "Bacalao",
        "wayuunaiki": "Wakalao",
        "definicion": "Pez marino de aguas frías (familia Gadidae), importante para la pesca, a menudo consumido salado y seco."
      },
      {
        "espanol": "Berberecho",
        "wayuunaiki": "Choncho (aprox.)",
        "definicion": "Molusco bivalvo marino, concha redondeada con fuertes costillas radiales, vive en fondos arenosos."
      },
      {
        "espanol": "Boa",
        "wayuunaiki": "Oukotta / Okotta",
        "definicion": "Serpiente grande no venenosa de la familia Boidae, que mata a sus presas por constricción."
      },
      {
        "espanol": "Caballito de Mar",
        "wayuunaiki": "Pa'uru wüinpü'ü / Pa'uru maima",
        "definicion": "Pez marino (familia Syngnathidae) de forma peculiar, cuerpo erguido cubierto de placas óseas, cabeza en ángulo y cola prensil."
      },
      {
        "espanol": "Calamar",
        "wayuunaiki": "Si'ime (aprox.)",
        "definicion": "Molusco cefalópodo marino con diez tentáculos (8 brazos, 2 tentáculos largos), cuerpo alargado y concha interna (pluma)."
      },
      {
        "espanol": "Camarón",
        "wayuunaiki": "Kasia",
        "definicion": "Crustáceo decápodo nadador, cuerpo alargado y comprimido lateralmente, abdomen musculoso, muy apreciado gastronómicamente."
      },
      {
        "espanol": "Canario",
        "wayuunaiki": "Kanariu",
        "definicion": "Pequeña ave paseriforme canora, originaria de Macaronesia, domesticada como ave de jaula por su canto."
      },
      {
        "espanol": "Cangrejo",
        "wayuunaiki": "Jeitsu",
        "definicion": "Crustáceo decápodo con caparazón duro, cinco pares de patas (el primero modificado en pinzas), que camina de lado."
      },
      {
        "espanol": "Capibara / Chigüiro",
        "wayuunaiki": "Epere",
        "definicion": "El roedor viviente más grande del mundo, semiacuático, herbívoro, social, nativo de Sudamérica."
      },
      {
        "espanol": "Cascabel (Serpiente)",
        "wayuunaiki": "Ma'ala",
        "definicion": "Serpiente venenosa americana (género Crotalus) con un cascabel córneo en el extremo de la cola que agita como advertencia."
      },
      {
        "espanol": "Cazón",
        "wayuunaiki": "Tü'ürül chikit (aprox.)",
        "definicion": "Nombre común para varias especies de tiburones pequeños a medianos, a menudo de la familia Triakidae o Carcharhinidae."
      },
      {
        "espanol": "Cecilia",
        "wayuunaiki": "Wüi mmolu'u (aprox.)",
        "definicion": "Anfibio ápodo (sin patas), cuerpo alargado, anillado y vermiforme, hábitos subterráneos o acuáticos."
      },
      {
        "espanol": "Cernícalo",
        "wayuunaiki": "Kuluulu / Kürüürü",
        "definicion": "Halcón pequeño (género Falco) que tiene la habilidad de cernirse (mantenerse estático en el aire) mientras busca presas."
      },
      {
        "espanol": "Chicharra / Cigarra",
        "wayuunaiki": "Riichii",
        "definicion": "Insecto hemíptero (familia Cicadidae) conocido por el sonido fuerte y prolongado ('canto') que produce el macho."
      },
      {
        "espanol": "Chicharra de Mar / Galera",
        "wayuunaiki": "Jeita'a (aprox.)",
        "definicion": "Crustáceo estomatópodo marino, depredador muy agresivo con apéndices raptores extremadamente rápidos y potentes."
      },
      {
        "espanol": "Chotacabras / Gallinaciega",
        "wayuunaiki": "Waluuse'e",
        "definicion": "Ave caprimulgiforme nocturna o crepuscular, plumaje críptico, boca muy ancha para cazar insectos en vuelo."
      },
      {
        "espanol": "Chulo / Gallinazo / Zamuro",
        "wayuunaiki": "Samulu",
        "definicion": "Ave rapaz carroñera del Nuevo Mundo (familia Cathartidae), plumaje oscuro, cabeza y cuello desnudos."
      },
      {
        "espanol": "Cigüeña",
        "wayuunaiki": "Sawawa / Kala'inyawaa",
        "definicion": "Ave ciconiforme grande, patas y cuello largos, pico largo y robusto, a menudo anida en construcciones humanas."
      },
      {
        "espanol": "Coatí / Cusumbo",
        "wayuunaiki": "Wa'ala / Wala",
        "definicion": "Mamífero prociónido diurno, sociable, con hocico alargado y móvil, y cola larga anillada que suele llevar erguida."
      },
      {
        "espanol": "Cochinilla de Humedad",
        "wayuunaiki": "Kepia shi'iapü (aprox.)",
        "definicion": "Crustáceo isópodo terrestre (suborden Oniscidea) que vive en lugares húmedos, respira por branquias modificadas y puede enrollarse."
      },
      {
        "espanol": "Codorniz",
        "wayuunaiki": "Pareuwa",
        "definicion": "Ave galliforme pequeña y terrestre (familia Phasianidae o Odontophoridae), de vuelo corto y rápido."
      },
      {
        "espanol": "Comadreja",
        "wayuunaiki": "Jü'lichi",
        "definicion": "Pequeño mamífero carnívoro mustélido, de cuerpo muy alargado y flexible, patas cortas, ágil depredador."
      },
      {
        "espanol": "Coral (Pólipo)",
        "wayuunaiki": "Simi'ira",
        "definicion": "Pólipo marino (antozoo) que vive en colonias y segrega un esqueleto calcáreo, formando arrecifes en aguas cálidas."
      },
      {
        "espanol": "Coral (Serpiente)",
        "wayuunaiki": "Tolo'o / Toro'o",
        "definicion": "Serpiente venenosa (familia Elapidae) con patrones de anillos de colores brillantes (rojo, amarillo/blanco, negro)."
      },
      {
        "espanol": "Cucaracha",
        "wayuunaiki": "Kepia",
        "definicion": "Insecto blatodeo corredor, cuerpo aplanado, antenas largas, hábitos nocturnos, asociado a menudo con ambientes humanos."
      },
      {
        "espanol": "Cuy / Curí",
        "wayuunaiki": "Kuri",
        "definicion": "Roedor histricomorfo originario de los Andes, domesticado por su carne y como mascota."
      },
      {
        "espanol": "Erizo de mar",
        "wayuunaiki": "Wa'ira",
        "definicion": "Equinodermo marino de forma globular o discoidal, cubierto por un caparazón rígido con espinas móviles."
      },
      {
        "espanol": "Escarabajo",
        "wayuunaiki": "Moulo",
        "definicion": "Insecto coleóptero, caracterizado por tener un par de alas delanteras endurecidas (élitros) que cubren las alas traseras."
      },
      {
        "espanol": "Espátula (Ave)",
        "wayuunaiki": "Kalapaasü",
        "definicion": "Ave pelecaniforme (familia Threskiornithidae) de patas largas y pico largo y aplanado en forma de espátula en el extremo."
      },
      {
        "espanol": "Esponja de Mar",
        "wayuunaiki": "Palousa",
        "definicion": "Animal acuático porífero, sésil (fijo al sustrato), cuerpo simple con poros y canales por donde filtra agua para alimentarse."
      },
      {
        "espanol": "Estrella de mar",
        "wayuunaiki": "Püloju'u (aprox.)",
        "definicion": "Equinodermo marino (clase Asteroidea) con simetría radial y cuerpo aplanado en forma de estrella, generalmente con cinco brazos."
      },
      {
        "espanol": "Ganso",
        "wayuunaiki": "Wansu",
        "definicion": "Ave anseriforme acuática, más grande que el pato, cuello largo, domesticada y salvaje."
      },
      {
        "espanol": "Garrapata",
        "wayuunaiki": "Mü'üi",
        "definicion": "Arácnido ácaro parásito externo hematófago, se adhiere a la piel de animales y humanos, vector de enfermedades."
      },
      {
        "espanol": "Gaviota",
        "wayuunaiki": "Kai'kai",
        "definicion": "Ave marina (familia Laridae), plumaje generalmente blanco y gris, adaptable y a menudo costera."
      },
      {
        "espanol": "Gecko",
        "wayuunaiki": "Kakuche (aprox.)",
        "definicion": "Lagarto (suborden Gekkota) nocturno, pequeño a mediano, a menudo con almohadillas adhesivas en los dedos que le permiten trepar."
      },
      {
        "espanol": "Golondrina",
        "wayuunaiki": "Kale'u",
        "definicion": "Ave paseriforme migratoria (familia Hirundinidae), vuelo rápido y ágil, alas puntiagudas, cola ahorquillada."
      },
      {
        "espanol": "Grillo",
        "wayuunaiki": "Ki'yoi",
        "definicion": "Insecto ortóptero nocturno (familia Gryllidae), conocido por el 'canto' chirriante de los machos."
      },
      {
        "espanol": "Ibis",
        "wayuunaiki": "Tooko / Tookolo",
        "definicion": "Ave pelecaniforme (familia Threskiornithidae) de patas largas y pico largo y curvado hacia abajo, busca alimento en lodo."
      },
      {
        "espanol": "Jurel",
        "wayuunaiki": "Kuruuru",
        "definicion": "Pez marino perciforme pelágico (familia Carangidae), cuerpo fusiforme y comprimido, rápido nadador, a menudo plateado."
      },
      {
        "espanol": "Lapa (Molusco)",
        "wayuunaiki": "Mapa'a",
        "definicion": "Molusco gasterópodo marino con concha cónica no enrollada, que se adhiere fuertemente a las rocas intermareales."
      },
      {
        "espanol": "Lapa / Paca (Roedor)",
        "wayuunaiki": "E'inyuru / Einjuru",
        "definicion": "Roedor nocturno grande, cuerpo robusto, pelaje pardo con hileras de manchas blancas, apreciado por su carne."
      },
      {
        "espanol": "Lechuza",
        "wayuunaiki": "Kerüü (aprox.)",
        "definicion": "Ave rapaz nocturna (familia Tytonidae), cara blanca o pálida en forma de corazón, vuelo silencioso."
      },
      {
        "espanol": "Libélula",
        "wayuunaiki": "Alama",
        "definicion": "Insecto odonato depredador, cuerpo alargado, ojos grandes, dos pares de alas membranosas fuertes, vuela cerca del agua."
      },
      {
        "espanol": "Luciérnaga",
        "wayuunaiki": "Je'yulu amuitpa'a (aprox.)",
        "definicion": "Insecto coleóptero (familia Lampyridae) capaz de producir luz (bioluminiscencia), generalmente en el abdomen."
      },
      {
        "espanol": "Manatí",
        "wayuunaiki": "Awüi / Awi",
        "definicion": "Mamífero sirenio acuático grande, herbívoro, lento, de aguas tropicales costeras y fluviales."
      },
      {
        "espanol": "Mantis Religiosa",
        "wayuunaiki": "A'yalajüi",
        "definicion": "Insecto mantodeo depredador, cuerpo alargado, cabeza triangular móvil, patas delanteras raptoras plegadas."
      },
      {
        "espanol": "Mantarraya",
        "wayuunaiki": "Paliya ma'i (aprox.)",
        "definicion": "La raya más grande (género Mobula), pelágica, inofensiva, se alimenta filtrando plancton, con 'cuernos' cefálicos característicos."
      },
      {
        "espanol": "Margay",
        "wayuunaiki": "Malakachuen / Marakachu'un (aprox.)",
        "definicion": "Felino salvaje americano pequeño (Leopardus wiedii), similar al ocelote pero más pequeño y adaptado a la vida arborícola, tobillos muy flexibles."
      },
      {
        "espanol": "Martín Pescador",
        "wayuunaiki": "Jeyutsürü",
        "definicion": "Ave coraciforme (familia Alcedinidae), compacta, colores a menudo brillantes, cabeza grande, pico largo y puntiagudo, pesca zambulléndose."
      },
      {
        "espanol": "Martillo (Tiburón)",
        "wayuunaiki": "Tü'ürül paleta (aprox.)",
        "definicion": "Tiburón (familia Sphyrnidae) caracterizado por su cabeza aplanada y extendida lateralmente (cefalofoil) en forma de T o martillo."
      },
      {
        "espanol": "Medusa / Aguamala",
        "wayuunaiki": "Aku'uja (aprox.)",
        "definicion": "Forma de vida libre de los cnidarios (medusozoos), cuerpo gelatinoso en forma de campana o sombrilla con tentáculos urticantes."
      },
      {
        "espanol": "Mejillón",
        "wayuunaiki": "Peerü",
        "definicion": "Molusco bivalvo marino (familia Mytilidae) que vive adherido a sustratos duros mediante filamentos (biso), concha oscura y alargada."
      },
      {
        "espanol": "Mero",
        "wayuunaiki": "Kurina / Kulina",
        "definicion": "Nombre común para peces marinos perciformes robustos (subfamilia Epinephelinae), depredadores de fondos rocosos o coralinos."
      },
      {
        "espanol": "Milpiés",
        "wayuunaiki": "Ishe'e / Isho'o",
        "definicion": "Artrópodo miriápodo (clase Diplopoda) detritívoro, cuerpo cilíndrico segmentado con dos pares de patas por segmento."
      },
      {
        "espanol": "Morena",
        "wayuunaiki": "Moreena / Je'echi ma'i",
        "definicion": "Pez anguiliforme marino (familia Muraenidae), cuerpo serpentiforme sin aletas pares, piel gruesa, boca grande con dientes afilados."
      },
      {
        "espanol": "Nutria",
        "wayuunaiki": "Püree",
        "definicion": "Mamífero carnívoro semiacuático (subfamilia Lutrinae), cuerpo alargado, patas cortas palmeadas, pelaje denso e impermeable."
      },
      {
        "espanol": "Ocelote / Tigrillo",
        "wayuunaiki": "Maraka / Maraká",
        "definicion": "Felino salvaje americano de tamaño mediano (Leopardus pardalis), pelaje manchado característico, hábitos nocturnos."
      },
      {
        "espanol": "Oropéndola",
        "wayuunaiki": "Yu'laa / Yonna",
        "definicion": "Ave paseriforme neotropical (familia Icteridae), sociable, conocida por sus largos nidos colgantes tejidos en forma de bolsa."
      },
      {
        "espanol": "Oruga",
        "wayuunaiki": "Pasala'a / Pasara'a",
        "definicion": "Larva de los insectos lepidópteros (mariposas y polillas), cuerpo blando y segmentado, se alimenta de plantas."
      },
      {
        "espanol": "Oso hormiguero / Cerdo hormiguero",
        "wayuunaiki": "Walepü",
        "definicion": "Mamífero del superorden Xenarthra, especializado en comer hormigas y termitas, con hocico largo y lengua pegajosa."
      },
      {
        "espanol": "Ostra",
        "wayuunaiki": "Woorü",
        "definicion": "Molusco bivalvo marino que vive fijo al sustrato, concha irregular y rugosa, algunas especies comestibles y otras perlíferas."
      },
      {
        "espanol": "Pargo",
        "wayuunaiki": "Palaaka",
        "definicion": "Nombre común para peces marinos perciformes (familia Lutjanidae), cuerpo robusto, a menudo de color rojizo, carne apreciada."
      },
      {
        "espanol": "Pato",
        "wayuunaiki": "Paüt",
        "definicion": "Ave anseriforme acuática, pico aplanado, patas palmeadas, más pequeña que el ganso."
      },
      {
        "espanol": "Paujil / Paují",
        "wayuunaiki": "Wapu'u / Wapü'ü",
        "definicion": "Ave galliforme grande (familia Cracidae), arborícola, de selvas neotropicales, a menudo con cresta pronunciada."
      },
      {
        "espanol": "Pavo",
        "wayuunaiki": "Pawa",
        "definicion": "Ave galliforme grande (Meleagris gallopavo), originaria de América, domesticada por su carne."
      },
      {
        "espanol": "Pavo real",
        "wayuunaiki": "Pawo rial / Pawa rial",
        "definicion": "Ave galliforme (género Pavo) originaria de Asia, el macho destaca por su larga cola de plumas oceladas que despliega."
      },
      {
        "espanol": "Pecarí / Báquiro / Zaino",
        "wayuunaiki": "Püri'i / Piri'i",
        "definicion": "Mamífero artiodáctilo americano (familia Tayassuidae), parecido al cerdo pero distinto, social, con colmillos rectos."
      },
      {
        "espanol": "Pelícano",
        "wayuunaiki": "Atpanaa",
        "definicion": "Ave pelecaniforme marina grande, caracterizada por una gran bolsa gular debajo del pico para capturar peces."
      },
      {
        "espanol": "Pepino de Mar",
        "wayuunaiki": "Waü'la",
        "definicion": "Equinodermo marino (clase Holothuroidea), cuerpo alargado, blando y musculoso, forma de pepino, se alimenta de detritos."
      },
      {
        "espanol": "Perezoso",
        "wayuunaiki": "Ware'e",
        "definicion": "Mamífero Xenarthra arborícola de movimientos muy lentos, dieta folívora, vive en selvas neotropicales."
      },
      {
        "espanol": "Pez Aguja",
        "wayuunaiki": "Wüi wüinpü'ü (aprox.)",
        "definicion": "Pez marino (familia Syngnathidae), cuerpo muy alargado y delgado como una aguja, relacionado con el caballito de mar."
      },
      {
        "espanol": "Pez Ángel (Marino)",
        "wayuunaiki": "Ainjele / Jime aleket",
        "definicion": "Pez marino perciforme de arrecife (familia Pomacanthidae), cuerpo muy comprimido lateralmente, colores vivos y aletas a menudo alargadas."
      },
      {
        "espanol": "Pez Cirujano",
        "wayuunaiki": "Siruuna / Jime katsüjiraa",
        "definicion": "Pez marino perciforme de arrecife (familia Acanthuridae), con espinas afiladas ('bisturíes') a cada lado de la base de la cola."
      },
      {
        "espanol": "Pez Globo",
        "wayuunaiki": "Jimolu / Jime apü'ü",
        "definicion": "Pez marino (familia Tetraodontidae) capaz de inflar su cuerpo con agua o aire como defensa, a menudo tóxico."
      },
      {
        "espanol": "Pez Loro",
        "wayuunaiki": "Wanülüülii",
        "definicion": "Pez marino perciforme de arrecife (subfamilia Scarinae), colores brillantes, boca similar a un pico de loro para roer coral y algas."
      },
      {
        "espanol": "Piojo",
        "wayuunaiki": "E'ina",
        "definicion": "Insecto ftiráptero parásito externo, pequeño, sin alas, vive en el pelo o plumas de mamíferos y aves."
      },
      {
        "espanol": "Polilla",
        "wayuunaiki": "Mapüi",
        "definicion": "Insecto lepidóptero generalmente nocturno, cuerpo a menudo robusto y antenas plumosas o filiformes (no terminadas en maza)."
      },
      {
        "espanol": "Puercoespín",
        "wayuunaiki": "A'ürü",
        "definicion": "Roedor (familias Erethizontidae o Hystricidae) cubierto de púas largas y afiladas como defensa."
      },
      {
        "espanol": "Pulga",
        "wayuunaiki": "Ki'ipü",
        "definicion": "Insecto sifonáptero parásito externo hematófago, pequeño, sin alas, cuerpo comprimido lateralmente, adaptado para saltar."
      },
      {
        "espanol": "Pulpo",
        "wayuunaiki": "Wochop (aprox.)",
        "definicion": "Molusco cefalópodo marino con ocho tentáculos provistos de ventosas, cuerpo blando y gran capacidad de camuflaje."
      },
      {
        "espanol": "Raya",
        "wayuunaiki": "Paliya",
        "definicion": "Pez cartilaginoso (superorden Batoidea) de cuerpo aplanado dorsoventralmente y aletas pectorales fusionadas a la cabeza formando un disco."
      },
      {
        "espanol": "Renacuajo",
        "wayuunaiki": "Amülou",
        "definicion": "Larva acuática de los anfibios anuros (ranas y sapos), con cola y respiración branquial (al inicio)."
      },
      {
        "espanol": "Salamandra",
        "wayuunaiki": "Kulira (aprox.)",
        "definicion": "Anfibio urodelo (con cola) de cuerpo alargado, cuatro patas cortas y piel húmeda, a menudo terrestre en fase adulta."
      },
      {
        "espanol": "Salmón",
        "wayuunaiki": "Sarumoun",
        "definicion": "Pez anádromo (familia Salmonidae) de aguas frías, conocido por migrar río arriba para desovar y por su carne rosada."
      },
      {
        "espanol": "Saltamontes",
        "wayuunaiki": "Kama'a",
        "definicion": "Insecto ortóptero herbívoro (suborden Caelifera), diurno, con patas traseras fuertes adaptadas para saltar."
      },
      {
        "espanol": "Sanguijuela",
        "wayuunaiki": "Wali'i",
        "definicion": "Anélido clitelado (subclase Hirudinea), cuerpo segmentado con ventosas en ambos extremos, muchas especies son hematófagas."
      },
      {
        "espanol": "Sardina",
        "wayuunaiki": "Maliina",
        "definicion": "Nombre común para peces marinos pequeños y plateados (familia Clupeidae), forman grandes bancos, importancia comercial."
      },
      {
        "espanol": "Tábano",
        "wayuunaiki": "Sapüle",
        "definicion": "Mosca grande y robusta (familia Tabanidae), la hembra es hematófaga y su picadura es dolorosa."
      },
      {
        "espanol": "Tapir / Danta",
        "wayuunaiki": "Emaa",
        "definicion": "Mamífero perisodáctilo grande, cuerpo robusto, patas cortas y hocico corto y prensil (probóscide), habita en selvas."
      },
      {
        "espanol": "Termita / Comején",
        "wayuunaiki": "Aka'pü",
        "definicion": "Insecto social (orden Blattodea, infraorden Isoptera) que vive en colonias y se alimenta de celulosa (madera)."
      },
      {
        "espanol": "Tinamú / Soisola",
        "wayuunaiki": "Ma'üi",
        "definicion": "Ave terrestre sudamericana (orden Tinamiformes), aspecto de perdiz pero no relacionada, de vuelo corto y torpe."
      },
      {
        "espanol": "Tití",
        "wayuunaiki": "Miiku chikit (aprox.)",
        "definicion": "Nombre común para monos pequeños del Nuevo Mundo (familia Callitrichidae), como marmosets y tamarinos."
      },
      {
        "espanol": "Tucán",
        "wayuunaiki": "Jalia / Ja'lia",
        "definicion": "Ave piciforme neotropical (familia Ramphastidae) reconocible por su pico desproporcionadamente grande y colorido."
      },
      {
        "espanol": "Yaguarundí / Gato Moro",
        "wayuunaiki": "Eemülü / Emülü",
        "definicion": "Felino salvaje americano (Puma yagouaroundi) de tamaño mediano, cuerpo alargado, patas cortas, cabeza pequeña y coloración uniforme (gris o rojiza)."
      },
      {
        "espanol": "Zarigüeya / Chucha / Fara",
        "wayuunaiki": "Walashi / Walasi",
        "definicion": "Marsupial americano (orden Didelphimorphia), omnívoro, a menudo nocturno, conocido por su habilidad para 'hacerse el muerto' (tanatosis)."
      }
    ]
  },
  "familia": [
    { "espanol": "Madre", "wayuunaiki": "A'ain", "definicion": "Mujer que ha dado a luz o que ejerce la maternidad." },
    { "espanol": "Padre", "wayuunaiki": "A'ain", "definicion": "Hombre que ha engendrado a un hijo o que ejerce la paternidad." },
    { "espanol": "Hermano", "wayuunaiki": "Tawa'la", "definicion": "Persona que tiene un mismo padre o madre que otra." },
    { "espanol": "Hermana", "wayuunaiki": "Tawa'la", "definicion": "Persona del sexo femenino que tiene un mismo padre o madre que otra." },
    { "espanol": "Hijo", "wayuunaiki": "Tawa'la", "definicion": "Persona que desciende de otra por línea directa." },
    { "espanol": "Hija", "wayuunaiki": "Tawa'la", "definicion": "Persona del sexo femenino que desciende de otra por línea directa." },
    { "espanol": "Abuelo", "wayuunaiki": "A'ain", "definicion": "Padre del padre o de la madre." },
    { "espanol": "Abuela", "wayuunaiki": "A'ain", "definicion": "Madre del padre o de la madre." },
    { "espanol": "Nieto", "wayuunaiki": "Tawa'la", "definicion": "Hijo de los hijos." },
    { "espanol": "Nieta", "wayuunaiki": "Tawa'la", "definicion": "Hija de los hijos." },
    { "espanol": "Tío", "wayuunaiki": "Tawa'la", "definicion": "Hermano del padre o de la madre." },
    { "espanol": "Tía", "wayuunaiki": "Tawa'la", "definicion": "Hermana del padre o de la madre." },
    { "espanol": "Sobrino", "wayuunaiki": "Tawa'la", "definicion": "Hijo del hermano o hermana." },
    { "espanol": "Sobrina", "wayuunaiki": "Tawa'la", "definicion": "Hija del hermano o hermana." },
    { "espanol": "Primo", "wayuunaiki": "Tawa'la", "definicion": "Hijo del hermano o hermana del padre o de la madre." },
    { "espanol": "Prima", "wayuunaiki": "Tawa'la", "definicion": "Hija del hermano o hermana del padre o de la madre." }
  ],
  "objetos": [
    { "espanol": "Casa", "wayuunaiki": "Miichi", "definicion": "Edificio construido para ser habitado." },
    { "espanol": "Agua", "wayuunaiki": "Wuin", "definicion": "Sustancia líquida sin olor, color ni sabor que se encuentra en la naturaleza en ríos, lagos y mares." },
    { "espanol": "Sol", "wayuunaiki": "Kashi", "definicion": "Estrella luminosa que constituye el centro de nuestro sistema planetario." }
  ],
  "numeros": [
    { "espanol": "Uno", "wayuunaiki": "Wanee", "definicion": "Primer número natural." },
    { "espanol": "Dos", "wayuunaiki": "Piama", "definicion": "Número natural que sigue al uno." },
    { "espanol": "Tres", "wayuunaiki": "Apünüin", "definicion": "Número natural que sigue al dos." }
  ],
  "colores": [
    { "espanol": "Amarillo", "wayuunaiki": "Maloukata", "definicion": "Color semejante al del oro o al de la yema de huevo." },
    { "espanol": "Azul", "wayuunaiki": "Wulit", "definicion": "Color del cielo despejado." },
    { "espanol": "Rojo", "wayuunaiki": "Isho", "definicion": "Color de la sangre." }
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

router.get('/translate', (req, res) => {
  const terminoBusqueda = removerAcentos(req.query.word ? req.query.word.toLowerCase().trim() : '');
  const resultados = [];
  const umbralSimilitud = 0.6;

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

app.use('/.netlify/functions/funcion-diccionario', router);

module.exports.handler = serverless(app);