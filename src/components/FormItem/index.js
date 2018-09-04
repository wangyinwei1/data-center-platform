import React, {Component} from 'react';
import {toJS} from 'mobx';
import styles from './index.less';
import classnames from 'classnames';
import {Form, Input, Radio, Row, Select} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;
const Option = Select.Option;
const mapPropsToFields = props => {
  const value = props[props.name].value;

  let object = {...props[props.name]};
  if (
    ((value !== 0 && !value) || !value[0]) &&
    props.rules[0].required &&
    props[props.name].showError
  ) {
    const error = {
      errors: [
        {
          field: props.name,
          message: props.rules[0].message,
        },
      ],
    };

    object = {...error, ...props[props.name]};
  }
  let obj = {};
  obj[props.name] = Form.createFormField({
    ...object,
    value: props[props.name].value,
    // typeof props[props.name].value === 'number'
    //   ? props[props.name].value.toString()
    //   : props[props.name].value,
  });
  return obj;
};

const FormSelect = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return mapPropsToFields(props);
  },
  onValuesChange(_, values) {
    //console.log(_, values);
    _.getAreaSonList && _.getAreaSonList(values);
  },
})(props => {
  const {getFieldDecorator} = props.form;
  const {
    name,
    label,
    rules,
    children,
    className,
    placeholder,
    width,
    disabled,
    mode,
  } = props;
  const customWidth = width
    ? {width: typeof width === 'number' ? `${width}px` : width}
    : {};
  return (
    <FormItem
      label={label || ''}
      style={customWidth}
      className={classnames(
        styles['form_select'],
        width && styles['custom_select_width'],
        className,
      )}>
      {getFieldDecorator(name || '', {
        rules: rules ? rules : [{required: false, message: '请自定义信息'}],
      })(
        <Select
          mode={mode}
          placeholder={placeholder ? placeholder : '请选择内容'}
          disabled={disabled ? disabled : false}>
          {_.map(children, (item, i) => {
            return (
              <Option key={i.toString(36) + i} value={item.value}>
                {item.name}
              </Option>
            );
          })}
        </Select>,
      )}
    </FormItem>
  );
});
const FormRadio = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return mapPropsToFields(props);
  },
  onValuesChange(_, values) {
    // console.log((_, values));
  },
})(props => {
  const {getFieldDecorator} = props.form;
  const {name, label, rules, placeholder, children, width, disabled} = props;
  const customWidth = width
    ? {width: typeof width === 'number' ? `${width}px` : width}
    : {};
  return (
    <FormItem
      label={label || ''}
      style={customWidth}
      className={classnames(
        styles['form_radio'],
        width && styles['custom_radio_width'],
      )}>
      {getFieldDecorator(name || '', {
        rules: rules ? rules : [{required: false, message: '请自定义信息'}],
      })(
        <RadioGroup disabled={disabled ? disabled : false}>
          {_.map(children, (item, i) => {
            return (
              <Radio key={i.toString(36) + i} value={item.value}>
                {item.name}
              </Radio>
            );
          })}
        </RadioGroup>,
      )}
    </FormItem>
  );
});
const FormTextArea = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return mapPropsToFields(props);
  },
  onValuesChange(_, values) {
    //console.log(values);
  },
})(props => {
  const {getFieldDecorator} = props.form;
  const {
    name,
    onFocus,
    label,
    rules,
    placeholder,
    disabled,
    width,
    className,
    type,
  } = props;
  const customWidth = width
    ? {width: typeof width === 'number' ? `${width}px` : width}
    : {};
  return (
    <FormItem
      label={label}
      className={classnames(
        styles['form_input'],
        width && styles['custom_input_width'],
        className,
      )}
      style={customWidth}>
      {getFieldDecorator(name, {
        rules: rules
          ? rules
          : [{required: true, message: 'Username is required!'}],
      })(
        <TextArea
          onClick={onFocus ? onFocus : () => {}}
          disabled={disabled ? disabled : false}
          autoComplete={'off'}
          placeholder={placeholder ? placeholder : '请输入内容'}
        />,
      )}
    </FormItem>
  );
});
const FormInput = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return mapPropsToFields(props);
  },
  onValuesChange(_, values) {
    //console.log(values);
  },
})(props => {
  const {getFieldDecorator} = props.form;
  const {
    name,
    onFocus,
    label,
    rules,
    placeholder,
    disabled,
    width,
    className,
    type,
  } = props;
  const customWidth = width
    ? {width: typeof width === 'number' ? `${width}px` : width}
    : {};
  return (
    <FormItem
      label={label}
      className={classnames(
        styles['form_input'],
        width && styles['custom_input_width'],
        className,
      )}
      style={customWidth}>
      {getFieldDecorator(name, {
        rules: rules
          ? rules
          : [{required: true, message: 'Username is required!'}],
      })(
        <Input
          onClick={onFocus ? onFocus : () => {}}
          disabled={disabled ? disabled : false}
          autoComplete={'off'}
          placeholder={placeholder ? placeholder : '请输入内容'}
        />,
      )}
    </FormItem>
  );
});
class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      width: 0,
      show: false,
    };
  }
  componentDidMount() {
    const width = $(this.formInput).width();
    this.setState({width: width - 16});
    $(document).on('click.CustomSelect', () => {
      if (this.state.show) {
        this.setState({
          show: false,
        });
      }
    });
  }
  componentwillunmount() {
    $(document).off('click.CustomSelect');
  }

  handleFormChange(changedFields) {
    const {onChange} = this.props;
    const key = _.keys(changedFields);
    changedFields[key[0]].code = '';
    onChange(changedFields);
  }
  handleClick(item, e, r) {
    const txt = $(e.target).text();
    const {onChange, name} = this.props;
    let formValue = {};
    formValue[name] = {};
    formValue[name].value = txt;
    formValue[name]['name'] = name;
    formValue[name]['code'] = item.value;
    onChange(formValue);

    this.setState({
      show: false,
    });
  }
  onFocus(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      show: true,
    });
  }
  render() {
    const {
      fields,
      children,
      disabled,
      label,
      className,
      name,
      rules,
    } = this.props;
    const hasValue = _.filter(children, item => {
      return item.value === parseInt(fields[name].value);
    });
    if (hasValue[0]) {
      fields[name].value = hasValue[0].name;
      fields[name]['code'] = hasValue[0].value || '';
    }
    // console.log(fields[name].value);
    // console.log(children);
    const isSame = _.filter(children, item => {
      return item.name === fields[name].value;
    });

    return (
      <div
        ref={c => {
          this.formInput = c;
        }}
        className={classnames(styles['custom_select'], className)}>
        <FormInput
          {...fields}
          onChange={this.handleFormChange}
          label={label}
          disabled={disabled}
          name={name}
          onFocus={this.onFocus}
          rules={rules}
        />
        {((this.state.show && !fields[name].value) ||
          (this.state.show && isSame[0])) && (
          <ul
            className={styles['custom_select_menu']}
            style={{width: this.state.width}}>
            {_.map(children, (item, i) => {
              return (
                <li
                  key={i.toString(36) + i}
                  onClick={this.handleClick.bind(this, item)}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export {FormInput, FormRadio, FormSelect, CustomSelect, FormTextArea};
