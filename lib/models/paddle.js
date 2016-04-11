define(["models/rectangle"], function (Rectangle) {
    return (function () {
        function Paddle(canvas, width, height) {
            var x = Math.floor((canvas.width - width) / 2),
                y = canvas.height - height;

            this._super = Rectangle;
            this._super(canvas, x, y, width, height);

            this.move_behavior = function (paddle, deltaX) {
                var min = 0,
                    max = paddle.canvas.width - paddle.width,
                    nextX = paddle.x + deltaX * paddle.speed;

                if (nextX < min) {
                    paddle.x = min;
                } else if (nextX > max) {
                    paddle.x = max;
                } else {
                    paddle.x = nextX;
                }
            };
        }

        Paddle.prototype = new Rectangle;

        return Paddle;
    })();
});
