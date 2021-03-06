import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';
import 'babel-polyfill';
import {
  Router,
  Route,
  Link,
  IndexRoute,
  IndexRedirect,
  Redirect,
  hashHistory,
  browserHistory,
} from 'react-router';
import './index.css';
import './ant.less';

import {stores} from './stores';
if (process.env.NODE_ENV !== 'production') {
  //联调时可注释掉
  // require('./utils/mock');
}

import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {
  Loginer,
  Layout,
  Regional,
  Site,
  Deviceversion,
  Agreement,
  Alarminformation,
  Controlrecord,
  Information,
  Historyalarm,
  Realtimealarm,
  Passageway,
  nformation,
  Vchannel,
  Realtimedata,
  Valuetype,
  Applicationuser,
  Basicchannel,
  Historicaldata,
  Passivedevicechangerecord,
  Fsu_Controlrecord,
  Fsu_Historicaldata,
  Fsu_Realtimedata,
  Fsn_Realtimealarm,
  Fsu_Historyalarm,
  Fsu_Devicemanagement,
  Menu,
  Devicetype,
  Index,
} from './page';
render(
  <Provider {...stores}>
    <LocaleProvider locale={zhCN}>
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRedirect to="/login" />
          <Route path="/login" component={Loginer} />

          {/* <Route path="/resetmm" component={Resetmm} /> */}
          <Route path="/index" component={Layout}>
            <Route path="/shouye" component={Index} />

            {/* fsu */}
            <Route
              path="/fsu-devicemanagement"
              component={Fsu_Devicemanagement}
            />
            <Route path="/fsu-controlrecord" component={Fsu_Controlrecord} />
            <Route path="/fsu-historyalarm" component={Fsu_Historyalarm} />
            <Route path="/fsu-realtimedata" component={Fsu_Realtimedata} />
            <Route path="/fsu-historicaldata" component={Fsu_Historicaldata} />
            <Route path="/fsu-realtimealarm" component={Fsn_Realtimealarm} />

            <Route path="/bsifm-regional" component={Regional} />
            <Route path="/bsifm-site" component={Site} />

            <Route path="/bsifm-Menu" component={Menu}>
              <Route path="/bsifm-deviceversion" component={Deviceversion} />
              <Route path="/bsifm-devicetype" component={Devicetype} />
            </Route>

            <Route path="/bsifm-basicchannel" component={Basicchannel} />
            <Route
              path="/bsifm-alarminformation"
              component={Alarminformation}
            />
            <Route path="/bsifm-applicationuser" component={Applicationuser} />
            <Route path="/bsifm-valuetype" component={Valuetype} />
            {/* <Route path="/systemuser" component={} /> */}
            {/* <Route path="/bsifm-alarmcondition" component={Alarminformation} /> */}
            {/* <Route path="/bsifm-channeltype" component={channel} /> */}

            <Route path="/equ-information" component={Information} />
            <Route path="/equ-agreement" component={Agreement} />
            <Route path="/equ-passageway" component={Passageway} />
            <Route path="/equ-realtimedata" component={Realtimedata} />
            <Route path="/equ-historicaldata" component={Historicaldata} />
            <Route
              path="/equ-passivedevicechangerecord"
              component={Passivedevicechangerecord}
            />
            <Route path="/equ-controlrecord" component={Controlrecord} />
            <Route path="/equ-historyalarm" component={Historyalarm} />
            <Route path="/equ-realtimealarm" component={Realtimealarm} />
            <Route path="/equ-vchannel" component={Vchannel} />
          </Route>
        </Route>
      </Router>
    </LocaleProvider>
  </Provider>,

  document.getElementById('content'),
);
