import React, { useState } from 'react';
import { useIntl } from "react-intl";
import { Button } from '@logora/debate.action.button';
import { Avatar } from '@logora/debate.user.avatar';
import styles from './AvatarSelector.module.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';

export const AvatarSelector = ({ avatarUrlList, onChooseAvatar, userName, allowUserImage }) => {
    const intl = useIntl();
    const [chosenAvatar, setChosenAvatar] = useState(false);
    const [uploadedAvatar, setUploadedAvatar] = useState(false);
    const [uploadedAvatarPreview, setUploadedAvatarPreview] = useState(false);

    const handleChooseAvatar = (chosenAvatar) => {
        onChooseAvatar(chosenAvatar ? chosenAvatar : uploadedAvatar);
    }

    const handleUpload = (files) => {
		const picture = files[0];
		if(picture && picture.type.includes('image/')) {
			setUploadedAvatar(picture);
            const reader = new FileReader();
            reader.onloadend = () => { setUploadedAvatarPreview(reader.result) }
            reader.readAsDataURL(picture);
		}
	}

    return (
        <>
            { allowUserImage &&
                <>
                    <div className={styles.title}>{intl.formatMessage({ id: "user.avatar_selector.user_image_title", defaultMessage: "Import image of your choice" })}</div>
                    <input data-testid="avatar-input" id="user_image" className={styles.imageInput} name="user_image" type="file" accept="image/*"  onChange={(e) => handleUpload(e.target.files)} />
                    <div className={styles.uploadAvatarContainer}>
                        {uploadedAvatarPreview && <img data-testid={"upload-avatar"} src={uploadedAvatarPreview} alt={intl.formatMessage({ id: "user.avatar_selector.avatar", defaultMessage: "Selected profile picture" })} className={styles.uploadedAvatar} />}
                        <label htmlFor="user_image" className={styles.imageInputLabel}>{intl.formatMessage({ id: "user.avatar_selector.upload_input", defaultMessage: "Upload an image" })}</label>
                    </div>
                    <div className={cx(styles.title, styles.avatarListTitle)}>{intl.formatMessage({ id: "user.avatar_selector.avatar_list_title", defaultMessage: "Or choose from one of our avatars" })}</div>
                </>
            }
            { (chosenAvatar && allowUserImage) && <div onClick={() => setChosenAvatar(false)} className={styles.cancelSelection}>{intl.formatMessage({ id: "user.avatar_selector.cancel_selection", defaultMessage: "Cancel selection" })}</div>}
            <div className={cx(styles.avatarList, {[styles.userChoice]: chosenAvatar || uploadedAvatar})}>
                { avatarUrlList.map((e, index) => <Avatar key={index} size={70} avatarUrl={e} userName={userName} onClick={() => setChosenAvatar(e)} className={cx(styles.avatar, {[styles.selected]: e === chosenAvatar})} data-testid="avatar" />)}
            </div>
            { (chosenAvatar || uploadedAvatar) && 
                <div className={styles.confirm}>
                    <img src={chosenAvatar || (uploadedAvatarPreview ? uploadedAvatarPreview : undefined)} alt={intl.formatMessage({ id: "user.avatar_selector.avatar", defaultMessage: "Selected profile picture" })} className={styles.chosenAvatar} />
                    <Button handleClick={() => handleChooseAvatar(chosenAvatar || uploadedAvatar)} className={styles.button}>{intl.formatMessage({ id: "user.avatar_selector.confirm", defaultMessage: "Choose this image" })}</Button>
                </div>
            }
        </>
    );
}

AvatarSelector.propTypes = {
    /** An array containing URLs of available avatar images */
    avatarUrlList: PropTypes.array,
    /** A callback function to handle the selection of an avatar image */
    onChooseAvatar: PropTypes.func,
    /** User name */
    userName: PropTypes.string.isRequired,
    /** Allow a user to upload an image */
    allowUserImage: PropTypes.bool
};