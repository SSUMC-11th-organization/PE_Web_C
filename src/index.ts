type StudyMember = {
  name: string;
  id: number;
  role: string;
  githubId? : string;
};

const member1: StudyMember = {
  name: "무니",
  id: 1,
  role: "web",
  githubId : "msuhyun"
};

const member2: StudyMember = {
  name: "광수",
  id: 2,
  role: "plan",
  githubId : "gwangsu"
};


const members : StudyMember[] = [member1,member2];

function searchMember(id: number): string {
    const member = members.find((m) =>m.id === id);

    if(!member){
        return `ID가 ${id}인 회원을 찾을 수 없습니다.`;
    }

    const githubInfo = member.githubId ? `Github: ${member.githubId}` : "GitHub: 없음";

    return `[회원 정보] 이름: ${member.name} (역할: ${member.role}) / ${githubInfo}`;
}

console.log(searchMember(1));   
console.log(searchMember(2));  
console.log(searchMember(999)); 