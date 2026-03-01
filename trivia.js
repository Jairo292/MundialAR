// Trivia Questions Database
const triviaQuestions = {
	normal: [
		{
			question: "¿En qué año se celebró la primera Copa Mundial de la FIFA y quién fue el país anfitrión?",
			options: [
				"1934, Italia",
				"1928, Países Bajos",
				"1930, Brasil",
				"1930, Uruguay"
			],
			correct: 3
		},
		{
			question: "¿Quién ostenta el récord de ser el máximo goleador en la historia de los Mundiales (hombres)?",
			options: [
				"Pelé",
				"Ronaldo Nazário",
				"Lionel Messi",
				"Miroslav Klose"
			],
			correct: 3
		},
		{
			question: "¿Cuál es la única selección que ha participado en todas las ediciones de la Copa del Mundo?",
			options: [
				"Alemania",
				"Italia",
				"Argentina",
				"Brasil"
			],
			correct: 3
		},
		{
			question: "¿Qué jugador ha ganado más veces la Copa del Mundo como futbolista?",
			options: [
				"Diego Maradona",
				"Cafú",
				"Franz Beckenbauer",
				"Pelé"
			],
			correct: 3
		},
		{
			question: "¿Qué selección europea ganó cuatro títulos mundiales, pero no logró clasificar a los torneos de 2018 y 2022?",
			options: [
				"Francia",
				"España",
				"Inglaterra",
				"Italia"
			],
			correct: 3
		},
		{
			question: "¿Quién tiene el récord de más goles anotados en un solo partido de un Mundial?",
			options: [
				"Just Fontaine",
				"Eusébio",
				"Gerd Müller",
				"Oleg Salenko"
			],
			correct: 3
		},
		{
			question: "¿En qué Mundial se utilizó por primera vez el sistema de Videoarbitraje (VAR)?",
			options: [
				"Brasil 2014",
				"Qatar 2022",
				"Sudáfrica 2010",
				"Rusia 2018"
			],
			correct: 3
		},
		{
			question: "¿Qué país africano fue el primero en alcanzar las semifinales de un Mundial?",
			options: [
				"Camerún",
				"Senegal",
				"Ghana",
				"Marruecos"
			],
			correct: 3
		},
		{
			question: "¿Cuál es el nombre del trofeo actual que se entrega al ganador del Mundial?",
			options: [
				"Trofeo Jules Rimet",
				"Copa Victoria",
				"Trofeo de Oro Macizo",
				"Trofeo de la Copa Mundial de la FIFA"
			],
			correct: 3
		},
		{
			question: "¿Quién fue el director técnico de la selección de Argentina en el Mundial de México 1986?",
			options: [
				"César Luis Menotti",
				"Lionel Scaloni",
				"Alfio Basile",
				"Carlos Salvador Bilardo"
			],
			correct: 3
		}
	],
	expert: [
		{
			question: "¿Quién es el único jugador que ha anotado goles en dos finales de Mundiales distintas para la misma selección, ganando ambas?",
			options: [
				"Zinedine Zidane",
				"Vavá",
				"Kylian Mbappé",
				"Pelé"
			],
			correct: 3
		},
		{
			question: "¿Qué selección posee el récord de haber disputado más finales de la Copa del Mundo en la historia?",
			options: [
				"Brasil",
				"Alemania",
				"Italia",
				"Argentina"
			],
			correct: 1
		},
		{
			question: "¿Cuál fue el primer portero en la historia de los Mundiales en detener dos penaltis en una misma tanda de desempate?",
			options: [
				"Harald Schumacher",
				"Sergio Goycochea",
				"Lev Yashin",
				"Ricardo"
			],
			correct: 0
		},
		{
			question: "¿Qué curiosidad ocurrió con la selección de la India en el Mundial de Brasil 1950?",
			options: [
				"Se retiraron porque la FIFA no les permitió jugar descalzos",
				"Fueron eliminados por sorteo tras empatar todos sus puntos.",
				"Ganaron el premio al Fair Play sin jugar un solo minuto.",
				"Anotaron el gol más rápido de la historia en ese entonces."
			],
			correct: 0
		},
		{
			question: "¿Quién es el único entrenador que ha ganado dos Mundiales de forma consecutiva?",
			options: [
				"Vittorio Pozzo",
				"Vicente del Bosque",
				"Mário Zagallo",
				"Carlos Bilardo"
			],
			correct: 0
		},
		{
			question: "¿En qué Mundial se produjo el famoso 'Gol del Siglo' y 'La Mano de Dios', ambos en el mismo partido?",
			options: [
				"México 1970",
				"España 1982",
				"México 1986",
				"Italia 1990"
			],
			correct: 2
		},
		{
			question: "¿Qué jugador tiene el récord de haber disputado la mayor cantidad de partidos en fases finales de Mundiales?",
			options: [
				"Lothar Matthäus",
				"Lionel Messi",
				"Cristiano Ronaldo",
				"Miroslav Klose"
			],
			correct: 1
		},
		{
			question: "¿Cuál es el resultado más abultado registrado en la historia de los Mundiales?",
			options: [
				"Hungría - El Salvador",
				"Alemania - Brasil",
				"Yugoslavia - Zaire",
				"Portugal - Corea del Norte"
			],
			correct: 0
		},
		{
			question: "¿Quién fue el primer jugador en ser expulsado en una final de un Mundial?",
			options: [
				"Zinedine Zidane",
				"Pedro Monzón",
				"Marcel Desailly",
				"John Heitinga"
			],
			correct: 1
		},
		{
			question: "¿Qué selección ostenta el récord de la racha más larga de partidos invictos en la historia de los Mundiales?",
			options: [
				"Brasil",
				"España",
				"Alemania",
				"Italia"
			],
			correct: 0
		}
	]
};

