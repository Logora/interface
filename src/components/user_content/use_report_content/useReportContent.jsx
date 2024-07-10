import React, { Suspense } from 'react';
import { useAuth } from "@logora/debate.auth.use_auth";
import { useModal } from '@logora/debate.dialog.modal';
import { useAuthRequired } from '@logora/debate.hooks.use_auth_required';
import { ReportModal } from './ReportModal';

export const useReportContent = (reportableType, reportableId, modalTitle) => {
    const { isLoggedIn } = useAuth();
    const { showModal } = useModal();
	const requireAuthentication = useAuthRequired();

    const reportContent = () => {
		if (isLoggedIn) {
			showModal(
				<Suspense fallback={null}>
					<ReportModal 
						reportableType={reportableType}
						reportableId={reportableId}
						title={modalTitle}
					/>
				</Suspense>
			);
		} else {
			requireAuthentication();
		}
	};

    return { reportContent };
}