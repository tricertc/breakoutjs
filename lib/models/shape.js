define(function () {
   return (function () {
       function Shape(canvas, x, y) {
           this.canvas = canvas;
           this.x = x;
           this.y = y;
           this.color = null;
           this.move_behavior = null;
       }

       Shape.prototype.move = function (deltaX, deltaY) {
           if (typeof this.move_behavior === "function") {
               this.move_behavior(this, deltaX, deltaY);
           }
       };

       return Shape;
   })();
});
