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
    deviceSubType: {
      value: undefined,
      require: true,
    },
    roomName: {
      value: '',
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
    deviceSubType: {
      value: 234234,
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
    threshold: {
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
    // sVal: {
    //   value: '',
    // },
    // intervalTime: {
    //   value: '',
    // },
    // sLimit: {
    //   value: '',
    // },
    // sHLimit: {
    //   value: '',
    // },
    // lLimit: {
    //   value: '',
    // },
    // hLimit: {
    //   value: '',
    // },
    // sLLimit: {
    //   value: '',
    // },
    // bDelay: {
    //   value: '',
    // },
    // eDelay: {
    //   value: '',
    // },
  },
};

export {
  formParams,
  addLevelOne,
  addChildFsuDevice,
  addFsuLevelOne,
  addChildDevice,
};
