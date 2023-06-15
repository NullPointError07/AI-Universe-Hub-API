const seeMoreButton = document.getElementById("btn-seeMore");

// fetching primary data from API
const loadUniverse = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayAITools(data.data.tools);
};

// dynamic url to fetch detailed data
const loadingDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetailedAI(data.data);
};

const displayAITools = (allTwelveAI) => {
  const AIContainer = document.getElementById("AI-container");
  const firstSixAI = allTwelveAI.slice(0, 6);
  console.log(firstSixAI);

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

const displayDetailedAI = (AiDetails) => {
  console.log(AiDetails);
  const detailsBody = document.getElementById("details-body");
  detailsBody.innerHTML = `
  <div class="card-group">
      <div id="details-left" class="card me-3">
          <div class="card-body">
              <h4 class="card-text">${AiDetails.description}</h4>
              <div class="card-group text-center my-3">
                  <div class="card">
                      <div class="card-body">
                          <p class="text-success">${
                            AiDetails.pricing
                              ? AiDetails.pricing[0].price +
                                " " +
                                AiDetails.pricing[0].plan
                              : "Free of Cost/ Basic"
                          }</p>
                      </div>
                  </div>
                  <div class="card">
                      <div class="card-body">
                          <p id="custom-orange-text" class="">${
                            AiDetails.pricing
                              ? AiDetails.pricing[1].price +
                                " " +
                                AiDetails.pricing[1].plan
                              : "Free of Cost/ Pro"
                          }</p>
                      </div>
                  </div>
                  <div class="card">
                      <div class="card-body">
                          <p class="text-danger">${
                            AiDetails.pricing
                              ? AiDetails.pricing[2].price +
                                " " +
                                AiDetails.pricing[2].plan
                              : "Free of Cost/ Enterprise"
                          }</p>
                      </div>
                  </div>
              </div>
              <div class="d-flex justify-content-around">
                  <div class="card-title"><h4>Features</h4>
                  <ul>
                      <li>${
                        AiDetails.features
                          ? AiDetails.features[1].feature_name
                          : "No Feature Found"
                      }</li>
                      <li>${
                        AiDetails.features
                          ? AiDetails.features[2].feature_name
                          : "No Feature Found"
                      }</li>
                      <li>${
                        AiDetails.features
                          ? AiDetails.features[3].feature_name
                          : "No Feature Found"
                      }</li>
                  </ul>
                  </div>
                  <div class="card-title"><h4>Integration</h4>
                      <ul>${
                        AiDetails.integrations
                          ? `
                        <li>${AiDetails.integrations[0]}</li>
                        <li class="${
                          AiDetails.integrations[1] ? "" : "no-bullet"
                        }">${
                              AiDetails.integrations[1]
                                ? AiDetails.integrations[1]
                                : ""
                            }</li>
                        <li class="${
                          AiDetails.integrations[2] ? "" : "no-bullet"
                        }">${
                              AiDetails.integrations[2]
                                ? AiDetails.integrations[2]
                                : ""
                            }</li>
                      `
                          : "No Data Found"
                      }
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <div id="details-right" class="card">
          <img src="${
            AiDetails.image_link[0]
          }" class="card-img-top img-fluid rounded p-3" alt="...">
          <div class="card-body text-center">
              <h5 class="card-text">${
                AiDetails.input_output_examples
                  ? AiDetails.input_output_examples[0].input
                  : "Can You Give Any Example?"
              }</h5>
              <p class="card-text">${
                AiDetails.input_output_examples
                  ? AiDetails.input_output_examples[0].output
                  : "No! Not Yet! Take a Break!!!"
              }</p>
          </div>
      </div>
  </div>
  `;
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
            <h4 class="card-title">Features</h4>
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
                    <button type="button" data-bs-toggle="modal" data-bs-target="#detailAiModal" onclick="loadingDetails('${
                      AICards.id
                    }')"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
    </div>
    `;
  AIContainer.appendChild(firsOrLastSixDiv);
};

loadUniverse();
