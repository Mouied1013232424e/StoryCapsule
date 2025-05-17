// Password protection
const CORRECT_PASSWORD = 'pumkin';
const container = document.querySelector('.container');
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');

function checkPassword() {
    const enteredPassword = passwordInput.value.toLowerCase();
    if (enteredPassword === CORRECT_PASSWORD.toLowerCase()) {
        passwordModal.style.display = 'none';
        container.style.display = 'block';
        showCustomAlert('Welcome! 🌟\nHere to keep you company while I am away 💝', 'success');
        createFallingEmojis();
    } else {
        passwordError.style.display = 'block';
        passwordInput.value = '';
        showCustomAlert('Wrong password... Try again! 🔐', 'error');
    }
}

// Handle Enter key in password input
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Clear error message when typing
passwordInput.addEventListener('input', () => {
    passwordError.style.display = 'none';
});

// Story data structure
const stories = {
    'story1': {
        question: 'On what date did we say \'I love you\'?',
        choices: [
            'February 14, 2024',
            'February 15, 2024',
            'February 16, 2024',
            'March 1, 2024'
        ],
        correctAnswer: 'February 15, 2024',
        storyUrl: 'https://drive.google.com/file/d/1pFOpU_6Ewbd8As-y4EHyKdVH7k4Vw0UF/view?usp=sharing'
    },
    'story2': {
        question: 'What is the iconic year for us going to be Wink Wink?',
        choices: [
            '2025-2026',
            '2026-2027',
            '2027-2028',
            '2028-2029'
        ],
        correctAnswer: '2027-2028',
        storyUrl: 'https://drive.google.com/file/d/13k2Y18GzWCTsrLrZCiga_6iHk7pXRb9K/view?usp=sharing'
    },
    'story3': {
        question: 'What food made you have a stomachache?',
        choices: [
            'Pizza',
            'Burgers',
            'Tacos',
            'Pasta'
        ],
        correctAnswer: 'Tacos',
        storyUrl: 'https://drive.google.com/file/d/1oFZqqjLVngyosTRA2LzXUpkL4jCeiZZc/view?usp=sharing'
    },
    'story4': {
        question: 'What math equation did Mouied spend one full hour trying to explain one morning?',
        choices: [
            'Cosine function',
            'Sine function',
            'Antiderivative of ln(x)',
            'e^x'
        ],
        correctAnswer: 'Antiderivative of ln(x)',
        storyUrl: 'https://drive.google.com/file/d/14HGEre2JahljeLClrRpqZI84X1yRMYqE/view?usp=sharing'
    },
    'story5': {
        question: 'What type of place does Mouied want to live in?',
        choices: [
            'Apartment',
            'Condo',
            'Penthouse',
            'House'
        ],
        correctAnswer: 'House',
        storyUrl: 'https://drive.google.com/file/d/1walB_A9gR7y-Y-OlZDVc4YzbADvTiR1c/view?usp=sharing'
    },
    'story6': {
        question: 'Who is Mouied\'s favorite soccer player?',
        choices: [
            'Cristiano Ronaldo',
            'Neymar Jr.',
            'Messi',
            'Barcelona'
        ],
        correctAnswer: 'Messi',
        storyUrl: 'https://drive.google.com/file/d/1c4eOg3Vi9OxvfGSV9FewmJ3_OhCREtda/view?usp=sharing'
    }
};

// DOM Elements
const storyCategories = document.querySelectorAll('.story-category');
const questionModal = document.getElementById('questionModal');
const storyModal = document.getElementById('storyModal');
const questionText = document.getElementById('question');
const storyLink = document.getElementById('storyLink');
const choiceLabels = [
    document.getElementById('choice1Label'),
    document.getElementById('choice2Label'),
    document.getElementById('choice3Label'),
    document.getElementById('choice4Label')
];

let currentCategory = null;

// Initialize completed stories from localStorage
function initializeCompletedStories() {
    const completed = JSON.parse(localStorage.getItem('completedStories')) || [];
    completed.forEach(category => {
        const element = document.querySelector(`[data-category="${category}"]`);
        if (element) {
            element.classList.add('completed');
            element.querySelector('.lock-status').textContent = '✓';
        }
    });

    // Add click handlers for completion circles
    document.querySelectorAll('.lock-status').forEach(circle => {
        circle.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = e.target.closest('.story-category');
            toggleCompletion(category.dataset.category);
        });
    });
}

