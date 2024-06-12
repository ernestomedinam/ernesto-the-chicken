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
        "The dog came to say hello too",
        "Then the dog said goodbye and left",
        "The dog ran into another dog",
        "The chicken followed the dogs outside"
    ];
    const reducedLisString = lines.reduce(
        (finalString, line, index, copyArr) => {
            return `${finalString}<li>${line}</li>`
        }, "" // <- finalString initial value
    );

    // regular looping way
    // let lisString = "";
    // for (const line of lines) {
    //     // add an '<li> </li>' to the lisString
    //     lisString += `<li>${line}</li>`;
    // }

    // grab the ul
    const ul = document.querySelector("ul");
    // add string as innerHTML
    ul.innerHTML = reducedLisString;
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