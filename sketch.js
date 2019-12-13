let realImg;
let realUrl; 
let ImgNum;
let fake;
let dice;
let score;
let count;
let timer;
let counter;
let counter2;
let gamestate; 
let startCover; 
let img;
var myFont;
var filename;
var spaceGrotesk;  
var barW
let imgS=400; 
let opacR;
let opacF;
let dicep;

let allImages;
let realF = [];
let fakeF = []; 

var profileIcon;
var timeIcon; 


// var img = new Image();

function preload(){
  
  profileIcon = loadImage("profile.png")
  timeIcon = loadImage("time.png")
}

function setup(){
  opacR = 0;
  opacF = 0;
  allImages = []
  gamestate = 'start'
  myFont = loadFont("PressStart2P-Regular.ttf")
  spaceGrotesk = loadFont("SpaceGrotesk-Medium.ttf");
  count = 0
  score = 0;
  createCanvas(720, 512);
  background(0);
  startCover = loadImage("start.png")
  // img = createImg ("http://192.168.8.212:8000/001.png")
  // url = "http://192.168.8.212:8000/001.png"
  // httpGet(url, function(response){
  //   img = response 
  // })
}

function getImgUrl(){
  barW = 0
  count ++ 
  timer = millis() + 5500;
  dice = int(random(0,2)) 
  if(dice == 0) {
    var num = 10000 + int(random(0,1000));
    filename = "real/" + str(num) + ".png";
  } else {
    var num = 10000+ int(random(0,100))
    filename = "fake/" + "0"+str(num) + ".jpg"
  }
  

  //append(allImages, [filename,dice])
  //print(allImages)
  img = loadImage(filename)

  if(dice == 0) {
    realF.push(img)
  } else {
    fakeF.push(img)
  }
  
   




}


function timerDisplay(){
    stroke(248,231,28);
    strokeWeight(3);
    noFill();
    rectMode(CENTER);
    rect(width/2,height/2+20,imgS,imgS);
    countDown()
    //print(counter)
    fill(248,231,28)
    noStroke();
    textAlign(LEFT);
    textSize(20);
    var timerStr = "0" + counter1 + ":" + counter2
    text(timerStr,450,50)

    image(timeIcon,425,38,16,16);

    rectMode(CORNER)
    fill(255)
    strokeWeight(0.5);
    stroke(100)
    rect(160,75,imgS + 2,12)
    fill(248,231,28)
    noStroke()
    rect(160,75,barW,12)
    barW += 1.15

}

function displayProfileNum(){
  var display = count + "/10"
  text(display,210,50)
  image(profileIcon,180,38,16,16)
}




function draw() { 
  background(0);

  if(millis%100 == 0){

  }
  if(gamestate == "play"){
    stripe(0,0,width,3,80)
    imageMode(CENTER); 
    image(img,width/2 ,height/2+20,imgS,imgS);
    //stripe(171,65,378,3,47)
    timerDisplay();
    displayProfileNum()
    feedback()

  } else if (gamestate == 'over'){

    displayLevels();
    displayResult();
    displayError();

  } else if (gamestate == "start"){
    image(startCover,0,0,width,height)
    stripe(0,0,width,3,80)
    var opac = millis() % 450
    fill(248,231,28,opac);
    textFont(myFont);
    textSize(12);
    textAlign(CENTER);
    text("PRESS ANY BUTTON TO START", width/2,height - 70);

  }

}

function feedback(){
  var linesR = "R\nE\nA\nL"
  var linesF = "F\nA\nK\nE"
  textFont(myFont)
  textSize(60)
  fill(255);


  if(dicep == 0) {
    fill(118,201,28,opacR)
    textAlign(CENTER);
    text("+10",width/2,height/3+30)
  } else {
    fill(208,2,28,opacR)
    textAlign(CENTER);
    text("-5",width/2,height/3+30)
  }
  fill(248,231,28,opacR)
  text(linesR,100,200);

    opacR -= 10; 
    opacF -= 10;
  
  fill(248,231,28,opacF)
  text(linesF,620,200); 
  if(dicep == 1) {
    fill(118,201,28,opacF)
    textAlign(CENTER);
    text("+10",width/2,height/3+30)
  } else {
    fill(208,2,27,opacF)
    textAlign(CENTER);
    text("-5",width/2,height/3+30)
  }

}

function displayLevels(){
  var scoreDisplay = nf(score*10,2,0)
  stripe(0,0,width,3,80);
  fill(248,231,28)
  textSize(110);
  textFont(spaceGrotesk)
  textAlign(CENTER)
  text(scoreDisplay,155,215)
  noFill();
  stroke(248,231,28)
  strokeWeight(5);
  ellipse(155,180,200,200)
  var status 
  if(score<5){
    status = "'Complicit with AI'"
  } else if (score<7){
    status = "'Know about humans but mainly from textbooks'"
  } else {
    status = "'Facial Forensic Analyst'"
  }
  var statusDisplay = status 
  textSize(16)
  textFont(myFont)
  fill(255)
  noStroke()
  text(statusDisplay,50,340,250,200)
  text("your level:",50,310,250,200)


}


