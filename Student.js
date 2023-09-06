class Student {
  static allStudentList = [];
  static id = 0;

  constructor(
    id,
    firstName,
    lastName,
    fullName,
    DOB,
    age,
    semesterCgpaArray,
    finalCgpa,
    semesterGrades,
    finalGrade,
    yearOfEnrollment,
    yearOfPassing,
    numbarOfYearsToGraduate
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.DOB = DOB;
    this.age = age;
    this.semesterCgpaArray = semesterCgpaArray;
    this.finalCgpa = finalCgpa;
    this.semesterGrades = semesterGrades;
    this.finalGrade = finalGrade;
    this.yearOfEnrollment = yearOfEnrollment;
    this.yearOfPassing = yearOfPassing;
    this.numbarOfYearsToGraduate = numbarOfYearsToGraduate;
  }

  static getAllStudents() {
    return Student.allStudentList;
  }

  static findStudent(id) {
    for (let index = 0; index < Student.allStudentList.length; index++) {
      if (Student.allStudentList[index].id === id) {
        let foundObject = Student.allStudentList[index];
        return [foundObject, index];
      }
    }
    return [null, -1];
  }

  static updateStudent(id, field, newValue) {
    switch (field) {
      case "FirstName":
        return Student.updateFirstName(id, newValue);
      case "LastName":
        return Student.updateLastName(id, newValue);
      case "DOB":
        return Student.updateDOB(id, newValue);
      case "CgpaArray":
        return Student.updateCgpaArray(id, newValue);
      case "YearOfEnrollment":
        return Student.updateYearOfEnrollment(id, newValue);
      case "YearOfPassing":
        return Student.updateYearOfPassing(id, newValue);
      default:
        return [null, "invalid field"];
    }
  }

  static deleteStudent(id) {
    let [objectToBeDeleted, objectToBeDeletedIndex] = Student.findStudent(id);
    if (objectToBeDeletedIndex == -1) {
      return [null, "invalid id"];
    }
    Student.allStudentList.splice(objectToBeDeletedIndex, 1);
    return [objectToBeDeleted, "deleted"];
  }

  static updateFirstName(id, newValue) {
    if (typeof newValue !== "string") {
      return [null, "invalid value"];
    }
    let [objectToBeUpdated, objectToBeUpdatedIndex] = Student.findStudent(id);
    if (objectToBeUpdatedIndex == -1) {
      return [null, "invalid id"];
    }
    objectToBeUpdated.firstName = newValue;
    objectToBeUpdated.fullName =
      objectToBeUpdated.firstName + " " + objectToBeUpdated.lastName;
    return [objectToBeUpdated, "updated"];
  }

  static updateLastName(id, newValue) {
    if (typeof newValue !== "string") {
      return [null, "invalid value"];
    }
    let [objectToBeUpdated, objectToBeUpdatedIndex] = Student.findStudent(id);
    if (objectToBeUpdatedIndex == -1) {
      return [null, "invalid id"];
    }
    objectToBeUpdated.lastName = newValue;
    objectToBeUpdated.fullName =
      objectToBeUpdated.firstName + " " + objectToBeUpdated.lastName;
    return [objectToBeUpdated, "updated"];
  }

  static updateDOB(id, newValue) {
    if (typeof newValue !== "string") {
      return [null, "invalid value"];
    }
    let dateObject = new Date(newValue);
    if (dateObject == "Invalid Date") {
      return [null, "invalid value"];
    }

    let [objectToBeUpdated, objectToBeUpdatedIndex] = Student.findStudent(id);
    if (objectToBeUpdatedIndex == -1) {
      return [null, "invalid id"];
    }
    objectToBeUpdated.DOB = newValue;
    objectToBeUpdated.age =
      new Date().getFullYear() - new Date(newValue).getFullYear();
    return [objectToBeUpdated, "updated"];
  }

  static updateCgpaArray(id, newValue) {
    if (!Array.isArray(newValue)) {
      return [null, "invalid Value"];
    }
    let [objectToBeUpdated, objectToBeUpdatedIndex] = Student.findStudent(id);
    if (objectToBeUpdatedIndex == -1) {
      return [null, "invalid id"];
    }
    objectToBeUpdated.semesterCgpaArray = newValue;
    let sum = 0;
    objectToBeUpdated.semesterCgpaArray.forEach((num) => {
      sum += num;
    });
    objectToBeUpdated.finalCgpa = Math.round(sum / 8);

    let updatedSemesterGrades = [];
    for (
      let index = 0;
      index < objectToBeUpdated.semesterCgpaArray.length;
      index++
    ) {
      updatedSemesterGrades.push(
        Student.gradeCalculator(objectToBeUpdated.semesterCgpaArray[index])
      );
    }
    objectToBeUpdated.semesterGrades = updatedSemesterGrades;

    objectToBeUpdated.finalGrade = Student.gradeCalculator(
      objectToBeUpdated.finalCgpa
    );
    return [objectToBeUpdated, "updated"];
  }

  static updateYearOfPassing(id, newValue) {
    if (typeof newValue !== "number") {
      return [null, "invalid value"];
    }
    let [objectToBeUpdated, objectToBeUpdatedIndex] = Student.findStudent(id);
    if (objectToBeUpdatedIndex == -1) {
      return [null, "invalid id"];
    }
    objectToBeUpdated.yearOfPassing = newValue;
    objectToBeUpdated.numbarOfYearsToGraduate =
      objectToBeUpdated.yearOfPassing - objectToBeUpdated.yearOfEnrollment;
    return [objectToBeUpdated, "updated"];
  }

  static updateYearOfEnrollment(id, newValue) {
    if (typeof newValue !== "number") {
      return [null, "invalid value"];
    }
    let [objectToBeUpdated, objectToBeUpdatedIndex] = Student.findStudent(id);
    if (objectToBeUpdatedIndex == -1) {
      return [null, "invalid id"];
    }
    objectToBeUpdated.yearOfEnrollment = newValue;
    objectToBeUpdated.numbarOfYearsToGraduate =
      objectToBeUpdated.yearOfPassing - objectToBeUpdated.yearOfEnrollment;
    return [objectToBeUpdated, "updated"];
  }

  static gradeCalculator(score) {
    if (score === 10) {
      return "O";
    } else if (score === 9 || score === 8) {
      return "A";
    } else if (score === 7 || score === 6) {
      return "B";
    } else if (score === 5 || score === 4) {
      return "C";
    } else {
      return "F";
    }
  }

  // Factory 
  static newStudent(
    firstName,
    lastName,
    DOB,
    semesterCgpaArray,
    yearOfEnrollment,
    yearOfPassing
  ) {
    //validation
    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof DOB !== "string" ||
      !Array.isArray(semesterCgpaArray) ||
      typeof yearOfEnrollment !== "number" ||
      typeof yearOfPassing !== "number"
    ) {
      return null;
    }

    let dateObject = new Date(DOB);
    if (dateObject == "Invalid Date") {
      return null;
    }

    // derived attributes
    let newFullName = firstName + " " + lastName;
    let newAge = new Date().getFullYear() - dateObject.getFullYear();
    let newSemesterGrades = [];
    for (let index = 0; index < semesterCgpaArray.length; index++) {
      newSemesterGrades.push(Student.gradeCalculator(semesterCgpaArray[index]));
    }
    let sum = 0;
    semesterCgpaArray.forEach((num) => {
      sum += num;
    });
    let newFinalCgpa = Math.round(sum / 8);

    let newFinalGrade = Student.gradeCalculator(newFinalCgpa);

    let newNumbarOfYearsToGraduate = yearOfPassing - yearOfEnrollment;

    let newStudent = new Student(
      Student.id++,
      firstName,
      lastName,
      newFullName,
      DOB,
      newAge,
      semesterCgpaArray,
      newFinalCgpa,
      newSemesterGrades,
      newFinalGrade,
      yearOfEnrollment,
      yearOfPassing,
      newNumbarOfYearsToGraduate
    );
    Student.allStudentList.push(newStudent);
    return newStudent;
  }
}

module.exports = Student;

/////////////////////////////////// Driver code CRUD ///////////////////////////////////

// Create
student1 = Student.newStudent(
  "caleb",
  "felix",
  "11/05/2001",
  [8, 9, 2, 5, 6, 5, 7, 10],
  2019,
  2023
);

student2 = Student.newStudent(
  "john",
  "doe",
  "11/05/2002",
  [8, 9, 8, 5, 5, 8, 7, 10],
  2017,
  2021
);

student3 = Student.newStudent(
  "del",
  "del",
  "11/05/2002",
  [8, 9, 8, 5, 5, 8, 7, 10],
  2017,
  2021
);

