removeDuplicates = (s) => {
  // I: string
  // O: string with duplicates removed
  // C: lowercase letters string
  // E: undefined, null, not a string

  if (typeof s !== 'string') {
    return ''
  }

  // s = s.toLowerCase();

  // output string
  let noDuplicates = ""

  // reference object
  let seen = {};

  // iterate through the input string
  for (let i = 0; i < s.length; i ++) {
    let lower = s[i].toLowerCase()
    if (seen[lower]) {
      continue
    } else {
      noDuplicates += s[i];
      seen[lower] = 1
    }
  }
  // when seeing a new letter add it to seen

  // add it to output

  // if it's already seen (exists in seen object) don't add

  // return noDuplicates string
  return noDuplicates

}

console.log(removeDuplicates("The dog ran down the road"))