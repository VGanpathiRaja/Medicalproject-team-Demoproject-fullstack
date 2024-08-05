var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/Medical',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', ()=> console.log("Error is connecting to the db"));
db.once('open', ()=> console.log("Connection to the db successfully"));


app.post("/signup", (req,res) =>{
    var Name = req.body.Name;
    var Email = req.body.Email;
    var Subject = req.body.Subject;
    var Message = req.body.Message;
    var data ={
        "username": Name,
        "email": Email,
        "subject": Subject,
        "message": Message,
    };

    db.collection('Patientinfo').insertOne(data, (err, collection) =>{
        if(err){
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Succesfully:", collection.insertedID);
        return res.redirect('confirm.html');
    });
});

app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect('contact.html');
});


app.listen(5055, ()=>{
    console.log("Listening on PORT 5055")
});