// ---------- OPEN / CLOSE (keep as it is) ----------
function openClose() {
  const allElems = document.querySelectorAll('.elem')
  const fullElems = document.querySelectorAll('.fullElem')
  const backBtns = document.querySelectorAll('.fullElem .back')

  allElems.forEach((elem) => {
    elem.addEventListener('click', () => {
      fullElems[elem.id].style.display = 'block'
    })
  })

  backBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      fullElems[btn.id].style.display = 'none'
    })
  })
}

openClose()


// ---------- TODO FUNCTION ----------
function todo() {
  // DOM references
  const form = document.querySelector('.addTask form')
  const taskInput = document.querySelector('.addTask input')
  const taskDetails = document.querySelector('.addTask textarea')
  const taskCheckbox = document.querySelector('#check')
  const allTask = document.querySelector('.allTask')

  // State
  let currentTask = []

  // Load from localStorage
  if (localStorage.getItem('currentTask')) {
    currentTask = JSON.parse(localStorage.getItem('currentTask'))
  }

  // Render tasks
  function renderTask() {
    localStorage.setItem('currentTask', JSON.stringify(currentTask))

    let sum = ''

    currentTask.forEach((elem, idx) => {
      sum += `
        <div class="task">
          <div class="task-left">
            <h5>
              ${elem.task}
              <span class="${elem.imp}">imp</span>
            </h5>

            <button id="${idx}">Mark as Completed</button>
          </div>

          <details>
            <summary>View Details</summary>
            <p>${elem.details}</p>
          </details>
        </div>
      `
    })

    allTask.innerHTML = sum
  }

  // Initial render
  renderTask()

  // Add task
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    currentTask.push({
      task: taskInput.value,
      details: taskDetails.value,
      imp: taskCheckbox.checked
    })

    renderTask()

    taskInput.value = ''
    taskDetails.value = ''
    taskCheckbox.checked = false
  })

  // Delete task (event delegation)
  allTask.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const index = Number(e.target.id)
      currentTask.splice(index, 1)
      renderTask()
    }
  })
}

// Call todo
todo()


function dailyPlanner() {
  // Load from localStorage
  let dayPlanData =
    JSON.parse(localStorage.getItem('dayPlannerData')) || {}

  const dayPlanner = document.querySelector('.day-planner')

  const hours = Array.from({ length: 18 }, (_, idx) => {
    return `${6 + idx}:00 - ${7 + idx}:00`
  })

  let wholeDaySum = ''

  hours.forEach((elem, idx) => {
    const savedData = dayPlanData[idx] || ''
    wholeDaySum += `
      <div class="day-planner-time">
        <p>${elem}</p>
        <input id="${idx}" type="text" placeholder="..." value="${savedData}">
      </div>
    `
  })

  dayPlanner.innerHTML = wholeDaySum

  const dayPlannerInput = document.querySelectorAll('.day-planner input')

  dayPlannerInput.forEach((elem) => {
    elem.addEventListener('input', () => {
      dayPlanData[elem.id] = elem.value
      localStorage.setItem(
        'dayPlannerData',
        JSON.stringify(dayPlanData)
      )
    })
  })
}

// Call it
dailyPlanner()

function motivation() {
  const motivationQuote = document.querySelector('.motivation-2 h1')
  const motivationAuthor = document.querySelector('.motivation-3 h2')
  const refreshBtn = document.querySelector('.refresh-quote')

  async function fetchMotivation() {
    try {
      const response = await fetch('https://dummyjson.com/quotes/random')
      const data = await response.json()

      motivationQuote.textContent = data.quote
      motivationAuthor.textContent = `- ${data.author}`
    } catch (err) {
      motivationQuote.textContent = 'Stay consistent. Growth is inevitable.'
      motivationAuthor.textContent = '- Unknown'
      console.error(err)
    }
  }

  // initial load
  fetchMotivation()

  // refresh button
  refreshBtn.addEventListener('click', fetchMotivation)
}

// call it once
motivation()


function pomodoro() {
  const timer = document.querySelector('.pomo-timer h1')

  const startBtn = document.querySelector('.pomo-timer .start-timer')
  const pauseBtn = document.querySelector('.pomo-timer .pause-timer')
  const resetBtn = document.querySelector('.pomo-timer .reset-timer')

  const session = document.querySelector('.pomo-fullpage h4')

  let timerInterval = null
  let isWorkSession = true
  let totalSeconds = 1500

  function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  function updateSessionUI() {
    if (isWorkSession) {
      session.innerText = 'Focus Time'
      session.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)'
      session.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.6)'
    } else {
      session.innerText = 'Break Time'
      session.style.background = 'linear-gradient(135deg, #60a5fa, #3b82f6)'
      session.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.6)'
    }
  }

  function startTimer() {
    if (timerInterval) return

    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--
        updateTimer()
      } else {
        clearInterval(timerInterval)
        timerInterval = null

        isWorkSession = !isWorkSession
        totalSeconds = isWorkSession ? 1500 : 300
        updateSessionUI()
        updateTimer()
      }
    }, 1000)
  }

  function pauseTimer() {
    clearInterval(timerInterval)
    timerInterval = null
  }

  function resetTimer() {
    clearInterval(timerInterval)
    timerInterval = null
    isWorkSession = true
    totalSeconds = 1500
    updateSessionUI()
    updateTimer()
  }

  startBtn.addEventListener('click', startTimer)
  pauseBtn.addEventListener('click', pauseTimer)
  resetBtn.addEventListener('click', resetTimer)

  updateTimer()
  updateSessionUI()
}

