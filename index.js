import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 1304;

// show the code where to get the static files in relation to the root file
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var num = 1;
var typedInputs = [];

// get the first page
app.get("/", (req, res) => {
    res.render("index.ejs", {loggedOut: true});
});

// get homepage after logging in
app.post("/register", (req, res) => {
    // checking credentials
    if(req.body["fName"] === "Sebastian" && req.body["password"] === "12345"){
        // parsing contents from login form to homepage
        res.render("home.ejs"
            , {
            firstName: req.body["fName"]
            // number: num,
            // inputs: [""]
        }
    );
    }else{
        // keeping user in the login form if they don't input correct credentials
        res.render("index.ejs", {loggedOut: true});
    }
});

app.get("/first", (req, res) => {
    // num ++;
    // typedInputs.push(req.body["input"]);
    res.render("create.ejs"
    //     ,{
    //     number: num,
    //     inputs: typedInputs
    // }
);
});

app.post("/", (req, res) => {
    num ++;
    typedInputs.push(req.body["input"]);
    res.render("home.ejs",{
        number: num,
        inputs: typedInputs
    });
});

app.post("/view", (req,res) => {
    var inputText = req.body["input"];
    var inputIndex = req.body["index"];
    res.render("view.ejs",{
        text: inputText,
        textIndex: inputIndex
    });
});

app.post("/edited", (req,res) => {
    typedInputs[req.body["textindex"]] = req.body["text"];
    res.render("home.ejs",{
        number: num,
        inputs: typedInputs
    });
});

app.post("/delete", (req,res) => {
    typedInputs.splice(req.body["textindex"],1);
    num --;
    res.render("home.ejs",{
        number: num,
        inputs: typedInputs
    });
});

// redirect to login page, 'index.ejs', when 'log out' button is clicked
app.get("/logout", (req, res) => {
    res.render("index.ejs",{loggedOut: true});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});