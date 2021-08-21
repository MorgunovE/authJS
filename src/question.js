export class Question {
  static create(question) {
    return fetch('https://auth-js-153f4-default-rtdb.europe-west1.firebasedatabase.app/question.json', {
      method : 'POST',
      body   : JSON.stringify(question),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        // 32
        question.id = response.name
        return question
      })
      .then(addToLocalStorage)
      // 32-3
      .then(Question.renderList)
  }
  
  // 48
  static fetch(token) {
    // 51
    if(!token) {
      return Promise.resolve('<p class="error">You havent token</p>')
    }
    return fetch(`https://auth-js-153f4-default-rtdb.europe-west1.firebasedatabase.app/question.json?auth=${token}`)
      .then(response => response.json())
      .then(response => {
        // 53 and 58
        if(response && response.error) {
          return `<p class="error">${response.error}</p>`
        }
        return response ? Object.keys(response).map(key => ({
          ...response[key],
          id: key
        })) : []
      })
  }
  
  // 32-4
  static renderList() {
    const questions = getQuestionFromLocalstorage()
    const html = questions.length
      ? questions.map(toCard).join('')
      : `<div class="mui--text-headline">Haven't questions</div>`
    const list = document.getElementById('list')
    list.innerHTML = html
  }
  
  // 55
  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
      : "<p>Haven't question</p>"
  }
}

// 32-1
function addToLocalStorage(question) {
  const all = getQuestionFromLocalstorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

// 32-2
function getQuestionFromLocalstorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

// 32-5
function toCard(question) {
  return `
      <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
      </div>
      <div>
        ${question.text}
      </div>
      <br>
  `
}