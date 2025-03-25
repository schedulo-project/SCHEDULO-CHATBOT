import React, { useState } from "react";

const AddWidget = (props) => {
  const actions = props.actions;

  // 버튼 클릭 후 상태를 관리하기 위한 state
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAdd = () => {
    // 여기에 api 통신이 와도 되고 아니면 action에 와도 되는데 action의 코드가 길어지므로 여기에 두는 것이 좋아보임
    actions.handleAddRequest(); // actionProvider 메서드를 호출하여 행동 트리거
    setIsDisabled(true); // '추가' 버튼을 비활성화
  };

  const handleCancel = () => {
    actions.handleAddCancel(); // 챗봇에 메시지 추가
    setIsDisabled(true); // '취소' 버튼을 비활성화
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={handleAdd} disabled={isDisabled}>
        추가
      </button>
      <button onClick={handleCancel} disabled={isDisabled}>
        취소
      </button>
    </div>
  );
};

export default AddWidget;
