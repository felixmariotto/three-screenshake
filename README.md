# three-screenshake
a screen shake tool for three.js   

example here : https://jsfiddle.net/e4h931co/


# how to use it

instantiate it :

```javascript
var screenShake = ScreenShake();
```
  

update the camera in the loop :
```javascript
function loop() {

  screenShake.update(camera);
  
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};
```
  
if you indend to do something else with the camera, you can check for screenShake.enabled like this :
```javascript
if (screenShake.enabled == true) {
// Then a screenshake is in progress
}
```
   

in an event listener or any part of your code that must create a screen shake :  
```javascript
screenShake.shake( camera, new THREE.Vector3(0.1, 0, 0), 300 /* ms */ );
```
The second argument is the offset at the climax of the screen-shake.
The third argument is the duration of the shake in milliseconds.



# install via npm

`npm i https://github.com/felixmariotto/three-screenshake`

Because this is no ES6 Module, add this Shim to your bundler / `webpack.js`:
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve("three-screenshake"),
        use: ['imports-loader?THREE=three', 'exports-loader?ScreenShake']
      }
    ]
  }
}
```
Import and use as described:
```javascript
import * as ScreenShake from "three-screenshake";
...
```
