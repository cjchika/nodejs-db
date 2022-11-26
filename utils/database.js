import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

let _db;

export const mongoConnect = (callback) => {
  MongoClient.connect(process.env.CONNECTION_URL)
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};
