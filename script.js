const searchBtn = document.getElementById('search-btn');
const monsterList = document.getElementById('monster');
const monsterDetailsContent = document.querySelector('.monster-details-content');
const monsterCloseBtn = document.getElementById('monster-close-btn');
const closeGDI = document.querySelector('.monster-title');
const imageInput = document.querySelector('.monster-img');
const monsterDetails = document.querySelector('.monster-details');

//event listeners
searchBtn.addEventListener('click', getMonsterList);
monsterList.addEventListener('click', getMonsterStats);
monsterCloseBtn.addEventListener('click', () => {
    monsterDetailsContent.parentElement.classList.remove('showStats');
});

window.onclick = function(event) {
console.log("I'm clicking");

};

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
                            <div id="cardimg">
                                 <img class="monster-img" src = "" alt="monster">
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
                    monsterList.classList.add('notFound');
                    html = "Sorry, we didn't find anything :<";
          }

        monsterList.innerHTML = html;
     });
 };

//get stats of monster
function getMonsterStats(e){
    e.preventDefault();
    if(e.target.classList.contains('monster-btn')){
        const index = e.target.parentElement.parentElement.getAttribute('data-id');
        console.log(index);
        fetch(`https://www.dnd5eapi.co/api/monsters/${index}`)
        .then(response => response.json())
        .then(data => monsterStatsModal(data));
    }
}

//create modal
function monsterStatsModal(index){
    monsterDetails.style.display = "block";
    monsterDetailsContent.parentElement.classList.add('showStats');
    console.log(index);
    let html = `
        <h2 class = "monster-title">${index.name}</h2>
        <p class="monster-type">${index.type}</p>
        <div id="monster-stats-img">
            <img class=monster-img src="" alt="">
        </div>
        <div class="monster-stats">
            <h3>Stats</h3>
            <p alt="...">${index.subtype}</p>
            <p>Size: ${index.size}</p>
            <p>Alignment: ${index.alignment}</p>
            <p>AC: ${index.armor_class}</p>
            <p>HP: ${index.hit_points}</p>
        </div>

        <div class="monster-link">
            <a href="https://www.dndbeyond.com/monsters" target="_blank">DnDBeyond Page</a>
        </div>
    `;
    monsterDetailsContent.innerHTML = html;
    monsterDetailsContent.parentElement.classList.add('showStats');
    console.log(monsterDetailsContent);
}

monsterDetails.addEventListener("click", closeModal);

function closeModal() {
    monsterDetails.style.display = "none";
    console.log("I'm clicked");
};

  //monster place holder images
  const images = [
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/aberration.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/beast.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/celestial.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/construct.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/dragon.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/elemental.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/fey.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/fiend.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/giant.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/humanoid.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/monstrosity.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/ooze.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/plant.jpg",
      "https://www.dndbeyond.com/content/1-0-1920-0/skins/waterdeep/images/icons/monsters/undead.jpg"
  ];


  function fillImage (images) {
    const randIndex = Math.floor(Math.random() * images.length);
    imageInput.src = images[randIndex];
  };