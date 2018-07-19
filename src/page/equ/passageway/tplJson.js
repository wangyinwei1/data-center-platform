const formParams = {
  fields: {
    F_ChannelID: {
      value: '',
      require: true,
    },
    F_ChannelName: {
      value: '',
      require: true,
    },
    F_ValueType: {
      value: undefined,
      require: true,
    },
    F_ChannelType: {
      value: undefined,
      require: true,
    },
    ratio: {
      value: '',
    },
    F_StorePeriod: {
      value: 365,
    },
    F_StoreMode: {
      value: 0,
    },
    F_Threshold: {
      require: true,
      value: 0,
    },
    F_ShowPrecision: {
      value: 0,
    },
    F_Unit: {
      value: '',
    },
    F_AlarmVoiceDelay: {
      value: '',
    },
    F_ShowOrder: {
      value: 1,
    },
    F_Status: {
      value: 0,
    },
    F_ValueDescription: {
      value: '',
    },
    F_AnalyOrder: {
      value: 1,
    },
    F_RelateChannelNO: {
      value: '',
    },
    F_AlarmConID: {
      value: '',
    },
    F_DisplayFormat: {
      value: '',
    },
  },
};
const alarmFormParams = {
  alarmFields: {
    conType: {
      value: undefined,
    },

    condition: {
      value: '',
    },
    msgID: {
      value: undefined,
    },
  },
};
export {formParams, alarmFormParams};
