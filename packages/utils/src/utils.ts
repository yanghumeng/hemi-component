/**
 *获取逻辑的参数
 * @param url 路径
 * @param key 关键字
 * @returns
 */
export function getUrlParams(url: string, key?: string) {
  const paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
  let paraObj = <any>{};
  for (let i of paraString) {
    paraObj[i.substring(0, i.indexOf('=')).toLowerCase()] = i.substring(
      i.indexOf('=') + 1,
      i.length,
    );
  }
  if (typeof paraObj == 'undefined') {
    return '';
  } else if (key) {
    return paraObj[key.toLowerCase()];
  } else {
    return paraObj;
  }
}

export function digitUppercase(num: string | number) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let head = num < 0 ? '欠' : '';
  num = Math.abs(Number(num));
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j++) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
}
