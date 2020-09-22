var corn, land, landPrice, citizens, year;
corn = 6000;
land = 400;
landPrice = 10;
citizens = 100;
year = 0;
var quotes = ["If a builder build a house for some one, and does not construct it properly, and the house which he built fall in and kill its owner, then that builder shall be put to death.", "I am old, so give me your peace. Wisdom comes with age.", "Mesopotamiawill be one together as city-states we cannot create a full out war over nothing, this will be settled.", "The first duty of government is to protect the powerless from the powerful."]

var feed = 0;
var harvest, citizenError, landError, cornError, growthMsg, play, count, interval;
play = true;
count = false;

document.getElementById("feed").addEventListener("change", getMaxFeed);
document.getElementById("farm").addEventListener("change", getMaxFarm);

document.getElementById("feed").addEventListener("keyup", getMaxFeed);
document.getElementById("farm").addEventListener("keyup", getMaxFarm);

function getMaxFeed() {
    document.getElementById("feed").max = corn - document.getElementById("farm").value;
    document.getElementById("farm").max = corn - document.getElementById("feed").value;
    updateGrowth();
    updateError();

}

function getMaxFarm() {
    document.getElementById("farm").max = corn - document.getElementById("feed").value;
    document.getElementById("feed").max = corn - document.getElementById("farm").value;
    updateGrowth();
    updateError();

}

function updateGrowth() {
    if (document.getElementById("feed").value > citizens * 20) {
        growthMsg = "your people will grow";
    } else if (document.getElementById("feed").value < citizens * 20) {
        growthMsg = "your people will starve";
    } else {
        growthMsg = "";
    }
    document.getElementById("growth").innerHTML = growthMsg;
}

function updateError() {
    play = true;
    landError = "";
    citizenError = "";
    cornError = "";
    if (document.getElementById("farm").value > land * 2) {
        landError = "<li>you dont have enough Land </li>";
        play = false;
    }
    if (document.getElementById("farm").value > citizens * 20) {
        citizenError = "<li>you dont have enough citizens</li>";
        play = false;
    }

    if (parseInt(document.getElementById("feed").value) + parseInt(document.getElementById("farm").value) > corn) {
        cornError = "<li>you dont have enough Corn</li>"
        play = false;
    }
    document.getElementById("error").innerHTML = "" + landError + citizenError + cornError;
}

function updateRessources() {
    document.getElementById("ressources").innerHTML = "<li id = 'corn'>Corn: " + corn + "</li><li id = 'citizens'>Citizens: " + citizens + "</li><li id = 'land'>Land: " + land + "</li><li id = 'landPrice'>Land Price: " + landPrice + "</li><li id = 'year'>Year: " + year + "</li>";

}



function buyLand(amount) {
    if (land + amount < 0 || corn - amount * landPrice < 0) {
        return;
    } else {
        land += amount;
        corn -= landPrice * amount;
        updateGrowth();
        updateError();
        updateRessources();

        return;
    }

}



function playRound() {

    if (!play||count) {
        return;
    }
    count = true;

    landPrice = Math.ceil(Math.random() * 5) + 5 + year;
    harvest = 0;
    for (var i = 0; i < document.getElementById("farm").value; i += 2) {
        harvest += Math.ceil(Math.random() * 10);

    }

    feed += document.getElementById("feed").value - 20 * citizens;
    corn += -document.getElementById("feed").value - document.getElementById("farm").value;
    for (feed = feed; feed >= 40; feed -= 40) {
        citizens++;
    }

    for (feed = feed; feed < 0; feed += 20) {
        citizens--;
    }

    document.getElementById("feed").value = citizens * 20;
    year++;
    updateRessources();
    if (citizens <= 0) {
        document.getElementById("gameover").className = "visible";
    }

    document.getElementById("hammurabiSays").innerHTML = quotes[year % 4];
    var i = 0;
    interval = 0;
    interval = setInterval(function () {
        if (i == harvest) {
            updateGrowth();
            updateError();
            clearInterval(interval);
            count = false;
            return;
        }
        
        else if (harvest - i < 10) {
            corn++;
            i++;
        } else if (harvest - i < 100) {
            corn += 10;
            i += 10;
        } else {
            corn += 100;
            i += 100;
        }

        updateRessources();
        
        return;
    }, 30);
    
    return;

}







function newGame() {
    document.getElementById("gameover").className = "hidden";
    corn = 6000;
    land = 400;
    landPrice = 10
    citizens = 100;
    year = 0;
    updateRessources();
}