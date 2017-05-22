function ValidURL(str) {
  /*var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }*/
  return true;
}

module.exports.ValidURL = ValidURL;
