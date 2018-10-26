# P5JS-Physics-sim
A simple physics simulator in P5 JS in its early development stages

## Getting started
To run this application, no further installations are needed, just launch it with the **index.html** file, but in order to be able to use the "ServerLaunch.bat", **browserSync** is needed, which makes the development a lot easier by reloading the web page after making any changes in any of the .js files. **NodeJS** is also necessary for browserSync to work.

* [NodeJs](https://nodejs.org/en/)
* [BrowserSync](https://browsersync.io/)

You can simply install browsersync after NodeJS is downloaded, by running this command in the terminal 
```
npm install -g browser-sync
```
## Controlls
You can controll the objects by using they keys: **WSAD** and **ARROWS**, ARROWS for object number 1 and WSAD for object number 2

## Version history
Version number is the date that the particullar version was released on

### V2018-10-25
* Basic collision detection and response is implemented
* Three sliders added to adjust forces acting on the objects - bounce, airResistance and gravityForce
