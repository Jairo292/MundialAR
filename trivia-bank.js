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
				{ q: '¿En qué año ganó México su primer Copa Oro?', options: ['1998', '1993', '2003', '1989'], answer: 1 },
				{ q: '¿Quién es el portero con más participaciones en Mundiales por México?', options: ['Jesús Corona', 'Óscar Pérez', 'Guillermo Ochoa', 'Alfredo Talavera'], answer: 2 },
				{ q: '¿Contra qué selección logró México la victoria en la final de los Juegos Olímpicos 2012?', options: ['Argentina', 'España', 'Alemania', 'Brasil'], answer: 3 },
				{ q: '¿En qué estadio juega habitualmente la selección mexicana como local?', options: ['Estadio Azteca', 'Estadio Olímpico Universitario', 'Estadio BBVA', 'Estadio Akron'], answer: 0 },
				{ q: '¿Quién es el máximo goleador histórico de la Selección Mexicana?', options: ['Hugo Sánchez', 'Cuauhtémoc Blanco', "Javier 'Chicharito' Hernández", 'Luis Hernández'], answer: 2 },
	],
		COREADELSUR: [
				{ q: '¿En qué mundial alcanzó Corea del Sur las semifinales?', options: ['1998', '2002', '2010', '2018'], answer: 1 },
				{ q: '¿Quién es la mayor estrella actual de Corea del Sur y figura en la Premier League?', options: ['Ji-Sung Park', 'Lee Kang-in', 'Son Heung-min', 'Hwang Hee-chan'], answer: 2 },
				{ q: '¿Qué selección eliminó Corea del Sur en 2018 sorprendiendo al mundo?', options: ['Argentina', 'Brasil', 'España', 'Alemania'], answer: 3 },
				{ q: '¿Cómo se les apoda comúnmente a los jugadores de esta selección?', options: ['Taeguk Warriors', "Los Guerreros Taeguk", 'Blue Dragons', 'Korean Lions'], answer: 1 },
				{ q: '¿En qué ciudad surcoreana se jugó la apertura del Mundial 2002?', options: ['Busan', 'Daegu', 'Seúl', 'Incheon'], answer: 2 },
	],

SUDAFRICA: [
				{ q: '¿Cómo se le conoce popularmente a la selección de Sudáfrica?', options: ['The Bafana', 'Bafana Bafana', 'The Springboks', 'South Stars'], answer: 1 },
				{ q: '¿En qué año fue anfitrión del Mundial Sudáfrica?', options: ['2014', '2010', '2006', '2018'], answer: 1 },
				{ q: '¿Qué instrumento de viento se hizo famoso mundialmente en su torneo?', options: ['Corneta', 'Vuvuzela', 'Saxofón', 'Trompeta'], answer: 1 },
				{ q: '¿Quién marcó el primer gol del Mundial 2010 en el partido inaugural contra México?', options: ['Siphiwe Tshabalala', 'Bongani Khumalo', 'Benni McCarthy', 'Steven Pienaar'], answer: 0 },
				{ q: '¿Cuál es el color principal de la camiseta de los Bafana Bafana?', options: ['Verde', 'Amarillo', 'Azul', 'Rojo'], answer: 1 },
	],

CANADA: [
				{ q: '¿A qué confederación pertenece la selección de Canadá?', options: ['UEFA', 'CONMEBOL', 'CONCACAF', 'AFC'], answer: 2 },
				{ q: '¿Quién es considerado el jugador canadiense más valioso en la actualidad?', options: ['Cyle Larin', 'Atiba Hutchinson', 'Alphonso Davies', 'Jonathan David'], answer: 2 },
				{ q: '¿En qué año volvió Canadá a un Mundial (Qatar) tras su única participación previa en 1986?', options: ['2018', '2022', '2014', '2010'], answer: 1 },
				{ q: '¿Cómo se le conoce al equipo nacional de Canadá?', options: ['Les Rouges', 'The Red Maple', 'The Canucks', 'White and Red'], answer: 2 },
				{ q: '¿Qué país compartirá la sede del Mundial 2026 junto a Canadá y México?', options: ['Brasil', 'Estados Unidos', 'Argentina', 'España'], answer: 1 },
	],

SUIZA: [
				{ q: '¿A qué confederación pertenece Suiza?', options: ['AFC', 'CONMEBOL', 'UEFA', 'CAF'], answer: 2 },
				{ q: '¿Qué jugador es el capitán y líder del mediocampo suizo recientemente?', options: ['Xherdan Shaqiri', 'Granit Xhaka', 'Haris Seferovic', 'Breel Embolo'], answer: 1 },
				{ q: '¿A qué selección (entonces campeona del mundo) eliminó Suiza en la Euro 2020?', options: ['Alemania', 'España', 'Francia', 'Italia'], answer: 2 },
				{ q: '¿Cuál es el mejor resultado histórico de Suiza en un Mundial (alcanzado en 1934, 1938 y 1954)?', options: ['Semifinales', 'Octavos', 'Cuartos de final', 'Final'], answer: 2 },
				{ q: '¿Qué portero suizo es famoso por su gran actuación en penaltis y paradas clave?', options: ['Yann Sommer', 'Diego Benaglio', 'Roman Bürki', 'Jörg Stiel'], answer: 0 },
	],

