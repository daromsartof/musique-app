const colors = {
  PRIMARY: '#0A071E',
  ACTIVE: '#6156E2',
  SECONDARY: '#0A091E',
};

const QUERY = {
  create_table_favorite: `CREATE TABLE favorite (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    music_id INTEGER,
    created_at TEXT
  );  
  `,
};
export {colors, QUERY};
