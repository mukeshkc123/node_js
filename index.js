//this is the Qr genrator project in which we use npm modules to genrate a qr image
//inquirer:module to ask the user for the url
//qr-image:module to make the qr-image
// import both the module after initializing the npm
// The inquirer.prompt() function is used to ask the user for input. It presents a message asking
// the user to input their URL and stores the response in the answers object.
// Inside the .then() callback function, the URL is retrieved from the answers object and stored in the url variable.
//The qr.image() function is used to generate a QR code image based on the provided URL.
// The resulting image is stored in the qr_svg variable.

// The qr_svg image is then piped to fs.createWriteStream("qrcode.png"),
// which creates a file named "qrcode.png" and writes the image data to it.
// This will save the generated QR code image as a PNG file.

// Additionally, the fs.writeFile() function is used to create a file named "url.txt" and
// write the URL to it. This will save the entered URL in a text file.

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Input your URL:",
      name: "URL",
      //assigned a name to the url which can be used further
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qrcode.png"));
    //the pipe() method is used to connect the output of one stream to the input of another stream.
    // It allows you to take the readable stream and send its data directly to a writable stream without manually
    // handling the data events.
    fs.writeFile("url.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("someting went wrong");
    } else {
      console.log("success");
    }
  });
