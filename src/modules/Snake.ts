class Snake {
  // 蛇的容器
  element:HTMLElement = document.getElementById('snake')!;
  // 蛇头
  head: HTMLElement;
  // 蛇的身体（包括蛇头）
  body: HTMLCollection;

  constructor() {
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.body = this.element.getElementsByTagName('div');
  }

  // 获取蛇头的X坐标
  get X() {
    return this.head.offsetLeft;
  }
  
  // 获取蛇头的Y坐标
  get Y() {
    return this.head.offsetTop;
  }

  set X(value:number) {
    if(this.X === value) return;
    if(value < 0 || value > 290) {
      // 蛇撞墙
      throw new Error('蛇撞墙了，游戏结束')
    }

    // 应该先移动身体，再移动蛇头，这个顺序不能反了
    this.moveBody();
    this.head.style.left = value + 'px';

    // 蛇头和身体都移动到位置之后再判断是否相撞
    this.checkHeadBody();
  }

  set Y(value:number) {
    if(this.Y === value) return;
    if(value < 0 || value > 290) {
      // 蛇撞墙
      throw new Error('蛇撞墙了，游戏结束')
    }
    
    this.moveBody()
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }

  // 添加身体
  addBody() {
    this.element.insertAdjacentHTML('beforeend','<div></div>');
  }

  // 移动身体
  moveBody() {
    /**
     * 将后边的身体设置为前边的身体的位置
     * 第4节 = 第3节的位置
     * 第3节 = 第2节的位置
     * 第2节 = 蛇头的位置
     */
    for(let i = this.body.length - 1;i > 0;i--) {
      let X = (this.body[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.body[i - 1] as HTMLElement).offsetTop;
      
      (this.body[i] as HTMLElement).style.left = X + 'px';
      (this.body[i] as HTMLElement).style.top = Y + 'px';
    }

  }

  // 检查蛇头是否撞到身体
  checkHeadBody() {
    for(let i = 1;i < this.body.length;i++) {
      const element = this.body[i] as HTMLElement;
      if(element.offsetLeft === this.X && element.offsetTop === this.Y) {
        throw new Error('蛇撞到自己身体，游戏结束')
      }
    }
  }


}

export default Snake