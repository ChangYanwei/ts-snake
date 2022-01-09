// 定义食物类
class Food {
  // 定义一个属性表示食物所对应的元素
  element:HTMLElement;
  constructor() {
    this.element = document.getElementById('food')!;
  }

  // 获取食物x轴坐标
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 蛇每次移动一格（蛇的大小10），要求食物的位置必须是10的整倍数
    const left = Math.round(Math.random()*29) * 10;
    const top = Math.round(Math.random()*29) * 10;
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }

}

export default Food;