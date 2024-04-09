import mongoose from 'mongoose'

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db connected')
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongoDb;