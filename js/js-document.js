var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.onresize = function() {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};


var info = document.getElementById("content");
var infoButton = info.getElementsByClassName("info-button")[0];
var infoContent = info.getElementsByClassName("info")[0];

var distance = document.getElementById("distance");

var stats = false; //Painel aberto ou fechado
var active = null; //Conteudo atualmente ativo

var enable = null; //Quando null o painel ao ser fechado e ocultado
var currentDistance = null;
var infoEvent;

infoButton.addEventListener("click", function() {
    stats = !stats;
    if (stats) {
        info.classList.add("active");
    } else {
        info.classList.remove("active");
        clearInterval(infoEvent);
        infoEvent = setTimeout(changeActiveElement, 1000, enable);
        enable = null;
    }
});

var camera = document.getElementsByTagName("a-camera")[0];

function markerEvent(value) {
    if (!stats) {
        clearInterval(infoEvent);
        changeActiveElement(value);
    }
    enable = value;
}

function changeActiveElement(value) {
    if (active != null)
        infoContent.querySelector('[value="' + active + '"]').classList.remove("active");

    active = value;

    if (active != null) {
        infoContent.querySelector('[value="' + active + '"]').classList.add("active");
        info.classList.add("display");
    } else
        info.classList.remove("display");
}

function changeCurrentDistance() {
    //alert("update");
    if (currentDistance != null) {
        if (currentDistance > 1000)
            distance.innerText = (currentDistance / 1000).toFixed(2) + " km";
        else
            distance.innerText = currentDistance.toFixed() + " m";
    } else {
        distance.innerText = "";
    }
}