import request from '../utils/request';
const base = '/collect';

export function getMenu() {
  return request.get(base + '/main/index');
}
export function login(data) {
  return request.post(base + '/login_login', data);
}

export function logout() {
  return request.post(base + '/logout');
}
export function getAsynArea() {
  return request.get(
    base + '/device_area/getAsynArea.do?sing=area&ztreeChild=0',
  );
}

export function getZone(params) {
  return request.get(base + '/device_dev/getAsynArea.do', {params});
}

export function getTable(params) {
  return request.get(base + '/device_area/list.do', {params});
}
export function regional_delete(data) {
  return request.post(base + '/device_area/delete.do', data);
}
export function getEidtData(params) {
  return request.get(base + '/device_area/initEdit.do', {params});
}
export function searchArea(params) {
  return request.get(base + '/device_area/areaSearch.do', {params});
}
export function addArea(data) {
  return request.post(base + '/device_area/getAddArea.do', data);
}
export function save(data) {
  return request.post(base + '/device_area/save.do', data);
}
export function regionalEdit(data) {
  return request.post(base + '/device_area/edit.do', data);
}
//site
export function getSiteTable(params) {
  return request.get(base + '/device_devbelongunit/list.do', {params});
}
export function site_delete(data) {
  return request.post(base + '/device_devbelongunit/delete.do', data);
}
export function site_search(params) {
  return request.get(base + '/device_devbelongunit/list.do', {params});
}
export function siteInitAdd(params) {
  return request.get(base + '/device_devbelongunit/initAdd.do', {params});
}
export function siteInitEdit(params) {
  return request.get(base + '/device_devbelongunit/initEdit.do', {params});
}
export function getAreaSonList(params) {
  return request.get(base + '/device_area/getAreaSonList.do', {params});
}
export function siteSave(data) {
  return request.post(base + '/device_devbelongunit/save.do', data);
}
export function siteEdit(data) {
  return request.post(base + '/device_devbelongunit/edit.do', data);
}
//deviceversion
export function getDeviceversionTable(params) {
  return request.get(base + '/device_devtype/subclassList.do', {params});
}
export function deviceversion_delete(data) {
  return request.post(base + '/device_devtype/delete.do', data);
}
export function deviceversion_search(params) {
  return request.get(base + '/device_devtype/subclassList.do', {params});
}
export function deviceversionInitAdd(params) {
  return request.get(base + '/device_devtype/initAdd.do', {params});
}
export function deviceversionSave(data) {
  return request.post(base + '/device_devtype/save.do', data);
}
export function deviceversionInitEdit(params) {
  return request.get(base + '/device_devtype/initEdit.do', {params});
}
export function deviceversionEditSave(data) {
  return request.post(base + '/device_devtype/edit.do', data);
}
export function savegenera(data) {
  return request.post(base + '/device_devtype/savegenera.do', data);
}
//devicetype
export function getDevicetypeTable(params) {
  return request.get(base + '/device_devtype/generaList.do', {params});
}
export function devicetype_delete(data) {
  return request.post(base + '/device_devtype/deletegenera.do', data);
}
export function devicetype_search(params) {
  return request.get(base + '/device_devtype/generaList.do', {params});
}
export function editgenera(data) {
  return request.post(base + '/device_devtype/editgenera.do', data);
}
//agreement
export function getAgreementTable(params) {
  return request.get(base + '/device_protocol/list.do', {params});
}
export function agreement_delete(data) {
  return request.post(base + '/device_protocol/delete', data);
}
export function agreement_search(params) {
  return request.get(base + '/device_devtype/generaList.do', {params});
}
export function agreementSave(data) {
  return request.post(base + '/device_protocol/save.do', data);
}
export function agreementEditSave(data) {
  return request.post(base + '/device_protocol/edit.do', data);
}
//alarminformation
export function getAlarminformationTable(params) {
  return request.get(base + '/device_alarmF_MsgID/list.do', {params});
}
export function alarminformation_delete(data) {
  return request.post(base + '/device_alarmF_MsgID/delete.do', data);
}
export function alarminformation_search(params) {
  return request.get(base + '/device_alarmF_MsgID/list.do', {params});
}
export function alarminformationInitAdd(params) {
  return request.get(base + '/device_alarmF_MsgID/initAdd.do', {params});
}
export function alarminformationInitEdit(params) {
  return request.get(base + '/device_alarmF_MsgID/initEdit.do', {params});
}
export function alarminformationSave(data) {
  return request.post(base + '/device_alarmF_MsgID/save.do', data);
}
export function alarminformationEditSave(data) {
  return request.post(base + '/device_alarmF_MsgID/edit.do', data);
}
//fsu_alarminformation
export function getFsuAlarminformationTable(params) {
  return request.get(base + '/fsuAlarmInfo/alarmInfoList', {params});
}
export function fsu_alarminformation_delete(data) {
  return request.post(base + '/fsuAlarmInfo/delete', data);
}
export function fsuAlarminformation_search(params) {
  return request.get(base + '/fsuAlarmInfo/alarmInfoList', {params});
}
export function getFsuAlarmInfo(params) {
  return request.get(base + '/fsuAlarmInfo/alarmInfo', {params});
}
export function fsuAlarminformationSave(data) {
  return request.post(base + '/fsuAlarmInfo/save', data);
}
export function fsuAlarminformationUpdate(data) {
  return request.post(base + '/fsuAlarmInfo/update', data);
}
//applicationuser
export function getApplicationuserTable(params) {
  return request.get(base + '/user/listUsers.do', {params});
}
export function applicationuser_delete(data) {
  return request.post(base + '/user/delete.do', data);
}
export function applicationuser_search(params) {
  return request.get(base + '/user/listUsers.do', {params});
}
export function applicationuserInitAdd(params) {
  return request.get(base + '/user/initAdd.do', {params});
}
export function getApplicationuserArea(params) {
  return request.get(base + '/user/getArea.do', {params});
}
export function applicationuserSave(data) {
  return request.post(base + '/user/save.do', data);
}
export function applicationuserEditSave(data) {
  return request.post(base + '/user/edit.do', data);
}
export function applicationuserInitEdit(params) {
  return request.get(base + '/user/initEdit.do', {params});
}