// Toggle completion status
function toggleCompletion(category) {
    const completed = JSON.parse(localStorage.getItem('completedStories')) || [];
    const categoryElement = document.querySelector(`[data-category="${category}"]`);
    const lockStatus = categoryElement.querySelector('.lock-status');
    
    if (completed.includes(category)) {
        // Remove from completed
        const index = completed.indexOf(category);
        completed.splice(index, 1);
        categoryElement.classList.remove('completed');
        lockStatus.textContent = '🔒';
    } else {
        // Add to completed
        completed.push(category);
        categoryElement.classList.add('completed');
        lockStatus.textContent = '✓';
    }
    
    localStorage.setItem('completedStories', JSON.stringify(completed));
}

// Event Listeners
storyCategories.forEach(category => {
    category.addEventListener('click', () => {
        currentCategory = category.dataset.category;
        const isCompleted = category.classList.contains('completed');
        
        if (isCompleted) {
            showStory(currentCategory);
        } else {
            showQuestion(currentCategory);
        }
    });
});

// Show question modal with multiple choice
function showQuestion(category) {
    const story = stories[category];
    questionText.textContent = story.question;
    
    // Set up multiple choice options
    story.choices.forEach((choice, index) => {
        choiceLabels[index].textContent = choice;
    });
    
    // Clear any previous selection
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.checked = false;
    });
    
    questionModal.style.display = 'flex';
}

// Show custom alert
function showCustomAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    
    if (type === 'error') {
        alert.innerHTML = `
            <div class="error-message">${message}</div>
            <div class="emoji-container">👀 😔 👀</div>
        `;
    } else {
        alert.innerHTML = `
            <div class="success-message">${message}</div>
            <div class="emoji-container">🎉 🌸 ✨ 🎊 💫</div>
        `;
    }
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 1500);
}

// Create falling emojis
function createFallingEmojis() {
    const emojis = ['🌸', '✨', '💫', '🎊', '🎉', '💖', '⭐'];
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'falling-emoji';
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confettiContainer.appendChild(emoji);
            
            // Remove emoji after animation
            setTimeout(() => {
                emoji.remove();
            }, 3000);
        }, i * 100);
    }
    
    // Remove container after all animations
    setTimeout(() => {
        confettiContainer.remove();
    }, 6000);
}

// Check answer
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        showCustomAlert('Please select an answer! 👀', 'error');
        return;
    }

    const userAnswer = stories[currentCategory].choices[parseInt(selectedAnswer.value)];
    const correctAnswer = stories[currentCategory].correctAnswer;

    if (userAnswer === correctAnswer) {
        questionModal.style.display = 'none';
        showCustomAlert('🎉 Congratulations! You got it right! 🎉', 'success');
        createFallingEmojis();
        setTimeout(() => {
            showStory(currentCategory);
            const categoryElement = document.querySelector(`[data-category="${currentCategory}"]`);
            if (!categoryElement.classList.contains('completed')) {
                toggleCompletion(currentCategory);
            }
        }, 1500);
    } else {
        showCustomAlert('Wrong answer... Very disappointed, not gonna lie 😔', 'error');
    }
}

// Reset story
function resetStory(category) {
    const completed = JSON.parse(localStorage.getItem('completedStories')) || [];
    const index = completed.indexOf(category);
    if (index > -1) {
        completed.splice(index, 1);
        localStorage.setItem('completedStories', JSON.stringify(completed));
    }
    
    const categoryElement = document.querySelector(`[data-category="${category}"]`);
    categoryElement.classList.remove('completed');
    categoryElement.querySelector('.lock-status').textContent = '🔒';
    
    storyModal.style.display = 'none';
    showQuestion(category);
}

// Show story
function showStory(category) {
    storyLink.href = stories[category].storyUrl;
    storyLink.onclick = () => {
        storyModal.style.display = 'none';
    };
    storyModal.style.display = 'flex';
}

// Close modals when clicking outside
window.onclick = (event) => {
    if (event.target === questionModal) {
        questionModal.style.display = 'none';
    }
    if (event.target === storyModal) {
        storyModal.style.display = 'none';
    }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', initializeCompletedStories); 