import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

export const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://mern_gee:chiefchief100@cluster0.l7yrx98.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Bingo!");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};
