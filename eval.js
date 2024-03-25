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
  let codes = takeHasEvaluate.reduce((res, val) => res.concat(`${val.code}\n`), '');
  let ret = evalCode(codes, defaultCtx, requiredCtx);
  return {
    len : takeHasEvaluate.length,
    validate: validation.toString(),
    ret : ret
  }
}
    
module.exports = {eval, evalCode}
