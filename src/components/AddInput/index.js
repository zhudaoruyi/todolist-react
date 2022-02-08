import { useRef, useEffect } from "react";

import './index.scss';

function AddInput (props) {

  
  const { isInputShow, addItem } = props,
        inputRef = useRef();
  
  // 输入框获取焦点
  useEffect(() => {
    if (isInputShow) {
      inputRef.current.focus()
    }
  }, [isInputShow])

  const submitValue = () => {
    const inputValue = inputRef.current.value.trim();

    if (inputValue.length === 0) {
      return;
    }

    addItem(inputValue);
    inputRef.current.value = '';
  }

  return (
    <>
    {
      isInputShow ? (
        <div className="input-wrapper">
          <input type="text" ref={inputRef} placeholder="请输入待办事件"></input>
          <button className="btn btn-primary" onClick={submitValue}>增加</button>
        </div>
      ) : ''
    }
    </>
  );
}

export default AddInput;