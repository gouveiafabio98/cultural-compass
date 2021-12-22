var currentTarget = null;

// Marker Lost
AFRAME.registerComponent("delay-marker-lost", {
    schema: {
        default: 1.0
    },
    init: function() {
        this.timer = null;
        this.marker = false;
        this.value = null;
        this.el.addEventListener(
            "markerFound",
            function(evt) {
                markerEvent(null);
                currentTarget = document.querySelector("[gps-entity-place]" + evt.target.querySelector("a-gltf-model").getAttribute("look-at"));
                this.value = evt.target.getAttribute("value");
                let prev = this.marker;
                if (!prev) {
                    this.marker = true;
                    this.el.emit("delayMarkerFound");
                    console.log("delayMarkerFound ", this.value);
                }
                clearTimeout(this.timer);
                markerEvent(this.value);
            }.bind(this)
        );
        this.el.addEventListener(
            "markerLost",
            function(evt) {
                this.value = evt.target.getAttribute("value");
                let _this = this;
                clearTimeout(this.timer);
                this.timer = setTimeout(function() {
                    currentTarget = null;
                    _this.el.emit("delayMarkerLost");
                    console.log("delayMarkerLost ", _this.value);
                    _this.marker = false;
                    _this.value = null;
                    markerEvent(_this.value);
                }, 1500);
            }.bind(this)
        );
    }
});

AFRAME.registerComponent("marker-distance", {
    schema: {
        default: 1.0
    },
    init: function() {
        this.directionVec3 = new THREE.Vector3();
        this._targetPos = new THREE.Vector3();
        this._currentPos = new THREE.Vector3();
    },
    tick: function() {
        if (currentTarget != null) {
            var directionVec3 = this.directionVec3;
            this._targetPos.setFromMatrixPosition(
                currentTarget.object3D.matrixWorld
            );
            this._currentPos.setFromMatrixPosition(this.el.object3D.matrixWorld);

            directionVec3.copy(this._targetPos).sub(this._currentPos);

            //console.log(Math.abs(currentDistance - directionVec3.length()), currentDistance, directionVec3.length());
            if (currentDistance == null || Math.abs(currentDistance - directionVec3.length()) > 1) {
                currentDistance = directionVec3.length();
                changeCurrentDistance();
            }
        } else if (currentDistance != null) {
            currentDistance = null;
            changeCurrentDistance();
        }
    }
});