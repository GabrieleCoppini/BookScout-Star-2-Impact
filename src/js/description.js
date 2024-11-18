import axios from "axios";

const descriptionWindow = document.querySelector(".description-window");
const descriptionDiv = document.querySelector(".description-div");
const favoriteUl = document.querySelector(".favorite-list");
export const backWindow = document.querySelector(".back-window");
export const favoriteBtn = document.querySelector(".favorite-btn");

let bookTitle;
let bookDescription;
export let yourBookstoreBooks = [];

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
      updateBtn();
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

export const addToYourBookstore = function () {
  if (!yourBookstoreBooks.includes(bookTitle)) {
    yourBookstoreBooks.push(bookTitle);
  } else {
    yourBookstoreBooks.splice(yourBookstoreBooks.indexOf(bookTitle), 1);
  }
  updateBtn();
  updateBookStore();
};

export const updateBtn = function () {
  yourBookstoreBooks.includes(bookTitle)
    ? (favoriteBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`)
    : (favoriteBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`);
};

export const updateBookStore = function () {
  favoriteUl.innerHTML = "";
  if (yourBookstoreBooks.length > 0) {
    yourBookstoreBooks.forEach((book) => {
      const ListElement = document.createElement("li");
      ListElement.textContent = book;
      favoriteUl.appendChild(ListElement);
    });
  }
  setLocalStorage(yourBookstoreBooks);
};

const setLocalStorage = function (books) {
  localStorage.setItem("books", JSON.stringify(books));
};

export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("books"));
  if (data) {
    yourBookstoreBooks = data;
    updateBookStore();
  }
};
