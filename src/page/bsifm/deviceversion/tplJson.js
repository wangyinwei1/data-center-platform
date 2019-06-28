const formParams = {
  fields: {
    F_TypeID: {
      value: undefined,
      require: true,
    },
    F_CommunicatID: {
      value: undefined,
      require: true,
    },
    F_Name: {
      value: undefined,
      require: true,
      F_Name: '',
      F_Protocol: '',
    },
    F_TypeName: {
      value: '',
      require: true,
    },
    F_SoftVersion: {
      value: '',
    },
    F_HardVersion: {
      value: '',
    },
    F_ReportType: {
      value: 0,
      require: true,
    },
    F_ConnectType: {
      value: 0,
      require: true,
    },
  },
};
export {formParams};
