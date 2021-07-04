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
    // userType: {
    //   value: undefined,
    // },
    STATUS: {
      value: undefined,
      require: true,
    },
    EMAIL: {
      value: '',
    },
    PHONE: {
      value: '',
      require: true,
    },
    // AppID: {
    //   value: '',
    //   require: true,
    // },
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
    F_FsuTypeID: {
      value: undefined,
      require: false,
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
