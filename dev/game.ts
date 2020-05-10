class Game {
    
    private static score: number = 0
    public static destroyed: number = 0
    private static textfield: HTMLElement
    public static backgroundPositionX: number = 0
    private static statusbar: HTMLElement
    private car: Car
    private bomb: Bomb
    private bombs: Bomb[] = []
    
    constructor() {
        Game.textfield  = document.getElementsByTagName("textfield")[0] as HTMLElement
        Game.statusbar  = document.getElementsByTagName("bar")[0] as HTMLElement

        for(let i:number = 0; i < 4; i++) {
            this.bombs.push(new Bomb)
        }

        this.car = new Car()
        
        this.gameLoop()
    }
    
    private gameLoop(){

        for(let i:number = 0; i < this.bombs.length; i++) {
            this.bombs[i].update()
        }

        this.car.update()

        if (Game.destroyed != 4) {
            requestAnimationFrame(() => this.gameLoop())
        }
    }

    public static destroyBuilding(){
        this.destroyed ++
        this.backgroundPositionX += -72
        this.statusbar.style.backgroundPositionX = `${this.backgroundPositionX}px`
    }
       
    public static scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score
    }

} 

window.addEventListener("load", () => new Game())