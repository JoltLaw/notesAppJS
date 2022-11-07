// "use strict";

const { default: chalk } = require("chalk");
// const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.bgGreen("New note added!"));
  } else {
    console.log(chalk.bgRed("Note title taken!"));
  }
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.bgGreen(`Note removed!`));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.bgRed(`No note removed!`));
  }
};

const listNotes = () => {
  let notes = loadNotes();
  console.log(chalk.bgGreen("Your notes:"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.bgRed("No note found"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNotes,
};
