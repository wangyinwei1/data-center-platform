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

const addLevelOne = {
  oneFields: {
    F_DeviceID: {
      value: '',
      require: true,
    },
    F_DeviceName: {
      value: '',
      require: true,
    },
  },
};
const addChildDevice = {
  childDevicefields: {
    F_SpUnit: {
      value: '',
    },
    F_Type: {
      value: undefined,
      require: true,
    },
    F_OptionID: {
      require: true,
      value: undefined,
    },
    F_SpName: {
      value: '',
      require: true,
    },
    F_SpID: {
      value: '',
      require: true,
    },
  },
};
export {formParams, addLevelOne, addChildDevice};
