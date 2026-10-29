import { render, screen } from "@testing-library/react";
import React from "react";
import { WithAd } from "./WithAd";

describe("WithAd", () => {
	it("should render only children if path is empty", () => {
		render(
			<WithAd id={"ad-id"} adPath={""} sizes={[[300, 250]]}>
				<div>Hello world</div>
			</WithAd>,
		);

		expect(screen.getByText("Hello world")).toBeTruthy();
		expect(screen.queryByTestId("div-gpt-ad-ad-unit")).toBeNull();
	});

	it("should render children only if no index is passed", () => {
		render(
			<WithAd id={"ad-id"} adPath={"/6355419/Travel"} sizes={[[300, 250]]}>
				<div>Hello world</div>
			</WithAd>,
		);

		expect(screen.getByText("Hello world")).toBeTruthy();
		expect(screen.queryByTestId("div-gpt-ad-ad-id")).toBeNull();
	});

	it("should render children and ad unit if index and frequency match", () => {
		render(
			<WithAd
				id={"ad-id"}
				adPath={"/6355419/Travel"}
				sizes={[[300, 250]]}
				index={0}
				frequency={2}
			>
				<div>Hello world</div>
			</WithAd>,
		);

		expect(screen.getByText("Hello world")).toBeTruthy();
		expect(document.getElementById("div-gpt-ad-ad-id")).toBeTruthy();
	});

	it("should render children and ad unit with correct id", () => {
		render(
			<WithAd
				id={"ad-id"}
				adPath={"/6355419/Travel"}
				sizes={[[300, 250]]}
				index={12}
				frequency={4}
			>
				<div>Hello world</div>
			</WithAd>,
		);

		expect(screen.getByText("Hello world")).toBeTruthy();
		expect(document.getElementById("div-gpt-ad-ad-id-12")).toBeTruthy();
	});

	it("should render only children if index and frequency do not match", () => {
		render(
			<WithAd
				id={"ad-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				index={1}
				frequency={2}
			>
				<div>Hello world</div>
			</WithAd>,
		);

		expect(screen.getByText("Hello world")).toBeTruthy();
		expect(document.getElementById("div-gpt-ad-ad-id")).toBeNull();
	});

	it("should pass extra props to children", () => {
		render(
			<WithAd
				id={"ad-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				index={1}
				frequency={2}
				data-testid={"children-testid"}
			>
				<div>Hello world</div>
			</WithAd>,
		);

		expect(screen.getByText("Hello world")).toBeTruthy();
		expect(screen.getByTestId("children-testid")).toHaveTextContent(
			"Hello world",
		);
	});

	it("should not register any refresh listener by default", () => {
		const addEventListener = vi.fn();
		window.googletag = {
			cmd: { push: (fn) => fn() },
			defineSlot: vi.fn(() => ({
				getSlotElementId: () => "div-gpt-ad-ad-id-0",
				setTargeting: vi.fn(function () {
					return this;
				}),
				setConfig: vi.fn(),
				addService: vi.fn(function () {
					return this;
				}),
			})),
			display: vi.fn(),
			destroySlots: vi.fn(),
			pubads: () => ({
				getSlots: () => [],
				addEventListener,
				refresh: vi.fn(),
				isInitialLoadDisabled: () => false,
			}),
		};

		render(
			<WithAd
				id={"ad-id"}
				adPath={"/6355419/Travel"}
				sizes={[[300, 250]]}
				index={0}
				frequency={2}
			>
				<div>Hello world</div>
			</WithAd>,
		);

		expect(addEventListener).not.toHaveBeenCalled();
		delete window.googletag;
	});

	it("should forward the refresh opt-in to the ad unit", () => {
		const addEventListener = vi.fn();
		window.googletag = {
			cmd: { push: (fn) => fn() },
			defineSlot: vi.fn(() => ({
				getSlotElementId: () => "div-gpt-ad-ad-id-0",
				setTargeting: vi.fn(function () {
					return this;
				}),
				setConfig: vi.fn(),
				addService: vi.fn(function () {
					return this;
				}),
			})),
			display: vi.fn(),
			destroySlots: vi.fn(),
			pubads: () => ({
				getSlots: () => [],
				addEventListener,
				refresh: vi.fn(),
				isInitialLoadDisabled: () => false,
			}),
		};

		render(
			<WithAd
				id={"ad-id"}
				adPath={"/6355419/Travel"}
				sizes={[[300, 250]]}
				index={0}
				frequency={2}
				refresh={true}
			>
				<div>Hello world</div>
			</WithAd>,
		);

		expect(addEventListener).toHaveBeenCalledWith(
			"impressionViewable",
			expect.any(Function),
		);
		delete window.googletag;
	});
});
