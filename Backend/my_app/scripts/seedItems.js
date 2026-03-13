const mongoose = require("mongoose");

const Item = require("../models/ItemModel")

const items = require("./items.json");

mongoose.connect("mongodb+srv://rishitsaboo68_db_user:1234567890@cluster0.icxd9xv.mongodb.net/?appName=Cluster0");

async function seed(){
    await Item.deleteMany({});
    await Item.insertMany(items);


console.log("done");
process.exit();
}
seed()  