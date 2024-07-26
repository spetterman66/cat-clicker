const introduction = document.getElementById("introduction");
const startbutton = document.getElementById("startbutton");
const gameScore = document.getElementById("score");

function start() {
    localStorage.setItem('gameStarted', true);
    localStorage.setItem('score', 0);
    localStorage.setItem('achievement1displayed', false);
    localStorage.setItem('achievement2displayed', false);
    localStorage.setItem('achievement3displayed', false);
    location.reload();
}

function initialize() {
// if game has started, hide introduction
    if (localStorage.getItem('gameStarted')) {
        introduction.style.display = "none";
    }
    if (localStorage.getItem('score')) {
        document.getElementById("score").textContent = localStorage.getItem('score');
    }
}

function pet() {
    new Audio('meow.mp3').play();
    localStorage.setItem('score', parseInt(localStorage.getItem('score')) + 1);
    document.getElementById("score").textContent = localStorage.getItem('score');
}

if (localStorage.getItem('score') == 10) {
    alert("Nice! You got the hang of it! Keep going!");
    localStorage.setItem('achievement1displayed', true);
    if (localStorage.getItem('achievement1displayed')) {
        ;
    }
    else {
        location.reload();
    }
}

if (localStorage.getItem('score') == 50) {
    alert("You're doing great! Keep it up!");
    localStorage.setItem('achievement2displayed', true);
    if (localStorage.getItem('achievement2displayed')) {
        ;
    }
    else {
        location.reload();
    }
}

if (localStorage.getItem('score') == 250) {
    alert("Wow! You're already at 250 points! Keep going!");
    localStorage.setItem('achievement3displayed', true);
    if (localStorage.getItem('achievement3displayed')) {
        ;
    }
    else {
        location.reload();
    }
}

function reset() {
    localStorage.setItem('gameStarted', true);
    localStorage.setItem('score', 0);
    location.reload();
}

function save() {
    // save to json file, but don't cheat :(
    const saveData = {
        score: localStorage.getItem('score'),
        gameStarted: localStorage.getItem('gameStarted'),
        achievement1: localStorage.getItem('achievement1displayed'),
        achievement2: localStorage.getItem('achievement2displayed'),
        achievement3: localStorage.getItem('achievement3displayed')
    }
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = URL.createObjectURL(new Blob([JSON.stringify(saveData)], {type: 'application/json'}));
    a.download = 'save.json';
    a.click();
}

function load() {
    // load game from json file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = function() {
        const file = input.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            const saveData = JSON.parse(reader.result);
            localStorage.setItem('score', saveData.score);
            localStorage.setItem('gameStarted', saveData.gameStarted);
            localStorage.setItem('achievement1displayed', saveData.achievement1);
            localStorage.setItem('achievement2displayed', saveData.achievement2);
            localStorage.setItem('achievement3displayed', saveData.achievement3);
            location.reload();
        }
    }
    input.click();
}