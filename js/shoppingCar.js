document.addEventListener('DOMContentLoaded',function(){
    var shoppingcar=document.getElementsByClassName("shoppingcar")[0];
    var carList=shoppingcar.children[1];
    var prices=document.getElementsByClassName("prices")[0];
//==================================获取cookie===================================================//
   var arr = Cookie.getCookie("goodslist") || [];
    if(typeof arr=="string"){
        arr = JSON.parse(arr);
    }
    render();

    function render(){
        var total=0;
        carList.innerHTML=arr.map(function(item){
            var add=0;
            add+=item.qty*item.xianjia;
            total+=add;
            return  '<li guid="'+item.idx+'">'+
                        '<img src="'+item.imgurl+'" alt="" />'+
                        '<h6>'+item.name+'</h6>'+
                        '<div class="number">'+
                            '<a href="JavaScript:;" class="jian"></a>'+
                            '<input type="text" value="'+item.qty+'" class="val" />'+
                            '<a href="JavaScript:;" class="jia"></a>'+
                        '</div>'+
                        '<span>'+item.xianjia+'</span>'+
                        '<p>'+add+'</p>'+
                        '<a href="JavaScript:;" class="remove"></a>'+
                    '</li>';
                 }).join("");
            prices.innerHTML='<p class="prices">总价:'+total+
                        '<span>元</span>'+
                        '</p>'
        }
 // =====================================点击清空购物车===============================//
        var emptyCart=document.getElementsByClassName("emptyCart")[0];
        emptyCart.onclick=function(){
            carList.innerHTML="";
            prices.innerHTML=0;
            Cookie.delCookie("goodslist");
        } 
// 3.点击btn-close(事件委托到carList),找到与currendGuid相同的对象所在的索引,对数组进行删除某一项的操作，再重新渲染，cookie重新存储      
        var remove=document.getElementsByClassName("remove")[0];
        carList.onclick=function(e){
            //删除功能
            if(e.target.className=="remove"){
                var curTi=e.target.parentElement;
                var curId=curTi.getAttribute("guid");
                var i;
                arr.some(function(item,id){
                    i=id;
                    return item.idx==curId;
                })
                console.log(e.target,arr,curId);
                arr.splice(i,1);
            }
        //加减数量改变cookie
            if(e.target.className.toLowerCase() =="jian"){
                e.target.nextElementSibling.value--;
                if(e.target.nextElementSibling.value<=0){
                    e.target.nextElementSibling.value=1;
                }
                var curLi=e.target.parentElement.parentElement;
                var curIdx=curLi.getAttribute("guid");
                var j;
                arr.some(function(item,id){
                    j=id;
                    return item.idx==curIdx;
                })
                arr[j].qty=e.target.nextElementSibling.value;
                
            }else if(e.target.className.toLowerCase() == "jia"){
                e.target.previousElementSibling.value++;
                var curLi=e.target.parentElement.parentElement;
                var curIdx=curLi.getAttribute("guid");
                arr.some(function(item,id){
                    j=id;
                    return item.idx==curIdx;
                })
                arr[j].qty= e.target.previousElementSibling.value;

            }
                render();  
                Cookie.setCookie("goodslist",JSON.stringify(arr));  
        }
//==============================滚动列表=============================================//
        var  picture=document.querySelector(".picture");
        var  ulbox=picture.children[1];
        var  firstLi=ulbox.children[0];
        var  leftBtn=document.querySelector(".leftBtn");
        var  rightBtn=document.querySelector(".rightBtn");
        var  len=ulbox.children.length;
        console.log(len)
        var  idx=0;
        //设置宽高
            picture.style.width=firstLi.offsetWidth*6+'px';
            ulbox.style.width=firstLi.offsetWidth*len+'px';
            console.log(picture.style.width,ulbox.style.width)
           leftBtn.onclick=function(){
            idx++;
            if(idx==ulbox.children.length-7){
                ulbox.style.left=0;
                idx=1;
            }
            animation(ulbox,{left:-firstLi.offsetWidth *idx},30);
            console.log(idx);
           }
            rightBtn.onclick=function(){
                idx--;
                if(idx<0){
                    ulbox.style.left=-firstLi.offsetWidth *8 +"px";
                    idx=7;
                }
                animation(ulbox,{left:-firstLi.offsetWidth*idx},30);
                console.log(idx);
            }

});