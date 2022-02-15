var canvas;
var corazon,corazonI;
var pelear,pelearI, mercy, mercyI;
var muro;
var sans,sansI;
var h,g,huesosGroup,laserGroup;
var vida=200,vidaS=120;
var barra_vida;
var restart,restartI;
var nivel=1;
var estado="play";
var gameover;
var sonidoFondo;

function preload(){
 corazonI = loadImage("assets/corazon.png");
 sansI = loadImage("assets/sans.jpg");
 huesosI = loadImage("assets/huesos.png");
 gameOverI = loadImage("assets/gameover.jpg");
 pelearI = loadImage("assets/pelear.png");
 mercyI = loadImage("assets/mercy.jpg");
 sonidoFondo= loadSound("assets/fondo.mp3");
}

function setup(){
  canvas = createCanvas(700,600);
  pelear = createSprite(250,500,70,20);
  pelear.addImage("pelearY",pelearI);
  pelear.scale=0.2;
  mercy = createSprite(400,500,70,20);
  mercy.addImage("mercy",mercyI);
  mercy.scale=0.11;
  corazon = createSprite(350,350,20,20);
  barra_vida=createSprite(325,450,200,20)
  barra_vida.shapeColor="yellow"
  m1= createSprite(325,437,210,2);
  m1.shapeColor="white";
  m2= createSprite(325,463,210,2);
  m2.shapeColor="white";
  m3= createSprite(221,450,2,30);
  m3.shapeColor="white";
  m4= createSprite(430,450,2,30);
  m4.shapeColor="white";
  muro1 = createSprite(200,280,3,250);
  muro1.shapeColor = "white"
  muro2 = createSprite(325,405,250,3);
  muro2.shapeColor = "white"
  muro3 = createSprite(450,280,3,250);
  muro3.shapeColor = "white"
  muro4 = createSprite(325,155,250,3);
  muro4.shapeColor = "white";// borde superior
  sans = createSprite(340,70,10,10);
  sans.addImage("sansy",sansI)
  sans.scale=0.45
  corazon.addImage("corazonY",corazonI)
  corazon.scale=0.02
  gameover = createSprite(340,250,50,50)
  gameover.addImage("gameOver",gameOverI)
  gameover.scale=0.5;
  gameover.visible=false
  huesosGroup= new Group();
  laserGroup=new Group();
  sonidoFondo.play();

}


function draw(){
  background("black")

  drawSprites()
  if(keyDown(DOWN_ARROW)){ corazon.y = corazon.y+4 }
  if(keyDown(UP_ARROW)){ corazon.y = corazon.y-4 }
  if(keyDown(LEFT_ARROW)){   corazon.x = corazon.x-4 }
  if(keyDown(RIGHT_ARROW)){corazon.x = corazon.x+4 }
  corazon.collide(muro1);
  corazon.collide(muro2);
  corazon.collide(muro3);
  corazon.collide(muro4);
  text("vidas= "+vida,100,200);
  text("nivel = "+nivel,100,240);
  text("estado= "+estado,100,280);
  validar_vidas();  

  if(nivel===1 && estado==="play"){
    if(frameCount<=300){
      lanzarHuesos();
    }else{
      enPausa();
    }
     if(huesosGroup.isTouching(corazon)){ // Descontar vidas
        vida=vida-4;
        barra_vida.width=barra_vida.width-4;
      }
      
  }/*
  if(nivel===2 && estado==="play"){
    lasers();
    if(laserGroup.isTouching(corazon)){ // Descontar vidas
      vida=vida-4;
      barra_vida.width=barra_vida.width-4;
    }
  }
  if(estado==="end"){
    Visibles(false);
    if(mousePressedOver(gameover)){
      restart();
    }
  }*/
  if(estado==="pausa"){
      if(corazon.isTouching(mercy) ){
        if(vida>140){
          vida=vida+(200-vida)
        }
        else{
          vida=vida+30
        }
        barra_vida.width=vida 
        corazon.x=350;
        corazon.y=350;
      }
      
      if(corazon.isTouching(pelear)){

      }
      estado="play";
      muro2 = createSprite(325,405,250,3);
      muro2.shapeColor = "white";
    }
}

function Visibles(dato){ // game over
  
  pelear.visible=dato;
  mercy.visible=dato;
  corazon.visible=dato;
  barra_vida.visible=dato;
  m1.visible=dato;
  m2.visible=dato;
  m3.visible=dato;
  m4.visible=dato;
  muro1.visible=dato;
  muro2.visible=dato;
  muro3.visible=dato;
  muro4.visible=dato;
  
  if (dato===false){
    gameover.visible=true;
  }else{
    gameover.visible=false;
  }
  
}

function lasers(){
  var frecuencia = Math.round(random(5,40))
  var altura = Math.round(random(400,150))
  if(frameCount%frecuencia===0){
    laser_derecha=createSprite(235,altura,120,5);
    laser_izquierda=createSprite(400,altura,120,5);
    laser_derecha.shapeColor="white";
    laser_izquierda.shapeColor="white";
    laser_derecha.velocityX=3;  
    laser_izquierda.velocityX=-3;
    laser_izquierda.collide(laser_derecha);
    laser_derecha.lifetime=35;
    laser_izquierda.lifetime=35;
    laserGroup.add(laser_derecha);
    laserGroup.add(laser_izquierda);
    
  }
}


function validar_vidas(){
  if(vida<=0 || barra_vida.width<1){
    estado="end";
  }
}

function lanzarHuesos(){
  var frecuencia = Math.round(random(2,50))
  var altitud = Math.round(random(400,150))
  var altura = Math.round(random(400,150))
  if(frameCount%frecuencia===0){
    h=createSprite(450,altitud,90,5)
    h.addImage("huesitos",huesosI)
    h.scale=0.09
    h.velocityX=-6
    g=createSprite(200,altura,90,5)
    g.addImage("huesitos",huesosI)
    g.scale=0.09
    g.velocityX=6
    huesosGroup.add(g);
    huesosGroup.add(h);
    h.lifetime=43
    g.lifetime=43
  } 
}

function restart(){
  Visibles(true);
  estado="play";
  nivel=1;
  vida=200;
  vidaS=120;
  barra_vida.width=200;
}

function enPausa(){
  nivel+=1;
  estado="pausa";
  muro2.remove();
}
