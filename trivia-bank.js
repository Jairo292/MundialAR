// Banco de trivias personalizadas por selección (embebido en JS).
//
// - Se usa por token (nombre normalizado):
//   Ej: "Corea del Sur" -> COREADELSUR, "Costa de Marfil" -> COSTADEMARFIL.
// - Cada selección debe tener exactamente 3 preguntas.
//
// Formato de pregunta:
// { q: "texto", options: ["A","B","C","D"], answer: 0 }
// `answer` es el índice (0..3) de la opción correcta.

(function () {
	const byIndex = {};
	const byToken = {
		MEXICO: [
			{ q: '¿En qué año ganó México su primer Copa Oro?', options: ['1993', '1998', '2003', '1989'], answer: 0 },
			{ q: '¿Quién es el portero más famoso de México en Mundiales recientes?', options: ['Corona', 'Ochoa', 'Talavera', 'Oswaldo Sánchez'], answer: 1 },
			{ q: '¿Contra qué selección logró México la victoria en la final de los Juegos Olímpicos 2012?', options: ['Argentina', 'España', 'Brasil', 'Alemania'], answer: 2 },
],
		COREADELSUR: [
			{ q: '¿En qué mundial alcanzó Corea del Sur las semifinales?', options: ['2002', '2010', '2018', '1998'], answer: 0 },
			{ q: '¿Quién es una de las mayores estrellas recientes de Corea del Sur?', options: ['Ji-Sung Park', 'Son Heung-min', 'Lee Kang-in', 'Hwang Hee-chan'], answer: 1 },
			{ q: '¿Qué selección eliminó Corea del Sur en 2018 sorprendiendo al mundo?', options: ['Brasil', 'Argentina', 'Alemania', 'España'], answer: 2 },
],

SUDAFRICA: [
			{ q: '¿Cómo se le conoce a la selección de Sudáfrica?', options: ['Bafana Bafana', 'Leones', 'Águilas', 'Reds'], answer: 0 },
			{ q: '¿En qué año fue anfitrión del Mundial Sudáfrica?', options: ['2006', '2010', '2014', '2018'], answer: 1 },
			{ q: '¿Qué instrumento se hizo famoso en su Mundial?', options: ['Tambor', 'Corneta', 'Vuvuzela', 'Silbato'], answer: 2 },
],

CANADA: [
			{ q: '¿A qué confederación pertenece Canadá?', options: ['CONCACAF', 'UEFA', 'CAF', 'AFC'], answer: 0 },
			{ q: '¿Quién es la mayor estrella reciente de Canadá?', options: ['David', 'Alphonso Davies', 'Buchanan', 'Larin'], answer: 1 },
			{ q: '¿En qué año volvió Canadá a un Mundial después de décadas?', options: ['2018', '2014', '2022', '2010'], answer: 2 },
],

SUIZA: [
			{ q: '¿A qué confederación pertenece Suiza?', options: ['UEFA', 'AFC', 'CAF', 'CONCACAF'], answer: 0 },
			{ q: '¿Qué jugador es uno de los más reconocidos de Suiza?', options: ['Shaqiri', 'Granit Xhaka', 'Sommer', 'Embolo'], answer: 1 },
			{ q: '¿A qué selección eliminó Suiza en la Euro 2020?', options: ['Italia', 'España', 'Francia', 'Alemania'], answer: 2 },
],

QATAR: [
			{ q: '¿Qué torneo importante ganó Qatar en 2019?', options: ['Copa Asia', 'Copa Oro', 'Eurocopa', 'Copa América'], answer: 0 },
			{ q: '¿En qué año fue anfitrión del Mundial?', options: ['2018', '2022', '2014', '2010'], answer: 1 },
			{ q: '¿Qué selección derrotó Qatar en la final de la Copa Asia 2019?', options: ['Japón', 'Corea del Sur', 'Arabia Saudita', 'Irán'], answer: 2 },
],

BRASIL: [
			{ q: '¿Cuántos Mundiales ha ganado Brasil?', options: ['5', '4', '3', '6'], answer: 0 },
			{ q: '¿Quién es uno de los máximos ídolos históricos de Brasil?', options: ['Ronaldinho', 'Pelé', 'Ronaldo', 'Neymar'], answer: 1 },
			{ q: '¿Contra qué selección perdió Brasil 7-1 en 2014?', options: ['Argentina', 'España', 'Alemania', 'Francia'], answer: 2 },
],

MARRUECOS: [
			{ q: '¿Cómo se le conoce a la selección de Marruecos?', options: ['Leones del Atlas', 'Tigres', 'Dragones', 'Águilas'], answer: 0 },
			{ q: '¿En qué mundial llegó a semifinales haciendo historia?', options: ['2018', '2022', '2014', '2010'], answer: 1 },
			{ q: '¿Qué selección eliminó Marruecos en octavos del Mundial 2022?', options: ['Francia', 'Croacia', 'España', 'Brasil'], answer: 2 },
],
		ESCOCIA: [
			{ q: '¿Cómo se le conoce a la afición de Escocia?', options: ['Tartan Army', 'Leones', 'Bleus', 'Reds'], answer: 0 },
			{ q: '¿A qué confederación pertenece Escocia?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 1 },
			{ q: '¿Cuál es el color principal de su uniforme?', options: ['Rojo', 'Verde', 'Azul', 'Blanco'], answer: 2 },
],

HAITI: [
			{ q: '¿A qué confederación pertenece Haití?', options: ['CONCACAF', 'UEFA', 'CAF', 'AFC'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección de Haití?', options: ['Leones', 'Les Grenadiers', 'Dragones', 'Reds'], answer: 1 },
			{ q: '¿Cuál es uno de los colores principales de su uniforme?', options: ['Verde', 'Amarillo', 'Azul', 'Negro'], answer: 2 },
],

ESTADOSUNIDOS: [
			{ q: '¿Cómo se abrevia la selección masculina de EE.UU.?', options: ['USMNT', 'USAFC', 'USAT', 'MLS'], answer: 0 },
			{ q: '¿A qué confederación pertenece Estados Unidos?', options: ['UEFA', 'CONCACAF', 'CAF', 'AFC'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Verde', 'Amarillo', 'Blanco', 'Negro'], answer: 2 },
],

AUSTRALIA: [
			{ q: '¿Cómo se le conoce a la selección de Australia?', options: ['Socceroos', 'Leones', 'Dragones', 'Reds'], answer: 0 },
			{ q: '¿A qué confederación pertenece actualmente?', options: ['UEFA', 'AFC', 'CAF', 'CONMEBOL'], answer: 1 },
			{ q: '¿Cuál es su color principal?', options: ['Rojo', 'Azul', 'Amarillo', 'Negro'], answer: 2 },
],

PARAGUAY: [
			{ q: '¿Cómo se le conoce a la selección de Paraguay?', options: ['Albirroja', 'Leones', 'Reds', 'Bleus'], answer: 0 },
			{ q: '¿A qué confederación pertenece Paraguay?', options: ['UEFA', 'CONMEBOL', 'CAF', 'AFC'], answer: 1 },
			{ q: '¿Qué colores predominan en su uniforme?', options: ['Verde', 'Azul', 'Rojo y blanco', 'Negro'], answer: 2 },
],

ALEMANIA: [
			{ q: '¿Cuántos Mundiales ha ganado Alemania?', options: ['4', '3', '2', '5'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección alemana?', options: ['Leones', 'Die Mannschaft', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿Contra quién ganó Alemania la final del Mundial 2014?', options: ['Brasil', 'España', 'Argentina', 'Francia'], answer: 2 },
],

ECUADOR: [
			{ q: '¿A qué confederación pertenece Ecuador?', options: ['CONMEBOL', 'UEFA', 'AFC', 'CAF'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección de Ecuador?', options: ['Leones', 'La Tri', 'Reds', 'Bleus'], answer: 1 },
			{ q: '¿Cuál es su color principal?', options: ['Rojo', 'Azul', 'Amarillo', 'Verde'], answer: 2 },
],
		COSTADEMARFIL: [
			{ q: '¿Cómo se le conoce a la selección de Costa de Marfil?', options: ['Elefantes', 'Leones', 'Águilas', 'Tigres'], answer: 0 },
			{ q: '¿Qué jugador fue una de sus máximas estrellas históricas?', options: ['Zaha', 'Drogba', 'Touré', 'Pépé'], answer: 1 },
			{ q: '¿Qué torneo ganó Costa de Marfil en 2015?', options: ['Mundial', 'Copa Oro', 'Copa Africana de Naciones', 'Copa América'], answer: 2 },
],

CURAZAO: [
			{ q: '¿A qué confederación pertenece Curazao?', options: ['CONCACAF', 'UEFA', 'CAF', 'AFC'], answer: 0 },
			{ q: '¿De qué país europeo depende Curazao?', options: ['España', 'Países Bajos', 'Francia', 'Portugal'], answer: 1 },
			{ q: '¿Qué color predomina en su uniforme?', options: ['Rojo', 'Verde', 'Azul', 'Amarillo'], answer: 2 },
],

HOLANDA: [
			{ q: '¿Cuál es el color característico de Países Bajos?', options: ['Naranja', 'Rojo', 'Azul', 'Verde'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Oranje', 'Bleus', 'Reds'], answer: 1 },
			{ q: '¿En qué año llegó a la final del Mundial contra España?', options: ['2014', '2006', '2010', '1998'], answer: 2 },
],

JAPON: [
			{ q: '¿Cómo se le conoce a la selección de Japón?', options: ['Samurai Blue', 'Dragones', 'Leones', 'Tigres'], answer: 0 },
			{ q: '¿A qué confederación pertenece Japón?', options: ['UEFA', 'AFC', 'CAF', 'CONMEBOL'], answer: 1 },
			{ q: '¿A qué selección venció Japón en el Mundial 2022 sorprendiendo al mundo?', options: ['Brasil', 'Argentina', 'Alemania', 'Francia'], answer: 2 },
],

TUNEZ: [
			{ q: '¿A qué confederación pertenece Túnez?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Águilas de Cartago', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿Cuál es su color principal?', options: ['Azul', 'Verde', 'Rojo', 'Blanco'], answer: 2 },
],

BELGICA: [
			{ q: '¿Cómo se le conoce a la selección de Bélgica?', options: ['Diablos Rojos', 'Leones', 'Bleus', 'Reds'], answer: 0 },
			{ q: '¿Qué generación famosa tuvo Bélgica recientemente?', options: ['Generación Dorada', 'Generación Roja', 'Nueva Era', 'Equipo Elite'], answer: 1 },
			{ q: '¿En qué puesto quedó Bélgica en el Mundial 2018?', options: ['1°', '2°', '3°', '4°'], answer: 2 },
],

IRAN: [
			{ q: '¿Cómo se le conoce a la selección de Irán?', options: ['Team Melli', 'Leones', 'Reds', 'Dragones'], answer: 0 },
			{ q: '¿A qué confederación pertenece Irán?', options: ['UEFA', 'AFC', 'CAF', 'CONCACAF'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Azul', 'Negro', 'Blanco', 'Verde'], answer: 2 },
],

EGIPTO: [
			{ q: '¿Cómo se le conoce a la selección de Egipto?', options: ['Faraones', 'Leones', 'Águilas', 'Tigres'], answer: 0 },
			{ q: '¿Qué jugador es su máxima estrella reciente?', options: ['Zidan', 'Mohamed Salah', 'Elneny', 'Trezeguet'], answer: 1 },
			{ q: '¿A qué confederación pertenece Egipto?', options: ['UEFA', 'AFC', 'CAF', 'CONMEBOL'], answer: 2 },
],

NUEVAZELANDA: [
			{ q: '¿Cómo se le conoce a la selección de Nueva Zelanda?', options: ['All Whites', 'All Blacks', 'Leones', 'Reds'], answer: 0 },
			{ q: '¿A qué confederación pertenece?', options: ['UEFA', 'OFC', 'AFC', 'CAF'], answer: 1 },
			{ q: '¿Cuál es su color principal?', options: ['Rojo', 'Azul', 'Blanco', 'Verde'], answer: 2 },
],
		ESPANA: [
			{ q: '¿En qué año ganó España su primer Mundial?', options: ['2010', '2014', '2006', '1998'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección española?', options: ['Bleus', 'La Roja', 'Leones', 'Reds'], answer: 1 },
			{ q: '¿Qué jugador fue clave en la final del Mundial 2010?', options: ['Xavi', 'Torres', 'Iniesta', 'Ramos'], answer: 2 },
],

URUGUAY: [
			{ q: '¿Cuántos Mundiales ha ganado Uruguay?', options: ['2', '1', '3', '4'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección uruguaya?', options: ['Reds', 'La Celeste', 'Bleus', 'Leones'], answer: 1 },
			{ q: '¿En qué año ganó su último Mundial?', options: ['1954', '1962', '1950', '1970'], answer: 2 },
],

ARABIASAUDITA: [
			{ q: '¿A qué confederación pertenece Arabia Saudita?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: '¿Qué color predomina en su uniforme?', options: ['Rojo', 'Verde', 'Azul', 'Blanco'], answer: 1 },
			{ q: '¿A qué selección sorprendió Arabia Saudita en el Mundial 2022?', options: ['Brasil', 'Francia', 'Argentina', 'España'], answer: 2 },
],

CABOVERDE: [
			{ q: '¿A qué confederación pertenece Cabo Verde?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Tiburones Azules', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Rojo', 'Verde', 'Azul', 'Amarillo'], answer: 2 },
],

FRANCIA: [
			{ q: '¿Cuántos Mundiales ha ganado Francia?', options: ['2', '1', '3', '4'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección francesa?', options: ['Reds', 'Les Bleus', 'Leones', 'Águilas'], answer: 1 },
			{ q: '¿Qué jugador fue clave en el Mundial 2018?', options: ['Griezmann', 'Giroud', 'Mbappé', 'Pogba'], answer: 2 },
],

SENEGAL: [
			{ q: '¿Cómo se le conoce a la selección de Senegal?', options: ['Leones de Teranga', 'Tigres', 'Águilas', 'Reds'], answer: 0 },
			{ q: '¿A qué confederación pertenece Senegal?', options: ['UEFA', 'CAF', 'AFC', 'CONCACAF'], answer: 1 },
			{ q: '¿Qué jugador es una de sus máximas estrellas recientes?', options: ['Koulibaly', 'Mendy', 'Sadio Mané', 'Gueye'], answer: 2 },
],

NORUEGA: [
			{ q: '¿A qué confederación pertenece Noruega?', options: ['UEFA', 'CAF', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿Qué jugador es su mayor estrella actual?', options: ['Ødegaard', 'Erling Haaland', 'Sorloth', 'Berge'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Verde', 'Amarillo', 'Rojo', 'Negro'], answer: 2 },
],

ARGENTINA: [
			{ q: '¿Cuántos Mundiales ha ganado Argentina?', options: ['3', '2', '4', '1'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección argentina?', options: ['Reds', 'Albiceleste', 'Leones', 'Bleus'], answer: 1 },
			{ q: '¿Contra qué selección ganó la final del Mundial 2022?', options: ['Brasil', 'Alemania', 'Francia', 'Croacia'], answer: 2 },
],

AUSTRIA: [
			{ q: '¿A qué confederación pertenece Austria?', options: ['UEFA', 'CAF', 'AFC', 'CONMEBOL'], answer: 0 },
			{ q: '¿Cuál es su color principal?', options: ['Azul', 'Rojo', 'Verde', 'Blanco'], answer: 1 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Reds', 'Das Team', 'Dragones'], answer: 2 },
],

ARGELIA: [
			{ q: '¿A qué confederación pertenece Argelia?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿Cuál es su color principal?', options: ['Rojo', 'Verde', 'Azul', 'Blanco'], answer: 1 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Reds', 'Zorros del Desierto', 'Dragones'], answer: 2 },
],
		JORDANIA: [
			{ q: '¿A qué confederación pertenece Jordania?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección de Jordania?', options: ['Leones', 'Nashama', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Azul', 'Verde', 'Rojo', 'Blanco'], answer: 2 },
],

PORTUGAL: [
			{ q: '¿Qué torneo ganó Portugal en 2016?', options: ['Eurocopa', 'Mundial', 'Copa América', 'Nations League'], answer: 0 },
			{ q: '¿Quién es su máxima estrella histórica?', options: ['Figo', 'Cristiano Ronaldo', 'Deco', 'Pepe'], answer: 1 },
			{ q: '¿A qué selección venció en la final de la Euro 2016?', options: ['España', 'Alemania', 'Francia', 'Italia'], answer: 2 },
],

COLOMBIA: [
			{ q: '¿Cómo se le conoce a la selección de Colombia?', options: ['Cafeteros', 'Leones', 'Reds', 'Bleus'], answer: 0 },
			{ q: '¿Qué jugador brilló en el Mundial 2014?', options: ['Falcao', 'James Rodríguez', 'Cuadrado', 'Ospina'], answer: 1 },
			{ q: '¿A qué confederación pertenece Colombia?', options: ['UEFA', 'CAF', 'CONMEBOL', 'AFC'], answer: 2 },
],

UZBEKISTAN: [
			{ q: '¿A qué confederación pertenece Uzbekistán?', options: ['AFC', 'UEFA', 'CAF', 'CONCACAF'], answer: 0 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Rojo', 'Blanco', 'Azul', 'Verde'], answer: 1 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Reds', 'Lobos Blancos', 'Dragones'], answer: 2 },
],

INGLATERRA: [
			{ q: '¿En qué año ganó Inglaterra su único Mundial?', options: ['1966', '1970', '1990', '2002'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección inglesa?', options: ['Bleus', 'Three Lions', 'Reds', 'Leones'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Azul', 'Verde', 'Blanco', 'Rojo'], answer: 2 },
],

CROACIA: [
			{ q: '¿Cómo se le conoce a la selección de Croacia?', options: ['Vatreni', 'Leones', 'Reds', 'Bleus'], answer: 0 },
			{ q: '¿En qué posición terminó Croacia en el Mundial 2018?', options: ['3°', '2°', '1°', '4°'], answer: 1 },
			{ q: '¿A qué confederación pertenece?', options: ['CAF', 'AFC', 'UEFA', 'CONCACAF'], answer: 2 },
],

PANAMA: [
			{ q: '¿A qué confederación pertenece Panamá?', options: ['CONCACAF', 'UEFA', 'AFC', 'CAF'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección de Panamá?', options: ['Leones', 'Canaleros', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿En qué año jugó su primer Mundial?', options: ['2014', '2010', '2018', '2022'], answer: 2 },
],

GHANA: [
			{ q: '¿Cómo se le conoce a la selección de Ghana?', options: ['Black Stars', 'Leones', 'Águilas', 'Tigres'], answer: 0 },
			{ q: '¿A qué confederación pertenece Ghana?', options: ['UEFA', 'CAF', 'AFC', 'CONCACAF'], answer: 1 },
			{ q: '¿En qué Mundial llegó a cuartos de final sorprendiendo al mundo?', options: ['2014', '2006', '2010', '2018'], answer: 2 },
],
	};

	window.triviaOverrides = { byIndex, byToken };

	// Notifica al core (si ya cargó) para que aplique los overrides al instante.
	try {
		window.dispatchEvent(new CustomEvent('trivia-overrides-updated', {
			detail: { source: 'trivia-bank.js', tokens: Object.keys(byToken).length }
		}));
	} catch (e) {}
})();
