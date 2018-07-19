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
    F_DeviceType: {
      value: undefined,
      require: true,
    },
    F_Ratio: {
      value: '',
      require: true,
    },
    F_StorePeriod: {
      require: true,
      value: '',
    },
    F_StoreMode: {
      value: undefined,
    },
    F_Threshold: {
      require: true,
      value: '',
    },
    F_ShowPrecision: {
      value: '',
    },
    F_Unit: {
      value: '',
    },
    F_AlarmVoiceDelay: {
      value: '',
    },
    F_ShowOrder: {
      value: '',
    },
    F_Status: {
      value: undefined,
    },
    F_ValueDescription: {
      value: '',
    },
    F_AnalyOrder: {
      value: '',
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
