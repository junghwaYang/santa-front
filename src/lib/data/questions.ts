export type AnswerOption = {
  id: string;
  text: string;
  scores: {
    character: "SANTA" | "RUDOLPH" | "DWARF";
    modifier: "SELF_CARE" | "SOCIAL" | "HOMEBODY" | "EMOTIONAL" | "PLANNER";
  };
};

export type Question = {
  id: number;
  text: string;
  options: AnswerOption[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "[이름]님의 첫인상과 지금 알게 된 모습, 어떤 차이가 있나요?",
    options: [
      {
        id: "1-1",
        text: "처음엔 차가워 보였는데 알고 보니 다정해요",
        scores: { character: "DWARF", modifier: "EMOTIONAL" },
      },
      {
        id: "1-2",
        text: "처음부터 지금까지 한결같이 밝고 에너지 넘쳐요",
        scores: { character: "RUDOLPH", modifier: "SOCIAL" },
      },
      {
        id: "1-3",
        text: "처음엔 조용해 보였는데 알고 보니 개그맨이에요",
        scores: { character: "RUDOLPH", modifier: "EMOTIONAL" },
      },
      {
        id: "1-4",
        text: "처음부터 믿음직스럽고 듬직했어요",
        scores: { character: "SANTA", modifier: "SELF_CARE" },
      },
    ],
  },
  {
    id: 2,
    text: "모임이나 약속에서 [이름]님은 주로 어떤 역할인가요?",
    options: [
      {
        id: "2-1",
        text: "분위기 띄우고 다 웃기는 분위기 메이커",
        scores: { character: "RUDOLPH", modifier: "SOCIAL" },
      },
      {
        id: "2-2",
        text: "일정 조율하고 장소 정하는 총무 스타일",
        scores: { character: "SANTA", modifier: "PLANNER" },
      },
      {
        id: "2-3",
        text: "조용히 듣다가 핵심만 말하는 현자 포지션",
        scores: { character: "DWARF", modifier: "PLANNER" },
      },
      {
        id: "2-4",
        text: "모두 챙기고 배려하는 엄마/아빠 역할",
        scores: { character: "SANTA", modifier: "EMOTIONAL" },
      },
    ],
  },
  {
    id: 3,
    text: "[이름]님이 힘들거나 지쳤을 때, 어떤 모습일 것 같아요?",
    options: [
      {
        id: "3-1",
        text: "티 안 내고 혼자 삭이면서 버틸 것 같아요",
        scores: { character: "DWARF", modifier: "SELF_CARE" },
      },
      {
        id: "3-2",
        text: "친한 사람한테 연락해서 털어놓을 것 같아요",
        scores: { character: "RUDOLPH", modifier: "SOCIAL" },
      },
      {
        id: "3-3",
        text: "맛있는 거 먹거나 집에서 쉬면서 풀 것 같아요",
        scores: { character: "DWARF", modifier: "HOMEBODY" },
      },
      {
        id: "3-4",
        text: "운동이나 자기계발로 극복할 것 같아요",
        scores: { character: "SANTA", modifier: "SELF_CARE" },
      },
    ],
  },
  {
    id: 4,
    text: "[이름]님에게 선물한다면, 가장 어울리는 건 뭘까요?",
    options: [
      { id: "4-1", text: "다이어리나 플래너", scores: { character: "SANTA", modifier: "PLANNER" } },
      {
        id: "4-2",
        text: "파티용품이나 보드게임",
        scores: { character: "RUDOLPH", modifier: "SOCIAL" },
      },
      {
        id: "4-3",
        text: "편한 잠옷이나 담요",
        scores: { character: "DWARF", modifier: "HOMEBODY" },
      },
      {
        id: "4-4",
        text: "운동용품이나 건강식품",
        scores: { character: "SANTA", modifier: "SELF_CARE" },
      },
    ],
  },
  {
    id: 5,
    text: "10년 후 [이름]님은 어떤 모습일 것 같아요?",
    options: [
      {
        id: "5-1",
        text: "큰 회사 임원이나 사업가로 성공해 있을 것 같아요",
        scores: { character: "SANTA", modifier: "SELF_CARE" },
      },
      {
        id: "5-2",
        text: "가정적이고 따뜻한 가장이 되어 있을 것 같아요",
        scores: { character: "DWARF", modifier: "EMOTIONAL" },
      },
      {
        id: "5-3",
        text: "여전히 친구들 중심에서 모임 이끌고 있을 것 같아요",
        scores: { character: "RUDOLPH", modifier: "SOCIAL" },
      },
      {
        id: "5-4",
        text: "지금이랑 똑같이 편하고 소소하게 살고 있을 것 같아요",
        scores: { character: "DWARF", modifier: "HOMEBODY" },
      },
    ],
  },
];
