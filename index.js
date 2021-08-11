const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

const app = express();
let path = "./data/users.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const GetData = () => {
    let data = fs.readFileSync(path);
    return JSON.parse(data);
}

const SaveData = (data) => {
    let str = JSON.stringify(data);
    fs.writeFileSync(path, str);
}

app.get("/users", (req, res) => {
    fs.readFile(path, "utf8", (err, data) => {
        if (err){
            return err;
        }
        res.send(JSON.parse(data));
    });
});

app.post("/users", (req, res) => {
    let data = GetData();
    let id = uuidv4();
    data[id] = req.body;
    SaveData(data);
    res.send({message:"OK"});
});

app.put("/users/:id", (req, res) => {
    let data = GetData();
    let id = req.params.id;
    data[id] = req.body;
    SaveData(data);
    res.send({message:"OK"});
});

app.delete("/users/:id", (req, res) => {
    let data = GetData();
    let id = req.params.id;
    delete data[id];
    SaveData(data);
    res.send({message:"OK"});
});

app.listen(6969, () => {
    console.log("Server is running!");
});