import { createPostElement, createTrendingElement, createSkeletonElement } from "../utils/elementFactory.js";
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

async function insertPosts() {
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
  const postsContainer = document.querySelector('.posts__container');
  const skeletonElement = createSkeletonElement();

  postsContainer.appendChild(skeletonElement);
  loadingIsVisible = true;
  
  insertPosts();
}

async function infiniteScrolling() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if((clientHeight + scrollTop) >= scrollHeight) {
    if(!loadingIsVisible) showLoading();
  }
}

function handleScroll() {
  handleColorHeader('trending');
  infiniteScrolling();
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', insertTrending);