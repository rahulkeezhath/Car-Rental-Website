const mongooose = require('mongoose')

const connectDB = async () => {
    try{
        const connection = await mongooose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDb Successfully Connected : ${connection.connection.host}`);
        
    }catch (error){
        console.log("error",error);
        process.exit(1)
    }
}

module.exports = connectDB