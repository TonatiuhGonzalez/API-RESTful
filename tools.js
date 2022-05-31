const { notEqual } = require('assert')
const fs = require('fs')
const { title } = require('process')

const addNote = function(title, body){
    console.log("El título de la nota ", title)
    console.log("El cuerpo de la nota ", body)
    const notes = loadNotes()
    const maxID = notes.length > 0 ? Math.max(...notes.map(n=>n.id)):0
    console.log("ID: " + maxID)
    const duplicateNote = notes.find((note)=> note.title === title)
    if(!duplicateNote){
        id = maxID+1
        notes.push(
            {
                id: id,
                title: title,
                body: body
            }
        )
        saveNotes(notes)
        console.log("notas creadas")
        return true
    }
    else{
        console.log("error al crear nota")
        return false
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJSON)
}

const listNotes = function(){
    const notes1 = loadNotes()
    notes1.forEach((notes1)=>{
        console.log(notes1.title)
        console.log(notes1.body)
    })
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return[]
    }
}

const removeNote = function(id){
    const notes=loadNotes()
    const notesToKeep = notes.filter((notes) => notes.id != id)
    if(notes.length>notesToKeep.length){
        saveNotes(notesToKeep)
        return true
    }
    else{
        console.log("Nota no encontrada")
        return false
    }
}

const readOneNote = function(id){
    const notes = loadNotes()
    console.log(notes)
    const note = notes.find((note)=>note.id === id)
    if(note){
        console.log("nota encontrada")
        console.log(note.id,note.title,note.body)
        return note
    }
    else{
        console.log('Nota no encontrada')
        return false
    }
}

const modifyNote = function(id,body){
    const notes = loadNotes()
    const body1 = body
    const note2Modify = notes.find((notes)=>notes.id===id)
    note2Modify.body = body1
    const title = note2Modify.title
    const found_id = note2Modify.id
    if(notes){
        const removeNote = notes.filter((notes)=>notes.id != id)
        saveNotes(removeNote)
        removeNote.push(
            {
                id:found_id,
                title:title,
                body:body1
            }
        )
        saveNotes(removeNote)
    }
    else{
        console.log('Nota no encontrada')
    }
}

const PutNote = function(id,ntitle,nbody){
    const note = readOneNote(id)
    const aux_id = note.id
    removeNote(id)
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>note.id===aux_id)
    if(!duplicateNote){
        notes.push(
            {
                id: aux_id,
                title: ntitle,
                body: nbody
            }
        )
        saveNotes(notes)
        console.log("Nota modificada")
        return true
    }
    else{
        return false
    }
}

module.exports = {
    addNote:addNote, 
    loadNotes:loadNotes,
    listNotes:listNotes,
    removeNote:removeNote,
    readOneNote:readOneNote,
    modifyNote:modifyNote,
    PutNote:PutNote
}