pomodoro()

async function weather() {
  // 🔹 Config
  let apiKey = '88660a54c41740edb6b130752262501'
  let city = 'Jammu'
  let data = null

  const dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  // 🔹 DOM
  let headerDate = document.querySelector('.header1 h1')
  let headerMonth = document.querySelector('.header1 h2')
  let headerLocation = document.querySelector('.header1 h4')

  let headerTemp = document.querySelector('.header2 h2')
  let headerPrecipitation = document.querySelector('.header2 .prep')
  let headerHumdity = document.querySelector('.header2 .hum')
  let headerWind = document.querySelector('.header2 .wind')
  let headerCondition = document.querySelector('.header2 h4')

  // 🔹 API call
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  )
  data = await response.json()
  console.log(data)

  // 🔹 Time + UI
  function timeDate() {
    const date = new Date()

    const dayToday = dayOfWeek[date.getDay()]

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12 || 12
    hours = String(hours).padStart(2, '0')
    minutes = String(minutes).padStart(2, '0')
    seconds = String(seconds).padStart(2, '0')

    headerDate.innerHTML = `${dayToday}, ${hours}:${minutes}:${seconds} ${ampm}`

    headerMonth.innerHTML =
      date.toLocaleString('default', { month: 'long' }) +
      ' ' +
      date.getDate() +
      ', ' +
      date.getFullYear()

    headerTemp.innerHTML = `${data.current.temp_c}°C`
    headerCondition.innerHTML = data.current.condition.text
    headerPrecipitation.innerHTML = `Precipitation: ${data.current.precip_mm} mm`
    headerHumdity.innerHTML = `Humidity: ${data.current.humidity}%`
    headerWind.innerHTML = `Wind: ${data.current.wind_kph} kph`
    headerLocation.innerHTML = `${data.location.name}, ${data.location.region}`

    setTimeout(timeDate, 1000)
  }

  timeDate()
}

// 🚀 single call
weather()

function dailyGoals() {
  const goalsList = document.querySelector('.goals-list')
  const addBtn = document.getElementById('addGoalBtn')
  const goalText = document.getElementById('goalText')
  const goalEmoji = document.getElementById('goalEmoji')

  let goals = JSON.parse(localStorage.getItem('dailyGoals')) || []
  let savedDate = localStorage.getItem('goalDate')

  /* ---------- DAILY RESET ---------- */
  const today = new Date().toDateString()
  if (savedDate !== today) {
    goals = []
    localStorage.setItem('goalDate', today)
    localStorage.setItem('dailyGoals', JSON.stringify(goals))
  }

  /* ---------- STATUS TEXT ---------- */
  function getStatus(p) {
    if (p === 0) return 'Not Started'
    if (p <= 25) return 'Started'
    if (p <= 50) return 'In Progress'
    if (p <= 75) return 'Going Strong'
    if (p < 100) return 'Almost Finished'
    return 'Completed'
  }

  /* ---------- RENDER ---------- */
  function renderGoals() {
    goalsList.innerHTML = ''

    goals.forEach((g, i) => {
      const card = document.createElement('div')
      card.className = 'goal-card'

      let segments = ''
      for (let s = 0; s < 10; s++) {
        segments += `
          <div class="progress-segment ${
            s < g.progress / 10 ? 'active' : ''
          }"></div>`
      }

      card.innerHTML = `
        <div class="goal-header">
          <div class="goal-title">${g.emoji} ${g.text}</div>
          <div class="goal-status">${getStatus(g.progress)}</div>
        </div>

        <div class="progress-bar">
          ${segments}
        </div>

        <div class="goal-controls">
          <button data-action="minus" data-index="${i}">−</button>
          <span class="goal-percent">${g.progress}%</span>
          <button data-action="plus" data-index="${i}">+</button>
        </div>
      `

      goalsList.appendChild(card)
    })

    localStorage.setItem('dailyGoals', JSON.stringify(goals))
  }

  /* ---------- UPDATE PROGRESS ---------- */
  function updateGoal(index, change) {
    goals[index].progress = Math.min(
      100,
      Math.max(0, goals[index].progress + change)
    )

    if (goals[index].progress === 100) {
      setTimeout(() => {
        goals.splice(index, 1)
        renderGoals()
      }, 400)
    } else {
      renderGoals()
    }
  }

  /* ---------- EVENTS ---------- */
  goalsList.addEventListener('click', (e) => {
    const btn = e.target
    if (!btn.dataset.action) return

    const index = Number(btn.dataset.index)
    const change = btn.dataset.action === 'plus' ? 10 : -10
    updateGoal(index, change)
  })

  addBtn.addEventListener('click', () => {
    if (!goalText.value.trim()) return

    goals.push({
      text: goalText.value.trim(),
      emoji: goalEmoji.value,
      progress: 0
    })

    goalText.value = ''
    renderGoals()
  })

  renderGoals()
}

/* ---------- INIT ---------- */
dailyGoals()
