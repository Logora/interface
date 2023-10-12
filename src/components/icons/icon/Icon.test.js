import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { Icon } from './Icon';

describe('Icon', () => {
	/*
	it('should render icon', async () => {
		act(()=>{
			render(
				<IconProvider libraryName={"regular"}>
					<Icon data-testid={"test-icon"} name={"italic"} />
				</IconProvider>
			);
		});
		await waitFor(() => {
        	expect(screen.queryByTestId("test-icon")).toBeTruthy();
		});
	});
	*/

	it('should render nothing if icon is not found', async () => {
		act(()=>{
			render(
				<IconProvider libraryName={"regular"}>
					<Icon data-testid={"test-icon"} name={"random"} />
				</IconProvider>
			);
		});
		await waitFor(() => {
        	expect(screen.queryByTestId("test-icon")).toBeNull();
		});
	});
});