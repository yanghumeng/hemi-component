/**
 *
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
