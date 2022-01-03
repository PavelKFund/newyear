function MainLoop(time){
    layer1.run(time);
    layer2.run(time);
    layer3.run(time);
    layer4.run(time);
    layer5.run(time);
    ded_moroz.run(time);
    requestAnimationFrame(MainLoop);
}
let canvas=document.getElementById('canvas');
let ctx=canvas.getContext("2d");
let art=new Image();

art.onload=function(){
    requestAnimationFrame(MainLoop);
}

art.src="art.png";

reizeCanvas();

function reizeCanvas(){
    canvas.width=window.innerWidth-40;
}

function Animation(rate){
    this.LastTime=0;
    this.Rate=rate;
    this.update=function(){};
    this.render=function(){};
}

Animation.prototype.run=function(time){
    if((time-this.LastTime)>this.Rate){
        this.LastTime=time;
        this.update();
    }
    this.render();
}
let layer1=new Animation(30);
layer1.sx=0;
layer1.sy=0;
layer1.w=1024;
layer1.h=600;
layer1.render=function(){
    let x=0;
    let screen_w=canvas.width;
    while(x < screen_w){
        let draw_w=Math.min(this.w, screen_w-x);
        ctx.drawImage(art, this.sx, this.sy, draw_w, this.h, x, 0, draw_w, this.h);
        x+=this.w;
    }
    ctx.drawImage(art, 1024, 0, 300, 300, 100, 0, 300, 300);
}
let layer2=new Animation(30);
layer2.sx=0;
layer2.sy=600;
layer2.w=1664;
layer2.h=600;
layer2.dx=0;
layer2.speed=1;
layer2.update=function(){
    this.dx+=this.speed;
    if(this.dx>this.w){
       this.dx-=this.w;
    }
}
layer2.render=function(){
    let x=0;
    let screen_w=canvas.width;
    if((this.w-this.dx)>0){
        ctx.drawImage(art, this.sx+this.dx, this.sy, this.w-this.dx, this.h, x, 0, this.w-this.dx, this.h);
        x+=this.w-this.dx;
    }
    while(x < screen_w){
        let draw_w=Math.min(this.w, screen_w-x);
        ctx.drawImage(art, this.sx, this.sy, draw_w, this.h, x, 0, draw_w, this.h);
        x+=this.w;
    }
    ctx.drawImage(art, 1024, 0, 300, 300, 100, 0, 300, 300);
}

let layer3=new Animation(30);
layer3.sx=0;
layer3.sy=1200;
layer3.w=1664;
layer3.h=600;
layer3.dx=0;
layer3.speed=3;
layer3.update=layer2.update;
layer3.render=layer2.render;

let layer4=new Animation(30);
layer4.sx=0;
layer4.sy=1800;
layer4.w=1664;
layer4.h=600;
layer4.dx=0;
layer4.speed=6;
layer4.update=layer2.update;
layer4.render=layer2.render;

let layer5=new Animation(30);
layer5.sx=0;
layer5.sy=2400;
layer5.w=1664;
layer5.h=600;
layer5.dx=0;
layer5.speed=10;
layer5.update=layer2.update;
layer5.render=layer2.render;

let ded_moroz=new Animation(50);
ded_moroz.frame_num=0;

ded_moroz.update=function(){
    this.frame_num++;
    if(this.frame_num>15){
        this.frame_num=0;
    }
}

ded_moroz.get_frame=function(){
    if(this.frame_num>7){
        return {x:((this.frame_num-8)*150),y:3150};
    }
    else{
        return {x:(this.frame_num*150),y:3000};
    }
}

ded_moroz.render=function(){
    let frame=this.get_frame();
    ctx.drawImage(art, frame.x, frame.y, 150, 150, 150, 450, 150, 150);
}