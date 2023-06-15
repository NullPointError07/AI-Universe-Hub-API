const seeMoreButton = document.getElementById("btn-seeMore");

const loadUniverse = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayAITools(data.data.tools);
};

const displayAITools = (allTwelveAI) => {
  const AIContainer = document.getElementById("AI-container");
  const firstSixAI = allTwelveAI.slice(0, 6);

  firstSixAI.forEach((AICard) => {
    AIUniverseHub(AICard, AIContainer);
  });

  seeMoreButton.addEventListener("click", () => {
    const lastSixAI = allTwelveAI.slice(-6);
    lastSixAI.forEach((AICard) => {
      AIUniverseHub(AICard, AIContainer);
    });
    seeMoreButton.style.display = "none";
  });
};

const AIUniverseHub = (AICards, AIContainer) => {
  const firsOrLastSixDiv = document.createElement("div");
  firsOrLastSixDiv.classList.add("col");

  const publishedDate = AICards.published_in;
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString()
    : "No data Found";

  firsOrLastSixDiv.innerHTML = `
    <div class="card">
        <img src="${AICards.image}" class="img-fluid rounded p-3" alt="...">
        <div class="card-body">
            <p class="card-text">Features</p>
            <ol>
                <li>${
                  AICards.features ? AICards.features[0] : "No Feature Found"
                }</li>
                <li>${
                  AICards.features ? AICards.features[1] : "No Feature Found"
                }</li>
                <li>${
                  AICards.features ? AICards.features[2] : "No Feature Found"
                }</li>
            </ol>
            <span class="span-border"></span>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title pt-3">${AICards.name}</h5>
                    <p><span><i class="fa-solid fa-calendar-days"></i></span> ${formattedDate}</p>
                </div>
                <div>
                    <i class="fa-regular fa-arrow-right"></i>
                </div>
            </div>
    </div>
    `;
  AIContainer.appendChild(firsOrLastSixDiv);
};

loadUniverse();
