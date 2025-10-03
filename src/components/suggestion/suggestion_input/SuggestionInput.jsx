import React, { useState, useRef, useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useDataProvider } from "@logora/debate.data.data_provider";
import { useAuth } from "@logora/debate.auth.use_auth";
import { useInput } from "@logora/debate.input.input_provider";
import { useList } from "@logora/debate.list.list_provider";
import { useAuthRequired } from "@logora/debate.hooks.use_auth_required";
import { useFormValidation } from "@logora/debate.forms.use_form_validation";
import { Button } from "@logora/debate.action.button";
import { TextInput } from "@logora/debate.input.text_input";
import { useToast } from "@logora/debate.dialog.toast_provider";
import useSessionStorageState from '@rooks/use-sessionstorage-state';
import cx from "classnames";
import styles from "./SuggestionInput.module.scss";

export const SuggestionInput = ({
	onSubmit = null,
	maxLength = 140,
	maxPerUser = 5,
	disabled = false,
	userGuideUrl,
	hideUserGuideLink = false
}) => {
	const intl = useIntl();
	const api = useDataProvider();
	const list = useList();
	const { toast } = useToast() || {};
	const { isLoggedIn } = useAuth();
	const { focus, setFocus } = useInput();
	const { errors, validate } = useFormValidation();
	const [active, setActive] = useState(true);
	const [flash, setFlash] = useState(false);
	const [suggestion, setSuggestion] = useState("");
	const [savedSuggestion, setSavedSuggestion, removeSavedSuggestion] =
	    useSessionStorageState("userSuggestion", {});
	const suggestionInputContainer = useRef(null);
	const inputForm = useRef(null);
	const requireAuthentication = useAuthRequired();

	useEffect(() => {
		if (savedSuggestion?.suggestion) {
			setSuggestion(savedSuggestion.suggestion);
		}
	}, []);

	useEffect(() => {
		if (active) {
			const saveContent = setInterval(() => {
				if (suggestion?.length > 0) {
					const suggestionToSave = {
						suggestion: suggestion,
					};
					setSavedSuggestion(suggestionToSave);
				}
			}, 1000);
			return () => clearInterval(saveContent);
		}
	}, [active, suggestion]);

	useEffect(() => {
		if (focus) {
			scrollToEditor();
			focusEditor();
			flashing();
			setFocus(false);
		}
	}, [focus]);

	const scrollToEditor = () => {
		inputForm.current.scrollIntoView({ behavior: "smooth" });
	};

	const focusEditor = () => {
		inputForm.current.focus();
	};

	const flashing = () => {
		if (!flash) {
			setFlash(true);
			const timer = setTimeout(() => {
				setFlash(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	};

	const resetEditor = () => {
		setSuggestion("");
		removeSavedSuggestion();
	};

	const handleSubmit = () => {
		if (isLoggedIn) {
			const data = {
				name: suggestion,
				position_list: JSON.stringify(intl.formatMessage({
					id: "suggestion.position_list",
					defaultMessage: "Yes,No",
				}).split(",")),
				is_suggestion: true,
				is_published: false,
			};
			const suggestionValidationRules = [
				{ name: ["length", 3] },
				{ name: ["maxChar", maxLength] },
				{ name: ["question", null] },
			];
			if (validate(data, suggestionValidationRules)) {
				setSuggestion("");
				resetEditor();
				setActive(false);
				api.create("groups", data).then((response) => {
					if (response.data.success) {
						const suggestion = response.data.data.resource;
						list.add("suggestionsList", [suggestion]);
						toast(
							intl.formatMessage({
								id: "alert.suggestion_create",
								defaultMessage: "Your suggestion has been sent !",
							}),
							{ type: "success" },
						);
						if (onSubmit) {
							onSubmit();
						}
					}
				});
			}
		} else {
			requireAuthentication({});
		}
	};

	return (
		<div
			className={styles.suggestionInputContainer}
			ref={suggestionInputContainer}
		>
			<>
				<div className={cx(styles.suggestionInputItem)}>
					<div className={styles.suggestionInputTitle}>
						<FormattedMessage
							id="suggestion.input_title"
							defaultMessage="Your suggestion"
						/>
					</div>
					<TextInput
						ref={inputForm}
						type="text"
						aria-label={intl.formatMessage({ id: "suggestion.suggestion_input.aria_label", defaultMessage: "Suggest a debate question" })}
						name="suggestionInput"
						role="textbox"
						placeholder={intl.formatMessage({
							id: "suggestion.input_placeholder",
							defaultMessage: "Suggest a debate question",
						})}
						onChange={(e) => {
							setSuggestion(e.target.value);
						}}
						value={suggestion}
						disabled={disabled}
						error={Object.keys(errors).length > 0}
						required
						message={errors?.name}
						maxLength={maxLength}
						activeLabel={false}
					/>
					<div className={styles.charactersCount}>
						{maxLength - suggestion.length}{" "}
						{intl.formatMessage({
							id: "input.remaining_chars",
							defaultMessage: "remaining characters",
						})}
					</div>
					{userGuideUrl && !hideUserGuideLink &&(
						<div className={styles.guideMessage}>
							<FormattedMessage
								id="alert.guide_message"
								defaultMessage={"Contributions must comply with our {userCharter}."}
								values={{
									userCharter: (
										<a className={styles.guideMessage} href={userGuideUrl} target="_blank" >
											<FormattedMessage id="alert.user_charter" defaultMessage="user charter" />
										</a>
									),
								}}
							/>
						</div>
					)}
					<div className={styles.suggestionInputSubtitle}>
						{intl.formatMessage(
							{
								id: "suggestion.input_info",
								defaultMessage:
									"The positions supported will be YES / NO. You can only post 5 suggestions at a time. Suggestions may not exceed 140 characters.",
							},
							{
								max_per_user: maxPerUser,
							},
						)}
					</div>
				</div>
				<Button
					handleClick={() => handleSubmit()}
					className={styles.suggestionInputSubmit}
				>
					<FormattedMessage id="action.submit" defaultMessage="Submit" />
				</Button>
			</>
		</div>
	);
};
