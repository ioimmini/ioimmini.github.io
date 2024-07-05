---
emoji:  🛠️
title: 'TypeScript 검증 강화를 위해 Yup에서 Zod로 마이그레이션하기'
date: '2024-07-05'
categories: migration
---


---

>  🙌 **소개**
> 

데이터 유효성 검사는 모든 애플리케이션에서 사용자 입력의 무결성과 정확성을 보장하는 중요한 부분입니다. 수년 동안 `Yup`은 JavaScript 및 TypeScript 프로젝트에서 스키마 유효성 검사를 위한 라이브러리로 널리 사용되어 왔습니다. 하지만 새로운 경쟁자인 `Zod`s가 강력한 기능과 원활한 TypeScript 통합으로 인기를 얻고 있습니다. 이 글에서는 <u>Yup에서 Zod로 전환해야 하는 이유와 이를 효과적으로 수행하는 방법</u>을 살펴보겠습니다.

> 🤔 왜 **Zod**로 전환했을까요?
> 

프로젝트에서 다루는 **데이터가 복잡해짐**에 따라 Yup의 스키마로는 표현할 수 없는 데이터를 검증해야 하는 상황이 생겼습니다. 이에 Yup 대신 Zod를 사용하게 되었고, **통일성**을 위해 기존에 사용하던 Yup을 완전히 대체하기로 했습니다.

잘못된 데이터 유형에 의한 에러는 애플리케이션의 작동에 치명적인 문제를 일으킬 수 있기 때문에 전송하거나 수신하는 모든 데이터의 유효성을 확인하는 것이 중요합니다. 예측하지 못한 데이터 유형이나 값은 애플리케이션의 충돌을 유발하거나 다른 부정적인 결과를 초래할 수 있습니다.

> ✔️ **Zod에 대해 알아봅시다.**
> 

Zod는 TypeScript를 기반으로 하는 데이터 유효성 검사 라이브러리입니다. 이 라이브러리는 데이터의 정의와 유효성 검사를 간편하게 만들어주며, 독립적이고 경량화된 구조로 어떤  TS 혹은 JS 환경에서도 쉽게 적용할 수 있습니다

> ✔️ **Zod의 주요 특징**
> 
- **타입 안정성**:  TS와 Zod를 함께 사용하면 컴파일시, 데이터 유효성 검증 관련 오류를 쉽게 찾아낼 수 있습니다. 이를 통해 런타임에서 발생할 수 있는 유효성 검증 관련 버그를 미리 방지하는 것이 가능하다.
- **간결한 구문**: Zod 데이터 스키마를 정의하는데 필요한 코드를 최소화하는 간결한 구문을 제공 합니다.
- **비동기 유효성 검사**: Zod는 유효성 검사 과정에서 비동기 작업을 수행하는 것을 지원합니다..
- **확장성**: Zod는 다른 양식 유효성 검사 라이브러리와의 통합이 용이하며, 사용자가 직접 유효성 검사 로직을 설정할 수 있게 합니다.
- **유연한 검증 로직 구성**: Zod는 다양한 검증 함수와 그 조합을 제공합니다.

 ✔️ **기본 개체 유효성 검사**

zod는 발생하는 순서대로 **모든** 유효성 검사 에러를 발생시킵니다. 기본적으로 객체의 모든 속성은 필수이지만 선택적인 속성을 갖고 싶다면 `optional()`메서드를 사용할 수 있습니다.

```jsx
const userSchema = z.object({
  username: z.string().toLowerCase(),
  email: z.string().trim().email(),
  password: z.string().min(8).max(20),
  age: z.number().positive(),
});

userSchema.parse({
  username: "Ho_Seong",
  email: "ohs8283@gmail.com",
  password: "12345678",
  age: 26,
});
```

✔️ **함수 유효성 검사**

Zod는 함수의 유효성을 검사하고, 함수에 전달된 데이터와 함수에서 반환된 데이터가 올바른지 확인할 수 있습니다.  함수 스키마는 두 개의 API(args 및 returns)를 사용하여 함수의 입력과 출력을 검증합니다.

