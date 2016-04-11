define(["models/circle"], function (Circle) {
    return (function () {
        function Ball(canvas, x, y, radius, deltaX, deltaY) {
            this._super = Circle;
            this._super(canvas, x, y, radius);

            this.deltaX = deltaX;
            this.deltaY = deltaY;
        }

        Ball.prototype = new Circle;

        return Ball;
    })();
});
