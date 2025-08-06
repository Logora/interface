import React, { useState } from 'react';
import { useResponsive } from '@logora/debate.hooks.use_responsive';
import { Modal, useModal } from '@logora/debate.dialog.modal';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useIntl, FormattedMessage } from "react-intl";
import { useAuth } from '@logora/debate.auth.use_auth';
import { useConfig } from '@logora/debate.data.config_provider';
import { useFormValidation } from '@logora/debate.forms.use_form_validation';
import { Icon } from '@logora/debate.icons.icon';
import { AvatarSelector } from '@logora/debate.user.avatar_selector';
import { Button } from '@logora/debate.action.button';
import { TextInput } from '@logora/debate.input.text_input';
import { Select } from '@logora/debate.input.select';
import { Loader } from '@logora/debate.progress.loader';
import { Toggle } from "@logora/debate.input.toggle";
import styles from './UpdateUserInfoModal.module.scss';
import PropTypes from "prop-types";

export const UpdateUserInfoModal = ({ termsUrl, privacyUrl, showEmailConsent = false, showTerms = false }) => {
    const auth = useAuth();
    const api = useDataProvider();
    const intl = useIntl();
    const config = useConfig();

    const avatarUrlList = [...Array(config.avatars?.maxFileName || 0).keys()].map(j => `${config.avatars?.baseUrl}/${j+1}.${config.avatars?.fileExtension}`);

    const [firstName, setFirstName] = useState(auth.currentUser.first_name || '');
    const [description, setDescription] = useState(auth.currentUser.description || '');
    const [lastName, setLastName] = useState(auth.currentUser.last_name || '');
    const [lang, setLang] = useState(auth.currentUser.language);
    const [showAvatars, setShowAvatars] = useState(false);
    const [previewPictureBase64, setPreviewPictureBase64] = useState(auth.currentUser.image_url);
    const [previewPicture, setPreviewPicture] = useState(null);
    const [avatarUpload, setAvatarUpload] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const { isMobile } = useResponsive();
    const { errors, validate } = useFormValidation();
    const { hideModal } = useModal();
    const [acceptsTerms, setAcceptsTerms] = useState(false);
    const [acceptsProviderEmail, setAcceptsProviderEmail] = useState(false);

    const displayPreview = (uri) => {
		const reader = new FileReader();
		reader.onloadend = () => { setPreviewPictureBase64(reader.result) }
		reader.readAsDataURL(uri);
	}

    const validationRules = [
        { first_name: ["required", null] }, 
        { first_name: ["minChar", 2] }, 
        { last_name: ["required", null] }, 
        { last_name: ["minChar", 2] }, 
        { language: ["required", null] },
        ...( showTerms ? [{ accepts_terms: ["enforceValue", true] }] : [])
    ]

    const submit = (event) => {
        event.preventDefault();
        const data = {};
        if (firstName) { data['first_name'] =  firstName; }
        if (lastName) { data['last_name'] =  lastName; }
        if (lang) { data['language'] =  lang; }
        if (previewPicture && avatarUpload) { data['image'] = previewPicture; }
        if (previewPicture && !avatarUpload) { data['origin_image_url'] = previewPicture; }
        if (description) { data['description'] = description; }
        if (showEmailConsent) { data["accepts_provider_email"] = acceptsProviderEmail; }
        if (showTerms) { data["accepts_terms"] = acceptsTerms; }
        data["is_onboarded"] = true;

        if (validate(data, validationRules)) {
            setIsUpdating(true);
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            })

            api.update("users", auth.currentUser.slug, formData).then(response => {
                if(response.data.success) {
                    auth.setCurrentUser(response.data.data.resource);
                    hideModal();
                } else {
                    hideModal();
                }
            });
        }
    }

    const handleChooseAvatar = (avatar) => {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        setPreviewPicture(avatar);
        setShowAvatars(false);
        if (urlRegex.test(avatar)) {
            setPreviewPictureBase64(avatar);
            setAvatarUpload(false);
        } else {
            setAvatarUpload(true);
            displayPreview(avatar);
        }
    };

    return (
        <Modal data-vid={"update_user_info_modal"} title={intl.formatMessage({ id: "modal.update_user_info_modal.modal_title", defaultMessage: "Update your profile" })} style={{ width: isMobile ? "unset" : "max-content", minWidth: isMobile ? "unset" : "500px", maxWidth: "800px" }} showCloseButton={false} disableClickOutside={true}>
            { isUpdating ? 
                <Loader />
            :
                !showAvatars ?
                    <>
                        <div className={styles.container}>
                            <div className={styles.userImageContainer}>
                                { previewPictureBase64 ?
                                    <img className={styles.userPictureUpload} src={previewPictureBase64} alt={intl.formatMessage({ id:"alt.my_profile_picture", defaultMessage:"Ma photo de profil" })} />
                                :
                                    <div className={styles.userPictureUpload}>
                                            <Icon name="camera" height={20} width={20} alt={intl.formatMessage({ id:"user.user_edit.profile_picture", defaultMessage:"Profile picture" })}/>
                                    </div>
                                }
                                <Button data-testid="avatar-button" data-tid={"action_save_profile"} active onClick={() => setShowAvatars(true)} style={{ whiteSpace: "nowrap" }}>
                                    { intl.formatMessage({ id:"user.user_edit.avatar", defaultMessage: "Select an avatar"}) }
                                </Button>
                            </div>
                            <div className={styles.inputsContainer}>
                                <div className={styles.nameContainer}>
                                    <div className={styles.updateProfileInput}>
                                        <TextInput   
                                            type={"text"} 
                                            name={"first_name"} 
                                            aria-label={intl.formatMessage({ id: "auth.signup_form.first_name.aria_label", defaultMessage: "First name" })}
                                            placeholder={intl.formatMessage({ id:"auth_signup_form_first_name_placeholder", defaultMessage: "First name" })} 
                                            onChange={e => config.actions?.disableOnboardingNameUpdate === true ? null : setFirstName(e.target.value)}
                                            value={firstName}
                                            error={errors["first_name"] ? true : false}
                                            message={errors["first_name"]}
                                            data-testid="first-name"
                                            disabled={config.actions?.disableOnboardingNameUpdate === true}
                                        />
                                    </div>
                                    <div className={styles.updateProfileInput}>
                                        <TextInput 
                                            type={"text"} 
                                            name={"last_name"} 
                                            aria-label={intl.formatMessage({ id: "auth.signup_form.last_name.aria_label", defaultMessage: "Last name" })}
                                            placeholder={intl.formatMessage({ id:"auth_signup_form_last_name_placeholder", defaultMessage: "Last name" })} 
                                            onChange={e => config.actions?.disableOnboardingNameUpdate === true ? null : setLastName(e.target.value)}
                                            value={lastName}
                                            error={errors["last_name"] ? true : false}
                                            message={errors["last_name"]}
                                            data-testid="last-name"
                                            disabled={config.actions?.disableOnboardingNameUpdate === true}
                                        />
                                    </div>
                                </div>
                                { config.actions?.disableNameUpdate == true && config.actions?.disableOnboardingNameUpdate != true &&
                                    <div className={styles.hint}>
                                        { intl.formatMessage({ id:"user.user_edit.user_name_hint", defaultMessage: "last name" }) } 
                                    </div>
                                }
                                { (config.translation?.translationMethods && Object.keys(config.translation.translationMethods).length > 0) &&
                                    <Select 
                                        selectClassName={styles.langSelect}
                                        options={Object.keys(config.translation.translationMethods).map(l =>  (
                                            {
                                                name: l,
                                                value: l,
                                                text: `${l.toUpperCase()}`
                                            }
                                        ))}
                                        defaultOption={lang}
                                        onChange={(option) => setLang(option.value)}
                                    />
                                }
                                <div className={styles.userDescription}>
                                    <textarea 
                                        className={styles.textArea} 
                                        placeholder={intl.formatMessage({ id:"user.user_edit.user_description", defaultMessage: "Describe yourself in a few words" })} 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                        maxLength={500}
                                        data-testid="description"
                                    />
                                </div>
                            </div>
                        </div>
                        { showTerms &&
                            <div className={styles.toggle}>
                                <Toggle 
                                    type={"checkbox"} 
                                    name={"accepts_terms"} 
                                    style={{ fontSize: 18 }}
                                    checked={acceptsTerms} 
                                    label={ <FormattedMessage
                                        id='modal.update_user_info_modal.accepts_terms'
                                        defaultMessage="I declare I have read the <var1>General Conditions of Use</var1> and the <var2>Privacy policy</var2> of the debate space and accept them."
                                        values={{
                                            var1: (chunks) => (
                                                <a className={styles.cgu} target='_blank' href={termsUrl}>
                                                    {chunks}
                                                </a>
                                            ),
                                            var2: (chunks) => (
                                                <a className={styles.cgu} target='_blank' href={privacyUrl}>
                                                    {chunks}
                                                </a>
                                            ),
                                        }}/>}
                                    onInputChanged={(e) => setAcceptsTerms(!acceptsTerms)}
                                    message={errors["accepts_terms"]}
                                    data-testid={"accepts-terms-input"}
                                />
                            </div>
                        }
                        { showEmailConsent &&
                            <div className={styles.toggle}>
                                <Toggle 
                                    type={"checkbox"} 
                                    name={"accepts_provider_email"} 
                                    style={{ fontSize: 18 }}
                                    checked={acceptsProviderEmail} 
                                    label={ intl.formatMessage({ id: "modal.update_user_info_modal.consent_label", defaultMessage: "I agree to receive emails from the editor" }, { provider: config.provider?.companyName }) }
                                    onInputChanged={(e) => setAcceptsProviderEmail(!acceptsProviderEmail)} 
                                    data-testid={"accepts-email-input"}
                                />
                            </div>
                        }
                        <div className={styles.userSaveBox}>
                            <Button data-testid="save-button" data-tid={"action_save_profile"} onClick={(e) => submit(e)}>
                                { intl.formatMessage({ id:"user.user_edit.save", defaultMessage: "Save"}) }
                            </Button>
                        </div>
                    </>
                : 
                    <>
                        <AvatarSelector 
                            onChooseAvatar={handleChooseAvatar}
                            avatarUrlList={avatarUrlList}
                            userName={auth.currentUser.full_name}
                            allowUserImage={config.avatars?.allowUserImage}
                        />
                        <div className={styles.backButton} onClick={() => setShowAvatars(false)}>{ intl.formatMessage({ id:"user.user_edit.back", defaultMessage: "Back"}) }</div>
                    </>
            }
        </Modal>
    );
}

UpdateUserInfoModal.propTypes = {
    /** URL to the terms page */
	termsUrl: PropTypes.string,
    /** URL to the privacy page */
	privacyUrl: PropTypes.string,
    /** If `true`, will show a toggle for email consent */
	showEmailConsent: PropTypes.bool,
	/** If `true`, will show a toggle to accept terms */
	showTerms: PropTypes.bool,
}
