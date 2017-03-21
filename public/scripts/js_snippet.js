/*
* 模仿jquery的$.type源码
*写一个方法，输入一个值，判断其类型
*/
// 类型list 的 map
var class2type = {
  '[object Boolean]' : 'boolean',
  '[object Number]' : 'number',
  '[object String]' : 'string',
  '[object Function]' : 'function',
  '[object Array]' : 'array',
  '[object Date]':'date',
  '[object RegExp]':'regexp',
  '[object Object]':'object',
  '[object Error]':'error'
};
// 获取对象的类型
function getType(obj){
  // 如果obj为 null,直接返回 null 字符串
  if(obj == null){
    return obj+"";
  }
  // 如果 obj是 function 或者 object ,即非那四种基本类型(除去null了) Boolean,Number,String,undefined,则返回对应的类型字符串，否则直接返回 typeof obj
  return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] : typeof obj;
}
