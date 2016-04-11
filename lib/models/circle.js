define(["models/shape"], function (Shape) {
    return (function () {
        function Circle(canvas, x, y, radius) {
            this._super = Shape;
            this._super(canvas, x, y);

            this.radius = radius;
        }

        Circle.prototype = new Shape;

        Circle.prototype.getLeft = function () {
            return this.x - this.radius;
        };

        Circle.prototype.getRight = function () {
            return this.x + this.radius;
        };

        Circle.prototype.getTop = function () {
            return this.y - this.radius;
        };

        Circle.prototype.getBottom = function () {
            return this.y + this.radius;
        };

        Circle.prototype.draw = function () {
            var context = this.canvas.context;

            if (this.color !== null) {
                context.fillSTyle = this.color;
            }

            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            context.closePath();
            context.fill();
        };

        return Circle;
    })();
});
