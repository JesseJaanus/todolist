let lisääTehtäväNappi = document.getElementById('lisääTehtävä');
let tehtäväContainer = document.getElementById('tehtäväContainer');
let syötekenttä = document.getElementById('syöttökenttä');
let tallennetutTehtävät = [];  // Tallennetaan tehtävät Local Storageen.

// Palauta tallennetut tehtävät sivun latauksen yhteydessä.
palautaTallennetutTehtävät();

// Lisää tehtävä listaan kun Enter-näppäintä painetaan.
syötekenttä.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        if (tarkistaSyöte()) {
            lisääTehtävä();
        }
    }
});

// Lisää tehtävä listaan kun plus-nappia painetaan.
lisääTehtäväNappi.addEventListener('click', function() {
    if (tarkistaSyöte()) {
        lisääTehtävä();
    }
});

// Tarkista syöte ennen tehtävän lisäämistä.
function tarkistaSyöte() {
    let tehtäväTeksti = syötekenttä.value.trim(); // Poistaa ylimääräiset välilyönnit
    if (tehtäväTeksti.length < 3) {
        // Liian lyhyt syöte
        syötekenttä.style.border = "2px solid red";
        alert("Tehtävän on oltava vähintään 3 merkkiä pitkä!");
        return false;
    } else {
        // Palauta normaali tila
        syötekenttä.style.border = "1px solid black";
        return true;
    }
}

// Funktio lisää tehtävän listaan.
function lisääTehtävä() {
    let tehtäväTeksti = syötekenttä.value.trim(); // Poistaa ylimääräiset välilyönnit
    if (tehtäväTeksti !== "") {
        let kappale = document.createElement('p');
        kappale.classList.add('paragraph-styling');
        kappale.innerText = tehtäväTeksti;
        tehtäväContainer.appendChild(kappale);

        // Lisää tehtävä tallennettujen tehtävien taulukkoon
        tallennetutTehtävät.push(tehtäväTeksti);

        // Tallenna tehtävät Local Storageen
        tallennaTehtävät();

        // Koodinpätkä sille, että klikkaamalla tehtävä on tehty ja se yliviivataan
        syötekenttä.value = "";
        kappale.addEventListener('click', function(){
            kappale.style.textDecoration = "line-through";
        });
        // Tässä sen sijaan tuplaklikkaamalla poistetaan tehtävä listalta
        kappale.addEventListener('dblclick', function(){
            tehtäväContainer.removeChild(kappale);
            // Poista tehtävä myös tallennetuista tehtävistä
            poistaTallennetuistaTehtävistä(tehtäväTeksti);
        });
    }
}

// Funktio tallentaa tehtävät Local Storageen merkkijonona, pilkulla erotettuna.
function tallennaTehtävät() {
    localStorage.setItem('tehtävät', tallennetutTehtävät.join(','));
}

// Funktio poistaa tehtävän tallennetuista tehtävistä, eli local storagesta.
function poistaTallennetuistaTehtävistä(tehtävä) {
    // Tässä etsitään ja poistetaan tehtävä tallennetuista tehtävistä, ehkä vähän vaikeasti kirjoitettuna. 
    const indeksi = tallennetutTehtävät.indexOf(tehtävä);
    if (indeksi !== -1) {
        tallennetutTehtävät.splice(indeksi, 1);
        // Tallennetaan päivitetyt tehtävät Local Storageen.
        tallennaTehtävät();
    }
}

// Palauta tallennetut tehtävät Local Storagesta sivun latauksen yhteydessä.
function palautaTallennetutTehtävät() {
    let tallennettuData = localStorage.getItem('tehtävät');
    if (tallennettuData) {
        // Palauta tallennettu merkkijono takaisin taulukkona.
        tallennetutTehtävät = tallennettuData.split(',');

        // Näytä Localiin tallennetut tehtävät. 
        tallennetutTehtävät.forEach(function(tehtäväTeksti) {
            lisääTehtäväLista(tehtäväTeksti);
        });
    }
}

// Lisää tallennetut tehtävät listaan.
function lisääTehtäväLista(tehtäväTeksti) {
    let kappale = document.createElement('p');
    kappale.classList.add('paragraph-styling');
    kappale.innerText = tehtäväTeksti;
    tehtäväContainer.appendChild(kappale);

      // Koodinpätkä sille, että klikkaamalla tehtävä on tehty ja se yliviivataan
      kappale.addEventListener('click', function(){
        kappale.style.textDecoration = "line-through";
    });
    // Tässä sen sijaan tuplaklikkaamalla poistetaan tehtävä listalta
    kappale.addEventListener('dblclick', function(){
        tehtäväContainer.removeChild(kappale);
        // Poista tehtävä myös tallennetuista tehtävistä
        poistaTallennetuistaTehtävistä(tehtäväTeksti);
    });
}

