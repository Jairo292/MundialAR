// Filtros visuales para el video popup
const videoFilters = [
	{ name: 'Original', filter: 'none', desc: 'Los filtros visuales permiten personalizar la experiencia de visualización del contenido AR.' },
	{ name: 'Desenfoque', filter: 'blur(4px)', desc: 'Aplica un desenfoque suave al video.' },
	{ name: 'Color Ajustado', filter: 'contrast(1.2) saturate(1.3) brightness(1.05) sepia(0.12)', desc: 'Ajusta el color y el contraste para un look más cinematográfico.' },
	{ name: 'Térmico', filter: 'contrast(1.2) brightness(1.1) invert(1) sepia(1) hue-rotate(270deg) saturate(2.5)', desc: 'Simula una visión térmica.' },
	{ name: 'Pixelado', filter: 'contrast(1.1) brightness(1.1) grayscale(0.2) blur(1.5px)', desc: 'Da un efecto de pixelado y baja resolución.' },
	{ name: 'Pastel', filter: 'contrast(0.9) brightness(1.2) saturate(1.8) sepia(0.18) hue-rotate(40deg)', desc: 'Colores suaves y saturados para un efecto pastel.' }
];
let currentVideoFilter = 0;

function renderVideoFilters() {
	const btnsDiv = document.getElementById('video-filters-btns');
	const descDiv = document.getElementById('video-filters-desc');
	if (!btnsDiv || !descDiv) return;
	btnsDiv.innerHTML = '';
	videoFilters.forEach((f, idx) => {
		const btn = document.createElement('button');
		btn.textContent = f.name;
		btn.className = idx === currentVideoFilter ? 'active' : '';
		btn.onclick = () => setVideoFilter(idx);
		btnsDiv.appendChild(btn);
	});
	descDiv.innerHTML = `<b>Filtro Activo: ${videoFilters[currentVideoFilter].name}</b><br><span style='font-weight:400;'>${videoFilters[currentVideoFilter].desc}</span>`;
	// Aplica el filtro al video
	const videoEl = document.getElementById('video-player');
	if (videoEl) videoEl.style.filter = videoFilters[currentVideoFilter].filter;
}

function setVideoFilter(idx) {
	currentVideoFilter = idx;
	renderVideoFilters();
}
// Preguntas de trivia por país. Se rellenan automáticamente:
// - Primero con overrides en `trivia-bank.js` (por token/índice)
// - Luego con el generador por defecto como fallback.
const triviaQuestions = {};

let triviaState = {
	active: false,
	country: null,
	current: 0,
	score: 0,
	timer: null,
	timeLeft: 15
};

function showTriviaModal(countryIndex) {
	const modal = document.getElementById('trivia-modal');
	if (!modal) return;
	triviaState.active = true;
	triviaState.country = countryIndex;
	triviaState.current = 0;
	triviaState.score = 0;
	modal.style.display = 'flex';
	renderTriviaQuestion();
}

function hideTriviaModal() {
	const modal = document.getElementById('trivia-modal');
	if (!modal) return;
	modal.style.display = 'none';
	triviaState.active = false;
	clearTimeout(triviaState.timer);
}

function renderTriviaQuestion() {
	const questions = triviaQuestions[triviaState.country];
	if (!questions) return;
	const q = questions[triviaState.current];
	document.getElementById('trivia-question').textContent = q.q;
	const optionsDiv = document.getElementById('trivia-options');
	optionsDiv.innerHTML = '';
	q.options.forEach((opt, idx) => {
		const btn = document.createElement('button');
		btn.textContent = opt;
		btn.onclick = () => selectTriviaOption(idx);
		optionsDiv.appendChild(btn);
	});
	document.getElementById('trivia-progress-label').textContent = `Pregunta ${triviaState.current+1} de 5`;
	document.getElementById('trivia-score').textContent = `${triviaState.score} puntos`;
	document.getElementById('trivia-progress-bar').style.width = `${((triviaState.current)/5)*100}%`;
	triviaState.timeLeft = 15;
	updateTriviaTimer();
}

function updateTriviaTimer() {
	document.getElementById('trivia-timer').textContent = `Tiempo restante: ${triviaState.timeLeft}s`;
	if (triviaState.timeLeft <= 0) {
		selectTriviaOption(-1); // Sin respuesta
		return;
	}
	triviaState.timer = setTimeout(() => {
		triviaState.timeLeft--;
		updateTriviaTimer();
	}, 1000);
}

function selectTriviaOption(idx) {
	clearTimeout(triviaState.timer);
	const questions = triviaQuestions[triviaState.country];
	const q = questions[triviaState.current];
	if (idx === q.answer) {
		triviaState.score += 10;
	}
	triviaState.current++;
	if (triviaState.current < 5) {
		renderTriviaQuestion();
	} else {
		showTriviaResult();
	}
}

function showTriviaResult() {
	document.getElementById('trivia-question').textContent = `¡Trivia finalizada!`;
	document.getElementById('trivia-options').innerHTML = `<div style='text-align:center;font-size:1.2rem;margin:18px 0;'>Puntaje final: <b>${triviaState.score} puntos</b></div>`;
	document.getElementById('trivia-progress-label').textContent = '';
	document.getElementById('trivia-progress-bar').style.width = '100%';
	document.getElementById('trivia-timer').textContent = '';
}
// Vincular botón de trivia y cierre
document.addEventListener("DOMContentLoaded", () => {
	const triviaBtn = document.getElementById('trivia-btn');
	const triviaClose = document.getElementById('trivia-close');
	if (triviaBtn) {
		triviaBtn.addEventListener('click', () => {
			if (activeTargetIndex !== null && triviaQuestions[activeTargetIndex]) {
				showTriviaModal(activeTargetIndex);
			} else {
				alert('Escanea primero un país con trivia disponible.');
			}
		});
	}
	if (triviaClose) {
		triviaClose.addEventListener('click', hideTriviaModal);
	}
});
// ---------- Tutorial / Help button logic ----------
document.addEventListener('DOMContentLoaded', () => {
	const helpBtn = document.getElementById('help-btn');
	const modal = document.getElementById('tutorial-modal');
	const closeBtn = document.getElementById('tutorial-close');
	const imgEl = document.getElementById('tutorial-image');
	const descEl = document.getElementById('tutorial-desc');
	const prevBtn = document.getElementById('tutorial-prev');
	const nextBtn = document.getElementById('tutorial-next');
	const stepIndicator = document.getElementById('tutorial-step-indicator');

	if (!helpBtn || !modal || !imgEl || !descEl || !prevBtn || !nextBtn) return;

	const steps = [
		{
			title: 'Paso 1: Iniciar experiencia',
			img: 'assets/galeria/1.png',
			desc: 'Para inicicar la experiencia da click al boton de iniciar experiencia en AR.'
		},
		{
			title: 'Paso 2: Dar permisos',
			img: 'assets/galeria/2.png',
			desc: 'Dale click a permitir permisos para acceder a la cámara.'
		},
		{
			title: 'Paso 3: Como empezar',
			img: 'assets/galeria/3.png',
			desc: 'Para poder mostrar un modelo 3D, simplemente escanea un escudo de alguna selección que juegue en el Mundial 2026.'
		},
		{
			title: 'Paso 4: Interacciónes',
			img: 'assets/galeria/4.png',
			desc: 'Una vez el modelo 3D esté visible, puedes usar las funciones de abajo.'
		},
		{
			title: 'Paso 5: Animacion',
			img: 'assets/galeria/5.png',
			desc: 'Una vez el modelo 3D esté visible, puedes usar el boton de animacion, que hara que el modelo haga una animacion.'
		},
		{
			title: 'Paso 6: Informacion',
			img: 'assets/galeria/6.png',
			desc: 'Una vez el modelo 3D esté visible, puedes usar el boton de informacion, para que se muestre informacion del escudo escaneado.'
		},
		{
			title: 'Paso 7: Video',
			img: 'assets/galeria/7.png',
			desc: 'Una vez el modelo 3D esté visible, puedes usar el boton de video para ver algun video relacionado a lo escaneado.'
		},
		{
			title: 'Paso 8: Videopt2',
			img: 'assets/galeria/8.png',
			desc: 'Una vez estes en el panel puedes reproducir el video y aplicar algun efecto/filtro en el.'
		},
		{
			title: 'Paso 9: Modo Trivia',
			img: 'assets/galeria/9.png',
			desc: 'Una vez el modelo 3D esté visible, puedes usar el boton de trivia para jugar.'
		},
		{
			title: 'Paso 10: Modo Trivia pt2',
			img: 'assets/galeria/10.png',
			desc: 'Si estas en el modo trivia puedes responder preguntas sobre el contenido escaneado, 3 preguntas en total.'
		},
		{
			title: 'Paso 11: Efecto',
			img: 'assets/galeria/11.png',
			desc: 'Puedes usar el boton de efecto para aplicar filtros en la camara como cine, noche, holograma, termico, desenfoque.'
		}
	];

	let current = 0;

	function render() {
		const s = steps[current];
		imgEl.src = s.img;
		imgEl.alt = s.title;
		descEl.textContent = s.desc;
		prevBtn.disabled = current === 0;
		nextBtn.disabled = current === steps.length - 1;
		prevBtn.classList.toggle('disabled', prevBtn.disabled);
		nextBtn.classList.toggle('disabled', nextBtn.disabled);
		stepIndicator.textContent = `${current + 1} / ${steps.length}`;
	}

	function openTutorial() {
		modal.classList.add('is-open');
		modal.setAttribute('aria-hidden', 'false');
		render();
	}

	function closeTutorial() {
		modal.classList.remove('is-open');
		modal.setAttribute('aria-hidden', 'true');
	}

	helpBtn.addEventListener('click', openTutorial);
	closeBtn.addEventListener('click', closeTutorial);
	prevBtn.addEventListener('click', () => { if (current > 0) { current--; render(); } });
	nextBtn.addEventListener('click', () => { if (current < steps.length - 1) { current++; render(); } });

	// Close when clicking outside content
	modal.addEventListener('click', (e) => { if (e.target === modal) closeTutorial(); });

	// Keyboard navigation
	document.addEventListener('keydown', (e) => {
		if (!modal.classList.contains('is-open')) return;
		if (e.key === 'Escape') closeTutorial();
		if (e.key === 'ArrowLeft') prevBtn.click();
		if (e.key === 'ArrowRight') nextBtn.click();
	});
});
const scanVideo = document.querySelector(".page-scan .scan-video");
let animationButton = null;
let effectsButton = null;
let dataButton = null;
let videoButton = null;
let dataModal = null;
let dataTitleEl = null;
let dataBodyEl = null;
let dataCloseButton = null;
let videoModal = null;
let videoTitleEl = null;
let videoMessageEl = null;
let videoPlayerEl = null;
let videoCaptionEl = null;
let videoCloseButton = null;
let activeAnimModel = null;
let visualEffectsEnabled = false;
let currentCameraEffect = 0;
const cameraEffects = [
	{ name: 'Normal', filter: 'none' },
	{ name: 'Cine', filter: 'contrast(1.2) saturate(1.3) brightness(1.05) sepia(0.12)' },
	{ name: 'Noche', filter: 'brightness(0.5) contrast(1.2) hue-rotate(210deg) saturate(0.7)' },
	{ name: 'Holograma', filter: 'contrast(1.5) brightness(1.2) hue-rotate(160deg) saturate(2) blur(0.5px)' },
	{ name: 'Térmico', filter: 'contrast(1.2) brightness(1.1) invert(1) sepia(1) hue-rotate(270deg) saturate(2.5)' },
	{ name: 'Desenfoque', filter: 'blur(4px)' }
];
let isAnimationRunning = false;
let activeTargetIndex = null;
let activeTargetElement = null; // reference to the currently found target element

