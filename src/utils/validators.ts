const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return false
  }
  return true
}

const isRecoverpasswordCode = (code: string): boolean => {
  const codeRegex = /^[0-9]{4}$/
  if (!codeRegex.test(code)) {
    return false
  }
  return true
}

const isPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\S\d]{6,10}$/
  if (!passwordRegex.test(password)) {
    return false
  }
  return true
}

export default { isEmail, isRecoverpasswordCode, isPassword }
