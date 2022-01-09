// 计分牌的类
class ScorePanel {
  score = 0;
  level = 1;
  scoreEle:HTMLElement;
  levelEle:HTMLElement;

  // 设置最大的等级限制
  maxlevel:number;
  // 分数升级的限制
  upScore:number;

  constructor(maxlevel:number = 10,upScore:number=10) {
    this.maxlevel = maxlevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
  }

  addScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    if(this.score % this.upScore === 0) {
      this.addLevel();
    }
  }

  addLevel() {
    if(this.level  < 10) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel