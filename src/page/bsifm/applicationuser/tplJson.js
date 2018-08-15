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
      require: true,
    },
    countyCode: {
      value: undefined,
      require: true,
    },
    countyCode: {
      value: undefined,
      require: true,
    },
    districtCode: {
      value: undefined,
      require: true,
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
      require: true,
    },
    countyCode: {
      value: undefined,
      require: true,
    },
    districtCode: {
      value: undefined,
      require: true,
    },
  },
};
const clearCounty = {
  fields: {
    countyCode: {
      value: undefined,
      require: true,
    },
    districtCode: {
      value: undefined,
      require: true,
    },
  },
};
export {formParams, clearCity, clearCounty};
