// @flow

const TargetTime = {
  schema: [{
    name: 'TargetTime',
    primaryKey: 'id',
    properties: {
      id: 'string',
      seconds: 'int',
    },
  }],
  schemaVersion: 2,
  migration: (oldR, newR) => {
    const oldObjects = oldR.objects('TargetTime');
    const newObjects = newR.objects('TargetTime');

    for (let i = 0; i < oldObjects.length; i++) {
      newObjects[i].id = 'TargetTime' + i;
    }
  },
};

export default TargetTime;
