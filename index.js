// index.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Person = require("./personModel");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create and Save a Record of a Model
const createPerson = async () => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Pasta"],
  });

  person.save((err, data) => {
    if (err) return console.error("Error saving person:", err);
    console.log("Person saved:", data);
  });
};

// Create Many Records with model.create()
const createManyPeople = async (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error("Error creating people:", err);
    console.log("People created:", data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = async (name) => {
  Person.find({ name: name }, (err, data) => {
    if (err) return console.error("Error finding people:", err);
    console.log("People found:", data);
  });
};

// Use model.findOne() to Return a Single Matching Document
const findOneByFavoriteFood = async (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error("Error finding person by food:", err);
    console.log("Person found:", data);
  });
};

// Use model.findById() to Search By _id
const findById = async (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error("Error finding person by ID:", err);
    console.log("Person found by ID:", data);
  });
};

// Perform Classic Updates
const updatePersonFavoriteFood = async (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error("Error finding person:", err);
    person.favoriteFoods.push("Hamburger");
    person.save((err, updatedPerson) => {
      if (err) return console.error("Error updating person:", err);
      console.log("Updated person:", updatedPerson);
    });
  });
};

// Perform New Updates with findOneAndUpdate
const updateAgeByName = async (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error("Error updating person by name:", err);
      console.log("Updated person:", updatedPerson);
    }
  );
};

// Delete One Document
const deletePersonById = async (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error("Error removing person by ID:", err);
    console.log("Removed person:", removedPerson);
  });
};

// Delete Many Documents
const deleteManyByName = async (name) => {
  Person.deleteMany({ name: name }, (err, result) => {
    if (err) return console.error("Error removing people:", err);
    console.log("Result of removal:", result);
  });
};

// Chain Search Query Helpers
const findPeopleWhoLikeBurritos = async () => {
  Person.find({ favoriteFoods: "Burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err)
        return console.error("Error finding people who like burritos:", err);
      console.log("People who like burritos:", data);
    });
};

// Example function calls (adjust as needed)
// Uncomment these lines to run the corresponding functions

// createPerson();
// createManyPeople([{ name: 'Alice', age: 25, favoriteFoods: ['Burritos'] }, { name: 'Bob', age: 28, favoriteFoods: ['Sushi'] }]);
// findPeopleByName('John Doe');
// findOneByFavoriteFood('Pizza');
// findById('your_person_id_here'); // Replace with a valid ID
// updatePersonFavoriteFood('your_person_id_here'); // Replace with a valid ID
// updateAgeByName('John Doe');
// deletePersonById('your_person_id_here'); // Replace with a valid ID
// deleteManyByName('Mary');
// findPeopleWhoLikeBurritos();
