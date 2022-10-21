const DATA_SOURCE =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
const form = document.querySelector("#searchForm")
const searchKeywordInput = document.querySelector("#searchKeyword")
const siteList = document.querySelector(".siteList")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const keyword = searchKeywordInput.value.trim()

  if (keyword !== "") {
    fetch(DATA_SOURCE)
      .then((resp) => resp.json())
      .then((stations) => {
        renderSearchStation(stations, keyword)
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    alert("請輸入關鍵字")
  }
})

function filterStation(stations, keyword) {
  return stations.filter((station) => station.ar.includes(keyword))
}

function fullStation(stations) {
  return stations.reduce((acc, { ar, sna, tot, sbi }) => {
    return (
      acc +
      `<li class="list-group-item fs-5">
                 <i class="fas fa-bicycle"></i>
                 ${sna.replace("YouBike2.0_", "")} (${sbi}/${tot})<br />
                 <small class="text-muted">${ar}</small>
               </li>`
    )
  }, "")
}

function renderItem(result) {
  siteList.textContent = ""
  siteList.insertAdjacentHTML("afterbegin", result)
}

function renderSearchStation(stations, keyword) {
  let result = filterStation(stations, keyword)
  result = fullStation(result)

  renderItem(result)
}
