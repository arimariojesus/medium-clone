import { createPostElement, createTrendingElement } from "../utils/elementFactory.js";
import { getPostData, getTrendingData } from "../utils/getData.js";

const nav = document.querySelector('.nav');
const navButton = document.querySelector('.btn-nav');
let loadingIsVisible = false;

function handleColorHeader(classSection, headerHeight = 70) {
  const section = document.getElementsByClassName(classSection)[0];
  const topDistance = section.getBoundingClientRect().top;
  
  if(topDistance < headerHeight) {
    nav.classList.add('nav-secondary');
    navButton.classList.add('btn-secondary');
  }else {
    nav.classList.remove('nav-secondary');
    navButton.classList.remove('btn-secondary');
  }
}

async function insertTrending() {
  const trendList = document.querySelector('.trending__list');
  const trendingData = await getTrendingData();

  for (let i = 0; i < 5; i++) {
    const post = trendingData.post[i];
    const user = trendingData.user[i];
    const trendingElement = createTrendingElement({post, user}, i+2);

    trendList.appendChild(trendingElement);
  }
}

async function insertPost() {
  const postsContainer = document.querySelector('.posts__container');
  const skeletonLoading = document.querySelector('.post__skeleton');
  const postData = await getPostData();
  
  for (let i = 0; i < 5; i++) {
    const post = postData.post[i];
    const user = postData.user[i];
    const thumb = postData.thumb[i];
    const postElement = createPostElement({post, user, thumb});

    postsContainer.appendChild(postElement);
  }
  
  skeletonLoading.remove();
  loadingIsVisible = false;
}

function showLoading() {
  loadingIsVisible = true;
  
  const postsContainer = document.querySelector('.posts__container');
  const skeletonLoading = document.createElement('div');
  skeletonLoading.setAttribute('class', 'post__skeleton');
  skeletonLoading.innerHTML = `
    <div class="post__skeleton-content">
    <div class="post__skeleton-header">
      <div class="post__skeleton-author-img content-skeleton"></div>
      <div class="post__skeleton-author content-skeleton"></div>
    </div>
    <div class="post__skeleton-body">
      <div class="body-1 content-skeleton"></div>
      <div class="body-2 content-skeleton"></div>
    </div>
    </div>
    <div class="post__skeleton-thumb content-skeleton"></div>
  `;

  postsContainer.appendChild(skeletonLoading);
  insertPost();
}

async function infiniteScrolling() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if((clientHeight + scrollTop) >= scrollHeight) {
    if(!loadingIsVisible) showLoading();
  }
}

function handleScroll() {
  handleColorHeader('trending', 70);
  // infiniteScrolling();
}

window.addEventListener('scroll', handleScroll);
// window.addEventListener('load', insertTrending);