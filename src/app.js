const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4"); 

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs} = request.body;

  const reposit = {id : uuid(), title, url, techs, likes: 0}

  repositories.push(reposit);

  return response.status(200).json(reposit);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(reposit => reposit.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json( {error: 'Repository not found'});
  }

  const reposit = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = reposit;

  return response.status(200).json(reposit);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositIndex = repositories.findIndex(reposit => reposit.id === id) ;

  if(repositIndex < 0){
    return response.status(400).json( {error: 'Reposit not found'});
  }else{
    repositories.splice(repositIndex, 1)
  }

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositIndex = repositories.findIndex(reposit => reposit.id === id) ;

  if(repositIndex < 0){
    return response.status(400).json( {error: 'Reposit not found'});
  }

  repositories[repositIndex].likes += 1;
  

  return response.status(200).json(repositories[repositIndex]);

});

module.exports = app;
