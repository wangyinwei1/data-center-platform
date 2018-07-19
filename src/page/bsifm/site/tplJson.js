const formParams = {
  fields: {
    province: {
      value: undefined,
    },
    city: {
      value: undefined,
    },
    county: {
      value: undefined,
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
    },
    county: {
      value: undefined,
    },
    region: {
      value: undefined,
    },
  },
};
const clearCounty = {
  fields: {
    county: {
      value: undefined,
    },
    region: {
      value: undefined,
    },
  },
};
const clearRegion = {
  fields: {
    region: {
      value: undefined,
    },
  },
};
export {formParams, clearCity, clearRegion, clearCounty};
