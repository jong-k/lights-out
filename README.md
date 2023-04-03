# CRA 환경에서 rtl과 jest로 React 컴포넌트 테스트하기
> Jest와 React Testing library 연습하기

## 이론

<details>
    <summary>0. Create React App 의 내장 테스팅 기능</summary>

### 설치된 라이브러리
- "@testing-library/jest-dom" : jest의 matcher 사용 가능케 해줌
- "@testing-library/react" (`React Testing Library`) : ReactDom 을 기반으로 render, screen 등의 함수로 React 테스팅을 지원  
- "@testing-library/user-event" : input, click 등 유저 입력 기능을 지원

### Jest가 직접 내장된 것은 아니나, 일부 기능이 지원됨
- jest와 유사한 test runner, jest-dom 등

### watch 모드
- react scripts 덕분에 npm run test 실행시 watch 모드가 적용됨

</details>

<details>
    <summary>1. 테스트 작성 프로세스</summary>

### 1. 테스트할 컴포넌트 고르기
### 2. 테스트 파일 생성
- src/__tests__ 폴더 내에 작성
- 컴포넌트명.test.jsx(tsx) 형태로
### 3. 테스트할 기능 정하기
- ex) input element가 화면에 잘 그려지는지?
### 4. 각 기능이 예상대로 작성하는지 테스트 코드 작성
### 5. CLI에서 test 실행

</details>

<details>
    <summary>2. Query</summary>

## Query 란?
> element를 찾기 위한 함수 (rtl 에서 제공)

- screen.getByRole()
  - textbox 탐색할 때 2번째 인수로 { name: /레이블명/i } 이렇게 하여 `레이블` 탐색 가능
  - id 또는 name 어트리뷰트로 찾는 것이 아님!
- screen.findAllByDisplayValue()
- 등등

## query type
> 1가지 이상의 결과를 받을 때는 All 키워드를 사용해야 한다 (아니면 에러 발생)
### getBy...
- query와 매칭되는 DOM node를 반환
- 결과가 없거나 1가지 이상의 결과가 있다면 에러를 반환
  - 여러개의 결과를 받으려면 getAllBy... 를 사용
### queryBy...
- getBy와 똑같은데 query 결과가 없으면 null 반환
### findBy...
- 매칭 결과가 있으면 resolve
- (기본값 1000ms) 이후에도 없으면 reject 되는 promise를 반환
- 따라서 프로미스를 받기 위해 test 콜백함수에 async/await를 써준다

</details>

<details>
    <summary>3. Matcher</summary>

### Matcher 란?
> 무엇을 테스트(비교)할지 정해주는 함수

- React에서는 컴포넌트의 값 (텍스트 콘텐츠) 등을 검사
### jest-dom 의 matcher : 값을 테스트
- expect(element).toHaveValue(값) : element가 특정 값을 갖고 있는지

### rtl 의 matcher : 렌더링 등을 테스트
- expect(element).toBeInTheDocument() : 화면에 존재하는지
- expect(element).toHaveClass() : className 을 갖고 있는지

</details>

<details>
    <summary>4. 유저의 인터랙션 시뮬레이션하기</summary>

### @testing-library/user-event
> user 로 import 하여 클릭, 키보드 등 입력을 시뮬레이션

### 예시
- user.click(클릭할 엘리먼트)
- user.keyboard(타이핑할 텍스트)

### user 관련 함수는 비동기(async/await) 함수로 사용해야 한다!!
- test 함수 내의 콜백 앞에 async 를 붙여주고
- user 함수 앞에는 await 을 붙여준다!

</details>

<details>
    <summary>5. testing-playground 사용하기</summary>

### screen.logTestingPlaygroundURL()
> jest 실행중인 터미널에서 testing-playground 외부 링크 제공

### playground
- 외부링크에서 테스트의 마크업 및 엘리먼트를 찾기위한 쿼리를 확인할 수 있어서 매우 편리
- 마크업 수정해보는 것도 가능

</details>

<details>
    <summary>6. element 찾는 방법 2가지</summary>

### table aria role

<table>
  <thead>
    <tr>
      <th>element</th>
      <th>aria role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>thead</td>
      <td>rowgroup</td>
    </tr>
    <tr>
      <td>tbody</td>
      <td>rowgroup</td>
    </tr>
    <tr>
      <td>tr</td>
      <td>row</td>
    </tr>
    <tr>
      <td>th</td>
      <td>columnheader</td>
    </tr>
    <tr>
      <td>td</td>
      <td>cell</td>
    </tr>
  </tbody>
</table>

### table의 row 모두 찾기가 어려울 때
> 쿼리함수나 matcher를 오랫동안 찾는거 시간낭비...

`data-testid` 또는 `container.querySelector()` 를 이용!

### 1. data-testid
> 엘리먼트에 어트리뷰트로 부여

data-testid="users" 이렇게!

그런데 좋은 방법은 아님, 왜냐면 코드베이스에 직접 추가해야하기 때문

### 2. container 와 querySelector 사용하기
rtl은 div (기본값) 을 만들고 그 안에 document.body 를 넣는다. 즉, test 내에서 렌더링하는 컴포넌트는 div로 래핑된다

div 대신 다른 element로 래핑할 수 있다
```js
const table = document.createElement('table')

const {container} = render(<TableBody {...props} />, {
  // TableBody 컴포넌트를 table element로 래핑
  container: document.body.appendChild(table),
})

```

이후 container.querySelector()를 사용하여 선택자로 원하는 노드들을 찾으면 된다

</details>

<details>
  <summary>7. beforeEach 로 불필요한 중복 줄이기</summary>

### beforeEach() 함수는?
- 개별 테스트 실행전에 실행 (테스트 파일 최상단)
- test() 처럼 jest에 기본 내장되어 전역에서 사용 가능

### 주의사항
- RTL에서는 beforeEach 내부에서 render 함수 사용 불가
- 대신 helper 함수 이용 (최상단에 위치)
</details>

## test 파일 확인하기
`src/__tests__` 폴더 확인

## 실행
1. npm start
2. npm run test