// Game State
let currentLevel = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedAnswer = null;

// DOM Elements
const levelSelection = document.getElementById('levelSelection');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const levelButtons = document.querySelectorAll('.level-btn');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const progressFill = document.getElementById('progressFill');
const scoreValue = document.getElementById('scoreValue');
const finalScore = document.getElementById('finalScore');
const resultsTitle = document.getElementById('resultsTitle');
const resultsMessage = document.getElementById('resultsMessage');
const resultsIcon = document.getElementById('resultsIcon');
const restartBtn = document.getElementById('restartBtn');
const exitQuizBtn = document.getElementById('exitQuizBtn');
const exitModal = document.getElementById('exitModal');
const cancelExitBtn = document.getElementById('cancelExitBtn');
const confirmExitBtn = document.getElementById('confirmExitBtn');

// Event Listeners
levelButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		currentLevel = btn.dataset.level;
		startQuiz();
	});
});

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', resetQuiz);

// Exit Quiz Modal
exitQuizBtn.addEventListener('click', () => {
	exitModal.style.display = 'flex';
});

cancelExitBtn.addEventListener('click', () => {
	exitModal.style.display = 'none';
});

confirmExitBtn.addEventListener('click', () => {
	exitModal.style.display = 'none';
	resetQuiz();
});

// Close modal when clicking outside
exitModal.addEventListener('click', (e) => {
	if (e.target === exitModal) {
		exitModal.style.display = 'none';
	}
});

// Initialize Quiz
function startQuiz() {
	questions = [...triviaQuestions[currentLevel]];
	currentQuestionIndex = 0;
	score = 0;
	selectedAnswer = null;

	levelSelection.style.display = 'none';
	quizScreen.style.display = 'block';
	resultsScreen.style.display = 'none';

	totalQuestionsSpan.textContent = questions.length;
	scoreValue.textContent = score;

	loadQuestion();
}

// Load Current Question
function loadQuestion() {
	const question = questions[currentQuestionIndex];
	
	questionText.textContent = question.question;
	currentQuestionSpan.textContent = currentQuestionIndex + 1;
	
	// Update progress bar
	const progress = ((currentQuestionIndex) / questions.length) * 100;
	progressFill.style.width = `${progress}%`;

	// Clear previous options
	optionsContainer.innerHTML = '';
	selectedAnswer = null;
	nextBtn.style.display = 'none';

	// Create option buttons
	question.options.forEach((option, index) => {
		const btn = document.createElement('button');
		btn.className = 'option-btn';
		btn.textContent = option;
		btn.addEventListener('click', () => selectAnswer(index, btn));
		optionsContainer.appendChild(btn);
	});
}

// Handle Answer Selection
function selectAnswer(answerIndex, button) {
	if (selectedAnswer !== null) return; // Already answered
	
	selectedAnswer = answerIndex;
	const question = questions[currentQuestionIndex];
	const allOptions = optionsContainer.querySelectorAll('.option-btn');

	// Disable all buttons
	allOptions.forEach(btn => btn.disabled = true);

	// Check if correct
	if (answerIndex === question.correct) {
		button.classList.add('correct');
		score++;
		scoreValue.textContent = score;
	} else {
		button.classList.add('incorrect');
		// Show correct answer
		allOptions[question.correct].classList.add('correct');
	}

	// Show next button after a delay
	setTimeout(() => {
		nextBtn.style.display = 'block';
	}, 800);
}

// Next Question
function nextQuestion() {
	currentQuestionIndex++;

	if (currentQuestionIndex < questions.length) {
		loadQuestion();
	} else {
		showResults();
	}
}

// Show Results
function showResults() {
	quizScreen.style.display = 'none';
	resultsScreen.style.display = 'block';

	finalScore.textContent = score;

	// Determine message and icon based on score
	const percentage = (score / questions.length) * 100;

	if (percentage === 100) {
		resultsIcon.textContent = '🏆';
		resultsTitle.textContent = '¡Perfecto!';
		resultsMessage.textContent = '¡Increíble! Has respondido todas las preguntas correctamente. Eres un verdadero experto del fútbol mundial.';
	} else if (percentage >= 80) {
		resultsIcon.textContent = '⭐';
		resultsTitle.textContent = '¡Excelente!';
		resultsMessage.textContent = '¡Muy bien! Tienes un gran conocimiento sobre la Copa del Mundo.';
	} else if (percentage >= 60) {
		resultsIcon.textContent = '👍';
		resultsTitle.textContent = '¡Bien hecho!';
		resultsMessage.textContent = 'Buen trabajo. Conoces bastante sobre los Mundiales de fútbol.';
	} else if (percentage >= 40) {
		resultsIcon.textContent = '📚';
		resultsTitle.textContent = '¡Sigue practicando!';
		resultsMessage.textContent = 'No está mal, pero hay mucho más por aprender sobre la historia del Mundial.';
	} else {
		resultsIcon.textContent = '💪';
		resultsTitle.textContent = '¡Inténtalo de nuevo!';
		resultsMessage.textContent = 'No te desanimes. La práctica hace al maestro. ¡Aprende más sobre los Mundiales e inténtalo nuevamente!';
	}
}

// Reset Quiz
function resetQuiz() {
	currentLevel = null;
	currentQuestionIndex = 0;
	score = 0;
	selectedAnswer = null;

	levelSelection.style.display = 'block';
	quizScreen.style.display = 'none';
	resultsScreen.style.display = 'none';
	
	progressFill.style.width = '0%';
}
