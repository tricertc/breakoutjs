require(["game"], function (Game) {
    var game = new Game();

    window.addEventListener("keydown", function(e) {
        if (game.is_stopped() && e.keyCode === 32) {
            game.start();
        }
    }, false);
});