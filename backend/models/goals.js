const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

class GoalsModel {
  static async getUserGoals(userId) {
    try {
      await client.connect();
      console.log(`connected to db`);
      return await client
        .db(process.env.DB_NAME)
        .collection("goals")
        .find({ userId: ObjectId(userId) }, { projection: { userId: 0 } })
        .toArray();
    } catch (err) {
      console.log(`found error ${err}`);
      throw err;
    } finally {
      await client.close();
      console.log(`disconnected from db`);
    }
  }

  static async setUserGoal(goal, userId) {
    try {
      await client.connect();
      console.log(`connected to db`);
      const setGoal = {
        text: goal,
        userId: ObjectId(userId),
      };
      return await client
        .db(process.env.DB_NAME)
        .collection("goals")
        .insertOne(setGoal);
    } catch (err) {
      console.log(`found error ${err}`);
      throw err;
    } finally {
      await client.close();
      console.log(`disconnected from db`);
    }
  }

  static async updateUserGoal(id, goal, userId) {
    try {
      await client.connect();
      console.log(`connected to db`);
      const queryItem = { _id: ObjectId(id), userId: ObjectId(userId) };
      const updateItem = { $set: { text: goal } };
      return await client
        .db(process.env.DB_NAME)
        .collection("goals")
        .updateOne(queryItem, updateItem);
    } catch (err) {
      console.log(`found error ${err}`);
      throw err;
    } finally {
      await client.close();
      console.log(`disconnected from db`);
    }
  }

  static async deleteUserGoal(id, userId) {
    try {
      await client.connect();
      console.log(`connected to db`);
      return await client
        .db(process.env.DB_NAME)
        .collection("goals")
        .deleteOne({ _id: ObjectId(id), userId: ObjectId(userId) });
    } catch (err) {
      console.log(`found error ${err}`);
      throw err;
    } finally {
      await client.close();
      console.log(`disconnected from db`);
    }
  }
}

module.exports = GoalsModel;
