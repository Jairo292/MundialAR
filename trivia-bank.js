// Banco de trivias personalizadas por selección.
//
// Cómo usar:
// - Rellena 3 preguntas por país.
// - Puedes definir por índice (targetIndex) o por token (nombre normalizado).
// - El código en `script.js` usará estas preguntas si existen;
//   si no existen, usará el generador automático como fallback.
//
// Formato de pregunta:
// { q: "texto", options: ["A","B","C","D"], answer: 0 }
// - `answer` es el índice (0..3) de la opción correcta.
//
// Nota: Para evitar datos incorrectos, aquí solo dejamos ejemplos.
// Si me das una tabla/fuente con datos (apodo, goleador histórico, técnico, etc.)
// puedo autogenerar trivias reales para todos.

(function () {
	// Overrides manuales (opcionales). Si usas `preguntas.xml`, puedes dejar esto vacío.
	const byIndex = {};
	const byToken = {};

	function normalizeToken(name) {
		return (name || '')
			.toString()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toUpperCase()
			.replace(/[^A-Z0-9]/g, '');
	}

	function parsePreguntasXml(xmlText) {
		const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
		const quiz = doc.querySelector('quiz');
		if (!quiz) return {};

		let currentCountry = null;
		const byCountry = {};

		quiz.childNodes.forEach((node) => {
			// 8 = COMMENT_NODE, 1 = ELEMENT_NODE
			if (node.nodeType === 8) {
				const raw = (node.nodeValue || '').trim();
				currentCountry = raw || null;
				return;
			}
			if (node.nodeType !== 1) return;
			if (node.nodeName.toLowerCase() !== 'question') return;
			if (!currentCountry) return;

			const textEl = node.querySelector('text');
			const qText = textEl ? (textEl.textContent || '').trim() : '';
			const optionEls = Array.from(node.querySelectorAll('option'));
			const options = optionEls.map((o) => (o.textContent || '').trim());
			let answer = optionEls.findIndex((o) => (o.getAttribute('correct') || '').toLowerCase() === 'true');
			if (answer < 0) answer = 0;

			if (!byCountry[currentCountry]) byCountry[currentCountry] = [];
			byCountry[currentCountry].push({ q: qText, options, answer });
		});

		// Normaliza a byToken tomando las primeras 3 preguntas por país
		const result = {};
		Object.entries(byCountry).forEach(([countryLabel, questions]) => {
			const token = normalizeToken(countryLabel);
			if (!token) return;
			if (!Array.isArray(questions) || questions.length === 0) return;
			result[token] = questions.slice(0, 3);
		});
		return result;
	}

	async function tryLoadPreguntasXml() {
		// Importante: `fetch` suele fallar si abres el HTML con file://.
		// Si sirves el proyecto con un servidor (http/https), sí funcionará.
		try {
			// Intentos de ruta: relativa simple y relativa explícita.
			let res = await fetch('preguntas.xml', { cache: 'no-cache' });
			if (!res.ok) res = await fetch('./preguntas.xml', { cache: 'no-cache' });
			if (!res.ok) return;
			const text = await res.text();
			const parsedByToken = parsePreguntasXml(text);
			Object.assign(byToken, parsedByToken);
			try {
				console.info('[Trivia] preguntas.xml cargado:', Object.keys(parsedByToken || {}).length, 'selecciones');
			} catch (e) {}
			window.triviaOverridesLoadedFromXml = true;

			// Notifica al core que ya hay overrides listos.
			try {
				window.dispatchEvent(new CustomEvent('trivia-overrides-updated', {
					detail: { source: 'preguntas.xml', tokens: Object.keys(parsedByToken || {}).length }
				}));
			} catch (e) {}

			// Reaplica trivias si el core ya cargó.
			if (typeof window.ensureTriviaForAllTargets === 'function') {
				window.ensureTriviaForAllTargets();
			}
		} catch (e) {
			// silencioso: si falla, se usan trivias por defecto
		}
	}

	window.triviaOverrides = { byIndex, byToken };
	// Dispara carga opcional del XML.
	tryLoadPreguntasXml();
})();
