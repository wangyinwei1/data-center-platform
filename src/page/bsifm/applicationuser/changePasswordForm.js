import React from "react"
import {
  CustomForm as Form,
  CustomFormItem as FormItem,
} from "@/components/PublicForm"

class ChangePasswordForm extends React.Component {
  form = null
  componentDidMount() {
    const { formRef } = this.props

    formRef && formRef(this)
  }

  render() {
    return (
      <div style={{ padding: "40px", paddingBottom: "10px" }}>
        <Form
          formRef={(form, _this) => {
            this.form = form
          }}
        >
          <FormItem
            required={true}
            label={"更改密码"}
            placeholder={"请填写区域名称"}
            onChange={(e) => {
              // this.form.setFieldsValue({
              //   changePassword: e.target.value,
              // })
            }}
            name={"password"}
          />
        </Form>
      </div>
    )
  }
}

export default ChangePasswordForm
