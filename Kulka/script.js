document.addEventListener('DOMContentLoaded', (event) => {
    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let krancowyX = canvas.width / 4;
    let krancowyY = canvas.height / 4;
    let promienKulki = 20;
    let promienKrancowy = 10;


    function Poruszanie(ruchX, ruchY) {
        Rysuj();
        x += ruchX;
        y += ruchY;
    }

    let absolute;
    let alpha;
    let beta;
    let gamma;

    window.addEventListener('deviceorientation', (event) => {

        absolute = event.absolute;
        alpha = event.alpha;
        beta = event.beta;
        gamma = event.gamma;
        
    }, true);

    setInterval(() => {
        Poruszanie(gamma, beta);
        rysujKrancowy();
    }, 75);

    setInterval(() => {
        if(Math.round(x) - 10 === Math.round(krancowyX) && Math.round(y) - 10 === Math.round(krancowyY)) {
            document.querySelector('#Wygrana').textContent = 'BRAWO!!!';
        }
    }, 75)

    function Rysuj() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, promienKulki, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }

    function rysujKrancowy() {
        context.beginPath();
        context.arc(krancowyX + promienKrancowy, krancowyY + promienKrancowy, promienKrancowy, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }


}, false);