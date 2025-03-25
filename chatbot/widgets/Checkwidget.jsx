import React from "react";

const CheckWidget = ({ state }) => {
  const length = state.messages.length;
  const lastMessage =
    state.messages[length - 1]?.widgetProps?.scheduleData;

  //바뀐 형식에 따라 태그 부분을 방식을 수정해야됨
  return (
    <div>
      <h3>조회된 일정</h3>
      {Object.keys(lastMessage).map((date) => (
        <div key={date}>
          <h4>{date}</h4>
          {Object.keys(lastMessage[date] || {}).map((category) => (
            <div key={category}>
              <h5>{category}</h5>
              <ul>
                {(lastMessage[date]?.[category] || []).map(
                  (item, index) => {
                    if (typeof item === "object") {
                      return (
                        <li key={index}>
                          <strong>{item.name}</strong>{" "}
                        </li>
                      );
                    }
                    return <li key={index}>{item}</li>;
                  }
                )}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheckWidget;