// --- Información: rotación + narración ---
let infoNarrationUtterance = null;
let infoNarrationActive = false;
let infoRotationActiveModelId = null;

function startInfoRotation() {
	if (!activeAnimModel) return;
	try {
		// Evita re-aplicar sobre el mismo modelo.
		if (infoRotationActiveModelId && infoRotationActiveModelId === activeAnimModel.id) return;
		infoRotationActiveModelId = activeAnimModel.id;

		// Rotación 360° continua mientras el modal esté abierto.
		activeAnimModel.removeAttribute('animation__info');
		const currentRot = activeAnimModel.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
		const fromY = (typeof currentRot.y === 'number') ? currentRot.y : 0;
		activeAnimModel.setAttribute(
			'animation__info',
			`property: rotation; from: ${currentRot.x || 0} ${fromY} ${currentRot.z || 0}; to: ${currentRot.x || 0} ${fromY + 360} ${currentRot.z || 0}; dur: 2200; easing: linear; loop: true`
		);
	} catch (e) {
		// ignore
	}
}

function stopInfoRotation() {
	if (!activeAnimModel) {
		infoRotationActiveModelId = null;
		return;
	}
	try {
		activeAnimModel.removeAttribute('animation__info');
	} catch (e) {}
	infoRotationActiveModelId = null;
}

function speakInfoText(text) {
	if (!text) return;
	if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return;

	try {
		window.speechSynthesis.cancel();
		infoNarrationUtterance = new SpeechSynthesisUtterance(text);
		infoNarrationUtterance.lang = 'es-MX';
		infoNarrationUtterance.rate = 1;
		infoNarrationUtterance.pitch = 1;
		infoNarrationUtterance.volume = 1;
		infoNarrationActive = true;
		infoNarrationUtterance.onend = () => { infoNarrationActive = false; };
		infoNarrationUtterance.onerror = () => { infoNarrationActive = false; };
		window.speechSynthesis.speak(infoNarrationUtterance);
	} catch (e) {
		infoNarrationActive = false;
	}
}

function stopInfoNarration() {
	if (!('speechSynthesis' in window)) return;
	try {
		window.speechSynthesis.cancel();
	} catch (e) {}
	infoNarrationActive = false;
	infoNarrationUtterance = null;
}

// --- Marcador simulado (overlay) ---
let scoreSimEl = null;
let scoreSimMetaEl = null;
let scoreSimHomeEl = null;
let scoreSimAwayEl = null;
let scoreSimScoreEl = null;
let scoreSimTimer = null;
let scoreSimActiveIndex = null;

const GROUP_LETTERS = 'ABCDEFGHIJKL'.split('');

function getGroupForIndex(idx) {
	const groupIndex = Math.floor((idx || 0) / 4);
	return GROUP_LETTERS[groupIndex] || 'A';
}

function getGroupIndices(idx) {
	const groupIndex = Math.floor((idx || 0) / 4);
	const start = groupIndex * 4;
	const end = Math.min(start + 4, targetCountries.length);
	const list = [];
	for (let i = start; i < end; i++) list.push(i);
	return list;
}

function pickOpponentIndex(idx) {
	const groupmates = getGroupIndices(idx).filter(i => i !== idx);
	if (groupmates.length === 0) return null;
	// determinista: siguiente dentro del grupo
	const pos = getGroupIndices(idx).indexOf(idx);
	const pick = groupmates[(Math.max(0, pos) + 0) % groupmates.length];
	return pick;
}

function ensureScoreSimNodes() {
	if (scoreSimEl) return;
	scoreSimEl = document.getElementById('score-sim');
	scoreSimMetaEl = document.getElementById('score-sim-meta');
	scoreSimHomeEl = document.getElementById('score-sim-home');
	scoreSimAwayEl = document.getElementById('score-sim-away');
	scoreSimScoreEl = document.getElementById('score-sim-score');
}

function renderScoreSim(idx) {
	ensureScoreSimNodes();
	if (!scoreSimEl || idx === null || idx === undefined) return;

	const country = targetCountries[idx] || 'Equipo';
	const oppIdx = pickOpponentIndex(idx);
	const opp = (oppIdx !== null && oppIdx !== undefined) ? (targetCountries[oppIdx] || 'Rival') : 'Rival';
	const group = getGroupForIndex(idx);

	// Cambia cada 8s (simulación)
	const bucket = Math.floor(Date.now() / 8000);
	const seed = ((idx + 1) * 100000) + ((oppIdx !== null ? (oppIdx + 1) : 7) * 1000) + bucket;
	const rnd = seededRng(seed);
	const minute = Math.floor(rnd() * 91);
	const home = Math.floor(rnd() * 5);
	const away = Math.floor(rnd() * 5);

	if (scoreSimMetaEl) scoreSimMetaEl.textContent = `Grupo ${group} • Min ${minute}'`;
	if (scoreSimHomeEl) scoreSimHomeEl.textContent = country;
	if (scoreSimAwayEl) scoreSimAwayEl.textContent = opp;
	if (scoreSimScoreEl) scoreSimScoreEl.textContent = `${home} - ${away}`;
}

function showScoreSim(idx) {
	ensureScoreSimNodes();
	if (!scoreSimEl) return;
	scoreSimActiveIndex = idx;
	renderScoreSim(idx);
	scoreSimEl.hidden = false;
	if (scoreSimTimer) clearInterval(scoreSimTimer);
	scoreSimTimer = setInterval(() => {
		if (scoreSimActiveIndex === null || scoreSimActiveIndex === undefined) return;
		renderScoreSim(scoreSimActiveIndex);
	}, 1500);
}

function hideScoreSim(idx) {
	ensureScoreSimNodes();
	if (!scoreSimEl) return;
	if (idx !== null && idx !== undefined && scoreSimActiveIndex !== idx) return;
	scoreSimActiveIndex = null;
	scoreSimEl.hidden = true;
	if (scoreSimTimer) {
		clearInterval(scoreSimTimer);
		scoreSimTimer = null;
	}
}

async function startCamera() {
	if (!scanVideo || !navigator.mediaDevices?.getUserMedia) {
		return;
	}

	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: { facingMode: "environment" },
			audio: false,
		});
		scanVideo.srcObject = stream;
	} catch (error) {
		const message = document.querySelector(".page-scan .scan-text");
		if (message) {
			message.textContent =
				"No se pudo abrir la camara. Revisa permisos o prueba en HTTPS.";
		}
	}
}

function triggerActiveAnimation() {
	if (!activeAnimModel) {
		return;
	}

	const host = document.querySelector(`[data-anim-model="#${activeAnimModel.id}"]`);
	const shouldRotate = host && host.getAttribute("data-rotate-anim") === "true";

	if (isAnimationRunning) {
		// Cancel animation
		if (shouldRotate) {
			activeAnimModel.removeAttribute("animation");
		} else {
			activeAnimModel.removeAttribute("animation-mixer");
		}
		isAnimationRunning = false;
		if (animationButton) {
			animationButton.classList.remove("is-active");
		}
		return;
	}

	// Start animation
	if (shouldRotate) {
		activeAnimModel.removeAttribute("animation");
		activeAnimModel.setAttribute("rotation", "0 0 0");
		requestAnimationFrame(() => {
			activeAnimModel.setAttribute("animation", "property: rotation; to: 0 360 0; dur: 300; easing: linear; loop: true");
		});
	} else {
		activeAnimModel.removeAttribute("animation-mixer");
		requestAnimationFrame(() => {
			const clipName = host ? host.getAttribute("data-anim-clip") : null;
			const mixerAttr = clipName
				? `clip: ${clipName}; loop: once; timeScale: 1`
				: `loop: once; timeScale: 1`;
			activeAnimModel.setAttribute("animation-mixer", mixerAttr);
			
			// Detect when animation ends (only for loop: once)
			if (mixerAttr.includes("loop: once")) {
				activeAnimModel.addEventListener("animation-finished", () => {
					isAnimationRunning = false;
					if (animationButton) {
						animationButton.classList.remove("is-active");
					}
				}, { once: true });
			}
		});
	}

	isAnimationRunning = true;
	if (animationButton) {
		animationButton.classList.add("is-active");
	}
}
//paso 3
// Orden de países según el orden de imágenes compiladas en `assets/targets.mind`.
// Importante: el índice aquí DEBE coincidir con el targetIndex en MindAR.
// Se mantienen primero los 5 países existentes para no romper el set actual.
const targetCountries = [
'México',
  'Corea del Sur',
  'Sudafrica',
  'Canada',
  'Suiza',
  'Qatar',
  'Brasil',
  'Marruecos',
  'Escocia',
  'Haiti',
  'Estados Unidos',
  'Australia',
  'Paraguay',
  'Alemania',
  'Ecuador',
  'Costa de Marfil',
  'Curazao',
  'Holanda',
  'Japón',
  'Tunez',
  'Bélgica',
  'Iran',
  'Egipto',
  'Nueva Zelanda',
  'España',
  'Uruguay',
  'Arabia Saudita',
  'Cabo Verde',
  'Francia',
  'Senegal',
  'Noruega',
  'Argentina',
  'Austria',
  'Argelia',
  'Jordania',
  'Portugal',
  'Colombia',
  'Uzbekistan',
  'Inglaterra',
  'Croacia',
  'Panama',
  'Ghana',
  'Bosnia y Herzegovina',
  'Republica Checa',
  'Irak',
  'Suecia',
  'Turquia',
  'Congo'
];

