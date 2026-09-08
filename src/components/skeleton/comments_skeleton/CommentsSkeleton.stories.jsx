import React from "react";
import { CommentsSkeleton } from "./CommentsSkeleton";

const meta = {
	title: "Skeleton/Comments Skeleton",
	component: CommentsSkeleton,
	args: {
		enableAnimation: true,
		numberOfComments: 3,
	},
	argTypes: {
		enableAnimation: { control: "boolean" },
		numberOfComments: { control: "number" },
	},
};

export default meta;

export const DefaultCommentsSkeleton = {};

export const CommentsSkeletonWithoutAnimation = {
	args: {
		enableAnimation: false,
	},
};
