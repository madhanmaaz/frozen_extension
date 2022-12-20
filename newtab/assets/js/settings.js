let colorInput = document.querySelector('.color input')
let colorCode = document.querySelector('.color p')
let colorOutput1 = document.querySelector('.color b')
let colorOutput2 = document.querySelector('.color a')
let bgs = document.querySelector('.bgs')
let prevImg = document.querySelector('.prev-img')
let chatOption = document.querySelector('.chat select')

prevImg.src = '../' + localStorage.getItem('bg')
let localColor = localStorage.getItem('color')
let chatSel = localStorage.getItem('chat')
colorInput.value = localColor
colorOutput1.style = `color:  ${localColor}`
colorOutput2.style = `background:  ${localColor}`
colorCode.innerHTML = `Color code: ${localColor}`

if(chatSel == 'on'){
    chatOption.querySelectorAll('option')[1].setAttribute("selected", "")
} else{
    chatOption.querySelectorAll('option')[0].setAttribute("selected", "")
}

colorInput.addEventListener('change', () => {
    colorOutput1.style = `color:  ${colorInput.value}`
    colorOutput2.style = `background:  ${colorInput.value}`
    colorCode.innerHTML = `Color code: ${colorInput.value}`
    localStorage.setItem('color', colorInput.value)
})

for(let i = 1; i <= 35; i++){
    bgs.innerHTML += `<img src="../assets/src/img/thumb/${i}.jpg" 
    alt="${i}">`
}

let allImg = bgs.querySelectorAll('img')

allImg.forEach(img => {
    img.addEventListener('click', () => {
        prevImg.src = `../assets/src/img/${img.alt}.jpg`
        localStorage.setItem('bg', `assets/src/img/${img.alt}.jpg`)
    })
})

chatOption.addEventListener('change', () => {
    localStorage.setItem('chat', chatOption.value)
})