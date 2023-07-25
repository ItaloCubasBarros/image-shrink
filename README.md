
**Image-Shrink** is a desktop application that allows you to resize and adjust the quality of your images. Built with Node.js and leveraging the power of Electron.js, this application is a practical tool for image editing tasks.

This project is created as a part of the course "[Electron From Scratch: Build Desktop Apps With JavaScript](https://www.udemy.com/course/electron-from-scratch/)" by Brad Traversy on Udemy. This codebase is free to use and modify; however, to run the application on your system, you'll need to install the required dependencies.

**Prerequisites**
Before you can run Image-Shrink on your system, you'll need to have Node.js installed. If you don't already have it, you can download it from here.

Dependencies
This project relies on several npm packages. Below are the relevant links to each package. After cloning the repository, you can install all of them using the following command:


`npm install imagemin@7.0.1 imagemin-pngquant@8.0.0 imagemin-mozjpeg@8.0.0 slash@3.0.0`

[Electron](https://www.npmjs.com/package/electron)
[Electron Packager](https://www.npmjs.com/package/electron-packager)
[Electron Log](https://www.npmjs.com/package/electron-log)
[Imagemin](https://www.npmjs.com/package/imagemin)
[Imagemin Mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg)
[Imagemin Pngquant](https://www.npmjs.com/package/imagemin-pngquant)
Additional documentation for [Electron.js](https://www.electronjs.org/docs/latest/) can be found here.




Packaging for Desktop
Once you've installed the necessary packages, you can package the application for your specific OS by running the appropriate npm script:

For Mac:
`npm run package-mac`
For Windows:
`npm run package-win`
For Linux:
`npm run package-linux`

**Author**
This project was created by Italo Cubas.

**Product Name**
Image Shrink - A simple and effective solution to adjust and resize your images.
