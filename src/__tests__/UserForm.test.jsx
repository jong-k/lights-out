import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "../components/UserForm";

// jest의 test
test("2개의 인풋, 1개의 버튼!", () => {
  // 컴포넌트 렌더링
  render(<UserForm />);

  // 컴포넌트에서 그 안의 element 찾기 : query 이용
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // 컴포넌트가 기대한 대로 잘 동작하는지? : matcher 이용
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("form이 제출될 때 handleSubmit 함수가 잘 실행되는지?", async () => {
  const mock = jest.fn();

  // 컴포넌트 렌더링
  render(<UserForm addUsers={mock} />);

  // element 찾기 : 2개의 인풋
  // const [nameInput, emailInput] = screen.getAllByRole("textbox");

  // 레이블로 찾기
  const nameInput = screen.getByRole("textbox", { name: /이름/ });
  const emailInput = screen.getByRole("textbox", { name: /이메일/ });

  // 이름 입력 시뮬레이션 : 이름 입력창 클릭 후 이름 입력
  await user.click(nameInput);
  await user.keyboard("손흥민");

  // 이메일 입력 시뮬레이션
  await user.click(emailInput);
  await user.keyboard("son@korea.com");

  // 버튼 찾기
  const button = screen.getByRole("button");

  // 버튼 클릭 시뮬레이션
  await user.click(button);

  // 평가
  expect(mock).toHaveBeenCalled();
});
