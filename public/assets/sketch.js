let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Composites = Matter.Composites,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;
let API_KEY = "AIzaSyCmuTXabHRFirE8QT-seDX6FMgflTPs6mE";
let engine;
let world;
let ready = false;
let bodies = [];
let w;
let h;
let walls = [];

function setup(){
    w = window.innerWidth * 0.8;
    h = window.innerHeight * 0.6;

    let canvas = createCanvas(w, h);
    canvas.parent('sketch-holder');
    engine = Engine.create();
    world = engine.world;

    let mouse = Mouse.create(canvas.elt);
    let mouseParams = {
       mouse: mouse,
       constraint: {
         stiffness: 0.1,
       }
     }

    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(world, mouseConstraint);

    addWalls();
    Engine.run(engine);
}

function draw(){
    background(255)
    stroke(0);
    strokeWeight(3);
    fill(255, 50);
    for (let body of bodies) {
        body.show();
    }

}
function addWalls(){
    let options = {
        isStatic: true
    };
    walls.push(Bodies.rectangle(w/2, h-20, w, 10, options));
    walls.push(Bodies.rectangle(w/2, 0, w, 10, options));
    walls.push(Bodies.rectangle(0, h, 100, h*2, options));
    walls.push(Bodies.rectangle(w, h, 100, h*2, options));
    World.add(world, walls);
}
function makeDrawing(x, y, drawing){
    return new Drawing(x, y, drawing);
}

function getDrawing(data){
    let drawing = data.drawing
    let word = data.word;
    message.innerHTML = 'drew ' + word;
    bodies.push(makeDrawing(w/2, 50, data.drawing));
}

function handleError(msg){
    // console.log(arguments)
    console.log('Error',JSON.stringify(msg));
    message.innerHTML = "not found! try again";
    return true;
}

let message = document.getElementById("message");
const drawForm = document.forms[0];
const drawInput = drawForm.elements['draw'];

drawForm.onsubmit = function(event) {
  let input = drawInput.value;
  event.preventDefault();
  drawInput.value = '';
  drawInput.focus();
  function stringMatch(data){
      let url = `https://quickdrawfiles.appspot.com/drawing/${data.result}?&key=${API_KEY}&isAnimated=false&format=json`;
      loadJSON(url, getDrawing, handleError);
  }


  loadJSON(`/${input}`, stringMatch);
};

function windowResized() {
    w = window.innerWidth * 0.8;
    h = window.innerHeight * 0.6;
    resizeCanvas(w, h);
}
