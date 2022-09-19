const express = require('express');
const service = require('../services/projects.service')
const router = express.Router();

router.get('/', (req, res, next) => {  
  const session = req.session
  service.getUserProjects(session.userid).then(projects => {
    console.log(projects)
    res.send(projects);
  }).catch(e => {
    res.status(404).send(e)
  })
  
});

router.post('/new', (req, res, next) => {
  const { name } = req.body
  
  service.createProject(name, req.session.userid).then(project => {
    res.send(project)
  }).catch(e => {
    res.status(400).send(e)
  })
});

router.put('/addTodo', (req, res, next) => {
  const { todoDescription, projectName } = req.body
  
  service.addTodo(todoDescription, projectName, req.session.userid).then(projectTodoList => {
    res.send(projectTodoList)
  }).catch(e => {
    res.status(400).send(e)
  })
});

router.put('/updateTodoStatus', (req, res, next) => {
  const { ended, todoDescription, projectName } = req.body
  
  service.updateTodoStatus(ended, todoDescription, projectName, req.session.userid).then(projectTodoList => {
    res.send(projectTodoList)
  }).catch(e => {
    res.status(400).send(e)
  })
});


module.exports = router;
