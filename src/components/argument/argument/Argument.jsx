import React, { Suspense, lazy, useEffect, useState } from "react";
import { useAuth } from "@logora/debate.auth.use_auth";
import { useConfig } from '@logora/debate.data.config_provider';
import { useIntl, FormattedMessage } from "react-intl";
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import { ContentHeader } from '@logora/debate.user_content.content_header';
import { ExpandableText } from '@logora/debate.text.expandable_text';
import { Icon } from '@logora/debate.icons.icon';
import { lexicalToHtml } from "@logora/debate.input.text_editor";
import { TranslationButton } from '@logora/debate.translation.translation_button';
import { UserContentSkeleton } from '@logora/debate.skeleton.user_content_skeleton';
import { AnnouncementDialog } from "@logora/debate.dialog.announcement_dialog";
import { SourceListItem } from "@logora/debate.source.source_list_item";
import { Avatar } from "@logora/debate.user.avatar";
import { ContentFooter } from '@logora/debate.user_content.content_footer';
import { VoteButton } from '@logora/debate.vote.vote_button';
import { Button } from '@logora/debate.action.button';
import { VotePaginatedList } from '@logora/debate.list.paginated_list';
import cx from "classnames";
import draftToHtml from "draftjs-to-html";
import styles from "./Argument.module.scss";
const ArgumentInput = lazy(() => import('@logora/debate.input.argument_input'));
import { HashScroll } from '@logora/debate.tools.hash_scroll';
import PropTypes from "prop-types";

