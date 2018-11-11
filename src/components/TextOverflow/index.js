import React, {Component} from 'react';
import {action, observer, inject} from 'mobx-react';
import {Tooltip} from 'antd';
import styles from './index.less';
//实例
@observer
class TextOverflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      needTip: false,
      currentWidth: 0,
    };
  }
  componentDidMount() {
    const {inlay} = this.props;
    const parent = $(this.root).parent();
    const paddingLeft = parseInt(parent.css('paddingLeft'));
    const paddingRight = parseInt(parent.css('paddingRight'));

    let width = parseInt(parent.css('width')) - paddingLeft - paddingRight;

    if (inlay) {
      width = width - 18;
      $(this.root).css({
        position: 'absolute',
        left: 0,
        top: '50%',
        marginLeft: 22,
        transform: 'translateY(-50%)',
      });
    }

    const hideSpanWidth = parseInt($(this.hideSpan).css('width'));

    $(this.root).css({width: width});
    parent.css({cursor: 'pointer'});
    if (hideSpanWidth >= width) {
      this.setState({
        needTip: true,
      });
      $(this.root).addClass('text_overflow');
      const {link} = this.props;
      // !link &&
      //   parent.on('click.parent', e => {
      //     this.setState({
      //       isOpen: !this.state.isOpen,
      //     });
      //     $(this.root).hasClass('text_overflow')
      //       ? $(this.root).removeClass('text_overflow')
      //       : $(this.root).addClass('text_overflow');
      //   });
    }
  }
  componentWillUnmount() {
    // const parent = $(this.root).parent();
    // parent.off('click.parent');
  }
  render() {
    return (
      <div
        ref={c => {
          this.root = c;
        }}
        style={{
          cursor: 'pointer',
          width: '100%',
          display: 'inline-block',
          verticalAlign: 'top',
        }}>
        {!this.state.isOpen && this.state.needTip ? (
          <Tooltip
            placement="topLeft"
            overlayClassName={'overlay_classname'}
            title={this.props.children}>
            {this.props.children}
          </Tooltip>
        ) : (
          this.props.children
        )}
        <span
          style={{display: 'none'}}
          ref={c => {
            this.hideSpan = c;
          }}>
          {this.props.children}
        </span>
      </div>
    );
  }
}

export default TextOverflow;
