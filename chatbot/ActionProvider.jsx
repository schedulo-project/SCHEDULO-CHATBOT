import React from "react";

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
}) => {
  //데이터가 부족할 시 나오는 메세지
  const handleDefault = () => {
    const botMessage = createChatBotMessage(
      "질문에 데이터가 부족합니다. 다시 입력해주세요."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  //조회된 일정을 보여주는 메세지
  const handleCheck = ({ data }) => {
    const botMessage = createChatBotMessage(
      "조회된 일정은 다음과 같습니다.",
      {
        widget: "checkWidget",
        widgetProps: {
          scheduleData: data, // 데이터를 위젯에 넘긴다
        },
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  //일정 추가를 시작하는 메세지
  const handleAdd = ({ data }) => {
    const botMessage = createChatBotMessage(
      `${data.date}에 "${data.details}" 일정 ${data.method}하시겠습니까?`,
      {
        widget: "addWidget",
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  //일정 추가 경우에 따른 코드
  const handleAddRequest = () => {
    const botMessage = createChatBotMessage("일정이 추가되었습니다.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleAddCancel = () => {
    const botMessage = createChatBotMessage(
      "일정 등록이 취소 되었습니다.."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  //일정 삭제에 대한 코드
  const handleDelete = () => {
    const botMessage = createChatBotMessage(
      "삭제할 일정을 선택해주세요.(복수 선택 가능)"
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  //일정 수정에 대한 코드

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleCheck,
            handleAdd,
            handleAddRequest,
            handleAddCancel,
            handleDelete,
            handleDefault,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
