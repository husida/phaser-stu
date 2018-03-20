var width = window.innerWidth;
var height = window.innerHeight;

// 创建实例
var game = new Phaser.Game(width, height, Phaser.auto, '#game');

// 定义场景
var states = {
    // 加载
    preload: function () {
        console.log('preload');
        this.create = function () {
            this.stage.backgroundColor = '#aaa';
            setTimeout(function() {
                this.game.state.start('created');
            }, 2000);
        }
    },
    // 开始
    created: function () {
        console.log('created');
        this.create = function () {
            this.stage.backgroundColor = '#444';
            setTimeout(function() {
                this.game.state.start('play');
            }, 2000);
            
        }
    },
    // 游戏中
    play: function () {
        console.log('play');
        this.create = function () {
            this.stage.backgroundColor = '#888';
            setTimeout(function() {
                this.game.state.start('over');
            }, 2000);
        }
        
    },
    // 游戏结束
    over: function () {
        console.log('over');
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