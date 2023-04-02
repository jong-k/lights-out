import { render, screen, within } from "@testing-library/react";
import UserList from "../components/UserList";

// 코드 중복을 방지하기 위해 더미 데이터와 컴포넌트 렌더링 역할의 헬퍼 함수 생성
function renderComponent() {
  const users = [
    { name: "손흥민", email: "hm@son.com" },
    { name: "김민재", email: "mj@kim.com" },
  ];

  render(<UserList users={users} />);

  return {
    users,
  };
}

test("UserList 컴포넌트의 h2가 '유저 리스트'인지 검사", () => {
  render(<UserList />);

  const h2 = screen.getByRole("heading");

  expect(h2.textContent).toEqual("유저 리스트");
});

test("하나의 user row를 렌더링", () => {
  const users = [
    { name: "손흥민", email: "hm@son.com" },
    { name: "김민재", email: "mj@kim.com" },
  ];
  // container 는 기본값으로 div로 렌더링할 컴포넌트를 래핑
  const { container } = render(<UserList users={users} />);

  // testing-playground 외부 링크를 터미널에 제공
  // screen.logTestingPlaygroundURL();

  // const rows = screen.getAllByRole("row"); 헤더까지 같이 검색됨..

  // 테이블의 row 모두찾기 -> 2가지 방법 존재

  // 테이블의 row 모두찾기 방법 1: test-dataid 사용
  // const rows = within(screen.getByTestId("users")).getAllByRole("row"); // within으로 체이닝

  // 테이블의 row 모두찾기 방법 2: container 와 querySelector 사용하기
  const rows = container.querySelectorAll("tbody tr");

  // 평가
  expect(rows).toHaveLength(2);
});

test("유저들의 이름과 이메일이 잘 렌더링되는지", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
