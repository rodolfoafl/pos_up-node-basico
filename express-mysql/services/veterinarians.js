const db = require("./db");
const helper = require("../utils/helper");

const read = async () => {
  const rows = await db.query(
    "SELECT id, firstname, lastname, crmv FROM veterinarians"
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
};

const validateCreate = (veterinarian) => {
  let messages = [];

  console.log(veterinarian);

  if (Object.entries(veterinarian).length === 0) {
    messages.push("Empty object provided");
  }

  if (!veterinarian.firstname) {
    messages.push("Firstname (firstname) is empty");
  }

  if (!veterinarian.lastname) {
    messages.push("Lastname (lastname) is empty");
  }

  if (!veterinarian.crmv) {
    messages.push("CRMV (crmv) is empty");
  }

  if (veterinarian.firstname && veterinarian.firstname.length > 255) {
    messages.push("Firstname (firstname) cannot be longer than 255 characters");
  }

  if (veterinarian.lastname && veterinarian.lastname.length > 255) {
    messages.push("Lastname (lastname) cannot be longer than 255 characters");
  }

  if (messages.length) {
    let error = new Error(messages.join(", "));
    error.statusCode = 400;

    throw error;
  }
};

const create = async (veterinarian) => {
  validateCreate(veterinarian);

  const result = await db.query(
    "INSERT INTO veterinarian (firstname, lastname, crmv) VALUES (?, ?, ?)",
    [veterinarian.firstname, veterinarian.lastname, veterinarian.crmv]
  );

  let message = "";

  if (result.affectedRows) {
    message = "Veterinarian created successfully";
    return { message };
  } else {
    message = "Error on INSERT veterinarian";
    let error = new Error(message);
    error.statusCode = 500;

    throw error;
  }
};

const setUpdatedString = (veterinarian) => {
  let string = "";
  Object.entries(veterinarian).forEach(([key, value], index) => {
    string += `${key} = '${value}'${
      index !== Object.entries(veterinarian).length - 1 ? ", " : " "
    }`;
  });

  return string;
};

const validateUpdate = (veterinarian) => {
  let messages = [];

  if (Object.entries(veterinarian).length === 0) {
    messages.push("Empty object provided");
  }

  if (veterinarian.firstname === "") {
    messages.push("Firstname (firstname) is empty");
  }

  if (veterinarian.lastname === "") {
    messages.push("Lastname (lastname) is empty");
  }

  if (veterinarian.crmv === "") {
    messages.push("CRMV (crmv) is empty");
  }

  if (messages.length) {
    let error = new Error(messages.join(", "));
    error.statusCode = 400;

    throw error;
  }
};

const update = async (id, veterinarian) => {
  validateUpdate(veterinarian);

  let updateString = setUpdatedString(veterinarian);

  let sql = `UPDATE veterinarian SET ${updateString} WHERE ID = ?`;
  const result = await db.query(sql, [id]);

  let message = "";

  let updatedVeterinarian = {};
  if (result.affectedRows) {
    message = "Veterinarian information updated successfully";
    updatedVeterinarian = await db.query(
      "SELECT firstname, lastname, crmv FROM veterinarian WHERE ID = ?",
      [id]
    );
    return { message, updatedVeterinarian };
  } else {
    message = "Error on UPDATE veterinarian";
    let error = new Error(message);
    error.statusCode = 500;

    throw error;
  }
};

const deleteFunc = async (id) => {
  let sql = `DELETE FROM veterinarian WHERE id = ?`;
  const result = await db.query(sql, [id]);
  console.log(result);

  let message = "";

  if (result.affectedRows) {
    message = "Veterinarian deleted successfully";
    return { message };
  } else {
    message = "Error on UPDATE veterinarian";
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
