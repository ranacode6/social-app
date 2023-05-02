import React, { Fragment, useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../Actions/Post";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import User from "../User/User";
import { deleteMyProfile, logoutUser } from "../../Actions/User";

const Account = () => {
	const dispatch = useDispatch();

	const { user, loading: userLoading } = useSelector((state) => state.user);
	const { loading, posts } = useSelector((state) => state.myPosts);
	const { error: likeError, message } = useSelector((state) => state.like);
	const { error: deleteError, loading: deleteLoading } = useSelector(
		(state) => state.like
	);

	const [followersToggle, setFollowersToggle] = useState(false);
	const [followingToggle, setFollowingToggle] = useState(false);

	const logoutHandler = () => {
		dispatch(logoutUser());
		toast.success("Logged Out Successfully");
	};

	const deleteProfileHandler = async () => {
		await dispatch(deleteMyProfile());
		dispatch(logoutUser());
	};

	useEffect(() => {
		dispatch(getMyPosts());
	}, [dispatch]);

	useEffect(() => {
		if (likeError) {
			toast.error(likeError);
			dispatch({ type: "clearErrors" });
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch({ type: "clearErrors" });
		}
		if (message) {
			toast.success(message);
		}
	}, [dispatch, likeError, message, deleteError]);

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
									isAccount={true}
									isDelete={true}
								/>
							))
						) : (
							<Typography variant="h5">
								You have not made any post
							</Typography>
						)}
					</div>
					<div className="accountRight">
						<Avatar
							src={user.avatar.url}
							sx={{ height: "8vmax", width: "8vmax" }}
						/>

						<Typography variant="h6">{user.name}</Typography>

						<div>
							<button
								onClick={() =>
									setFollowersToggle(!followersToggle)
								}
							>
								<Typography>Followers</Typography>
							</button>
							<Typography>{user.followers.length}</Typography>
						</div>

						<div>
							<button
								onClick={() =>
									setFollowingToggle(!followingToggle)
								}
							>
								<Typography>Following</Typography>
							</button>
							<Typography>{user.following.length}</Typography>
						</div>

						<div>
							<Typography>Posts</Typography>
							<Typography>{user.posts.length}</Typography>
						</div>
						<Button variant="contained" onClick={logoutHandler}>
							Log Out
						</Button>
						<Link to={"/update/profile"}>Edit Profile</Link>
						<Link to={"/update/password"}>Update Password</Link>
						<Button
							variant="text"
							style={{ color: "red", margin: "2vmax" }}
							onClick={deleteProfileHandler}
							disabled={deleteLoading}
						>
							Delete My Profile
						</Button>

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

export default Account;
