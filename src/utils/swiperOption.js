export default {
  notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
  direction: "horizontal", //水平方向移动
  grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
  setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
  autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
  slidesPerView: 1, //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
  mousewheel: false, //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
  mousewheelControl: false, //同上
  height: window.innerHeight, // 高度设置，占满设备高度
  resistanceRatio: 0, //抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
  observeParents: true, //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
  // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
  debugger: true,
  // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
  onTransitionStart(swiper) {
    console.log(swiper);
  },
};
