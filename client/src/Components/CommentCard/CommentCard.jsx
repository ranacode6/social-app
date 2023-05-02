import React from "react";
import "./CommentCard.css";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost, getMyPosts } from "../../Actions/Post";
import { getFollowingPosts, getUserPosts } from "../../Actions/User";

const CommentCard = ({
	userId,
	name,
	avatar,
	comment,
	commentId,
	postId,
	isAccount,
}) => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { user } = useSelector((state) => state.user);
	const deleteCommentHandler = () => {
		dispatch(deleteCommentOnPost(postId, commentId));
		dispatch(getUserPosts(id));

		if (isAccount) {
			dispatch(getMyPosts());
		} else {
			dispatch(getFollowingPosts());
		}
	};

	return (
		<div className="commentUser">
			<Link to={`/user/${userId}`}>
				<img src={avatar} alt={name} />
				<Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
			</Link>
			<Typography>{comment}</Typography>
			{isAccount ? (
				<Button onClick={deleteCommentHandler}>
					<Delete />
				</Button>
			) : userId === user._id ? (
				<Button onClick={deleteCommentHandler}>
					<Delete />
				</Button>
			) : null}
		</div>
	);
};

export default CommentCard;
