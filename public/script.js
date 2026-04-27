const commentInput = document.getElementById('comment-input');
const predictBtn = document.getElementById('predict-btn');
const btnText = predictBtn.querySelector('.btn-text');
const loader = document.getElementById('loader');
const resultContainer = document.getElementById('result-container');
const sentimentBadge = document.getElementById('sentiment-badge');
const sentimentText = document.getElementById('sentiment-text');

predictBtn.addEventListener('click', async () => {
    const comment = commentInput.value.trim();

    if (!comment) {
        alert('Please enter a comment first!');
        return;
    }

    // UI Feedback: Loading state
    predictBtn.disabled = true;
    btnText.style.display = 'none';
    loader.style.display = 'block';
    resultContainer.classList.add('hidden');

    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        });

        const data = await response.json();

        if (response.ok) {
            displayResult(data.sentiment);
        } else {
            console.error('Error:', data.error);
            alert('Something went wrong: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Could not connect to the server. Make sure Node.js is running.');
    } finally {
        // UI Feedback: Reset button
        predictBtn.disabled = false;
        btnText.style.display = 'block';
        loader.style.display = 'none';
    }
});

function displayResult(sentiment) {
    // Reset classes
    sentimentBadge.className = 'sentiment-badge ' + sentiment;
    sentimentText.textContent = sentiment;

    // Show result
    resultContainer.classList.remove('hidden');
    
    // Smooth scroll to result if on mobile
    if (window.innerWidth < 600) {
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
}
