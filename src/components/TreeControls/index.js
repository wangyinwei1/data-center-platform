import React, {PureComponent} from 'react';
import classnames from 'classnames';
import styles from './index.less';
import offset from 'document-offset';
import {toJS} from 'mobx';

import {Tree} from 'antd';

const {TreeNode} = Tree;

const TooltipWrap = props => {
  const {visible, left, top, text} = props;

  return (
    <div>
      {visible && (
        <div className={styles['tooltip']} style={{left: left, top: top}}>
          <div className={styles['tooltip-content']}>
            <div className={styles['tooltip-arrow']}></div>
            <div className={styles['tooltip-inner']}>{text}</div>
          </div>
        </div>
      )}
    </div>
  );
};
class TreeControls extends React.Component {
  state = {
    visible: false,
    text: '',
    top: 0,
    left: 0,
  };
  renderTreeNodes = (data, index = 0) =>
    data.map(item => {
      let fixPaddingLeft = 30;
      const {rowKey, rowNameKey, itemClick, isNeedHover} = this.props;

      if (item.children) {
        return (
          <TreeNode
            title={
              <div
                style={{paddingLeft: index * 14 + 'px'}}
                onClick={
                  itemClick
                    ? e => {
                        e.stopPropagation();
                        itemClick(item);
                      }
                    : null
                }>
                {item[rowNameKey]}
              </div>
            }
            isLeaf={!item.isParent}
            key={item[rowKey]}
            dataRef={item}>
            {this.renderTreeNodes(item.children, index + 1)}
          </TreeNode>
        );
      }

      let obj = isNeedHover
        ? {
            onMouseEnter: e => {
              e.nativeEvent.stopImmediatePropagation();
              let dom = e.target;
              let span = $(dom).find('span');

              let {left, top} = offset(dom);
              this.setState({
                left: left + dom.offsetWidth,
                top: top,
                text: 'FSU设备名称：' + item['suName'],
                visible: true,
              });
            },
            onMouseLeave: e => {
              e.nativeEvent.stopImmediatePropagation();
              if (this.state.visible) {
                this.setState({
                  visible: false,
                });
              }
            },
          }
        : {};

      return (
        <TreeNode
          key={item[rowKey]}
          {...item}
          isLeaf={!item.isParent}
          title={
            <div {...obj} style={{paddingLeft: index * 14 + 'px'}}>
              <span>{item[rowNameKey]}</span>
            </div>
          }
          dataRef={item}
        />
      );
    });

  render() {
    const {treeData} = this.props;
    const {visible, top, left, text} = this.state;
    return (
      <div className={styles['tree-wrap']}>
        <Tree {...this.props}>{this.renderTreeNodes(treeData)}</Tree>
        <TooltipWrap visible={visible} left={left} top={top} text={text} />
      </div>
    );
  }
}

export default TreeControls;
