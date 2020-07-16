const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for reading and writing chat data
 */
class chatService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the chat data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Get all chat items
   */
  async getList() {
    const data = await this.getData();
    return data;
  }

  /**
   * Add a new chat item
   * @param {*} uname
   * @param {*} chatsubject
   */
  async addEntry(uname , chatsubject) {
    const data = (await this.getData()) || [];
    data.unshift({ uname, chatsubject });
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * Fetches chat data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = chatService;