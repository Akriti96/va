class Game {
  constructor() {
    this.resetTitle = createElement("h2")
    this.resetbutton = createButton("")
    this.leadersboard = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");

  }


  getState() {
    var gamestateRef = database.ref("gameState")
    gamestateRef.on("value", (data) => {
      myGameState = data.val()
    })
  }

  updateState(statenumber) {
    database.ref("/").update({
      gameState: statenumber
    })
  }


  start() {
    myform = new Form()
    myform.display()


    myplayer = new Player()
    myplayer.getCount()

    car1 = createSprite(width / 2 - 100, height - 100)
    car1.addImage("car1", car1Image)
    car1.scale = 0.07

    car2 = createSprite(width / 2 + 100, height - 100)
    car2.addImage("car2", car2Image)
    car2.scale = 0.07

    cars = [car1, car2]

    // creating groups
    fuleGroup = new Group()
    powerCoinsGroup = new Group()

    // calling addSprites function to display fuels
    this.addSprites(fuleGroup, 25, fuelImage, 0.02)
    this.addSprites(powerCoinsGroup, 20, powerCoinsImage, 0.1)
  }


  handleElements() {
    myform.title.position(40, 50)
    myform.title.class("resetTitle")

    this.resetTitle.html("Reset Game")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width / 2 + 200, 40)


    this.resetbutton.class("resetButton")
    this.resetbutton.position(width / 2 + 230, 100)

    this.leadersboard.html("leaderboard");
    this.leadersboard.class("resetText");
    this.leadersboard.position(width / 2 - 350, 40);

    this.leader1.html("leader1");
    this.leader1.class("leadersText");
    this.leader1.position(width / 2 - 300, 80);

    this.leader2.html("leader2");
    this.leader2.class("leadersText");
    this.leader2.position(width / 2 - 300, 120);
  }
  play() {
    myform.hide()
    this.handleElements()
    Player.getPlayersInfo()
    this.handleResetButton()

    // !== undefined means players are created
    if (allPlayers !== undefined) {
      // image(nameoftheimage,x,y,w,h)
      image(trackImage, 0, -height * 5, width, height * 6)

      //getting active player in current window
      var index = 0
      // allplayes= player1 and player2
      for (var i in allPlayers) {

        // console.log("show what is i", i)
        index = index + 1

        // getting x and y position of the car from database
        var x = allPlayers[i].positionX
        var y = height - allPlayers[i].positionY

        // equating x and y value to current car postion based on index value
        cars[index - 1].position.x = x
        cars[index - 1].position.y = y



        if (index === myplayer.index) {
          stroke(10)
          strokeWeight("black")
          fill("red")
          ellipse(x, y, 70, 70)
          camera.position.y = cars[index - 1].position.y;
          // camera.position.x = cars[index - 1].position.x;

          this.handlefuel(index)
          this.handlepowerconis(index)
        }

      }
    }


    this.moveCars()
    drawSprites()
  }

  end() {


  }

  addSprites(spriteGroup, numberofSprites, spriteImage, scale) {
    for (var i = 0; i < numberofSprites; i += 1) {
      var x, y
      x = random(width / 2 + 250, width / 2 - 250)
      y = random(-height * 4.5, height - 200)

      var sprite = createSprite(x, y)
      sprite.addImage(spriteImage)
      sprite.scale = scale

      spriteGroup.add(sprite)

    }
  }


  moveCars() {
    if (keyIsDown(UP_ARROW)) {
      myplayer.positionY += 10
      myplayer.updatePlayers()
    }
    if (keyIsDown(LEFT_ARROW)) {
      myplayer.positionX -= 10
      myplayer.updatePlayers()
    }
    if (keyIsDown(RIGHT_ARROW)) {
      myplayer.positionX += 10
      myplayer.updatePlayers()
    }
  }

  handlefuel(index) {
    // sprite.overlap()
    cars[index - 1].overlap(fuleGroup, function (collector, collected) {
      collected.remove()
    })
  }
  handlepowerconis(index) {
    // sprite.overlap()
    cars[index - 1].overlap(powerCoinsGroup, function (collector, collected) {
      collected.remove()
    })
  }

  handleResetButton() {
    this.resetbutton.mousePressed(() => {
      database.ref("/").set({
        gameState: 0,
        playerCount: 0,
        players: {}
      })
      window.location.reload()
    })
  }

}
