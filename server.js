const express = require("express");
const app = express();
const upload = require("express-fileupload");
const cors = require('cors')
const bodyParser = require("body-parser");
var fs = require("fs");
var sloc = require('sloc');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(bodyParser.json({}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload());
app.use(cors(corsOptions))

app.get("/users", (req, res) => {
    res.json({ id: "35985", title: "bilal qamar" });
    return res;
});
app.post('/', function (req, res) {
    if (req.files) {
        /* console.log(req.files);*/
        var file = req.files.filename;
        var filename = file.name;
        file.mv("./upload/" + filename, function (err) {
            if (err) {
                console.log(err);
                return res.json({ message: "error occured in uploading file" });

            }
            else {
                // return res.json({ message: "upload done" });

                fs.readFile(filename, "utf8", function (err, code) {

                    if (err) { console.error(err); }
                    else {
                        var tempNames = [];
                        var tempValues = [];
                        var stats = sloc(code, "coffee");
                        for (i in sloc.keys) {
                            var k = sloc.keys[i];
                            console.log(k + " : " + stats[k]);
                            tempNames.push(k);
                            tempValues.push(stats[k])
                        }
                        return res.json("'Total Lines : " + tempValues[0] + "', 'Source Code Lines : " + tempValues[1] + "', 'Empty Lines : " + tempValues[7] + "'");
                    }
                });
            }
        })
    }
    else {
        return res.json({ message: "somenthing went wrong" });

    }
})


const Port = process.env.PORT || 3001;
app.listen(Port, err => {
    err
        ? console.log("err in starting server")
        : console.log(`server Started on${Port}`);
});
