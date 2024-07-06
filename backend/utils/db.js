require('dotenv').config()
const mongoose=require('mongoose')

const MongoURL=process.env.MONGOURI

const mongoDB=async()=>{
    try {
        mongoose.connect(MongoURL);
        console.log("mongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports=mongoDB;