function displayResult(){

  var x = 310 
  var y = 100
  var s = 15
  textAlign(CORNER)


  textFont(myFont);
  textSize(20);
  noStroke();
  fill(255);
  text("Real",x,y)

  stroke(255);
  strokeWeight(2);
  line(x,y+s,680,y+s)

  for (let i = 0; i< realF.length ; i++) { 
     if(i<5){
      var y1 = y+s*2 
      var s1 = 70 
      var x1 = x + 75 *i 

     } else {
      var x1 = x + 75 * (i-5)
      var y1 = y+s*2+s1+5
     }
    imageMode(CORNER)
    image(realF[i],x1,y1,s1,s1)
  }

  if(fakeF.length < 5){
    var y2 = 230 
  } else {
    var y2 = 160 
  }

  noStroke();
  text("Fake",x,y+y2)
  stroke(255);
  strokeWeight(2);
  line(x,y+s+y2,680,y+s+y2)



  for (let i = 0; i< fakeF.length ; i++) {
    

    if(i<5){
      var y1 = y+s*2 
      var s1 = 70 
      var x1 = x + 75 *i 

     } else {
      var x1 = x + 75 * (i-5)
      var y1 = y+s*2+s1+5
     }
    image(fakeF[i],x1,y1+y2,s1,s1)

  }



}


function displayError(){
  if(fakeF.length < 5){
    var y2 = 230 
  } else {
    var y2 = 160 
  }

  var x = 313 
  var y = 130
  var s = 70
  var indexR = -1;
  var indexF = -1

  for(let i = 0; i< allImages.length ; i++){
    
    if(allImages[i][1] == 0){
      indexR += 1 
      if(allImages[i][1] != allImages[i][2]){
        stroke(255,50,50);
        noFill();
        if(indexR<5){
          var rectx = x+75*indexR
          var recty = y+2

        } else {
          var rectx = x+75*(indexR-5)
          var recty = y+5+s
        }
        rect(rectx,recty,60,20);
        textFont(spaceGrotesk);
        textSize(18);
        fill(255,50,50);
        noStroke()
        text("Failed",rectx+5,recty+16)
      }   
    } else if (allImages[i][1] == 1){
      indexF += 1 
      if(allImages[i][1] != allImages[i][2]){
        stroke(255,50,50);
        noFill();
        if(indexF<5){
          var rectx = x+75*indexF
          var recty = y+2

        } else {
          var rectx = x+75*(indexF-5)
          var recty = y+5+s
        }
        rect(rectx,recty+y2,60,20);
        textFont(spaceGrotesk);
        textSize(18);
        fill(255,50,50);
        noStroke()
        text("Failed",rectx+5,recty+16+y2)
      }   
  }
}


}


function stripe(x,y,w,h,l){
  for (var s=0; s<l; s = s+1){ 
    var trans;

    var num = random(100,200)
    if(int(millis()%num) > 180) {
      trans = random(0,120);
    } else (
      trans = 40
    )
    
    fill(255,255,255,trans)
    noStroke();
  	rect(x, y+s*8, w, h);
  }

  


}


function countDown(){
  //counter = nf((timer - millis())/1000,2,2);
  counter1 = round((timer-millis())/1000)
  counter2 = round((timer - millis())/1000 % 1 * 100)

  if(millis() > timer){
    print("too slow, next one")
    timer = timer + 5500 
    getImgUrl()
  }
}

function restart(){
  count = 0;
  score = 0;
  allImages = [] ;
  gamestate = 'start'
  realF = [];
  fakeF = []; 

}


function keyTyped(){



  if(gamestate == 'start'){
    getImgUrl();
    gamestate = 'play'
  } else if(gamestate == "play"){

    if(count < 10){

      checkTruth();

    } else if (count == 10){
  
      checkTruth();
      if(dice == 0 ){
        realF.pop()
      } else {
        fakeF.pop()
      }
      gamestate = "over"
      print(allImages)
      print(realF)
  
     
    }
   
  } else if(gamestate == 'over'){
      restart(); 
      //gamestate = 'start'
      
    }

 

  
}


function checkTruth(){

  if(key == "r"){
    opacR = 255 
    if(dice == 0){
      score += 1;
      fill(50,255,50)
      text("+10",width/2,height/2)
      allImages.push([filename,dice,0])
    } else {
      score -= 0.5;
      allImages.push([filename,dice,0])
    }
    dicep = dice;
    getImgUrl(); 
  } else if(key == "f" ){
    opacF = 255 
    if(dice == 1){
      score += 1;
      fill(50,255,50)
      text("+10",width/2,height/2)
      allImages.push([filename,dice,1])
    
    } else {
      score -= 0.5;
      allImages.push([filename,dice,1])
    }
    dicep = dice;
    getImgUrl();
  } 

  
}




