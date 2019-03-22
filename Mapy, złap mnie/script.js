let mapa;
let uluru;
let marker;
let uzytkownicy = [];
let socket;
let komunikacja = [];
let komunikacjaTeraz = 0;
let nazwaUzytkownika = '';

//Ustawienie ikony gracza
let ikona = 'ikona.png';


document.addEventListener('DOMContentLoaded', () => {
    //Ustawianie nazwy gracza
    nazwaUzytkownika = prompt('Wpisz nazwe uzytkownika', `Uzytkownik${Math.floor(Math.random() * 10)}`);

    let wyslij = document.querySelector('#wyslij');

    wyslij.addEventListener('click', sendMessage);

}, false);

//Pobranie lokalizacji 
function pobierzObencaLokalizacje() {
    navigator.geolocation.getCurrentPosition(success => {
        setTimeout(() => {
            WyswietlLokalizacje(success.coords);
        }, error => {
            console.log(error);
        }, 350);
    });
    
}

//Wyswietlenie lokalizacji uzytkownika
function WyswietlLokalizacje(coords) {
    uluru = {lat: coords.latitude, lng: coords.longitude};
    mapa.setCenter(uluru);
    marker.setPosition(uluru);
    uzytkownicy.push(nazwaUzytkownika);
    mapa.setZoom(12);
}

//Klawisze
    window.addEventListener('keydown', (event) => {
        console.log(event.code);
        let lat = marker.getPosition().lat()
        let lng = marker.getPosition().lng()

        switch(event.code) {
            case 'KeyW':
                lat += 0.01;
                break;
            case 'KeyS':
                lat -= 0.01;
                break;
            case 'KeyA':
                lng -= 0.01;
                break;
            case 'KeyD':
                lng += 0.01;
                break;
        }

        let pozycja = {lat, lng};

        uluru = pozycja;

        marker.setPosition(pozycja);

        let dane = {id: nazwaUzytkownika, lat: uluru.lat, lng: uluru.lng, komunikacja: komunikacja};
        let json = JSON.stringify(dane);

        socket.send(json);
    });

    //Uruchomienie webSocketu.
    function odpalSocket() {
        socket = new WebSocket('ws://77.55.222.58:443');
        socket.addEventListener('open', (event) => {
            console.log(event);
        })

        socket.addEventListener('message', wiadomoscOdebrana);
    }

    //przechwytywanie wysłanych wiadomości
    function wiadomoscOdebrana(event) {
        let dane = JSON.parse(event.data);
        let pos = {lat: dane.lat, lng: dane.lng};
        komunikacja = dane.komunikacja;
        id = dane.id;

        console.log(pos);
        console.log(`komunikacja: ${dane.komunikacja}`);

        if (!uzytkownicy['uzytkownik' + dane.id]) {
            uzytkownicy['uzytkownik' + dane.id] = new google.maps.Marker({
                position: { lat: dane.lat, lng: dane.lng },
                map: mapa,
                icon: ikona
            })
        } else {
            let pos = {lat: dane.lat, lng: dane.lng};
            uzytkownicy['uzytkownik' + dane.id].setPosition(pos);
        }
    }

    //wyświetlenie nowej wiadomości, jeśli się pojawiła (interwałowe sprawdzanie)
    setInterval(() => {
        if(komunikacja.length != komunikacjaTeraz) {
            let chat = document.querySelector('#chat');
            chat.insertAdjacentHTML('beforeend', `<p>${id}: ${komunikacja[komunikacja.length-1]}</p>`);
            komunikacjaTeraz++;
        }
    }, 300)


    //Wysylanie wiadomosci do webSocketu
    function sendMessage(event) {
    let wiadomoscUzytkownika = document.querySelector('#widomoscUzytkownika');     
    komunikacja.push(wiadomoscUzytkownika.value);
    wiadomoscUzytkownika.value = '';
    let dane = {id: nazwaUzytkownika, lat: uluru.lat, lng: uluru.lng, komunikacja: komunikacja};
    console.log(dane);
    let json = JSON.stringify(dane);
    socket.send(json);
}


odpalSocket();

pobierzObencaLokalizacje();

//Startowa lokalizacja naszej mapy
function initMap() {
    uluru = {lat: -25.344, lng: 131.036};
    mapa = new google.maps.Map(
        document.getElementById('mapa'), {zoom: 4, center: uluru});
    marker = new google.maps.Marker({position: uluru, map: mapa, icon: ikona, animation:google.maps.Animation.DROP});
  }
