import React, { useEffect, useState } from 'react';
import { Upload, Modal, Input, UploadFile, Image } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { UploadProps } from 'antd/lib/upload';

export interface InputUploadProps extends UploadProps {
  /**输入框样式 */
  inputStyle?: React.CSSProperties;
  /** input上传自定义接口  */
  inputRequest: (param?: object) => Promise<any>;
  /** 图片样式 */
  imgStyle?: React.CSSProperties;
  /** 可控数量,默认是上传一个*/
  len?: number;
  /**图片回显 */
  fileList?: Array<UploadFile>;
  /**上传控件的显示标题 */
  title?: string | React.ReactNode;
  /**预览框的宽度 */
  modalWidth?: number;
}
export default function UploadPicture(props: InputUploadProps & UploadProps) {
  const { len = 1, onChange, title, inputStyle = {} } = props;
  const { inputRequest } = props;
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);
  const [results, setResults] = useState<any>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreViewImage] = useState();
  const [scaleStep, setScaleStep] = useState(0.5);
  const [inputValue, setInputValue] = useState<string>();
  const [uploading, setuploading] = useState(false);
  useEffect(() => {
    setFileList(props?.fileList ? props.fileList : []);
    setResults(props?.fileList ? props.fileList : []);
  }, [props?.fileList]);

  useEffect(() => {
    onChange && onChange(results);
    if (results.length == 0) {
      setInputValue('');
    }
  }, [results]);

  /** 文件转化成64位 */
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  /** 图片预览 */
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreViewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  /** 改变图片的回调 */
  const handleChange = (info: any) => {
    if (info.fileList.length <= len) {
      let resultarr = info.fileList;
      let oldarr = resultarr.filter(
        (item: any) => item.status === 'done' || item.status === 'success',
      );
      if (oldarr.length == resultarr.length) {
        for (let index = 0; index < resultarr.length; index++) {
          let element = resultarr[index];
          const { percent, status, name, type } = element;
          if (status === 'done' && percent == 100) {
            const file = new window.File([element], name, {
              type: type,
            });
            const formData = new FormData();
            formData.append('file', file);
            inputRequest(formData)
              .then((response: any) => {
                if (response.f > 0) {
                  element.status = 'success';
                  element.res = response.d;
                  setResults([...resultarr]);
                } else {
                  element.status = 'error';
                }
              })
              .catch(() => {
                element.status = 'error';
              });
          }
        }
      }
      if (info.file.status === 'removed') {
        setResults([...resultarr]);
      }
      if (info.file.status === 'error') {
        message.error('有文件上传失败,请重试');
      }
      resultarr = resultarr.filter((el: any) => el.status !== 'error');
      setFileList([...resultarr]);
    }
  };

  /** 上传之前的回调 */
  const beforeUpload = async (_: any, fileListU: any) => {
    return !outLimit([...fileList, ...fileListU], len);
  };
  /**是否查出数量限制 */
  const outLimit = (fileList: Array<any>, len: number) => {
    if (fileList.length > len) {
      message.warning(`文件数量限制${len}`);
      return true;
    }
    return false;
  };

  /** 粘贴快捷键的回调 */
  const onPaste = async (e: any) => {
    if (uploading) {
      message.warning(`已有文件正在上传`);
      return;
    }
    if (len >= 2 && fileList.length >= len) {
      message.warning(`文件数量限制${len}`);
      return;
    }
    /** 获取剪切板的数据clipboardData */
    let clipboardData = e?.clipboardData || e?.originalEvent?.clipboardData,
      i = 0,
      items,
      item,
      types;
    /** 为空判断 */
    if (clipboardData) {
      items = clipboardData.items;
      if (!items) {
        return;
      }
      item = items[0];
      types = clipboardData.types || [];
      /** 遍历剪切板的数据 */
      for (; i < types.length; i++) {
        if (types[i] === 'Files') {
          item = items[i];
          break;
        }
      }
      /** 判断文件是否为图片 */
      if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
        setuploading(true);
        const imgItem = item.getAsFile();
        const newFileList = cloneDeep(results);
        const listItem = {
          ...imgItem,
          status: 'uploading',
          url: await getBase64(imgItem),
        };
        const file = new window.File([imgItem], imgItem.name, {
          type: imgItem.type,
        });
        const formData = new FormData();
        formData.append('file', file);
        inputRequest &&
          inputRequest(formData).then((res: any) => {
            const data = res?.data || res;
            if (data && data?.f >= 1) {
              listItem.status = 'success';
              listItem.res = data?.d;
              if (len === 1) {
                setFileList([listItem]);
                setResults([listItem]);
                setuploading(false);
                setInputValue(imgItem.name);
                return;
              }
              setInputValue(imgItem.name);
              newFileList.push(listItem);
              setFileList(newFileList);
              setResults(newFileList);
            } else {
              message.error('上传失败,请重试');
            }
            setuploading(false);
          });
      }
    }
  };
  /** 上传图片的文案 */
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{title || '图片上传'}</div>
    </div>
  );

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Input
          style={inputStyle}
          onPaste={onPaste}
          value={inputValue}
          placeholder="请将图片粘贴到这里上传"
          suffix={uploading ? <LoadingOutlined /> : ''}
          allowClear
        ></Input>
      </div>
      <Upload
        {...props}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        maxCount={len}
      >
        {fileList.length >= len ? null : uploadButton}
      </Upload>
      <Image
        width={200}
        style={{ display: 'none' }}
        src={previewImage}
        preview={{
          visible: previewVisible,
          scaleStep,
          src: previewImage,
          onVisibleChange: (value) => {
            setPreviewVisible(value);
          },
        }}
      />
    </>
  );
}
