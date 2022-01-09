import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

// 游戏的控制器，控制其它的所有类
class GameControl {
  snake:Snake;
  food:Food;
  scorePanel:ScorePanel;
  // 蛇的移动方向
  direction:string;
  // 游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10,5);
    this.direction = 'ArrowRight';
    this.init();
  }

  // 游戏的初始化方法，调用后游戏就开始 
  init() {
    document.addEventListener('keydown',this.keydownHandler.bind(this));
    this.run();
  }

  // 键盘按下的响应函数
  keydownHandler(e:KeyboardEvent) {
    // 禁止掉头
    switch (e.key) {
      case 'ArrowUp':
        this.direction = this.direction !== 'ArrowDown'? 'ArrowUp':'ArrowDown';
        break;
      case 'ArrowRight':
        this.direction = this.direction !== 'ArrowLeft'? 'ArrowRight':'ArrowLeft';
        break;
      case 'ArrowDown':
        this.direction = this.direction !== 'ArrowUp'? 'ArrowDown':'ArrowUp';
        break;
      case 'ArrowLeft':
        this.direction = this.direction !== 'ArrowRight'? 'ArrowLeft':'ArrowRight';
        break;
    }
  }

  // 蛇移动
  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction) {
      case 'ArrowUp':
        Y -= 10;
        break;
      case 'ArrowDown':
        Y += 10;
        break;
      case 'ArrowRight':
        X += 10;
        break;
      case 'ArrowLeft':
        X -= 10;
        break;
    }

    // 检查是否吃到食物
    this.checkEatFood(X,Y)

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    }catch(e) {
      alert(e.message);
      this.isLive = false;
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 检查蛇是否吃到了食物
  checkEatFood(X:number,Y:number) {
    if(this.food.X === X && this.food.Y === Y) {
      // 改变食物的位置
      this.food.change();
      // 增加分数
      this.scorePanel.addScore()
      // 蛇的身体增加一部分
      this.snake.addBody();
    }
  }
}

export default GameControl
