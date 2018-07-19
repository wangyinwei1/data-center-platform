const formParams = {
  fields: {
    USERNAME: {
      value: '',
      require: true,
    },
    NAME: {
      value: '',
      require: true,
    },
    userType: {
      value: undefined,
    },
    STATUS: {
      value: undefined,
    },
    EMAIL: {
      value: '',
    },
    PHONE: {
      value: '',
      require: true,
    },
    AppID: {
      value: '',
    },
    proCode: {
      value: undefined,
      require: true,
    },
    cityCode: {
      value: undefined,
    },
    countyCode: {
      value: undefined,
    },
    DevTypes: {
      value: [],
    },
    Devices: {
      value: '',
    },
  },
};
const clearCity = {
  fields: {
    cityCode: {
      value: undefined,
    },
    countyCode: {
      value: undefined,
    },
  },
};
const clearCounty = {
  fields: {
    countyCode: {
      value: undefined,
    },
  },
};
export {formParams, clearCity, clearCounty};
