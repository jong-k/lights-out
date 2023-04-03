import { useState, useEffect } from "react";
import { screen, render } from "@testing-library/react";

// 바로 resolve 되는 promise를 반환하는 함수
const fakeFetchColors = () => {
	return Promise.resolve(["red", "blue", "green"])
}
// 컬러 리스트를 렌더링하는 컴포넌트
const LoadableColorList = () => {
	const [colors, setColor] = useState([]);

	useEffect(() => {
		fakeFetchColors()
			.then(colorList => setColor(colorList));
	}, []);

	const renderedColors = colors.map(color => {
		return <li key={color}>{color}</li>
	});

	return (
		<ul>
			{renderedColors}
		</ul>
	)
}

// 데이터 페칭 시 findBy... 를 쓰는게 좋다
test("promise로부터 list 얻기", async () => {
	render(<LoadableColorList />);

	// promise를 테스트할 때는 findBy... 함수 사용
	// const els = screen.getAllByRole("listitem");

	const els =  await screen.findAllByRole("listitem");

	expect(els).toHaveLength(3);
})