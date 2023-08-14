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

/**
 * 大写金额
 * @param num 值
 * @returns
 */
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

/**
 * 复制内容
 * @param {String} value 需要复制的内容
 */
export function copyCot(value: any) {
  try {
    const el = document.createElement('textarea');
    el.value = value;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 字符串优先级匹配
 * @param str 匹配字符
 * @param strArr 匹配数组
 * @param targetParam 属性目标
 * @returns
 */
export function paramMatching(str: string, strArr: Array<any>, targetParam: string) {
  let matchName = '';
  let maxMatchLength = 0;
  for (let i = 0; i < strArr.length; i++) {
    if (str.startsWith(strArr[i][targetParam]) && strArr[i][targetParam].length > maxMatchLength) {
      matchName = strArr[i];
      maxMatchLength = strArr[i][targetParam].length;
    }
  }

  return matchName;
}