QATAR: [
				{ q: '¿Qué torneo continental importante ganó Qatar por primera vez en 2019?', options: ['Copa América', 'Copa Asia', 'Eurocopa', 'CONCACAF Gold Cup'], answer: 1 },
				{ q: '¿En qué año organizó Qatar la primera Copa del Mundo en territorio árabe?', options: ['2018', '2022', '2014', '2010'], answer: 1 },
				{ q: '¿A qué selección derrotó Qatar en la final de la Copa Asia 2019?', options: ['Irán', 'Japón', 'Corea del Sur', 'Australia'], answer: 1 },
				{ q: '¿Quién fue el máximo goleador de Qatar en su exitosa Copa Asia 2019?', options: ['Hassan Al-Haydos', 'Almoez Ali', 'Sebastián Soria', 'Akram Afif'], answer: 1 },
				{ q: '¿Cuál es el color característico del uniforme de la selección qatarí?', options: ['Azul', 'Blanco', 'Granate', 'Verde'], answer: 2 },
	],

BRASIL: [
				{ q: '¿Cuántos Mundiales ha ganado la selección de Brasil hasta la fecha?', options: ['4', '5', '6', '3'], answer: 1 },
				{ q: '¿Quién es el único jugador en la historia en ganar 3 Copas del Mundo con Brasil?', options: ['Ronaldo', 'Pelé', 'Zico', 'Cafu'], answer: 1 },
				{ q: '¿Contra qué selección sufrió Brasil la histórica derrota por 7-1 en su propio mundial?', options: ['Argentina', 'Alemania', 'Francia', 'Uruguay'], answer: 1 },
				{ q: '¿A qué jugador se le conoce como "O Bruxo" por su magia con el balón?', options: ['Pelé', 'Ronaldinho', 'Neymar', 'Rivaldo'], answer: 1 },
				{ q: '¿Qué ciudad brasileña alberga el famoso Estadio Maracaná?', options: ['São Paulo', 'Río de Janeiro', 'Belo Horizonte', 'Brasília'], answer: 1 },
	],

MARRUECOS: [
				{ q: '¿Cómo se le conoce a la selección nacional de Marruecos?', options: ['Leones del Atlas', 'Los Magrebíes', 'Águilas', 'Tigres'], answer: 0 },
				{ q: '¿En qué mundial se convirtió en la primera selección africana en llegar a semifinales?', options: ['2018', '2014', '2022', '2010'], answer: 2 },
				{ q: '¿Qué selección europea eliminó Marruecos en la tanda de penaltis de octavos en 2022?', options: ['Croacia', 'España', 'Portugal', 'Francia'], answer: 1 },
				{ q: '¿En qué club europeo destaca actualmente el lateral marroquí Achraf Hakimi?', options: ['Real Madrid', 'PSG', 'Inter', 'Manchester City'], answer: 1 },
				{ q: '¿Quién es el entrenador que lideró a Marruecos a las semifinales de Qatar 2022?', options: ['Hervé Renard', 'Walid Regragui', 'Vahid Halilhodžić', 'Jorge Sampaoli'], answer: 1 },
	],
		ESCOCIA: [
				{ q: '¿Cómo se le conoce formalmente a la apasionada afición de Escocia?', options: ['The Kilties', 'Tartan Army', 'The Brave', 'Highland Fans'], answer: 1 },
				{ q: '¿Contra qué país jugó Escocia el primer partido internacional oficial de la historia en 1872?', options: ['Irlanda', 'Gales', 'Inglaterra', 'Escocia'], answer: 2 },
				{ q: '¿Cuál es el color principal que identifica a la selección escocesa?', options: ['Azul claro', 'Verde', 'Azul oscuro', 'Blanco'], answer: 2 },
				{ q: '¿En qué estadio nacional de Glasgow juega Escocia sus partidos como local?', options: ['Celtic Park', 'Hampden Park', 'Ibrox', 'Tynecastle'], answer: 1 },
				{ q: '¿Qué lateral izquierdo del Liverpool es una de las figuras actuales de Escocia?', options: ['Kieran Tierney', 'Andy Robertson', 'Ryan Fraser', 'Scott McTominay'], answer: 1 },
	],

HAITI: [
				{ q: '¿A qué confederación pertenece Haití?', options: ['UEFA', 'CONCACAF', 'CAF', 'AFC'], answer: 1 },
				{ q: '¿Cómo se le conoce popularmente a la selección de Haití?', options: ['Les Grenadiers', 'Leones', 'The Haitians', 'Los Grenadiers'], answer: 0 },
				{ q: '¿Cuál es uno de los colores principales de su uniforme de local?', options: ['Blanco', 'Amarillo', 'Azul', 'Rojo'], answer: 2 },
				{ q: '¿En qué año participó Haití por única vez en una Copa del Mundo?', options: ['1974', '1986', '1990', '1966'], answer: 0 },
				{ q: '¿Qué torneo continental ganó Haití en 1973?', options: ['Copa Caribe', 'Copa de Naciones', 'Campeonato de Naciones de la CONCACAF', 'Copa Oro'], answer: 2 },
	],

