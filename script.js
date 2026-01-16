function openClose(){
    const allElems = document.querySelectorAll('.elem')
const fullElem = document.querySelectorAll('.fullElem')
const fullElemBackBtn = document.querySelectorAll('.fullElem .back')

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