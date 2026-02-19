const mongoose = require("mongoose");
const SubCategorySchema = require("./model/SubCategorySchema");
const fs = require("fs");
require("dotenv").config();

const LOG_FILE = "verification_output.txt";

function log(msg) {
  const line = `${new Date().toISOString()} - ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(msg);
}

async function run() {
  fs.writeFileSync(LOG_FILE, "Starting verification...\n");
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    log("Connected to MongoDB.");

    const collection = SubCategorySchema.collection;
    const indexes = await collection.indexes();
    log(`Current Indexes: ${JSON.stringify(indexes)}`);

    const nameIndex = indexes.find((idx) => idx.name === "name_1");
    if (nameIndex) {
      log("Found 'name_1' unique index. Dropping it...");
      await collection.dropIndex("name_1");
      log("Index dropped.");
    } else {
      log("No 'name_1' index found.");
    }

    // Checking for any other unique index on name?
    // Sometimes indexes have different names but target 'name'.
    const uniqueNameIdx = indexes.find(
      (idx) => idx.key && idx.key.name && idx.unique,
    );
    if (uniqueNameIdx && uniqueNameIdx.name !== "name_1") {
      log(
        `Found another unique index on name: ${uniqueNameIdx.name}. Dropping...`,
      );
      await collection.dropIndex(uniqueNameIdx.name);
      log("Index dropped.");
    }

    const cat1 = new mongoose.Types.ObjectId();
    const cat2 = new mongoose.Types.ObjectId();
    const testName = "AutoTest_" + Date.now();

    log(`Creating first subcat: ${testName} under ${cat1}`);
    const s1 = new SubCategorySchema({ name: testName, categoryId: cat1 });
    await s1.save();
    log("First subcat created.");

    log(`Creating second subcat: ${testName} under ${cat2}`);
    const s2 = new SubCategorySchema({ name: testName, categoryId: cat2 });
    await s2.save();
    log("Second subcat created.");

    // Clean up
    await SubCategorySchema.deleteMany({ name: testName });
    log("Cleaned up test data.");
  } catch (err) {
    log(`ERROR: ${err.message}`);
    if (err.code === 11000) {
      log("Duplicate Key Error caught - Index still active!");
    }
  } finally {
    await mongoose.disconnect();
    log("Done.");
  }
}

run();
