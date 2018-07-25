const formParams = {
  fields: {
    province: {
      value: undefined,
      require: true,
    },
    city: {
      value: undefined,
      require: true,
    },
    county: {
      value: undefined,
      require: true,
    },
    region: {
      value: undefined,
      require: true,
    },
    F_Name: {
      value: '',
      require: true,
    },
    F_Leader: {
      value: '',
    },
    F_Tel: {
      value: '',
    },
    F_Address: {
      value: '',
    },
    F_AreaName: {
      value: '',
    },
  },
};
const clearCity = {
  fields: {
    city: {
      value: undefined,
      require: true,
    },
    county: {
      value: undefined,
      require: true,
    },
    region: {
      value: undefined,
      require: true,
    },
  },
};
const clearCounty = {
  fields: {
    county: {
      value: undefined,
      require: true,
    },
    region: {
      value: undefined,
      require: true,
    },
  },
};
const clearRegion = {
  fields: {
    region: {
      value: undefined,
      require: true,
    },
  },
};
export {formParams, clearCity, clearRegion, clearCounty};
