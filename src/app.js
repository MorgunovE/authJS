import './style.css'
// 27 and 39
import {createModal, isValid} from './utils'
// 31
import {Question} from './question'
// 42 and 47
import {authWithEmailAndPassword, getAuthForm} from "./auth";
// 33
window.addEventListener('load', Question.renderList)
// 36
const modalBtn = document.getElementById('modal-btn')
modalBtn.addEventListener('click', openModal)
// 25
const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
  event.preventDefault()
  // console.log(input.value)
  // 27-1
  if(isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }
    submitBtn.disabled = true
    // async request to server to save question
    // 31-1
    Question.create(question).then(() => {
      input.value = ''
      input.className = ''
      submitBtn.disabled = false
    })
    // console.log('Question: ', question)
    
  }
}

// 36-1
function openModal() {
  // 39-1 and 42-1
  createModal('Authorisation', getAuthForm())
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFromHandler, {once: true})
}

// 42-2
function authFromHandler(event) {
  event.preventDefault()
  // 54
  const btn = event.target.querySelector('button')
  
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value
  // 54-1
  btn.disabled = true
  // 47-1
  authWithEmailAndPassword(email, password)
    // 49
    .then(Question.fetch)
    // 52
    .then(renderModalAfterAuth)
    // 54-2
    .then(() => {
      btn.disabled = false
    })
}

// 52-1
function renderModalAfterAuth(content) {
  // 54-3
  if(typeof content === 'string') {
    createModal('Error', content)
  } else {
    // 56
    createModal('List of questions', Question.listToHTML(content))
  }
}