// Metadatos básicos para generar la descripción de Información por país.
// Nota: mantenemos el texto sin estadísticas específicas para evitar datos incorrectos.
const countryMetaByToken = {
	MEXICO: { confed: 'CONCACAF', extra: 'País anfitrión del Mundial 2026.' },
	COREADELSUR: { confed: 'AFC' },
	SUDAFRICA: { confed: 'CAF' },
	CANADA: { confed: 'CONCACAF', extra: 'País anfitrión del Mundial 2026.' },
	SUIZA: { confed: 'UEFA' },
	QATAR: { confed: 'AFC' },
	BRASIL: { confed: 'CONMEBOL' },
	MARRUECOS: { confed: 'CAF' },
	ESCOCIA: { confed: 'UEFA' },
	HAITI: { confed: 'CONCACAF' },
	ESTADOSUNIDOS: { confed: 'CONCACAF', extra: 'País anfitrión del Mundial 2026.' },
	AUSTRALIA: { confed: 'AFC' },
	PARAGUAY: { confed: 'CONMEBOL' },
	ALEMANIA: { confed: 'UEFA' },
	ECUADOR: { confed: 'CONMEBOL' },
	COSTADEMARFIL: { confed: 'CAF' },
	CURAZAO: { confed: 'CONCACAF' },
	HOLANDA: { confed: 'UEFA' },
	JAPON: { confed: 'AFC' },
	TUNEZ: { confed: 'CAF' },
	BELGICA: { confed: 'UEFA' },
	IRAN: { confed: 'AFC' },
	EGIPTO: { confed: 'CAF' },
	NUEVAZELANDA: { confed: 'OFC' },
	ESPANA: { confed: 'UEFA' },
	URUGUAY: { confed: 'CONMEBOL' },
	ARABIASAUDITA: { confed: 'AFC' },
	CABOVERDE: { confed: 'CAF' },
	FRANCIA: { confed: 'UEFA' },
	SENEGAL: { confed: 'CAF' },
	NORUEGA: { confed: 'UEFA' },
	ARGENTINA: { confed: 'CONMEBOL' },
	AUSTRIA: { confed: 'UEFA' },
	ARGELIA: { confed: 'CAF' },
	JORDANIA: { confed: 'AFC' },
	PORTUGAL: { confed: 'UEFA' },
	COLOMBIA: { confed: 'CONMEBOL' },
	UZBEKISTAN: { confed: 'AFC' },
	INGLATERRA: { confed: 'UEFA' },
	CROACIA: { confed: 'UEFA' },
	PANAMA: { confed: 'CONCACAF' },
	GHANA: { confed: 'CAF' },
	BOSNIAYHERZEGOVINA: { confed: 'UEFA' },
	REPUBLICACHECA: { confed: 'UEFA' },
	IRAK: { confed: 'AFC' },
	SUECIA: { confed: 'UEFA' },
		TURQUIA: { confed: 'UEFA' },
	CONGO: { confed: 'CAF' }

};

// ---------- Trivia: autogenerar para todos los equipos ----------
// Mantiene preguntas personalizadas existentes en `triviaQuestions` (ej. México y España)
// y completa el resto con preguntas seguras basadas en datos internos (confederación / anfitrión / uso de la app).
const TRIVIA_CONFEDS = ['AFC', 'CAF', 'CONCACAF', 'CONMEBOL', 'UEFA', 'OFC'];

function seededRng(seed) {
	let s = (seed >>> 0) || 1;
	return () => {
		// LCG simple (determinista)
		s = (s * 1664525 + 1013904223) >>> 0;
		return s / 0x100000000;
	};
}

function seededShuffle(arr, seed) {
	const a = arr.slice();
	const rnd = seededRng(seed);
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rnd() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function buildConfedOptions(correct, seed) {
	const wrong = TRIVIA_CONFEDS.filter((c) => c !== correct);
	const pick = seededShuffle(wrong, seed).slice(0, 3);
	return seededShuffle([correct, ...pick], seed + 17);
}

function isHostCountry(countryName) {
	const token = normalizeCountryToken(countryName);
	const meta = token ? countryMetaByToken[token] : null;
	return !!(meta && meta.extra && /anfitri[oó]n/i.test(meta.extra));
}

function buildDefaultTriviaForCountry(countryName, idx) {
	const token = normalizeCountryToken(countryName);
	const meta = token ? countryMetaByToken[token] : null;
	const confed = meta && meta.confed ? meta.confed : null;
	const host = isHostCountry(countryName);

	const q1Options = confed
		? buildConfedOptions(confed, 1000 + idx)
		: ['AFC', 'CAF', 'CONCACAF', 'UEFA'];
	const q1Answer = confed ? q1Options.indexOf(confed) : 0;

	return [
		{
			q: `¿En qué confederación compite ${countryName}?`,
			options: q1Options,
			answer: q1Answer,
		},
		{
			q: `¿${countryName} es país anfitrión del Mundial 2026?`,
			options: ['Sí', 'No'],
			answer: host ? 0 : 1,
		},
		{
			q: `En esta app, ¿qué debes hacer para ver el contenido AR de ${countryName}?`,
			options: [
				'Escanear el escudo',
				'Escribir el nombre del país',
				'Tomar una foto y subirla',
				'Activar el modo VR',
			],
			answer: 0,
		},
	];
}

function ensureTriviaForAllTargets() {
	if (!Array.isArray(targetCountries) || targetCountries.length === 0) return;

	// 1) Aplica overrides si existen (definidos en trivia-bank.js)
	try {
		const overrides = window.triviaOverrides;
		if (overrides) {
			const byIndex = overrides.byIndex || {};
			const byToken = overrides.byToken || {};
			targetCountries.forEach((countryName, idx) => {
				const token = normalizeCountryToken(countryName);
				const fromIndex = byIndex && byIndex[idx];
				const fromToken = token && byToken && byToken[token];
				// Preferimos por token (más estable) y luego por índice.
				const qset = fromToken || fromIndex;
				if (Array.isArray(qset) && qset.length === 5) {
					triviaQuestions[idx] = qset;
				}
			});
		}
	} catch (e) {
		// si falla, seguimos con el autogenerador
	}

	// 2) Completa lo que falte con el generador seguro
	targetCountries.forEach((countryName, idx) => {
		if (!triviaQuestions[idx] || !Array.isArray(triviaQuestions[idx]) || triviaQuestions[idx].length !== 5) {
			triviaQuestions[idx] = buildDefaultTriviaForCountry(countryName, idx);
		}
	});
}

// Expone el refresco para que trivia-bank.js (XML) pueda dispararlo.
try { window.ensureTriviaForAllTargets = ensureTriviaForAllTargets; } catch (e) {}

// Si `preguntas.xml` se carga después, reaplica overrides.
try {
	window.addEventListener('trivia-overrides-updated', () => {
		ensureTriviaForAllTargets();
		// Si la trivia está abierta, re-renderiza la pregunta actual.
		try {
			const modal = document.getElementById('trivia-modal');
			if (modal && modal.style.display === 'flex' && triviaState && triviaState.active) {
				renderTriviaQuestion();
			}
		} catch (e) {}
	});
} catch (e) {}

// Ejecuta el autollenado una vez (mantiene las trivias personalizadas existentes).
ensureTriviaForAllTargets();

function buildTeamInfoText(countryName) {
	const token = normalizeCountryToken(countryName);
	const meta = (token && countryMetaByToken[token]) ? countryMetaByToken[token] : null;
	const confedText = meta && meta.confed ? `Compite en ${meta.confed}. ` : '';
	const extraText = meta && meta.extra ? `${meta.extra} ` : '';
	return `La selección nacional de ${countryName} representa a ${countryName} en el fútbol internacional. ${confedText}${extraText}Escanea el escudo para ver su modelo 3D.`
		.replace(/\s+/g, ' ')
		.trim();
}

const teamData = {
       0: {
	       name: "México",
	       text: buildTeamInfoText("México"),
       },
	   1: {
	       name: "Uruguay",
	       text: buildTeamInfoText("Uruguay"),
       },
	   2: {
	       name: "España",
	       text: buildTeamInfoText("España"),
       },
	   3: {
	       name: "Cabo Verde",
	       text: buildTeamInfoText("Cabo Verde"),
       },
	   4: {
	       name: "Arabia Saudita",
	       text: buildTeamInfoText("Arabia Saudita"),
       },
};

// Completa automáticamente teamData para todos los países configurados.
// (Puedes reemplazar el texto más adelante con información real.)
targetCountries.forEach((countryName, idx) => {
	if (!teamData[idx]) {
		teamData[idx] = {
			name: countryName,
			text: buildTeamInfoText(countryName),
		};
	} else if (!teamData[idx].name) {
		teamData[idx].name = countryName;
	}
	// Si existía un texto placeholder o vacío, lo reemplaza por el generado.
	if (!teamData[idx].text || /pr[oó]ximamente/i.test(teamData[idx].text)) {
		teamData[idx].text = buildTeamInfoText(countryName);
	}
});

//paso 4
const teamVideos = {
       0: {
	       name: "México",
	       file: "mexico.mp4",
	       caption: "Próximamente video de la selección mexicana...",
       },
       1: {
	       name: "Uruguay",
	       file: "uruguay.mp4",
	       caption: "Video de la selección uruguaya...",
       },
       2: {
	       name: "España",
	       file: "espana.mp4",
	       caption: "Video de la selección española...",
       },
       3: {
	       name: "Cabo Verde",
	       file: "caboverde.mp4",
	       caption: "Video de la selección de Cabo Verde...",
       },
       4: {
	       name: "Arabia Saudita",
	       file: "arabia.mp4",
	       caption: "Video de la selección de Arabia Saudita...",
    },

   
   42: {
       name: "Bosnia y Herzegovina",
       file: "bosnia.mp4",
       caption: "Video de Bosnia y Herzegovina...",
   }
};

// Completa automáticamente teamVideos para todos los países configurados.
// Por defecto no hay video (file: null). Cuando agregues un mp4, rellena `file`.
targetCountries.forEach((countryName, idx) => {
	if (!teamVideos[idx]) {
		teamVideos[idx] = {
			name: countryName,
			file: null,
			caption: "",
		};
	} else if (!teamVideos[idx].name) {
		teamVideos[idx].name = countryName;
	}
});

function normalizeCountryWords(name) {
	return (name || '')
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-zA-Z0-9\s]/g, ' ')
		.split(/\s+/)
		.map(w => w.trim())
		.filter(Boolean);
}

