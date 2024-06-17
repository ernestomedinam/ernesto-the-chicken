document.onreadystatechange = function(event) {
    if (document.readyState === "complete") {
        const chicken = new Chicken();
        updateHeader(chicken);
        renderChicken(chicken);
    }
};

class Chicken {
    constructor() {

    }
};

function updateHeader(chicken) {

};

function renderChicken(chicken) {

};