//vchannel
export function getVchannelTable(params) {
  return request.get(base + '/device_vchannel/list.do', {
    params,
  });
}
export function vchannel_delete(data) {
  return request.post(base + '/device_vchannel/delete.do', data);
}
export function vchannel_search(params) {
  return request.get(base + '/device_vchannel/list.do', {
    params,
  });
}
export function getAsynArea_vchannel(params) {
  return request.get('collect/device_basechannel/listbasechannel.do', {params});
}
export function getVchannelAdd(params) {
  return request.get(base + '/device_dev/goAdd.do', {params});
}
export function queryChannelList(params) {
  return request.get(base + '/device_basechannel/queryChannelList.do', {
    params,
  });
}
export function vchannelSave(data) {
  return request.post(base + '/device_vchannel/save.do', data);
}
export function vchannelEditSave(data) {
  return request.post(base + '/device_vchannel/edit.do', data);
}

export function getZone_vchannel(params) {
  return request.get(base + '/device_basechannel/listbasechannel.do', {
    params,
  });
}
//information
export function getInformationTable(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function information_delete(data) {
  //F_DeviceID
  return request.post(base + '/device_dev/delete.do', data);
}
export function information_search(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function getRealtimeTable(params) {
  return request.get(base + '/device_realdata/FindDeviceData.do', {params});
}
export function getRealTimeCall(params) {
  return request.get(base + '/device_realdata/RealTimeCall.do', {params});
}
export function getSportTable(params) {
  return request.get(base + '/device_dev/list_sport.do', {params});
}
export function getGrandsonTable(params) {
  return request.get(base + '/device_dev/list_sun.do', {params});
}
export function getByDevice(params) {
  return request.get(base + '/device_channel/ByDevice_Id', {params});
}
export function findDeviceData(params) {
  return request.get(base + '/device_hisdata/FindDeviceData.do', {params});
}
export function findDeviceDataList(params) {
  return request.get(base + '/device_hisdata/FindDeviceDataList', {params});
}
export function getControlChannel(params) {
  return request.get(base + '/device_dev/getControlChannel.do', {params});
}
export function getOperateList(params) {
  return request.get(base + '/device_dev/getOperateList.do', {params});
}
export function postDeviceControl(params) {
  return request.get(base + '/device_dev/DeviceControl.do', {params});
}
export function getRegulatChannel(params) {
  return request.get(base + '/device_dev/getRegulatChannel.do', {params});
}
export function getGoAdd(params) {
  return request.get(base + '/device_dev/goAdd.do', {params});
}

export function goFind2(params) {
  return request.get(base + '/device_dev/goFind2.do', {params});
}
export function informationSave(data) {
  return request.post(base + '/device_dev/save2.do', data);
}
export function informationEditSave(data) {
  return request.post(base + '/device_dev/edit2.do', data);
}
export function saveConsport(data) {
  return request.post(base + '/device_dev/save_consport.do', data);
}
export function editConsport(data) {
  return request.post(base + '/device_dev/edit_consport.do', data);
}
export function delectConsport(data) {
  return request.post(base + '/device_dev/delect_consport.do', data);
}

export function saveSun(data) {
  return request.post(base + '/device_dev/save_sun.do', data);
}
export function editSun(data) {
  return request.post(base + '/device_dev/edit_sun.do', data);
}
export function delectSun(data) {
  return request.post(base + '/device_dev/delect_sun.do', data);
}
export function onoroff(data) {
  return request.post(base + '/device_dev/onoroff.do', data);
}
export function initAdd(params) {
  return request.get(base + '/device_channel/initAdd.do', {params});
}
export function batchDelectAll(data) {
  return request.post(base + '/device_dev/delectAll.do', data);
}
export function batchOnoroff(data) {
  return request.post(base + '/device_dev/onoroff.do', data);
}
//passageway
export function getPassagewayTable(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function getPassagewayChildTable(params) {
  return request.get(base + '/device_channel/list2.do', {params});
}
export function allDeciceList(params) {
  return request.get(base + '/device_dev/allDeciceList', {params});
}
export function findCongenerDeviceList(params) {
  return request.get(base + '/device_dev/findCongenerDeviceList', {params});
}
export function passagewayChild_search(params) {
  return request.get(base + '/device_channel/list2.do', {params});
}
export function passageway_search(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function passageway_save(data) {
  return request.post(base + '/device_channel/save2.do', data);
}
export function passageway_virtualList(data) {
  return request.post(base + '/device_vchannel/find.do', data);
}
export function passageway_delete(data) {
  return request.post(base + '/device_channel/delete2.do', data);
}
export function passageway_edit(data) {
  return request.post(base + '/device_channel/edit2.do', data);
}
export function alarmConditionDel(data) {
  return request.post(
    base + '/device_devalearminfo/AlarmConditionDel.do',
    data,
  );
}
export function copyAlarmCondition(data) {
  return request.post(base + '/device_channel/copyAlarmCondition', data);
}
export function copyAlarmCondition2(data) {
  return request.post(base + '/device_channel/copyAlarmCondition2', data);
}
export function alarmConditionUpd(data) {
  return request.post(
    base + '/device_devalearminfo/AlarmConditionUpd.do',
    data,
  );
}
export function vchannel_edit(data) {
  return request.post(base + '/device_vchannel/edit.do', data);
}
export function alarmConditionAdd(data) {
  return request.post(
    base + '/device_devalearminfo/AlarmConditionAdd.do',
    data,
  );
}
export function passageway_initEdit(params) {
  return request.get(base + '/device_channel/initEdit.do', {params});
}
export function passageway_export(params) {
  return request.get(base + '/device_channel/toExcel.do', {params});
}
export function passageway_getDev(params) {
  return request.get(base + '/device_dev/getDevListByDeviceType.do', {params});
}
export function findDeviceChannel(params) {
  return request.get(base + '/device_channel/findDeviceChannel', {params});
}
export function passageway_getVirtual(params) {
  return request.get(
    base + '/device_vchannel/getVirtualChannelByChannleIDAndDeviceType.do',
    {params},
  );
}
export function getAlarmTable(params) {
  return request.get(base + '/device_devalearminfo/AlarmConditions.do', {
    params,
  });
}
export function getInitAlarmConditionsAdd(params) {
  return request.get(base + '/device_basechannel/initAlarmConditionsAdd.do', {
    params,
  });
}
//basicchannel
export function getBasicchannelTable(params) {
  return request.get(base + '/device_basechannel/list.do', {params});
}
export function basicchannel_initEdit(params) {
  return request.get(base + '/device_basechannel/initEdit.do', {params});
}
export function basicchannel_initAdd(params) {
  return request.get(base + '/device_basechannel/initAdd.do', {params});
}
export function getBaseAlarmConditions(params) {
  return request.get(base + '/device_basechannel/getBaseAlarmConditions.do', {
    params,
  });
}
export function getVirtualChannelList(params) {
  return request.get(base + '/device_basechannel/getVirtualChannelList.do', {
    params,
  });
}
export function getInitBasechannelAlarm(params) {
  return request.get(base + '/device_basechannel/initAlarmConditionsAdd.do', {
    params,
  });
}
export function basicchannel_toExcel(params) {
  return request.get(base + '/device_basechannel/toExcel.do', {
    params,
  });
}
export function base_findDeviceChannel(params) {
  return request.get(base + '/device_basechannel/findDeviceChannel', {
    params,
  });
}
export function getValuePropertyList(params) {
  return request.get(base + '/device_basechannel/getValuePropertyList.do', {
    params,
  });
}
export function basechannelSave(data) {
  return request.post(base + '/device_basechannel/save.do', data);
}
export function base_copyAlarmCondition(data) {
  return request.post(
    base + '/device_basechannel/copyBaseAlarmCondition',
    data,
  );
}
export function basechannelAlarmAdd(data) {
  return request.post(
    base + '/device_basechannel/baseAlarmConditionAdd.do',
    data,
  );
}
export function batchValueMeanAdd(data) {
  return request.post(base + '/device_basechannel/batchValueMeanAdd', data);
}
export function basechannelAlarmUpd(data) {
  return request.post(
    base + '/device_basechannel/baseAlarmConditionUpd.do',
    data,
  );
}
export function basechannelAlarmDel(data) {
  return request.post(
    base + '/device_basechannel/baseAlarmConditionDel.do',
    data,
  );
}
export function batchDeviceAlarmConditionAdd(data) {
  return request.post(
    base + '/device_channel/BatchDeviceAlarmConditionAdd',
    data,
  );
}
export function basechannelEdit(data) {
  return request.post(base + '/device_basechannel/edit.do', data);
}
export function basechannelDelete(data) {
  return request.post(base + '/device_basechannel/delete.do', data);
}

export function batchBaseAlarmConditionAdd(data) {
  return request.post(
    base + '/device_basechannel/batchBaseAlarmConditionAdd',
    data,
  );
}
//realtimealarme
export function getRealtimealarmTable(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function getRealtimealarmChildTable(params) {
  return request.get(base + '/device_runalarm/list2.do', {params});
}

export function realtimealarmChild_search(params) {
  return request.get(base + '/device_runalarm/list2.do', {params});
}
export function realtimealarm_search(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function confirmAlarm(params) {
  return request.get(base + '/device_runalarm/ConfirmAlarm.do', {params});
}
export function cancelAlarm(params) {
  return request.get(base + '/device_runalarm/CancelAlarm.do', {params});
}
export function dealAlarm(params) {
  return request.get(base + '/device_runalarm/DealAlarm.do', {params});
}
export function endAlarm(params) {
  return request.get(base + '/device_runalarm/EndAlarm.do', {params});
}
//historyalarm
export function getHistoryalarmTable(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function getHistoryalarmChildTable(params) {
  return request.get(base + '/device_hisalarm/list2.do', {params});
}
export function historyalarmChild_search(params) {
  return request.get(base + '/device_hisalarm/list2.do', {params});
}
export function historyalarm_search(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
//fsu-devicemanagement
export function getFsuDevicemanagementTable(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
export function remoteOperationSp(data) {
  return request.post(base + '/FSU_device/remoteOperationSp', data);
}
export function getTelemetrySp(params) {
  return request.get(base + '/FSU_device/telemetrySp', {params});
}
export function getSpInfo(params) {
  return request.get(base + '/FSU_device/spInfo', {params});
}
export function getFsuAlarmConditionList(params) {
  return request.get(base + '/FSU_device/fsuAlarmConditionList', {params});
}
export function getAlarmInfoList(params) {
  return request.get(base + '/fsuAlarmInfo/alarmInfoList', {params});
}
export function getFsuPortInfo(params) {
  return request.get(base + '/FSU_device/fsuPortInfo', {params});
}
export function fsuRestart(data) {
  return request.post(base + '/FSU_device/fsuRestart', data);
}
export function fsuSetTime(data) {
  return request.post(base + '/FSU_device/fsuSetTime', data);
}
export function getSpRemoteSettingInfo(params) {
  return request.get(base + '/FSU_device/spRemoteSettingInfo', {params});
}

export function getRemoteSettingSpInfo(params) {
  return request.get(base + '/FSU_device/remoteSettingSpInfo', {params});
}
export function getTelemetrySpList(params) {
  return request.get(base + '/FSU_device/telemetrySpList', {params});
}
export function saveFSUAlarmCondition(data) {
  return request.post(base + '/FSU_device/saveFSUAlarmCondition', data);
}
export function getDeviceTypes(params) {
  return request.get(base + '/fsuBaseConfig/deviceTypeList', {params});
}
export function getFsuSunDevice(params) {
  return request.get(base + '/FSU_device/FsuSunDevice_list2.do', {params});
}
export function getSuStatus(params) {
  return request.get(base + '/FSU_device/getSuStatus', {params});
}

export function getFsuSp(params) {
  return request.get(base + '/FSU_device/FsuSp_list2.do', {params});
}
export function findStation(params) {
  return request.get(base + '/FSU_device/find_station.do', {params});
}
export function fsuDeviceRealTimeCall(params) {
  return request.get(base + '/FSU_device/FsuDeviceRealTimeCall', {params});
}
export function findSpInfoAndDeviceData(params) {
  return request.get(base + '/FSU_device/findSpInfoAndDeviceData', {params});
}
export function fsuDevicemanagementSave(data) {
  return request.post(base + '/FSU_device/save_FSU2.do', data);
}
export function findFSU2(params) {
  return request.get(base + '/FSU_device/find_FSU2.do', {params});
}
export function getFSUType(params) {
  return request.get(base + '/FSU_device/getFSUType', {params});
}
export function delFSU2(data) {
  return request.post(base + '/FSU_device/delFSU2.do', data);
}
export function fsuAddSunDev(data) {
  return request.post(base + '/FSU_device/fsuAddSunDev', data);
}
export function editFSU2(data) {
  return request.post(base + '/FSU_device/edit_FSU2.do', data);
}
export function fsuAddSpID(data) {
  return request.post(base + '/FSU_device/fsuAddSpID', data);
}
export function fsuUpdSunDev(data) {
  return request.post(base + '/FSU_device/fsuUpdSunDev', data);
}
export function delFSU_Sun2(data) {
  return request.post(base + '/FSU_device/delFSUSun2.do', data);
}
export function fsuUpdSpID(data) {
  return request.post(base + '/FSU_device/fsuUpdSpID', data);
}
export function delFSU_Sp2(data) {
  return request.post(base + '/FSU_device/delFSUSp2.do', data);
}
export function getFsuRealtimeTable(params) {
  return request.get(base + '/FSU_device/realdata.do', {params});
}
export function findSpInfoAndRealData(params) {
  return request.get(base + '/FSU_device//findSpInfoAndRealData', {params});
}
export function getFsuSunDeviceTable(params) {
  return request.get(base + '/FSU_device/FsuSunDevice_list2.do', {params});
}
export function getFsuSpTable(params) {
  return request.get(base + '/FSU_device/FsuSp_controlist.do', {params});
}
export function fsuDeviceControl(params) {
  return request.get(base + '/FSU_device/FsuDeviceControl.do', {params});
}
export function getFsuHisdataTable(params) {
  return request.get(base + '/FSU_hisdata/hisdata_list2.do', {params});
}
export function fsuConfirmAlarm(data) {
  return request.post(base + '/FSU_runalarm/FsuConfirmAlarm.do', data);
}
export function fsuCancelAlarm(data) {
  return request.post(base + '/FSU_runalarm/FsuCancelAlarm.do', data);
}
export function fsuEndAlarm(data) {
  return request.post(base + '/FSU_runalarm/FsuEndAlarm.do', data);
}
export function fsuDealAlarm(data) {
  return request.post(base + '/FSU_runalarm/FsuDealAlarm.do', data);
}
export function fsuDelectAll(data) {
  return request.post(base + '/FSU_device/delectAll.do', data);
}
export function fsuDevsEnabledOnOff(data) {
  return request.post(base + '/FSU_device/FsuDevsEnabledOnOff.do', data);
}
//fsu-controlrecord
export function getFsu_controlrecordTable(params) {
  return request.get(base + '/FSU_device/controlrecord_list3', {params});
}
//historicaldata
export function getHistoricaldataTable(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function getHistoricaldataChildTable(params) {
  return request.get(base + '/device_hisdata/list2.do', {params});
}
export function historicaldataChild_search(params) {
  return request.get(base + '/device_hisdata/list2.do', {params});
}
export function historicaldata_search(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
//realtimedata
export function getRealtimedataTable(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
export function getRealtimedataChildTable(params) {
  return request.get(base + '/device_realdata/FindDeviceData.do', {params});
}
export function realtimedataChild_search(params) {
  return request.get(base + '/device_realdata/FindDeviceData.do', {params});
}
export function realtimedata_search(params) {
  return request.get(base + '/device_dev/list2.do', {params});
}
//controlrecord
export function getControlrecordTable(params) {
  return request.get(base + '/device_controlist/control_list3.do', {params});
}
export function controlrecord_search(params) {
  return request.get(base + '/device_controlist/control_list3.do', {params});
}
//passivedevicechangerecord
export function getPassivedevicechangerecordTable(params) {
  return request.get(base + '/device_updatedev/list.do', {params});
}
export function passivedevicechangerecord_search(params) {
  return request.get(base + '/device_updatedev/list.do', {params});
}

//fsu_realtimealarm
export function getFsu_realtimealarmTable(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
export function getFsu_realtimealarmChildTable(params) {
  return request.get('collect/FSU_runalarm/runalarm_list2.do', {params});
}
export function fsu_realtimealarmChild_search(params) {
  return request.get(base + '/FSU_runalarm/runalarm_list2.do', {params});
}
export function fsu_realtimealarm_search(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
//fsu_realtimedata
export function getFsu_realtimedataTable(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
export function getFsu_realtimedataChildTable(params) {
  return request.get(base + '/FSU_realdata/realdata_list2.do', {params});
}
export function fsu_realtimedataChild_search(params) {
  return request.get(base + '/FSU_realdata/realdata_list2.do', {params});
}
export function fsu_realtimedata_search(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
//fsu_historyalarm
export function getFsu_historyalarmTable(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
export function getFsu_historyalarmChildTable(params) {
  return request.get(base + '/FSU_hisalarm/hisalarm_list2.do', {params});
}
export function fsu_historyalarmChild_search(params) {
  return request.get(base + '/FSU_hisalarm/hisalarm_list2.do', {params});
}
export function fsu_historyalarm_search(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
//fsu_historicaldata
export function getFsu_historicaldataTable(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
export function getFsu_historicaldataChildTable(params) {
  return request.get(base + '/FSU_hisdata/hisdata_list2.do', {params});
}
export function fsu_historicaldataChild_search(params) {
  return request.get(base + '/FSU_hisdata/hisdata_list2.do', {params});
}
export function fsu_historicaldata_search(params) {
  return request.get(base + '/FSU_device/list2.do', {params});
}
//index
export function queryAlarmList(params) {
  return request.get(base + '/device_alarm/queryAlarmList.do', {params});
}

export function queryFSUAlarmList(params) {
  return request.get(base + '/device_alarm/queryFSUAlarmList.do', {params});
}
export function queryAlarmCountList(params) {
  return request.get(base + '/device_alarm/queryAlarmCountList.do', {params});
}
export function getDispatchInfo(params) {
  return request.get(base + '/onlinemanager/index/dispatch', {params});
}
export function getApiInfo(params) {
  return request.get(base + '/onlinemanager/index/api', {params});
}
export function getDataInfo(params) {
  return request.get(base + '/onlinemanager/index/data', {params});
}
export function getFrontInfo(params) {
  return request.get(base + '/onlinemanager/index/front', {params});
}
export function getCountInfo(params) {
  return request.get(base + '/onlinemanager/countInfo', {params});
}

export function onlineDeviceList(params) {
  return request.get(base + '/onlinemanager/statusDeviceList', {params});
}
export function alarmDeviceDetailsList(params) {
  return request.get(base + '/device_alarm/alarmDeviceDetailsList', {params});
}
export function queryFSUAlarmCountList(params) {
  return request.get(base + '/device_alarm/queryFSUAlarmCountList.do', {
    params,
  });
}
//fsuconfig
export function getConfigFileList(params) {
  return request.get(base + '/FSU_device/getConfigFileList', {
    params,
  });
}
export function deleteConfigFiles(data) {
  return request.post(base + '/FSU_device/deleteConfigFiles', data);
}
export function createWorkOrder(data) {
  return request.post(base + '/workOrder/createWorkOrder', data);
}
export function sendConfigFileList(data) {
  return request.post(base + '/FSU_device/sendConfigFileList', data);
}
//inspection
export function confimWorkOrder(data) {
  return request.post(base + '/workOrder/auditingWorkOrder', data);
}

export function findInspectionInfoByBelongId(params) {
  return request.get(base + '/inspection/findInspectionInfoByBelongId', {
    params,
  });
}
export function getListWorkOrder(params) {
  return request.get(base + '/workOrder/listWorkOrder', {
    params,
  });
}
export function stationMonitorById(params) {
  return request.get(base + '/monitor/stationMonitorById', {
    params,
  });
}
export function getVideoInfo(params) {
  return request.get(base + '/monitor/videoInfo', {
    params,
  });
}
export function getImage(params) {
  return request.get(base + '/workOrder/image', {
    params,
  });
}
export function getStationAlarm(params) {
  return request.get(base + '/monitor/stationAlarm', {
    params,
  });
}
//devicesubtype
export function findDeviceSubType(params) {
  return request.get(base + '/FSU_device/findDeviceSubType', {
    params,
  });
}
export function deviceSubTypeInfo(params) {
  return request.get(base + '/FSU_device/deviceSubTypeInfo', {
    params,
  });
}

export function saveDeviceSubType(data) {
  return request.post(base + '/FSU_device/saveDeviceSubType', data);
}
export function editDeviceSubType(data) {
  return request.post(base + '/FSU_device/editDeviceSubType', data);
}
export function deleteDeviceSubType(data) {
  return request.post(base + '/FSU_device/deleteDeviceSubType', data);
}
//basicConfig
export function getDeviceTypeList(params) {
  return request.get(base + '/fsuBaseConfig/deviceTypeList', {
    params,
  });
}
export function getSpTypeList(params) {
  return request.get(base + '/fsuBaseConfig/spTypeList', {
    params,
  });
}
export function getSubDeviceTree(params) {
  return request.get(base + '/FSU_device/listSubDevice', {
    params,
  });
}
export function getFsuSpType(params) {
  return request.get(base + '/fsuBaseConfig/spType', {
    params,
  });
}
