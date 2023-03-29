import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "../components/UserForm";

// jest가 제공하는 기능
test("2개의 input과 1개의 버튼", () => {
  const mock = jest.fn();
  // 컴포넌트 렌더링
  render(<UserForm addUsers={mock} />);
  // 컴포넌트를 조작하거나 컴포넌트 안에서 원하는 element를 탐색
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  // 컴포넌트가 우리가 기대하는것과 일치하는지 확인
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});