ESTADOSUNIDOS: [
				{ q: '¿Cómo se abrevia comúnmente a la selección masculina de EE.UU.?', options: ['USA', 'USMNT', 'USSF', 'USAT'], answer: 1 },
				{ q: '¿Cuál es el mejor resultado de EE.UU. en la historia de los Mundiales (obtenido en 1930)?', options: ['Subcampeón', 'Cuarto lugar', 'Tercer lugar', 'Campeón'], answer: 2 },
				{ q: '¿A qué confederación pertenece Estados Unidos?', options: ['UEFA', 'CONMEBOL', 'CONCACAF', 'AFC'], answer: 2 },
				{ q: '¿Qué jugador es conocido como "Captain America" y juega en el AC Milan?', options: ['Landon Donovan', 'Clint Dempsey', 'Christian Pulisic', 'Tim Howard'], answer: 2 },
				{ q: '¿Cuál es uno de los colores icónicos de su uniforme basado en su bandera?', options: ['Azul', 'Rojo', 'Blanco', 'Negro'], answer: 2 },
	],

AUSTRALIA: [
				{ q: '¿Cómo se le conoce a la selección de Australia?', options: ['Socceroos', 'Kangaroos', 'Aussie Stars', 'Green and Gold'], answer: 0 },
				{ q: '¿A qué confederación pertenece actualmente (desde 2006)?', options: ['UEFA', 'AFC', 'CONMEBOL', 'OFC'], answer: 1 },
				{ q: '¿Cuál es el color principal que destaca en su uniforme?', options: ['Rojo', 'Amarillo', 'Azul', 'Blanco'], answer: 1 },
				{ q: '¿Quién es el máximo goleador histórico de los Socceroos?', options: ['Mark Viduka', 'Harry Kewell', 'Tim Cahill', 'Brett Emerton'], answer: 2 },
				{ q: '¿A qué confederación pertenecía Australia antes de unirse a Asia?', options: ['CONCACAF', 'UEFA', 'OFC', 'AFC'], answer: 2 },
	],

PARAGUAY: [
				{ q: '¿Cómo se le conoce a la selección de Paraguay?', options: ['Albirroja', 'La Celeste', 'La Roja', 'Los Guaraníes'], answer: 0 },
				{ q: '¿A qué confederación pertenece Paraguay?', options: ['CONCACAF', 'UEFA', 'CONMEBOL', 'AFC'], answer: 2 },
				{ q: '¿Qué colores predominan en las rayas verticales de su uniforme titular?', options: ['Azul y blanco', 'Rojo y blanco', 'Rojo y negro', 'Verde y blanco'], answer: 1 },
				{ q: '¿Quién es el histórico portero paraguayo famoso por anotar goles de tiro libre y penalti?', options: ['José Luis Chilavert', 'Justo Villar', 'Julio César', 'Emiliano Martínez'], answer: 0 },
				{ q: '¿Cuál fue la última edición de un Mundial donde Paraguay llegó a Cuartos de Final?', options: ['Sudáfrica 2010', 'Brasil 2014', 'Alemania 2006', 'Rusia 2018'], answer: 0 },
	],

ALEMANIA: [
				{ q: '¿Cuántos Mundiales ha ganado Alemania en su historia?', options: ['3', '4', '5', '2'], answer: 1 },
				{ q: '¿Cómo se le conoce popularmente a la selección alemana?', options: ['Die Mannschaft', 'Los Bávaros', 'Leones', 'Los Negros'], answer: 0 },
				{ q: '¿Contra qué selección ganó Alemania la final del Mundial 2014 en el Maracaná?', options: ['Brasil', 'Argentina', 'España', 'Italia'], answer: 1 },
				{ q: '¿Quién es el máximo goleador en la historia de las Copas del Mundo (alemán)?', options: ['Gerd Müller', 'Miroslav Klose', 'Jürgen Klinsmann', 'Thomas Müller'], answer: 1 },
				{ q: '¿Qué color suele usar Alemania en su segundo uniforme clásico, además del negro o rojo?', options: ['Blanco', 'Verde', 'Azul', 'Amarillo'], answer: 1 },
	],

ECUADOR: [
				{ q: '¿A qué confederación pertenece Ecuador?', options: ['CONMEBOL', 'UEFA', 'AFC', 'CAF'], answer: 0 },
				{ q: '¿Cómo se le conoce a la selección de Ecuador?', options: ['La Tri', 'Los Amarillos', 'La Sele', 'Los Tricolores'], answer: 0 },
				{ q: '¿Cuál es el color principal de la camiseta de Ecuador?', options: ['Azul', 'Rojo', 'Amarillo', 'Verde'], answer: 2 },
				{ q: '¿Quién es el máximo goleador histórico de la selección ecuatoriana?', options: ['Felipe Caicedo', 'Enner Valencia', 'Ángel Mena', 'Antonio Valencia'], answer: 1 },
				{ q: '¿En qué Mundial logró Ecuador su primera clasificación a Octavos de Final?', options: ['Alemania 2006', 'Sudáfrica 2010', 'Brasil 2014', 'Rusia 2018'], answer: 0 },
	],
		COSTADEMARFIL: [
				{ q: '¿Cómo se le conoce a la selección de Costa de Marfil?', options: ['Los Elefantes', 'Los Leones', 'Los Tigres', 'Los Elefants'], answer: 0 },
				{ q: '¿Qué jugador es considerado el máximo ídolo histórico y goleador de esta selección?', options: ['Yaya Touré', 'Didier Drogba', 'Gervinho', 'Salomon Kalou'], answer: 1 },
				{ q: '¿Qué torneo continental ganó Costa de Marfil en 2015 y 2023?', options: ['Copa de Naciones', 'Copa Africana de Naciones', 'Copa del Golfo', 'Copa de la Francofonía'], answer: 1 },
				{ q: '¿En qué posición del campo jugaba la leyenda marfileña Yaya Touré?', options: ['Delantero', 'Defensa', 'Mediocampista', 'Portero'], answer: 2 },
				{ q: '¿Cuál es el color principal de su uniforme?', options: ['Azul', 'Naranja', 'Blanco', 'Verde'], answer: 1 },
	],

