export default (a) => {
  if (a.length >= 5) {
    return a;
  } else {
    for(i = 0; i < 5; i++) {
      (i > (a.length - 1)) ? a.push("") : a[i];
    }
    return a
  }
}