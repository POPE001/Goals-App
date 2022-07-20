const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

class UserModel {
  static async checkEmail(email) {
    try {
      await client.connect();
      console.log(`connected to db`);
      return await client
        .db(process.env.DB_NAME)
        .collection("users")
        .findOne({ email: email });
    } catch (err) {
      console.log(`found error ${err}`);
      throw err;
    } finally {
      await client.close();
      console.log(`disconnected from db`);
    }
  }

  static async createUser(name, email, hashedPassword) {
    try {
      await client.connect();
      console.log(`connected to db`);
      const user = {
        name: name,
        email: email,
        password: hashedPassword,
      };
      return await client
        .db(process.env.DB_NAME)
        .collection("users")
        .insertOne(user);
    } catch (err) {
      console.log(`found error ${err}`);
      throw err;
    } finally {
      await client.close();
      console.log(`disconnected from db`);
    }
  }
}

module.exports = UserModel;
