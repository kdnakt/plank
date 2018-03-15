// @flow

const TargetTime = {
  name: 'TargetTime',
  primaryKey: 'id',
  properties: {
    id: 'string',
    seconds: 'int',
  },
};

const PlankLog = {
  name: 'PlankLog',
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: {
      type: 'string',
      indexed: true,
    },
    seconds: 'int',
  }
};

const Schema = {
  schema: [
    PlankLog,
    TargetTime,
  ],
  schemaVersion: 3,
};

export {
  PlankLog,
  TargetTime,
  Schema,
};
