let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

// Increment the review count when a new review is submitted
reviewCount++;

// Store the updated review count in localStorage
localStorage.setItem("reviewCount", reviewCount);

// Update the review count display on the page
document.querySelector("#reviewCount").textContent = reviewCount;