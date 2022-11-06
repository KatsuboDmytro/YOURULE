const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
    consructor({ position }) {
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Point {
    constuctor({ position,velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 10 
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.position.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()

    }
}
const map = [
   ['_', '_', '_', '_', '_','_', '_', '_', '_', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', '_'],
   ['_', '_', '_', '_', '_','_', '_', '_', '_', '_']
  ]

const boundaries = []
const point = new Point({
    position: {
        x: Boundary.width,
        y: Boundary.height
    },
    velocity: {
        x: 0,
        y: 0
    }

})
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case '-':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              }
            })
          )
          break
      }
    })
})

boundaries.forEach((boundary) => {
    boundary.draw()
})

point.draw

addEventListener('keydown', () => {
    console.log('fasdfsda')
})

class Grass {
    constructor({ position}) {
        this.position = position
        this.radius = 33
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.position.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()

    }
}