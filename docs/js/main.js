"use strict";
class Bomb extends HTMLElement {
    constructor() {
        super();
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posy = 0;
        this.posx = Math.random() * window.innerWidth;
        this.speed = Math.random() * 4;
        this.addEventListener('click', () => this.onClick());
    }
    onClick() {
        Game.scorePoint();
        this.changeY();
    }
    changeY() {
        this.posy = this.posy - 500;
    }
    update() {
        if (this.posy >= window.innerHeight) {
            this.posy = 0;
            Game.destroyBuilding();
        }
        this.posy = this.posy + 1 * this.speed;
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
}
window.customElements.define("bomb-component", Bomb);
class Car extends HTMLElement {
    constructor() {
        super();
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posx = 0;
        this.posy = 500;
        this.addEventListener('click', () => this.onClick());
    }
    update() {
        this.posx += 4;
        if (this.posx === window.innerWidth) {
            this.posx = 0;
        }
        this.draw();
    }
    onClick() {
        Game.destroyed = 0;
        Game.backgroundPositionX = 0;
    }
    draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.bombs = [];
        Game.textfield = document.getElementsByTagName("textfield")[0];
        Game.statusbar = document.getElementsByTagName("bar")[0];
        for (let i = 0; i < 4; i++) {
            this.bombs.push(new Bomb);
        }
        this.car = new Car();
        this.gameLoop();
    }
    gameLoop() {
        for (let i = 0; i < this.bombs.length; i++) {
            this.bombs[i].update();
        }
        this.car.update();
        if (Game.destroyed != 4) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    static destroyBuilding() {
        this.destroyed++;
        this.backgroundPositionX += -72;
        this.statusbar.style.backgroundPositionX = `${this.backgroundPositionX}px`;
    }
    static scorePoint() {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
}
Game.score = 0;
Game.destroyed = 0;
Game.backgroundPositionX = 0;
window.addEventListener("load", () => new Game());
class GameObject {
}
//# sourceMappingURL=main.js.map