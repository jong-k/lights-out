import { screen, render } from "@testing-library/react";

const AccessibleName = () => {
	return (
		<div>
			<button aria-label="submit btn">등록</button>
			<button aria-label="cancel btn">>취소</button>
		</div>
	)
}

test("", () => {
	render(<AccessibleName />);

	const submitBtn = screen.getByRole("button", { name: /submit btn/i });
	const cancelBtn = screen.getByRole("button", { name: /cancel btn/i });

	expect(submitBtn).toBeInTheDocument();
	expect(cancelBtn).toBeInTheDocument();

});