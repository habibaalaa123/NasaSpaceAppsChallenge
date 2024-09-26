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
        question: "What is better for the environment?",
        options: [
            "Driving a car",
            "Riding a bicycle",
            "Taking a taxi",
            "Using a motorcycle"
        ],
        correctAnswer: "Riding a bicycle"
    },
    {
        question: "Which energy source is the cleanest?",
        options: [
            "Coal",
            "Solar",
            "Natural Gas",
            "Oil"
        ],
        correctAnswer: "Solar"
    },
    {
        question: "Which food has the highest carbon emissions?",
        options: [
            "Chicken",
            "Beef",
            "Lentils",
            "Rice"
        ],
        correctAnswer: "Beef"
    },
    {
        question: "What type of home saves the most energy?",
        options: [
            "Traditional home with high energy usage",
            "Energy-efficient home",
            "Old drafty house",
            "Shack without insulation"
        ],
        correctAnswer: "Energy-efficient home"
    },
    {
        question: "What can you do to help reduce waste?",
        options: [
            "Recycle plastic bottles",
            "Throw everything in the trash",
            "Buy more stuff",
            "Use disposable plates"
        ],
        correctAnswer: "Recycle plastic bottles"
    },
    {
        question: "How can using less water help the planet?",
        options: [
            "It saves energy",
            "It has no effect",
            "It increases emissions",
            "It makes you thirsty"
        ],
        correctAnswer: "It saves energy"
    },
    {
        question: "What is a renewable energy source?",
        options: [
            "Wind",
            "Coal",
            "Natural Gas",
            "Nuclear"
        ],
        correctAnswer: "Wind"
    },
    {
        question: "Which is the best way to travel short distances?",
        options: [
            "Walking",
            "Driving a car",
            "Taking a bus",
            "Using a helicopter"
        ],
        correctAnswer: "Walking"
    },
    {
        question: "What should you do with leftover food?",
        options: [
            "Throw it away",
            "Eat it or share it",
            "Let it spoil",
            "Feed it to pets"
        ],
        correctAnswer: "Eat it or share it"
    },
    {
        question: "Which of these helps save energy?",
        options: [
            "Leaving lights on",
            "Using energy-efficient bulbs",
            "Using more appliances",
            "Keeping the fridge open"
        ],
        correctAnswer: "Using energy-efficient bulbs"
    },
    {
        question: "What is a good way to reduce plastic use?",
        options: [
            "Using reusable bags",
            "Buying bottled water",
            "Using plastic straws",
            "Throwing trash on the ground"
        ],
        correctAnswer: "Using reusable bags"
    },
    {
        question: "How can you reduce your carbon footprint when shopping?",
        options: [
            "Buying local products",
            "Shopping online",
            "Using plastic bags",
            "Buying imported goods"
        ],
        correctAnswer: "Buying local products"
    },
    {
        question: "What can you do to save energy at home?",
        options: [
            "Using appliances during the day",
            "Unplugging devices when not in use",
            "Keeping windows open in winter",
            "Using incandescent bulbs"
        ],
        correctAnswer: "Unplugging devices when not in use"
    },
    {
        question: "How does carpooling help the environment?",
        options: [
            "Increases traffic",
            "Reduces the number of cars on the road",
            "Makes it harder to travel",
            "Costs more money"
        ],
        correctAnswer: "Reduces the number of cars on the road"
    },
    {
        question: "Which practice helps in conserving water?",
        options: [
            "Taking long showers",
            "Fixing leaky faucets",
            "Watering plants during the day",
            "Using a hose to wash the car"
        ],
        correctAnswer: "Fixing leaky faucets"
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
