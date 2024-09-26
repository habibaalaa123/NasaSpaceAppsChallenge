const storyContent = [
    "Welcome to our journey through the impact of climate change. Every day, our planet faces new challenges.",
    "Did you know that greenhouse gases are rising at an unprecedented rate? These gases trap heat in the atmosphere.",
    "In North America, the highest levels of carbon uptake occur during the fall. But why?",
    "Trees and plants, in their peak season, absorb more carbon dioxide as they grow. This is known as Net Primary Production (NPP).",
    "However, the effects of climate change disrupt these natural processes. Warmer temperatures lead to changes in plant behavior.",
    "In July, high photosynthesis rates occur, boosting NPP. But what happens when extreme weather strikes?",
    "As we continue our journey, it's vital to understand our role in mitigating these effects. Together, we can make a difference!",
    "Now that you've learned about the climate story, it's time to test your knowledge with a quiz!"
];

let currentStoryIndex = 0;

function showStory() {
    landingPage.style.display = "none";
    storySection.style.display = "";
    currentStoryIndex = 0; // Reset the story index
    displayStoryText(); // Start displaying the story
}

function displayStoryText() {
    if (currentStoryIndex < storyContent.length) {
        const storyTextElement = document.getElementById("story-text");
        storyTextElement.textContent = storyContent[currentStoryIndex];
    } else {
        showQuiz(); // Proceed to the quiz once the story is complete
    }
}

document.getElementById("next-button").addEventListener("click", function() {
    currentStoryIndex++;
    displayStoryText();
});

// Call showStory when you want to start the story
showStory();
