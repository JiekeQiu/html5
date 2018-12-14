document.addEventListener('DOMContentLoaded',function(){
    var ul = document.getElementById("ul");
    var date = document.getElementsByClassName("nav_a1")[0];
    var price = document.getElementsByClassName("nav_a2")[0];
   


    var listArr=[
        {   
            idx:0,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:201,
            SaveUSD:79,
            Redirection:"wholesale",
            time:"2000-01-01",
        },
        {
            idx:1,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:292,
            SaveUSD:279,
            Redirection:"wholesale",
            time:"2018-01-02",
        },
        {
            idx:2,
            imgurl:"../images/list3.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:203,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"2061-01-03",
        },
        {
            idx:3,
            imgurl:"../images/list4.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:204,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"1999-01-04",
        },
        {
            idx:4,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:555,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"1994-01-05",
        },
        {
            idx:5,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:206,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"2018-01-19",
        },
        {
            idx:6,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:287,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"2085-02-07",
        },
        {
            idx:7,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:628,
            SaveUSD:541,
            Redirection:"wholesale",
            time:"2011-11-08",
        },
        {
            idx:8,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:966,
            SaveUSD:779,
            Redirection:"wholesale",
            time:"2048-06-09",
        },
        {
            idx:9,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:230,
            SaveUSD:79,
            Redirection:"wholesale",
            time:"2008-01-10",
        },
        {
            idx:10,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:101,
            SaveUSD:100,
            Redirection:"wholesale",
            time:"2018-04-11",
        },
        {
            idx:11,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:222,
            SaveUSD:111,
            Redirection:"wholesale",
            time:"2011-04-12",
        },
        {
            idx:12,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:213,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"2002-06-13",
        },
        {
            idx:13,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:214,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"2001-01-14",
        },
        {
            idx:14,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:715,
            SaveUSD:529,
            Redirection:"wholesale",
            time:"2018-01-15",
        },
        {
            idx:15,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:356,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"2012-12-16",
        },
        {
            idx:16,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:317,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"2014-01-17",
        },
        {
            idx:17,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:218,
            SaveUSD:179,
            Redirection:"wholesale",
            time:"2016-01-18",
        },
        {
            idx:18,
            imgurl:"../images/list.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:219,
            SaveUSD:200,
            Redirection:"wholesale",
            time:"2015-06-19",
        },
        {
            idx:19,
            imgurl:"../images/list2.png",
            name:"Up Down Open Coseide Leather Case with",
            USD:200,
            SaveUSD:199,
            Redirection:"wholesale",
            time:"2013-05-20",
        }
    ];    

            list();
            setmsg();
        function list(){
         var str = listArr.map(function(item,idx){
                item.xianjia=item.USD-item.SaveUSD;
            return '<li data-guid="'+item.idx+'">'+
                        '<img class="img" src="'+item.imgurl+'" alt="" />'+'<br/>'+
                        '<a href="#"class="product">'+item.name+'</a>'+'<br/>'+
                        '<span>USD:'+item.USD+'</span>'+
                        '<span class="s2">USD '+item.xianjia+'</span>'+
                        '<p>Save USD:'+item.SaveUSD+'</p>'+
                        '<a href="#">'+item.Redirection+'</a>'+
                        '<p>'+item.time+'</p>'+
                    '</li>'
         }).join("");
         ul.innerHTML = str;
     }
    // 价格排序
            var show = true;
            price.onclick=function(){
                if(show){
                    listArr.sort(function(a,b){
                    return a.xianjia-b.xianjia;
                    })
                    show = !show;
                }else if(!show){
                    listArr.sort(function(b,a){
                    return a.xianjia-b.xianjia;
                    })
                    show = true;
                }
                list();
                setmsg();
            }
    // 日期排序
            date.onclick=function(){
                if(show){
                    listArr.sort(function(a,b){
                    return Date.parse(a.time)-Date.parse(b.time);
                    })
                    show = !show;
                }else if(!show){
                    listArr.sort(function(b,a){
                    return Date.parse(a.time)-Date.parse(b.time);
                    })
                    show = true;
                }
                list();
                setmsg();
            }

    // 吸顶   
            window.onscroll=function(){
                var sousuo= document.getElementById("sousuo");
                if(window.scrollY>90){
                    sousuo.style.position="fixed";
                    sousuo.style.left=0;
                    sousuo.style.top=0;
                }else{
                    sousuo.style.position="static";
                }
            }
    // 传输数据 
    function setmsg(){
         var img = document.getElementsByClassName("img");
                for(var i=0;i<img.length;i++){
                    img[i].idx=i;
                    img[i].onclick=function(){
                        var lists=listArr[this.idx];
                        location.href="details.html?idx="+lists.idx+"&imgurl="+lists.imgurl+"&name="+lists.name+"&USD="+lists.USD+"&SaveUSD="+lists.SaveUSD+"&Redirection="+lists.Redirection+"&time="+lists.time+"&xianjia="+lists.xianjia;
                    }
                }   
            }
    
  
           

})

            