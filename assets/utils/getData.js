export async function getPostData(dimensionsThumb = '100/100') {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`);
  const postData = await postResponse.json();

  const userResponse = await fetch(`https://randomuser.me/api/?results=5`);
  const userData = await userResponse.json();

  const thumbData = [];
  for (let i = 1; i <= 5; i++) {
    const thumbUrl = `https://picsum.photos/${dimensionsThumb}?random=${i}`;
    thumbData.push(thumbUrl);
  }

  const data = { post: postData, user: userData.results, thumb: thumbData };

  return data;
}

export async function getTrendingData() {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`);
  const postData = await postResponse.json();

  const userResponse = await fetch(`https://randomuser.me/api/?results=5`);
  const userData = await userResponse.json();

  const data = { post: postData, user: userData.results };

  return data;
}