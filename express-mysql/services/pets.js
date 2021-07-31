const db = require("./db");
const helper = require("../helper");

const read = async () => {
  const rows = await db.query("SELECT name, age, image FROM pet");
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
};

const validateCreate = (pet) => {
  let messages = [];

  if (!pet) {
    messages.push("No object is provided");
  }

  if (!pet.name) {
    messages.push("Name is empty");
  }

  if (!pet.age) {
    messages.push("Age is empty");
  }

  if (pet.name && pet.name.length > 255) {
    messages.push("Name cannot be longer than 255 characters");
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
};

const create = async (pet) => {
  validateCreate(pet);

  const result = await db.query(
    "INSERT INTO pet (name, age, image) VALUES (?, ?, ?)",
    [pet.name, pet.age, pet.image || null]
  );

  let message = "Error in creating pet";

  if (result.affectedRows) {
    message = "Pet created successfully";
  }

  return { message };
};

const setUpdatedString = (pet) => {
  let string = "";
  Object.entries(pet).forEach(([key, value], index) => {
    string += `${key} = '${value}'${
      index !== Object.entries(pet).length - 1 ? ", " : " "
    }`;
  });

  return string;
};

const validateUpdate = (pet) => {
  let messages = [];

  if (!pet) {
    messages.push("No object is provided");
  }

  if (pet.name && pet.name.length === 0) {
    messages.push("Name is empty");
  }

  if (pet.age && !Number.isInteger(pet.age)) {
    messages.push("Age it not a number");
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
};

const update = async (id, pet) => {
  validateUpdate(pet);

  let updateString = setUpdatedString(pet);

  var sql = `UPDATE pet SET ${updateString} WHERE ID = ?`;
  const result = await db.query(sql, [id]);

  let message = `Error in updating pet: ${result.info}`;

  let updatePet = {};
  if (result.affectedRows) {
    message = "Pet information updated successfully";
    updatePet = await db.query(
      "SELECT name, age, image FROM pet WHERE ID = ?",
      [id]
    );
  }

  return { message, updatePet };
};

module.exports = {
  read,
  create,
  update,
};
