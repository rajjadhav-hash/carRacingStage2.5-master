class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank=0;
    this.xPosition=0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank,
      xPosition:this.xPosition
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  static getCarAtEnd(){
    var carAtEndRef=database.ref('carAtEnd');
    carAtEndRef.on("value",(data)=>{
      carAtEnd=data.val();
    })
  }
  static updateCarAtEnd(count){
    database.ref('/').update({
      carAtEnd: count
    });
  }
}
