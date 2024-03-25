var { extractCode,  groupByPath} = require('./index');
var fs = require('fs');

var evalCode = (code, defaultContext=global, requiredCtx={require, module, console }) => {
  let vm = require('vm');
  let ctx =  vm.createContext(defaultContext);
  return (
    vm.runInContext(
      code,
      Object.assign(ctx, requiredCtx)
    )
  );
}

var eval = (markdownStr, validation, defaultCtx, requiredCtx) => {
  if(!validation) (validation = (b) => b.eval);  
  let blocks = extractCode(markdownStr);
  let takeHasEvaluate = blocks.filter(validation);
  let codes = takeHasEvaluate.reduce((res, val) => res.concat(`${val.code}\n\n`), '');
  return evalCode(codes, defaultCtx, requiredCtx);  
}
    
module.exports = {eval, evalCode}
