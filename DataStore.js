'use strict';

const Store = require('electron-store');

class DataStore extends Store {
  constructor (settings) {
    super(settings);

    // initialize with entries or empty array
    this.entries = this.get('entries') || [];
  }

  saveEntries () {
    // save entries to JSON file
    this.set('entries', this.entries);

    // returning 'this' allows method chaining
    return this;
  }

  getEntries () {
    // set object's entries to entries in JSON file
    this.entries = this.get('entries') || [];

    return this;
  }

  getRandomEntry () {
    // gets random entry
    return (this.get('entries') || [])[Math.floor(Math.random() * this.entries.length)];
  }

  addEntry (entry) {
    // merge the existing entries with the new entry
    this.entries = [ ...this.entries, entry ];

    return this.saveEntries();
  }

  deleteEntry (entry) {
    // filter out the target entry
    //this.entries = this.entries.filter(t => t !== entry.question)
    this.entries.splice(entry, 1);

    return this.saveEntries();
  }
}

module.exports = DataStore;