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
    site: {
      value: undefined,
      require: true,
    },
    F_RoomName: {
      value: "",
      require: true,
    },
    F_RNO: {
      value: "",
      require: false,
    },
    F_RName: {
      value: "",
      require: false,
    },
    F_Property: {
      value: "",
      require: false,
    },
    F_Rec: {
      value: "",
      require: false,
    },
  },
}
const clearCity = {
  fields: {
    site: {
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
  },
}
const clearCounty = {
  fields: {
    site: {
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
}
const clearRegion = {
  fields: {
    region: {
      value: undefined,
      require: true,
    },
    site: {
      value: undefined,
      require: true,
    },
  },
}
const clearSite = {
  fields: {
    site: {
      value: undefined,
      require: true,
    },
  },
}
export { formParams, clearCity, clearSite, clearRegion, clearCounty }
