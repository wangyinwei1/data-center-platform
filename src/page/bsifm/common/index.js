import {message} from 'antd';
import {toJS} from 'mobx';
const cascader = {
  //加载子集
  c_loadData(selectedOptions, index, callback) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const {regionalStore} = this.props;
    const params = {
      ztreeChild: targetOption.code,
      sing: targetOption.sing || 'area',
    };
    //调用基站
    regionalStore.getZone(params, index).then(data => {
      //取消加载状态
      callback();
    });
  },
  //点击
  c_onCascaderChang(value, selectedOptions) {
    this.setState({
      cascaderText: value,
      cascaderValue: value.split('/'),
    });

    const params = {
      page: 1,
      sing: selectedOptions[0].sing,
      keywords: '',
      number: 10,
      ztreeChild: selectedOptions[0].code,
    };
    return params;
  },
  c_onKeyPress(myselfStore) {
    const {regionalStore: {searchArea, topZoneCode}} = this.props;
    const text = this.state.cascaderText.replace(/\/$/gi, '');
    const value = text.split('/');
    const keywords = value;
    const params = {
      ztreeChild: topZoneCode,
      keywords: encodeURIComponent(keywords.join('/')),
    };
    this.setState({cascaderLoading: true});
    //寻找value
    searchArea(params).then(data => {
      this.setState({cascaderLoading: false});
      if (!data) return;
      this.setState({
        cascaderText: data.areaNameArr.join('/'),
        cascaderValue: data.areaNameArr,
      });
    });
  },

  //文本输入
  c_onTextChange(value) {
    // const {regionalStore: {searchArea, topZoneCode}} = this.props;
    // clearTimeout(this.time);
    // this.time = setTimeout(() => {
    //   const params = {
    //     ztreeChild: topZoneCode,
    //     keywords: encodeURIComponent(value),
    //   };
    //   searchArea(params);
    // }, 1000);

    this.setState({
      cascaderText: value,
    });
  },
  //初始化加载
  async initLoading(myselfStore, outParmas) {
    const {regionalStore} = this.props;
    //调用区域接口
    const data = await regionalStore.getAsynArea();
    const params = outParmas
      ? outParmas
      : {
          page: 1,
          sing: 'area',
          keywords: '',
          number: 10,
        };
    if (data.length > 1) {
      params.ztreeChild = 0;
    } else {
      const ztreeChild = data[0] && data[0].code;
      params.ztreeChild = ztreeChild;
    }
    console.log(data);
    //设置初始值
    if (data.length > 1) {
      this.setState({
        cascaderText: '全国',
      });
    } else if (data.length == 1) {
      this.setState({
        cascaderText: data[0].name,
      });
    }

    const tableData = (await data[0]) && myselfStore.getTable(params);
    return tableData;
  },
  c_onDeleteOk(myselfStore, params) {
    myselfStore.delete(params).then(data => {
      this.setState({
        deleteShow: false,
      });
    });
  },
  c_onDeleteCancel() {
    this.setState({
      deleteShow: false,
    });
  },
  c_deleteClick(item) {
    this.setState({
      deleteShow: true,
      singleLineData: item,
    });
  },
  //table分页
  c_onShowSizeChange({current, pageSize}, myselfStore) {
    const params = {
      ...myselfStore.tableParmas,
      page: current,
      number: pageSize,
    };
    myselfStore.getTable(params);
  },
  c_onPageChange({pageNumber}, myselfStore) {
    const params = {
      ...myselfStore.tableParmas,
      page: pageNumber,
    };
    myselfStore.getTable(params);
  },
};
export {cascader};
