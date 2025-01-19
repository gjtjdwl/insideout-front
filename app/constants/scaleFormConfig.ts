export const ORS_CONFIG = {
  title: '상담 전 체크리스트',
  description:
    '지난 일주일 동안의 상태를 평가해주세요.\n각 항목은 0점(매우 안좋음)부터 10점(매우 좋음) 사이로 답해주시면 됩니다.',
  questions: [
    {
      title: '개인적으로',
      description: '자신의 내면, 감정,\n개인으로서의 자신에 대해 어떠셨나요?',
    },
    {
      title: '대인관계',
      description: '가족, 친구 등\n가까운 관계에서는 어떠셨나요?',
    },
    {
      title: '사회적으로',
      description: '직장, 학교 등\n사회적 환경에서는 어떠셨나요?',
    },
    {
      title: '전반적으로',
      description: '위의 모든 것을 고려했을 때,\n전반적인 상태는 어떠셨나요?',
    },
  ],
};

export const SRS_CONFIG = {
  title: '상담 후 체크리스트',
  description:
    '오늘의 상담 세션에 대해 평가해주세요.\n각 항목은 0점(전혀 아니다)부터 10점(매우 그렇다) 사이로 답해주시면 됩니다.',
  questions: [
    {
      title: '이해와 경청',
      description: '상담사가 귀하의 이야기를\n잘 듣고 이해했다고 느끼시나요?',
    },
    {
      title: '주제와 목표',
      description: '오늘 다루고 싶으셨던 주제들을\n충분히 다룰 수 있었나요?',
    },
    {
      title: '상담 방식',
      description: '상담사의 접근 방식이\n귀하에게 도움이 되고 잘 맞았나요?',
    },
    {
      title: '전반적 평가',
      description: '전반적으로 오늘의 상담이\n귀하에게 도움이 되었나요?',
    },
  ],
};
