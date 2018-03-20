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

### 启动游戏

```
game.state.start('preload');
```