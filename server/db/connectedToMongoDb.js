import mongoose from 'mongoose';
const connectToMongoDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI) 
        console.log("Connected to MongoDb")
}catch(err){
    console.log("Error connecting to MongoDb " , err) 
}
}
export default connectToMongoDb