import './index.html'
import './style.css'
import './classes/modal'
import { createPost } from './classes/posts'
import { isValid } from './utils'

window.addEventListener('load', createPost.renderList)

// Функция для работы с формой поста
function handlePostForm(form) {
  const inputSubject = form.querySelector('.create-post #subject')
  const selectTag = form.querySelector('.create-post #tag')
  const inputPostContent = form.querySelector('.create-post #post-content')
  const submitBtn = form.querySelector('.create-post #submit')
  const autor = null

  form.addEventListener('submit', submitFormHandler)
  inputPostContent.addEventListener('input', () => {
    submitBtn.disabled = !isValid(inputPostContent.value)
  })

  function submitFormHandler(event) {
    event.preventDefault()
    if (isValid(inputPostContent.value)) {
      const postMessage = {
        subject: inputSubject.value.trim(),
        tag: selectTag.value,
        text: inputPostContent.value.trim(),
        author: autor,
        date: new Date().toJSON(),
      }
      submitBtn.disabled = true
      // Асинхронный запрос на сервер для сохранения сообщения
      createPost.create(postMessage).then(() => {
        inputPostContent.value = ''
        submitBtn.disabled = false
      })
    }
  }
}

// Код для переключения темы
const themeSwitcher = document.querySelector('.theme-btn')
themeSwitcher.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  themeSwitcher.classList.toggle('dark')
})

// Код для модального окна
const modal2 = document.querySelector('[data-for-modal="modal-2"]')
modal2.addEventListener('click', () => {
  const form = document.getElementById('form')
  if (form) {
    handlePostForm(form)
  }
})
