import React from 'react';
import { render } from '@testing-library/react';
import { ConfigProvider } from './ConfigProvider';
import { useConfig } from './useConfig';
import { useRoutes } from './useRoutes';

const ComponentWithConfig = () => {
	const config = useConfig();

	return <div>{ config.message }</div>
}

const ComponentWithRoutes = () => {
	const routes = useRoutes();

	return <div>hello world</div>
}

describe('ConfigProvider', () => {
	it('should render component with config', () => {
		const container = render(
			<ConfigProvider config={{ message: "hello world" }} routes={{}} reactRoot="root">
				<ComponentWithConfig />
			</ConfigProvider>
		);

		expect(container.getByText(/hello world/i)).toBeTruthy()
	});

	it('should render component with routes', () => {
		const container = render(
			<ConfigProvider config={{}} routes={{}} reactRoot="root">
				<ComponentWithRoutes />
			</ConfigProvider>
		);

		expect(container.getByText(/hello world/i)).toBeTruthy()
	});
});