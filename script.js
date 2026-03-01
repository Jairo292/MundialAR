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
// Preguntas de trivia por país (puedes agregar más)
const triviaQuestions = {
	0: [ // México
		{
			q: "¿Cuántos equipos participarán en el Mundial 2026?",
			options: ["32", "40", "48", "64"],
			answer: 2
		},
		{
			q: "¿Cuántas ciudades sede tendrá México?",
			options: ["1", "2", "3", "4"],
			answer: 2
		},
		{
			q: "¿En qué año fue la primera Copa Mundial en México?",
			options: ["1970", "1986", "1994", "2026"],
			answer: 0
		}
	],
	2: [ // España (ejemplo)
		{
			q: "¿Cuántos Mundiales ha ganado España?",
			options: ["0", "1", "2", "3"],
			answer: 1
		},
		{
			q: "¿En qué año ganó España su primer Mundial?",
			options: ["2006", "2010", "2014", "2018"],
			answer: 1
		},
		{
			q: "¿Cuál es el apodo de la selección española?",
			options: ["La Roja", "La Verde", "La Celeste", "La Canarinha"],
			answer: 0
		}
	]
};

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
	document.getElementById('trivia-progress-label').textContent = `Pregunta ${triviaState.current+1} de 3`;
	document.getElementById('trivia-score').textContent = `${triviaState.score} puntos`;
	document.getElementById('trivia-progress-bar').style.width = `${((triviaState.current)/3)*100}%`;
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
	if (triviaState.current < 3) {
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
			activeAnimModel.setAttribute("animation", "property: rotation; to: 0 360 0; dur: 2000; easing: linear");
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
const teamData = {
       0: {
	       name: "México",
	       text: "La selección nacional de México es una de las más tradicionales de la CONCACAF y anfitriona de la Copa Mundial en 1970, 1986 y 2026. Ha ganado 11 Copas Oro y es reconocida por su afición y su historia en el fútbol internacional. ¡Escanea el escudo para ver el modelo 3D!",
       },
	   1: {
	       name: "Uruguay",
	       text: "La selección nacional de Uruguay es una de las más tradicionales de la CONCACAF y anfitriona de la Copa Mundial en 1970, 1986 y 2026. Ha ganado 11 Copas Oro y es reconocida por su afición y su historia en el fútbol internacional. ¡Escanea el escudo para ver el modelo 3D!",
       },
	   2: {
	       name: "España",
	       text: "La selección nacional de España es una de las más tradicionales de la CONCACAF y anfitriona de la Copa Mundial en 1970, 1986 y 2026. Ha ganado 11 Copas Oro y es reconocida por su afición y su historia en el fútbol internacional. ¡Escanea el escudo para ver el modelo 3D!",
       },
	   3: {
	       name: "Cabo Verde",
	       text: "La selección nacional de Cabo Verde es una de las más tradicionales de la CONCACAF y anfitriona de la Copa Mundial en 1970, 1986 y 2026. Ha ganado 11 Copas Oro y es reconocida por su afición y su historia en el fútbol internacional. ¡Escanea el escudo para ver el modelo 3D!",
       },
	   4: {
	       name: "Arabia Saudita",
	       text: "La selección nacional de Arabia Saudita es una de las más tradicionales de la CONCACAF y anfitriona de la Copa Mundial en 1970, 1986 y 2026. Ha ganado 11 Copas Oro y es reconocida por su afición y su historia en el fútbol internacional. ¡Escanea el escudo para ver el modelo 3D!",
       },
};

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
       }
};

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
}

function hideDataModal() {
	if (!dataModal) {
		return;
	}
	dataModal.classList.remove("is-open");
}

function showVideoModal() {
	if (!videoModal || !videoTitleEl || !videoPlayerEl) {
		return;
	}
	const info = teamVideos[activeTargetIndex];
	if (!info || !info.file) {
		videoTitleEl.textContent = "Video";
		videoPlayerEl.src = "";
		if (videoCaptionEl) videoCaptionEl.textContent = "No hay video disponible para este país.";
		videoModal.hidden = false;
		videoModal.classList.add("is-open");
		renderVideoFilters();
		return;
	}
	videoTitleEl.textContent = `Video - ${info.name}`;
	videoPlayerEl.src = `assets/galeria/${info.file}`;
	videoPlayerEl.style.display = "block";
	videoPlayerEl.hidden = false;
	videoPlayerEl.load();
	if (videoCaptionEl) {
		videoCaptionEl.textContent = info.caption || "";
	}
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
	const hasVideo = activeTargetIndex !== null && !!teamVideos[activeTargetIndex];
	videoButton.setAttribute("aria-disabled", hasVideo ? "false" : "true");
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

// Mapping from targetIndex -> model configuration. Restored scales for Mexico/Japon/Corea
// paso 2.
const modelMapping = {
	0: { type: 'glb', src: 'assets/pelotaMEXICO.glb', position: '0 0 -0.5', scale: '100 100 100', rotateAnim: true }, // México (usando modelo de Uruguay)
	1: { type: 'glb', src: 'assets/pelotaURUGUAY2.glb', position: '0 0 -0.5', scale: '100 100 100', rotateAnim: true },
	2: { type: 'glb', src: 'assets/pelotaESPANA.glb', position: '0 0 -0.5', scale: '100 100 100', rotateAnim: true }, 
	3: { type: 'glb', src: 'assets/pelotaCABOVERDA.glb', position: '0 0 -0.5', scale: '100 100 100', rotateAnim: true }, 
	4: { type: 'glb', src: 'assets/pelotaARABIASAU.glb', position: '0 0 -0.5', scale: '100 100 100', rotateAnim: true }
};

function createModelNode(cfg, index) {
	let node;
	if (cfg.type === 'obj') {
		node = document.createElement('a-obj-model');
		node.setAttribute('src', cfg.src);
		if (cfg.mtl) node.setAttribute('mtl', cfg.mtl);
	} else {
		node = document.createElement('a-gltf-model');
		node.setAttribute('src', cfg.src);
	}
	node.setAttribute('position', cfg.position || '0 0 -0.5');
	node.setAttribute('scale', cfg.scale || '0.2 0.2 0.2');
	if (cfg.rotation) node.setAttribute('rotation', cfg.rotation);
	node.setAttribute('id', `model-${index}`);
	return node;
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
			activeTargetIndex = idx;
			updateVideoButtonState();
			modelNode.addEventListener('model-loaded', () => {
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
		dataCloseButton.addEventListener("click", () => {
			if (dataModal) dataModal.classList.remove("is-open");
		});
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
		}, { once: true });
	}
});
