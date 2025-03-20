const apiKey = "AIzaSyCXDlPk5Pp5hYxZQ-bhc-vVbj6NvCAt3Sc"; // 보안상 가림

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

// Gemini API 호출 함수
async function getGeminiChatResponse(userMessage) {
  const prompt = `
    사용자의 요청을 분석하여 필요한 정보를 JSON 형식으로 추출하세요.

    규칙:
    - 'type'은 사용자의 요청 유형을 나타내며, ['시험 일정', '과제 목록', '기타'] 중 하나여야 합니다.
    - 'date'는 YYYY-MM-DD 형식이며, 특정 날짜가 명시되지 않으면 'unknown'으로 설정합니다.
    - 'action'은 사용자의 요청 의도를 나타내며, ['조회', '등록', '삭제'] 중 하나여야 합니다.
    - 'details'에는 사용자가 요청한 세부 사항을 포함합니다.

    예제 출력:
    사용자: "이번 주 시험 일정 알려줘"
    응답: {"type": "시험 일정", "date": "2025-03-17~2025-03-23", "action": "조회", "details": "이번 주 시험 일정"}

    사용자: "3월 21일 과제 추가"
    응답: {"type": "과제 목록", "date": "2025-03-21", "action": "등록", "details": "과제 추가"}

    사용자: "내일 있는 시험 삭제"
    응답: {"type": "시험 일정", "date": "2025-03-20", "action": "삭제", "details": "내일 시험 삭제"}

    지금부터 이 입력에 대한 JSON을 생성하세요: '${userMessage}'
  `;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// 메시지 전송 및 UI 업데이트 처리
async function handleSendMessage() {
  const inputField = document.getElementById("user-input");
  const chatOutput = document.getElementById("chat-output");
  const userMessage = inputField.value.trim();

  if (!userMessage) return;

  // 사용자 메시지 화면에 추가
  const userMsgDiv = document.createElement("div");
  userMsgDiv.textContent = `사용자: ${userMessage}`;
  chatOutput.appendChild(userMsgDiv);

  inputField.value = "";

  try {
    // Gemini 응답 받아오기
    const botResponse = await getGeminiChatResponse(userMessage);

    // 챗봇 응답 화면에 추가
    const botMsgDiv = document.createElement("div");
    botMsgDiv.textContent = `챗봇: ${botResponse}`;
    chatOutput.appendChild(botMsgDiv);

    // 스크롤 자동으로 하단으로 이동
    chatOutput.scrollTop = chatOutput.scrollHeight;
  } catch (error) {
    alert(`오류 발생: ${error.message}`);
  }
}

// 버튼 클릭 이벤트 설정
document
  .getElementById("send-btn")
  .addEventListener("click", handleSendMessage);

// Enter 키 이벤트 설정
document
  .getElementById("user-input")
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage();
  });
