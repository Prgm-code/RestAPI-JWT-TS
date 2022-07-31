import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/test', {
   
 
})

    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));
