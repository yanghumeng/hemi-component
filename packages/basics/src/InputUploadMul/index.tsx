import React, { useEffect, useRef, useState } from 'react';
import { Upload, Input, UploadFile, Image } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { UploadProps } from 'antd/lib/upload';

export interface InputUploadProps extends UploadProps {
  /**输入框样式 */
  inputStyle?: React.CSSProperties;
  /** input上传自定义接口  */
  req: (param?: object) => Promise<any>;
  /** 可控数量,默认是上传一个*/
  len?: number;
  /**图片回显 */
  fileList?: Array<UploadFile>;
  /**上传控件的显示标题 */
  title?: string | React.ReactNode;
  /**图片改变的回调 */
  callback?: (param?: object) => void;
}
export default function UploadPicture(props: InputUploadProps & UploadProps) {
  const { len = 1, callback, title, inputStyle = {}, fileList = [] } = props;
  const { req } = props;
  const newFileList = useRef<any>(fileList || []);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreViewImage] = useState();
  const [scaleStep, setScaleStep] = useState(0.5);
  const [inputValue, setInputValue] = useState<string>();
  const [uploading, setuploading] = useState(false);
  useEffect(() => {
    callback?.(newFileList.current);
  }, [newFileList.current]);

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
      file.preview = await file?.url;
    }
    setPreViewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  // 文件移出
  const handleRemove = async (file: any) => {
    let filelist = newFileList.current.filter((item: any) => item.uid != file.uid);
    newFileList.current = filelist;
  };
  const customRequest = (e: any) => {
    upload(e.file);
  };
  /** 粘贴快捷键的回调 */
  const onPaste = (e: any) => {
    if (uploading) {
      message.warning(`已有文件正在上传`);
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
        const imgItem = item.getAsFile();
        const file = new window.File([imgItem], imgItem.name, {
          type: imgItem.type,
        });
        upload(file, 'onPaste');
      }
    }
  };
  const upload = (file: File, type?: string) => {
    if (len >= 2 && newFileList.current.length >= len) {
      message.warning(`文件数量限制${len}`);
      return;
    }
    setuploading(true);
    const formData = new FormData();
    formData.append('file', file);
    req?.(formData)
      .then(async (response: any) => {
        let element = { status: 'uploading', res: '', url: await getBase64(file) };
        const data = response?.data || response;
        if (data?.f > 0) {
          element.status = 'success';
          element.res = data;
          if (len > 1) newFileList.current = [...newFileList.current, element];
          else {
            newFileList.current = [element];
          }
          if (type == 'onPaste') setInputValue(file.name);
          setuploading(false);
        } else {
          message.error('上传失败,请重试');
          setuploading(false);
        }
      })
      .catch(() => {
        message.error('上传失败,请重试');
        setuploading(false);
      });
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
        fileList={newFileList.current}
        onPreview={handlePreview}
        onRemove={handleRemove}
        maxCount={len}
        customRequest={customRequest}
      >
        {newFileList?.current?.length >= len ? null : uploadButton}
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
