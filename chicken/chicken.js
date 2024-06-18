document.onreadystatechange = function(event) {
    if (document.readyState === "complete") {
        addNewRandomChicken();
        // grab button to add new chicken and add event listener to add new random chicken
        const newChickenButton = document.querySelector(".btn");
        newChickenButton.addEventListener(
            "click",
            addNewRandomChicken
        );
        newChickenButton.addEventListener(
            "click",
            makeTheChickenWiggle,
            true
        );
    }
};

function makeTheChickenWiggle() {
    const chickens = document.querySelectorAll(".chicken");
    for (const chicken of chickens) {
        chicken.classList.add("do-the-wiggle");
        chicken.addEventListener("animationend", (event) => chicken.classList.remove("do-the-wiggle"));
    }
};

function addNewRandomChicken() {
    // create a new chicken object
    const chicken = Chicken.create();
    // grab chickens flex container
    const chickensContainer = document.querySelector(".chickens");
    // append new chicken element as chickens container child
    chickensContainer.appendChild(chicken.asHTMLElement());
    // initialize bootstrap's tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

class Chicken {
    static currentId = 1;
    constructor(name, color) {
        this.id = Chicken.currentId;
        Chicken.currentId += 1;
        this.name = name;
        this.color = color;
        this.traits = [];
    }
    static create() {
        const [
            chickenNames, 
            chickenColors, 
            chickenTraits
        ] = getInitialData();
        const chicken = new Chicken(
            chooseRandomItem(chickenNames),
            chooseRandomItem(chickenColors)
        );
        for (let time = 1; time < 4; time++) {
            chicken.addTrait(chooseRandomItem(chickenTraits));
        }
        return chicken;
    };
    addTrait(trait) {
        if (this.traits.length > 2) this.traits.shift();
        this.traits.push(trait);
    };
    asHTMLElement() {
        // create chicken div and add ID
        const chickenDiv = document.createElement("div");
        chickenDiv.classList.add("chicken");
        chickenDiv.setAttribute("id", `chicken-${this.id}`);
        // build svg chicken element
        chickenDiv.appendChild(this.#buildSVGElement());
        chickenDiv.classList.add("appear");
        chickenDiv.addEventListener("animationend", (event) => chickenDiv.classList.remove("appear"));
        // add event listener to chicken div so that chicken turns red when clicked upon
        return chickenDiv;
    };
    #buildSVGElement() {
        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        svg.setAttribute("viewBox", "0 0 135.46666 135.46667");
        svg.setAttribute("height", "100%");
        svg.setAttribute("width", "100%");
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        svg.appendChild(this.#buildFace());
        svg.appendChild(this.#buildEye("left"));
        svg.appendChild(this.#buildEye());
        svg.appendChild(this.#buildBeak());
        svg.appendChild(this.#buildComb());
        svg.appendChild(this.#buildCheekSpot("left"));
        svg.appendChild(this.#buildCheekSpot());
        // update chicken name on tooltip
        svg.setAttribute("data-bs-toggle", "tooltip");
        svg.setAttribute("data-bs-placement", "top");
        svg.setAttribute("data-bs-title", this.#buildStoryIntro());
        return svg;
    };
    #buildFace() {
        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path.classList.add("chicken-face");
        path.style.fill = this.color;
        path.setAttribute("d", paths["chicken-face"]);
        return path;
    };
    #buildEye(side="right") {
        const ellipse = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "ellipse"
        );
        ellipse.classList.add("chicken-eye");
        ellipse.setAttribute("rx", "4.15");
        ellipse.setAttribute("ry", "4.15");
        ellipse.setAttribute("cx", "96.293846"); // for side = "right"
        ellipse.setAttribute("cy", "85.372795");
        if (side === "left") ellipse.setAttribute("cx", "38.551617");
        return ellipse;
    };
    #buildBeak() {
        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path.classList.add("chicken-beak");
        path.setAttribute("d", paths["chicken-beak"]);
        return path;
    };
    #buildComb() {
        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path.classList.add("chicken-comb");
        path.setAttribute("d", paths["chicken-comb"]);
        return path;
    };
    #buildCheekSpot(side="right") {
        const ellipse = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "ellipse"
        );
        ellipse.classList.add("cheek-spot");
        ellipse.setAttribute("rx", "5.5523458");
        ellipse.setAttribute("ry", "2.7231178");
        ellipse.setAttribute("cx", "100.67382"); // for side = "right"
        ellipse.setAttribute("cy", "95.000648");
        if (side === "left") ellipse.setAttribute("cx", "34.079693");
        return ellipse;
    };
    #buildStoryIntro() {
        return `This is the story of a ${
            this.traits[0]
        }, ${
            this.traits[1]
        }, ${
            this.traits[2]
        } ${
            this.color
        } chicken named ${
            this.name
        }... it all starts on a ${
            new Date().toLocaleDateString("en-US", {
                weekday: "long"
            })
        } night, while standing in front of the road...`;
    };
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

function chooseRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const paths = {
    "chicken-face": "m 65.857504,33.317261 c -26.292203,0.0317 -39.586132,10.52967 -45.360626,19.1446 -5.774494,8.61492 -10.806661,23.89092 -7.761325,39.15156 3.045336,15.260639 11.641293,30.700349 54.156794,30.700349 42.515493,0 51.763073,-11.72677 55.536583,-28.458189 3.77351,-16.73142 -1.71586,-35.44735 -8.45123,-43.11846 -6.73537,-7.67111 -21.827996,-17.45153 -48.120196,-17.41986 z",
    "chicken-beak": "m 67.162802,88.163951 c -1.525078,0 -19.388969,4.81967 -15.781359,10.69337 3.60761,5.873699 27.901651,5.917069 31.562721,0 3.66107,-5.91707 -14.25628,-10.69337 -15.781362,-10.69337 z",
    "chicken-comb": "m 66.871273,56.447791 c 11.039241,-0.0271 23.185471,-10.50373 27.562381,-17.92775 4.37691,-7.42402 7.857366,-14.23341 -0.36587,-19.025357 -8.22325,-4.791948 -15.85447,10.488337 -15.85447,10.488337 0,0 3.18094,-16.830126 -10.97617,-16.830126 -14.157114,0 -12.439658,15.976426 -12.439658,15.976426 0,0 -7.633959,-14.196097 -15.122724,-9.756597 -7.488766,4.439497 -5.115151,11.451307 -0.853701,19.025367 4.26145,7.57406 17.010967,18.0768 28.050212,18.0497 z"
};
