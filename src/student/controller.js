const pool = require("../../db");
const queries = require("./queries");
const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const addStudent = (req, res) => {
  const { name, email, age, date_of_birth } = req.body;
  // check email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists");
    }
    // add student
    pool.query(
      queries.addStudent,
      [name, email, age, date_of_birth],
      (error, results) => {
        if (error) throw error;
        res.status(201).json("Student added successfully");
      }
    );
  });
};
const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const NoStudentFound = !results.rows.length;
    if (NoStudentFound) {
      res.send("Student does not exist in the database");
    }

    pool.query(queries.removeStudentById, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student removed successfully");
    });
  });
};
const updateStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    const NoStudentFound = !results.rows.length;
    if (NoStudentFound) {
      res.send("Student could not update because is does not exist ");
    }
    pool.query(
      queries.updateStudentById,
      [name, id],

      (error, results) => {
        if (error) throw error;
        res.status(200).send("Student updated successfully");
      }
    );
  });
};
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudentById,
};
