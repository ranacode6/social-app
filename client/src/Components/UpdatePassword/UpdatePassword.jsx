import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const dispatch = useDispatch();

	const { error, message, loading } = useSelector((state) => state.like);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updatePassword(oldPassword, newPassword));
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "clearErrors" });
		}

		if (message) {
			toast.success(message);
			dispatch({
				type: "clearMessage",
			});
		}
	}, [error, dispatch, message]);

	return (
		<div className="updatePassword">
			<form className="updatePasswordForm" onSubmit={submitHandler}>
				<Typography variant="h3" style={{ padding: "2rem" }}>
					Social App
				</Typography>

				<input
					type="password"
					placeholder="Old Password"
					className="updatePasswordInputs"
					required
					value={oldPassword}
					onChange={(e) => setOldPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="New Password"
					className="updatePasswordInputs"
					required
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<Button disabled={loading} type="submit">
					Change Password
				</Button>
			</form>
			<ToastContainer
				position="top-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</div>
	);
};

export default UpdatePassword;
