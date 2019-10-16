const formParams = {
  fields: {
    autoObserver: {
      value: 1,
      require: false,
    },
    deviceName: {
      value: '',
      require: true,
    },
    imsi: {
      value: '',
      require: false,
    },
    imei: {
      value: '',
      require: true,
    },
  },
};
const issuedParams = {
  issuedFields: {
    serviceName: {
      value: '',
      require: false,
    },
    propertyValue: {
      value: '',
      require: true,
    },
    serviceFlag: {
      value: undefined,
      require: true,
    },
  },
};
export {formParams, issuedParams};
