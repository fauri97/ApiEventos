require("dotenv").config();
const axios = require("axios");
const eventController = require("../controllers/eventController");
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generate = function () {
  return crypto.randomBytes(20).toString("hex");
};

const request = function (url, method, data) {
  const token = jwt.sign({ name: "Tests" }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return axios({
    url: url,
    method: method,
    headers: { Authorization: `Barear ${token}` },
    data,
  });
};

test("Should create and delete event", async function () {
  const name = generate();
  const description = generate();
  const vacancies = Math.floor(300 * Math.random() + 1);
  const response = await request("http://localhost:8081/event", "post", {
    name: name,
    description: description,
    vacancies: vacancies,
  });

  expect(201).toBe(response.status);

  eventController.deleteEvent(response.data.id);
});

test("Should create, add a user to event, delete user and event", async function () {
  const eventName = generate();
  const description = generate();
  const vacancies = Math.floor(300 * Math.random() + 1);
  const event = await eventController.saveEvent({
    name: eventName,
    description: description,
    vacancies: vacancies,
  });

  const name = generate();
  const email = generate();
  const password = generate();

  const user = await userController.saveUser({
    name: name,
    email: email,
    password: password,
  });

  const response = await request(
    "http://localhost:8081/event/registration",
    "post",
    {
      userId: user.id,
      eventId: event.id,
    }
  );

  expect(201).toBe(response.status);

  await eventController.deleteEvent(event.id);
  await userController.deleteUserByID(user.id);
});
