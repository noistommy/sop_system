const codeGenerator = (code, text) => {
  const dialog = {
    title: '',
    text: '',
    botton: {}
  }
  switch (code) {
    case 'B':
      dialog.title = 'Login Error'
      dialog.text = text
      dialog.button = {
        title: '확인'
      }
      console.log(code, text)
      break
    case 'E':
      console.log(code, text)
      break
    default:
      console.log(code, text)
  }
  return dialog
}

export {
  codeGenerator
}
