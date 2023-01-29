//makes a text shorter
function make_short(array, value) {
    array.forEach((each) => {
        each.innerHTML =
            each.innerHTML.length > value
                ? each.innerHTML.slice(0, value) + " ..."
                : each.innerHTML;
    });
}

//fade out effect
function fadeOut(item) {
    item.style.opacity = '0'
    setTimeout(() => {
        item.style.display = 'none';
    }, 200);
}

//fade in effect
function fadeIn(item) {
    item.style.display = 'flex';
    setTimeout(() => {
        item.style.opacity = '1'
    }, 1);
}

//functions - this function generates random RGB colors
function colorGenerator() {
    let template = "#";
    for (let i = 0; i < 6; i++) {
        template += Math.floor(Math.random() * 9);
    }
    return template;
}

//id generator
function idGenerator() {
    let words = 'abcdefghijklmnopqrstuvwxyz';
    let id = '';
    for (let i = 0; i <= 10; i++) {
        id += Math.floor(Math.random() * 9);
        id += words[Math.floor(Math.random() * 25)];

    }
    return id;
}

module.exports = {
    colorGenerator,
    idGenerator,
}