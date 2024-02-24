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
   * @param {[{
   * tableName: String,
   * fields:[{
   * name: string,
   * type: string
   * }]}]} tables
   */
  createMultiTables(tables, successCallBack, errorCallBack) {
    this.#db.transaction(
      function (tx) {
        tables.map(table => {
          let query = `CREATE TABLE IF NOT EXISTS ${table.tableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT, `;
          table.fields.map((field, i) => {
            if (typeof field.type !== 'string') {
            } else {
              query += `${field.name} ${field.type} ${
                i !== table.fields.length - 1 ? ',' : ''
              } `;
            }
          });
          query += ' )';
          tx.executeSql(query);
        });
      },
      errorCallBack,
      successCallBack,
    );
  }

  /**
   * @async
   * @param {String} tableName
   * @param {{
   * [key]: [value]
   * }} data key field name and value the field value
   * @param {*} successCallBack
   * @param {*} errorCallBack
   */
  async insertValue(tableName, data, successCallBack, errorCallBack) {
    return new Promise((resolve, reset) => {
      this.#db.transaction(
        function (tx) {
          let query = `INSERT INTO ${tableName} `;
          let tableField = '';
          let tableValue = '';
          Object.keys(data).map((key, i) => {
            tableField += `${key} ${
              i !== Object.keys(data).length - 1 ? ',' : ''
            } `;
            tableValue += `?${i + 1} ${
              i !== Object.keys(data).length - 1 ? ',' : ''
            } `;
          });
          query += `( ${tableField} ) VALUES (${tableValue})`;
          tx.executeSql(query, Object.values(data));
        },
        error => {
          reset(error);
          errorCallBack(error);
        },
        res => {
          resolve(res);
          successCallBack(res);
        },
      );
    });
  }

  /**
   * @async
   * @param {String} tableName
   * @param {Array<String>} columns
   * @param {{
   * [key]: [value]
   * }} where
   * @returns
   */
  async select(tableName, columns = [], where = {}) {
    return new Promise((resolve, reset) => {
      try {
        this.#db.transaction(tx => {
          let query = 'SELECT ';
          if (columns.length > 0) {
            columns.map((col, i) => {
              query += `${col}${i === columns.length ? ' ' : ', '}`;
            });
          } else {
            query += ' * ';
          }
          query += ` FROM ${tableName} `;
          const whereLen = Object.keys(where).length;
          if (whereLen > 0) {
            query += ' WHERE ';
            Object.keys(where).map((key, i) => {
              query += ` ${tableName + '.' + key} = ${where[key]}`;
            });
          }
          console.log(query);
          tx.executeSql(query, [], (tx, results) => {
            const len = results.rows.length;
            const response = [];
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              response.push(row);
            }
            resolve(response);
          });
        });
      } catch (error) {
        reset(error);
      }
    });
  }

  get getDataBase() {
    return this.#db;
  }
}

export default new EntityManager();
