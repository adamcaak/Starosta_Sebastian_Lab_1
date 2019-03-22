document.addEventListener('DOMContentLoaded', function (event) {

    let boom = new Audio('dzwieki/boom.wav');
    let clap = new Audio('dzwieki/clap.wav');
    let hihat = new Audio('dzwieki/hihat.wav');
    let kick = new Audio('dzwieki/kick.wav');
    let openhat = new Audio('dzwieki/openhat.wav');
    let ride = new Audio('dzwieki/ride.wav');
    let snare = new Audio('dzwieki/snare.wav');
    let tink = new Audio('dzwieki/tink.wav');
    let tom = new Audio('dzwieki/tom.wav');

    //dodanie dzwikow do tablicy
    let dzwieki = [
        boom, clap, hihat, kick, openhat, ride, snare, tink, tom
    ];

    //stworzenie kanalow
    let kanal1 = [];
    let kanal2 = [];
    let kanal3 = [];
    let kanal4 = [];

    let kanaly = [kanal1, kanal2, kanal3, kanal4];

    let jestNagrywane = false;

    let przyciskOdtwarzaj = document.querySelector('#odtwarzaj');
    let przyciskNagrywaj = document.querySelector('#nagrywaj');

    //dzwieki przypisane do klawiszy 0-9
    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 49:
                dzwieki[0].graj();
                nagrywaj(dzwieki[0]);
                break;
            case 50:
                dzwieki[1].graj();
                nagrywaj(dzwieki[1]);
                break;
            case 51:
                dzwieki[2].graj();
                nagrywaj(dzwieki[2]);
                break;
            case 52:
                dzwieki[3].graj();
                nagrywaj(dzwieki[3]);
                break;
            case 53:
                dzwieki[4].graj();
                nagrywaj(dzwieki[4]);
                break;
            case 54:
                dzwieki[5].graj();
                nagrywaj(dzwieki[5]);
                break;
            case 55:
                dzwieki[6].graj();
                nagrywaj(dzwieki[6]);
                break;
            case 56:
                dzwieki[7].graj();
                nagrywaj(dzwieki[7]);
                break;
            case 57:
                dzwieki[8].graj();
                nagrywaj(dzwieki[8]);
                break;
        }
    });


    //zmienia flage nagrywanie oraz tekst przycisku
    przyciskNagrywaj.addEventListener('click', zmiana);
    function zmiana(event) {
        jestNagrywane = !jestNagrywane;
        przyciskNagrywaj.textContent = jestNagrywane ? 'Zakoncz nagrywanie' : 'Zacznij nagrywac';
    }

    //zapisuje nagranie w aktywnym kanale
    function nagrywaj(audioElement) {
        if (jestNagrywane) {
            let kanalyCheckbox = document.querySelectorAll('.kanal');
            kanalyCheckbox.forEach((element, indeks) => {
                if (element.checked) {
                    kanaly[indeks].push(audioElement);
                }
            });
        }
    }

     /*wlacza sie dzwiek, ktory wcisniemy*/
     let dzwiekPrzyciski = document.querySelectorAll('.dzwiekPrzycisk');
     dzwiekPrzyciski.forEach((element, indeks) => {
         element.addEventListener('click', () => {
             dzwieki[indeks].play();
             nagrywaj(dzwieki[indeks]);
         });
     });
 

    //Odtwarza nagranie dzwieki z aktywnych kanalow
    przyciskOdtwarzaj.addEventListener('click', graj);
    function graj(event) {
        let kanalyCheckbox = document.querySelectorAll('.kanal');
        kanalyCheckbox.forEach((element, indeks) => {
            if (element.checked) {
                kanaly[indeks].forEach((element2, indeks2) => {
                    setTimeout(() => {
                        element2.play();
                        console.log(element2);
                    }, 500 * (indeks2 + 1)); 
                });
            }
        });
    }
});