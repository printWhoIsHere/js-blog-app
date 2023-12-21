export class createPost {
  static create(post) {
    return fetch(
      'https://js-blog-app-5976d-default-rtdb.firebaseio.com/posts.json',
      {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        post.id = response.name
        return post
      })
      .then(addToLocalStorage)
      .then(createPost.renderList)
  }
  static renderList() {
    const posts = getPostsFromLocalStorage()
    const html = posts.length
      ? posts.map(toCard).join('')
      : `<h2 class="h2">Non posts</h2>`

    const list = document.querySelector('.blog-card-group')
    list.innerHTML = html
  }
}

function addToLocalStorage(post) {
  const allPosts = getPostsFromLocalStorage()
  allPosts.push(post)
  localStorage.setItem('posts', JSON.stringify(allPosts))
}

function getPostsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('posts') || '[]')
}

function toCard(post) {
  return `
    <div class="blog-card">
      <img 
        src="/img/${post.tag}.jpeg" 
        alt="${post.tag}" 
        class="blog-card-banner" 
        width="250" />
      <div class="blog-content-wrapper">
        <button class="blog-topic text-tiny">${post.tag}</button>
        <h3><a href="#" class="h3">${post.subject}</a></h3>
        <p class="blog-text">
          ${post.text}
        </p>
        <div class="wrapper-flex">
          <div class="wrapper">
            <a href="#" class="h4">${post.author}</a>
            <p class="text-sm">
              <time datatime="2024-01-02">
                ${new Date(post.date).toLocaleString()}
              </time>
              <span class="separator"></span>
              <i class="fa-regular fa-clock"></i>
              <time datetime="PT3M">${Math.floor(
                (new Date() - new Date(post.date)) / (1000 * 60)
              )} min</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
}
