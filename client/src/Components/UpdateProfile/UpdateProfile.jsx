import { Avatar, Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../Actions/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";

const UpdateProfile = () => {
	const { loading, user, error } = useSelector((state) => state.user);
	const {
		loading: updateLoading,
		error: updateError,
		message,
	} = useSelector((state) => state.like);

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [avatar, setAvatar] = useState("");
	const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

	const dispatch = useDispatch();

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		const Reader = new FileReader();
		Reader.readAsDataURL(file);

		Reader.onload = () => {
			if (Reader.readyState === 2) {
				setAvatarPrev(Reader.result);
				setAvatar(Reader.result);
			}
		};
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		await dispatch(updateProfile(name, email, avatar));
		dispatch(loadUser());
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "clearErrors" });
		}

		if (updateError) {
			toast.error(updateError);
			dispatch({ type: "clearErrors" });
		}

		if (message) {
			toast.success(message);
			dispatch({
				type: "clearMessage",
			});
		}
	}, [error, updateError, dispatch, message]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div className="update">
					<form className="updateForm" onSubmit={submitHandler}>
						<Typography variant="h3" style={{ padding: "2vmax" }}>
							Update Profile
						</Typography>

						<Avatar
							src={avatarPrev}
							alt="user"
							sx={{ height: "10vmax", width: "10vmax" }}
						/>

						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>

						<input
							type="text"
							placeholder="Name"
							className="updateInputs"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="email"
							placeholder="Email"
							className="updateInputs"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Button disabled={updateLoading} type="submit">
							Update
						</Button>
					</form>
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

export default UpdateProfile;
