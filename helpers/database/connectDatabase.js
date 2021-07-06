const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connection Successfully"))
        .catch((err) => console.log(err));
};

module.exports = {
    connectDatabase,
};
