
var extractCode = (markdownStr) =>{
  let regex = /```(\w+)((?:\s+\w+=[\w./]+)*)\s*([\s\S]*?)```/g;
  let extractParams = (paramsString) => {
    if(paramsString){
      return paramsString.split(/\s+/).reduce((acc, params)=>{
        let [key, value] = params.split('=');
        if(key && value){
          acc[key] = isNaN(value) ? value : parseInt(value);
        }     
        return acc;
      }, {});
    }
    return {};
  }
  return [...markdownStr.matchAll(regex)].reduce((acc, match) => {
    let lang         = match[1];
    let paramsString = match[2];
    let code         = match[3].trim();
    let params       = extractParams(paramsString);
    return acc.concat({
      ...params,
      lang,
      code
    });
  }, []);
}

var groupByPath = (blocks) =>{
  return blocks.reduce((acc, value)=>{
    if(!acc[value['path']]){
      acc[value['path']] = value['code'];
    }else{
      acc[value['path']] = acc[value['path']].concat('\n\n', value['code'])
    }
    return acc;
  }, {})
}

module.exports = {
  extractCode,
  groupByPath
}
