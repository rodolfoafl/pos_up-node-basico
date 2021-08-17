const db = require("./db");
const helper = require("../utils/helper");

const read = async () => {
  const rows = await db.query("SELECT id, name, age FROM animal");
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
};

const validateCreate = (animal) => {
  let messages = [];

  // console.log(animal);

  if (Object.entries(animal).length === 0) {
    messages.push("Empty object provided");
  }

  if (!animal.name) {
    messages.push("Name (name) is empty");
  }

  if (!animal.age) {
    messages.push("Age (age) is empty");
  }

  if (animal.name && animal.name.length > 255) {
    messages.push("Name (name) cannot be longer than 255 characters");
  }

  if (messages.length) {
    let error = new Error(messages.join(", "));
    error.statusCode = 400;

    throw error;
  }
};

const create = async (animal) => {
  validateCreate(animal);

  const result = await db.query(
    "INSERT INTO animal (name, age) VALUES (?, ?)",
    [animal.name, animal.age || null]
  );

  let message = "";

  if (result.affectedRows) {
    message = "Animal created successfully";
    return { message };
  } else {
    message = "Error on INSERT animal";
    let error = new Error(message);
    error.statusCode = 500;

    throw error;
  }
};

const setUpdatedString = (animal) => {
  let string = "";
  Object.entries(animal).forEach(([key, value], index) => {
    string += `${key} = '${value}'${
      index !== Object.entries(animal).length - 1 ? ", " : " "
    }`;
  });

  return string;
};

const validateUpdate = (animal) => {
  let messages = [];

  if (Object.entries(animal).length === 0) {
    messages.push("Empty object provided");
  }

  if (animal.name === "") {
    messages.push("Name (name) is empty");
  }

  if (animal.age) {
    if (!Number.isInteger(animal.age)) {
      messages.push("Age (age) is not a number");
    }
    if (animal.age < 0) {
      messages.push("Age (age) is less than 0");
    }
  }

  if (messages.length) {
    let error = new Error(message);
    error.statusCode = 400;

    throw error;
  }
};

const update = async (id, animal) => {
  validateUpdate(animal);

  let updateString = setUpdatedString(animal);

  let sql = `UPDATE animal SET ${updateString} WHERE ID = ?`;
  const result = await db.query(sql, [id]);

  let message = "";

  let updatedAnimal = {};
  if (result.affectedRows) {
    message = "Animal information updated successfully";
    updatedAnimal = await db.query(
      "SELECT name, age FROM animal WHERE ID = ?",
      [id]
    );
    return { message, updatedAnimal };
  } else {
    message = "Error on UPDATE animal";
    let error = new Error(message);
    error.statusCode = 500;

    throw error;
  }
};

const deleteFunc = async (id) => {
  let sql = `DELETE FROM animal WHERE id = ?`;
  const result = await db.query(sql, [id]);

  let message = "";

  if (result.affectedRows) {
    message = "Animal deleted successfully";
    return { message };
  } else {
    message = "Error on DELETE animal";
    let error = new Error(message);
    error.statusCode = 500;

    throw error;
  }
};

module.exports = {
  read,
  create,
  update,
  deleteFunc,
};
