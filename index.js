const urlInput = document.getElementById("url-input")
const saveInptBtn = document.getElementById("save-inpt-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const urlList = document.getElementById("url-list")

let urlArr = []

const myUrlsFromLocalStorage = JSON.parse(localStorage.getItem("myInputs"))

if (myUrlsFromLocalStorage) {
  urlArr = myUrlsFromLocalStorage
  renderInput(urlArr)
} else {
  urlList.innerHTML = `<li>No URLs yet.</li>`
}

saveTabBtn.addEventListener("click", function() {
  chrome.tabs.query({active: true,currentWindow: true}, function(tabs) {
    urlArr.push(tabs[0].url)
    localStorage.setItem("myInputs", JSON.stringify(urlArr))
    renderInput(urlArr)
  })
})


saveInptBtn.addEventListener("click", function() {
  let input = urlInput.value
  urlArr.push(input)
  localStorage.setItem("myInputs", JSON.stringify(urlArr))
  renderInput(urlArr)
  urlInput.value = ""
})

deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  urlArr = []
  renderInput(urlArr)
  urlInput.value = ""
})

function cleanInput() {
}

function renderInput(input) {
  let listItems = ""
  for (let i = 0; i < input.length; i++) {
    listItems += `<li><a href ="${input[i]}" target="_blank">${input[i]}</a></li>`
  }
  urlList.innerHTML = listItems
}