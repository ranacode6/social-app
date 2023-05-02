import React, { Fragment, useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import User from "../User/User";
import { useParams } from "react-router-dom";
import {
	followAndUnfollowUser,
	getUserPosts,
	getUserProfile,
} from "../../Actions/User";

const UserProfile = () => {
	const dispatch = useDispatch();

	const { user, loading: userLoading } = useSelector(
		(state) => state.userProfile
	);

	const { user: me } = useSelector((state) => state.user);
	const { loading, posts, error } = useSelector((state) => state.userPosts);
	const {
		error: followError,
		message,
		loading: followLoading,
	} = useSelector((state) => state.like);

	const { id } = useParams();
	const [followersToggle, setFollowersToggle] = useState(false);
	const [followingToggle, setFollowingToggle] = useState(false);
	const [following, setFollowing] = useState(false);
	const [myProfile, setMyProfile] = useState(false);

	const followHandler = async () => {
		setFollowing(!following);
		await dispatch(followAndUnfollowUser(id));
		dispatch(getUserProfile(id));
	};

	useEffect(() => {
		dispatch(getUserPosts(id));
		dispatch(getUserProfile(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (me._id === id) {
			setMyProfile(true);
		}
		if (user) {
			user.followers.forEach((item) => {
				if (item._id === me._id) {
					setFollowing(true);
				} else {
					setFollowing(false);
				}
			});
		}
	}, [user, me._id, id]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "clearErrors" });
		}

		if (followError) {
			toast.error(followError);
			dispatch({ type: "clearErrors" });
		}

		if (message) {
			toast.success(message);
		}
	}, [dispatch, followError, message, error]);

	return (
		<Fragment>
			{loading === true || userLoading === true ? (
				<Loader />
			) : (
				<div className="account">
					<div className="accountLeft">
						{posts && posts.length > 0 ? (
							posts.map((post) => (
								<Post
									key={post._id}
									postId={post._id}
									caption={post.caption}
									postImage={post.image.url}
									likes={post.likes}
									comments={post.comments}
									ownerImage={post.owner.avatar.url}
									ownerName={post.owner.name}
									ownerId={post.owner._id}
								/>
							))
						) : (
							<Typography variant="h5">
								User has not made any post
							</Typography>
						)}
					</div>
					<div className="accountRight">
						{user && (
							<Fragment>
								<Avatar
									src={user.avatar.url}
									sx={{ height: "8vmax", width: "8vmax" }}
								/>

								<Typography variant="h6">
									{user.name}
								</Typography>

								<div>
									<button
										onClick={() =>
											setFollowersToggle(!followersToggle)
										}
									>
										<Typography>Followers</Typography>
									</button>
									<Typography>
										{user.followers.length}
									</Typography>
								</div>

								<div>
									<button
										onClick={() =>
											setFollowingToggle(!followingToggle)
										}
									>
										<Typography>Following</Typography>
									</button>
									<Typography>
										{user.following.length}
									</Typography>
								</div>

								<div>
									<Typography>Posts</Typography>
									<Typography>{user.posts.length}</Typography>
								</div>
								{myProfile ? null : (
									<Button
										variant="contained"
										style={{
											background: following ? "red" : "",
										}}
										onClick={followHandler}
										disabled={followLoading}
									>
										{following ? "UnFollow" : "Follow"}
									</Button>
								)}
							</Fragment>
						)}
						<Dialog
							open={followersToggle}
							onClose={() => setFollowersToggle(!followersToggle)}
						>
							<div className="dialogBox">
								<Typography variant="h4">Followers</Typography>
								{user && user.followers.length > 0 ? (
									user.followers.map((follower) => (
										<User
											key={follower._id}
											userId={follower._id}
											name={follower.name}
											avatar={follower.avatar.url}
										/>
									))
								) : (
									<Typography style={{ margin: "2vmax" }}>
										You have no followers
									</Typography>
								)}
							</div>
						</Dialog>

						<Dialog
							open={followingToggle}
							onClose={() => setFollowingToggle(!followingToggle)}
						>
							<div className="dialogBox">
								<Typography variant="h4">Following</Typography>
								{user && user.following.length > 0 ? (
									user.following.map((follow) => (
										<User
											key={follow._id}
											userId={follow._id}
											name={follow.name}
											avatar={follow.avatar.url}
										/>
									))
								) : (
									<Typography style={{ margin: "2vmax" }}>
										You do not follow anyone.
									</Typography>
								)}
							</div>
						</Dialog>
					</div>
				</div>
			)}
			<ToastContainer
				position="top-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</Fragment>
	);
};

export default UserProfile;
