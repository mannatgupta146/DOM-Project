function openClose(){
    let allElems = document.querySelectorAll('.elem')
let fullElem = document.querySelectorAll('.fullElem')
let fullElemBackBtn = document.querySelectorAll('.fullElem .back')

allElems.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        fullElem[elem.id].style.display="block"
    })
})

fullElemBackBtn.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        fullElem[elem.id].style.display="none"
    })
})
}

 openClose()

let form = document.querySelector('.addTask form')
let taskInput = document.querySelector('.addTask form input')
let taskDetails = document.querySelector('.addTask form textarea')

let taskCheckbox = document.querySelector('.addTask form .mark-imp #check')

let currentTask = []

if(localStorage.getItem('currentTask')){
    currentTask = JSON.parse(localStorage.getItem('currentTask'))
}
else{
    console.log('task list is empty');
    
}

function renderTask(){
     let allTask = document.querySelector('.allTask')
 let sum = ''

 currentTask.forEach((elem) => {
    sum += `<div class="task">
                <h5>${elem.task} <span class='${elem.imp}'> imp </span></h5>
                <button>Mark as Completed</button>
            </div>`
 })

 allTask.innerHTML = sum
}

renderTask()



 form.addEventListener('submit', (e)=>{
    e.preventDefault()

    currentTask.push({
        task: taskInput.value, 
        details: taskDetails.value, 
        imp: taskCheckbox.checked
    })
    taskInput.value = ''
    taskDetails.value = ''
    taskCheckbox.checked = ''

    localStorage.setItem('currentTask', JSON.stringify(currentTask))

    renderTask()
 })