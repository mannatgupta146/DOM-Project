const allElems = document.querySelectorAll('.elem')
const fullElem = document.querySelectorAll('.fullElem')

allElems.forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        fullElem[elem.id].style.display="block"
    })
})