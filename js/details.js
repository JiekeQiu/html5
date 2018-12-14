document.addEventListener('DOMContentLoaded',function(){
    //接收数据
    var commodity=document.getElementsByClassName("commodity")[0];
    var uname=document.getElementsByClassName("name")[0];
    var output=document.getElementsByClassName("output")[0];
        var list= decodeURI(location.search.slice(1)); 
        var goods={};
        goods.qty=1;
        var listArr=list.split("&");
        listArr.forEach(function(item){
            var commodityArr=item.split("=");
            goods[commodityArr[0]]=commodityArr[1];
        })
        console.log(goods);
        commodity.innerHTML='<ul class="shop"><li data-guid="'+goods.idx+'">'+
                                '<a class="fly" href="JavaScript:;"><img id="flyImg" src="'+goods.imgurl+'" alt=""></a>'+
                            '</ul></li>';

        uname.innerHTML='<a href="JavaScript:;"><h2>'+goods.name+'</h2></a>'+
                        '<p>单价：'+goods.xianjia+'</p>';
    //=============================计算价格 ===================================//
    var upBtn=document.getElementsByClassName("jtUp")[0];
    var downBtn=document.getElementsByClassName("jtDown")[0];
    var number=document.getElementsByClassName("number")[0];
    //点击箭头数字增加     
    var num=0;
    upBtn.onclick=function(){
        num++;
        number.value=num;
        output.innerHTML='<span>价格:'+goods.xianjia*num+'</span>';
    }
    downBtn.onclick=function(){
        number.value=num;
        num--;
        number.value=num;
        output.innerHTML='<span>价格:'+goods.xianjia*num+'</span>';
        if(num<=0){
            num=0;
            number.value=num;
            output.innerHTML='<span>价格:'+goods.xianjia*num+'</span>';
        }
    }
    
// ==================table切换====================================//
    var tab=document.getElementsByClassName("tab")[0];
    var table=tab.children[0];
    var Tab=document.getElementsByTagName("button");
    var content=tab.children[1];
    var contents=content.children;
    var con=contents.children;
        content.firstElementChild.style.display = "block";
        for(var i=0;i<Tab.length;i++){
            Tab[i].idx=i;
            Tab[i].onclick=function(){
                for(var i=0;i<Tab.length;i++){
                    Tab[i].className = "";
                    contents[i].style.display="none";
               }    
                this.className="active";
                contents[this.idx].style.display="block";
            } 
        }
             
             
    //===================评论区域========================//
    // 随机验证码
    var code=document.getElementById("Code");
    var codeNum=document.getElementsByClassName("yzm")[0];
    var ranDom = '';
     function ranDomNum(){
        ranDom=""+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10);
            codeNum.innerHTML = ranDom;
        }
            ranDomNum();
            codeNum.onclick = ranDomNum;
//点击事件
    var con=document.getElementById("matter");
    var discuss=document.getElementsByClassName("discuss")[0];  
    var submit=document.getElementById("btn");
    var minarr = "辣鸡,傻逼,草,bitch,狗日的,fuck,他妈的".split(","); 
    var arr = [];
    var brr=[];
//点击事件
     submit.onclick=function(){
            var _code=code.value;
            var _con = con.value;
            if(_code!=ranDom||_con.trim()==""){
                alert("输入验证码或内容");
            }else if(_code==ranDom){
//过滤敏感字符
             minarr.forEach(function(item){
                var reg = new RegExp(item,"gi");
                    _con = _con.replace(reg,"*");
                })
                arr.push(_con);
                con.value = "";
                code.value="";
                con.focus();
                ranDomNum();
                render();
            }
//用户名区域
            var grade=document.getElementsByClassName("grade")[0];
            var uname=document.getElementById("uname");
            var _uname=uname.value;
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth()+1;
            var date = d.getDate();
            var day = d.getDay();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            var str = "日一二三四五六";
            var res=(year+"年"+month+"月"+date+"日,星期"+str[day]);
            brr.push(_uname,res);
            console.log(brr)
            brr.map(function(idx){
                grade.innerHTML='<p>'+brr[0]+'</p>'+
                '<span>'+brr[1]+'</span>';
                uname.value="";
                uname.focus();
                ranDomNum();
                render();
            })
                 

        }
// 渲染页面
        function render(){
            discuss.innerHTML = arr.map(function(item){
                return '<li>'+item+'</li>';
            }).join("");
        }
//===================================cookie====================================//
  var addcar=document.getElementsByClassName("addCar")[0];
  var shop=document.getElementsByClassName("shop")[0];
  var curLi=shop.children[0];
  var curId=curLi.getAttribute("data-guid");
  addcar.onclick=function(){ 
    var arr = Cookie.getCookie("goodslist") || [];
    if(typeof arr=="string"){
        arr = JSON.parse(arr);
    }
    var i;
    var res = arr.some(function(item,id){
        i = id;
        return item.idx ==curId ;
    });
    if(res){
        arr[i].qty++;
    }else{
        arr.push(goods);
    }
        var date = new Date();
        date.setDate(date.getDate() + 10);
        Cookie.setCookie("goodslist",JSON.stringify(arr),);
    }


     // 动画之飞入购物车
    var fly = document.getElementsByClassName("fly")[0];
    var flyImg = document.getElementById("flyImg");
    var cloneImg;
    fly.onclick = function(){ 

        cloneImg = flyImg.cloneNode(true);
        fly.appendChild(cloneImg);
        cloneImg.style.width = 200;
        cloneImg.style.height = 200;
        cloneImg.style.top = -393 + 'px';
        cloneImg.style.left = 0 + 'px';
        animation(cloneImg,{left:700,top:200,width:0,height:0},50);
        if(cloneImg.style.top >= 200){
            fly.removeChild(fly.children[1]);
        }
   }
   




    function animation(ele,obj,time,fn){
    var count = 0;
    for(var key in obj){
    count++;
    var attr = key;
    var target = obj[key];
    show(attr,target);
        }
        function show(attr,target){
            target = attr == "opacity"? target*100:target;
            clearInterval(ele[attr+"Timer"]);
            ele[attr+"Timer"] = setInterval(function(){
                var current = window.getComputedStyle(ele)[attr];//200px   /[a-z]+/
                var unit = current.match(/[a-z]+$/);//提取单位
                unit = unit? unit[0] : "";
                current = parseFloat(current);//只获取数值
                current = attr == "opacity"? current*100 : current;
                var speed = (target-current)/10;
                if(speed > 0){
                    speed = Math.ceil(speed);
                }else if(speed < 0){
                    speed = Math.floor(speed);
                }
                current += speed;
                ele.style[attr] = attr == "opacity"? current/100 :current + unit;
                if(current == target){
                    clearInterval(ele[attr+"Timer"]);
                    count--;
                    if(count == 0 && fn && typeof(fn) == "function"){
                        fn();
                    }
                }
            }, time)
        }
    }
// ====================================滚动列表==================================//
        var focus=document.querySelector(".focus");
        var ulbox=focus.children[0]; 
        var firstimg=ulbox.children[0];
        console.log(firstimg.offsetWidth);
        var goRight=document.querySelector(".jt_1");
        var goLeft=document.querySelector(".jt_2");
        var len=ulbox.children.length;
        var idx=0;
                focus.style.width=firstimg.offsetWidth*5+'px';
                ulbox.style.width=firstimg.offsetWidth*len+'px';
                console.log(firstimg.offsetWidth,ulbox.style.width,focus.style.width);
            //点击按钮，改变图片位置,bug :不能实现连续点击，移动另一个箭头会变成两个图片的距离
           goRight.onclick=function(){
                idx--;
                if(idx<0){
                    idx=0;
                }
                animation(ulbox,{left:-firstimg.offsetWidth*idx},30);
           }
          goLeft.onclick=function(){
                idx++;
                if(idx==3){
                  ulbox.style.left =ulbox.children.length-1;
                  idx=2;
                }
                animation(ulbox,{left:-firstimg.offsetWidth*idx},30);
           }

})