CURAZAO: [
				{ q: '¿A qué confederación pertenece Curazao?', options: ['CONCACAF', 'UEFA', 'CAF', 'AFC'], answer: 0 },
				{ q: '¿De qué país europeo depende políticamente Curazao?', options: ['Francia', 'España', 'Países Bajos', 'Portugal'], answer: 2 },
				{ q: '¿Qué color predomina en su uniforme y bandera?', options: ['Azul', 'Rojo', 'Verde', 'Amarillo'], answer: 0 },
				{ q: '¿Cómo se llamaba anteriormente esta selección antes de la disolución de las Antillas Neerlandesas?', options: ['Antillas Neerlandesas', 'Gran Antillas', 'Islas del Caribe', 'Países Bajos Antillas'], answer: 0 },
				{ q: '¿Cuál es el apodo de la selección de Curazao?', options: ['La Familia Azul', 'Los Elefantes', 'Los Canarios', 'Los Oranje'], answer: 0 },
	],

HOLANDA: [
				{ q: '¿Cuál es el color característico e histórico de Países Bajos?', options: ['Naranja', 'Rojo', 'Azul', 'Verde'], answer: 0 },
				{ q: '¿Cómo se le conoce a la selección debido a su estilo de juego histórico?', options: ['La Naranja Mecánica', 'Les Bleus', 'Los Tulipanes', 'Los Leones'], answer: 0 },
				{ q: '¿En qué año llegó a la final del Mundial contra España?', options: ['2014', '2006', '2010', '1998'], answer: 2 },
				{ q: '¿Quién es el máximo goleador histórico de los Países Bajos?', options: ['Ruud van Nistelrooy', 'Robin van Persie', 'Klaas-Jan Huntelaar', 'Dennis Bergkamp'], answer: 1 },
				{ q: '¿Cuántas finales de Copas del Mundo ha jugado Países Bajos (sin haber ganado ninguna)?', options: ['1', '2', '3', '4'], answer: 2 },
	],

JAPON: [
				{ q: '¿Cómo se le conoce a la selección de Japón?', options: ['Blue Samurai', 'Samurai Blue', 'Nippon Warriors', 'Rising Sun'], answer: 1 },
				{ q: '¿A qué confederación pertenece Japón?', options: ['UEFA', 'AFC', 'CONMEBOL', 'CAF'], answer: 1 },
				{ q: '¿A qué selección campeona del mundo venció Japón en el Mundial 2022 (además de España)?', options: ['Brasil', 'Argentina', 'Alemania', 'Francia'], answer: 2 },
				{ q: '¿Quién es la actual estrella japonesa que brilla en la Real Sociedad?', options: ['Takumi Minamino', 'Takefusa Kubo', 'Junya Ito', 'Ritsu Doan'], answer: 1 },
				{ q: '¿Cuál es el símbolo o animal que aparece en el escudo de la selección japonesa?', options: ['Un cuervo', 'Un tigre', 'Un dragón', 'Un león'], answer: 0 },
	],

