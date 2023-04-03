import { screen, render } from "@testing-library/react";
import { useState } from "react";

const DataForm = () => {
	const [email,  setEmail] = useState("heungmin@korea.com");

	return (
		<form>
			<h3>데이터를 입력하세요</h3>
			<div data-testid="image wrapper">
				<img src="data.jpg" alt="data"/>
			</div>
			<label htmlFor="email">이메일</label>
			<input
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="email"
			/>
			<label htmlFor="color">컬러</label>
			<input id="color" value="#a92a63" type="color"/>

			<button title="눌러서 제출 완료">제출</button>
		</form>
	)
}

test("색깔 검사", () => {
	render(<DataForm />);

	screen.logTestingPlaygroundURL();

	const elements = [
		screen.getByRole("button"),
		screen.getByLabelText("이메일"),
		screen.getByDisplayValue("#a92a63"),
		screen.getByText("데이터를 입력하세요"),
		screen.getByAltText(/data/i),
		screen.getByTitle(/눌러서 제출 완료/)
	]

	for (let element of elements) {
		expect(element).toBeInTheDocument();
	}

})