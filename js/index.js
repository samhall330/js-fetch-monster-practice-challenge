let monsterPage = 1
let monstersUrl = `http://localhost:3000/monsters/?_limit=50&_page=${monsterPage}`
const monsterList = document.getElementById("monster-container")
const forwardBtn = document.getElementById("forward")
const backBtn = document.getElementById("back")
const addMonsterForm = document.getElementById("create-monster")




function fetchMonsters(){
    fetch(monstersUrl)
    .then(response => response.json())
    .then(monsterData => renderMonsters(monsterData))
}

function renderMonsters(monsterData) {
    monsterList.innerHTML = " "
    monsterData.forEach(monsterObj => renderMonster(monsterObj))
}

function renderMonster(monsterObj){
    const monsterCard = document.createElement("div")
        monsterCard.classList.add("card")
        monsterCard.dataset.id = monsterObj.id
    const monsterName = document.createElement("h2")
        monsterName.textContent = monsterObj.name
    const monsterAge = document.createElement("h5")
        monsterAge.textContent = `Age: ${parseInt(monsterObj.age)}`
    const monsterDesc = document.createElement("p")
        monsterDesc.textContent = `Description: ${monsterObj.description}`

    monsterCard.append(monsterName, monsterAge, monsterDesc)
    monsterList.append(monsterCard)
}

addMonsterForm.innerHTML =
`<form id="submit-button">
    <label for="name"> Name </label>
    <input name="name" type="text"> </input>
    <br>
    <label for="age"> Age </label>
    <input name="age" type="number"> </input>
    <br>
    <label for="description"> Description </label>
    <input name="description" type="text"> </input>
    <br>
    <input type="submit"></input>
</form>`

const submitBtn = document.getElementById("submit-button")

function addMonster(formSubmission){
    formSubmission.preventDefault()
    let newMonster = {
        name: formSubmission.target.name.value,
        age: formSubmission.target.age.value,
        description: formSubmission.target.description.value
    }
    fetch(monstersUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newMonster)
    })
    .then(response => response.json())
    .then(newMonster => renderMonster(newMonster))
    formSubmission.target.reset()
}

submitBtn.addEventListener("submit", (event) => addMonster(event))

forwardBtn.addEventListener("click", (event) => forwardPage())
backBtn.addEventListener("click", (event) => backPage())

function forwardPage(){
   monsterPage += 1
   fetchMonsters()
}

function backPage(){
   if(monsterPage > 1){
       monsterPage -= 1
       fetchMonsters()
   }
}

fetchMonsters()