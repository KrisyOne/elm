//解析URL参数 ?if=df&a=dsf
//return object{id:,a:}
export function urlParam(){
  let url=window.location.search;
  let obj={};
  let reg=/[?&][^?&]+=[^?&]+/g;
  let arr=url.match(reg);
  //['?id=qw','&a=fd']
  if(arr){
    arr.forEach((item)=>{
      let tempArr=item.substring(1).split('=');
      let key=decodeURIComponent(tempArr[0]);
      let val=decodeURIComponent(tempArr[1]);
      obj[key]=val;
    });
  }
  return obj;
  console.log(obj);
}
