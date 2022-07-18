const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


const url = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url, 
            {useNewUrlParser: true, 
                useUnifiedTopology: true, 
        }  )
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    } catch (error){ 
            console.log(error);
            process.exit(1)
    }
}

module.exports = connectDB