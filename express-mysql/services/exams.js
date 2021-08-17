const db = require("./db");
const helper = require("../utils/helper");

const read = async () => {
  const rows = await db.query(
    "SELECT id, veterinarian_id, animal_id, description, date_of FROM exam"
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
};

const validateCreate = (exam) => {
  let messages = [];

  console.log(exam);

  if (Object.entries(exam).length === 0) {
    messages.push("Empty object provided");
  }

  if (!exam.veterinarian_id) {
    messages.push("Veterinarian (veterinarian_id) is empty");
  }

  if (!exam.animal_id) {
    messages.push("Animal (animal_id) is empty");
  }

  if (!exam.description) {
    messages.push("Description (description) is empty");
  }

  if (!exam.date_of) {
    messages.push("Date (date_of) is empty");
  }

  if (exam.description && exam.description > 255) {
    messages.push(
      "Description (description) cannot be longer than 255 characters"
    );
  }

  if (messages.length) {
    let error = new Error(messages.join(", "));
    error.statusCode = 400;

    throw error;
  }
};

const create = async (exam) => {
  validateCreate(exam);

  const result = await db.query(
    "INSERT INTO exam (veterinarian_id, animal_id, description, date_of) VALUES (?, ?, ?, ?)",
    [exam.veterinarian_id, exam.animal_id, exam.description, exam.date_of]
  );

  let message = "";

  if (result.affectedRows) {
    message = "Exam created successfully";
    return { message };
  } else {
    message = "Error on CREATE exam";
    let error = new Error(message);
    error.statusCode = 500;

    throw error;
  }
};

const setUpdatedString = (exam) => {
  let string = "";
  Object.entries(exam).forEach(([key, value], index) => {
    string += `${key} = '${value}'${
      index !== Object.entries(exam).length - 1 ? ", " : " "
    }`;
  });

  return string;
};

const validateUpdate = (exam) => {
  let messages = [];

  if (Object.entries(exam).length === 0) {
    messages.push("Empty object provided");
  }

  if (exam.veterinarian_id && exam.veterinarian_id <= 0) {
    messages.push("Veterinarian (veterinarian_id) is invalid");
  }

  if (exam.animal_id && exam.animal_id <= 0) {
    messages.push("Animal (animal_id) is invalid");
  }

  if (exam.description === "") {
    messages.push("Description (description) is empty");
  }

  if (exam.date_of === "") {
    messages.push("Date (date_of) is empty");
  }

  if (messages.length) {
    let error = new Error(messages.join(", "));
    error.statusCode = 400;

    throw error;
  }
};

const update = async (id, exam) => {
  validateUpdate(exam);

  let updateString = setUpdatedString(exam);

  let sql = `UPDATE exam SET ${updateString} WHERE ID = ?`;
  const result = await db.query(sql, [id]);

  let message = "";

  let updatedExam = {};
  if (result.affectedRows) {
    message = "Exam information updated successfully";
    updatedExam = await db.query(
      "SELECT veterinarian_id, animal_id, description, date_of FROM exam WHERE ID = ?",
      [id]
    );
    return { message, updatedExam };
  } else {
    message = "Error on UPDATE exam";
    let error = new Error(message);
    error.statusCode = 500;
    throw error;
  }
};

const deleteFunc = async (id) => {
  let sql = `DELETE FROM exam WHERE id = ?`;
  const result = await db.query(sql, [id]);

  let message = "";

  if (result.affectedRows) {
    message = "Exam deleted successfully";
    return { message };
  } else {
    message = "Error on DELETE exam";
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
