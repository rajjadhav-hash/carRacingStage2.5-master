class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    Player.getCarAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = allPlayers[plr].xPosition + 200+index*200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && player.rank===0){
      yDistance+=0.9;
      if(keyIsDown(LEFT_ARROW)){
        xDistance-=0.2;
      }
      if(keyIsDown(RIGHT_ARROW)){
        xDistance+=0.2;
      }
      player.distance +=yDistance;
      player.xPosition+=xDistance;
      player.update();
      yDistance *=0.98;
      xDistance *=0.98;
    }

    if(player.distance > 3860 && player.rank===0){
      player.rank=carAtEnd+1;
      Player.updateCarAtEnd(player.rank);
      player.update();
    }
   if(player.rank===4){
     gameState=2;
   }
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
  displayRanks(){
    camera.position.y=0;
    camera.position.x=0;
    textAlign(CENTER);
    textSize(50);
    background("white");
    for(var plr in allPlayers){
       if(allPlayers[plr].rank === 1){ 
         text("1st: " + allPlayers[plr].name, 0, 85);
         }else if(allPlayers[plr].rank === 2){
            text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73); 
          }else if(allPlayers[plr].rank === 3){ 
            text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76); 
          }else{
             textSize(30); text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
             }
             }

  }
}
