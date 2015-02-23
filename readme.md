## Pixel Counter

This app is a pixel counter in folder. Is simple! that count your pixel's from images (*bmp, jpeg, tiff, gif, png, webp, jpg, psd, svg*), just by dragging and dropping them into the app.

the project is developing so it is necessary to start as follows.

## Getting Started

First of all, you need to install Node.JS (a Javascript platform), which you can download from [http://nodejs.org/download/](http://nodejs.org/download/).

Now open the Terminal right in that folder. Now weâ€™ll install a couple of dependencies we need for this project:

**On Mac**
```
sudo npm install 
sudo bower install 

```

**On Windows**
```
npm install 
bower install 

```

**For star the app you have this command**
```
grunt watch-build

```
this command compiled and watch all file in app/, all change is view and compiled newly.

## Building the desktop app


To test your app you have to build a distribution from it. Depending on your development system you have to use one of the following grunt tasks.

On a linux call
```
$ grunt dist-linux # for 64bit
$ grunt dist-linux32 # for 32bit
```
On a pc call
```
$ grunt dist-win
```
On a mac call
```
$ grunt dist-mac # for 64bit
$ grunt dist-mac32 # for 32bit
``
The resulting application can then be found in the folder dist.
