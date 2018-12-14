


document.addEventListener('DOMContentLoaded',function(){

// 划上提示信息
    var xiangping = document.getElementsByClassName("xiangping")[0];
    var details = document.getElementsByClassName("details")[0]
    var links = xiangping.children;
    xiangping.onmouseover = function(e){
        if(e.target.tagName == "A"){
            details.style.display =  "block"
            this.bak = e.target.title;
            // console.log(this.title)
            e.target.title = "";
            details.innerHTML = this.bak;
            xiangping.onmousemove = function(evt){
                details.style.left = e.clientX - 20 + 'px';
                details.style.top = e.clientY + 30 + 'px';
            }
            xiangping.onmouseout = function(e){
                    e.target.title = this.bak;
                    details.style.display = "none";
            }
        }
    }


// 获取cookie
var Cookie = {
    // 设置cookie
    //  * name cookie名
    //  * val cookie值
    //  * date 时间对象
    //  * path 路径
    setCookie : function(name,val,date,path){
        var str = name+"="+val;
        if(date){
            str += "; expires="+date.toUTCString();
        }
        if(path){
            str += "; path="+path;
        }
        document.cookie = str;
    },
    // 获取cookie
    getCookie : function(name){
        var cookie = document.cookie;//"left=300; age=17"   
        if(cookie == ""){
            return "";
        }else{
            var cookieArr = cookie.split("; ");
            for(var i=0;i<cookieArr.length;i++){
                var arr = cookieArr[i].split("=");
                if(arr[0] == name){
                    return arr[1];
                }
            }
            return "";
        }
    },
    // 删除某条cookie
    delCookie : function(name,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        Cookie.setCookie(name,"",d,path);
    }
}

// 渲染界面*/


var mainrt = document.getElementsByClassName("main_r_t")[0];
var mainrc = document.getElementsByClassName("main_r_c")[0];
var arr = Cookie.getCookie("goodslist") || [];
if(typeof arr == "string"){
                arr = JSON.parse(arr);
}
total();
render(); 
function total(){
    console.log(mainrt)
    mainrt.innerHTML =  '<span>Subtotal:</span>'+
                '<span></span><br />'+
                '<span>Shipping Frees:</span>'+
                '<span></span><br />'+
                '<span>Shipping Insurance:</span>'+
                '<span></span><br />'+
                '<span>Your Order Total:</span>'+
                '<span></span><br />'+
                '<span>Coupon:</span>'+
                '<span></span><br />'+
                '<span>Grand Total:</span>'+
                '<span></span>'
}
function render(){
    mainrc.innerHTML = arr.map(function(item){
        return  '<div class="shuchu">'+'<img src="'+item.imgurl+'" height="70px" width="60px"/>' +
                '<p>Name:'+item.name+'</p>'+
                '<p>Color:red</p>'+
                '<p>Size:36</p>'+
                '<p>Qty:'+item.qty+'</p>'+
                '<p>Price:'+item.xianjia+'</p>'+
                '</div>'
    }).join("");
}

 // 吸顶菜单
    window.onload = function(){
        var search = document.getElementById("search");
        window.onscroll = function(){
            if(scrollY>=300){
                search.style.position = "fixed";
                search.style.left = 20;
                search.style.top = 0;
            }
            else{
            search.style.position = "static"
            } 
        }
    }



































})