TUNEZ: [
			{ q: '¿A qué confederación pertenece Túnez?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Águilas de Cartago', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿Cuál es su color principal?', options: ['Azul', 'Verde', 'Rojo', 'Blanco'], answer: 2 },
			{ q: '¿Contra qué selección europea logró Túnez una victoria histórica en el Mundial 2022?', options: ['Inglaterra', 'Francia', 'España', 'Portugal'], answer: 1 },
			{ q: '¿En qué año logró Túnez su primera victoria en un Mundial (siendo la primera de un equipo africano)?', options: ['1974', '1982', '1986', '1978'], answer: 3 },
	],

BELGICA: [
			{ q: '¿Cómo se le conoce a la selección de Bélgica?', options: ['Diablos Rojos', 'Leones', 'Bleus', 'Reds'], answer: 0 },
			{ q: '¿Qué generación famosa tuvo Bélgica recientemente?', options: ['Generación Roja', 'Generación Dorada', 'Nueva Era', 'Equipo Elite'], answer: 1 },
			{ q: '¿En qué puesto quedó Bélgica en el Mundial 2018?', options: ['1°', '2°', '3°', '4°'], answer: 2 },
			{ q: '¿Quién es el máximo goleador histórico de la selección belga?', options: ['Eden Hazard', 'Kevin De Bruyne', 'Dries Mertens', 'Romelu Lukaku'], answer: 3 },
			{ q: '¿Qué portero belga ganó el Guante de Oro en el Mundial 2018?', options: ['Thibaut Courtois', 'Simon Mignolet', 'Casteels', 'Preud\'homme'], answer: 0 },
	],

IRAN: [
			{ q: '¿Cómo se le conoce a la selección de Irán?', options: ['Team Melli', 'Leones', 'Reds', 'Dragones'], answer: 0 },
			{ q: '¿A qué confederación pertenece Irán?', options: ['UEFA', 'AFC', 'CAF', 'CONCACAF'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Azul', 'Negro', 'Blanco', 'Verde'], answer: 2 },
			{ q: '¿Qué animal aparece en la camiseta de Irán como símbolo de conservación?', options: ['Tigre', 'Águila', 'Oso', 'Guepardo'], answer: 3 },
			{ q: '¿Quién es el histórico delantero iraní que ostentó por años el récord de máximo goleador de selecciones?', options: ['Ali Daei', 'Sardar Azmoun', 'Mehdi Taremi', 'Ali Karimi'], answer: 0 },
	],

EGIPTO: [
			{ q: '¿Cómo se le conoce a la selección de Egipto?', options: ['Faraones', 'Leones', 'Águilas', 'Tigres'], answer: 0 },
			{ q: '¿Qué jugador es su máxima estrella reciente?', options: ['Zidan', 'Mohamed Salah', 'Elneny', 'Trezeguet'], answer: 1 },
			{ q: '¿A qué confederación pertenece Egipto?', options: ['UEFA', 'AFC', 'CAF', 'CONMEBOL'], answer: 2 },
			{ q: '¿Qué selección tiene el récord de más títulos de la Copa Africana de Naciones?', options: ['Camerún', 'Senegal', 'Nigeria', 'Egipto'], answer: 3 },
			{ q: '¿En qué país juega actualmente Mohamed Salah?', options: ['Inglaterra', 'España', 'Italia', 'Alemania'], answer: 0 },
	],

NUEVAZELANDA: [
			{ q: '¿Cómo se le conoce a la selección de Nueva Zelanda?', options: ['All Whites', 'All Blacks', 'Leones', 'Reds'], answer: 0 },
			{ q: '¿A qué confederación pertenece?', options: ['UEFA', 'OFC', 'AFC', 'CAF'], answer: 1 },
			{ q: '¿Cuál es su color principal?', options: ['Rojo', 'Azul', 'Blanco', 'Verde'], answer: 2 },
			{ q: '¿Qué país fue el único invicto en el Mundial de Sudáfrica 2010?', options: ['España', 'Brasil', 'Países Bajos', 'Nueva Zelanda'], answer: 3 },
			{ q: '¿Cuál es el apodo de la selección nacional de rugby de este país (a menudo confundido)?', options: ['All Blacks', 'Tall Blacks', 'Kiwi XI', 'Silver Ferns'], answer: 0 },
	],
		ESPANA: [
			{ q: '¿En qué año ganó España su primer Mundial?', options: ['2010', '2014', '2006', '1998'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección española?', options: ['Bleus', 'La Roja', 'Leones', 'Reds'], answer: 1 },
			{ q: '¿Qué jugador fue clave en la final del Mundial 2010?', options: ['Xavi', 'Torres', 'Iniesta', 'Ramos'], answer: 2 },
			{ q: '¿Qué torneo internacional ganó España consecutivamente en 2008 y 2012?', options: ['Mundial', 'Copa Confederaciones', 'Nations League', 'Eurocopa'], answer: 3 },
			{ q: '¿Quién era el seleccionador de España durante el Mundial de Sudáfrica?', options: ['Vicente del Bosque', 'Luis Aragonés', 'Luis Enrique', 'Julen Lopetegui'], answer: 0 },
	],

URUGUAY: [
			{ q: '¿Cuántos Mundiales ha ganado Uruguay?', options: ['2', '1', '3', '4'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección uruguaya?', options: ['Reds', 'La Celeste', 'Bleus', 'Leones'], answer: 1 },
			{ q: '¿En qué año ganó su último Mundial?', options: ['1954', '1962', '1950', '1970'], answer: 2 },
			{ q: '¿Cómo se llama el estadio donde Uruguay ganó el primer Mundial de la historia?', options: ['Maracaná', 'Wembley', 'Monumental', 'Estadio Centenario'], answer: 3 },
			{ q: '¿Quién es el máximo goleador histórico de la selección uruguaya?', options: ['Luis Suárez', 'Edinson Cavani', 'Diego Forlán', 'Enzo Francescoli'], answer: 0 },
	],

ARABIASAUDITA: [
			{ q: '¿A qué confederación pertenece Arabia Saudita?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: '¿Qué color predomina en su uniforme?', options: ['Rojo', 'Verde', 'Azul', 'Blanco'], answer: 1 },
			{ q: '¿A qué selección sorprendió Arabia Saudita en el Mundial 2022?', options: ['Brasil', 'Francia', 'Argentina', 'España'], answer: 2 },
			{ q: '¿Cuál es el apodo de la selección de Arabia Saudita?', options: ['Halcones Verdes', 'Leones del Desierto', 'Escarabajos', 'Águilas'], answer: 0 },
			{ q: '¿En qué país se llevará a cabo el Mundial 2034, siendo este el único postulante?', options: ['Qatar', 'Egipto', 'Arabia Saudita', 'China'], answer: 2 },
	],

CABOVERDE: [
			{ q: '¿A qué confederación pertenece Cabo Verde?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Tiburones Azules', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Rojo', 'Verde', 'Azul', 'Amarillo'], answer: 2 },
			{ q: '¿Qué idioma oficial se habla en Cabo Verde?', options: ['Francés', 'Inglés', 'Español', 'Portugués'], answer: 3 },
			{ q: '¿En qué continente se encuentra geográficamente Cabo Verde?', options: ['África', 'Europa', 'Oceanía', 'América'], answer: 0 },
	],

FRANCIA: [
			{ q: '¿Cuántos Mundiales ha ganado Francia?', options: ['2', '1', '3', '4'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección francesa?', options: ['Reds', 'Les Bleus', 'Leones', 'Águilas'], answer: 1 },
			{ q: '¿Qué jugador fue clave en el Mundial 2018?', options: ['Griezmann', 'Giroud', 'Mbappé', 'Pogba'], answer: 2 },
			{ q: '¿Quién era el capitán de Francia cuando ganaron el Mundial 1998?', options: ['Zidane', 'Henry', 'Petit', 'Didier Deschamps'], answer: 3 },
			{ q: '¿Qué animal aparece en el escudo de la Federación Francesa de Fútbol?', options: ['Gallo', 'León', 'Águila', 'Tigre'], answer: 0 },
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
			{ q: '¿En qué club de la Premier League juega su capitán Martin Ødegaard?', options: ['Manchester City', 'Liverpool', 'Chelsea', 'Arsenal'], answer: 3 },
			{ q: '¿Cuál es el estadio nacional donde Noruega juega de local en Oslo?', options: ['Ullevaal Stadion', 'Lerkendal', 'Viking Stadion', 'Bislett'], answer: 0 },
],

ARGENTINA: [
			{ q: '¿Cuántos Mundiales ha ganado Argentina?', options: ['3', '2', '4', '1'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección argentina?', options: ['Reds', 'Albiceleste', 'Leones', 'Bleus'], answer: 1 },
			{ q: '¿Contra qué selección ganó la final del Mundial 2022?', options: ['Brasil', 'Alemania', 'Francia', 'Croacia'], answer: 2 },
			{ q: '¿Quién es el máximo goleador histórico de la selección argentina?', options: ['Maradona', 'Batistuta', 'Agüero', 'Lionel Messi'], answer: 3 },
			{ q: '¿En qué año ganó Argentina su primer Mundial siendo anfitrión?', options: ['1978', '1986', '1930', '1990'], answer: 0 },
],

AUSTRIA: [
			{ q: '¿A qué confederación pertenece Austria?', options: ['UEFA', 'CAF', 'AFC', 'CONMEBOL'], answer: 0 },
			{ q: '¿Cuál es su color principal?', options: ['Azul', 'Rojo', 'Verde', 'Blanco'], answer: 1 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Reds', 'Das Team', 'Dragones'], answer: 2 },
			{ q: '¿Qué jugador polivalente ha sido la figura de Austria y jugó en el Real Madrid?', options: ['Arnautovic', 'Sabitzer', 'Laimer', 'David Alaba'], answer: 3 },
			{ q: '¿Con qué país organizó Austria la Eurocopa 2008?', options: ['Suiza', 'Alemania', 'Hungría', 'Eslovaquia'], answer: 0 },
],

ARGELIA: [
			{ q: '¿A qué confederación pertenece Argelia?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿Cuál es su color principal?', options: ['Rojo', 'Verde', 'Azul', 'Blanco'], answer: 1 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Reds', 'Zorros del Desierto', 'Dragones'], answer: 2 },
			{ q: '¿Qué jugador argelino destacó en el Manchester City y ganó múltiples Premier League?', options: ['Brahimi', 'Slimani', 'Bennacer', 'Riyad Mahrez'], answer: 3 },
			{ q: '¿En qué año ganó Argelia su última Copa Africana de Naciones?', options: ['2019', '2021', '2015', '2010'], answer: 0 },
],
		JORDANIA: [
			{ q: '¿A qué confederación pertenece Jordania?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección de Jordania?', options: ['Leones', 'Nashama', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Azul', 'Verde', 'Rojo', 'Blanco'], answer: 2 },
			{ q: '¿A qué importante final continental llegó Jordania por primera vez en 2024?', options: ['Mundial', 'Copa Árabe', 'Copa Oro', 'Copa Asia'], answer: 3 },
			{ q: '¿Cuál es la capital del país donde juega habitualmente la selección?', options: ['Amán', 'Doha', 'Dubái', 'Riad'], answer: 0 },
],

PORTUGAL: [
			{ q: '¿Qué torneo ganó Portugal en 2016?', options: ['Eurocopa', 'Mundial', 'Copa América', 'Nations League'], answer: 0 },
			{ q: '¿Quién es su máxima estrella histórica?', options: ['Figo', 'Cristiano Ronaldo', 'Deco', 'Pepe'], answer: 1 },
			{ q: '¿A qué selección venció en la final de la Euro 2016?', options: ['España', 'Alemania', 'Francia', 'Italia'], answer: 2 },
			{ q: '¿Qué apodo recibe la selección de Portugal?', options: ['Os Navegadores', 'Les Bleus', 'Die Mannschaft', 'A Seleção'], answer: 3 },
			{ q: '¿En qué club portugués debutó profesionalmente Cristiano Ronaldo?', options: ['Sporting CP', 'Benfica', 'Porto', 'Braga'], answer: 0 },
],

COLOMBIA: [
			{ q: '¿Cómo se le conoce a la selección de Colombia?', options: ['Cafeteros', 'Leones', 'Reds', 'Bleus'], answer: 0 },
			{ q: '¿Qué jugador brilló en el Mundial 2014?', options: ['Falcao', 'James Rodríguez', 'Cuadrado', 'Ospina'], answer: 1 },
			{ q: '¿A qué confederación pertenece Colombia?', options: ['UEFA', 'CAF', 'CONMEBOL', 'AFC'], answer: 2 },
			{ q: '¿Qué torneo continental ganó Colombia como anfitrión en 2001?', options: ['Mundial', 'Copa Oro', 'Nations League', 'Copa América'], answer: 3 },
			{ q: '¿Quién es conocido como "El Tigre" en la selección colombiana?', options: ['Radamel Falcao', 'Luis Díaz', 'Valderrama', 'Asprilla'], answer: 0 },
],

UZBEKISTAN: [
			{ q: '¿A qué confederación pertenece Uzbekistán?', options: ['AFC', 'UEFA', 'CAF', 'CONCACAF'], answer: 0 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Rojo', 'Blanco', 'Azul', 'Verde'], answer: 1 },
			{ q: '¿Cómo se le conoce a la selección?', options: ['Leones', 'Reds', 'Lobos Blancos', 'Dragones'], answer: 2 },
			{ q: '¿De qué bloque de países formaba parte Uzbekistán antes de su independencia?', options: ['Imperio Británico', 'Yugoslavia', 'Eje', 'Unión Soviética'], answer: 3 },
			{ q: '¿En qué continente compite futbolísticamente Uzbekistán?', options: ['Asia', 'Europa', 'África', 'Oceanía'], answer: 0 },
],

INGLATERRA: [
			{ q: '¿En qué año ganó Inglaterra su único Mundial?', options: ['1966', '1970', '1990', '2002'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección inglesa?', options: ['Bleus', 'Three Lions', 'Reds', 'Leones'], answer: 1 },
			{ q: '¿Cuál es uno de sus colores principales?', options: ['Azul', 'Verde', 'Blanco', 'Rojo'], answer: 2 },
			{ q: '¿Cómo se llama el mítico estadio donde Inglaterra juega sus partidos de local?', options: ['Old Trafford', 'Anfield', 'Etihad', 'Wembley'], answer: 3 },
			{ q: '¿Quién es el actual capitán y máximo goleador histórico de Inglaterra?', options: ['Harry Kane', 'Wayne Rooney', 'Steven Gerrard', 'David Beckham'], answer: 0 },
],

		CROACIA: [
			{ q: '¿Cómo se le conoce a la selección de Croacia?', options: ['Vatreni', 'Leones', 'Reds', 'Bleus'], answer: 0 },
			{ q: '¿En qué posición terminó Croacia en el Mundial 2018?', options: ['3°', '2°', '1°', '4°'], answer: 1 },
			{ q: '¿A qué confederación pertenece?', options: ['CAF', 'AFC', 'UEFA', 'CONCACAF'], answer: 2 },
			{ q: '¿Quién es el capitán y ganador del Balón de Oro 2018 de Croacia?', options: ['Rakitic', 'Perisic', 'Kovacic', 'Luka Modrić'], answer: 3 },
			{ q: '¿Cuál es el patrón característico de la camiseta de Croacia?', options: ['Cuadros rojos y blancos', 'Rayas verticales', 'Puntos azules', 'Liso'], answer: 0 },
	],

		PANAMA: [
			{ q: '¿A qué confederación pertenece Panamá?', options: ['CONCACAF', 'UEFA', 'AFC', 'CAF'], answer: 0 },
			{ q: '¿Cómo se le conoce a la selección de Panamá?', options: ['Leones', 'Canaleros', 'Reds', 'Dragones'], answer: 1 },
			{ q: '¿En qué año jugó su primer Mundial?', options: ['2014', '2010', '2018', '2022'], answer: 2 },
			{ q: '¿Quién anotó el primer gol de Panamá en la historia de los Mundiales?', options: ['Blas Pérez', 'Luis Tejada', 'Gaby Torres', 'Felipe Baloy'], answer: 3 },
			{ q: '¿Cuál es el color principal de su uniforme de local?', options: ['Rojo', 'Azul', 'Blanco', 'Amarillo'], answer: 0 },
	],

		GHANA: [
			{ q: '¿Cómo se le conoce a la selección de Ghana?', options: ['Black Stars', 'Leones', 'Águilas', 'Tigres'], answer: 0 },
			{ q: '¿A qué confederación pertenece Ghana?', options: ['UEFA', 'CAF', 'AFC', 'CONCACAF'], answer: 1 },
			{ q: '¿En qué Mundial llegó a cuartos de final sorprendiendo al mundo?', options: ['2014', '2006', '2010', '2018'], answer: 2 },
			{ q: '¿A qué selección eliminó Ghana en los octavos de final de Sudáfrica 2010?', options: ['Inglaterra', 'México', 'Estados Unidos', 'Uruguay'], answer: 3 },
			{ q: '¿Quién es el máximo goleador histórico de las "Estrellas Negras"?', options: ['Asamoah Gyan', 'Abédi Pelé', 'Jordan Ayew', 'Thomas Partey'], answer: 0 },
	],

		CONGO: [
			{ q: '¿A qué confederación pertenece Congo?', options: ['CAF', 'UEFA', 'AFC', 'CONMEBOL'], answer: 0 },
			{ q: '¿En qué continente se encuentra Congo?', options: ['Asia', 'África', 'Europa', 'América'], answer: 1 },
			{ q: '¿Cuál es el color predominante en su bandera?', options: ['Rojo', 'Verde', 'Azul', 'Negro'], answer: 1 },
			{ q: '¿Cuál es el apodo de la selección de la República del Congo?', options: ['Los Diablos Rojos', 'Los Leopardos', 'Los Elefantes', 'Las Águilas'], answer: 0 },
			{ q: '¿Qué país fronterizo tiene una selección apodada "Los Leopardos" (RDC)?', options: ['Gabón', 'Camerún', 'Rep. Dem. del Congo', 'Angola'], answer: 2 },
	],

		TURQUIA: [
			{ q: '¿A qué confederación pertenece Turquía?', options: ['UEFA', 'AFC', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: '¿En qué torneo destacó Turquía obteniendo el 3er lugar en 2002?', options: ['Eurocopa', 'Copa América', 'Mundial', 'Copa Africana'], answer: 2 },
			{ q: '¿Qué símbolo aparece en su bandera y escudo?', options: ['Estrella y luna', 'Cruz', 'Sol', 'Águila'], answer: 0 },
			{ q: '¿En qué ciudad se encuentra el famoso estadio Ali Sami Yen?', options: ['Ankara', 'Estambul', 'Bursa', 'Antalya'], answer: 1 },
			{ q: '¿Quién es el máximo goleador histórico de la selección turca?', options: ['Arda Turan', 'Burak Yilmaz', 'Hakan Şükür', 'Emre Belözoğlu'], answer: 2 },
	],

		SUECIA: [
			{ q: '¿A qué confederación pertenece Suecia?', options: ['UEFA', 'CAF', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿Qué jugador famoso es el máximo goleador de Suecia?', options: ['Haaland', 'Ibrahimović', 'Modrić', 'Lewandowski'], answer: 1 },
			{ q: '¿Cuál es el color principal de su uniforme?', options: ['Rojo', 'Azul y amarillo', 'Verde', 'Negro'], answer: 1 },
			{ q: '¿En qué año fue Suecia anfitrión de la final del Mundial (perdiendo ante Brasil)?', options: ['1950', '1966', '1958', '1994'], answer: 2 },
			{ q: '¿Cuál es el apodo de la selección sueca?', options: ['Blågult', 'Reds', 'The Vikings', 'Oranje'], answer: 0 },
	],

		IRAK: [
			{ q: '¿A qué confederación pertenece Irak?', options: ['AFC', 'CAF', 'UEFA', 'CONMEBOL'], answer: 0 },
			{ q: '¿En qué continente se encuentra Irak?', options: ['Europa', 'África', 'Asia', 'Oceanía'], answer: 2 },
			{ q: '¿Qué logró Irak en 2007?', options: ['Ganó la Copa Asiática', 'Clasificó al Mundial', 'Ganó la Euro', 'Nada'], answer: 0 },
			{ q: '¿Cuál es el apodo de la selección de Irak?', options: ['Los Jaguares', 'Los Leones de Mesopotamia', 'Los Halcones', 'Los Guerreros'], answer: 1 },
			{ q: '¿Cuál es el color principal de su uniforme titular?', options: ['Verde', 'Rojo', 'Blanco', 'Negro'], answer: 2 },
	],

		BOSNIAYHERZEGOVINA: [
			{ q: '¿A qué confederación pertenece Bosnia y Herzegovina?', options: ['UEFA', 'CAF', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: '¿En qué continente se encuentra?', options: ['Asia', 'Europa', 'África', 'América'], answer: 1 },
			{ q: '¿En qué año debutó en un Mundial?', options: ['2014', '2018', '2010', '2006'], answer: 0 },
			{ q: '¿Quién es el máximo goleador y referente histórico de Bosnia?', options: ['Pjanic', 'Misimovic', 'Ibisevic', 'Edin Džeko'], answer: 3 },
			{ q: '¿De qué país formaba parte Bosnia antes de su independencia en los 90?', options: ['Yugoslavia', 'Unión Soviética', 'Checoslovaquia', 'Imperio Otomano'], answer: 0 },
	],

		REPUBLICACHECA: [
			{ q: '¿A qué confederación pertenece República Checa?', options: ['UEFA', 'CAF', 'AFC', 'CONMEBOL'], answer: 0 },
			{ q: '¿Qué torneo ganó como Checoslovaquia en 1976?', options: ['Mundial', 'Eurocopa', 'Copa América', 'Ninguno'], answer: 1 },
			{ q: '¿Qué color destaca en su uniforme principal?', options: ['Rojo', 'Verde', 'Amarillo', 'Negro'], answer: 0 },
			{ q: '¿Quién es el mítico portero checo famoso por usar un casco protector?', options: ['Rosicky', 'Petr Čech', 'Nedvěd', 'Koller'], answer: 1 },
			{ q: '¿Quién ganó el Balón de Oro en 2003 jugando para la Rep. Checa?', options: ['Milan Baros', 'Jan Koller', 'Patrik Schick', 'Pavel Nedvěd'], answer: 3 },
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
