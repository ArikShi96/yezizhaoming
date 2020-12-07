export async function toUnionImage(url, ranges) {
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = scale * ranges[2];
  canvas.height = scale * ranges[3];
  const ctx = canvas.getContext("2d");
  const image = await loadImage(url);
  // document.body.appendChild(canvas);
  ctx.drawImage(
    image,
    ranges[0],
    ranges[1],
    ranges[2],
    ranges[3],
    0,
    0,
    scale * ranges[2],
    scale * ranges[3]
  );
  return canvas.toDataURL("image/png");
}
export function loadImage(url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      throw Error("加载图片失败");
    };
    img.src = url;
    img.crossOrigin = "Anonymous";
  });
}
export function waitImageLoad(img) {
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}
export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
export function getRanges(metas) {
  const points = getAllPoints(metas);
  const left = Math.min(...points[0]);
  const top = Math.min(...points[1]);
  const right = Math.max(...points[0]);
  const bottom = Math.max(...points[1]);
  return [
    Math.floor(left),
    Math.floor(top),
    Math.floor(right - left) + 1,
    Math.floor(bottom - top) + 1,
  ];
}
// 获取所有点的坐标
function getAllPoints(metas) {
  let allPoints = metas
    .map((meta) => {
      return getAllPoint(meta);
    })
    .flat(3);
  const offsetLefts = allPoints.filter((point, index) => {
    return index % 2 === 0;
  });
  const offsetTops = allPoints.filter((point, index) => {
    return index % 2 === 1;
  });
  return [offsetLefts, offsetTops];
}
function getAllPoint(meta) {
  const { offsetX, offsetY, width, height } = meta;
  return [
    getPoint(meta, offsetX, offsetY),
    getPoint(meta, offsetX + width, offsetY),
    getPoint(meta, offsetX, offsetY + height),
    getPoint(meta, offsetX + width, offsetY + height),
  ];
}
function getPoint(meta, x, y) {
  const { offsetX, offsetY, width, height, rotate } = meta;
  const xCenter = offsetX + width / 2;
  const yCenter = offsetY + height / 2;
  return [
    (x - xCenter) * Math.cos(radian(rotate)) -
      (y - yCenter) * Math.sin(radian(rotate)) +
      xCenter,
    (x - xCenter) * Math.sin(radian(rotate)) +
      (y - yCenter) * Math.cos(radian(rotate)) +
      yCenter,
  ];
}
// 获取弧度
function radian(rotate) {
  return ((2 * Math.PI) / 360) * (360 - rotate);
}
// 客户端
export function isiOS() {
  const u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}
export function isIframe() {
  return window.top !== window;
}
