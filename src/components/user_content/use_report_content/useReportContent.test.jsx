import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReportContent } from './useReportContent';
import { IntlProvider } from 'react-intl';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { ListProvider } from '@logora/debate.list.list_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

beforeAll(() => {
  const Proto = globalThis.HTMLDialogElement?.prototype;
  if (!Proto) return;

  if (!Proto.showModal) {
    Object.defineProperty(Proto, 'showModal', {
      configurable: true,
      value: function () {
        this.setAttribute('open', '');
      },
    });
  }

  if (!Proto.close) {
    Object.defineProperty(Proto, 'close', {
      configurable: true,
      value: function () {
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close'));
      },
    });
  }
});

const httpClient = {
  get: jest.fn(() => Promise.resolve(null)),
  post: jest.fn(() => Promise.resolve({ data: { success: true } })),
  patch: jest.fn(() => Promise.resolve(null)),
  delete: jest.fn(() => Promise.resolve(null)),
};

const currentUser = {
  id: faker.datatype.number(),
};

const data = dataProvider(httpClient, 'https://mock.example.api');

const ComponentWithReport = () => {
  const reportableType = 'post';
  const reportableId = '123';
  const modalTitle = 'Report Post';
  const { reportContent } = useReportContent(reportableType, reportableId, modalTitle);

  return (
    <button data-testid={'report-button'} onClick={reportContent}>
      <span>Report</span>
    </button>
  );
};

describe('useReportContent', () => {
  it('should show ReportModal when useReportContent is called', async () => {
    const user = userEvent.setup();

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={{}}>
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
              <ToastProvider>
                <IconProvider library={regularIcons}>
                  <ListProvider>
                    <ModalProvider>
                      <ComponentWithReport />
                    </ModalProvider>
                  </ListProvider>
                </IconProvider>
              </ToastProvider>
            </AuthContext.Provider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </IntlProvider>
    );

    const reportButton = screen.getByTestId('report-button');
    await user.click(reportButton);

    expect(await screen.findByText('Report Post')).toBeTruthy();
    expect(await screen.findByText('Tell us more about your report')).toBeTruthy();
    expect(await screen.findByText('Send')).toBeTruthy();
  });

  it('should show confirmation step if the report is sent', async () => {
    const user = userEvent.setup();

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={{}}>
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
              <ToastProvider>
                <IconProvider library={regularIcons}>
                  <ListProvider>
                    <ModalProvider>
                      <ComponentWithReport />
                    </ModalProvider>
                  </ListProvider>
                </IconProvider>
              </ToastProvider>
            </AuthContext.Provider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </IntlProvider>
    );

    const reportButton = screen.getByTestId('report-button');
    await user.click(reportButton);

    expect(await screen.findByText('Report Post')).toBeTruthy();
    expect(await screen.findByText('Tell us more about your report')).toBeTruthy();
    expect(await screen.findByText('Send')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /select a reason/i }));
    await user.click(await screen.findByText(/incivility/i));
    await user.click(await screen.findByRole('checkbox'));

    const confirmButton = screen.getByRole('button', { name: /send/i });
    await user.click(confirmButton);

    expect(await screen.findByText(/thank you for your submission/i)).toBeTruthy();
    expect(screen.getByText('Close')).toBeTruthy();
  });
});
