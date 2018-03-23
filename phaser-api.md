## 创建实例

```
new Phaser.Game(width, height, Phaser.AUTO, '#game');
```

## 场景

每一个场景都是一个方法

- 加载场景 preload

- 开始场景 created

- 游戏场景 play

- 结束场景 over

```
created: function(){}
```

### 添加场景

```
game.state.add('over', function() {});
```

### 开始场景

```
game.state.start('play');
```

## 场景-生命周期

每个场景都有自己的生命周期

- preload - 尽管我们有预加载的场景，但如果你希望能缩短进入页面时加载的时间，可以分摊一些到其他场景，只需要在其他场景加入preload方法即可。

- create - 如果存在preload方法，则会在加载完毕后执行此方法；否则将在进入该场景时直接执行此方法。

- update - 更新周期自动执行的方法，例如在play场景的update方法中可以去检测两个物体是否有接触。

- render - 渲染完毕后执行的方法，例如可以在此方法中勾勒出物体的边缘，来方便观察物体的碰撞区域。

```
play: function() {
    this.create = function() {
        // TO-DO
        game.stage.backgroundColor = '#444';
        setTimeout(function() {
            game.state.start('over');
        }, 3000);
    }
}
```

## 启动游戏

```
game.state.start('preload');
```

## Phaser.Loader

用来加载游戏资源

### 加载资源

- 加载图片

```
game.load.image('star', 'star.png');
```

- 加载音频

```
game.load.audio('bg', 'bg.mp3)');
```

- 加载图片序列

由于要指定帧的宽高，因此一般是动画的连续帧，例如行走动画的每一帧合成的图片。

```
game.load.spritesheet('walk', 'walk.png', 80, 80);
```

- 加载资源集合

包括一个json和一张合成的图片，json描述了合成图片中每张图片的宽高位置等信息

```
game.load.altasJSONArray('fly', 'fly.png', 'fly.json');
```



### 加载完成监听

- 监听加载完一个文件的事件

```
game.load.onFileComplete.add(function(process) {
   
})
```

- 监听加载完成

```
game.load.onLoadComplete.add(function() {
     
})
```

## game.add

用来快速创建常用的游戏对象

- 添加背景

```
game.add.image(0, 0, 'bg');// bg是game.load.xxx()中对应的key名
```

- 添加文字

```
game.add.text(game.world.centerX, game.world.centerY, '开始游戏',{
    fontSize: '20px',
    fill: '#f2bb15'
});
```

- 加载游戏精灵

```
sprite(x, y, key, frame, group)
```

## Phaser.Input

输入事件管理器，包括鼠标，键盘，触摸，MSPointer等触发事件。

- onTap：点击事件

- onDown：对应touchstart/mousedown

- onUp：对应touchend/mouseup

- onHold：长按事件

- addMoveCallback(callback): 监听滑动事件, callback回调参数：pointer移动点对象，x pointer的x坐标，y pointer的y坐标，isTap是否是“点击”事件的结果。pc端鼠标移上去即触发，移动端需要触摸后触发

- deleteMoveCallback: 移除滑动监听事件



## 其他对象

### game.world

游戏页面对象，可以调用页面宽高，中心点

```
game.world.centerX
game.world.centerY
game.world.width
game.world.height
```

### game.cache
获取对象，可以通过唯一的key获取到缓存中的图像、声音、视频、JSON等。获取到不是副本，修改对象其他使用该对象的地方也会跟着改变
通过phaser.loader可以缓存各种资产对象。

```
game.cache.getImage('people');
```

