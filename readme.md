# PixelCounter App
[PixelCounter Site](https://aerolab.github.io/pixelcounter)

PixelCounter is an open source application for counting the pixels of your images. Is simple and Drag&Drop! this app that count amount pixel's from images of next extensions (*bmp, jpeg, tiff, gif, png, webp, jpg, psd, svg*). 

the PixelCounter based in [PixelCounter Script](https://github.com/Aerolab/pixelcounter) created by team [Aerolab](https://github.com/Aerolab/) for use in [Culture](http://aerolab.co/culture) section of Aerolab website. This script is small but is powerfull and have usage of CLI.

#Fork and tack on 

Based in Node-Webkit to have start develop in few minuts and practic steps.

If you have a new featured developed in your fork, you can create a pullrequest to add new release of PixelCounter App.


## Getting Started 

First of all, you need to install Node.JS (a Javascript platform), which you can download from [Download](http://nodejs.org/download/).

Now open the Terminal right in that folder. Now well install a couple of dependencies we need for this project:

**On Mac or Linux**
```
sudo npm install 
bower install 
```

**On Window**
```
npm install 
bower install 
```

## Run App

You have this command for start the app. this command compiled, open and livereload app. Because you app not open, you run manually node-webkit and your app refresh only. read [Documentation](https://github.com/nwjs/nw.js/wiki/How-to-run-apps) of node-webkit.

**On Mac**
```
grunt live-build
```
this command compiled and watch all file in app/, all change is view and compiled moment at moment.


## Build Dist


To test your app you have to build a distribution from it. Depending on your development system you have to use one of the following grunt tasks.

**for Linux**
```
grunt dist-linux # for 64bit
grunt dist-linux32 # for 32bit
```
**for Windows**
```
grunt dist-win
```
**for Mac**
```
grunt dist-mac # for 64bit
grunt dist-mac32 # for 32bit
```
The resulting application can then be found in the folder dist.
Once the creation of the package and you could go to start it.
