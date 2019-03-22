document.addEventListener('DOMContentLoaded', function () {

    let zaladujObrazek = document.querySelector('#wczytaj');
    let obrazek = document.querySelector('#obrazek');
    let rysuj = document.querySelector('#rysuj');
    let canvas = document.querySelector('canvas');
    let jaskrawosc = document.querySelector('#jaskrawosc');
    let kontrast = document.querySelector('#kontrast');
    let sepia = document.querySelector('#sepia');
    let nasycenie = document.querySelector('#nasycenie');
    let c = canvas.getContext('2d');

    jaskrawosc.addEventListener('change', function() {
        c.filter = `brightness(${jaskrawosc.value}%)`;
        c.drawImage(obrazek, 0, 0);
        console.log(`Jaskrawosc: ${jaskrawosc.value}`)
    }); 

    kontrast.addEventListener('change', function() {
        c.filter = `contrast(${kontrast.value}%)`;
        c.drawImage(obrazek, 0, 0);
        console.log(`Kontrast: ${kontrast.value}`)
    });

    
    sepia.addEventListener('change', function() {
        c.filter = `sepia(${sepia.value}%)`;
        c.drawImage(obrazek, 0, 0);
        console.log(`Sepia: ${sepia.value}`)
    });

    nasycenie.addEventListener('change', function() {
        c.filter = `saturate(${nasycenie.value}%)`;
        c.drawImage(obrazek, 0, 0);
        console.log(`Nasycenie: ${nasycenie.value}`)
    });

    rysuj.addEventListener('click', function() {
        canvas.width = obrazek.clientWidth;
        canvas.height = obrazek.clientHeight;
        c.drawImage(obrazek, 0, 0, canvas.width, canvas.height);
        pixelData = c.getImageData(0, 0, canvas.width, canvas.height);
    }, false);

    zaladujObrazek.onchange = zaladujZmiany;

    function zaladujZmiany(event) {
        let plikObrazka = event.target.files[0];
        obrazek.setAttribute('src', URL.createObjectURL(plikObrazka));
    };

}, false);