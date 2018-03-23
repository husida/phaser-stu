/// <reference path="./phaser.d.ts"/>
var width = window.innerWidth;
var height = window.innerHeight;

// 创建实例
var game = new Phaser.Game(width, height, Phaser.auto, '#game');

// 定义场景
var states = {
    // 加载
    preload: function () {
        this.preload = function () {
            // 设置背景为黑色
            game.stage.backgroundColor = '#000000';
            // 加载游戏资源
            game.load.crossOrigin = 'anonymous'; // 设置跨域
            game.load.image('bg', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bg.png');
            game.load.image('dude', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/dude.png');
            game.load.image('green', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/green.png');
            game.load.image('red', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/red.png');
            game.load.image('yellow', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/yellow.png');
            game.load.image('bomb', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bomb.png');
            game.load.image('five', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/five.png');
            game.load.image('three', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/three.png');
            game.load.image('one', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/one.png');
            game.load.audio('bgMusic', '//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/bgMusic.mp3');
           
            // 添加加载进度文字
            var processText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
                fontSize: '60px',
                fill: '#ffffff'
            });
            
            // 设置文字锚点到中心
            processText.anchor.setTo(0.5,0.5);

            // 监听加载完一个文件的事件
            game.load.onFileComplete.add(function(process) {
                processText.text = process + '%'

            })

            // 加载完成监听
            game.load.onLoadComplete.add(load);

            // 定义加载最小时间
            var overMinTime = false;
            setTimeout(function() {
                overMinTime = true;
            }, 3000);

            function load() {
                if (overMinTime) {
                    game.state.start('created');
                } else {
                    setTimeout(function () {
                        load();
                    }, 1000);
                }
            }
        }
    },
    // 开始
    created: function () {
        this.create = function () {
            // 添加背景
            var bg = game.add.image(0, 0, 'bg');
            bg.width = game.world.width;
            bg.height = game.world.height;

            var title = game.add.text(game.world.centerX, game.world.height * 0.25, '接苹果',{
                fontSize: '40px',
                fontWeight: 'bold',
                fill: '#f2bb15'
            });
            title.anchor.setTo(0.5, 0.5);

            var remind = game.add.text(game.world.centerX, game.world.centerY, '点击任意位置开始',{
                fontSize: '20px',
                fill: '#f2bb15'
            });
            remind.anchor.setTo(0.5, 0.5);

            // 主角
            var man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'dude');
            var manImage = game.cache.getImage('dude');
            man.width = game.world.width * 0.2;
            man.height = man.width/manImage.width * manImage.height;
            man.anchor.setTo(0.5, 0.5);

            // 游戏点击事件
            game.input.onTap.add(function () {
                game.state.start('play');
            });
        }

    },
    // 游戏中
    play: function () {
        this.create = function () {
            var score = 0;
            // 背景音乐
            var bgMusic = game.add.audio('bgMusic');
            // 循环播放背景音乐
            bgMusic.loopFull();
            // 缓存其他音乐
            var scoreMusic = game.add.audio('scoreMusic');
            var bomMusic = game.add.audio('bomMusic');
            
              // 添加背景
              var bg = game.add.image(0, 0, 'bg');
              bg.width = game.world.width;
              bg.height = game.world.height;
  
              var title = game.add.text(game.world.centerX, game.world.height * 0.25, '接苹果',{
                  fontSize: '40px',
                  fontWeight: 'bold',
                  fill: '#f2bb15'
              });
              title.anchor.setTo(0.5, 0.5);
  
              var remind = game.add.text(game.world.centerX, game.world.centerY, '点击任意位置开始',{
                  fontSize: '20px',
                  fill: '#f2bb15'
              });
              remind.anchor.setTo(0.5, 0.5);
  
              // 主角
              var man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'dude');
              var manImage = game.cache.getImage('dude');
              man.width = game.world.width * 0.2;
              man.height = man.width/manImage.width * manImage.height;
              man.anchor.setTo(0.5, 0.5);

              // 添加分数
              var scoreText = game.add.text(game.world.centerX, game.world.height * 0.2, '0', {
                fontSize: '40px',
                fontWeight: 'bold',
                fill: '#f2bb15'
              });
              scoreText.anchor.setTo(0.5, 0.5);

              // 移动，滑动监听
              var touching = false;// 消除pc端和移动端触发差异
              game.input.onDown.add(function (pointer) {
                  if(Math.abs(pointer.x - man.x) < man.width/2){
                      touching = true;
                  }
              })
              game.input.onUp.add(function () {
                  touching =  false;
              })
              game.input.addMoveCallback(function(pointer, x, y, isTap) {
                  if(!isTap && touching) {
                      man.x = x;
                  }
              })
  
        }
        
    },
    // 游戏结束
    over: function () {
        this.create = function () {
            this.stage.backgroundColor = '#372';
            setTimeout(function() {
                alert('game over');
            }, 2000);
        }
        
    }
};

// 添加场景到游戏实例中
Object.keys(states).map(function(key) {
    game.state.add(key, states[key]);
})

// 启动游戏
game.state.start('preload');