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



//next 