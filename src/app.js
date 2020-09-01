const express = require("express");
const cors = require("cors");

const {
  v4: uuid
} = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {
    title,
    techs,
    url
  } = request.body;
  const id = uuid();
  var likes = 0;

  const repository = {
    id,
    title,
    techs,
    url,
    likes,
  };
  repositories.push(repository);

  return response.json(repository);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {
    id
  } = request.params;
  const {
    title,
    techs,
    url
  } = request.body;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex < 0) {
    return response.status(400).json("repository not found");
  }
  const {
    likes
  } = repositories[repoIndex];

  const repository = {
    id,
    title,
    techs,
    url,
    likes,
  };

  repositories[repoIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {
    id
  } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex < 0) {
    return response.status(400).json("repository not found");
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {
    id
  } = request.params;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex < 0) {
    return response.status(400).json("repository not found");
  }

  repositories[repoIndex].likes++;

  return response.status(200).json(repositories[repoIndex]);
});

module.exports = app;