function toLowerCamel(words) {
	if (!words || words.length === 0) return '';
	const first = words[0].toLowerCase();
	const rest = words.slice(1).map(w => (w ? (w[0].toUpperCase() + w.slice(1).toLowerCase()) : '')).join('');
	return `${first}${rest}`;
}

function buildVideoCandidates(countryName, explicitFile) {
	const candidates = [];
	if (explicitFile) candidates.push(explicitFile);

	const words = normalizeCountryWords(countryName);
	const joinedLower = words.join('').toLowerCase();
	const camel = toLowerCamel(words);

	if (camel) candidates.push(`${camel}.mp4`);
	if (joinedLower) candidates.push(`${joinedLower}.mp4`);

	// último recurso: token completo (sin espacios) en lowercase
	const token = normalizeCountryToken(countryName);
	if (token) candidates.push(`${token.toLowerCase()}.mp4`);

	// dedupe preservando orden
	return [...new Set(candidates.filter(Boolean))];
}

function playVideoWithCandidates(videoEl, candidates, onFail) {
	if (!videoEl) return;
	let idx = 0;

	const tryNext = () => {
		if (idx >= candidates.length) {
			cleanup();
			if (typeof onFail === 'function') onFail();
			return;
		}
		const file = candidates[idx++];
		videoEl.src = `assets/galeria/${file}`;
		videoEl.load();
	};

	const onError = () => {
		// intenta el siguiente candidato
		tryNext();
	};

	const onLoaded = () => {
		// ya cargó uno válido
		cleanup();
	};

	const cleanup = () => {
		videoEl.removeEventListener('error', onError);
		videoEl.removeEventListener('loadeddata', onLoaded);
		videoEl.removeEventListener('canplay', onLoaded);
	};

	cleanup();
	videoEl.addEventListener('error', onError);
	videoEl.addEventListener('loadeddata', onLoaded);
	videoEl.addEventListener('canplay', onLoaded);
	tryNext();
}

function showDataModal() {
	if (!dataModal || !dataTitleEl) return;
	const data = teamData[activeTargetIndex];
	// Título y subtítulo
	dataTitleEl.textContent = data && data.name ? data.name : 'Información';
	// Descripción principal
	const infoBody = document.querySelector('.info-popup-subtitle');
	if (infoBody) {
		infoBody.textContent = data && data.text ? data.text : 'Escanea un escudo para ver la información.';
	}
	dataModal.classList.add("is-open");

	// Mientras el popup está abierto: rotación 360° + narración en voz alta.
	startInfoRotation();
	if (data && data.text) {
		speakInfoText(data.text);
	}
}

function hideDataModal() {
	if (!dataModal) {
		return;
	}
	dataModal.classList.remove("is-open");
	stopInfoNarration();
	stopInfoRotation();
}

function showVideoModal() {
	if (!videoModal || !videoTitleEl || !videoPlayerEl) {
		return;
	}
	if (activeTargetIndex === null || activeTargetIndex === undefined) {
		videoTitleEl.textContent = 'Video';
		videoPlayerEl.src = '';
		if (videoCaptionEl) videoCaptionEl.textContent = 'Escanea un escudo para ver el video.';
		videoModal.hidden = false;
		videoModal.classList.add('is-open');
		currentVideoFilter = 0;
		renderVideoFilters();
		return;
	}

	const countryName = targetCountries[activeTargetIndex] || (teamVideos[activeTargetIndex] && teamVideos[activeTargetIndex].name) || '';
	const info = teamVideos[activeTargetIndex] || { name: countryName, file: null, caption: '' };
	const candidates = buildVideoCandidates(countryName, info.file);

	videoTitleEl.textContent = `Video - ${info.name || countryName || 'Selección'}`;
	videoPlayerEl.style.display = 'block';
	videoPlayerEl.hidden = false;
	if (videoCaptionEl) videoCaptionEl.textContent = info.caption || '';

	// Reproducir probando candidatos; si ninguno existe, muestra mensaje.
	playVideoWithCandidates(videoPlayerEl, candidates, () => {
		videoPlayerEl.src = '';
		if (videoCaptionEl) {
			videoCaptionEl.textContent = 'No hay video disponible para este país. Agrega un MP4 en assets/galeria con el nombre del país.';
		}
	});

	videoModal.hidden = false;
	videoModal.classList.add("is-open");
	currentVideoFilter = 0;
	renderVideoFilters();
}

function hideVideoModal() {
	if (!videoModal || !videoPlayerEl) {
		return;
	}
	videoPlayerEl.pause();
	videoPlayerEl.currentTime = 0;
	videoPlayerEl.removeAttribute('src');
	videoPlayerEl.load();
	if (videoCaptionEl) {
		videoCaptionEl.textContent = "";
	}
	videoModal.classList.remove("is-open");
	videoModal.hidden = true;
}

function updateVideoButtonState() {
	if (!videoButton) {
		return;
	}
	// Habilita el botón cuando hay un target activo; si el archivo no existe se mostrará aviso.
	const hasTarget = activeTargetIndex !== null && activeTargetIndex !== undefined;
	videoButton.setAttribute('aria-disabled', hasTarget ? 'false' : 'true');
}

function getVisualEffectLayout(target) {
	const fallback = {
		leftX: -0.24,
		centerX: 0,
		rightX: 0.24,
		topY: 0.52,
		bottomY: -0.52,
		z: -0.5,
	};

	const modelNode = target ? target._modelAdded : null;
	if (!modelNode || !window.THREE || !target.object3D) {
		return fallback;
	}

	try {
		modelNode.object3D.updateMatrixWorld(true);
		target.object3D.updateMatrixWorld(true);

		const box = new THREE.Box3().setFromObject(modelNode.object3D);
		if (box.isEmpty()) {
			return fallback;
		}

		const centerX = (box.min.x + box.max.x) * 0.5;
		const centerZ = (box.min.z + box.max.z) * 0.5;
		const topWorld = new THREE.Vector3(centerX, box.max.y, centerZ);
		const bottomWorld = new THREE.Vector3(centerX, box.min.y, centerZ);
		const leftWorld = new THREE.Vector3(box.min.x, box.max.y, centerZ);
		const rightWorld = new THREE.Vector3(box.max.x, box.max.y, centerZ);

		const topLocal = target.object3D.worldToLocal(topWorld.clone());
		const bottomLocal = target.object3D.worldToLocal(bottomWorld.clone());
		const leftLocal = target.object3D.worldToLocal(leftWorld.clone());
		const rightLocal = target.object3D.worldToLocal(rightWorld.clone());

		const modelWidth = Math.abs(rightLocal.x - leftLocal.x);
		const sideOffset = Math.max(0.2, modelWidth * 0.65);
		const topOffset = Math.max(0.1, modelWidth * 0.12);
		const bottomOffset = Math.max(0.1, modelWidth * 0.12);

		return {
			leftX: -sideOffset,
			centerX: 0,
			rightX: sideOffset,
			topY: topLocal.y + topOffset,
			bottomY: bottomLocal.y - bottomOffset,
			z: topLocal.z,
		};
	} catch (error) {
		return fallback;
	}
}

function createVisualEffectsNode(layout) {
	const vfxRoot = document.createElement("a-entity");
	vfxRoot.setAttribute("data-vfx-root", "true");
	vfxRoot.setAttribute("position", "0 0 0");

	const glintPositions = [
		`${layout.leftX.toFixed(3)} ${(layout.topY - 0.03).toFixed(3)} ${layout.z.toFixed(3)}`,
		`${layout.centerX.toFixed(3)} ${layout.topY.toFixed(3)} ${layout.z.toFixed(3)}`,
		`${layout.rightX.toFixed(3)} ${(layout.topY - 0.03).toFixed(3)} ${layout.z.toFixed(3)}`,
	];

	glintPositions.forEach((position, index) => {
		const glint = document.createElement("a-entity");
		glint.setAttribute("geometry", "primitive: box; width: 0.01; height: 0.16; depth: 0.01");
		glint.setAttribute("material", "color: #ffff00; emissive: #ffff00; emissiveIntensity: 2.2; opacity: 0.95; transparent: true");
		glint.setAttribute("position", position);
		glint.setAttribute(
			"animation__color",
			"property: material.color; dir: alternate; dur: 1800; loop: true; easing: easeInOutSine; to: #00f5ff"
		);
		glint.setAttribute(
			"animation__emissive",
			"property: material.emissive; dir: alternate; dur: 1800; loop: true; easing: easeInOutSine; to: #ff57d1"
		);
		if (index === 0) {
			glint.setAttribute("rotation", "0 0 -32");
		} else if (index === 2) {
			glint.setAttribute("rotation", "0 0 32");
		}
		glint.setAttribute(
			"animation__pulse",
			`property: scale; from: 1 0.65 1; to: 1 1.45 1; dur: ${560 + index * 120}; dir: alternate; loop: true; easing: easeInOutSine`
		);
		glint.setAttribute(
			"animation__fade",
			`property: material.opacity; from: 0.25; to: 1; dur: ${500 + index * 140}; dir: alternate; loop: true; easing: easeInOutSine`
		);
		vfxRoot.appendChild(glint);
	});

	const bottomGlintPositions = [
		`${layout.leftX.toFixed(3)} ${(layout.bottomY - 0.03).toFixed(3)} ${layout.z.toFixed(3)}`,
		`${layout.centerX.toFixed(3)} ${layout.bottomY.toFixed(3)} ${layout.z.toFixed(3)}`,
		`${layout.rightX.toFixed(3)} ${(layout.bottomY - 0.03).toFixed(3)} ${layout.z.toFixed(3)}`,
	];

	bottomGlintPositions.forEach((position, index) => {
		const glint = document.createElement("a-entity");
		glint.setAttribute("geometry", "primitive: box; width: 0.01; height: 0.16; depth: 0.01");
		glint.setAttribute("material", "color: #ffff00; emissive: #ffff00; emissiveIntensity: 2.2; opacity: 0.95; transparent: true");
		glint.setAttribute("position", position);
		glint.setAttribute(
			"animation__color",
			"property: material.color; dir: alternate; dur: 2000; loop: true; easing: easeInOutSine; to: #00f5ff"
		);
		glint.setAttribute(
			"animation__emissive",
			"property: material.emissive; dir: alternate; dur: 2000; loop: true; easing: easeInOutSine; to: #ff57d1"
		);
		if (index === 0) {
			glint.setAttribute("rotation", "0 0 -32");
		} else if (index === 2) {
			glint.setAttribute("rotation", "0 0 32");
		}
		glint.setAttribute(
			"animation__pulse",
			`property: scale; from: 1 0.65 1; to: 1 1.45 1; dur: ${560 + index * 120}; dir: alternate; loop: true; easing: easeInOutSine`
		);
		glint.setAttribute(
			"animation__fade",
			`property: material.opacity; from: 0.25; to: 1; dur: ${500 + index * 140}; dir: alternate; loop: true; easing: easeInOutSine`
		);
		vfxRoot.appendChild(glint);
	});

	return vfxRoot;
}

