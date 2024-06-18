const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const TaskModel = require('./src/models/task.model')

app.use(cors({origin: '*'}))
app.use(express.json())

// registrar
// logar
// acessar o perfil
// validar os inputs (é possível xss)

// ler todas as tarefas
app.get('/task', async (req, res) => {
    res.json(await TaskModel.find({}))
})

// ler uma tarefa especifica
app.get('/task/:taskid', async (req, res) => {
    res.json(await TaskModel.findById(req.params.taskid))
})

// criar uma tarefa
app.post('/task', async (req, res) => {
    if (req.body.taskname && req.body.deadline && req.body.description && req.body.owner) {
        const task = {
            taskname: req.body.taskname,
            deadline: req.body.deadline,
            description: req.body.description,
            owner: req.body.owner
        }
        await TaskModel.create(task)
        res.sendStatus(201)
    }
    else res.sendStatus(400)
})

// deletar uma tarefa
app.delete('/task/:taskid', async (req, res) => {
    await TaskModel.findByIdAndDelete(req.params.taskid)
    res.sendStatus(200)
})

// editar uma tarefa
app.patch('/task/:taskid', async (req, res) => {
    if (req.body.taskname) await TaskModel.findByIdAndUpdate(req.params.taskid, {taskname: req.body.taskname})
    if (req.body.deadline) await TaskModel.findByIdAndUpdate(req.params.taskid, {deadline: req.body.deadline})
    if (req.body.description) await TaskModel.findByIdAndUpdate(req.params.taskid, {description: req.body.description})
    res.sendStatus(200)
})

app.listen(port, () => {console.log('server listening on: ' + port)})
