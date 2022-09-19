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

router.delete('/deleteProject', (req, res, next) => {
  const { name } = req.query
  
  service.deleteProject(name, req.session.userid).then(projectList => {
    res.send(projectList)
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

router.delete('/deleteTodo', (req, res, next) => {
  const { todoDescription, projectName } = req.query
  
  service.deleteProjectTodo(todoDescription, projectName, req.session.userid).then(todoList => {
    res.send(todoList)
  }).catch(e => {
    res.status(400).send(e)
  })
});


router.put('/updateProjectName', (req, res, next) => {
  const { oldName, newName } = req.body
  
  service.updateProjectName(oldName, newName, req.session.userid).then(projectList => {
    res.send(projectList)
  }).catch(e => {
    res.status(400).send(e)
  })
});


module.exports = router;
