define(function () {
    return (function () {
        function Canvas(elementId, width, height, type) {
            this.element = document.getElementById(elementId);
            this.element.width = this.width = width;
            this.element.height = this.height = height;
            this.context = this.element.getContext(type);
        }

        Canvas.prototype.clear = function () {
            this.context.clearRect(0, 0, this.width, this.height);
        };

        return Canvas;
    })();
});
