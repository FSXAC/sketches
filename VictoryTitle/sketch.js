let texts = []
let font_bignoodletitling;
const TEXT_SIZE = 72;

function preload() {
    font_bignoodletitling = loadFont('./big_noodle_titling.ttf');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);

    textFont(font_bignoodletitling);
    textSize(TEXT_SIZE);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);

    let deleteList = [];

    for (let i = 0; i < texts.length; i++) {
        texts[i].draw();

        if (!texts[i].alive) {
            deleteList.push(texts[i])
        }
    }

    for (let i = 0; i < deleteList.length; i++) {
        let delIndex = texts.indexOf(deleteList[i]);
        if (delIndex != -1) {
            texts.splice(delIndex, 1);
        }
    }
}

function mousePressed() {
    texts.push(new VictoryText(mouseX, mouseY, "VICTORY!"))
}

class VictoryText {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        
        this.frame = 0;

        this.opacity = 255;

        this.alive = true;
    }

    draw() {
        push();
        translate(this.x, this.y);
        shearX(-PI / 8);
        fill(255, this.opacity);
        text(this.text, 0, 0);
        pop();

        this.update();
    }

    update() {
        this.opacity = constrain(map(this.frame, 50, 100, 255, 0), 0, 255);
        if (this.opacity == 0) {
            this.alive = false;
        }

        this.frame++;
    }
}