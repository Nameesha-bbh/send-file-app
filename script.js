const File = require('./models/file');
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_CONNECTION_URL)
  .then(result => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.log("Error connecting to database");
  });


async function deleteData(){
    const pastData = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const files = await File.find({ createdAt : {$lt: pastData } });

    if(files.length){
        for(const file of files){
            try{
                fs.unlinkSync(file.path);
            await file.remove();
            console.log(`Successfully deleted ${file.fileName}`);
            }
            catch(err){
                console.log(`Error while deleting file. Error is ${err}`);
            }
        }
    }
}

deleteData().then(() => {
    console.group("Deletion ended!");
    process.exit();
})