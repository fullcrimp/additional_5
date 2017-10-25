module.exports = function check(str, bracketsConfig) {
  
  // decare bracket dictionaries
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

    
    if (isUniBracket) { // stack has smth and the case of the unibracket

      if (closeBracketIndex === stack[stack.length - 1]) { // closing uni-bracket - remove from stack last occurence 
        stack.pop()        
      } else {
        stack.push(closeBracketIndex) // add to stack a new occurence of uni-bracket
      }

    } else { 
      // '...('
      if (isOpenBracket) stack.push(openBracketIndex) // add to stack opening bracket

      // longer but more readable than if (isCloseBracket && closeBracketIndex !== stack.pop()) return false
      if (isCloseBracket) {
        if (closeBracketIndex === stack[stack.length - 1]) { 
          stack.pop()
        } else {
          return false // unexpected closing bracket - WRONG SEQUENCE
        }
      }      
    }
    str = str.substring(1)
  }

  // str fully processed: if smth still in stack - some brackets not closed
  return  stack.length ? false : true
}