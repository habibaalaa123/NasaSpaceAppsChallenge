const landingPage = document.querySelector(".landing-page");
const storySection = document.querySelector(".story");
const quizSection = document.querySelector(".quiz");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const scoreElement = document.getElementById("score");
const countryOptionsContainer = document.getElementById("country-options-container");
const launchGameButton = document.getElementById("launch-game"); // Add this line

let currentQuestionIndex = 0;
let score = 0;

const countries = [
    "USA",
    "Canada",
    "Egypt",
    "Brazil",
];

const questions = [
    {
        question: "What is Net Biosphere Exchange (NBE)?",
        options: [
            "The rate of carbon uptake minus emissions from ecosystems.",
            "The amount of oxygen produced by plants.",
            "The total biomass in an ecosystem.",
            "The carbon stored in soils."
        ],
        correctAnswer: "The rate of carbon uptake minus emissions from ecosystems."
    },
    {
        question: "When is the highest NBE observed in North America?",
        options: [
            "March",
            "July",
            "November",
            "January"
        ],
        correctAnswer: "November"
    },
    {
        question: "What does NPP stand for?",
        options: [
            "Net Primary Production",
            "Nitrogen Production Process",
            "Natural Plant Photosynthesis",
            "Net Production of Plants"
        ],
        correctAnswer: "Net Primary Production"
    },
    {
        question: "During which season does NPP peak in North America?",
        options: [
            "Spring",
            "Winter",
            "Fall",
            "Summer"
        ],
        correctAnswer: "Summer"
    },
    {
        question: "What causes high photosynthesis rates in July?",
        options: [
            "Warm temperatures and full leaf coverage.",
            "Low rainfall.",
            "Cold temperatures.",
            "High carbon emissions."
        ],
        correctAnswer: "Warm temperatures and full leaf coverage."
    }
];

function showLandingPage() {
    landingPage.style.display = "";
    storySection.style.display = "none";
    quizSection.style.display = "none";
    currentQuestionIndex = 0; // Reset the question index
    score = 0; // Reset the score
    scoreElement.textContent = `Score: ${score}`; // Update score display
    countryOptionsContainer.innerHTML = ""; // Clear previous country options
    createCountryOptions(); // Create country options
}

function createCountryOptions() {
    countries.forEach((country) => {
        const countryOption = document.createElement("button");
        countryOption.textContent = country;
        countryOption.classList.add("country-option");
        countryOption.addEventListener("click", selectCountry);
        countryOptionsContainer.appendChild(countryOption);
    });
}

function selectCountry(event) {
    const selectedCountry = event.target;
    selectedCountry.style.backgroundColor = "lightblue"; // Highlight selected country
    landingPage.style.display = "none";
    storySection.style.display = "";
}

function showQuiz() {
    storySection.style.display = "none";
    quizSection.style.display = "";
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion) {
        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option) => {
            addOption(option);
        });
    } else {
        endQuiz();
    }
}

function addOption(text) {
    const optionElement = document.createElement("button");
    optionElement.textContent = text;
    optionElement.classList.add("option");
    optionElement.addEventListener("click", selectOption);
    optionsContainer.appendChild(optionElement);
}

function selectOption(event) {
    const selectedOption = event.target;
    const isCorrect = selectedOption.textContent === questions[currentQuestionIndex].correctAnswer;

    if (isCorrect) {
        score += 10; // Increase score by 10
        selectedOption.style.backgroundColor = "green"; // Correct answer
    } else {
        score -= 10; // Decrease score by 10
        selectedOption.style.backgroundColor = "red"; // Wrong answer
    }

    // Update score display
    scoreElement.textContent = `Score: ${score}`;

    // Disable all options after selection
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(option => {
        option.disabled = true; // Disable all options after one is clicked
        // Highlight incorrect options
        if (option.textContent !== questions[currentQuestionIndex].correctAnswer) {
            option.style.backgroundColor = "red"; // Highlight incorrect option
        } else {
            option.style.backgroundColor = "green"; // Highlight correct answer if not selected
        }
    });

    // Automatically move to the next question after a short delay
    setTimeout(() => {
        nextQuestion();
    }, 1000); // 1 second delay before proceeding to the next question
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.textContent = `Quiz Completed! Your score is: ${score} / ${questions.length * 10}`;
    optionsContainer.style.display = 'none';
}

// Event listener for Launch Game button
launchGameButton.addEventListener("click", () => {
    showQuiz(); // Directly show the quiz section
});

// Initial setup
showLandingPage();
