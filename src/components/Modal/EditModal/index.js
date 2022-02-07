import {useRef, useCallback} from 'react';
import './index.scss';
import Modal from "../";
import { formatDateTime } from "../../../libs/utils";

function EditModal (props) {

  const { isShowEditModal, data, submitEdit } = props,
        inputRef = useRef(),
        checkRef = useRef();

  const formatNewData = useCallback(() => {
    const val = inputRef.current.value.trim(),
          valLen = val.length;
    if (valLen === 0) {
      inputRef.current.value = data.content;
      return;
    }
    const newData = {
      id: new Date().getTime(),
      content: val,
      completed: checkRef.current.checked
    }
    submitEdit(newData, data.id)
  }, [submitEdit, data])

  return (
    <Modal
      isShowModal={isShowEditModal}
      modalTitle="编辑事件"
    >
      <p className='topic'>时间：{formatDateTime(data.id)}</p>      
      <p className='topic'>
        <textarea className='text-area' ref={inputRef} defaultValue={data.content}></textarea>
      </p>

      <p className='topic'>状态：
        <input ref={checkRef} type="checkbox" defaultChecked={data.completed ? true : false} />
      </p>
      <button className='btn btn-primary comfirm-btn' onClick={formatNewData}>提交</button>
    </Modal>
  );
}

export default EditModal;