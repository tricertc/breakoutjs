define(["models/rectangle"], function (Rectangle) {
    return (function () {
        function Block(canvas, x, y, width, height) {
            this._super = Rectangle;
            this._super(canvas, x, y, width, height);

            this.points = 1;
            this.borderColor = null;
        }

        Block.prototype = new Rectangle;

        Block.prototype.draw = function () {
            var context = this.canvas.context;

            if (this.color !== null) { context.fillStyle = this.color; }
            context.fillRect(this.x, this.y, this.width, this.height);

            if (this.borderColor !== null) {
                context.strokeStyle = this.borderColor;
                context.strokeRect(this.x, this.y, this.width, this.height);
            }
        };

        return Block;
    })();
});