function applyVisualEffectToTarget(target) {
	if (!target || target.querySelector('[data-vfx-root="true"]')) {
		return;
	}
	const layout = getVisualEffectLayout(target);
	const vfxNode = createVisualEffectsNode(layout);
	target.appendChild(vfxNode);
	target._vfxAdded = vfxNode;
}

function removeVisualEffectFromTarget(target) {
	if (!target) {
		return;
	}
	const vfx = target.querySelector('[data-vfx-root="true"]');
	if (vfx) {
		vfx.remove();
	}
	target._vfxAdded = null;
}

function getActiveTargets() {
	const targets = document.querySelectorAll("a-entity[mindar-image-target]");
	const activeTargets = [];
	targets.forEach((target) => {
		if (target._modelAdded) {
			activeTargets.push(target);
		}
	});
	return activeTargets;
}

function refreshVisualEffects() {
	const targets = getActiveTargets();
	targets.forEach((target) => {
		if (visualEffectsEnabled) {
			applyVisualEffectToTarget(target);
		} else {
			removeVisualEffectFromTarget(target);
		}
	});
}

function updateVisualEffectsButton() {
	if (!effectsButton) {
		return;
	}
	effectsButton.classList.toggle("is-active", visualEffectsEnabled);
}

function toggleVisualEffects() {
	// Cambia el efecto de cámara en orden
	currentCameraEffect = (currentCameraEffect + 1) % cameraEffects.length;
	applyCameraEffect();
	updateVisualEffectsButton();
}

function applyCameraEffect() {
	const effect = cameraEffects[currentCameraEffect];
	let videoEl = document.querySelector('video');
	if (videoEl) {
		videoEl.style.filter = effect.filter;
	}
	if (effectsButton) {
		effectsButton.textContent = `Efecto: ${effect.name}`;
	}
}

// --- Model-specific effects (Luces / Partículas / Banners) ---
function toggleModelEffectsPanel() {
	let panel = document.getElementById('model-effects-panel');
	if (!panel) panel = createModelEffectsPanel();
	const wasOpen = panel.classList.contains('open');
	panel.classList.toggle('open');
	// if panel is being closed, save current toggles for this target
	if (wasOpen && !panel.classList.contains('open')) {
		saveModelEffectsPanelState(panel, activeTargetElement);
	}
	// refresh state to reflect current active target
	refreshModelEffectsPanel();
}

function createModelEffectsPanel() {
	// inject styles
	if (!document.getElementById('model-effects-style')) {
		const s = document.createElement('style');
		s.id = 'model-effects-style';
		s.textContent = `#model-effects-panel{position:fixed;right:16px;bottom:96px;z-index:140;background:rgba(12,17,22,0.9);color:#fff;padding:12px;border-radius:10px;min-width:220px;box-shadow:0 8px 28px rgba(0,0,0,0.45);font-family:inherit;display:none}#model-effects-panel.open{display:block}#model-effects-panel h4{margin:0 0 8px 0;font-size:13px}#model-effects-panel .row{display:flex;justify-content:space-between;align-items:center;margin:8px 0}#model-effects-panel .toggle{width:48px;height:26px;border-radius:18px;background:#2b3942;position:relative;border:none;cursor:pointer}#model-effects-panel .toggle.active{background:#1cc8e7}#model-effects-panel .toggle:after{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:#fff;top:4px;left:4px;transition:all .18s}#model-effects-panel .toggle.active:after{left:26px}#model-effects-panel .btn{margin-top:8px;padding:8px 10px;border-radius:8px;background:#1cc8e7;border:none;color:#052;font-weight:700;cursor:pointer}#model-effects-panel .btn.danger{background:#ff6b6b;color:#fff}`;
		document.head.appendChild(s);
	}

	const panel = document.createElement('div');
	panel.id = 'model-effects-panel';
	panel.innerHTML = `
		<h4>Efectos del modelo</h4>
		<div class="row"><div>Luces</div><button id="me-radioactive" class="toggle"></button></div>
		<div class="row"><div>Partículas</div><button id="me-particles" class="toggle"></button></div>
		<div class="row"><div>Banners</div><button id="me-banner" class="toggle"></button></div>

		<div style="display:flex;gap:8px;justify-content:space-between"><button id="me-apply" class="btn">Aplicar</button><button id="me-remove" class="btn danger">Remover</button></div>
	`;

	document.body.appendChild(panel);

	// wire buttons
	const partsBtn = panel.querySelector('#me-particles');
	const bannerBtn = panel.querySelector('#me-banner');
	const radBtn = panel.querySelector('#me-radioactive');
	const applyBtn = panel.querySelector('#me-apply');
	const removeBtn = panel.querySelector('#me-remove');
	partsBtn.addEventListener('click', () => partsBtn.classList.toggle('active'));
	bannerBtn.addEventListener('click', () => bannerBtn.classList.toggle('active'));
	if (radBtn) radBtn.addEventListener('click', () => radBtn.classList.toggle('active'));

	applyBtn.addEventListener('click', () => {
		if (!activeTargetElement) { alert('Escanea un modelo primero.'); return; }
		const targetRef = activeTargetElement;
		const opts = {
			particles: partsBtn.classList.contains('active'),
			banner: bannerBtn.classList.contains('active'),
			radioactive: !!(radBtn && radBtn.classList.contains('active'))
		};
		applyEffectsToTarget(targetRef, opts);
		targetRef._savedVfxOptions = { ...opts };
		// verify applied state and retry if necessary
		setTimeout(() => verifyAndFixEffects(targetRef, opts), 160);
	});

	removeBtn.addEventListener('click', () => {
		if (!activeTargetElement) { alert('Escanea un modelo primero.'); return; }
		// remove all model VFX (lights removed globally)
		removeParticlesFromTarget(activeTargetElement);
		removeBannerFromTarget(activeTargetElement);
		removeRadioactiveFromTarget(activeTargetElement);
		// update toggles
		partsBtn.classList.remove('active'); bannerBtn.classList.remove('active'); if (radBtn) radBtn.classList.remove('active');
		activeTargetElement._savedVfxOptions = { particles: false, banner: false, radioactive: false };
	});

	// if there is a saved config for this target, restore toggle states
	try {
		if (activeTargetElement && activeTargetElement._savedVfxOptions) {
			const s = activeTargetElement._savedVfxOptions;
			partsBtn.classList.toggle('active', !!s.particles);
			bannerBtn.classList.toggle('active', !!s.banner);
			if (radBtn) radBtn.classList.toggle('active', !!s.radioactive);
		}
	} catch (e) {}

	return panel;
}

function refreshModelEffectsPanel() {
	const panel = document.getElementById('model-effects-panel');
	if (!panel) return;
	const partsBtn = panel.querySelector('#me-particles');
	const bannerBtn = panel.querySelector('#me-banner');
	if (!activeTargetElement) {
		partsBtn.classList.remove('active'); bannerBtn.classList.remove('active');
		const radBtn = panel.querySelector('#me-radioactive');
		if (radBtn) radBtn.classList.remove('active');
		return;
	}
	// prefer actual applied VFX state; fall back to saved config if present
	const saved = activeTargetElement._savedVfxOptions || {};
	partsBtn.classList.toggle('active', (!!activeTargetElement._vfxParticles) || !!saved.particles);
	bannerBtn.classList.toggle('active', (!!activeTargetElement._vfxBanner) || !!saved.banner);
	const radBtn = panel.querySelector('#me-radioactive');
	if (radBtn) radBtn.classList.toggle('active', (!!activeTargetElement._vfxRadioactive) || !!saved.radioactive);
}

function saveModelEffectsPanelState(panel, target) {
	if (!panel) return;
	const targetRef = target || activeTargetElement;
	if (!targetRef) return;
	try {
		const partsBtn = panel.querySelector('#me-particles');
		const bannerBtn = panel.querySelector('#me-banner');
		const radBtn = panel.querySelector('#me-radioactive');
		targetRef._savedVfxOptions = {
			particles: !!(partsBtn && partsBtn.classList.contains('active')),
			banner: !!(bannerBtn && bannerBtn.classList.contains('active')),
			radioactive: !!(radBtn && radBtn.classList.contains('active')),
		};
	} catch (e) {}
	// keep saved options attached to the target element
}

function applyEffectsToTarget(target, opts) {
	if (!target) return;
	// lights effect removed/disabled globally; do not add per-target lights
	if (opts.particles) applyParticlesToTarget(target); else removeParticlesFromTarget(target);
	if (opts.banner) applyBannerToTarget(target); else removeBannerFromTarget(target);
	if (opts.radioactive) applyRadioactiveToTarget(target); else removeRadioactiveFromTarget(target);
}

