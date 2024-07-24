---
emoji:  👾
title: 'Job Creator와 Job Executor 패턴을 활용한 Firebase Functions'
date: '2024-07-23'
categories: issue
---

---

![](image.png)

> 🙌 **소개**

대규모 작업을 분할하고 효율적으로 관리하기 멤버십 일수에 따른 멤버십 등급 업데이트와 관련된 `Firebase Scheduled Function`을 구현하던 도중, 쿼리 작업의 복잡성으로 인해 실행 시간(540초)에 제한이 걸릴 것 같았습니다. 이를 해결하기 위해 **Job Creator → Job Executor 패턴**을 사용하기로 했습니다.

이 패턴은 대규모 작업을 분할하고 효율적으로 관리하기 위한 설계 패턴으로, 특히 Firebase Functions와 같이 실행 시간에 제한이 있는 환경에서 매우 유용합니다. 구체적으로, Job Creator는 업데이트할 사용자 목록을 분할하여 작업 큐에 저장하고, Job Executor는 이 큐에서 작업을 가져와 실행합니다. 이를 통해 대규모 작업을 여러 개의 작은 작업으로 나누어, 각 작업이 시간 제한 내에서 완료될 수 있도록 합니다. 이 글에서는 Firebase Functions를 이용하여 Job Creator와 Job Executor 패턴을 구현하는 방법을 설명하고, 이를 통해 회원 등급 업데이트 작업을 효율적으로 처리하는 예제를 소개하겠습니다.

> ✔️ **Job Creator는?**

주기적으로 실행되며, 처리할 작업(Job)을 생성하고 이를 대기열(Queue)에 추가합니다.

> ✔️ **Job Executor는?**

대기열에 쌓인 작업들을 순차적으로 실행하여 실제 처리를 합니다.

> 🤔 **왜 Job Creator와 Job Executor 패턴을 사용하는 걸까요?**

#### 👍 시간 제한 문제 해결

Firebase Functions와 같은 **서버리스 환경**에서는 각 함수의 실행 시간이 제한되어 있습니다. Job Creator와 Job Executor 패턴을 사용하면 작업을 작은 단위로 분할하여 각 단위 작업을 **독립적으로 처리**할 수 있습니다. 이를 통해 단일 작업의 실행 시간이 길어지더라도 각 작업이 제한된 시간 내에 완료될 수 있도록 보장할 수 있습니다.

#### 👍 시스템 부하 분산

한 번에 많은 양의 데이터를 처리하는 경우 시스템에 부하가 크게 걸릴 수 있습니다. Job Creator와 Job Executor 패턴을 사용하면 작업을 여러 개의 작은 작업으로 나누어 처리할 수 있습니다.

#### 👍 확장성

이 패턴을 사용하면 작업을 작은 단위로 나누어 독립적으로 실행할 수 있으므로, 시스템의 확장성이 크게 향상됩니다. 작업의 양이 증가하더라도 각 작업을 독립적으로 처리할 수 있으므로 전체 시스템의 성능에 큰 영향을 주지 않습니다.

#### 👍 실패 처리 용이성

작업을 작은 단위로 분할하면 개별 작업의 실패를 쉽게 감지하고 처리할 수 있습니다. 실패한 작업만 재처리할 수 있으므로, **전체 작업의 실패율을 낮추고** 안정성을 높일 수 있습니다.

#### 👍 코드 유지 보수성 향상

Job Creator와 Job Executor 패턴을 사용하면 각 작업의 생성과 실행을 명확하게 분리할 수 있습니다. 이는 코드의 유지 보수성을 향상시키고, 각 부분을 독립적으로 테스트하고 디버깅할 수 있게 합니다.

#### 👍 작업 우선순위 관리

이 패턴을 사용하면 작업의 우선순위를 쉽게 관리할 수 있습니다. Job Creator에서 작업을 생성할 때 우선순위를 설정하고, Job Executor에서 우선순위에 따라 작업을 실행할 수 있습니다. 이를 통해 중요한 작업을 우선적으로 처리할 수 있습니다.

> 👾 **어떻게 사용했는지 구현 예제를 살펴보겠습니다.**

#### 1️⃣ Job Creator: 작업 생성 함수

이 함수는 회원의 랭크 업데이트 작업을 생성합니다. 특정 조건을 만족하는 회원에 대해 'MemberRankJob' 콜렉션에 작업 문서를 추가합니다.

```jsx
async function processMemberBatch(members: FirebaseFirestore.QueryDocumentSnapshot[]): Promise<void> {
  const now = new Date();
  const batch = members.map((memberDoc) =>
    memberDoc.ref.collection('MemberRankJob').add({
      status: 'pending',
    }),
  );
  await Promise.all(batch);
}

export const createMembershipRankJob = async (req: Request, res: Response): Promise<void> => {
  const membershipMemberSnap = await memberColRef.get();
  const members = membershipMemberSnap.docs;

  const batchSize = 100;
  for (let i = 0; i < members.length; i += batchSize) {
    const batch = members.slice(i, i + batchSize);
    await processMemberBatch(batch);
  }

  res.status(200).send('Membership rank update jobs created.');
};
```

#### 2️⃣ Job Executor: 작업 실행 함수

이 함수는 Firestore의 특정 경로에서 문서가 생성될 때 트리거됩니다. 생성된 작업 문서를 기반으로 회원의 랭크를 업데이트합니다.

```jsx
const rankCriteria = [
  { rank: 'platinum', days: 720, requiredDays: 696 },
  { rank: 'gold', days: 360, requiredDays: 348 },
  { rank: 'silver', days: 180, requiredDays: 174 },
];

export const executeMembershipRankJob = onDocumentCreated(
  'members/{memberId}/MemberRankJob/{jobId}',
  async (event) => {
    const snap = event.data;
    const { memberId, jobId } = event.params;

    if (!snap || !snap.exists) {
      console.warn('No data in snapshot');
      return;
    }

    const jobData = snap.data();

    const memberDoc = await memberColRef.doc(memberId).get();
    const memberData = memberDoc.data();

    if (!memberData) {
      console.warn('No data for member:', memberId);
      return;
    }

    const now = new Date();
    let memberRank: Subscription['memberRank'] = null;

    for (const { rank, days, requiredDays } of rankCriteria) {
      const startDate = subDays(now, days);
      const historySnap = await membershipHistoryCol(memberId).where('date', '>=', Timestamp.fromDate(startDate)).get();

      if (historySnap.size >= requiredDays) {
        memberRank = rank as Subscription['memberRank'];
        console.log(`Member ${memberId} ranked as ${rank}`);
        break;
      }
    }

    await memberColRef.doc(memberId).update({
      'subscription.memberRank': memberRank,
    });

    await snap.ref.update({
      status: 'completed',
    });
  }
);

```

![](다운로드.jpg)

> 🔆 **결론**

특정 시간이나 주기에 따라 자동으로 작업을 실행할 수 있게 해주는 서버리스 기능인 Firebase Scheduled Functions을 사용함으로써, **서버 관리 부담을 줄이고 자동 확장**의 효율성을 제공했습니다. 멤버십 일수에 따른 회원 등급 업데이트 작업을 자동화하기 위한 Job Creator와 Job Executor 함수를 구현하여, **실행 시간 제한 문제를 해결하고 시스템 부하를 분산**시켜 효율적인 작업 처리를 실현했습니다.

> 🔥 **참고**

더 자세한 정보는 [Firebase 공식 문서](https://firebase.google.com/docs/functions/schedule-functions?hl=ko&gen=2nd).를 참고하세요.
