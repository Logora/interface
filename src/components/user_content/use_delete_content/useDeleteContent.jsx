import React from 'react';
import { useAuth } from "@logora/debate.auth.use_auth";
import { useModal } from '@logora/debate.dialog.modal';
import { useIntl } from 'react-intl';
import { useList } from '@logora/debate.list.list_provider';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useToast } from '@logora/debate.dialog.toast_provider';
import { ConfirmModal } from '@logora/debate.dialog.confirm_modal';
import { useAuthRequired } from '@logora/debate.hooks.use_auth_required';

export const useDeleteContent = (content, contentType, listId, softDelete = false,  deleteTitle, deleteQuestion, deleteAlert) => {
    const { showModal } = useModal();
    const { isLoggedIn } = useAuth();
	const intl = useIntl();
    const list = useList();
    const api = useDataProvider();
	const { toast } = useToast() || {};
	const requireAuthentication = useAuthRequired();

    const deleteContent = () => {
        if (isLoggedIn) {
			showModal(
                <ConfirmModal
					title={deleteTitle || intl.formatMessage({ id: "info.delete_content_title", defaultMessage: "Delete content" })}
					question={deleteQuestion || intl.formatMessage({ id: "info.delete_content_question", defaultMessage: "Delete contribution" })}
					confirmLabel={intl.formatMessage({ id: "info.yes", defaultMessage: "Yes" })}
					cancelLabel={intl.formatMessage({id: "info.no", defaultMessage: "No" })}
					onConfirmCallback={() => confirmDelete()}
				/>
			);
		} else {
			requireAuthentication();
		}
    }

	const confirmDelete = () => {
        list.remove(listId, [content]);
        toast(deleteAlert || intl.formatMessage({ id: "info.delete_content_alert", defaultMessage: "Your contribution has been deleted" }), { type: "success" });
		if(softDelete) {
			api.update(contentType, content.id, { is_deleted: true }).then((response) => {
				if (response.data.success) {
					// NOTHING
				}
			});
		} else {
			api.delete(contentType, content.id).then((response) => {
				if (response.data.success) {
					// NOTHING
				}
			});
		}
	};

    return { deleteContent };
}