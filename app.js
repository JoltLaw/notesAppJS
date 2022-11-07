"use strict";

// const add = require("./util.js");

// const sum = add(4, -2);

// console.log(sum);

const chalk = require("chalk");
const { argv } = require("yargs");
const yargs = require("yargs");
const notes = require("./notes");
const Note = require("./notes");

// Customize Yargs
yargs.version("1.1.0");

// create add command

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    Note.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler() {
    Note.removeNote(argv.title);
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read notes",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    Note.readNotes(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "Lists out all notes",
  builder: {},
  handler() {
    Note.listNotes();
  },
});

// Add, remove, read, list

yargs.parse();
