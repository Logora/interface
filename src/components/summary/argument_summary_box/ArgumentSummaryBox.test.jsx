import { render } from "@testing-library/react";
import React from "react";
import { ArgumentSummaryBox } from "./ArgumentSummaryBox";

describe("ArgumentSummaryBox", () => {
	it("renders ArgumentSummaryBox component correctly", () => {
		const { getByText } = render(
			<ArgumentSummaryBox
				label={"Recurrence of the argument"}
				text={
					"1. The term Chocolatine is more familiar and easier to pronounce for French speakers. "
				}
				gauge={3}
				color={"blue"}
				tag={"Yes"}
			/>,
		);
		expect(getByText(/Recurrence of the argument/i)).toBeInTheDocument();
	});
});
