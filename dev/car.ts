class Car extends HTMLElement{

    posx: number
    posy: number

    constructor() {
        super()

        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);

        this.posx = 0
        this.posy = 500

        this.addEventListener('click', () => this.onClick())
    }

    public update() {
        this.posx += 4 

        if (this.posx === window.innerWidth) {
            this.posx = 0
        }

        this.draw();
    }

    public onClick() {
        Game.destroyed = 0
        Game.backgroundPositionX = 0
    }

    private draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}

window.customElements.define("car-component", Car as any)