// verify that requested effects are present on the target; attempt to fix and re-check
function verifyAndFixEffects(target, opts, attempt = 0) {
	if (!target) return;
	const status = {
		particles: !!target._vfxParticles,
		banner: !!target._vfxBanner,
		radioactive: !!target._vfxRadioactive,
	};
	const want = {
		particles: !!opts.particles,
		banner: !!opts.banner,
		radioactive: !!opts.radioactive,
	};
	let ok = true;
	Object.keys(want).forEach(k => { if (want[k] !== status[k]) ok = false; });
	if (ok) {
		// sync UI toggles with actual state
		refreshModelEffectsPanel();
		return true;
	}
	if (attempt >= 2) {
		alert('Algunos efectos no pudieron aplicarse correctamente. Intenta nuevamente.');
		refreshModelEffectsPanel();
		return false;
	}
	// try to fix mismatches
	// lights disabled globally: do not add per-target lights
	if (want.particles && !status.particles) applyParticlesToTarget(target);
	if (!want.particles && status.particles) removeParticlesFromTarget(target);
	if (want.banner && !status.banner) applyBannerToTarget(target);
	if (!want.banner && status.banner) removeBannerFromTarget(target);
	if (want.radioactive && !status.radioactive) applyRadioactiveToTarget(target);
	if (!want.radioactive && status.radioactive) removeRadioactiveFromTarget(target);
	// re-check after a short delay
	setTimeout(() => verifyAndFixEffects(target, opts, attempt + 1), 220);
}

function applyLightsToTarget(target) {
	// Lights effect has been disabled globally; ensure no per-target lights are added.
	try { removeLightsFromTarget(target); } catch (e) {}
	return;
}

function removeLightsFromTarget(target) {
	if (!target) return;
	const n = target.querySelector('[data-vfx-light-root]');
	if (n) n.remove();
	target._vfxLight = null;
	// if no ambient light exists in the scene, add a low-intensity default ambient
	try {
		const scene = document.querySelector('a-scene');
		if (scene) {
			const hasAmbient = !!scene.querySelector('[light][data-vfx-light-default-exclude]') || !!scene.querySelector('a-entity[light]');
			// more careful: if there are no light entities at all, add a safe ambient
			const anyLight = scene.querySelector('[light]');
			if (!anyLight) {
				const amb = document.createElement('a-entity');
				// use a stronger default ambient so model doesn't appear too dark after removing lights
				amb.setAttribute('light', 'type: ambient; color: #ffffff; intensity: 0.45');
				amb.setAttribute('data-vfx-default-ambient', 'true');
				scene.appendChild(amb);
			}
		}
	} catch (e) {}
}

function applyParticlesToTarget(target) {
	if (!target || target.querySelector('[data-vfx-particles]')) return;
	const root = document.createElement('a-entity');
	root.setAttribute('data-vfx-particles', 'true');
	root.setAttribute('position', '0 0 0');
	// fireworks/explosion: particles shoot out in random directions from model center
	const count = 48; // number of spark particles
	const colorDefault = '#ffffff';
	const colorRadio = '#53ff6a';
	const useRadio = !!target._vfxRadioactive;
	const baseColor = useRadio ? (target._vfxRadioactiveColor || colorRadio) : colorDefault;
	for (let i = 0; i < count; i++) {
		const s = document.createElement('a-sphere');
		// random direction on a sphere
		const theta = Math.random() * Math.PI * 2;
		const phi = Math.acos(2 * Math.random() - 1);
		const r = 0.9 + Math.random() * 1.2; // explosion radius
		const tx = (r * Math.sin(phi) * Math.cos(theta)).toFixed(3);
		const ty = (r * Math.cos(phi) + 0.2).toFixed(3); // bias slightly upward
		const tz = (r * Math.sin(phi) * Math.sin(theta)).toFixed(3);
		const startY = 0.08 + Math.random() * 0.05; // start near model center
		const baseRadius = 0.01 + Math.random() * 0.018;
		s.setAttribute('radius', baseRadius.toFixed(4));
		s.setAttribute('position', `0 ${startY.toFixed(3)} 0`);
		s.setAttribute('material', `color: ${baseColor}; emissive: ${baseColor}; emissiveIntensity: 1.8; opacity: 0.98; shader: standard`);
		// glow
		const glow = document.createElement('a-sphere');
		glow.setAttribute('radius', (baseRadius * 2.2).toFixed(4));
		glow.setAttribute('position', `0 ${startY.toFixed(3)} 0`);
		glow.setAttribute('material', `color: ${baseColor}; emissive: ${baseColor}; emissiveIntensity: 1.1; opacity: 0.18; shader: flat`);
		glow.setAttribute('class', 'vfx-particle-glow');
		const dur = 700 + Math.floor(Math.random() * 900);
		const delay = Math.floor(Math.random() * 900);
		// animate outwards
		s.setAttribute('animation__burst', `property: position; from: 0 ${startY.toFixed(3)} 0; to: ${tx} ${ty} ${tz}; dur: ${dur}; easing: easeOutCubic; loop: true; delay: ${delay}`);
		s.setAttribute('animation__fade', `property: material.opacity; from: 0.95; to: 0.0; dur: ${dur}; loop: true; delay: ${delay}`);
		s.setAttribute('animation__scale', `property: scale; from: 0.6 1 0.6; to: 0.2 0.2 0.2; dur: ${dur}; loop: true; delay: ${delay}`);
		// glow follows same motion but fades more
		glow.setAttribute('animation__burst', `property: position; from: 0 ${startY.toFixed(3)} 0; to: ${tx} ${ty} ${tz}; dur: ${dur}; easing: easeOutCubic; loop: true; delay: ${delay}`);
		glow.setAttribute('animation__fade', `property: material.opacity; from: 0.18; to: 0.0; dur: ${dur}; loop: true; delay: ${delay}`);
		root.appendChild(glow);
		root.appendChild(s);
	}
	target.appendChild(root);
	target._vfxParticles = root;
}

function setParticlesColorForTarget(target, color, radioactiveOn) {
	if (!target || !target._vfxParticles) return;
	const parts = target._vfxParticles.querySelectorAll('a-sphere');
	parts.forEach((p) => {
		try {
			if (p.classList.contains('vfx-particle-glow')) {
				if (radioactiveOn) {
					p.setAttribute('material', `color: ${color}; emissive: ${color}; emissiveIntensity: 1.1; opacity: 0.18; shader: flat`);
				} else {
					p.setAttribute('material', 'color: #ffffff; emissive: #ffffff; emissiveIntensity: 1.1; opacity: 0.18; shader: flat');
				}
			} else {
				if (radioactiveOn) {
					p.setAttribute('material', `color: ${color}; emissive: ${color}; emissiveIntensity: 1.8; opacity: 0.99; shader: standard`);
				} else {
					p.setAttribute('material', 'color: #ffffff; emissive: #ffffff; emissiveIntensity: 1.8; opacity: 0.99; shader: standard');
				}
			}
		} catch (e) {}
	});
}

function removeParticlesFromTarget(target) {
	if (!target) return;
	const n = target.querySelector('[data-vfx-particles]');
	if (n) n.remove();
	target._vfxParticles = null;
}

// Abreviaturas (FIFA/ISO) para mostrar en el banner según el país escaneado.
// La clave está normalizada igual que `normalizeCountryToken()` (sin acentos, sin espacios, en mayúsculas).
const countryAbbrByToken = {
	MEXICO: 'MEX',
	COREADELSUR: 'KOR',
	SUDAFRICA: 'RSA',
	CANADA: 'CAN',
	SUIZA: 'SUI',
	QATAR: 'QAT',
	BRASIL: 'BRA',
	MARRUECOS: 'MAR',
	ESCOCIA: 'SCO',
	HAITI: 'HAI',
	ESTADOSUNIDOS: 'USA',
	AUSTRALIA: 'AUS',
	PARAGUAY: 'PAR',
	ALEMANIA: 'GER',
	ECUADOR: 'ECU',
	COSTADEMARFIL: 'CIV',
	CURAZAO: 'CUW',
	HOLANDA: 'NED',
	JAPON: 'JPN',
	TUNEZ: 'TUN',
	BELGICA: 'BEL',
	IRAN: 'IRN',
	EGIPTO: 'EGY',
	NUEVAZELANDA: 'NZL',
	ESPANA: 'ESP',
	URUGUAY: 'URU',
	ARABIASAUDITA: 'KSA',
	CABOVERDE: 'CPV',
	FRANCIA: 'FRA',
	SENEGAL: 'SEN',
	NORUEGA: 'NOR',
	ARGENTINA: 'ARG',
	AUSTRIA: 'AUT',
	ARGELIA: 'ALG',
	JORDANIA: 'JOR',
	PORTUGAL: 'POR',
	COLOMBIA: 'COL',
	UZBEKISTAN: 'UZB',
	INGLATERRA: 'ENG',
	CROACIA: 'CRO',
	PANAMA: 'PAN',
	GHANA: 'GHA',
	BOSNIAYHERZEGOVINA: 'BIH',
	REPUBLICACHECA: 'CZE',
	IRAK: 'IRQ',
	SUECIA: 'SWE',
	TURQUIA: 'TUR',
	CONGO: 'CGO'
};

function getCountryAbbr(countryName) {
	const token = normalizeCountryToken(countryName);
	return token ? (countryAbbrByToken[token] || null) : null;
}

function applyBannerToTarget(target) {
	if (!target || target.querySelector('[data-vfx-banner]')) return;
	const banner = document.createElement('a-plane');
	// make banner larger so text is readable
	banner.setAttribute('width', '1.05'); banner.setAttribute('height', '0.26');
	banner.setAttribute('material', 'color: #1cc8e7; opacity: 0.95; side: double');
	banner.setAttribute('position', '0 1.02 0'); banner.setAttribute('rotation', '-22 0 0');
	banner.setAttribute('data-vfx-banner', 'true');
	// Prefer the human-readable model name (set on targetFound from modelMapping)
	let bannerLabel = (target._modelName || '').toString().trim();
	// If we have an abbreviation for this country, use it.
	const abbr = bannerLabel ? getCountryAbbr(bannerLabel) : null;
	if (abbr) bannerLabel = abbr;
	if (!bannerLabel) {
		// Fallback: try to detect texture name from the model
		let textureName = 'Modelo';
		try {
			const modelNode = target._modelAdded;
			if (modelNode && modelNode.getObject3D) {
				const obj = modelNode.getObject3D('mesh') || modelNode.getObject3D('model') || modelNode.object3D;
				if (obj) {
					let found = false;
					obj.traverse((node) => {
						if (found) return;
						if (node.isMesh && node.material) {
							const mats = Array.isArray(node.material) ? node.material : [node.material];
							for (let m of mats) {
								const map = m.map;
								if (map) {
									if (map.name) { textureName = map.name; found = true; break; }
									if (map.image && map.image.src) {
										try { textureName = map.image.src.split('/').pop().split('?')[0]; } catch(e) {}
										found = true; break;
									}
								}
							}
						}
					});
				}
			}
		} catch (e) { /* ignore */ }
		bannerLabel = textureName;
	}

	const text = document.createElement('a-entity');
	// larger text area and center alignment
	text.setAttribute('text', `value: ${bannerLabel}; align: center; color: #002; width: 2.2; wrapCount: 24;`);
	text.setAttribute('position', '0 0 0.02');
	// slight floating animation to draw attention
	text.setAttribute('animation__float', 'property: position; to: 0 0.02 0.02; dur: 1800; easing: easeInOutSine; loop: true; dir: alternate');
	banner.appendChild(text);
	target.appendChild(banner);
	target._vfxBanner = banner;
}