```jsx
const sumOfNumsSchema = z
  .function()
  .args(z.number(), z.number())
  .returns(z.number());

const sumOfNums = sumOfNumsSchema.validate((val1, val2) => {
  return val1 + val2;
});

sumOfNums("1", 10); // TypeError: Expected number, received string
```

함수 유효성 검사는 zod에만 있습니다.

> ✔️ **Yup에 대해서도 알아봅시다.**
> 

Yup은 JavaScript 및 TypeScript에서 사용할 수 있는 검증 라이브러리로, 주로 React와 함께 사용되는데, Yup의 스키마는 간단하게 작성할 수 있고, 다양한 유효성 검사 메서드를 지원합니다.

```jsx
const yup = require('yup');
// 또는 import * as yup from 'yup';

const schema = yup.string();
schema.validate(17).then((res) => console.log(res)); // ->333
schema.isValid(10).then((res) => console.log(res)); // ->true
```

`vaildate` 메서드는 `Zod의 parse` 메서드와 비슷한 역할을 합니다. 두 메서드 **모두 객체를 검증하는 것이 아니라, 실제로 객체를 파싱**합니다. ****에러가 발생하면 실행이 중지되고 에러를 반환합니다. 반면 `isValid` 메서드는 데이터의 유효성만 검사하고 에러 처리는 사용자에게 맡깁니다.

```jsx
const schema = yup.string().strict();
```

Yup도 Zod처럼 검증과 변환을 위한 다양한 API를 제공합니다.

```jsx
import * as yup from "yup";

const yupSchema = yup.string();
type YupType = yup.InferType<typeof yupSchema>;
const yupData: YupType = 2; // TypeError, 작동하진 않음

// Zod
import { z } from "zod";

const zodSchema = z.string();
type ZodType = z.infer<typeof zodSchema>;
const zodData: ZodType = 5; // TypeError
```

위 스크립트를 TypeScript로 실행하면, 값이 문자열이어야 하는데 숫자임에도 Yup은 아무런 동작을 하지 않는 반면, Zod는 실제로 오류를 발생시킵니다.

> ✔️ **배열 유효성 검사**
> 

 `Yup` 에는 배열 타입의 값 유효성을 검사하는 몇 가지 유용한 확장 기능이 있습니다. 예를 들어 `.min` 및 `.max` 함수를 사용하여 배열의 최소 또는 최대 길이를 확인할 수 있습니다. `.of` 메서드를 사용하여 해당 값의 유형을 확인할 수도 있습니다. 

> ✔️ 성능 비교
> 

`Zod`와 `Yup`의 성능은 특정 사용 사례, 검증 스키마의 복잡도, 검증되는 데이터의 크기에 따라 달라집니다. 간단한 유효성 검사 규칙과 작은 데이터 세트에 대해서는 두 라이브러리 간의 성능 차이가 거의 없을 수 있습니다. 하지만 복잡한 스키마나 큰 데이터 세트에 대해서는 성능 차이가 발생할 수 있습니다.

Zod는 TypeScript를 처음부터 고려한 설계를 가지고 있으며, 이는 TypeScript 프로젝트와 원활하게 통합됩니다. 또한 Zod는 종속성이 없어 프로젝트에 쉽게 통합할 수 있습니다. 반면, Yup은 Formik과의 통합이 쉬워 주로 form 유효성 검사에 많이 사용됩니다.

Zod는 함수의 입력과 출력을 검증하여 모든 데이터가 올바른지 확인할 수 있습니다. 또한, 오류가 발생하면 런타임이 중지되는 우수한 TypeScript 지원 기능을 가지고 있습니다.

> 🔆 **결론**
> 

두 라이브러리의 성능을 비교하는 것은 특정 사용 사례, 검증 스키마의 복잡성, 검증되는 데이터의 크기에 따라 크게 달라집니다.

<span style="color:blue">Formik과의 통합이 중요한 경우 Yup을</span> 사용하는 것이 좋습니다. 하지만 <span style="color:red">API 데이터 교환과 같이 클라이언트와 서버 사이에서 전달되는 모든 데이터의 유효성을 검사해야 하는 경우 Zod</span>가 더 나은 선택일 수 있습니다.

> 🔥 **참고**
> 

https://blog.logrocket.com/comparing-schema-validation-libraries-zod-vs-yup/