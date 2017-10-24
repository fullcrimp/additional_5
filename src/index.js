module.exports = function check(str, bracketsConfig) {
  // decare dictionaries
  let openBracketDict = bracketsConfig.map(item => item[0]),
    closeBracketDict = bracketsConfig.map(item => item[1])

  let stack = []
  while (str) {
    // declare vars for better code readability
    let openBracketIndex = openBracketDict.indexOf(str[0]),
      isOpenBracket = openBracketIndex > -1,
      closeBracketIndex = closeBracketDict.indexOf(str[0]),
      isCloseBracket = closeBracketIndex > -1,
      isUniBracket = isCloseBracket && isOpenBracket

    // stack has smth and the case of the unibracket
    if (stack.length && isUniBracket) {
      // '...||' CLOSED GROUP: REMOVE FROM STACK 
      if (closeBracketIndex === stack[stack.length - 1]) {
        stack.pop()
        str = str.substring(1)
        continue

        // '...(|' 
      } else {
        stack.push(closeBracketIndex)
        str = str.substring(1)
        continue
      }
    }

    // '...('
    if (isOpenBracket) {
      stack.push(openBracketIndex)
      str = str.substring(1)
      continue
    }

    // '...)'
    if (isCloseBracket) {
      // '...[]'
      if (closeBracketIndex === stack.pop()) {
        str = str.substring(1)

        // '...(]' WRONG 
      } else {
        return false
      }
    }
  }

  // str fully processed
  if (stack.length) {
    return false
  } else {
    return true
  }
}