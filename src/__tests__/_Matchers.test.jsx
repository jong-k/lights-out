import { screen, render, within } from "@testing-library/react";

const FormData = () => {
	return (
		<div>
			<button>이전으로</button>
			<form aria-label="form">
				<button>저장</button>
				<button>취소</button>
			</form>
		</div>
	)
}

// Role을 포함하는지 검사하는 커스텀 매쳐
// container는 expect의 인수를 받아온다
const toContainRole = (container, role, quantity = 1) => {
	const elements = within(container).queryAllByRole(role);

	if (elements.length === quantity) {
		return {
			pass: true,
			message: () => "the container did not contain 2 buttons"
		}
	}

	return {
		pass: false,
		message: () => `Expected to find ${quantity} ${role} elements. But found ${elements.length} instead`
	}
}

expect.extend({ toContainRole });

test("form 내부의 버튼 2개를 검사", () => {
	render(<FormData />);
	const form = screen.getByRole("form");
	// within 으로 form 내부로 범위를 좁힘
	const buttons = within(form).getAllByRole("button");
	expect(buttons).toHaveLength(2);

	// custom matcher 사용
	expect(form).toContainRole("button", 2); // OK
	expect(form).toContainRole("link", 1); // fail
})