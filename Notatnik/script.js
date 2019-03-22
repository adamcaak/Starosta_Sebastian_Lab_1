// tworzenie localStorage
let notatki =[];
if(localStorage.getItem("testowyObiekt")===null){              
    localStorage.setItem('testowyObiekt', JSON.stringify(notatki));
}
 

// oczekiwanie na wypełniony formularz
document.addEventListener( "DOMContentLoaded", () => {      
    let formularz = document.getElementById( "formularz" );
    formularz.addEventListener( "submit", function( e ) {
        e.preventDefault();
        let json = toJSONString( this );
    }, false);
});
 

// pobieranie danych z localstorage
var odebranyObiekt = localStorage.getItem('testowyObiekt'); 
notatki = JSON.parse(odebranyObiekt);
pokazNotatki();
 
//odświeżanie/czyszczenie notatek
function pokazNotatki(){                           
let kontener = document.getElementById("kontener"); 
for(i=1;i<kontener.childElementCount;i++){       
    kontener.removeChild[i];
}
let ids=0;

//tworzenie dla każdej notatki osobnego elementu
notatki.forEach(element => {                          
    let notatka = document.createElement("div");
    notatka.className = "notatka "+element.kolor;
    notatka.id=ids++;
 
//"ważność" notatki
    if(element.priority==1){                        
        notatka.style.order=1;
    }

//tytuł notatki
    let tytulNotatki = document.createElement('textarea'); 
    tytulNotatki.className="tytulNotatki";
    tytulNotatki.value = element.tytul;
    tytulNotatki.disabled=true;
 
//opis notatki
    let opisNotatki = document.createElement('textarea'); 
    opisNotatki.className="opisNotatki";
    opisNotatki.value = element.opis;
    opisNotatki.disabled=true;
 
//data dodania notatki
    let stopkaNotatki= document.createElement('footer');   
    stopkaNotatki.className="stopkaNotatki";
    stopkaNotatki.appendChild(document.createTextNode("Ostatnia modyfikacja:"+element.date));
 
//checkbox "ważności" notatki
    let sprawdzanieNotatki = document.createElement('input');
    sprawdzanieNotatki.type='checkbox';
    if(element.priority==1){
        sprawdzanieNotatki.checked=true;
    }
    else{
        sprawdzanieNotatki.checked=false;
    }
    sprawdzanieNotatki.disabled=true;
 
    let edycjaNotatki = document.createElement('button');        // przycisk edycji
    edycjaNotatki.innerText="Edit";
    edycjaNotatki.onclick=(e)=>                              // funkcjonalność edycji
    {
        e.target.parentNode.parentNode.childNodes[0].disabled=false; 
        e.target.parentNode.parentNode.childNodes[1].disabled=false;
        e.target.parentNode.childNodes[3].disabled=false;
        zapisNotatki.hidden=false;
        edycjaNotatki.hidden=true;
    };

//przycisk zapisu 
    let zapisNotatki = document.createElement('button');            
    zapisNotatki.innerText="Save";
    zapisNotatki.hidden=true;
    zapisNotatki.onclick = (e)=>                                    
    {           
        parentDiv=e.target.parentNode.parentNode;
        zapisNotatki.hidden=true;
        edycjaNotatki.hidden=false;
        notatki[notatka.id].tytul=parentDiv.childNodes[0].value;     
        notatki[notatka.id].opis=parentDiv.childNodes[1].value;
        if(e.target.parentNode.childNodes[3].checked==true){
            notatki[notatka.id].priority=1;
        }
        else{
            notatki[notatka.id].priority=2;            
        }
        parentDiv.childNodes[0].disabled=true;
        parentDiv.childNodes[1].disabled=true;
        e.target.parentNode.childNodes[3].disabled=true;
        notatki[notatka.id].date= new Date();

//wysłanie zmian do localstorage i odświeżenie danych
        localStorage.setItem('testowyObiekt', JSON.stringify(notatki)); 
        pokazNotatki();
    }
 
//stworzenie diva i dodanie notatki
    notatka.appendChild(tytulNotatki);                        
    notatka.appendChild(opisNotatki);
    stopkaNotatki.appendChild(edycjaNotatki);
    stopkaNotatki.appendChild(zapisNotatki);
    stopkaNotatki.appendChild(sprawdzanieNotatki);
    notatka.appendChild(stopkaNotatki);
 
    let flaga= true;
    kontener.childNodes.forEach(e=>{
        if(e.id==notatka.id){
            flaga=false;
            }
        })
    if(flaga){
        kontener.appendChild(notatka);                              
    }
});
}
 
 //dodanie notatki z formularza
function toJSONString( formularz ) {             
 
    let obj = {};
    let elements = formularz.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {                       
        let element = elements[i];
        let name = element.name;
        let value;
        if(element.type =="checkbox"){
            if(element.checked== true){
                 value = 1;
            }   
            else{ value = 2;}
        }
        else{
             value = element.value;
        }
        if( name ) {
            obj[ name ] = value;
        }
    }
    obj["kolor"]= formularz.parentNode.className.split(' ')[1];
    console.log(obj["kolor"]);
    obj["date"] = new Date();

//wysłanie do localstorage i odświeżenie danych
    notatki.push(obj)                                             
    localStorage.setItem('testowyObiekt', JSON.stringify(notatki));
    pokazNotatki();                                                
}
 
//funkcja zmiany koloru
function zmienKolor(e){                                        
    let parent = e.parentNode.parentNode.parentNode.parentNode;
    parent.classList.remove("niebieski");
    parent.classList.remove("czarny");
    parent.classList.remove("czerwony");
    parent.classList.remove("zolty");
    parent.classList.remove("bialy");
    parent.classList.add(e.className.split(' ')[1]);
}