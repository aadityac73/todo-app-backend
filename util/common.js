function toLowecase(string) {
  return String(string).trim().toLocaleLowerCase();
}

function isSingleName(str) {
  return /^[A-Z]+$/i.test(str);
}

function isValidMobileNumber(num) {
  return /[0-9]{10}$/.test(num);
}

function customReplace(content, findArr, replaceArr) {
  let updatedContent = content;
  for (let i = 0; i < findArr.length; i++) {
    updatedContent = updatedContent.replace(findArr[i], replaceArr[i]);
  }
  return updatedContent;
}

module.exports = { toLowecase, isSingleName, isValidMobileNumber, customReplace };
