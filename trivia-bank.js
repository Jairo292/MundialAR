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
			{ q: '¿Apodo de México?', options: ['El Tri', 'La Roja', 'Cafeteros', 'Leones'], answer: 0 },
			{ q: 'Color principal?', options: ['Verde', 'Rojo', 'Azul', 'Negro'], answer: 0 },
			{ q: 'Máximo goleador?', options: ['Chicharito', 'Ochoa', 'Guardado', 'Vela'], answer: 0 },
		],
		COREADELSUR: [
			{ q: 'Apodo?', options: ['Guerreros Taeguk', 'Samuráis', 'Dragones', 'Tigres'], answer: 0 },
			{ q: 'Mejor mundial?', options: ['2002', '2010', '2018', '1998'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Blanco', 'Negro'], answer: 0 },
		],
		SUDAFRICA: [
			{ q: 'Apodo?', options: ['Bafana Bafana', 'Leones', 'Águilas', 'Reds'], answer: 0 },
			{ q: 'Color principal?', options: ['Amarillo', 'Azul', 'Rojo', 'Blanco'], answer: 0 },
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONMEBOL'], answer: 0 },
		],
		CANADA: [
			{ q: 'Color principal?', options: ['Rojo', 'Azul', 'Verde', 'Amarillo'], answer: 0 },
			{ q: 'Confederación?', options: ['CONCACAF', 'UEFA', 'CAF', 'AFC'], answer: 0 },
			{ q: 'Apodo?', options: ['CanMNT', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		SUIZA: [
			{ q: 'Color principal?', options: ['Rojo', 'Azul', 'Verde', 'Negro'], answer: 0 },
			{ q: 'Confederación?', options: ['UEFA', 'AFC', 'CAF', 'CONCACAF'], answer: 0 },
			{ q: 'Apodo?', options: ['Nati', 'Leones', 'Bleus', 'Reds'], answer: 0 },
		],
		QATAR: [
			{ q: 'Color principal?', options: ['Granate', 'Rojo', 'Azul', 'Verde'], answer: 0 },
			{ q: 'Confederación?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: 'Ganó Copa Asia?', options: ['Sí', 'No', 'Nunca jugó', 'No clasifica'], answer: 0 },
		],
		BRASIL: [
			{ q: 'Mundiales?', options: ['5', '4', '3', '6'], answer: 0 },
			{ q: 'Apodo?', options: ['Canarinha', 'Bleus', 'Reds', 'Leones'], answer: 0 },
			{ q: 'Color?', options: ['Amarillo', 'Rojo', 'Azul', 'Blanco'], answer: 0 },
		],
		MARRUECOS: [
			{ q: 'Apodo?', options: ['Leones del Atlas', 'Tigres', 'Dragones', 'Águilas'], answer: 0 },
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
		],
		ESCOCIA: [
			{ q: 'Color principal?', options: ['Azul', 'Rojo', 'Verde', 'Negro'], answer: 0 },
			{ q: 'Confederación?', options: ['UEFA', 'CAF', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Apodo?', options: ['Tartan Army', 'Leones', 'Reds', 'Bleus'], answer: 0 },
		],
		HAITI: [
			{ q: 'Confederación?', options: ['CONCACAF', 'UEFA', 'CAF', 'AFC'], answer: 0 },
			{ q: 'Color principal?', options: ['Azul', 'Rojo', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Les Grenadiers', 'Leones', 'Dragones', 'Reds'], answer: 0 },
		],
		ESTADOSUNIDOS: [
			{ q: 'Apodo?', options: ['USMNT', 'Leones', 'Águilas', 'Reds'], answer: 0 },
			{ q: 'Color principal?', options: ['Blanco', 'Rojo', 'Azul', 'Verde'], answer: 0 },
			{ q: 'Confederación?', options: ['CONCACAF', 'UEFA', 'CAF', 'AFC'], answer: 0 },
		],
		AUSTRALIA: [
			{ q: 'Apodo?', options: ['Socceroos', 'Leones', 'Dragones', 'Reds'], answer: 0 },
			{ q: 'Confederación?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: 'Color?', options: ['Amarillo', 'Rojo', 'Azul', 'Negro'], answer: 0 },
		],
		PARAGUAY: [
			{ q: 'Confederación?', options: ['CONMEBOL', 'UEFA', 'CAF', 'AFC'], answer: 0 },
			{ q: 'Color?', options: ['Rojo y blanco', 'Azul', 'Verde', 'Negro'], answer: 0 },
			{ q: 'Apodo?', options: ['Albirroja', 'Leones', 'Reds', 'Bleus'], answer: 0 },
		],
		ALEMANIA: [
			{ q: 'Mundiales?', options: ['4', '3', '2', '5'], answer: 0 },
			{ q: 'Apodo?', options: ['Die Mannschaft', 'Leones', 'Reds', 'Dragones'], answer: 0 },
			{ q: 'Color?', options: ['Blanco', 'Rojo', 'Azul', 'Verde'], answer: 0 },
		],
		ECUADOR: [
			{ q: 'Confederación?', options: ['CONMEBOL', 'UEFA', 'AFC', 'CAF'], answer: 0 },
			{ q: 'Color?', options: ['Amarillo', 'Rojo', 'Azul', 'Verde'], answer: 0 },
			{ q: 'Apodo?', options: ['La Tri', 'Leones', 'Bleus', 'Reds'], answer: 0 },
		],
		COSTADEMARFIL: [
			{ q: 'Apodo?', options: ['Elefantes', 'Leones', 'Águilas', 'Tigres'], answer: 0 },
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Naranja', 'Rojo', 'Azul', 'Verde'], answer: 0 },
		],
		CURAZAO: [
			{ q: 'Confederación?', options: ['CONCACAF', 'UEFA', 'CAF', 'AFC'], answer: 0 },
			{ q: 'Color?', options: ['Azul', 'Rojo', 'Verde', 'Amarillo'], answer: 0 },
			{ q: 'Apodo?', options: ['La Familia Azul', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		HOLANDA: [
			{ q: 'Color?', options: ['Naranja', 'Rojo', 'Azul', 'Verde'], answer: 0 },
			{ q: 'Apodo?', options: ['Oranje', 'Leones', 'Bleus', 'Reds'], answer: 0 },
			{ q: 'Confederación?', options: ['UEFA', 'AFC', 'CAF', 'CONMEBOL'], answer: 0 },
		],
		JAPON: [
			{ q: 'Apodo?', options: ['Samurai Blue', 'Dragones', 'Leones', 'Tigres'], answer: 0 },
			{ q: 'Color?', options: ['Azul', 'Rojo', 'Blanco', 'Negro'], answer: 0 },
			{ q: 'Confederación?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
		],
		TUNEZ: [
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Águilas de Cartago', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		BELGICA: [
			{ q: 'Apodo?', options: ['Diablos Rojos', 'Leones', 'Bleus', 'Reds'], answer: 0 },
			{ q: 'Color principal?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Confederación?', options: ['UEFA', 'CAF', 'AFC', 'CONMEBOL'], answer: 0 },
		],
		IRAN: [
			{ q: 'Apodo?', options: ['Team Melli', 'Leones', 'Reds', 'Dragones'], answer: 0 },
			{ q: 'Confederación?', options: ['AFC', 'UEFA', 'CAF', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Blanco', 'Rojo', 'Azul', 'Verde'], answer: 0 },
		],
		EGIPTO: [
			{ q: 'Apodo?', options: ['Faraones', 'Leones', 'Águilas', 'Tigres'], answer: 0 },
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONMEBOL'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
		],
		NUEVAZELANDA: [
			{ q: 'Apodo?', options: ['All Whites', 'All Blacks', 'Leones', 'Reds'], answer: 0 },
			{ q: 'Confederación?', options: ['OFC', 'UEFA', 'AFC', 'CAF'], answer: 0 },
			{ q: 'Color?', options: ['Blanco', 'Rojo', 'Azul', 'Verde'], answer: 0 },
		],
		ESPANA: [
			{ q: 'Apodo?', options: ['La Roja', 'Bleus', 'Leones', 'Reds'], answer: 0 },
			{ q: 'Mundial ganado?', options: ['2010', '2014', '2006', '1998'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
		],
		URUGUAY: [
			{ q: 'Mundiales?', options: ['2', '1', '3', '4'], answer: 0 },
			{ q: 'Apodo?', options: ['La Celeste', 'Reds', 'Bleus', 'Leones'], answer: 0 },
			{ q: 'Color?', options: ['Celeste', 'Rojo', 'Azul', 'Verde'], answer: 0 },
		],
		ARABIASAUDITA: [
			{ q: 'Confederación?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: 'Color?', options: ['Verde', 'Rojo', 'Azul', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Halcones Verdes', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		CABOVERDE: [
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Azul', 'Rojo', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Tiburones Azules', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		FRANCIA: [
			{ q: 'Apodo?', options: ['Les Bleus', 'Reds', 'Leones', 'Águilas'], answer: 0 },
			{ q: 'Mundiales?', options: ['2', '1', '3', '4'], answer: 0 },
			{ q: 'Color?', options: ['Azul', 'Rojo', 'Verde', 'Blanco'], answer: 0 },
		],
		SENEGAL: [
			{ q: 'Apodo?', options: ['Leones de Teranga', 'Tigres', 'Águilas', 'Reds'], answer: 0 },
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Verde', 'Rojo', 'Azul', 'Blanco'], answer: 0 },
		],
		NORUEGA: [
			{ q: 'Confederación?', options: ['UEFA', 'CAF', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Leones', 'Reds', 'Bleus', 'Dragones'], answer: 0 },
		],
		ARGENTINA: [
			{ q: 'Mundiales?', options: ['3', '2', '4', '1'], answer: 0 },
			{ q: 'Apodo?', options: ['Albiceleste', 'Reds', 'Leones', 'Bleus'], answer: 0 },
			{ q: 'Color?', options: ['Blanco y celeste', 'Rojo', 'Azul', 'Verde'], answer: 0 },
		],
		AUSTRIA: [
			{ q: 'Confederación?', options: ['UEFA', 'CAF', 'AFC', 'CONMEBOL'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Das Team', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		ARGELIA: [
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Verde', 'Rojo', 'Azul', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Zorros del Desierto', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		JORDANIA: [
			{ q: 'Confederación?', options: ['AFC', 'UEFA', 'CAF', 'CONMEBOL'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Nashama', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		PORTUGAL: [
			{ q: 'Mejor logro?', options: ['Euro 2016', 'Mundial 2010', 'Euro 2004', 'Copa 2002'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Confederación?', options: ['UEFA', 'AFC', 'CAF', 'CONCACAF'], answer: 0 },
		],
		COLOMBIA: [
			{ q: 'Apodo?', options: ['Cafeteros', 'Leones', 'Reds', 'Bleus'], answer: 0 },
			{ q: 'Color?', options: ['Amarillo', 'Azul', 'Rojo', 'Verde'], answer: 0 },
			{ q: 'Confederación?', options: ['CONMEBOL', 'UEFA', 'AFC', 'CAF'], answer: 0 },
		],
		UZBEKISTAN: [
			{ q: 'Confederación?', options: ['AFC', 'UEFA', 'CAF', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Blanco', 'Rojo', 'Azul', 'Verde'], answer: 0 },
			{ q: 'Apodo?', options: ['Lobos Blancos', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		INGLATERRA: [
			{ q: 'Apodo?', options: ['Three Lions', 'Bleus', 'Reds', 'Leones'], answer: 0 },
			{ q: 'Mundial?', options: ['1966', '1970', '1990', '2002'], answer: 0 },
			{ q: 'Color?', options: ['Blanco', 'Rojo', 'Azul', 'Verde'], answer: 0 },
		],
		CROACIA: [
			{ q: 'Apodo?', options: ['Vatreni', 'Leones', 'Reds', 'Bleus'], answer: 0 },
			{ q: 'Color?', options: ['Rojo y blanco', 'Azul', 'Verde', 'Negro'], answer: 0 },
			{ q: 'Confederación?', options: ['UEFA', 'AFC', 'CAF', 'CONCACAF'], answer: 0 },
		],
		PANAMA: [
			{ q: 'Confederación?', options: ['CONCACAF', 'UEFA', 'AFC', 'CAF'], answer: 0 },
			{ q: 'Color?', options: ['Rojo', 'Azul', 'Verde', 'Blanco'], answer: 0 },
			{ q: 'Apodo?', options: ['Canaleros', 'Leones', 'Reds', 'Dragones'], answer: 0 },
		],
		GHANA: [
			{ q: 'Apodo?', options: ['Black Stars', 'Leones', 'Águilas', 'Tigres'], answer: 0 },
			{ q: 'Confederación?', options: ['CAF', 'UEFA', 'AFC', 'CONCACAF'], answer: 0 },
			{ q: 'Color?', options: ['Blanco', 'Rojo', 'Azul', 'Verde'], answer: 0 },
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
