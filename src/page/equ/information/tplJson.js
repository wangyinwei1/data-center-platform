const formParams = {
  fields: {
    F_DeviceName: {
      value: '',
      require: true,
    },
    F_IsConcentrator: {
      value: 0,
      require: true,
    },
    F_BelongUnitID: {
      value: undefined,
      require: true,
    },
    Id_Version: {
      value: undefined,
      require: true,
    },
    F_ReportType: {
      value: 0,
      require: true,
    },
    F_ConnectType: {
      value: 0,
      require: true,
    },
    F_IP: {
      value: '',
      require: true,
    },
    F_Port: {
      value: '',
      require: true,
    },
    F_OutDevID: {
      value: '',
    },
    rec: {
      value: '',
    },
    F_Latitude: {
      value: '',
    },
    F_Longitude: {
      value: '',
    },
    F_CollectSpan: {
      value: 0,
    },
    F_HeartSpan: {
      value: 0,
    },
    F_SimCardNO: {
      value: '',
    },
    F_NetInTime: {
      value: '',
      require: true,
    },
  },
};
const clearFormParams = {
  fields: {
    F_DeviceName: {
      value: '',
      require: true,
    },
    F_IsConcentrator: {
      value: '0',
      require: true,
    },
    F_BelongUnitID: {
      value: undefined,
      require: true,
    },
    Id_Version: {
      value: undefined,
      require: true,
    },
    F_ReportType: {
      value: '0',
      require: true,
    },
    F_ConnectType: {
      value: '0',
      require: true,
    },
    F_IP: {
      value: '',
      require: true,
    },
    F_Port: {
      value: '',
      require: true,
    },
    F_OutDevID: {
      value: '',
    },
    rec: {
      value: '',
    },
    F_Latitude: {
      value: '',
    },
    F_Longitude: {
      value: '',
    },
    F_CollectSpan: {
      value: 0,
    },
    F_HeartSpan: {
      value: 0,
    },
    F_SimCardNO: {
      value: '',
    },
    F_NetInTime: {
      value: '',
      require: true,
    },
  },
};
const addLevelOne = {
  oneFields: {
    F_Port: {
      value: '',
      require: true,
    },
    F_PortName: {value: ''},
    F_Rec: {value: ''},
  },
};
const addChildDevice = {
  childDevicefields: {
    F_Adr: {
      value: '',
      require: true,
    },
    F_SubDeviceName: {
      value: '',
      require: true,
    },
    Id_Version: {
      value: undefined,
      require: true,
    },
    F_IdentyNO: {value: ''},
    F_SubDeviceID: {value: ''},
    F_Rec: {value: ''},
    cl_typeName: {value: ''},
  },
};
export {formParams, clearFormParams, addLevelOne, addChildDevice};
