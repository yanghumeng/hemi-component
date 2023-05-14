import { Button } from 'antd';
import React, { useState, useEffect, ReactNode } from 'react';
import './index.less';

interface ModalProps {
  children: ReactNode | HTMLElement;
  title?: string;
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
}
const Modal = (props: ModalProps) => {
  const { title, children, onOk, onCancel } = props;
  const [cancelText] = useState(props?.cancelText || '取消');
  const [okText] = useState(props?.okText || '确定');
  const [visible, setVisible] = useState(props?.visible || false);
  useEffect(() => {
    setVisible(props?.visible);
  }, [props?.visible]);
  return (
    <>
      {visible ? (
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button type="default" style={{ marginRight: '20px' }} onClick={onCancel}>
              {cancelText}
            </Button>
            <Button type="primary" onClick={onOk}>
              {okText}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
