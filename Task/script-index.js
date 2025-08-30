// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Poll logic
const pollOptions = document.getElementById('poll-options');
const pollResults = document.getElementById('poll-results');
const resultsDisplay = document.getElementById('results-display');
        
let votes = {}; // Object to store vote counts
const pollButtons = document.querySelectorAll('.poll-button');

pollButtons.forEach(button => {
    // Initialize votes
    votes[button.textContent] = 0;

    button.addEventListener('click', () => {
        // Increment vote for the clicked option
        votes[button.textContent]++;
        
        // Hide poll options and show results
        pollOptions.classList.add('hidden');
        pollResults.classList.remove('hidden');
        
        // Render the results
        renderPollResults();
    });
});

function renderPollResults() {
    resultsDisplay.innerHTML = '';
            
    // Calculate total votes
    const totalVotes = Object.values(votes).reduce((sum, current) => sum + current, 0);

    for (const option in votes) {
        const voteCount = votes[option];
        const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                
        const resultBar = document.createElement('div');
        resultBar.classList.add('flex', 'items-center', 'space-x-3');
                
        resultBar.innerHTML = `
            <div class="w-full h-8 bg-[#3a3a5e] rounded-full relative">
                <div class="h-full bg-[#fecb00] rounded-full transition-all duration-500 ease-out"
                    style="width: ${percentage.toFixed(0)}%;"></div>
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white font-semibold">${option}</span>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-white font-semibold text-sm">${voteCount} (${percentage.toFixed(0)}%)</span>
            </div>
        `;
        resultsDisplay.appendChild(resultBar);
    }
}
        
// Logic for "View All Players" button
const viewMoreButton = document.getElementById('view-more-button');
const hiddenPlayersContainer = document.getElementById('hidden-players-container');

viewMoreButton.addEventListener('click', () => {
    // This is the correct way to show the hidden elements
    hiddenPlayersContainer.classList.remove('hidden');
    // This hides the button after it's been clicked
    viewMoreButton.style.display = 'none';
});

// Scroll-based fade-in animation
const sections = document.querySelectorAll('.fade-in-section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});
