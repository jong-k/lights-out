import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "../App";

test("새 유저 를 입력받고 리스트에서 보여줄 수 있음", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /이름/ });
  const emailInput = screen.getByRole("textbox", { name: /이메일/ });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("이강인");
  await user.click(emailInput);
  await user.keyboard("kang@korea.com");

  await user.click(button);

  // 디버그 기능 : 콘솔에 렌더링 출력
  // screen.debug();

  const name = screen.getByRole("cell", { name: "이강인" });
  const email = screen.getByRole("cell", { name: "kang@korea.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
