const { response } = require("express")
const { request } = require("express")
const express = require("express")
const { listen } = require("express/lib/application")
const req = require("express/lib/request")
const res = require("express/lib/response")
const tools = require("./tools")
const app = express()
var cors = require ('cors')

//permite acceder facilmente a los datos del formato
app.use(express.json())
app.use(cors())


//punto para probar el servidor
app.get("/",(request, response) =>{
    response.send("<h1>Servidor corriendo en puerto 3001</h1>")
})

//Agregar nota

app.post("/api/notes",(request,response)=>{
    const note= request.body
    console.log(note)
    const result = tools.addNote(note.title, note.body)
    if (result){
        response.status(200).end()
    }
    else{
        response.status(204).end()
    }
})

//Obtener una nota
app.get("/api/notes/:id",(request,response)=>{
    const id = Number (request.params.id)
    const result = tools.readOneNote(id)
    if (result){
        console.log("todo bien")
        response.json(result)
    }
    else{
        console.log("Algo anda mal")
        response.status(404).end()
    }
})

//Obtener todas 
app.get("/api/notes", (request,response)=>{
    const result = tools.loadNotes()
    if(result.length>0){
        response.json(result)
    }
    else{
        response.status(204).end()
    }
}
)

//Patch
app.patch("/api/notes/:id",(request,response)=>{
    const id = Number(request.params.id)
    const body = request.body.body
    console.log(id)
    const result = tools.modifyNote(id,body)
    if (result){
        response.status(204).end()
    }
    else{
        response.status(404).end()
    }
})

//Put
app.put("/api/notes/:id",(request,response)=>{
    const id = Number(request.params.id)
    const ntitle = request.body.title
    const nbody = request.body.body
    const result = tools.PutNote(id,ntitle,nbody)
    if (result){
        response.status(204).end()
    }
    else{
        response.status(404).end()
    }
})

//Delete
app.delete("/api/notes/:id", (request,response)=>{
    const id = Number(request.params.id)
    const result = tools.removeNote(id)
    if(result){
        response.status(200).end()
    }
    else{
        response.status(204).end()
    }
})

const PORT = 3001
app.listen(PORT, () =>{
    console.log("Starting server on port 3001")
})