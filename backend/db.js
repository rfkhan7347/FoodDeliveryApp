const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://rfkhan60:zefzib-vuqKyz-6fizqe@cluster.zsdntta.mongodb.net/foodkart?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully!");

        const db = mongoose.connection.db;
        const fetchedItems = await db.collection("food_items").find({}).toArray();
        global.food_items = fetchedItems;
        const fetchedCategory = await db.collection("food_category").find({}).toArray();
        global.food_category = fetchedCategory;
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectDB;