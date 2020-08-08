import { Vector3 } from "three";

// This is a quadratic function that return 0 at first, then return 0.5 when t=0.5,
// then return 0 when t=1 ;
function getQuadra(t) {
	return 9.436896e-16 + (4*t) - (4*(t*t)) ;
}

export default class ScreenShake {
    constructor(camera) {

		// When a function outside ScreenShake handle the camera, it should
		// always check that enabled is false before.
		let enabled = false,
			timestampStart = undefined,
			timestampEnd = undefined,
			startPoint = undefined,
			endPoint = undefined;

		// update(camera) must be called in the loop function of the renderer,
		// it will re-position the camera according to the requested shaking.
		this.update = function update() {
			if ( enabled == true ) {
				const now = Date.now();
				if ( timestampEnd > now ) {
					let interval = (Date.now() - timestampStart) / 
						(timestampEnd - timestampStart) ;
					computePosition( interval );
				} else {
					camera.position.copy(startPoint);
					enabled = false;
				};
			};
		},

		// This initialize the values of the shaking.
		// vecToAdd param is the offset of the camera position at the climax of its wave.
		this.shake = function shake(vecToAdd, milliseconds) {
			enabled = true;
			timestampStart = Date.now();
			timestampEnd = timestampStart + milliseconds;
			startPoint = new Vector3().copy(camera.position);
			endPoint = new Vector3().addVectors(camera.position, vecToAdd);
        }
        
        // This creates the wavy movement of the camera along the interval.
        // The first bloc call this.getQuadra() with a positive indice between
        // 0 and 1, then the second call it again with a negative indice between
        // 0 and -1, etc. Variable position will get the sign of the indice, and
        // get wavy.
        function  computePosition(interval) {
            if (interval < 0.4) {
                var position = getQuadra( interval / 0.4 );
            } else if (interval < 0.7) {
                var position = getQuadra( (interval-0.4) / 0.3 ) * -0.6;
            } else if (interval < 0.9) {
                var position = getQuadra( (interval-0.7) / 0.2 ) * 0.3;
            } else {
                var position = getQuadra( (interval-0.9) / 0.1 ) * -0.1;
            }
            
            // Here the camera is positioned according to the wavy 'position' variable.
            camera.position.lerpVectors( startPoint, endPoint, position );
        }

	}
}