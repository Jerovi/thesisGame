const questions = [
    {
        question: "What is the common fruit in Negros Islands?",
        difficulty: "Easy",
        answers: [
            { text: "Mango", correct: true },
            { text: "Apple", correct: false },
            { text: "Banana", correct: false },
            { text: "Orange", correct: false }
        ]
    },
    {
        question: "What industry is Negros Island best known for?",
        difficulty: "Easy",
        answers: [
            { text: "Sugar production", correct: true },
            { text: "Fishing", correct: false },
            { text: "Mining", correct: false },
            { text: "Textile manufacturing", correct: false }
        ]
    },
    {
        question: "What is the capital of the Philippines?",
        difficulty: "Medium",
        answers: [
            { text: "Cebu", correct: false },
            { text: "Manila", correct: true },
            { text: "Davao", correct: false },
            { text: "Iloilo", correct: false }
        ]
    },
    {
        question: "Which ocean is the largest?",
        difficulty: "Hard",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false }
        ]
    }
];

// ELEMENTS
const questionEl = document.getElementById("question");
const answerBtns = document.querySelector(".answer-buttons");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");
const difficultyEl = document.getElementById("difficulty");
const highScoreEl = document.getElementById("high-score");

// GAME STATE
let score = 0;
let lives = 3;
let timer = 10;
let interval;
let currentDifficulty = "Easy";
let filteredQuestions = [];
let currentQuestionIndex = 0;

// START GAME
startGame();

function startGame() {
    score = 0;
    lives = 3;
    currentDifficulty = "Easy";
    currentQuestionIndex = 0;

    loadQuestions();
    updateUI();
    showQuestion();
}

// LOAD & SHUFFLE QUESTIONS
function loadQuestions() {
    filteredQuestions = questions.filter(q => q.difficulty === currentDifficulty);
    shuffleArray(filteredQuestions);
}

// SHOW QUESTION
function showQuestion() {
    resetState();
    startTimer();

    const currentQuestion = filteredQuestions[currentQuestionIndex];

    questionEl.innerText = currentQuestion.question;
    difficultyEl.innerText = `Difficulty: ${currentDifficulty}`;
    setDifficultyColor();

    shuffleArray(currentQuestion.answers);
    currentQuestion.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = ans.text;
        btn.dataset.correct = ans.correct;
        btn.addEventListener("click", selectAnswer);
        answerBtns.appendChild(btn);
    });
}

// TIMER
function startTimer() {
    clearInterval(interval);
    timer = 10;
    timerEl.innerText = `⏱️ ${timer}`;

    interval = setInterval(() => {
        timer--;
        timerEl.innerText = `⏱️ ${timer}`;
        if (timer === 0) {
            clearInterval(interval);
            loseLife();
        }
    }, 1000);
}

// ANSWER SELECT
function selectAnswer(e) {
    clearInterval(interval);
    const correct = e.target.dataset.correct === "true";

    if (correct) {
        score++;
        e.target.classList.add("correct");
        updateDifficulty();
    } else {
        e.target.classList.add("incorrect");
        loseLife();
    }

    disableAnswers();
    updateUI();
    nextBtn.style.display = "block";
}

// LOSE LIFE
function loseLife() {
    lives--;
    updateUI();

    if (lives <= 0) {
        endGame();
    } else {
        nextBtn.style.display = "block";
    }
}

// DISABLE ANSWERS
function disableAnswers() {
    [...answerBtns.children].forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === "true") btn.classList.add("correct");
    });
}

// NEXT QUESTION
nextBtn.onclick = () => {
    currentQuestionIndex++;

    if (currentQuestionIndex >= filteredQuestions.length) {
        currentQuestionIndex = 0;
        loadQuestions();
    }

    showQuestion();
};

// DIFFICULTY PROGRESSION
function updateDifficulty() {
    if (score === 10) {
        currentDifficulty = "Medium";
        currentQuestionIndex = 0;
        loadQuestions();
    }
    if (score === 20) {
        currentDifficulty = "Hard";
        currentQuestionIndex = 0;
        loadQuestions();
    }
}

// END GAME
function endGame() {
    clearInterval(interval);
    saveHighScore();

    questionEl.innerText = "💀 Game Over";
    difficultyEl.innerText = `Final Score: ${score}`;
    answerBtns.innerHTML = "";
    nextBtn.innerText = "Play Again";
    nextBtn.style.display = "block";
    nextBtn.onclick = startGame;
}

// HIGH SCORE
function saveHighScore() {
    const highScore = localStorage.getItem("highScore") || 0;
    if (score > highScore) {
        localStorage.setItem("highScore", score);
    }
    highScoreEl.innerText = `🏆 High Score: ${localStorage.getItem("highScore")}`;
}

// UI
function updateUI() {
    scoreEl.innerText = `Score: ${score}`;
    livesEl.innerText = "❤️".repeat(lives);
    highScoreEl.innerText = `🏆 High Score: ${localStorage.getItem("highScore") || 0}`;
}

// UTIL
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function resetState() {
    nextBtn.style.display = "none";
    answerBtns.innerHTML = "";
}

function setDifficultyColor() {
    difficultyEl.style.color =
        currentDifficulty === "Easy" ? "green" :
        currentDifficulty === "Medium" ? "orange" : "red";
}
