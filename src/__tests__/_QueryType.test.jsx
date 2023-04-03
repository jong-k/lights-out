import { render, screen} from "@testing-library/react";

const ColorList = () => {
	return (
		<ul>
			<li>Red</li>
			<li>Blue</li>
			<li>Green</li>
		</ul>
	)
}

test("쿼리 결과가 존재하지 않을 때", async () => {
	render(<ColorList />);

	// toThrow : 함수가 에러를 출력하는지 검사하는 matcher
	expect(() => screen.getByRole("textbox")).toThrow();

	// queryBy... 는 매칭 결과가 없으면 null 반환
	expect(screen.queryByRole("textbox")).toEqual(null);

	// findBy... 는 매칭 결과가 있으면 resolve하는 프로미스를 반환
	// 디폴트 1000ms 까지 허용
	let errorThrown = false;
	try {
		await screen.findByRole("testbox");
	} catch (err) {
		errorThrown = true;
	}
	expect(errorThrown).toEqual(true);
});

test("1개의 결과만 찾는 query", async () => {
	render(<ColorList />);


	expect(screen.getByRole("list")).toBeInTheDocument();
	expect(screen.queryByRole("list")).toBeInTheDocument();
	expect(await screen.findByRole("list")).toBeInTheDocument();
});

test("1개 이상의 결과를 찾는 query", async () => {
	render(<ColorList />);

	expect(screen.getAllByRole("listitem")).toHaveLength(3);
	expect(screen.queryAllByRole("listitem")).toHaveLength(3);
	expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

// 쿼리 결과가 없는 경우를 검사할 때는 getBy... 대신 queryBy... 를 쓰는게 낫다
test("쿼리 결과가 화면에 없는지를 검사", () => {
	render(<ColorList />);
	
	const element = screen.queryByRole("textbox");
	
	// not을 써서 부정 가능
	expect(element).not.toBeInTheDocument();
})