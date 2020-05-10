class Bomb extends HTMLElement implements GameObject {
    
    private posy: number
    private posx: number
    private speed: number
        
    constructor() {
        super()

        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
        
        this.posy = 0
        this.posx = Math.random() * window.innerWidth
        this.speed = Math.random() * 4

        this.addEventListener('click', () => this.onClick())
    }

    public onClick(){
        Game.scorePoint()
        this.changeY()
    }

    public changeY() {
        this.posy = this.posy - 500
    }

    public update() {     
        if (this.posy >= window.innerHeight) {
            this.posy = 0
            Game.destroyBuilding()
        }
        
        this.posy = this.posy + 1 * this.speed

        this.draw()
    }

    private draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}

window.customElements.define("bomb-component", Bomb as any)
