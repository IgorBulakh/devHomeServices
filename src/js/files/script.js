// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const blogItems = document.querySelector(".blog__items");
let data;
let startItem = 0;
let endItem = 3;
if (blogItems) {
  loadBlogItems();
}

async function loadBlogItems() {
  const response = await fetch("files/blog.json", {
    method: "GET",
  });
  if (response.ok) {
    const responseResult = await response.json();
    data = responseResult;
    initBlog(data, startItem, endItem);
  } else {
    console.log("Error!");
  }
}

function initBlog(data, startItem, endItem) {
  // for (let index = 0; index < 3; index++) {
  //   const item = data.items[index];
  //   console.log(item);
  //   buildBlogItem(item);
  // }
  const dataPart = data.items.slice(startItem, endItem);
  dataPart.forEach((item) => {
    buildBlogItem(item);
  });
  viewMore();
}

function buildBlogItem(item) {
  let blogItemTemplate = ` <article class="blog__cart cart-blog"`;

  item.image
    ? (blogItemTemplate += `
  <a class="cart-blog__picture" href="${item.url}">
    <img class="cart-blog__img-ibg" src="${item.image}" alt="phone">
  </a>
  `)
    : null;
  blogItemTemplate += `<div class="cart-blog__content">`;
  blogItemTemplate += `<div class="cart-blog__data">${item.data}</div>`;
  blogItemTemplate += `<h3 class="cart-blog__title">
      <a href="${item.url}">
        ${item.title}
      </a>
    </h3>`;
  item.text
    ? (blogItemTemplate += `<div class="cart-blog__text">
      <p>
        Find lots of insights and information on our blog. Explore, learn, and get inspired today.
      </p>
    </div>`)
    : null;
  blogItemTemplate += `</div>`;
  if (item.tags) {
    blogItemTemplate += ` <div class="cart-blog__items">`;
    for (const tag in item.tags) {
      blogItemTemplate += `<a class="cart-blog__link" href="${item.tags[tag]}">${tag}</a>`;
    }
    blogItemTemplate += `</div>`;
  }
  blogItemTemplate += `</article>`;

  blogItems.insertAdjacentHTML("beforeend", blogItemTemplate);
}

document.addEventListener("click", documentAction);

function viewMore() {
  const dataItemsLength = data.items.length;
  const currentItems = document.querySelectorAll(".cart-blog").length;
  const vewMore = document.querySelector(".blog__prev");
  currentItems < dataItemsLength
    ? (vewMore.hidden = false)
    : (vewMore.hidden = true);
}

function documentAction(e) {
  const targetElement = e.target;
  if (targetElement.closest(".blog__prev")) {
    startItem = document.querySelectorAll(".cart-blog").length;
    endItem = startItem + 3;

    initBlog(data, startItem, endItem);
    e.preventDefault();
  }
}
