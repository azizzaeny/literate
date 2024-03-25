var { extractCode,  groupByPath} = require('./index');

var fs = require('fs');

var tangle = (str, validation) => {
  if(!validation) (validation = (b) => b.path);
  let code = extractCode(str);
  let takeHasPath = code.filter(validation);
  let groupFile = groupByPath(takeHasPath);
  var writeOut = Object.entries(groupFile).map(([file, contents]) => ((file) ? fs.writeFileSync(file, contents, { flag: 'w+'}) : file, file));  
  return `tangle files: #${writeOut.length} ${writeOut.join(' ')}`;
}

module.exports = {tangle}
