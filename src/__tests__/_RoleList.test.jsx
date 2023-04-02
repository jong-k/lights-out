import {screen, render} from "@testing-library/react";

// 각 element와 그에 해당하는 aria-role (
const RoleList = () => {
	return (
		<div>
			<a href="">link</a>
			<button>button</button>
			<footer>contentinfo</footer>
			<h1>heading</h1>
			<header>banner</header>
			<img src="" alt="description"/> img
			<input type="checkbox"/> checkbox
			<input type="number"/> spinbutton
			<input type="radio"/> radio
			<input type="text"/> textbox
			<li>listitem</li>
			<ul>list</ul>
		</div>
	);
};

test("role을 활용해서 test하기", () => {
	render(<RoleList />);
	//TODO 여기 아래를 켜서 playground 활성화해야함
	// screen.logTestingPlaygroundURL();

	const roles = [
		"link",
		"button",
		"contentinfo",
		"heading",
		"banner",
		"img",
		"checkbox",
		"spinbutton",
		"radio",
		"textbox",
		"listitem",
		"list"
	];

	for (let role of roles) {
		const el = screen.getByRole(role);

		expect(el).toBeInTheDocument();
	}
});