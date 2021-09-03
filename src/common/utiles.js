/**
 * 防抖函数
 */
export function debounce(func, delay) {
  //记录有没有定时器
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}
