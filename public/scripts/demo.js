function select(options){
  // 获取最外层的容器
  var container = document.getElementById(options.srcNode);
  // 构建装有选项的select
  var selectDom = document.createElement("select");
  selectDom.className = "select-box";
  selectDom.style.top = container.clientHeight;
  // 活的每一个option的值
  var valueList = options.data;
  // 拼接dom选项的dom结构
  for(var i=0;i<valueList.length;i++){
    // 拼接每一个option
    var selectItem = document.createElement("option");
    selectItem.className = "select-item";
    // 填充内容
    selectItem.innerHTML = valueList[i];
    selectDom.appendChild(selectItem);
  }
  container.appendChild(selectDom);
  selectDom.addEventListener("click",options.onChange);
}
// eg
select({
  srcNode: '#select',
  data: ['北京','上海','杭州'],
  onChange: (ev)=>{
    console.log(ev.value);
    // 显示选项框
    ev.target.parentNode.style.display = "block";
    var selectContainer = document.getElementById("#select");
    selectContainer.innerHTML = ev.value;
    // 隐藏选项框
    ev.target.parentNode.style.display = "none";
  }
})
