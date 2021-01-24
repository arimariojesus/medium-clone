const trendingSection = document.querySelector('.trending');
const nav = document.querySelector('.nav');
const navButton = document.querySelector('.btn-nav');

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

function getRandomNumber(min = 1, max) {
  return Math.floor((Math.random() * (max - min + 1) + min));
}

async function getTrending() {
  for(let i = 2; i <= 6; i++) {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNumber(1,100)}`);
    const postData = await postResponse.json();

    const userResponse = await fetch(`https://randomuser.me/api`);
    const userData = await userResponse.json();

    const data = { post: postData, user: userData.results[0] };

    createTrendingElement(data, i);
  }
}

function createTrendingElement(data, n) {
  const date = transformDate(data.user.registered.date);
  const trending = `
  <div class="trending__list">
    <div class="trending__item post">
      <div class="trending__item-number">
        <span>0${n}</span>
      </div>
      <div class="trending__item-content post__content">
        <div class="post__content-header post__content-inside">
          <img src="${data.user.picture.large}" alt="" width="20" height="20">
          <h4 class="post__content-author">${data.user.name.first} ${data.user.name.last}</h4>
        </div>
        <div class="post__content-body post__content-inside">
          <h2>${data.post.body.substr(0, 40)}</h2>
        </div>
        <div class="post__content-footer">
          <span class="post__content-footer-date">${date}</span>
          <span class="dot">·</span>
          <span class="post__content-footer-read">${getRandomNumber(1,10)} min read</span>
          ${randomStar()}
        </div>
      </div>
    </div>
  </div>
  `;

  insertTrending(trending);
}

function randomStar() {
  const star = `
    <span class="post__content-footer-star">
    <svg class="star-15px_svg__svgIcon-use" width="15" height="15" viewBox="0 0 15 15"><path d="M7.44 2.32c.03-.1.09-.1.12 0l1.2 3.53a.29.29 0 0 0 .26.2h3.88c.11 0 .13.04.04.1L9.8 8.33a.27.27 0 0 0-.1.29l1.2 3.53c.03.1-.01.13-.1.07l-3.14-2.18a.3.3 0 0 0-.32 0L4.2 12.22c-.1.06-.14.03-.1-.07l1.2-3.53a.27.27 0 0 0-.1-.3L2.06 6.16c-.1-.06-.07-.12.03-.12h3.89a.29.29 0 0 0 .26-.19l1.2-3.52z"></path></svg>
    </span>
  `;

  return getRandomNumber(0,1) ? star : '<span></span>';
}

function transformDate(stringFormatDate) {
  const date = new Date(stringFormatDate);
  const locale = 'en-US';
  const options = {
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString(locale, options);
}

function insertTrending(data) {
  const trendList = document.querySelector('.trending__list');
  const trendingElement = document.createElement('div');

  trendingElement.innerHTML = data;
  trendList.appendChild(trendingElement);
}

function handleScroll() {
  handleColorHeader('trending', 70);
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', getTrending);