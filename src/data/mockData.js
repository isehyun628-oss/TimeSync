/* 백엔드 연결 전 화면 동작을 확인하기 위한 임시 데이터 */
export const currentUser = {
    id: 1,
    nickname: '로그인 사용자',
};

export const inviteGroup = {
    id: 3,
    name: '테스트 그룹',
    icon: '⭐',
    ownerNickname: '생성자 닉네임',
    startDate: '26/07/31',
    endDate: '26/08/07',
    participants: [
        { id: 1, name: '참가자1' },
        { id: 2, name: '참가자2' },
        { id: 3, name: '참가자3' },
    ],
};

export const initialGroups = [
    {
        id: 1,
        icon: '📝',
        name: '기획 스터디',
        members: 4,
        startDate: '26/04/30',
        endDate: '26/05/01',
        isOwner: false,
    },
    {
        id: 2,
        icon: '📖',
        name: '알고리즘 스터디',
        members: 5,
        startDate: '26/05/03',
        endDate: '26/05/10',
        isOwner: true,
    },
];
