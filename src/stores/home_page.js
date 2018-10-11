import {observable, action, toJS} from 'mobx';
import {
  confirmAlarm,
  cancelAlarm,
  dealAlarm,
  alarmDeviceDetailsList,
  onlineDeviceList,
  offlineDeviceList,
  endAlarm,
  queryAlarmList,
  queryFSUAlarmList,
  queryAlarmCountList,
  queryFSUAlarmCountList,
  fsuExecuteOperatio,
  getApiInfo,
  getDataInfo,
  getDispatchInfo,
  executeOperation,
  getCountInfo,
  getFrontInfo,
} from '../services/api.js';
import {message} from 'antd';
class HomePage {
  @observable tableData = {};
  @observable tableParmas = {};
  @observable loading = false;
  @observable a_tableData = {};
  @observable a_tableParmas = {};
  @observable a_loading = false;
  @observable servicesData = {};
  @observable apiData = [];
  @observable frontsData = [];
  @observable dataCenterData = [];
  @observable alarmMenuList = [];
  @observable allCount = {};
  @observable s_loading = false;
  @observable alarmFsuMenuList = [];
  @action.bound
  async fsuExecuteOperatio(params) {
    const data = await fsuExecuteOperatio(params);
    if (data.Result == 'success') {
      message.success(data.Msg);
      this.getFsuTable(this.tableParmas);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getDispatchInfo(params) {
    this.s_loading = true;
    const data = await getDispatchInfo(params);
    this.s_loading = false;
    const data1 = {
      Data: {
        cpu: 0,
        memory: 0,
        nodeid: 0,
        host: '172.16.4.117',
        port: 8765,
        apis: [
          {
            nodeid: 1,
            host: '172.16.4.117',
            port: 8765,
          },
          {
            nodeid: 1,
            host: '172.16.4.117',
            port: 8765,
          },
          {
            nodeid: 1,
            host: '172.16.4.117',
            port: 8765,
          },
          {
            nodeid: 1,
            host: '172.16.4.117',
            port: 8765,
          },
          {
            nodeid: 1,
            host: '172.16.4.117',
            port: 8765,
          },
        ],
        fronts: [
          {
            nodeid: 1,
            host: '172.16.4.117',
            port: 8765,
          },
        ],
        fsufronts: [
          {
            nodeid: 1,
            host: '172.16.4.117',
            port: 8765,
          },
        ],
        directfronts: [
          {
            nodeid: 1,
            host: '172.16.4.117',
            port: 8765,
          },
        ],
        authentications: {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
        },
        registrys: {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
        },
        appDispatch: {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
        },
        devDispatch: {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
        },
        ondate: '2018-08-12 13:01:10',
      },
      Result: 'success',
    };

    if (data.Result == 'success') {
      this.servicesData = data.Data;
      // message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getCountInfo(params) {
    const data = await getCountInfo(params);
    this.allCount = data;
  }
  @action.bound
  async getFrontInfo(params) {
    this.s_loading = true;
    const data = await getFrontInfo(params);
    this.s_loading = false;
    const data1 = {
      Data: [
        {
          frontType: 1,
          fronts: [
            {
              cpu: 0,
              memory: 0,
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
              ondate: '2018-08-12 13:01:10',
              runStatus: '300/500',
            },
            {
              cpu: 0,
              memory: 0,
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
              ondate: '2018-08-12 13:01:10',
              runStatus: '300/500',
            },
            {
              cpu: 0,
              memory: 0,
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
              ondate: '2018-08-12 13:01:10',
              runStatus: '300/500',
            },
          ],
          strDeviceIDs: '33464,33465,33466',
          onLineCount: 300,
          exeCount: 50,
          devTypeList: [
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
            {
              devType: 23,
              typeName: '门禁',
              count: 100,
            },
          ],
        },
      ],
      Result: 'success',
    };

    if (data.Result == 'success') {
      this.frontsData = data.Data;
      // message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getDataInfo(params) {
    this.s_loading = true;
    const data = await getDataInfo(params);
    this.s_loading = false;
    const data1 = {
      Data: [
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          availability: '60%',
          freeCons: 5,
        },
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          availability: '60%',
          freeCons: 5,
        },
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          availability: '60%',
          freeCons: 5,
        },
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          availability: '60%',
          freeCons: 5,
        },
      ],
      Result: 'success',
    };

    if (data.Result == 'success') {
      this.dataCenterData = data.Data;
      // message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async getApiInfo(params) {
    this.s_loading = true;
    const data = await getApiInfo(params);
    this.s_loading = false;
    const data1 = {
      Data: [
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          fronts: [
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
          ],
          app: [
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
          ],
          deviceCount: 200,
        },
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          fronts: [
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
          ],
          app: [
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
          ],
          deviceCount: 200,
        },
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          fronts: [
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
          ],
          app: [
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
          ],
          deviceCount: 200,
        },
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          fronts: [
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
          ],
          app: [
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
          ],
          deviceCount: 200,
        },
        {
          cpu: 0,
          memory: 0,
          nodeid: 0,
          host: '172.16.4.117',
          port: 8765,
          ondate: '2018-08-12 13:01:10',
          fronts: [
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
            {
              nodeid: 0,
              host: '172.16.4.117',
              port: 8765,
            },
          ],
          app: [
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
            {
              appID: 'XXXXXXXXXXXXXX',
              time: '2018-08-12 01:01:11',
            },
          ],
          deviceCount: 200,
        },
      ],

      Result: 'success',
    };
    if (data.Result == 'success') {
      this.apiData = data.Data;
      // message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async executeOperation(params) {
    const data = await executeOperation(params);
    if (data.Result == 'success') {
      this.getTable(this.tableParmas);
      message.success(data.Msg);
    } else {
      message.error(data.Msg);
    }
  }

  @action.bound
  async getTable(params) {
    this.loading = true;
    const data = await queryAlarmList(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.pd.number;
      params.page = data.Data.pd.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getFsuAlarmNum(params) {
    this.loading = true;
    const data = await queryFSUAlarmCountList(params);
    this.loading = false;
    if (data.Result == 'success') {
      this.alarmFsuMenuList = data.Data.alarmMenuList;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getAlarmNum(params) {
    this.loading = true;
    const data = await queryAlarmCountList(params);
    this.loading = false;
    if (data.Result == 'success') {
      this.alarmMenuList = data.Data.alarmMenuList;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async offlineDeviceList(params) {
    this.a_loading = true;
    const data = await offlineDeviceList(params);
    this.a_loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.a_tableParmas = params;
      this.a_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async onlineDeviceList(params) {
    this.a_loading = true;
    const data = await onlineDeviceList(params);
    this.a_loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.a_tableParmas = params;
      this.a_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async alarmDeviceDetailsList(params) {
    this.a_loading = true;
    const data = await alarmDeviceDetailsList(params);
    this.a_loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.number;
      params.page = data.Data.page;
      this.a_tableParmas = params;
      this.a_tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action.bound
  async getFsuTable(params) {
    this.loading = true;
    const data = await queryFSUAlarmList(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.pd.number;
      params.page = data.Data.pd.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action
  async fsuSearch(params) {
    this.loading = true;
    const data = await queryFSUAlarmList(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.pd.number;
      params.page = data.Data.pd.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
  @action
  async search(params) {
    this.loading = true;
    const data = await queryAlarmList(params);
    this.loading = false;
    if (data.Result == 'success') {
      params.number = data.Data.pd.number;
      params.page = data.Data.pd.page;
      this.tableParmas = params;
      this.tableData = data.Data;
    } else {
      message.error(data.Msg);
    }
  }
}

export default HomePage;
