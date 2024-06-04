window.onload = function () {
    document.body.style.backgroundColor = "#555";

    // build a list of chicken names
    let chickenNames = ["Sedonia", "Justice", "Ernesto", "Gerardo", "Alison", "Oneil", "Zach"];

    // choose random chicken name
    const chosenName = chooseRandomItem(chickenNames);

    // build a list of chicken colors
    let chickenColors = ["pink", "yellow", "blue", "purple", "brown", "red", "white", "orange"];

    // choose random chicken color
    const chosenColor = chooseRandomItem(chickenColors);

    const chickenHobbies = ["skying", "smoking", "drinking coffee"];

    // build the this is the story of header with the random values 
    const newHeader = `There was a ${chosenColor} chicken, named ${chosenName}, standing in front of the road...`

    // add it or update in the interface
    // grab the h1 by its tagname
    const h1 = document.querySelector("h1");
    // change its text content
    h1.textContent = newHeader;
};

function chooseRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

