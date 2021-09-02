export default function debounce(fn, ...arg) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...arg);
    }, 300)
  }
}