const FAVORITE = {
  tableName: 'favorite',
  fields: [
    {
      name: 'music_id',
      type: 'INTEGER',
    },
    {
      name: 'created_at',
      type: 'TEXT',
    },
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

export default FAVORITE;
