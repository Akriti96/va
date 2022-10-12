class Form {
  constructor() {
    this.input = createInput(" ").attribute("placeholder", "Enter your name")
    this.button = createButton("play")
    this.greeting = createElement("h2")
    this.title = createImg("./assets/title.png")

  }


  setPosition() {
    this.title.position(120, 20)
    this.input.position(width / 2 - 110, height / 2 - 80)
    this.button.position(width / 2 - 90, height / 2 - 20)
    this.greeting.position(width / 2 - 60, height / 2)


  }


  setStyle() {
    this.title.class("gameTitle")
    this.input.class("customInput")
    this.button.class("customButton")
    this.greeting.class("greeting")



  }

  handleButtonPressed() {
    this.button.mousePressed(() => {
      this.input.hide()
      this.button.hide()

      // writting a  greeting message
      var message = `Hello ${this.input.value()}
      <br/> wait for another player to join...!`
      this.greeting.html(message)
      myPlayerCount += 1
      myplayer.index = myPlayerCount
      myplayer.name = this.input.value()
      myplayer.updateCount(myPlayerCount)
      myplayer.addplayers()
      myplayer.getDistance() 

    })


  }


  display() {
    this.setPosition()
    this.setStyle()
    this.handleButtonPressed()


  }
  hide() {
    this.greeting.hide()
    this.input.hide()
    this.button.hide()
  }



}