// --- Colores effect: dynamic emissive + soft particle corona ---
function applyRadioactiveToTarget(target) {
	if (!target || target._vfxRadioactive) return;
	target._vfxRadioactiveColor = '#53ff6a';
	// Add emissive override to model meshes
	const modelNode = target._modelAdded;
	const animatedMats = [];
	if (modelNode && modelNode.getObject3D) {
		const obj = modelNode.getObject3D('mesh') || modelNode.getObject3D('model') || modelNode.object3D;
		if (obj) {
			obj.traverse((node) => {
				if (node.isMesh && node.material) {
					const mats = Array.isArray(node.material) ? node.material : [node.material];
					mats.forEach((m) => {
						try {
							if (m.emissive) {
								m.userData = m.userData || {};
								// store previous emissive for restore
								if (m.userData._savedEmissive === undefined) {
									m.userData._savedEmissive = m.emissive ? m.emissive.clone() : new THREE.Color(0x000000);
									m.userData._savedEmissiveIntensity = m.emissiveIntensity || 0;
								}
								m.emissive = new THREE.Color('#53ff6a');
								m.emissiveIntensity = 1.6;
								m.userData._vfxSeed = Math.random() * Math.PI * 2;
								m.userData._vfxHueSeed = Math.random();
								animatedMats.push(m);
								m.needsUpdate = true;
							}
						} catch (e) { /* ignore if materials incompatible */ }
					});
				}
			});
		}
	}
	if (animatedMats.length) {
		// animate emissive color + intensity to create random color cycling
		target._vfxRadioactiveMats = animatedMats;
		if (target._vfxRadioactiveInterval) clearInterval(target._vfxRadioactiveInterval);
		target._vfxRadioactiveInterval = setInterval(() => {
			const t = performance.now() * 0.001;
			const hue = (t * 0.16) % 1;
			const dynamicColor = new THREE.Color().setHSL(hue, 0.95, 0.55);
			const hexColor = `#${dynamicColor.getHexString()}`;
			target._vfxRadioactiveColor = hexColor;
			target._vfxRadioactiveMats.forEach((m) => {
				try {
					const seed = m.userData && m.userData._vfxSeed ? m.userData._vfxSeed : 0;
					const hueSeed = m.userData && m.userData._vfxHueSeed ? m.userData._vfxHueSeed : 0;
					m.emissive = new THREE.Color().setHSL((hue + hueSeed * 0.15) % 1, 0.95, 0.52);
					m.emissiveIntensity = 1.0 + 0.6 * Math.sin(t * 2.0 + seed);
					m.needsUpdate = true;
				} catch (e) {}
			});
			// update corona rings with current color
			if (target._vfxRadioactiveCoronaNodes) {
				target._vfxRadioactiveCoronaNodes.forEach((p, idx) => {
					try {
						const op = (0.06 + idx * 0.012).toFixed(3);
						p.setAttribute('material', `color: ${hexColor}; opacity: ${op}; shader: flat; side: double`);
					} catch (e) {}
				});
			}
			// update dripping particles color too (if present)
			setParticlesColorForTarget(target, hexColor, true);
		}, 80);
	}

	// Add soft green corona using small planes/sprites
	const corona = document.createElement('a-entity');
	corona.setAttribute('data-vfx-radioactive', 'true');
	corona.setAttribute('position', '0 0.28 0');
	for (let i = 0; i < 6; i++) {
		const p = document.createElement('a-circle');
		const s = 0.22 + i * 0.02;
		p.setAttribute('radius', s.toFixed(3));
		p.setAttribute('material', 'color: #53ff6a; opacity: 0.12; shader: flat; side: double');
		p.setAttribute('rotation', '-90 0 0');
		p.setAttribute('position', `0 ${(-0.02 + i*0.01).toFixed(3)} ${(-0.02 - i*0.01).toFixed(3)}`);
		// subtle, out-of-sync animations to create a liquid/acido look
		const dur = 1400 + i * 220;
		p.setAttribute('animation__scale', `property: scale; to: 1.06 1.06 1; dur: ${dur}; easing: easeInOutSine; loop: true; dir: alternate`);
		p.setAttribute('animation__pos', `property: position; to: 0 ${(-0.01 + i*0.012).toFixed(3)} ${(-0.015 - i*0.015).toFixed(3)}; dur: ${dur * 1.1}; easing: easeInOutSine; loop: true; dir: alternate`);
		p.setAttribute('animation__opacity', `property: material.opacity; to: ${(0.02 + i*0.01).toFixed(3)}; dur: ${dur * 0.9}; easing: easeInOutSine; loop: true; dir: alternate`);
		p.setAttribute('animation__rot', `property: rotation; to: -90 ${ (i%2?12:-12) } 0; dur: ${dur*1.4}; easing: linear; loop: true`);
		corona.appendChild(p);
	}
	target.appendChild(corona);
	target._vfxRadioactive = corona;
	target._vfxRadioactiveCoronaNodes = Array.from(corona.querySelectorAll('a-circle'));
	// if particles are already present, update their color with current radioactive color
	try {
		setParticlesColorForTarget(target, target._vfxRadioactiveColor || '#53ff6a', true);
	} catch(e) {}
}

function removeRadioactiveFromTarget(target) {
	if (!target) return;
	const n = target.querySelector('[data-vfx-radioactive]'); if (n) n.remove(); target._vfxRadioactive = null;
	// clear any animation timers
	if (target._vfxRadioactiveInterval) {
		clearInterval(target._vfxRadioactiveInterval);
		target._vfxRadioactiveInterval = null;
	}
	if (target._vfxRadioactiveMats) {
		target._vfxRadioactiveMats = null;
	}
	if (target._vfxRadioactiveCoronaNodes) {
		target._vfxRadioactiveCoronaNodes = null;
	}
	target._vfxRadioactiveColor = null;
	// if particles are present, revert their color to white
	try {
		setParticlesColorForTarget(target, '#ffffff', false);
	} catch(e) {}
	// restore materials
	const modelNode = target._modelAdded;
	if (modelNode && modelNode.getObject3D) {
		const obj = modelNode.getObject3D('mesh') || modelNode.getObject3D('model') || modelNode.object3D;
		if (obj) {
			obj.traverse((node) => {
				if (node.isMesh && node.material) {
					const mats = Array.isArray(node.material) ? node.material : [node.material];
					mats.forEach((m) => {
						try {
							if (m.userData && m.userData._savedEmissive !== undefined) {
								m.emissive = m.userData._savedEmissive.clone();
								m.emissiveIntensity = m.userData._savedEmissiveIntensity || 0;
								delete m.userData._savedEmissive;
								delete m.userData._savedEmissiveIntensity;
								m.needsUpdate = true;
							}
						} catch (e) { /* ignore */ }
					});
				}
			});
		}
	}
}

function removeBannerFromTarget(target) { if (!target) return; const n = target.querySelector('[data-vfx-banner]'); if (n) n.remove(); target._vfxBanner = null; }


function registerAnimTargets() {
	const animTargets = document.querySelectorAll("[data-anim-model]");
	animTargets.forEach((target) => {
		target.addEventListener("targetFound", () => {
			const modelSelector = target.getAttribute("data-anim-model");
			if (!modelSelector) {
				return;
			}
			const model = document.querySelector(modelSelector);
			if (model) {
				activeAnimModel = model;
			}
		});

		target.addEventListener("targetLost", () => {
			const modelSelector = target.getAttribute("data-anim-model");
			if (!modelSelector || !activeAnimModel) {
				return;
			}
			const model = document.querySelector(modelSelector);
			if (model && model === activeAnimModel) {
				activeAnimModel = null;
				isAnimationRunning = false;
				if (animationButton) {
					animationButton.classList.remove("is-active");
				}
			}
		});
	});
}

function normalizeCountryToken(name) {
	return (name || '')
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toUpperCase()
		.replace(/[^A-Z0-9]/g, '');
}

function buildModelMapping(countries) {
	// Overrides para modelos existentes con nombre de archivo diferente al esquema `pelota{TOKEN}.glb`
	const overridesByName = {
		'Uruguay': { src: 'assets/pelotaURUGUAY2.glb' },
		'Cabo Verde': { src: 'assets/pelotaCABOVERDA.glb' },
		'Arabia Saudita': { src: 'assets/pelotaARABIASAU.glb' },
		// Archivos con nombres no estándar en /assets
		'Marruecos': { src: 'assets/pelotaMARRUECOSglb.glb' },
		'Argelia': { src: 'assets/pelotaALGERIA.glb' },
		'Tunez': { src: 'assets/pelotaTUNISIA.glb' },
		'Curazao': { src: 'assets/pelotaCURACAO.glb' },
	};

	// Fallback temporal: si el modelo del país no existe todavía, usa Uruguay.
	const defaultFallbackSrc = 'assets/pelotaURUGUAY2.glb';

	const mapping = {};
	(countries || []).forEach((countryName, idx) => {
		const token = normalizeCountryToken(countryName);
		const baseCfg = {
			name: countryName,
			src: `assets/pelota${token}.glb`,
			fallbackSrc: defaultFallbackSrc,
			position: '0 0 -0.5',
			scale: '80 80 80',
			rotateAnim: true,
		};
		const override = overridesByName[countryName] || {};
		mapping[idx] = { ...baseCfg, ...override };
	});
	return mapping;
}

