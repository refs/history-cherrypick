let search = document.getElementById('search')
let deleteB = document.getElementById('delete')
let text = document.getElementById('text')
let result = document.getElementById('result')

tablify = function (set) {
  return `
  <table class='table'>
  <thead>
    <tr>
      <th scope='col'>link</th>
    </tr>
  </thead>
    <tbody>
        ${renderBody(set)}
    </tbody>
  </table>
  `
}

renderBody = (set) => {
  out = ""
  set.forEach(e => { out += `<tr><td><a href=${e.url}>${e.title == '' ? '[untitled]' : e.title}</a></td><tr>` })
  return out
}

search.onclick = (e) => {
  chrome.history.search(searchPayload(), function (r) {
    result.innerHTML = `${r.length} matches` + '\n' + tablify(r.map(e => ({ url: e.url, title: e.title })))
  })
};

deleteB.onclick = () => {
  let total = 0
  chrome.history.search(searchPayload(), function (r) {
    r.forEach(element => {
      chrome.history.deleteUrl({ url: element.url }, function () {
        total++
      })
    });
    result.innerHTML = `removed ${r.length} url's`
  })
}

let searchPayload = () => {
  return {
    'text': text.value,
    'startTime': 946684800,
    'maxResults': 50000
  };
}