const defaultCards = [
  { term: "HTML", definition: "HyperText Markup Language" },
  { term: "CSS", definition: "Cascading Style Sheets" },
  { term: "JavaScript", definition: "Programming language of the web" }
];

const STORAGE_KEY = "flashcards_v1";


// You can use flashcards.length to get the length of the array

// These two variables will come in handy
const flashcards = loadFlashcards();
let currentIndex = 0;
let showingTerm = true;

// Start with this function to simply display the card
function displayCard() {
  if (flashcards.length === 0) {
    termEl.textContent = "No cards yet";
    defEl.textContent = "Add your first card below.";
    showingTerm = true;
    renderFace();
    return;
  }

  const { term, definition } = flashcards[currentIndex];
  termEl.textContent = term;
  defEl.textContent = definition;
  renderFace();
}

// The rest of the code you will write is apart of event listeners

// This line will display the card when the page is refreshed
window.onload = displayCard;


const termEl = document.getElementById("card-term");
const defEl = document.getElementById("card-definition");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const flipBtn = document.getElementById("flipBtn");
const addBtn  = document.getElementById("addCardBtn");
const termInput = document.getElementById("termInput");
const defInput  = document.getElementById("defInput");
const cardEl = document.getElementById("flashcard");

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  showingTerm = true;
  displayCard();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % flashcards.length;
  showingTerm = true;
  displayCard();
});

flipBtn.addEventListener("click", () => {
  showingTerm = !showingTerm;
  renderFace();
});

cardEl.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevBtn.click();
  else if (e.key === "ArrowRight") nextBtn.click();
  else if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    flipBtn.click();
  }
});

addBtn.addEventListener("click", () => {
  const term = termInput.value.trim();
  const def  = defInput.value.trim();

  if (!term || !def) {
    alert("Please enter both a term and a definition.");
    return;
  }

  flashcards.push({ term, definition: def });
  saveFlashcards(flashcards);

  currentIndex = flashcards.length - 1;
  showingTerm = true;
  termInput.value = "";
  defInput.value = "";
  displayCard();
});

function renderFace() {
  if (showingTerm) {
    termEl.style.display = "block";
    defEl.style.display = "none";
  } else {
    termEl.style.display = "none";
    defEl.style.display = "block";
  }
}

function loadFlashcards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...defaultCards];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultCards];
  } catch {
    return [...defaultCards];
  }
}

function saveFlashcards(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
  }
}
