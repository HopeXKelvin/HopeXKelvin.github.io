function stock_fnc(n){
  var price = 1;
  var i = 2,j = 3;
  for(var k=1;k<n;k++){
    if(k == i){
      price--;
      i = i+j;
      j++;
    }else{
      price++;
    }
  }
  return price;
}

var line;
while(line = read_line()){
  line = line.split(" ");
  print(stock_fnc(parseInt(line[0])));
}
