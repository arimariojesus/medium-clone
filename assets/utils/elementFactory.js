function transformDate(stringFormatDate) {
  const date = new Date(stringFormatDate);
  const locale = 'en-US';
  const options = {
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString(locale, options);
}

function getRandomNumber(min = 1, max) {
  return Math.floor((Math.random() * (max - min + 1) + min));
}

export function randomStar() {
  const star = `
    <span class="post__content-footer-star">
    <svg class="star-15px_svg__svgIcon-use" width="15" height="15" viewBox="0 0 15 15"><path d="M7.44 2.32c.03-.1.09-.1.12 0l1.2 3.53a.29.29 0 0 0 .26.2h3.88c.11 0 .13.04.04.1L9.8 8.33a.27.27 0 0 0-.1.29l1.2 3.53c.03.1-.01.13-.1.07l-3.14-2.18a.3.3 0 0 0-.32 0L4.2 12.22c-.1.06-.14.03-.1-.07l1.2-3.53a.27.27 0 0 0-.1-.3L2.06 6.16c-.1-.06-.07-.12.03-.12h3.89a.29.29 0 0 0 .26-.19l1.2-3.52z"></path></svg>
    </span>
  `;

  return getRandomNumber(0,1) ? star : '<span></span>';
}

export function createTrendingElement(data, n) {
  const date = transformDate(data.user.registered.date);

  const trendingElement = document.createElement('div');
  trendingElement.setAttribute('class', 'trending__item post');

  const innerStructure = `
    <div class="trending__item-number">
      <span>0${n}</span>
    </div>
    <div class="trending__item-content post__content">
      <div class="post__content-header post__content-inside">
        <img src="${data.user.picture.large}" alt="" width="20" height="20">
        <h4 class="post__content-author">${data.user.name.first} ${data.user.name.last}</h4>
      </div>
      <div class="post__content-body post__content-inside">
        <h2>${data.post.body.substr(0, 78)}${data.post.body.length > 80 ? '' : '...'}</h2>
      </div>
      <div class="post__content-footer">
        <div class="post__content-footer-wrapper">
          <span class="post__content-footer-date">${date}</span>
          <span class="dot">·</span>
          <span class="post__content-footer-read">${getRandomNumber(1,10)} min read</span>
          ${randomStar()}
        </div>
      </div>
    </div>
  `;

  trendingElement.innerHTML = innerStructure;

  return trendingElement;
}

export function createPostElement(data) {
  const date = transformDate(data.user.registered.date);

  const postElement = document.createElement('div');
  postElement.setAttribute('class', 'post');
  
  const innerStructure = `
    <div class="post__content">
      <div class="post__content-header post__content-inside">
        <img src="${data.user.picture.large}" alt="" width="20" height="20">
        <h4 class="post__content-author">${data.user.name.first} ${data.user.name.last}</h4>
      </div>
      <div class="post__content-body post__content-inside">
        <h2>${data.post.body.substr(0, 40)}</h2>
      </div>
      <div class="post__content-footer">
        <div class="post__content-footer-wrapper">
          <span class="post__content-footer-date">${date}</span>
          <span class="dot">·</span>
          <span class="post__content-footer-read">${getRandomNumber(1,10)} min read</span>
          ${randomStar()}
        </div>
        <span class="post__content-footer-save">
          <svg width="25" height="25" viewBox="0 0 25 25" class="lj"><path d="M19 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14.66h.01c.01.1.05.2.12.28a.5.5 0 0 0 .7.03l5.67-4.12 5.66 4.13a.5.5 0 0 0 .71-.03.5.5 0 0 0 .12-.29H19V6zm-6.84 9.97L7 19.64V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v13.64l-5.16-3.67a.49.49 0 0 0-.68 0z" fill-rule="evenodd"></path></svg>
        </span>
      </div>
    </div>

    <div class="post-thumb">
      <img class="" src="${data.thumb}" width="100" height="100" role="presentation">
    </div>
  `;

  postElement.innerHTML = innerStructure;

  return postElement;
}
