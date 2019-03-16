const formParams = {
  fields: {
    F_Name: {
      value: '',
      require: true,
    },
    F_SuID: {
      value: '',
      require: true,
    },
    F_SuIP: {
      value: '',
      require: true,
    },
    F_SuPort: {
      value: '',
      require: true,
    },
    F_UserName: {
      value: '',
      require: true,
    },
    F_TypeID: {
      value: undefined,
      require: true,
    },
    F_Pwd: {
      value: '',
      require: true,
    },
    F_SuVendor: {
      value: '',
    },
    F_SuModel: {
      value: '',
    },
    F_SuHardVer: {
      value: '',
    },
    F_SuSoftVer: {
      value: '',
    },
    F_StationID: {
      require: true,
      value: undefined,
    },
  },
};

const addFsuLevelOne = {
  oneFields: {
    F_DeviceID: {
      value: '',
      require: true,
    },
    deviceName: {
      value: '',
      require: true,
    },
    Id_Version: {
      value: undefined,
      require: true,
    },
    roomName: {
      value: '',
    },
    deviceSubType: {
      value: 0,
    },
    model: {
      value: '',
    },
    brand: {
      value: '',
    },
    ratedCapacity: {
      value: '',
    },
    devDescribe: {
      value: '',
    },
  },
};
const addLevelOne = {
  oneFields: {
    F_DeviceID: {
      value: '',
      require: true,
    },
    deviceName: {
      value: '',
      require: true,
    },
    Id_Version: {
      value: undefined,
      require: true,
    },
  },
};
const addChildFsuDevice = {
  childDevicefields: {
    spUnit: {
      value: '',
    },
    nmAlarmID: {
      value: '',
    },
    describe: {
      value: '',
    },
    relativeVal: {
      value: '',
    },
    absoluteVal: {
      value: '',
    },
    threshold: {
      value: '',
    },
    alarmLevel: {
      value: '',
    },
    spType: {
      value: undefined,
      require: true,
    },
    F_OptionID: {
      require: true,
      value: undefined,
    },
    spName: {
      value: '',
      require: true,
    },
    F_SpID: {
      value: '',
      require: true,
    },
  },
};
const addChildDevice = {
  childDevicefields: {
    spUnit: {
      value: '',
    },
    spType: {
      value: undefined,
      require: true,
    },
    F_OptionID: {
      require: true,
      value: undefined,
    },
    spName: {
      value: '',
    },
    F_SpID: {
      value: '',
      require: true,
    },
  },
};
export {
  formParams,
  addLevelOne,
  addChildFsuDevice,
  addFsuLevelOne,
  addChildDevice,
};
