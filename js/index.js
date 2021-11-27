window.addEventListener('load',function(){ 
    // alert(1);
    // 设置整个网页的鼠标滑动效果
    // document.getElementById('selRate').onclick();
    var page = document.getElementById('page');
    console.log(window.page==page);
    var contentAll = document.getElementById('content-all');
    var box = document.getElementById('box');
    var panel = box.querySelectorAll('.panel');
    
    var oDot = document.getElementById('dot');
    console.log(oDot)
    var aLi = oDot.getElementsByTagName('li');
    //屏幕的可视宽度
    var w = document.documentElement.clientWidth;
    //屏幕的可视高度
    var h = document.documentElement.clientHeight;
    
    // console.log(h);
    var k = 0;
    page.style.height = h+100+'px';
    for(var i = 0;i<panel.length;i++ ){
        panel[i].style.length = h+'px';
        panel[i].style.width = w+'px';
    }
    for(var i =0;i<aLi.length;i++){
        aLi[i].index = i;
        aLi[i].onmousemove = function(){
            for(var i=0; i<aLi.length;i++){
                aLi[i].className='';
            }
            this.className = 'active';
            k = this.index;
        }

    }
        // 鼠标滚动时触发的事件
    for(var i=0;i<panel.length;i++){
        box.onmousewheel = function(ev){
            // var ev = event||ev;
            var b = true;
            b = ev.wheelDelta>0?false:true;
            if(b){
                k++;
                if(k>aLi.length-1){
                    k=aLi.length-1;
                }

                box.style.top=-h*k-100*k+55+'px';
                clear();
            }else{
                k--;
                if(k<0){
                    k=0;
                }

                box.style.top=-h*k-100*k+55+'px';
                clear();
            }
            ev.preventDefault();
            var side =document.getElementById('side-nav');
            if(k>=1){
                side.style.left= 0+"px";
            }else{
                side.style.left= -247+"px";
            }
        }
    }
    function clear(){
        for(var j=0; j<aLi.length; j++){
            aLi[j].className = '';
        }
        aLi[k].className='active';
    }
    function sidenav(){
        var top = box.offsetTop;
        var side =document.getElementById('side-nav');
        if( top<=-799){
            side.style.left= 0+"px";
        }else{
            side.style.left= -247+"px";
        }
    }
    //设置导航栏的第一块
    var menu_btn =document.querySelector('.menu-btn');
    var menu_hover =document.querySelector('.topBar-menu-hover');
    menu_btn.onmouseenter=function(){
        menu_hover.style.display="block";
    }
    menu_btn.onmouseleave=function(){
        menu_hover.style.display="none";
    }
    menu_hover.onmouseenter=function(){
        menu_hover.style.display='block';
        

    }
    menu_hover.onmouseleave=function(){
        menu_hover.style.display='none';
    }


    //设置导航栏的第二块
    var navhide =document.getElementById('nav-hide');
    var navmain =document.getElementById('nav-main');
    var nav_news =document.getElementById('nav-news');
    var nav_big_img= document.getElementById('nav-big-img');
    nav_news.onmouseover = function(){
        nav_big_img.style.visibility = 'visible';
        nav_big_img.style.display='block';
        navmain.style.visibility = 'hidden';  
      
    }
    nav_news.onmouseout = function(){
        navmain.style.visibility = 'visible';
        nav_big_img.style.visibility = 'hidden';
    }
    nav_big_img.onmouseover = function(){
        nav_big_img.style.visibility = 'visible';
        navmain.style.visibility = 'hidden';  
    
      
    }
    nav_big_img.onmouseout = function(){
        navmain.style.visibility = 'visible';
        nav_big_img.style.visibility = 'hidden';
        nav_big_img.style.display = 'none';
        
    }

    //侧边栏的出现与隐藏
    // var box = document.getElementById('box');
    // var sidenav = document.getElementById('side-nav');
    sidenav();


    //第二页的左轮播图
    var ul = document.getElementById('list');
    var allLi = ul.querySelectorAll('li');
    console.log(allLi)
    var img=document.getElementById('pic');
    var banner = document.getElementById('banner');
    //设置第一张图片为1
    var currentNUM = 1;
    
    // 让图片循环的定时器
    var timer = setInterval(startloop,2000);
    var circle=0;
    function startloop(){
        circle++;
        if(circle==6){
            circle=0;
        }
        
        for(var i= 0;i<allLi.length;i++){
            allLi[i].className = '';
        }
        allLi[circle].className = 'current';
        
        currentNUM ++;
        changeIMG();
        // allLi[i].index ++;
    }
    function changeIMG(){
        if(currentNUM ==0){
            currentNUM = 6;
        }
        if(currentNUM ==7){
            currentNUM =1;
        }
        img.src = "images/banner"+currentNUM+ ".jfif";
    }
    
     //鼠标划过整个容器时停止自动播放
     banner.onmouseover = function() {
         clearInterval(timer);
     }
     //鼠标离开整个容器时继续自动播放
     banner.onmouseout =function(){
        timer = setInterval(startloop,2000);
     }
    // 触碰小圆点，排他思想
    for(var i= 0;i<allLi.length;i++){
        allLi[i].setAttribute('index',i);
        allLi[i].addEventListener('click',function(){
            for(var i =0;i<allLi.length;i++){
                allLi[i].className = ' ';
            }
            this.className= 'current';
            var index=this.getAttribute('index')
            // console.log(index);
            circle=index;
        })
    }
    //小圆点和图片的切换
    for(var i =0;i<allLi.length;i++){
        allLi[i].index = i+1;
        allLi[i].addEventListener('click',function(){
            currentNUM = this.index;
            changeIMG();
        })
    }

    //第二页的右导航栏切换
    var boxTab = document.querySelector('.newsbox-tab');
    var lis =boxTab.querySelectorAll('li');
    var item = document.querySelectorAll('.item');
    for(var i=0;i<lis.length;i++){
        lis[i].setAttribute('index',i);
        lis[i].onclick = function(){
            //标题的排他思想
            for(var i=0;i<lis.length;i++){
                lis[i].className =' ';
            }
            this.className ='box-bg';
            //下面显示内容模块
            var index = this.getAttribute('index');
            // console.log(index);
            for(var i = 0;i<item.length;i++){
                item[i].style.display ='none';
            }
            item[index].style.display ='block';
            }
    }

    //第三页的下方手风琴
    var tabctrl =document.querySelector("#features");
    var first_nav =document.querySelector(".first-nav");
    var icon = document.querySelectorAll('icon');
    console.log(icon);
    var inde = 0;
    for(var i=0;i<tabctrl.children.length;i++){
        if(i<3){
            tabctrl.children[i].style.overflow="hidden"
        }
        tabctrl.children[i].onmouseenter =function(){
            inde = this.className -1 ;
            fun(inde);
        }
        tabctrl.children[i].onmouseleave =function(){
            inde = this.className -1 ;
            fun(inde);
        }
    }
    function fun(count){
        for(var i=0;i<tabctrl.children.length;i++){
            tabctrl.children[i].style.width = 130+'px';
            tabctrl.children[i].style.overflow="hidden"
        }
        tabctrl.children[count].style.width = 444+'px';
        tabctrl.children[count].style.overflow="visible"
      
    }

    //第四页图片切换
    var job_nav = document.querySelector('.job-nav');
    var jobs = job_nav.querySelectorAll('li');
    var role = document.querySelector('.role');
    
    var classNameList = [];
    for (let index = 0; index < jobs.length; index++) {
        classNameList[index] = jobs[index].className;
        
    }
    for(let i=0; i<jobs.length; i++){
        // jobs[i].setAttribute('index',i);
        jobs[i].onclick =function(){
            for(let j =0;j<jobs.length;j++){
                jobs[j].className =classNameList[j];
            }
            this.className +=(' job'+(i+1));
            // console.log(i); 
        }
    }
   
    role.children[0].style.opacity=1;
    role.children[1].style.opacity=1;
    var flag=true;
    for(let i=0; i<3; i++){
        jobs[i].onclick =function(){
            if (flag == true) {
                flag = false;
                for(let j =0;j<jobs.length;j++){
                    jobs[j].className =classNameList[j];
                }
                this.className +=(' job'+(i+1));
            for(let j = 0;j < 6;j += 2){
                role.children[j].style.transform="translate3d(-200px,0,0)";
                role.children[j+1].style.transform="translate3d(200px,0,0)";
                role.children[j].style.opacity=0;
                role.children[j+1].style.opacity=0;
            }
            let haha=setInterval(function(){
                role.children[2*i].style.transform="translateX(0)";
                role.children[2*i+1].style.transform="translateX(0)";
                role.children[2*i].style.opacity=1;
                role.children[2*i+1].style.opacity=1;
                flag=true;
                clearInterval(haha)    
            },700)
        }
    }
}
    //右边显示内容模块
    // var index = this.getAttribute('index');
    // for(var i =0;i<roles.length;i++){
    //     roles[i].style.display ='none';
    // }
    // roles[index].style.display ='block';
    //第五页走马灯
    var zmd = document.querySelector('.zmd');
    var gameex =document.querySelector('.game-ex');
    console.log(gameex)
    var white = document.querySelector('.white');
    white.innerHTML =gameex.innerHTML;
    function funny(){
        if(zmd.scrollLeft==1020){
            zmd.scrollLeft =0;
        }else{
            zmd.scrollLeft++;
        }
    }
    var fun1 =setInterval(funny,30);
    zmd.onmouseover =function(){
        clearInterval(fun1);
    }
    zmd.onmouseout =function(){
        fun1= setInterval(funny,30);
    }
    //第五页视频
    //导航栏
    var video_nav =document.querySelector('.video-nav');
    var video_all = video_nav.querySelectorAll('.nave');
    var video =document.querySelectorAll('.video');
    for(var i=0;i<video_all.length;i++){
        video_all[i].setAttribute('index',i);
        video_all[i].onclick=function(){
            for(var i=0;i<video_all.length;i++){
                video_all[i].style.backgroundColor=""
            }
            this.style.backgroundColor="#d4c28b";
            var index_fif =this.getAttribute('index');
            for(var i=0;i<video.length;i++){
                video[i].style.display='none';
            }
            video[index_fif].style.display='block';
            }
        }
    //视频的出现
    var btn_video1 =document.querySelector('.btn-video1');
    var click1 =document.querySelector('.click1');
    var btn_close =document.querySelector('.btn-close1');
    btn_video1.onclick = function(){
        click1.style.display ="block";
    }
    btn_close.onclick= function(){
        click1.style.display ="none";

    }
    //视频的倍速
    var selRate =document.querySelector('#selRate');
    var rate =document.querySelector('.rate');
    var speed_menu =document.querySelector('.speed-menu');
    var video_one =document.querySelector('.video-one');

    selRate.onclick= function(){
        rate .style.display='block';
    }
    for (let i = 0; i < speed_menu.children.length; i++) {
        speed_menu.children[i].addEventListener('click', function () {
            if(i==0){
                video_one.playbackRate=2;
            }
            if(i==2){
                video_one.playbackRate=1;
            }
            if(i==1){
                video_one.playbackRate=1.5;
            }
            if(i==3){
                video_one.playbackRate=0.75;
            }
            if(i==4){
                video_one.playbackRate=0.5;
            }
        }); 
        
    }



    //第五页音乐
    var oAudio=document.getElementById("audio");
    var oPlay=document.querySelector(".play");
    var clickNum=0;
    oAudio.setAttribute("src","images/music.mp3");
    oPlay.onclick=function(){
        if(clickNum==0){
            oAudio.play();
            oPlay.innerHTML ="<i class='iconfont pause' title='暂停'>"
            clickNum=1;
        }else{
            oAudio.pause();
            oPlay.innerHTML ="<i class='iconfont start' title='播放'>"
            clickNum=0;
        }
    }
    //第六页旋转木马
    var lastX,lastY,nowX,nowY;
    timer;
    disX =0;
    disY =0;
    roX =0;
    roY =0;
    //进入网页的初始化状态
    function init(){
        var image = document.querySelectorAll('.xzmm img');
        var len = image.length;
        var deg =360 / len;
        for(var i=0;i<len;i++){
            image[i].style.cssText =`transform:rotateY(${deg * i}deg) translateZ(350px); transition:transform 1s `
        }
    }
    function press(){
        document.addEventListener('mousedown',mouseDown);

    }
    //鼠标按下
    function mouseDown(e){
        clearInterval(timer);
        e.preventDefault();
        lastX= e.clientX;
        lastY= e.clientY;
        document.addEventListener('mousemove',mouseMove);
        document.addEventListener('mouseup',mouseUp);
    }
    function mouseMove(e){
        var xzmm =document.querySelector('.xzmm');
        nowX =e.clientX;
        nowY =e.clientY;
        disX = nowX-lastX;
        disY = nowY-lastY;
        roX -= disY * 0.2;
        roY += disX * 0.2;
        xzmm.style.cssText = `transform:rotateX(${roX}deg) rotateY(${roY}deg);`
        lastX = nowX;
        lastY = nowY;
    }
    function mouseUp(){
        document.removeEventListener('mousemove',mouseMove);
        clearInterval(timer);
    }
    init();
    press();

})
