const Student = require("./Student");
const express = require("express");
const Jwtauthentication = require("./jwtauthentication");
const { ValidationError, UnauthorizedError } = require("./errors");

const application = express();
application.use(express.json());

const getAllStudents = (req, res, next) => {
  try {
    let allStudents = Student.allStudentList
    res.status(200).send(allStudents);
  } catch (error) {
    
    res.status(error.httpStatusCode).send(error);
  }
};

const getStudentById = (req, res, next) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) {
      throw new ValidationError("invalid parameters");
    }
    let myStudent = Student.findStudentById(id);

    res.status(200).send(myStudent);
  } catch (error) {
    res.status(error.httpStatusCode).send(error);
  }
};

const createStudent = (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      DOB,
      semesterCgpaArray,
      yearOfEnrollment,
      yearOfPassing,
    } = req.body;
    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof DOB !== "string" ||
      !Array.isArray(semesterCgpaArray) ||
      typeof yearOfEnrollment !== "number" ||
      typeof yearOfPassing !== "number"
    ) {
      throw new ValidationError("Invalid Parameters");
    }
    let dateObject = new Date(DOB);
    if (dateObject == "Invalid Date") {
      throw new ValidationError("Invalid Parameters");
    }

    const student = Student.newStudent(
      firstName,
      lastName,
      DOB,
      semesterCgpaArray,
      yearOfEnrollment,
      yearOfPassing
    );
    res.status(200).send(student);
  } catch (error) {
    res.status(error.httpStatusCode).send(error);
    
  }
};

const updateStudent = (req, res, next) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) {
      throw new ValidationError("Internal Server Error");
    }
    let { parameter, newValue } = req.body;

    let myStudentToUpdate = undefined;
    switch (parameter) {
      case "FirstName":
        if (typeof newValue !== "string") {
          throw new ValidationError("invalid Parameters");
        }
        myStudentToUpdate = Student.updateFirstName(id, newValue);
        res.status(200).send(myStudentToUpdate);
        break;
      case "LastName":
        if (typeof newValue !== "string") {
          throw new ValidationError("invalid Parameters");
        }
        myStudentToUpdate = Student.updateLastName(id, newValue);
        res.status(200).send(myStudentToUpdate);
        break;
      case "DOB":
        if (typeof newValue !== "string") {
          throw new ValidationError("invalid Parameters");
        }
        let dateObject = new Date(newValue);
        if (dateObject == "Invalid Date") {
          throw new ValidationError("invalid Parameters");
        }
        myStudentToUpdate = Student.updateDOB(id, newValue);
        res.status(200).send(myStudentToUpdate);
        break;
      case "CgpaArray":
        if (!Array.isArray(newValue)) {
          throw new ValidationError("invalid Parameters");
        }
        myStudentToUpdate = Student.updateCgpaArray(id, newValue);
        res.status(200).send(myStudentToUpdate);
        break;
      case "YearOfEnrollment":
        if (typeof newValue !== "number") {
          throw new ValidationError("invalid Parameters");
        }
        myStudentToUpdate = Student.updateYearOfEnrollment(id, newValue);
        res.status(200).send(myStudentToUpdate);
        break;
      case "YearOfPassing":
        if (typeof newValue !== "number") {
          throw new ValidationError("invalid Parameters");
        }
        myStudentToUpdate = Student.updateYearOfPassing(id, newValue);
        res.status(200).send(myStudentToUpdate);
        break;
      default:
        throw new ValidationError("invalid input");
    }
  } catch (error) {
    res.status(error.httpStatusCode).send(error);
  }
};

const deleteStudent = (req, res, next) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id)) {
      throw new ValidationError("invalid Parameters");
    }

    let myStudentToDelete = Student.deleteStudent(id);

    res.status(200).send(myStudentToDelete);
  } catch (error) {
    res.status(error.httpStatusCode).send(error);
  }
};

const studentLogin = (req, res, next) => {
  try {
    let { username, password } = req.body;
    let myStudent = Student.findStudentByUsername(username);
    if (myStudent.password != password) {
      throw new UnauthorizedError("authentication failed");
    }
    const token = Jwtauthentication.authenticate(myStudent.id, username, true);
    console.log(token);
    res.cookie("auth", token);
    res.status(200).send(myStudent);
  } catch (error) {
    res.status(error.httpStatusCode).send(error);
  }
};

application.get("/student", getAllStudents);
application.get("/student/:id", getStudentById);
application.post("/student", createStudent);
application.put("/student/:id", updateStudent);
application.delete("/student/:id", deleteStudent);
application.post("/login", studentLogin);

application.listen(9009, () => {
  console.log("server started @ http://localhost:9009");
});
