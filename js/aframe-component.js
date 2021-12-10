// Marker Lost
AFRAME.registerComponent("delay-marker-lost", {
    schema: {
        default: 1.0
    },
    init: function () {
        this.timer = null;
        this.marker = false;
        this.el.addEventListener(
            "markerFound",
            function (evt) {
                let value = evt.target.getAttribute("value");
                let prev = this.marker;
                if (!prev) {
                    this.marker = true;
                    this.el.emit("delayMarkerFound");
                    console.log("delayMarkerFound ", value);
                }
                clearTimeout(this.timer);
                //console.log(this.markers)
            }.bind(this)
        );
        this.el.addEventListener(
            "markerLost",
            function (evt) {
                let value = evt.target.getAttribute("value");
                let _this = this;
                clearTimeout(this.timer);
                this.timer = setTimeout(function () {
                    _this.el.emit("delayMarkerLost");
                    console.log("delayMarkerLost ", value);
                    _this.marker = false;
                    //console.log(_this.timer, _this.markers)
                }, 1500);
            }.bind(this)
        );
    }
});

//Custom Component
AFRAME.registerComponent("compass-marker", {
    schema: {
        default: 1.0
    },
    init: function () {
        this.timer = null;
        this.value = null;
        this.gps = null;
        this.updateCount = 0;
        this.textElement = null;

        this.el.addEventListener("markerFound", function (evt) {
            this.textElement = document.getElementById("distance");
            this.value = evt.target.getAttribute("value");
            this.gps = document.querySelector('[gps-entity-place][value="' + this.value + '"]');
            updateCount = 0;

            let _this = this;

            this.timer = setInterval(function () {
                _this.textElement.innerHTML = "Distance: " + _this.gps.getAttribute('distance') + " Update: " + _this.updateCount;
                _this.updateCount++;
            }, 500);

        }.bind(this));

        this.el.addEventListener("markerLost", function (evt) {
            this.textElement.innerHTML = "Waiting";
            this.updateCount = 0;
            clearInterval(this.timer);
        }.bind(this));
    }
});