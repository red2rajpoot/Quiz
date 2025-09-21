// Questions list
const questions = [
    {
        question: "Bharat ki rajdhani kya hai?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        correctAnswer: "Delhi"
    },
    {
        question: "Taj Mahal kis sheher mein hai?",
        options: ["Jaipur", "Agra", "Lucknow", "Pune"],
        correctAnswer: "Agra"
    },
    {
        question: "Duniya ka sabse uncha parvat kaunsa hai?",
        options: ["K2", "Mount Everest", "Lhotse", "Kangchenjunga"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Kaun sa grah Lal Grah (Red Planet) ke naam se jaana jaata hai?",
        options: ["Shukra", "Mangal", "Brihaspati", "Shani"],
        correctAnswer: "Mangal"
    },
    {
        question: "Olympic games kitne saal mein ek baar hote hain?",
        options: ["2", "3", "4", "5"],
        correctAnswer: "4"
    }
];

// HTML elements ko select karein
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const usernameInput = document.getElementById('username');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const timerElement = document.getElementById('timer');
const resultNameElement = document.getElementById('result-name');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// Variables for quiz state
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timer;
let timeLeft = 10; // Time in seconds for each question

// Function to start the quiz
startButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        startScreen.classList.remove('active');
        quizScreen.classList.add('active');
        resultNameElement.textContent = username; // Set the name for result screen
        startQuiz();
    } else {
        alert("Kripya apna naam likhein!");
    }
});

// Function to display questions and options
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    
    // Clear previous timer and set new one
    clearInterval(timer);
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    startTimer();

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            checkAnswer(null); // Move to next question if time runs out
        }
    }, 1000);
}

// Function to check user's answer
function checkAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('button');

    optionButtons.forEach(button => {
        if (button.textContent === currentQuestion.correctAnswer) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
        button.disabled = true; // Disable buttons after an answer is selected
    });

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1500); // 1.5 seconds delay before next question
}

// Function to show the final result
function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreElement.textContent = `Aapka score hai: ${score} out of ${questions.length}`;

    // Show the pie chart
    const ctx = document.getElementById('resultChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Sahi Jawab', 'Galat Jawab'],
            datasets: [{
                data: [correctAnswers, incorrectAnswers],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

// Restart the quiz
restartButton.addEventListener('click', () => {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    usernameInput.value = ''; // Clear username input
});
