import {
  backWindow,
  yourBookstoreBooks,
  updateBookStore,
  updateBtn,
} from "./description.js";

const yourBookstore = document.querySelector(".your-book-store");
const emptyBookstoreMessage = document.querySelector(".no-books-message");
export const clearBtn = document.querySelector(".clear-btn");

clearBtn.classList.add("hidden");
export const displayBokStore = function () {
  backWindow.classList.remove("hidden");
  yourBookstore.classList.remove("hidden");
  yourBookstore.style.right = "-10px";

  if (yourBookstoreBooks.length !== 0) {
    emptyBookstoreMessage.classList.add("hidden");
    clearBtn.classList.remove("hidden");
  }
};

export const closeBookStore = function () {
  backWindow.classList.add("hidden");
  yourBookstore.style.right = "-300px";
};

export const clearBookStore = function () {
  yourBookstoreBooks.length = 0;
  emptyBookstoreMessage.classList.remove("hidden");
  clearBtn.classList.add("hidden");
  updateBookStore();
  updateBtn();
};
