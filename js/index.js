document.addEventListener('DOMContentLoaded',function(){
    //吸顶菜单
window.onscroll=function(){
    var sousuo= document.getElementsByClassName("sousuo")[0];
    var header = document.getElementById("header");
            if(window.scrollY>90){
                header.style.position="fixed";
                
                header.style.top=0;
                header.style.background = "#FF4500";
            }else{
                // sousuo.style.position="static";
                header.style.position="static";
            }
        }

// header部分js
    var u5 = document.getElementsByClassName("u5")[0];
    var u2 = document.getElementsByClassName("u2")[0];
    var currentLi = u2.children[1];
    var qut= currentLi.children[0].children[1].children[0];
    var total = currentLi.children[0].children[1].children[1];
    var arr = Cookie.getCookie("goodsList") || [];
    if(typeof arr == "string"){
     arr =JSON.parse(arr);
    }
    function render(){
     u5.innerHTML = arr.map(function(item){
         return '<li>'+
                        '<p>'+
                            '<img src="'+item.imgurl+'" alt="" />'+
                            '<a href="#">'+item.name+'</a>'+
                            '<span>$'+item.xianjia+'&times'+item.qty+'</span>'+
                        '</p>'+
                    '</li>'

     })

    }
    
//轮播图部分
    var banner = document.querySelector(".banner");
    var ulbox = banner.children[0];
    var firstImg = ulbox.children[0].children[0];
    // 3.复制索引0所在的元素，追加到ul最后面。
    var cloneLi = ulbox.children[0].cloneNode(true);
    ulbox.appendChild(cloneLi);
    var len = ulbox.children.length;
    var idx = 0;
    var timer;
    // 1.focus呈现图片，宽度为第一张图片的宽度。ul的宽度=图片的宽度*图片张数
    //  * 必须等待第一张图片加载完成后，再获取宽度
    firstImg.onload = function(){
        banner.style.width = firstImg.offsetWidth + 'px';
        ulbox.style.width = firstImg.offsetWidth * len + 'px';
    }
            
    var page = createPage();
    autoplay();
    //4.鼠标移入focus，清除定时器。鼠标移出focus，重新开启定时器
    banner.onmouseover = function(){
        clearInterval(timer);
    }
    banner.onmouseout = function(){
        autoplay();
    }
    //5.点击小圆点，获取里面的内容-1==>索引
    page.onclick = function(e){
        if(e.target.tagName == "SPAN"){
            idx = e.target.innerHTML - 1;
            showPic();
        }
    }
    // 2.开启定时器，定义一个索引（0、1、2）改变，从而改变的是ulbox的left值
    //  * 当索引为数组长度时，其实要呈现的是索引1所在的图片。为了让轮播图是正着滚的，同时将ul的left手动设置成0。
    function autoplay(){
        timer = setInterval(function(){
        idx++;
        showPic();
        },2500) 
    }
    //只做呈现图片
    function showPic(){
        if(idx == len){
            ulbox.style.left = 0;
            idx = 1;
        }
    //4.滚动过程中索引改变，去除所有的高亮，再让对应的索引高亮.
    //  * 当滚到被复制那张图片索引时，对应的索引为0的小圆点高亮。
    for(var i=0;i<len-1;i++){
            page.children[i].classList.remove("active");
        }
        if(idx == 3){
            page.children[0].classList.add("active");
        }else{
            page.children[idx].classList.add("active");
        }
            animation(ulbox,{left:-firstImg.offsetWidth *idx},30);
    }
            
    //3.生成页码，同时根据len-1生成小圆点.默认第一个小圆点高亮.active
    function createPage(){
        var page  = document.createElement("div"); 
        page.classList.add("page");
        for(var i=1;i<=len-1;i++){
            var dotted = document.createElement("span");
            //dotted.innerHTML = i;
            page.appendChild(dotted);
        }    
        page.children[0].classList.add("active");
        banner.appendChild(page);
        return page;
    }


// 商品页面：
    var staff_con_l_z = document.getElementsByClassName("staff_con_l_z")[0];
    var new_con_z = document.getElementsByClassName("new_con_z")[0];
    var top_con_z = document.getElementsByClassName("top_con_z")[0];
// ======ajax=============
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200 || xhr.status==304){
            var arr=JSON.parse(xhr.responseText); 
            if(staff_con_l_z){
                for(var i=0;i<2;i++){
                    var gid = arr[i].guid;
                    console.log(gid);
                    if(gid){
                        staff_con_l_z.innerHTML = arr.map(function(item){
                            return '<div class="staff_con_l fl">'+
                                        '<a href="#">'+
                                        '<img class="img1 fl" src="'+item.imgurl+'"/>'+
                                        '</a>'+
                                        '<img class="img2" src="'+item.url2+'"/>'+
                                        '<p>'+
                                        '<span class="span1">'+item.infor+
                                        '</span><br />'+
                                        '<span class="span2">USD '+item.yuanjia+'</span><br />'+
                                        '<span class="span3">USD '+item.xianjia+'</span>'+
                                        '</p>'+
                                    '</div>'

                        }).join("");
                    }    
                }
            }
                 
            // if(res[2]){
                     
            //     staff_con_l_z.innerHTML = arr.map(function(item){
            //         return '<div class="staff_con_l fl">'+
            //                     '<a href="#">'+
            //                     '<img class="img1 fl" src="'+item.imgurl+'"/>'+
            //                     '</a>'+
            //                     '<img class="img2" src="'+item.url2+'"/>'+
            //                     '<p>'+
            //                     '<span class="span1">'+item.infor+
            //                     '</span><br />'+
            //                     '<span class="span2">USD '+item.yuanjia+'</span><br />'+
            //                     '<span class="span3">USD '+item.xianjia+'</span>'+

            //                     '</p>'+
            //                 '</div>'

            //     }).join("");}
            // }else if(2<gid<=7){
            //     console.log(666);
                     
            //     new_con_z.innerHTML = new_con_z.innerHTML=arr.map(function(item){
            //             item.save=item.yuanjia-item.ourPrice;
            //         return  '<div class="new_con_l fl">'+
            //                     '<a href="#">'+
            //                         '<img class="img3" src="'+item.imgurl+'"/>'+
            //                     '</a>'+
            //                     '<p>'+
            //                         'Up & Down Open Cowhide Leather Case with Crocod<br/>'+
            //                         'List Price:'+
            //                         '<span class="span1">USD'+item.yuanjia+'</span><br />'+
            //                         'Our Price:'+
            //                         '<span class="span2">$'+item.ourPrice+'</span><br />'+
            //                         '<span class="span3">Save$'+item.save+'</span>'+
            //                     '</p>'+
            //                 '</div>'
            //     }).join("");
            // }else if(7<gid<=16){
            //     console.log(5555555);
                     
            //     top_con_z.innerHTML = arr.map(function(item){
            //         item.save=item.yuanjia-item.ourPrice;
            //         return  '<div class="top_con_l fl">'+
            //                     '<a href="#">'+
            //                         '<img class="img4"src="'+item.imgurl+'"/>'+
            //                     '</a>'+
            //                     '<p>'+
            //                         'Up & Down Open Cowhide Leather Case with Crocod<br/>'+
            //                         'List Price:'+
            //                         '<span class="span1">USD'+item.yuanjia+'</span><br />'+
            //                         'Our Price:'+
            //                         '<span class="span2">$'+item.ourPrice+'</span><br />'+
            //                         '<span class="span3">Save$'+item.save+'</span>'+
            //                     '</p>'+
            //                 '</div>'
            //     }).join("");
            // }     
        }
    }
    xhr.open("GET",'api/index.php',true);
    xhr.send();











    // staff_con_l_z.innerHTML = arr1.map(function(item){
    //         return '<div class="staff_con_l fl">'+
    //                     '<a href="#">'+
    //                     '<img class="img1 fl" src="'+item.imgurl+'"/>'+
    //                     '</a>'+
    //                     '<img class="img2" src="'+item.url2+'"/>'+
    //                     '<p>'+
    //                     '<span class="span1">'+item.infor+
    //                     '</span><br />'+
    //                     '<span class="span2">USD '+item.yuanjia+'</span><br />'+
    //                     '<span class="span3">USD '+item.xianjia+'</span>'+

    //                     '</p>'+
    //                 '</div>'

    // }).join("");
    // new_con_z.innerHTML = new_con_z.innerHTML=arr2.map(function(item){
    //         item.save=item.yuanjia-item.ourPrice;
    //     return  '<div class="new_con_l fl">'+
    //                 '<a href="#">'+
    //                     '<img class="img3" src="'+item.imgurl+'"/>'+
    //                 '</a>'+
    //                 '<p>'+
    //                     'Up & Down Open Cowhide Leather Case with Crocod<br/>'+
    //                     'List Price:'+
    //                     '<span class="span1">USD'+item.yuanjia+'</span><br />'+
    //                     'Our Price:'+
    //                     '<span class="span2">$'+item.ourPrice+'</span><br />'+
    //                     '<span class="span3">Save$'+item.save+'</span>'+
    //                 '</p>'+
    //             '</div>'
    // }).join("");
    // top_con_z.innerHTML = arr3.map(function(item){
    //     item.save=item.yuanjia-item.ourPrice;
    //     return  '<div class="top_con_l fl">'+
    //                 '<a href="#">'+
    //                     '<img class="img4"src="'+item.imgurl+'"/>'+
    //                 '</a>'+
    //                 '<p>'+
    //                     'Up & Down Open Cowhide Leather Case with Crocod<br/>'+
    //                     'List Price:'+
    //                     '<span class="span1">USD'+item.yuanjia+'</span><br />'+
    //                     'Our Price:'+
    //                     '<span class="span2">$'+item.ourPrice+'</span><br />'+
    //                     '<span class="span3">Save$'+item.save+'</span>'+
    //                 '</p>'+
    //             '</div>'
    // }).join("");

