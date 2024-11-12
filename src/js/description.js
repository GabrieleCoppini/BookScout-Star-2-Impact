import axios from "axios";

const descriptionWindow = document.querySelector(".description-window");
const descriptionDiv = document.querySelector(".description-div");
export const backWindow = document.querySelector(".back-window");

let bookTitle;
let bookDescription;

export const openDescription = async (event) => {
  const bookCard = event.target.closest(".book-display");
  if (bookCard) {
    const bookKey = bookCard.getAttribute("data-book-key");

    try {
      const response = await axios.get(
        `https://openlibrary.org${bookKey}.json`
      );

      const bookData = response.data;
      bookTitle = bookData.title;
      bookDescription = bookData.description;

      console.log(response);
      if (typeof bookDescription === "object" && "value" in bookDescription) {
        bookDescription = bookDescription.value;
      }

      if (!bookDescription) {
        bookDescription = `The description of the book "${bookTitle}" is not available`;
      }

      displayDescription(bookTitle, bookDescription);
    } catch (error) {
      console.log(error);
    }
  }
};

const displayDescription = function (title, description) {
  descriptionWindow.classList.remove("hidden");
  backWindow.classList.remove("hidden");
  descriptionDiv.innerHTML = `
 <h1>${title}</h1>
 <p>${description}</p>`;
  descriptionWindow.scrollTop = 0;
};

export const closeDescription = function () {
  descriptionWindow.classList.add("hidden");
  backWindow.classList.add("hidden");
  document.body.style.overflow = "auto";
  descriptionDiv.scrollTop = 0;
  descriptionDiv.innerHTML = "";
};
