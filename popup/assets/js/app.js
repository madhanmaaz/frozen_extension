let ytdBtns = document.querySelector('#ytd .btns')

async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}

getActiveTabURL().then(res => {
    youtube(res.url)
})

function youtube(url) {
    if (url.slice(0, 29) == 'https://www.youtube.com/watch') {
        let ytdId = new URLSearchParams('?' + url.split("?")[1]).get('v')

        let sites = {
            y2mate: `https://www.y2mate.com/youtube/${ytdId}`,
            mp3Downloads: `https://freemp3downloads.online/en103/download?url=https://www.youtube.com/watch?v=${ytdId}`,
            toMp3: `https://tomp3.cc/youtube-downloader/${ytdId}`,
            y2mateis: `https://y2mate.is/watch?v=${ytdId}`,
            ssyoutube: `https://ssyoutube.com/en379/?a_ts=1671466486.602&url=${url}&utm_campaign=ssyoutube.com&utm_medium=short_domains&utm_source=youtube.com`,
            tendownloader: `https://www.000tube.com/watch?v=${ytdId}`
        }

        let allBtns = ''
        for (let i in sites) {
            allBtns += `<a target="_blank" href="${sites[i]}"><button>${i}</button></a>`
        }

        ytdBtns.innerHTML = allBtns
    } else if (url.slice(0, 32) == 'https://www.youtube.com/playlist') {
        ytdBtns.innerHTML = `<a target="_blank" href="https://freemp3downloads.online/en103/download?url=${url}"><button>download Playlist</button></a>`
    } else {
        ytdBtns.innerHTML = '<p>Youtube video not available.</p>'
    }
}