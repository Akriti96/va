class Player {
  constructor() {
    this.index = null
    this.name = null
    this.positionX = 0
    this.positionY = 0
  }

  getCount() {
    var playercountRef = database.ref("playerCount")
    playercountRef.on("value", (data) => {
      myPlayerCount = data.val()
    })
  }

  addplayers() {
    // this is the new node creating in database
    var playerindex = "players/player" + this.index

    if (this.index === 1) {
      this.positionX = width / 2 - 100

    }
    else {
      this.positionX = width / 2 + 100
    }

    database.ref(playerindex).set({
      name: this.name,
      index: this.index,
      positionX: this.positionX,
      positionY: this.positionY
    })
  }

  updateCount(countNumber) {
    database.ref("/").update({
      playerCount: countNumber
    })
  }


  // get x and y position of the players
  getDistance() {
    // playernode= "players/player"+this.index
    var playerDistanceRef = database.ref("players/player" + this.index)
    playerDistanceRef.on("value", (data) => {
      var distance = data.val()
      this.positionX = distance.positionX
      this.positionY = distance.positionY
    })
  }

  //  update x and y position of the players in firebase when we use arrow keys
  updatePlayers() {
    var playerRef = "players/player" + this.index
    database.ref(playerRef).update({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      index: this.index
    })
  }


  static getPlayersInfo() {
    // player1 and player2(name,index,posx,posy)
    var playerRef = database.ref("players")
    playerRef.on("value", (data) => {
      allPlayers = data.val()
    })
  }
}
