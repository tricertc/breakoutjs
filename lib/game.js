define([
    "models/canvas",
    "models/paddle",
    "models/ball",
    "models/block"
], function (Canvas, Paddle, Ball, Block) {
    var audio_player = document.getElementById("audio"),
        options = {
            ball: {
                color: "#111133",
                radius: 10,
                defaultDeltaX: 2,
                defaultDeltaY: -4
            },
            blocks: {
                borderColor: "#ccccee",
                color: "rgba(17, 17, 51, 0.3)",
                width: 40,
                height: 20,
                audio: "assets/audio/score.wav"
            },
            canvas: {
                id: "canvas",
                width: 640,
                height: 480,
                type: "2d"
            },
            paddle: {
                color: "#111133",
                width: 130,
                height: 15,
                speed: 6,
                audio: "assets/audio/hit.wav"
            },
            refreshRate: 10,
            scoreboard: {
                container: document.getElementById("scoreboard"),
                display: document.getElementById("score")
            }
        };

    return (function () {
        function Game() {
            var o = options.canvas;

            this.score = 0;
            this.game_id = 0;
            this.canvas = new Canvas(o.id, o.width, o.height, o.type);

            // controls
            this.controls = {
                left: false,
                right: false
            };

            // game objects
            this.paddle = null;
            this.ball = null;
            this.blocks = null;

            options.scoreboard.container.style.width = this.canvas.width + "px";
        }

        Game.prototype.draw = function () {
            this.canvas.clear();

            options.scoreboard.display.innerHTML = this.score;

            this.blocks.forEach(function (block) {
                block.draw();
            });

            this.ball.draw();
            this.paddle.draw();
        };

        Game.prototype.update = function () {
            // check for end game
            if (this.blocks.length === 0) {
                this.end();
                return;
            }

            if (this.controls.left === true) {
                this.paddle.move(-1);
            }

            if (this.controls.right === true) {
                this.paddle.move(1);
            }

            this.ball.move();

            this.draw();
        };

        Game.prototype.init_paddle = function () {
            var o = options.paddle;

            this.paddle = new Paddle(this.canvas, o.width, o.height);
            this.paddle.color = o.color;
            this.paddle.speed = o.speed;
        };

        Game.prototype.init_ball = function () {
            var _this = this,
                o = options.ball,
                x = this.paddle.x + Math.floor(this.paddle.width / 2),
                y = this.canvas.height - this.paddle.height - o.radius;

            this.ball = new Ball(this.canvas, x, y, o.radius, o.defaultDeltaX, o.defaultDeltaY);
            this.ball.color = o.color;

            this.ball.move_behavior = function (ball) {
                // x-axis bounds check
                if (ball.x < 0 || ball.x > ball.canvas.width) {
                    ball.deltaX *= -1;
                }

                // y-axis bounds check
                if (ball.y < 0) { ball.deltaY *= -1; }

                // block hit check
                _this.blocks.forEach(function (block, i) {
                    if (ball.x > block.getLeft() && ball.x < block.getRight()) {
                        if (ball.y > block.getTop() && ball.y < block.getBottom()) {
                            // play audio
                            audio_player.src = options.blocks.audio;
                            audio_player.play();

                            _this.score += block.points;
                            ball.deltaY *= -1;
                            _this.blocks.splice(i, 1);
                        }
                    }
                });

                // paddle hit check
                if (ball.deltaY > 0) {
                    if (ball.y > ball.canvas.height) {
                        // game over
                        _this.end();
                        return;
                    }
                    else if (ball.y > _this.paddle.y) {
                        if (ball.x > _this.paddle.x && ball.x < _this.paddle.getRight()) {
                            // audio
                            audio_player.src = options.paddle.audio;
                            audio_player.play();

                            ball.deltaY *= -1;
                        }
                    }
                }

                ball.x += ball.deltaX;
                ball.y += ball.deltaY;
            };
        };

        Game.prototype.init_blocks = function () {
            var x, y, block,
                o = options.blocks,
                maxWidth = this.canvas.width,
                maxHeight = Math.floor(this.canvas.height / 2);

            this.blocks = [];
            for (x = 0; x < maxWidth; x += o.width) {
                for (y = 0; y < maxHeight; y += o.height) {
                    block = new Block(this.canvas, x, y, o.width, o.height);
                    block.color = o.color;
                    block.borderColor = o.borderColor;

                    block.points = (maxHeight / o.height) - Math.ceil((y + 1) / o.height) + 1;

                    if (block.x >= 0 && block.x <= this.canvas.width &&
                        block.y >= 0 && block.y <= this.canvas.height) {

                        this.blocks.push(block);
                    } else {
                        console.log("warning");
                    }
                }
            }
        };

        Game.prototype.init_event_handlers = function () {
            var _this = this;

            window.addEventListener("keydown", function (e) {
                switch (e.keyCode) {
                    case 37:
                        _this.controls.left = true;
                        break;
                    case 39:
                        _this.controls.right = true;
                        break;
                    default:
                        break;
                }
            }, false);

            window.addEventListener("keyup", function (e) {
                switch (e.keyCode) {
                    case 37:
                        _this.controls.left = false;
                        break;
                    case 39:
                        _this.controls.right = false;
                        break;
                    default:
                        break;
                }
            }, false);
        };

        Game.prototype.is_stopped = function () {
            return this.game_id === 0;
        };

        Game.prototype.end = function () {
            clearInterval(this.game_id);
            this.game_id = 0;
        };

        Game.prototype.start = function () {
            this.init_paddle();
            this.init_ball();
            this.init_blocks();

            this.init_event_handlers();

            this.controls.left = false;
            this.controls.right = false;

            this.score = 0;
            this.game_id = setInterval(this.update.bind(this), options.refreshRate);
        };

        return Game;
    })();
});
