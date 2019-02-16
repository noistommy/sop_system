const codeGenerator = (code, text) => {
  const dialog = {
    title: '',
    text: '',
<<<<<<< HEAD
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
=======
    botton: []
  }
  switch (code) {
    case 'B':
      dialog.title = 'Login Error'
      dialog.text = text
      dialog.button = [{
        title: '확인'
      }]
      console.log(code, text)
      break
    case 'E':
      console.log(code, text)
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
      break
    default:
      console.log(code, text)
  }
  return dialog
}

<<<<<<< HEAD
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
=======
export {
  codeGenerator
>>>>>>> 3887f403d138979981a62ed2274db8600bc5aa8e
}
