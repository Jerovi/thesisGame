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
            { text: " Fishing", correct: false },
            { text: "Mining", correct: false },
            { text: "Textile manufacturing", correct: false }
        ]
    },
    {
        question: "Which fruit is commonly grown in Negros along with sugarcane?",
        difficulty: "Easy",
        answers: [
            { text: "Banana", correct: true },
            { text: "Cherry", correct: false },
            { text: "Strawberry", correct: false },
            { text: "Orange", correct: false }
        ]
    },
    {
        question: "What is the most common type of rice grown in Negros?",
        difficulty: "Easy",
        answers: [
            { text: "MangoLowland rice", correct: true },
            { text: "Upland rice", correct: false },
            { text: "Black rice", correct: false },
            { text: "Basmati rice", correct: false }
        ]
    },
    {
        question: "What is the capital of the Philippines?",
        difficulty: "Medium",
        answers: [
            { text: "Cebu", correct: false },
            { text: "Davao", correct: false },
            { text: "Manila", correct: true },
            { text: "Iloilo", correct: false }
        ]
    },
    {
        question: "What industry is Negros Island best known for?",
        difficulty: "Medium",
        answers: [
            { text: "Sugar production", correct: true },
            { text: " Fishing", correct: false },
            { text: "Mining", correct: false },
            { text: "Textile manufacturing", correct: false }
        ]
    },
    {
        question: "Which fruit is commonly grown in Negros along with sugarcane?",
        difficulty: "Medium",
        answers: [
            { text: "Banana", correct: true },
            { text: "Cherry", correct: false },
            { text: "Strawberry", correct: false },
            { text: "Orange", correct: false }
        ]
    },
    {
        question: "What is the most common type of rice grown in Negros?",
        difficulty: "Medium",
        answers: [
            { text: "MangoLowland rice", correct: true },
            { text: "Upland rice", correct: false },
            { text: "Black rice", correct: false },
            { text: "Basmati rice", correct: false }
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
    },
    {
        question: "What industry is Negros Island best known for?",
        difficulty: "Hard",
        answers: [
            { text: "Sugar production", correct: true },
            { text: " Fishing", correct: false },
            { text: "Mining", correct: false },
            { text: "Textile manufacturing", correct: false }
        ]
    },
    {
        question: "Which fruit is commonly grown in Negros along with sugarcane?",
        difficulty: "Hard",
        answers: [
            { text: "Banana", correct: true },
            { text: "Cherry", correct: false },
            { text: "Strawberry", correct: false },
            { text: "Orange", correct: false }
        ]
    },
    {
        question: "What is the most common type of rice grown in Negros?",
        difficulty: "Hard",
        answers: [
            { text: "MangoLowland rice", correct: true },
            { text: "Upland rice", correct: false },
            { text: "Black rice", correct: false },
            { text: "Basmati rice", correct: false }
        ]
    },
];

const difficultyButtons = document.querySelectorAll(".diff-btn");
const difficultySelection = document.getElementById("difficulty-selection");
const quizContainer = document.querySelector(".quiz");
const questionElement = document.getElementById("question");
const difficultyElement = document.getElementById("difficulty");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");

let selectedDifficulty = "";
let filteredQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Event Listeners for Difficulty Buttons
difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedDifficulty = button.dataset.difficulty;
        filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
        startQuiz();
    });
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    difficultySelection.style.display = "none"; // Hide difficulty selection
    quizContainer.style.display = "block"; // Show quiz
    
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = filteredQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    difficultyElement.innerHTML = `Difficulty: <strong>${currentQuestion.difficulty}</strong>`;

    setDifficultyColor(currentQuestion.difficulty);

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${filteredQuestions.length}!`;
    difficultyElement.innerHTML = "";
    
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < filteredQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < filteredQuestions.length) {
        handleNextButton();
    } else {
        resetQuiz();
    }
});

// Change background color based on difficulty
function setDifficultyColor(difficulty) {
    switch (difficulty) {
        case "Easy":
            difficultyElement.style.color = "green";
            break;
        case "Medium":
            difficultyElement.style.color = "orange";
            break;
        case "Hard":
            difficultyElement.style.color = "red";
            break;
    }
}

function resetQuiz() {
    difficultySelection.style.display = "block"; // Show difficulty selection
    quizContainer.style.display = "none"; // Hide quiz
}
