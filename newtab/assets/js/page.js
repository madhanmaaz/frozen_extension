let iframe = document.querySelector('iframe')
let page = new URLSearchParams(location.search).get('page')

iframe.src = page