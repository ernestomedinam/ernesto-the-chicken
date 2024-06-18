window.onload = function () {
    const [
        chickenNames, 
        chickenColors, 
        chickenTraits
    ] = getInitialData(); 
    const h1 = document.querySelector("h1");
    h1.textContent = buildStoryIntro(
        chickenNames, 
        chickenColors, 
        chickenTraits
    );
    document.body.style.backgroundColor = matchColorInString(
        h1.textContent,
        chickenColors
    );
    const lines = [
        "The chicken ponders whether to cross or not...",
        "All of a sudden, a cat appears!!",
        // "The dog came to say hello too",
        // "Then the dog said goodbye and left",
        // "The dog ran into another dog",
        // "The chicken followed the dogs outside"
    ];
    // grab the ul
    const ul = document.querySelector("ul");
    for (let index = 0; index < lines.length; index++) {
        // create an LI element
        const li = document.createElement("li"); // <- <li></li>
        // update LI's textContent with the line string
        li.textContent = lines[index]; // <- <li>the chicken ponder.....</li>
        // append this LI as a child to the UL
        ul.appendChild(li);
    }
    const button = document.querySelector("button");
    button.addEventListener("click", addANewLineFromInput);
    // grab the input-row
    const inputRow = document.querySelector("#input-row");
    // add event listener to row, in order to clean the input
    inputRow.addEventListener(
        "click",
        cleanInput
    );
    // find the input inside the input-row
};

function cleanInput(event) {
    const inputRow = event.currentTarget;
    const input = inputRow.querySelector("input");
    input.value = "";
};

function addANewLineFromInput(event) {
    // create a new LI element
    let li = document.createElement("li");
    // get ahold of the input
    const input = document.querySelector("input");
    // update LI's textContent with the input value
    li.textContent = input.value;
    // get ahold of the UL
    const bubulala = document.querySelector("ul");
    // append LI as an UL child 
    // bubulala.appendChild(li);
    bubulala.append(li);
    // remove event listener from button
    const button = document.querySelector("button");
    button.removeEventListener("click", addANewLineFromInput);
};

function getInitialData() {
    return [[
        "Sedonia", 
        "Justice", 
        "Ernesto", 
        "Gerardo", 
        "Alison", 
        "Oneil", 
        "Zach"
    ], [
        "pink", 
        "yellow", 
        "lightblue", 
        "violet", 
        "beige", 
        "yellowgreen", 
        "white", 
        "orange"
    ], [
        "cowardly", 
        "brave", 
        "smart", 
        "happy", 
        "sad", 
        "funny", 
        "lazy", 
        "emotional", 
        "lonely"
    ]];
};

function buildStoryIntro(names, colors, traits) {
    return `This is the story of a ${
        chooseRandomItem(traits)
    }, ${
        chooseRandomItem(traits)
    }, ${
        chooseRandomItem(traits)
    } ${
        chooseRandomItem(colors)
    } chicken, named ${
        chooseRandomItem(names)
    }... it all starts on a ${
        new Date().toLocaleDateString("en-US", {
            weekday: "long"
        })
    } night, while standing in front of the road...`;
};

function chooseRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

function matchColorInString(str, colors) {
    const colorsCopy = [...colors]
    while (colorsCopy.length > 0) {
        const color = colorsCopy.pop();
        if (str.includes(color)) return color;
    };
    return "white";
};