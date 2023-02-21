import mongoose from 'mongoose'

const dbConnection = async()=>{
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(String(process.env.MONGODB_CNN))
        console.log("Base de datos Online 🟢")
    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de iniciar la base de datos");
    }
}

export default dbConnection