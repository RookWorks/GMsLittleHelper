const searchBtn = document.getElementById('search-btn');
const monsterList = document.getElementById('monster');
const monsterDetailsContent = document.querySelector('.monster-details-content');
const monsterCloseBtn = document.getElementById('monster-close-btn');

//event listeners
searchBtn.addEventListener('click', getMonsterList);
monsterList.addEventListener('click', getMonsterStats);
monsterCloseBtn.addEventListener('click', () => {
    monsterDetailsContent.parentElement.classList.remove('showStats');
});

//get monster list that matches with tags
function getMonsterList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.dnd5eapi.co/api/monsters?name=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
         console.log(data);
            let html = "";
            if(data.results){
                data.results.forEach(results => {
                    html +=`
                        <div class="monster-card" data-id = "${results.index}">
                            <div class="monster-img">
                                 <img src = "http://placehold.jp/150x150.png" alt="monster">
                            </div>
                            <div class="monster-name">
                                <h3>${results.name}</h3>
                                <a href="#" class="monster-btn">Get Stats</a>
                            </div>
                        </div>
                    `;
                });
                monsterList.classList.remove('notFound');
                }else{
                    html = "Sorry, we didn't find anything :<";
                    monsterList.classList.add('notFound');
          }

        monsterList.innerHTML = html;
     });
 };

//get stats of monster

function getMonsterStats(e){
    alert("index");
    e.preventDefault();
    if(e.target.classList.contains('monster-btn')){
        let monsterItem = e.target.parentElement;
        fetch(`https://www.dnd5eapi.co/api/monsters/${monsterItem}`)
        .then(response => response.json())
        .then(data => console.log(data.monster));
        // fetch(`https://www.dnd5eapi.co/api/${monsterItem.dataset.id}`)
        // .then(response => response.json())
        // .then(data => monsterStatsModal(data.monsters));
        //console.log(monsterItem);
    }
    //console.log(e.target);
}

//create modal
function monsterStatsModal(monster){
    //console.log(monster);
    monster = monster[0];
    let html = `
            <h2 class = "monster-title">${monster.name}</h2>
            <p class="monster-type">${monster.type}</p>
        <div class="monster-stats-img">
            <img src="http://placehold.jp/400x400.png" alt="">
        </div>
        <div class="monster-stats">
            <h3>Stats</h3>
            <p>${monster.strStats}</p>
        </div>

        <div class="monster-link">
            <a href="https://www.dndbeyond.com/monsters" target="_blank">DnDBeyond Page</a>
        </div>
    `;
    monsterDetailsContent.innerHTML = html;
    monsterDetailsContent.parentElement.classList.add('showStats');
}