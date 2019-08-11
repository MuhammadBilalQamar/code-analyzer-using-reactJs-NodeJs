/* const countLinesInFile = require("count-lines-in-file");
// const path = require("path");
// const targetFilePath = path.resolve(__dirname, "./data.txt");

// var err = new Error();
// var no = new Number();

// countLinesInFile(targetFilePath, (err, num) => {
//   console.log("number of lines", num);
// });*/

const express = require("express");
const app = express();


var fName = [];

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");

app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const storage = multer.diskStorage({
  destination: "./uploads",
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage });

var fs = require("fs");

app.post("/uploadfile", upload.single("file"), (req, res) => {
  console.log("we got a file", req.file);

  fs.exists(`${__dirname}/uploads`, exists => {
    console.log(exists);
    if (exists == true) {
      /* fs.readdir(`${__dirname}/uploads`, (err, files) => {
      //   console.log(files.length, files);
      // });*/
      fs.readdir(`${__dirname}/uploads`, (err, files) => {
        if (err) {
          console.log("Error No files In Directory", err);
        } else if (files.length == 0) {
          console.log("Error No files In Directory", err);
        } else if (files.length > 0) {
          // Do something
          fName.push(req.file.originalname)
          return res.json({ message: "success" });
        } else {
          console.log("no no no");
        }
      });
    } else {
      console.log("No such file");
    }
  });

  console.log("we got a data", req.body);
});

app.listen(9000, err => {
  err
    ? console.log("Error Starting Server", err)
    : console.log("Server Started On 9000");
});

app.get("/getfileinfo", (req, res) => {
  var readline = require("readline");

console.log(fName[0])   

  const path = require("path");
  const targetFilePath = path.resolve(`./uploads/server.js`);

  var inValid = new RegExp(/[\s]/g);
  var comment_REGEX = new RegExp(/[/**/]/g);

  var whiteSpace = 0;

  var myInterface = readline.createInterface({
    input: fs.createReadStream(targetFilePath)
  });

  var lineno = 0;
  var l1 = "";

  myInterface.on("line", function(line) {
    /* console.log("Line number " + lineno + ": " + line);*/
    lineno++;
    l1 = l1.concat(line);
  });

  myInterface.on("close", function() {
   /* console.log("Total Number Of Lines" + lineno);
    console.log("All Whitespaces", l1.match(inValid).length);
    console.log("All Comments", l1.match(comment_REGEX).length / 4);*/

    return res.json({
      data: {
        total_Number_Of_Lines: lineno,
        total_Number_Of_WhiteSpaces: l1.match(inValid).length,
        total_Number_Of_Comments: l1.match(comment_REGEX).length / 4
      }
    });
  });
});
