import { q, createCard } from "./utils.js";
import { GET, DELETE } from "./api.js";
const BASE_URL = "https://edgemony-backend.herokuapp.com/series";

const deleteInputEl = q(".delete");
const removeSerieBtnEl = q(".remove-serie");

GET(BASE_URL).then((data) => {
  data.map((serie) => {
    try {
      createCard(
        document.body,
        serie.poster,
        serie.title,
        serie.year,
        serie.id
      );
    } catch (error) {
      console.log(error);
    }
  });
});

const POST = async (BASE_URL, body) => {
  return await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const addButton = q(".add-serie");
const titleInputEl = q("#title");
const posterInputEl = q("#url-img");
const yearInputEl = q("#year");

addButton.addEventListener("click", () => {
  const titleInputEl = q("#title").value;
  const posterInputEl = q("#url-img").value;
  const yearInputEl = q("#year").value;

  const body = {
    title: titleInputEl,
    poster: posterInputEl,
    year: yearInputEl,
  };

  POST(BASE_URL, body).then(() => location.reload());
});

deleteInputEl.addEventListener("input", (eventInput) => {
  removeSerieBtnEl.addEventListener("click", (eventClick) => {
    DELETE(BASE_URL, eventInput.target.value).then(() => location.reload());
  });
});
