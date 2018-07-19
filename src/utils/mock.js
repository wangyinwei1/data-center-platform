import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';

import request from './request';

const mock = new MockAdapter(request, {delayResponse: 500});

mock
  .onGet('/analysis/count')
  .reply(
    200,
    Mock.mock({
      'new|0-10': 1,
      'pending|0-10': 1,
      'overdue|0-10': 1,
      'resolution|0-100': 1,
    }),
  )
  .onGet('/collect/device_area/getAsynArea.do?sing=area&ztreeChild=0')
  .reply(
    200,
    Mock.mock({
      'areaTree|1-10': [
        {
          'code|+1': 110000,
          isParent: true,
          name: '@cname',
          sing: 'area',
        },
      ],
    }),
  )
  .onGet('/collect/device_dev/getAsynArea.do')
  .reply(
    200,
    Mock.mock({
      'areaTree|1-10': [
        {
          'code|+1': '@id',
          isParent: true,
          name: '@cname',
          sing: 'area',
        },
      ],
    }),
  );

export default mock;
