function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpedd = 4;
    this.prevPost = this.pos.copy();

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpedd);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.updatePrev = function () {
        this.prevPost.x = this.pos.x;
        this.prevPost.y = this.pos.y;
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.show = function () {
        stroke(0, 50);
        strokeWeight(1);
        // point(this.pos.x, this.pos.y);
        line(this.pos.x, this.pos.y, this.prevPost.x, this.prevPost.y);

        this.updatePrev();
    }

    this.edges = function () {
        if (this.pos.x > width) { this.pos.x = 0; this.updatePrev(); }
        if (this.pos.x < 0) { this.pos.x = width; this.updatePrev(); }
        if (this.pos.y > height) { this.pos.y = 0; this.updatePrev(); }
        if (this.pos.y < 0) { this.pos.y = height; this.updatePrev(); }
    }

    this.follow = function (vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);

        var index = x + y * cols;

        var force = vectors[index];
        this.applyForce(force);
    }
}