var img1 =document.getElementsByClassName("img1");
var img3 =document.getElementsByClassName("img3");
var img4 =document.getElementsByClassName("img4");
    // staff部分传输
    for(var i= 0;i<img1.length;i++){
        img1[i].idx = i;
        img1[i].onclick = function(){
            var goods = arr1[this.idx];
            location.href = "html/details.html?imgurl="+'../'+goods.imgurl+"&infor="+goods.infor+"&yuanjia="+goods.yuanjia+"&xianjia="+goods.xianjia+"&OurPrice="+goods.ourPrice+"&Save="+goods.save;
        }
    }
// news部分传输
    for(var i= 0;i<img3.length;i++){
        img3[i].idx = i;
        img3[i].onclick = function(){
            var goods = arr1[this.idx];
            location.href = "html/details.html?imgurl="+'../'+goods.imgurl+"&infor="+goods.infor+"&yuanjia="+goods.yuanjia+"&xianjia="+goods.xianjia+"&OurPrice="+goods.ourPrice+"&Save="+goods.save;
        }
    }
// top部分传输
    for(var i= 0;i<img4.length;i++){
        img4[i].idx = i;
        img4[i].onclick = function(){
            var goods = arr1[this.idx];
            location.href = "html/details.html?imgurl="+'../'+goods.imgurl+"&infor="+goods.infor+"&yuanjia="+goods.yuanjia+"&xianjia="+goods.xianjia+"&OurPrice="+goods.ourPrice+"&Save="+goods.save;
        }
    }

    // 图片移入移出
    var picList = document.querySelector('.picList');
                var cols = picList.children;
                for(var i=0;i<cols.length;i++){
                    cols[i].onmouseover=function(){
                        clearInterval(this.timer);
                        this.timer=setInterval(()=>{
                            var y = this.children[1].offsetTop;
                            var spped = Math.floor((0-y)/10);
                            y += spped;
                            this.children[1].style.top=y+'px';
                            if(y==0){
                                clearInterval(this.timer);
                            }
                        }, 50)
                    }
                    cols[i].onmouseout=function(){
                        clearInterval(this.timer);
                        this.timer=setInterval(()=>{
                            var y = this.children[1].offsetTop;
                            var spped = Math.ceil((160-y)/10);
                            y += spped;
                            this.children[1].style.top=y+'px';
                            if(y==0){
                                clearInterval(this.timer);
                            }
                        }, 50)
                    }
                }

              //隐藏导航动画效果
            var nav = document.getElementById('none_nav');
            
            var noneli = document.getElementById('noneli');
            
           

                noneli.onmouseover=function(){
                   clearInterval(noneli.timer);
                  // eve.stopPropagation();
                noneli.timer=setInterval(function(){
                    var y = nav.offsetTop;
                    var speed = Math.floor((-140-y)/10);
                    y += speed;
                    nav.style.top=y+'px';
                  
                    if(y==-140){
                        clearInterval(noneli.timer);

                    }
                }, 100)
            }

           
            noneli.onmouseout=function(){
                    clearInterval(timer);
                nav.style.top=-70+'px';
            }
           

           var nav3 = document.getElementById('none_nav3');
            
            var noneli3 = document.getElementById('noneli3');
            
           

                noneli3.onmouseover=function(){
                   clearInterval(noneli3.timer);
                  // eve.stopPropagation();
                noneli3.timer=setInterval(function(){
                    var y = nav3.offsetTop;
                    var speed = Math.floor((-210-y)/10);
                    y += speed;
                    nav3.style.top=y+'px';
                  
                    if(y==-210){
                        clearInterval(noneli3.timer);

                    }
                }, 100)
            }

           
            noneli3.onmouseout=function(){
                    clearInterval(timer);
                nav3.style.top=-70+'px';
            }
        //end////////////////////////////////
        
})
