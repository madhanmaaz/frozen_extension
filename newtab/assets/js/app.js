let mainUrl = 'https://clean-perfect-ozraraptor.glitch.me/'
let body = document.body
let alertContent = document.querySelector('.alert')
let clockText = document.querySelector('.clock p')
let clockBar = document.querySelector('.clock b')
let googleSearch = document.querySelector('.google-search')
let bookmarksSearch = document.querySelector('.bookmarks-search')
let resultBookmarks = document.querySelector('.result-bookmarks')
let bookmarksContent = document.querySelector('.bookmarks-content')
let openAddlink = document.querySelector('.open-addlink')
let addLink = document.querySelector('.add-link')
let openRemovelink = document.querySelector('.open-removelink')
let removeContent = document.querySelector('.remove-content')
let saveRemoveLink = document.querySelector('.save-remove-link')
let removeLinks = document.querySelector('.remove-links')
let closeRemoveLinks = document.querySelector('.close-remove-links')
let openChat = document.querySelector('.open-chat')
let closeChat = document.querySelector('.close-chat')
let chat = document.querySelector('.chat')
let chatContent = document.querySelector('.chat .content')
let chatBtn = document.querySelector('.chat-btn')
let chatMessageBox = document.querySelector('.chat .message-box')

if (localStorage.getItem('init') == null) {

    while (true) {
        let username = prompt("Enter Your name: ")
        if (username != null) {
            if (username.length > 0) {
                localStorage.setItem('username', username)
                break
            }
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify([]))
    localStorage.setItem('bg', 'assets/src/img/15.jpg')
    localStorage.setItem('color', '#ff0000')
    localStorage.setItem('chat', 'off')
    localStorage.setItem('init', true)
}

dataFeed()
// data feed
function dataFeed() {
    let bg = localStorage.getItem('bg')
    let color = localStorage.getItem('color')
    let getData = JSON.parse(localStorage.getItem('bookmarks'))
    body.style = `--main-color: ${color};
    background: url(${bg}) center center / cover no-repeat;`

    let allLinkBox = getData.map(item => {
        return `<a href=${item.url} target="_blank">
            <button title=${item.name}>
                <img src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=64">
            </button>
        </a>
        `
    })

    bookmarksContent.innerHTML = allLinkBox.join(" ")
}

// alertBox
let clearAlert
function alertBox(text) {
    alertContent.classList.add('active')
    alertContent.innerHTML = text

    clearAlert = setTimeout(() => {
        alertContent.classList.remove('active')
    }, 3000)
}

// clock
setInterval(() => {
    let time = new Date()
    let hour = time.getHours()
    let min = time.getMinutes()
    let sec = time.getSeconds()
    am_pm = "AM"

    if (hour > 12) {
        hour -= 12
        am_pm = "PM"
    }
    if (hour == 0) {
        hr = 12
        am_pm = "AM"
    }

    hour = hour < 10 ? "0" + hour : hour
    min = min < 10 ? "0" + min : min
    sec = sec < 10 ? "0" + sec : sec

    clockBar.style = `animation: aniclock 2s infinite;`
    clockText.innerHTML = `${hour}:${min}:${sec}<span>${am_pm}</span>`
}, 1000)

// google search
googleSearch.addEventListener('change', () => {
    setTimeout(() => {
        googleSearch.value = ''
        bookmarksSearch.classList.remove('active')
    }, 500)
})

googleSearch.addEventListener('dblclick', () => {
    if (googleSearch.value.length > 0) {
        let a = document.createElement('a')
        a.href = `https://google.com/search?q=${googleSearch.value}`
        a.target = '_blank'
        a.click()
    }
})

googleSearch.addEventListener('keyup', () => {
    let value = googleSearch.value.trim()

    if (googleSearch.value.length > 0) {
        bookmarksSearch.classList.add('active')

        let bookMarks = JSON.parse(localStorage.getItem('bookmarks'))
        console.log(bookMarks)
        let searchValue = bookMarks.filter((data) => {
            return data.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
        })

        searchValue = searchValue.map(item => {
            return `
            <a class="item" href="${item.url}" target="_blank">
                <button class="${item.cat}">${item.name}</button>
            </a>
            `
        })

        if (searchValue.length != 0) {
            resultBookmarks.innerHTML = searchValue.join(" ")
        } else {
            resultBookmarks.innerHTML = '<h1>No Result Found.</h1>'
        }

    } else {
        bookmarksSearch.classList.remove('active')
    }
})

// add links
openAddlink.addEventListener('click', () => {
    addLink.classList.add('active')
})

addLink.addEventListener('click', (e) => {
    if (e.target.className == 'add-link active') {
        addLink.classList.remove('active')
    }
})

addLink.addEventListener('submit', (e) => {
    e.preventDefault()
    let name = addLink.querySelector('.name')
    let url = addLink.querySelector('.url')
    let cat = addLink.querySelector('.cat')
    let pro = addLink.querySelector('.pro')

    let addProtocol = {
        non: url.value,
        http: `http://${url.value}`,
        https: `https://${url.value}`,
        ftp: `ftp://${url.value}`,
        page: `page/page.html?page=data:text/html,${encodeURI(encodeURI(url.value))}`
    }

    let data = {
        name: name.value,
        url: addProtocol[pro.value],
        cat: cat.value
    }

    let bookMarks = JSON.parse(localStorage.getItem('bookmarks'))
    bookMarks.push(data)
    localStorage.setItem('bookmarks', JSON.stringify(bookMarks))

    clearTimeout(clearAlert)
    alertBox('Link added')
    dataFeed()
    addLink.querySelector('.name').value = ''
    addLink.querySelector('.url').value = ''
})

// remove links
closeRemoveLinks.addEventListener('click', () => {
    removeContent.classList.remove('active')
    removeLinks.innerHTML = '<h2>Loading...</h2>'
})

openRemovelink.addEventListener('click', () => {
    removeContent.classList.add('active')
    let getData = JSON.parse(localStorage.getItem('bookmarks'))

    let allLinks = getData.map(item => {
        return `
            <div class="item">
            <h3>${item.name}</h3>
            <span>${item.cat}</span>
            <p>${item.url}</p>
            </div>
        `
    })

    setTimeout(() => {
        removeLinks.innerHTML = allLinks.join(" ")
        let allItems = removeLinks.querySelectorAll('.item')

        allItems.forEach(item => {
            item.addEventListener('click', () => {
                item.remove()
            })
        })
    }, 1000)
})

saveRemoveLink.addEventListener('click', () => {
    let allItems = removeLinks.querySelectorAll('.item')
    let restItem = []

    allItems.forEach(item => {
        data = {
            name: item.querySelector('h3').innerHTML,
            url: item.querySelector('p').innerHTML,
            cat: item.querySelector('span').innerHTML
        }
        restItem.push(data)
    })

    let getData = JSON.parse(localStorage.getItem('bookmarks'))
    getData = restItem
    localStorage.setItem('bookmarks', JSON.stringify(getData))

    clearTimeout(clearAlert)
    alertBox('Saved')
    dataFeed()
    removeContent.classList.remove('active')
    removeLinks.innerHTML = '<h2>Loading...</h2>'
})

// chat

openChat.addEventListener('click', () => {
    if (localStorage.getItem('chat') == 'on') {
        chat.classList.add('active')
    } else {
        alertBox("Chat is off. Go to settings.")
    }
})

closeChat.addEventListener('click', () => {
    chat.classList.remove('active')
})


if (localStorage.getItem('chat') == 'on') {
    let socket = io(mainUrl)

    socket.emit('new-user', {
        name: localStorage.getItem('username')
    })

    // get all username
    socket.on('send-all-user', data => {
        chatContent.innerHTML += `
    <li class="online">
        <div>${getCurrentTime()} | ${data.length}</div>
        <div>${data.join(' + ')}</div>
    </li>`

        chatScroll()
    })

    // get anyone conn 
    socket.on('user-conneted', data => {
        chatContent.innerHTML += `
    <li class="online">
        <div>${getCurrentTime()}</div>
        <div>User connected | ${data} | right now</div>
    </li>`

        chatScroll()
    })

    // user dis conn
    socket.on('user-disconneted', data => {
        chatContent.innerHTML += `
    <li class="offonline">
        <div>${getCurrentTime()}</div>
        <div>User Disconnected | ${data} | right now</div>
    </li>`

        chatScroll()
    })

    chatMessageBox.addEventListener('submit', (e) => {
        e.preventDefault()

        let mesBox = chatMessageBox.querySelector('input')
        if (mesBox.value.length > 0) {
            chatContent.innerHTML += `
            <li class="self">
                <div>${getCurrentTime()} | You</div>
                <div>${mesBox.value}</div>
            </li>
            `
            socket.emit('chat-mess', {
                name: localStorage.getItem('username'),
                message: mesBox.value
            })
            mesBox.value = ''
        }

        chatScroll()
    })

    // get message
    socket.on('get-mess', data => {
        chatContent.innerHTML += `
    <li class="client">
        <div>${data.name} | ${getCurrentTime()}</div>
        <div>${data.message}</div>
    </li>`
        clearTimeout(clearAlert)
        chatScroll()
    })
}

function chatScroll() {
    chatContent.scrollTop = chatContent.scrollHeight
}

function getCurrentTime() {
    let time = new Date()
    chatContent.scrollTop = chatContent.scrollHeight
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}