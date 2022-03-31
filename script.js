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
        let index = e.target.parentElement;
        fetch(`https://www.dnd5eapi.co/api/monsters/${index}`)
        .then(response => response.json())
        .then(data => console.log(data.results));
    }
    console.log(e.target);
}

//create modal
function monsterStatsModal(index){
    //console.log(monster);
    index = index[0];
    let html = `
            <h2 class = "monster-title">${index.name}</h2>
            <p class="monster-type">${index.type}</p>
        <div class="monster-stats-img">
            <img src="http://placehold.jp/400x400.png" alt="">
        </div>
        <div class="monster-stats">
            <h3>Stats</h3>
            <p>${index.subtype}</p>
            <p>${index.size}</p>
            <p>${index.alignment}</p>
            <p>${index.armor_class}</p>
            <p>${index.hit_points}</p>
        </div>

        <div class="monster-link">
            <a href="https://www.dndbeyond.com/monsters" target="_blank">DnDBeyond Page</a>
        </div>
    `;
    monsterDetailsContent.innerHTML = html;
    monsterDetailsContent.parentElement.classList.add('showStats');
}