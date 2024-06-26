import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import PropTypes from "prop-types";
import { useAuth } from "@logora/debate.auth.use_auth";
import { useList } from '@logora/debate.list.list_provider';
import { useModal } from '@logora/debate.dialog.modal';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useFormValidation } from '@logora/debate.forms.use_form_validation';
import { useInput } from "@logora/debate.input.input_provider";
import { useConfig } from '@logora/debate.data.config_provider';
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { useIntl } from 'react-intl';
import { useLocation } from "react-router";
import { useAuthRequired } from '@logora/debate.hooks.use_auth_required';
import useSessionStorageState from '@rooks/use-sessionstorage-state';
import { useToast } from '@logora/debate.dialog.toast_provider';
import { Avatar } from '@logora/debate.user.avatar';
import { AuthorBox } from '@logora/debate.user.author_box';
import { TogglePosition } from '@logora/debate.input.toggle_position';
import { Icon } from '@logora/debate.icons.icon';
import TextEditor from "@logora/debate.input.text_editor";
const SideModal = lazy(() => import('@logora/debate.modal.side_modal'));
import cx from 'classnames';
import styles from './ArgumentInput.module.scss';

export const ArgumentInput = ({ argumentListId, avatarSize = 48, disabled = false, positions, disabledPositions = [], groupId, groupName, groupType, hideSourceAction = false, isReply = false, onSubmit, parentId, placeholder, positionId, focusOnInit = false }) => {
    const intl = useIntl();
    const api = useDataProvider();
    const list = useList();
    const config = useConfig();
    const { focus, setFocus, setReset, inputContent, setInputContent, setInputRichContent } = useInput();
    const { isLoggedIn, currentUser } = useAuth();
    const { errors, validate } = useFormValidation();
    const { isMobile } = useResponsive();
    const location = useLocation();
    // REFS
    const inputForm = useRef(null);
    // STATE
    const [sources, setSources] = useState([]);
    const [argumentContent, setArgumentContent] = useState("");
    const [argumentRichContent, setArgumentRichContent] = useState(null);
    const [userPositionId, setUserPositionId] = useState(null);
    const [argumentId, setArgumentId] = useState(null);
    const [flash, setFlash] = useState(false);
    const [inputActivation, setInputActivation] = useState(false);
    const [editElement, setEditElement] = useState({});
    const [savedArgument, setSavedArgument] = useSessionStorageState("userSide", {});
	const requireAuthentication = useAuthRequired();
	const { showModal } = useModal();
    const { toast } = useToast() || {};
    const urlParams = new URLSearchParams(window !== "undefined" ? window.location.search : location.search);
    const inputDisabledForVisitors = (!isLoggedIn && config?.actions?.disableInputForVisitor)

    useEffect(() => {
        let positionIdParam = null;
        if(typeof window !== 'undefined') {
            positionIdParam = urlParams.get('positionId');
        }

        if (positionId && positionId !== positions[2]?.id && positions?.find(pos => pos.id === positionId)) {
            setUserPositionId(positionId);
        } else if(positionIdParam) {
            setUserPositionId(positionIdParam);
        } else {
            if (savedArgument && (savedArgument.groupId == groupId) && (savedArgument.positionId !== positions[2]?.id)) {
                setUserPositionId(savedArgument.positionId);
            }
        }
    }, [positionId])

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const initFocus = focusOnInit || urlParams.get('initArgument');
            if (initFocus === true || initFocus === 'true') {
                if(!isLoggedIn) {
                    requireAuthentication({ loginAction: "argument" });
                }
                focusEditor();
                flashEditor();
            }
        }
    }, [])

    useEffect(() => {
        if (focus) {
            scrollToEditor();
            focusEditor();
            setFocus(false);
        }
    }, [focus])

    useEffect(() => {
        if (inputContent?.id) {
            setEditArgument(inputContent);
            focusEditor();
        }
    }, [inputContent])

    const setEditArgument = (eElement) => {
        setEditElement(eElement);
        setInputActivation(true);
        setSources(eElement.sources);
        setArgumentContent(eElement.content);
        setArgumentRichContent(eElement.rich_content);
        setArgumentId(eElement.id);
        scrollToEditor();
        setUserPositionId(eElement.position?.id);
        const rawContent = JSON.parse(eElement.rich_content);
        if(rawContent.hasOwnProperty("root")) {
            setInputRichContent(eElement.rich_content);
        } else {
            setInputContent(eElement.content);
        }
    }

    const scrollToEditor = () => {
        inputForm.current.scrollIntoView(false);
    }

    const focusEditor = () => {
        setFocus(true);
    }

    const resetInputs = () => {
       setArgumentContent("");
       setArgumentRichContent(null);
       setEditElement({});
       setArgumentId(null);
       setSources([]);
       setReset(true);
    }

    const handleChooseSide = (positionId) => {
		setUserPositionId(positionId);
        submitArgument(positionId);
	}

    const showSideModal = () => {
        showModal(
            <Suspense fallback={null}>
                <SideModal 
                    modalTitle={intl.formatMessage({ id: "modal.side_modal.modal_title", defaultMessage: "Choose your side" })}
                    onChooseSide={handleChooseSide}
                    positions={positions}
                    title={groupName}
                    disabledPositions={!isReply && disabledPositions}
                    isNeutral={savedArgument && (savedArgument.groupId == groupId) && (savedArgument.positionId === (positions[2] && positions[2].id))}
                />
            </Suspense>
        );
    }

    const handleFormSubmit = () => {
        if (isLoggedIn) {
            if (argumentId) {
                updateArgument();
            } else {
                if ((!disabledPositions?.find(pos => pos.id === userPositionId) && (userPositionId || !positions)) || (currentUser.is_expert && !isReply)) {
                    submitArgument(isReply && currentUser.is_expert && positions[0].id);
                } else {
                    showSideModal();
                }
            }
        } else {
            requireAuthentication({ loginAction: "argument" });
        }
    }

    const handleChange = (content, richContent) => {
        if (inputDisabledForVisitors) {
            requireAuthentication({ loginAction: "argument" });
        } else {
            setArgumentContent(content);
            setArgumentRichContent(richContent);
        }
    }

    const handleSourcesChange = (newSource) => {
        setSources(newSource);
    }

    const argumentValidationRules = [
        { content: ["length", 3] },
        { content: ["required", null] },
        { content: ["url", null]},
        ...(!positions ? [] : [{ position_id: ["required", null] }])
    ]

    const submitArgument = (position) => {
        const userPosition = position ? position : userPositionId;
        const data = {
            content: argumentContent,
            rich_content: argumentRichContent,
            group_id: groupId,
            ...(groupType && { group_type: groupType }),
            ...(userPosition && { position_id: userPosition }),
            is_reply: isReply,
            message_id: isReply ? parentId : null,
            source_ids: sources && sources.map(source => source.id),
        };

        if (validate(data, argumentValidationRules)) {
            if (userPosition && positions && positions.map(position => position.id).includes(userPosition)) {
                const argumentToSave = {
                    groupId: groupId,
                    positionId: userPosition
                }
                setSavedArgument(argumentToSave);
            }
            resetInputs();
            api.create("messages", data).then(response => {
                if(response.data.success) {
                    if (isReply) {
                        onSubmit();
					    toast(intl.formatMessage({ id: "alert.argument_create", defaultMessage: "Your contribution has been sent !" }), { type: "success", points:  intl.formatMessage({ id: "alert.reply_gain" }) });
                    } else {
                        const argument = response.data.data.resource;
                        let listId = argumentListId;
                        if (userPosition && !isMobile) {
                            listId = `argumentList${argument.position.id}`;
                        }
                        if (onSubmit) {
                            onSubmit(argumentContent, positions.find(pos => pos.id === userPosition));
                        }
                        list.add(listId, [argument]);
                        toast(intl.formatMessage({ id: "alert.argument_create", defaultMessage: "Your contribution has been sent !" }), { type: "success", points:  intl.formatMessage({ id: "alert.argument_create_gain", defaultMessage: "Up to 10 eloquence points" }), category: "ARGUMENT", contentKey: currentUser.messages_count === 2 ? "alert.third_argument" : "alert.first_argument" });
                    }
                    window.dispatchEvent(
                        new CustomEvent("logora:user_content:created", {
                            detail: {
                                content: response.data.data?.resource
                            }
                        })
                    );
                }
            });
        }
    }

    const updateArgument = () => {
        const data = {
            content: argumentContent,
            rich_content: argumentRichContent,
            source_ids: sources && sources.map(source => source.id),
            ...(userPositionId && { position_id: userPositionId }),
        };

        if (validate(data, argumentValidationRules)) {
            api.update("messages", argumentId, data).then(response => {
                if(response.data.success) {
                    const argument = response.data.data.resource;
                    let listId = argumentListId;
                    if (userPositionId && !isMobile) {
                        listId = `argumentList${argument.position?.id}`;
                    }
                    if (editElement?.position?.id != argument.position?.id && !isMobile && !argument.is_reply) {
                        let oldListId = `argumentList${editElement.position.id}`;
                        let newListId = `argumentList${argument.position.id}`;
                        list.remove(oldListId, [argument]);
                        list.add(newListId, [argument]);
                    } else {
                        list.update(listId, [argument]);
                    }
					toast(intl.formatMessage({ id: "alert.argument_modify" }), { type: "success" });
                    resetInputs();
                }
            });
        }
    }

    const flashEditor = () => {
        if(!flash) {
            setFlash(true);
            const timer = setTimeout(() => {
              setFlash(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }

    const handleTextEditorActivation = () => {
        if (inputDisabledForVisitors) {
            requireAuthentication({ loginAction: "argument" });
        } else {
            setInputActivation(true);
        }
    }

    const displayArgumentLimitWarning = () => {
        let disabledPosition = disabledPositions.find(pos => pos.id === userPositionId);
        if(disabledPosition) {
            return intl.formatMessage({ id: "info.argument_side_limit", defaultMessage: "You have reached the argument limit (10) for position {position}." }, { position: disabledPosition.name })
        }
    }

    return (
        <div className={styles.inputContainer}>
            { disabled && (<div className={styles.disabledInputMask}>{ intl.formatMessage({ id: "info.debate_is_inactive", defaultMessage: "Debate is closed" }) }</div>) }
            <div className={cx(styles.argumentInput, { [styles.flash]: flash, [styles.replyInputContainer]: isReply })}>
                <div data-tid={"action_add_argument"} ref={inputForm}>
                    <div className={styles.argumentInputBox}>
                        {positions && isLoggedIn && (!isReply || !currentUser.is_expert) &&
                            <div className={styles.userPosition}>
                                <div>{intl.formatMessage({ id: "input.position", defaultMessage: "Your position" })}</div>
                                <TogglePosition 
                                    activeLabel={userPositionId === positions[0].id ? 0 : (userPositionId === positions[1].id ? 1 : null)}
                                    firstLabel={positions[0]}
                                    secondLabel={positions[1]}
                                    onChange={(label) => setUserPositionId(positions[label].id)}
                                />
                            </div>
                        }
                        <div className={cx(styles.argumentTextInputBox, {[styles.argumentTextInputBoxisTablet]: !isMobile, [styles.replyEditorRow]: isReply})}>
                            <div className={cx(styles.argumentAuthorContainer,{[styles.argumentAuthorContainerMobile]: isMobile, [styles.argumentAuthorContainerActivated]: inputActivation || isReply})}>
                                { inputActivation || isReply ?
                                    <Avatar avatarUrl={currentUser.image_url} userName={currentUser.full_name} size={avatarSize} />
                                :
                                    <AuthorBox
                                        fullName={currentUser?.full_name || intl.formatMessage({ id: "default_author.full_name" })}
                                        avatarUrl={currentUser?.image_url}
                                        points={currentUser?.points || 0}
                                        slug={currentUser?.hash_id}
                                    />
                                }
                                
                            </div>
                            <div onClick={handleTextEditorActivation} data-testid="argument-input" className={cx(styles.textEditorBox, {[styles.replyTextEditorBox]: isReply})}>
                                <TextEditor 
                                    handleChange={(value, rawValue) => { handleChange(value, rawValue); } }
                                    handleSourcesChange={(sources) => { handleSourcesChange(sources); } }
                                    placeholder={placeholder}
                                    onSubmit={handleFormSubmit}
                                    sources={sources}
                                    hideSourceAction={hideSourceAction || inputDisabledForVisitors}
                                    uid={`Argument${groupId}`}
                                    onActivation={handleTextEditorActivation}
                                    showStylesControls={inputActivation}
                                    disabled={disabled || inputDisabledForVisitors}
                                    maxLength={inputDisabledForVisitors ? false : config?.actions?.argumentMaxLength}
                                    disableRichText={config?.actions?.disableRichText || inputDisabledForVisitors}
                                    shortBar={isReply}
                                    hideSubmit={inputDisabledForVisitors}
                                />
                                { (errors && errors.content) && <div className={styles.argumentInputWarning}>{errors && Object.values(errors).map((e, index) => <div key={index}>{e}</div>)}</div> }
                                { inputActivation && disabledPositions?.find(pos => pos.id === userPositionId) &&
                                    <div className={cx(styles.argumentInputWarning, styles.disabledPositionWarning)}>
                                        <Icon name="announcement" className={styles.warningIcon} height={20} width={20} /> 
                                        <div className={styles.argumentInputWarningText}>{ displayArgumentLimitWarning() }</div>
                                    </div>
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

ArgumentInput.propTypes = {
    /** Id of the list */
    argumentListId: PropTypes.string,
    /** Size of the user avatar */
    avatarSize: PropTypes.number,
    /** If true, disables the input */
    disabled: PropTypes.bool,
    /** Positions in the debate */
    positions: PropTypes.array,
    /** If true, disables the position */
    disabledPositions: PropTypes.array,
    /** Id of the group */
    groupId: PropTypes.number,
    /** Name of the group */
    groupName: PropTypes.string,
    /** Type of the group */
    groupType: PropTypes.string,
    /** If true, hide source button */
    hideSourceAction: PropTypes.bool,
    /** If true, slightly modify the design and submit */
    isReply: PropTypes.bool,
    /** Callback function when submit */
    onSubmit: PropTypes.func,
    /** Id of the parent, if reply */
    parentId: PropTypes.number,
    /** Placeholder to display */
    placeholder: PropTypes.string.isRequired,
    /** Position of the argument */
    positionId: PropTypes.number,
    /** Focus input on initialization */
    focusOnInit: PropTypes.bool
};