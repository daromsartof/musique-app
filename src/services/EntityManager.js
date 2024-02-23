import {openDatabase} from 'react-native-sqlite-storage';

class EntityManager {
  #db = null;
  constructor() {
    this.#db = openDatabase(
      {
        name: 'dataBase',
        location: 'default',
      },
      () => {
        console.log('success');
      },
      err => {
        console.log(err);
      },
    );
  }
  /**
   *
   * @param {String} tableName
   * @param {Array<{
   * name: string,
   * type: string
   * }>} fields
   * @param {Function} successCallBack
   * @param {Function} errorCallBack
   */
  createTable(tableName, fields, successCallBack, errorCallBack) {
    this.#db.transaction(
      function (tx) {
        let query = `CREATE TABLE IF NOT EXISTS ${tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT, `;
        fields.map((field, i) => {
          query += `${field.name} ${field.type} ${
            i !== fields.length - 1 ? ',' : ''
          } `;
        });
        query += ' )';
        tx.executeSql(query);
      },
      errorCallBack,
      successCallBack,
    );
  }

  /**
   *
   * @param {String} tableName
   * @param {{
   * [key]: [value]
   * }} data key field name and value the field value
   * @param {*} successCallBack
   * @param {*} errorCallBack
   */
  insertValue(tableName, data, successCallBack, errorCallBack) {
    this.#db.transaction(
      function (tx) {
        let query = `INSERT INTO ${tableName} `;
        let tableField = '';
        let tableValue = '';
        Object.keys(data).map((key, i) => {
          tableField += `${key} ${
            i !== Object.keys(data).length - 1 ? ',' : ''
          } `;
          tableValue += `?${i} ${
            i !== Object.keys(data).length - 1 ? ',' : ''
          } `;
        });
        query += `( ${tableField} ) VALUES (${tableValue})`;
        tx.executeSql(query, Object.values(data));
      },
      errorCallBack,
      successCallBack,
    );
  }

  get getDataBase() {
    return this.#db;
  }
}

export default new EntityManager();
