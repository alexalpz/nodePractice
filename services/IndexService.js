const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class indexService {
  /**
   * Constructor
   * @param {*} datafile 
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * 
   */
  async getList() {
    const data = await this.getData();
    return data;
  }

  /**
   * 
   * @param {*} indextext 
   */
  async addEntry(indextext) {
    const data = (await this.getData()) || [];
    data.unshift({ indextext });
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * 
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = indexService;