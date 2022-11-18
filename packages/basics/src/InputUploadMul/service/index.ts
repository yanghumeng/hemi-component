import { request, getGlobalVariable } from '@dm-component-next/utils';
export const baseImageUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://pz3gw7eao.bkt.clouddn.com/'
    : 'http://img.duomai.com/';
export const baseUrl = getGlobalVariable().API_CONFIG_CPS_API_URL;
export const uploadOpenUrl = baseUrl + '/file/uploadOpen'; //公共
export const uploadPrivateUrl = baseUrl + '/file/upload'; //私有
export const uploadAccounting = baseUrl + '/accounting/upload'; //私有
//文件请求
export async function uploadOpen(url?: string, params?: any): Promise<any> {
  return request({
    method: 'post',
    url: url,
    // data: params
    data: params,
  });
}
/**
 * 查看公共文件或图片
 */
export const viewOpenFile = (name: string) => {
  //公共
  return baseImageUrl + name;
};
