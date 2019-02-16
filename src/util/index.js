const codeGenerator = (code, text) => {
  const dialog = {
    title: '',
    text: '',
    botton: [{
      title: '확인'
    }]
  }
  switch (code) {
    case 'B':
      dialog.title = 'vBizException'
      dialog.text = text
      break
    case 'E':
      dialog.title = 'Exception'
      dialog.text = text
      break
    case 'F':
      dialog.title = 'Page Not Found'
      dialog.text = text
      break
    default:
      console.log(code, text)
  }
  return dialog
}

const convertDateFormat = (date, format) => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [
    date.getFullYear(),
    (month > 9 ? '' : '0') + month,
    (day > 9 ? '' : '0') + day
  ].join(format)
}

export {
  codeGenerator,
  convertDateFormat
}