export const Argument = ({ argument, argumentReplies, nestingLevel, debatePositions, disableLinks, replyToArgument, flashParent, expandable, debateIsActive, isComment, hideReplies, debateName, vote, fixedContentHeight, enableEdition = true, deleteListId }) => {
	const [expandReplies, setExpandReplies] = useState(false);
	const [flash, setFlash] = useState(false);
	const [startReplyInput, setStartReplyInput] = useState(false);
	const [richContent, setRichContent] = useState(null);
	const [replies, setReplies] = useState([]);
	const [activeAnchor, setActiveAnchor] = useState(false);
	const intl = useIntl();
	const { currentUser } = useAuth();
	const content = useTranslatedContent(argument.content, argument.language, "content", argument.translation_entries);
	const position = useTranslatedContent(argument.position?.name, argument.position?.language, "name", argument.position?.translation_entries);
	const config = useConfig();
	const componentId = "argument_" + argument.id;

	useEffect(() => {
        if (argument.rich_content && argument.is_deleted != true) {
            const rawContent = JSON.parse(argument.rich_content);
            if(rawContent.hasOwnProperty("root")) {
                const html = lexicalToHtml(rawContent);
                setRichContent(html);
            } else {
                const htmlContent = draftToHtml(rawContent);
                setRichContent(htmlContent);
            }
        }
    }, [argument.rich_content]);
	
	useEffect(() => {
		if (argumentReplies !== undefined) { displayRepliesThread() }
	}, [argumentReplies])

	const scrollToArgument = (argumentId) => {
		const currentArgumentId = componentId;
		if (currentArgumentId === argumentId) {
			let argumentElement = document.getElementById(argumentId);
			if (argumentElement) {
				argumentElement.scrollIntoView({behavior: "smooth"});
			}
			setFlash(true);
		}
	};

	const displaySource = (source, index) => {
		return <SourceListItem key={index} publisher={source.publisher} url={source.source_url} title={source.title} index={index} />;
	};

	const toggleReplyInput = () => {
		setStartReplyInput(!startReplyInput);
	};

	const toggleReplies = () => {
		setExpandReplies(!expandReplies);
		setActiveAnchor(true);
	};

	const displayRepliesThread = () => {
		let filteredReplies = argumentReplies && argumentReplies.filter((reply) => reply.reply_to_id == argument.id);
		if (filteredReplies.length > 0) {
			setReplies(filteredReplies);
		}
	};

	const expandAnchorReplies = () => {
		setExpandReplies(true);
		setActiveAnchor(true);
	};

	return (
		<HashScroll elementId={componentId} onScroll={() => setFlash(true)}>
			<div
				className={cx(
					styles.argument,
					{ 
						[styles.flash]: flash, 
						[styles.argumentReply]: argument.is_reply == true, 
					},
					styles[`level-${nestingLevel}`],
					styles[`position-${!argument.author.is_expert && debatePositions && debatePositions.map((e) => e.id).indexOf(argument.position.id) + 1}`]
				)}
				id={componentId}
			>
				<ContentHeader
					selectedContent={argument.score == 99}
					author={argument.author}
					tag={(argument.author.is_expert && argument.is_reply) ? null : position.translatedContent}
					date={argument.created_at}
					tagClassName={styles[`headerPosition-${debatePositions && debatePositions.map((e) => e.id).indexOf(argument.position.id) + 1}`]}
					disableLinks={disableLinks}
					isDeleted={argument.is_deleted}
				/>
				{ argument.is_deleted ?
					<div className={styles.argumentDeletedBody}>
						{ intl.formatMessage({ id: "info.deleted_by_user", defaultMessage: "Content deleted by the user" }) }
					</div>
				:
					<>
						<div className={cx(styles.argumentBody, { [styles.fixedHeight]: fixedContentHeight, [styles.commentArgument]: isComment })}>
							{ argument.is_reply && replyToArgument && 
								<div className={styles.replyTo} onClick={() => flashParent(replyToArgument.id)}>
									{ intl.formatMessage({ id: "info.replying_to", defaultMessage: "Replying to" }) }
									<span className={styles.replyingTo}>
										{ replyToArgument.is_deleted ? intl.formatMessage({ id: "info.deleted", defaultMessage: "Deleted" }) : replyToArgument.author.full_name}
										<Icon  name="chat" height={16} />
									</span>
								</div> 
							}
							{argument.is_reply 
							&& config.translation.enable === true 
							&& argument.language !== intl.locale 
							&& !argument.translation_entries?.some(element => element.status === "accepted" && element.target_language === intl.locale) ?
								<div>
									<AnnouncementDialog 
										message={intl.formatMessage({ id: "translations.argument_not_translated", defaultMessage: "This argument has not yet been translated into your language." })}
										fullWidth
									/>
								</div>
							:
								<ExpandableText
									expandable={expandable}
									expandText={intl.formatMessage({ id: "action.read_more", defaultMessage: "Read more" })}
									collapseText={intl.formatMessage({ id: "action.read_less", defaultMessage: "Read less" })}
									isReply={argument.is_reply}
								>
									{ argument.edited_at && <div className={styles.edited}>{ intl.formatMessage({ id: "argument.argument.updated", defaultMessage: "Updated argument" }) }</div> }
									{richContent && !content.isTranslated ? (
										<div
											className={styles.argumentContent}
											dangerouslySetInnerHTML={{ __html: richContent }}
										></div>
									) : (
										<div className={styles.argumentContent}>{content.translatedContent}</div>
									)}
									{content.isTranslated &&
										<TranslationButton language={argument.language} callback={() => content.toggleContent()} />
									}
								</ExpandableText>
							}
						</div>
						{(!argument.sources || argument.sources.length === 0) ? null : (
							<div className={styles.argumentSourcesList}>{argument.sources.map(displaySource)}</div>
						)}
					</>
				}
				{ !argument.is_deleted &&
					<ContentFooter
						resource={argument}
                    	disabled={!debateIsActive}
						reportType={"Message"}
						softDelete={config.actions?.softDelete}
						deleteType={"messages"}
						deleteListId={deleteListId}
						enableReply={nestingLevel <= 2}
						handleReplyTo={toggleReplyInput}
						shareButton={!isComment}
						shareUrl={"https://app.logora.fr/share/a/" + argument.id}
						shareTitle={ intl.formatMessage({ id: "share.argument.title", defaultMessage: "Share a debate"}) }
						shareText={ intl.formatMessage({ id: "share.argument.text", defaultMessage: "This argument may interest you"}) }
						shareCode={'<iframe src="https://cdn.logora.com/embed.html?shortname=' + config.shortname + '&id=' + argument.id + '&resource=argument" frameborder="0" width="100%" height="275px" scrolling="no"></iframe>'}
						showShareCode={config?.actions?.hideCodeShare != true}
						showShareText
						leftReply={isComment}
						enableReport={!(argument.score == 100 && argument.manual_score)}
						enableEdition={enableEdition}
					>
						<VoteButton
							voteableType={"Message"}
							voteableId={argument.id}
							totalUpvote={argument.upvotes}
							totalDownvote={0}
							activeClassName={styles[`voteButtonPosition-${debatePositions?.map((e) => e.id).indexOf(argument.position.id) + 1}`]}
							disabled={!debateIsActive}
						/>
					</ContentFooter>
				}
				{ argument.number_replies > 0 && !hideReplies &&
					<div className={cx(styles.replyFooter, {[styles.commentReplyFooter]: isComment})} onClick={toggleReplies}>
						{ argument.replies_authors.map((author, index) => 
							<Avatar key={index} avatarUrl={author.image_url} userName={author.full_name} size={32} />
						)}
						<div
							className={styles.expandRepliesContainer}
						>
							<button
								tabIndex='0'
								className={cx(styles.expandRepliesButton, {[styles.repliesExpanded]: expandReplies})}
							>
								<FormattedMessage
									id={expandReplies ? "alt.hide_answers" : "alt.view_answers"}
									values={{ number_replies: argument.number_replies }}
                                    defaultMessage={expandReplies ? "Hide answers" : "View answers"}
								/>
								<Icon name="lightArrow" width={10} height={10} />
							</button>
						</div>
					</div>
				}
			</div>
			{ !hideReplies && 
				<>
					{ startReplyInput && (
						<Suspense fallback={null}>
							<ArgumentInput
								key={`Reply${argument.id}`}
								groupId={argument.group_id}
								groupType={isComment && "Source"}
								groupName={debateName}
								positions={debatePositions}
								parentId={argument.id}
								positionId={vote?.position_id}
								disabled={!debateIsActive}
								hideSourceAction={config?.actions?.disableUserSources || false}
								onSubmit={() => { 
									toggleReplyInput();
									toggleReplies();
								}}
								isReply
								avatarSize={40}
								placeholder={intl.formatMessage({ id:"input.reply_input.your_answer", defaultMessage: "Your answer" })}
							/>
						</Suspense>
					)}
					{ expandReplies &&
						<div className={styles.repliesList}>
							<VotePaginatedList
								voteableType={"Message"}
								currentListId={"argument_" + argument.id + "_reply_list"}
								loadingComponent={<UserContentSkeleton />}
								resource={"/messages/" + argument.id + "/replies"}
								sort={"+created_at"}
								perPage={5}
								display={"column"}
								transformData={elm => (elm.status === "accepted" || elm.author.id === currentUser.id)}
								resourcePropName={'argument'}
							>
								<ArgumentContainer 
									positionIndex={debatePositions && debatePositions.map((e) => e.id).indexOf(argument.position.id) + 1}
									nestingLevel={nestingLevel + 1}
									debateIsActive={debateIsActive}
									debateName={debateName}
									debatePositions={debatePositions && debatePositions}
									replies={argumentReplies}
									replyToArgument={argument}
									flashParent={(argumentId) => scrollToArgument(`argument_${argumentId}`)}
									isComment={isComment}
								/>
							</VotePaginatedList>
						</div>
					}
					{ argumentReplies?.length > 0 && replies?.length > 0 && !expandReplies && !activeAnchor &&
						<div className={styles.repliesList}>
							<ArgumentContainer 
								argument={replies[0]}
								positionIndex={debatePositions && debatePositions.map((e) => e.id).indexOf(argument.position.id) + 1}
								nestingLevel={nestingLevel + 1}
								debateIsActive={debateIsActive}
								debateName={debateName}
								debatePositions={debatePositions && debatePositions}
								replies={argumentReplies}
								replyToArgument={argument}
								flashParent={(argumentId) => scrollToArgument(`argument_${argumentId}`)}
								isComment={isComment}
							/>
							{ argumentReplies?.length > 1 && argumentReplies[argumentReplies.length -1].id === argument.id &&
								<div className={styles.readMoreLink}>
									<Button 
										role="link" 
										rightIcon={<Icon name="lightArrow" height={10} width={10} />}
										handleClick={() => expandAnchorReplies()}
									>
										{ intl.formatMessage({ id: "argument.argument.see_more", defaultMessage: "See more" }) }
									</Button>
								</div>
							}
						</div>
					}
				</>
			}
		</HashScroll>
	);
};

export const ArgumentContainer = Argument;

Argument.propTypes = {
    /** Argument data */
    argument: PropTypes.object.isRequired,
    /** If reply, array with argument and all parents */
    argumentReplies: PropTypes.array,
	/** Nesting level of the argument */
    nestingLevel: PropTypes.number,
	/** Positions of the debate */
    debatePositions: PropTypes.array.isRequired,
	/** If true, disables links */
    disableLinks: PropTypes.bool,
	/** Parent argument */
    replyToArgument: PropTypes.object,
	/** Flash border of parent argument */
    flashParent: PropTypes.func,
	/** If true, content is expandable */
    expandable: PropTypes.bool,
	/** If false, disabled mode in argument */
    debateIsActive: PropTypes.bool,
	/** If true, enabled comment styles */
    isComment: PropTypes.bool,
	/** If true, hide replies */
    hideReplies: PropTypes.bool,
	/** Name of the debate */
    debateName: PropTypes.string,
	/** Vote data */
    vote: PropTypes.object,
	/** If true, fix argument height */
    fixedContentHeight: PropTypes.bool,
	/** If true, enable edition */
	enableEdition: PropTypes.bool,
	/** Id of the list to delete the item from */
	deleteListId: PropTypes.string,
};