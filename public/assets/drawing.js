class Drawing {
  constructor(x, y, drawing){
    let params = {
        restitution: 0.1,
        friction: 0.2
    }
    let DRAW_SCALE = 0.6;
    let RADIUS = 70;
    let vertices = [];
    this.drawing = drawing;
    this.body = Bodies.circle(x, y, RADIUS, params);

    World.add(world, this.body);
    this.render = () => {
        this.drawing.forEach((s)=>{
            const strokeX = s[0]
            const strokeY = s[1]

            beginShape()
            for (var i = 0; i < strokeX.length; i ++) {
                vertex(strokeX[i] * DRAW_SCALE, strokeY[i] * DRAW_SCALE);
            }
            endShape()
        })
    }
    this.show = () => {
        var pos = this.body.position;
        var r = this.body.circleRadius;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        // line(0, 0, r, 0);
        translate(-r, -r);
        this.render(this.drawing);
        pop();
    }
  }
}
