define(["models/shape"], function (Shape) {
    return (function () {
        function Rectangle(canvas, x, y, width, height) {
            this._super = Shape;
            this._super(canvas, x, y);

            this.width = width;
            this.height = height;
        }

        Rectangle.prototype = new Shape;

        Rectangle.prototype.getLeft = function () {
            return this.x;
        };

        Rectangle.prototype.getRight = function () {
            return this.x + this.width;
        };

        Rectangle.prototype.getTop = function () {
            return this.y;
        };

        Rectangle.prototype.getBottom = function () {
            return this.y + this.height;
        };

        Rectangle.prototype.draw = function () {
            var context = this.canvas.context;

            if (this.color !== null) { context.fillStyle = this.color; }
            context.fillRect(this.x, this.y, this.width, this.height);
        };

        return Rectangle;
    })();
});
