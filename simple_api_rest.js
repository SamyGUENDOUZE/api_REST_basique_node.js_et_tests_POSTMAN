const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
  { "id": 1, "description": "Apprendre cypress" },
  { "id": 2, "description": "Apprendre le SQL" }
];

function getAllTasks(req, res) {
  const taskReferences = tasks.map(task => `/task/${task.id}`);  //le map permet de parcourir une liste et de faire une action précise sur chaque élément de la liste
  res.json(taskReferences);
}

function getTaskById(req, res) {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Tâche non trouvée' });
  }
}

function createTask(req, res) {
  const newTask = {
    id: tasks.length + 1,
    description: req.body.description,
  };
  tasks.push(newTask);
  res.status(201).json({ message: 'Tâche ajoutée avec succès', task: newTask });
}

function updateTask(req, res) {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    task.description = req.body.description;
    res.json({ message: 'Tâche mise à jour avec succès', task });
  } else {
    res.status(404).json({ erreur: 'Tâche non trouvée' });
  }
}

function deleteTask(req, res) {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: "Tâche supprimée avec succès" });
}

app.get('/tasks', getAllTasks);
app.get('/task/:id', getTaskById);
app.post('/tasks', createTask);
app.put('/task/:id', updateTask);
app.delete('/task/:id', deleteTask);


// Bout de code qui sert à lancer notre serveur en local
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
