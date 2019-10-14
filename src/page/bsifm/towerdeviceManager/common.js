export const validateFields = async (fields, onSuccess, onError) => {
  let obj = {};
  await _.forIn(fields, (v, k) => {
    if (!Array.isArray(v.errors)) {
      if (!v.value && v.value !== 0 && v.require) {
        //err提示
        obj[k] = {
          ...v,
          errors: [
            {
              message: '请必须填写!',
              field: k,
            },
          ],
        };
      }
    } else {
      obj[k] = v;
    }
  });

  let err = _.keys(obj)[0];

  if (!err) {
    await onSuccess();
  } else {
    await onError({...fields, ...obj});
  }
};
