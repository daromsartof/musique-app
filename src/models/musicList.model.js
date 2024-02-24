const MUSIC_LIST = {
  tableName: 'musci_list',
  fields: [
    {
      name: 'path',
      type: 'TEXT',
    },
    {
      name: 'title',
      type: 'TEXT',
    },
    {
      name: 'artist',
      type: 'TEXT',
    },
    {
      name: 'created_at',
      type: 'TEXT',
    },
    {
      name: 'album',
      type: 'TEXT',
    },
    {
      name: 'duration',
      type: 'NUMERIC',
    },
    {
      name: 'fileName',
      type: 'TEXT',
    },
    {
      name: 'is_deleted',
      type: 'INTEGER',
    },
  ],
};

export default MUSIC_LIST;

/*
 CREATE TABLE favorie (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	music_id INTEGER,
	CONSTRAINT FAVORIE_PK PRIMARY KEY (id),
	CONSTRAINT favorie_FK FOREIGN KEY (music_id) REFERENCES Music(Column1)
);
 */
