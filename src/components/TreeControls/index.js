import React, {PureComponent} from 'react';
import classnames from 'classnames';
import styles from './index.less';
import {toJS} from 'mobx';

import {Tree} from 'antd';

const {TreeNode} = Tree;

class TreeControls extends React.Component {
  renderTreeNodes = (data, index = 0) =>
    data.map(item => {
      let fixPaddingLeft = 30;
      const {rowKey, rowNameKey, itemClick} = this.props;

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
      return (
        <TreeNode
          key={item[rowKey]}
          {...item}
          isLeaf={!item.isParent}
          title={
            <div style={{paddingLeft: index * 14 + 'px'}}>
              {item[rowNameKey]}
            </div>
          }
          dataRef={item}
        />
      );
    });

  render() {
    const {treeData} = this.props;
    return (
      <div className={styles['tree-wrap']}>
        <Tree {...this.props}>{this.renderTreeNodes(treeData)}</Tree>
      </div>
    );
  }
}

export default TreeControls;
