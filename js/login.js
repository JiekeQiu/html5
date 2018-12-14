document.addEventListener('DOMContentLoaded',function(){
   var sign=document.getElementsByClassName("Btn_1")[0];
   var inputMa=document.getElementsByClassName("inputMa")[0];
   var setMa=document.getElementsByClassName("setMa")[0]; 
   var output=document.getElementsByClassName("output")[0];
   var uname=document.getElementsByClassName("name_1")[0];
   var usename=document.getElementsByClassName("name_2")[0];
   var password=document.getElementsByClassName("pass_1")[0];
   var mima=document.getElementsByClassName("pass_2")[0];
   var echo=document.getElementsByClassName("pass_3")[0];
   var login=document.getElementsByClassName("Btn_2")[0];
   var Random;
   // =======================================随机验证码
   function getRandom(){
        var Random=""+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10);
        return Random;
   }
    setMa.onclick=function(){
          setMa.value=getRandom();        
   }
   
  
   // =========================================登录验证
   sign.onclick=function(){
        var _uname=uname.value;
        if(!/^[a-zA-Z0-9][\w\-\.]*@[\da-z\-]{1,63}(\.[a-z]{2,3})+$/.test(_uname)){
            alert("请添加正确的邮箱");
            return false ;
        }
        var _password=password.value;
        var reg=/^[a-zA-Z0-9]{4,10}$/;    
        if(reg.test(_password)==false){
            alert("密码不能含有非法字符，长度在4-10之间");
            return false;
        }
        var _inputMa=inputMa.value;
        if(_inputMa==setMa.value){
            location.href="../index.html";
        }else if(_inputMa!=setMa.value){
            output.innerHTML="验证码有误";
            inputMa.value="";
            setMa.value=getRandom();
        }
   }
  // 登录
  login.onclick=function(){
        var _usename=usename.value;
        if(!/^[a-zA-Z0-9][\w\-\.]*@[\da-z\-]{1,63}(\.[a-z]{2,3})+$/.test(_usename)){
            alert("请添加正确的邮箱");
            return false ;
        }
        var _mima=mima.value;
        var reg=/^[a-zA-Z0-9]{4,10}$/;    
        if(reg.test(_mima)==false){
            alert("密码不能含有非法字符，长度在4-10之间");
            return false;
        }
        var _echo=echo.value;
        if(_mima==_echo){
          location.href="../index.html";
        }else if(_mima!=_echo){
          alert("两次密码不一致");
        }
  }

})