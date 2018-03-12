// @flow

const PlankLog = {
  schema: [{
    name: 'PlankLog',
    primaryKey: 'id',
    properties: {
      id: 'string',
      date: {
        type: 'string',
        indexed: true,
      },
      seconds: 'int',
    }
  }],
  schemaVersion: 0,
};

export default PlankLog;
