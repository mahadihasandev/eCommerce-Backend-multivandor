const mongoose = require("mongoose");
const SubCategorySchema = require("./model/SubCategorySchema");
require("dotenv").config();

async function fixIndex() {
  console.log("Starting fixIndex script...");
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Use the model to get the collection, avoiding name guessing
    const collection = SubCategorySchema.collection;
    console.log(`Targeting collection: ${collection.name}`);

    // List indexes
    console.log("Fetching indexes...");
    const indexes = await collection.indexes();
    console.log("Current Indexes:", JSON.stringify(indexes, null, 2));

    // Drop name_1 index if it exists
    const nameIndex = indexes.find((idx) => idx.name === "name_1");
    if (nameIndex) {
      console.log("Found unique index 'name_1'. Dropping...");
      await collection.dropIndex("name_1");
      console.log("Index 'name_1' dropped successfully.");
    } else {
      console.log("No index named 'name_1' found.");
    }

    // Verify by listing a few subcategories
    const subcats = await SubCategorySchema.find({}).limit(5);
    console.log("Sample SubCategories:");
    subcats.forEach((s) =>
      console.log(
        `- Name: ${s.name}, CategoryId: ${s.categoryId}, ID: ${s._id}`,
      ),
    );
  } catch (err) {
    console.error("Error encountered:", err);
  } finally {
    console.log("Disconnecting...");
    await mongoose.disconnect();
    console.log("Disconnected. Script finished.");
    process.exit(0);
  }
}

// Timeout to prevent hanging
setTimeout(() => {
  console.error("Script timed out after 30 seconds.");
  process.exit(1);
}, 30000);

fixIndex();