// Mapping from targetIndex -> model configuration. Each target uses its own .glb
// file stored inside the `assets` folder.
const modelMapping = buildModelMapping(targetCountries);

function createModelNode(cfg, index) {
	let node;
	if (cfg.type === 'obj') {
		node = document.createElement('a-obj-model');
		node.setAttribute('src', cfg.src);
		if (cfg.mtl) node.setAttribute('mtl', cfg.mtl);
	} else {
		node = document.createElement('a-gltf-model');
		// Use cfg.src if provided
		if (cfg.src) node.setAttribute('src', cfg.src);
		// If model fails to load (missing file), swap to fallback once.
		if (cfg.fallbackSrc) {
			let didFallback = false;
			node.addEventListener('model-error', () => {
				if (didFallback) return;
				didFallback = true;
				try {
					console.warn('Modelo no encontrado/carga fallida. Usando fallback:', cfg.src, '->', cfg.fallbackSrc);
				} catch (e) {}
				node.setAttribute('src', cfg.fallbackSrc);
			});
		}
	}
	node.setAttribute('position', cfg.position || '0 0 -0.5');
	node.setAttribute('scale', cfg.scale || '0.2 0.2 0.2');
	if (cfg.rotation) node.setAttribute('rotation', cfg.rotation);
	node.setAttribute('id', `model-${index}`);
	return node;
}

function applyTextureToModel(el, textureUrl) {
	if (!window.THREE || !textureUrl) return;
	try {
		const loader = new THREE.TextureLoader();
		loader.load(textureUrl, (tex) => {
			const obj = el.getObject3D('mesh') || el.getObject3D('model') || el.object3D;
			if (!obj) return;
			obj.traverse((node) => {
				if (node.isMesh && node.material) {
					if (Array.isArray(node.material)) {
						node.material.forEach((m) => { m.map = tex; m.needsUpdate = true; });
					} else {
						node.material.map = tex;
						node.material.needsUpdate = true;
					}
				}
			});
		}, undefined, (err) => {
			console.warn('Error cargando textura:', textureUrl, err);
		});
	} catch (e) {
		console.warn('applyTextureToModel error', e);
	}
}

function registerDynamicTargets() {
	const targets = document.querySelectorAll('a-entity[mindar-image-target]');
		targets.forEach((t) => {
		// parse targetIndex from attribute string like "targetIndex: 0"
		const attr = t.getAttribute('mindar-image-target') || '';
		const m = attr.match(/targetIndex:\s*(\d+)/);
		if (!m) return;
		const idx = parseInt(m[1], 10);
		t.addEventListener('targetFound', () => {
			if (t._modelAdded) return;
			const cfg = modelMapping[idx];
			if (!cfg) return;
			t._modelName = (cfg.name || '').toString().trim();
			const modelNode = createModelNode(cfg, idx);
			t.appendChild(modelNode);
			t._modelAdded = modelNode;
			// If config has a specific clip, update the entity's data-anim-clip attribute
			if (cfg.clip) {
				t.setAttribute('data-anim-clip', cfg.clip);
			}
			// If config specifies rotation animation, set the data-rotate-anim flag
			if (cfg.rotateAnim) {
				t.setAttribute('data-rotate-anim', 'true');
			}
			// Ensure the animation system knows which model is currently active
			// so the Animacion button works per-model. Also set anim flag if present.
			activeAnimModel = modelNode;
			activeTargetElement = t;
			activeTargetIndex = idx;
			showScoreSim(idx);
			updateVideoButtonState();
			modelNode.addEventListener('model-loaded', () => {
				// Apply custom texture for this target (if provided)
				if (cfg.texture) {
					applyTextureToModel(modelNode, cfg.texture);
				}
				if (visualEffectsEnabled) {
					removeVisualEffectFromTarget(t);
					applyVisualEffectToTarget(t);
				}
			}, { once: true });
			if (visualEffectsEnabled) {
				applyVisualEffectToTarget(t);
			}
		});

		t.addEventListener('targetLost', () => {
			if (t._vfxAdded) {
				removeVisualEffectFromTarget(t);
			}
			// remove any model-specific VFX when target is lost
			removeLightsFromTarget(t);
			removeParticlesFromTarget(t);
			removeBannerFromTarget(t);
			// If the lost target was the active one, close the model effects panel to avoid stale UI
			try {
				const panel = document.getElementById('model-effects-panel');
				if (panel) {
					// save panel state to the target before removing
					saveModelEffectsPanelState(panel, t);
					panel.remove();
				}
			} catch (e) {}

			if (t._modelAdded) {
				if (activeAnimModel === t._modelAdded) {
					activeAnimModel = null;
					isAnimationRunning = false;
					if (animationButton) {
						animationButton.classList.remove("is-active");
					}
					updateVideoButtonState();
				}
				if (activeTargetIndex === idx) {
					activeTargetIndex = null;
								if (activeTargetElement === t) activeTargetElement = null;
					hideScoreSim(idx);
				}
				t.removeChild(t._modelAdded);
				t._modelAdded = null;
			}
		});
	});
}

function replaceSceneWith(mindPath) {
	const oldScene = document.querySelector('a-scene');
	if (!oldScene) return;
	// Update the imageTargetSrc value in the scene outerHTML
	let html = oldScene.outerHTML;
	// Replace the imageTargetSrc value (keep other options like autoStart)
	html = html.replace(/imageTargetSrc:\s*[^;]+;/, `imageTargetSrc: ${mindPath};`);
	const wrapper = document.createElement('div');
	wrapper.innerHTML = html.trim();
	const newScene = wrapper.firstElementChild;
	oldScene.parentNode.replaceChild(newScene, oldScene);

	// Re-register handlers after the new scene is in DOM
	requestAnimationFrame(() => {
		registerAnimTargets();
		registerDynamicTargets();
		animationButton = document.querySelector('#anim-btn');
		if (animationButton) {
			animationButton.removeEventListener('click', triggerActiveAnimation);
			animationButton.addEventListener('click', triggerActiveAnimation);
		}
		effectsButton = document.querySelector('#effects-btn');
		if (effectsButton) {
			effectsButton.removeEventListener('click', toggleVisualEffects);
			effectsButton.addEventListener('click', toggleVisualEffects);
			updateVisualEffectsButton();
		}
		dataButton = document.querySelector('#data-btn');
		dataModal = document.querySelector('#data-modal');
		dataTitleEl = document.querySelector('#data-title');
		dataBodyEl = document.querySelector('#data-body');
		dataCloseButton = document.querySelector('#data-close');
		videoButton = document.querySelector('#video-btn');
		videoModal = document.querySelector('#video-modal');
		videoTitleEl = document.querySelector('#video-title');
		videoMessageEl = document.querySelector('#video-message');
		videoPlayerEl = document.querySelector('#video-player');
		videoCaptionEl = document.querySelector('#video-caption');
		videoCloseButton = document.querySelector('#video-close');
		if (videoModal) {
			videoModal.hidden = true;
		}
		updateVideoButtonState();
		if (dataButton) {
			dataButton.removeEventListener('click', showDataModal);
			dataButton.addEventListener('click', showDataModal);
		}
		if (dataCloseButton) {
			dataCloseButton.removeEventListener('click', hideDataModal);
			dataCloseButton.addEventListener('click', hideDataModal);
		}
		if (videoButton) {
			videoButton.removeEventListener('click', showVideoModal);
			videoButton.addEventListener('click', showVideoModal);
		}
		if (videoCloseButton) {
			videoCloseButton.removeEventListener('click', hideVideoModal);
			videoCloseButton.addEventListener('click', hideVideoModal);
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	startCamera();
	registerAnimTargets();
	registerDynamicTargets();
	animationButton = document.querySelector("#anim-btn");
	if (animationButton) {
		animationButton.addEventListener("click", triggerActiveAnimation);
	}
	effectsButton = document.querySelector("#effects-btn");
	if (effectsButton) {
		effectsButton.addEventListener("click", toggleVisualEffects);
		updateVisualEffectsButton();
		applyCameraEffect(); // Aplica el efecto inicial (Normal)
	}
	const modelEffectsBtn = document.querySelector('#model-effects-btn');
	if (modelEffectsBtn) {
		modelEffectsBtn.addEventListener('click', () => {
			if (!activeTargetElement) {
				alert('Escanea un modelo primero.');
				return;
			}
			toggleModelEffectsPanel();
		});
	}
	dataButton = document.querySelector("#data-btn");
	dataModal = document.querySelector("#data-modal");
	dataTitleEl = document.querySelector("#data-title");
	dataCloseButton = document.querySelector("#data-close");
	videoButton = document.querySelector("#video-btn");
	videoModal = document.querySelector("#video-modal");
	videoTitleEl = document.querySelector("#video-title");
	videoMessageEl = document.querySelector("#video-message");
	videoPlayerEl = document.querySelector("#video-player");
	videoCaptionEl = document.querySelector("#video-caption");
	videoCloseButton = document.querySelector("#video-close");
	if (videoModal) {
		videoModal.classList.remove("is-open");
		videoModal.hidden = true;
	}
	updateVideoButtonState();
	if (dataButton) {
		dataButton.addEventListener("click", showDataModal);
	}
	if (dataCloseButton) {
		dataCloseButton.addEventListener("click", hideDataModal);
	}
	if (videoButton) {
		videoButton.addEventListener("click", showVideoModal);
	}
	if (videoCloseButton) {
		videoCloseButton.addEventListener("click", hideVideoModal);
	}

	// Ensure we remove any A-Frame loading overlay once the renderer starts.
	const sceneEl = document.querySelector('a-scene');
	if (sceneEl) {
		sceneEl.addEventListener('renderstart', () => {
			// hide potential A-Frame loaders
			const loaders = document.querySelectorAll('.a-loader, .a-spinner, .a-loading-screen');
			loaders.forEach(n => n.style.display = 'none');
			// re-register dynamic targets in case scene was replaced/blocked
			try {
				registerDynamicTargets();
				registerAnimTargets();
			} catch (e) {
				console.warn('Error re-registering targets after renderstart', e);
			}
			// Recalibrar Mind-AR al nuevo tamaño del contenedor
			window.dispatchEvent(new Event('resize'));
		}, { once: true });
	}
});
