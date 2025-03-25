// in MessageParser.js
import React, { act } from "react";
import { data } from "react-router-dom";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    //여기에 message를 백엔드 api로 보내는 코드를 작성한다.
    //그러고 ExData에 백엔드에서 받은 데이터를 저장한다.
    const ExData = {
      tag: "시스템프로그래밍",
      date: "2025-03-21",
      method: "등록",
      details: "과제",
    };

    //조회 목업 코드
    const ExCheckData = {
      "2025-02-20": {
        공부: [
          {
            id: 1,
            name: "알고리즘 문제 풀기",
            content: "알고리즘 문제 풀이 연습",
            scheduled_date: "2025-02-20",
            deadline: null,
            is_completed: false,
            order_num: null,
            user: 1,
          },
          {
            id: 2,
            name: "React 공부하기",
            content: "React 기본 문법 학습",
            scheduled_date: "2025-02-20",
            deadline: null,
            is_completed: false,
            order_num: null,
            user: 1,
          },
        ],
        시험: [
          {
            id: 3,
            name: "시험 준비하기",
            content: "시험을 준비하는 문제 풀이",
            scheduled_date: "2025-02-20",
            deadline: null,
            is_completed: false,
            order_num: null,
            user: 1,
          },
        ],
        "소공 공부": [
          {
            id: 4,
            name: "소공 3장 공부",
            content: "소프트웨어 공학 3장 이론 공부",
            scheduled_date: "2025-02-20",
            deadline: null,
            is_completed: false,
            order_num: null,
            user: 1,
          },
        ],
      },
      "2025-02-21": {
        공부: [
          {
            id: 5,
            name: "자료구조 복습",
            content: "자료구조 개념 및 코드 복습",
            scheduled_date: "2025-02-21",
            deadline: null,
            is_completed: false,
            order_num: null,
            user: 1,
          },
        ],
        프로젝트: [
          {
            id: 6,
            name: "웹 프로젝트 기능 추가",
            content: "로그인 기능 개선 및 UI 수정",
            scheduled_date: "2025-02-21",
            deadline: null,
            is_completed: false,
            order_num: null,
            user: 1,
          },
        ],
        "소공 공부": [
          {
            id: 7,
            name: "소공 4장 공부",
            content: "소프트웨어 공학 4장 이론 공부",
            scheduled_date: "2025-02-21",
            deadline: null,
            is_completed: false,
            order_num: null,
            user: 1,
          },
        ],
      },
    };

    if (ExData.method === "조회") {
      //사용자 조회 api
      //ApiCheck(ExData, actions);

      //아래는 조회 목업 코드 -> 통신 없이 바로 연결되게 해둠
      actions.handleCheck({ data: ExCheckData });
    } else if (ExData.method === "등록") {
      //사용자 추가 api
      actions.handleAdd({ data: ExData });
    } else if (ExData.method === "수정") {
      //여기에 action이 와야된다.
    } else if (ExData.method === "삭제") {
      //여기에 action이 와야된다.
    } else {
      actions.handleDefault();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

//통신 부분
//일정 조회 부분
//전체는 일정을 어떻게 설정할지 미정
const ApiCheck = async (data, actions) => {
  try {
    const response = await fetch("통신할 서버 주소", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // ExData를 서버로 전송
    });

    const ExCheckData = await response.json();
    // 서버에서 받은 응답을 처리
    actions.handleCheck({ data: ExCheckData });
  } catch (error) {
    console.error("백엔드 오류:", error);
    actions.handleDefault();
  }
};

export default MessageParser;

//사용자의 메세지를 받고 메세지를 분석하여 알맞은 동작을 수행한다.
//action.handleHello()는 사용자가 hello라는 단어를 입력했을 때 실행되는 함수이다.
//action.handleDefault()는 사용자가 hello라는 단어를 제외한 다른 단어를 입력했을 때 실행되는 함수이다.
//action에 대한 정보는 ActionProvider에서 받아온다.
