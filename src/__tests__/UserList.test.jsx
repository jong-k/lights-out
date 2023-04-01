import { render, screen, within } from "@testing-library/react";
import UserList from "../components/UserList";

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
  render(<UserList users={users} />);

  // testing-playground 외부 링크를 터미널에 제공
  // screen.logTestingPlaygroundURL();

  // 테이블의 row 모두찾기
  // const rows = screen.getAllByRole("row"); 헤더까지 같이 검색됨..
  const rows = within(screen.getByTestId("users")).getAllByRole("row"); // within으로 체이닝

  // 평가
  expect(rows).toHaveLength(2);
});

test("유저들의 이름과 이메일 렌더링", () => {
  render(<UserList />);
});
