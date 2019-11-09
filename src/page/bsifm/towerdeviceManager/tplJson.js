const formParams = {
  fields: {
    meternum: {
      value: '',
      require: true,
    },
    iccid: {
      value: '',
      require: true,
    },
    interval: {
      value: '',
      require: true,
    },
    metertype: {
      value: undefined,
      require: true,
    },
    moduletype: {
      value: undefined,
      require: true,
    },
    stationId: {
      value: undefined,
      require: true,
    },
    imei: {
      value: '',
      require: false,
    },
    version: {
      value: '',
      require: false,
    },
    longitude: {
      value: '',
      require: false,
    },
    latitude: {
      value: '',
      require: false,
    },
    orgid: {
      value: '',
      require: false,
    },
    meterchannel: {
      value: '',
      require: false,
    },
    fullorgid: {
      value: '',
      require: false,
    },
    siteid: {
      value: '',
      require: false,
    },
    signallevel: {
      value: '',
      require: false,
    },
  },
};
const issuedParams = {
  issuedFields: {
    servercommand: {
      value: '',
      require: true,
    },
    serverdata: {
      value: '',
      require: true,
    },
  },
};
export {formParams, issuedParams};
