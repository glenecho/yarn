//create a web server with rest api and swagger documentation
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(cors());
app.use(express.json());

//create a list to store data
let students = [];

/**
 * @swagger
 * /students:
 *  get:
 *    description: Use to request all students
 *    responses:
 *      '200':
 *        description: A successful response
 */
//get route to get all students
app.get("/students", (req, res) => {
  res.send(students);
});

/**
 * @swagger
 * /students:
 *  post:
 *    description: Use to add a student
 *    requestBody:
 *      description: Student to add
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              age:
 *                type: integer
 *    responses:
 *      '200':
 *        description: A successful response
 */
 //post route to add a student
app.post("/students", (req, res) => {
  const student = req.body;
  console.log(student)
  //create a uuid and add it to the student
  const studentWithId = { ...student, id: uuidv4() };
  console.log(studentWithId);
  students.push(studentWithId);
  res.send(`Student with the name ${student.firstName} added to the database`);
});

/**
 * @swagger
 * /students/{id}:
 *  get:
 *    description: Use to request a single student
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: id of the student
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Student not found
 */
 //get route to get a single student
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  //find the student with the id
  const foundStudent = students.find((student) => student.id === id);
  res.send(foundStudent);
});

/**
 * @swagger
 * /students/{id}:
 *  delete:
 *    description: Use to delete a single student
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: id of the student
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Student not found
 */
 //delete route to delete a single student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  //filter out the student with the id
  students = students.filter((student) => student.id !== id);
  res.send(`Student with the id ${id} deleted from the database`);
});

/**
 * @swagger
 * /students/{id}:
 *  patch:
 *    description: Use to update a single student
 */
//patch route to update a single student
app.patch("/students/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  //find the student with the id
  const student = students.find((student) => student.id === id);
  //update the student with the new data
  if (firstName) student.firstName = firstName;
  if (lastName) student.lastName = lastName;
  if (age) student.age = age;
  res.send(`Student with the id ${id} updated in the database`);
});

//swagger documentation options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Students API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./swagger.mjs"],
};

//swagger documentation
const specs = swaggerJsdoc(options);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

//listen to the server
app.listen(5000, () => console.log("server running on port 5000"));

