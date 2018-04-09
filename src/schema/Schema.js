// @flow

const TargetTime = {
  name: 'TargetTime',
  primaryKey: 'id',
  properties: {
    id: 'string',
    seconds: 'int',
    notifHours: 'int',
    notifMinutes: 'int',
    useNotif: 'bool',
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
  schemaVersion: 5,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 4) {
      const oldObjects = oldRealm.objects(TargetTime.name);
      const newObjects = newRealm.objects(TargetTime.name);

      for (let i = 0; i < oldObjects.length; i++) {
        newObjects[i].notifHours = 0;
        newObjects[i].notifMinutes = 0;
        newObjects[i].useNotif = false;
      }
    }
  },
};

export {
  PlankLog,
  TargetTime,
  Schema,
};
