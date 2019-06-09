# three-screenshaker
a screen shaker tool for three.js



# how to use it

instantiate it :

```
var screenShaker = ScreenShaker();
```


update the camera in the loop :
```
function loop() {

  screenShaker.update(camera);
  
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};
```

in an event listener or whatever part of your code must create a screen shake :
screenShaker.shake( camera, offset(THREE.Vector3), milliseconds );
```
screenShaker.shake( camera, new THREE.Vector3(0.1, 0, 0), 300 );
```
