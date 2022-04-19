function longestCommonPrefix(strs) {
  // write code here
  if (strs.length === 0 || strs === null) {
    return ""
  }
  let maxid = strs[0].length - 1;

  for (let i = 1; i < strs.length; i++) {

    indx = -1; //下标flag

    while (indx < maxid && indx < strs[i].length - 1) {
      if (strs[0].charAt(indx + 1) === strs[i].charAt(indx + 1)) {
        indx++
      } else {
        break;
      }
    }

    if (indx === -1) {
      return ""
    }
    maxid = indx;
  }
  return strs[0].substring(0, maxid + 1);
}

console.log(longestCommonPrefix(["abca", "abc", "abca", "abc", "abcc"]))




