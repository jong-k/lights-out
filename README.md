# CRA 환경에서 rtl과 jest로 테스트하기!
> TDD 도전!

<details>
    <summary>0. CRA 환경의 test 알아보기</summary>

## test 실행
- react scripts 덕분에 npm run test 실행시 watch 모드가 적용됨

</details>


<details>
    <summary>1. 테스트 작성 프로세스</summary>

## 테스트 작성 프로세스
### 1. 테스트할 컴포넌트 고르기
### 2. 테스트 파일 생성
- src/__tests__ 폴더 내에 작성
- 컴포넌트명.test.jsx(tsx) 형태로
### 3. 테스트할 기능 정하기
- ex) input의 존재 등
### 4. 각 기능이 예상대로 작성하는지 테스트 코드 작성
### 5. CLI에서 test 실행

</details>

<details>
    <summary>2. Query</summary>

## Query 란?
> rtl 에서 제공하는 element를 찾기 위한 함수

- screen.getByRole()
  - textbox 탐색할 때 2번째 인수로 { name: /레이블명/i } 이렇게 하여 레이블 탐색 가능
- screen.findAllByDisplayValue()
- 등등

</details>

<details>
    <summary>3. Matcher</summary>

## Matcher 란?
> 무엇을 테스트(비교)할지 정해주는 함수

### jest 의 matcher : 값을 테스트

### rtl 의 matcher : 렌더링 등을 테스트
- expect(element).toBeInTheDocument()
- expect(element).toHaveClass()


</details>

<details>
    <summary>4. 유저의 인터랙션 시뮬레이션하기</summary>

## @testing-library/user-event
> user 로 import 하며 클릭, 키보드 등 입력을 시뮬레이션

### 예시
- user.click()
- user.keyboard

등이 있다

### user 관련 함수는 async/await 함수로 사용해야 한다!!
- test 함수 내의 콜백 앞에 async 를 붙여주고
- user 함수 앞에는 await 을 붙여준다!


</details>