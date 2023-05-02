import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
	const [newPassword, setNewPassword] = useState("");
	const dispatch = useDispatch();
	const { token } = useParams();
	const { loading, message, error } = useSelector((state) => state.like);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPassword(token, newPassword));
	};

	useEffect(() => {
		if (error) {
			toast.error(error, {
				toastId: "error1",
			});
			dispatch({ type: "clearErrors" });
		}

		if (message) {
			toast.success(message, {
				toastId: "success1",
			});
			dispatch({ type: "clearMessage" });
		}
	}, [error, message, dispatch]);
	return (
		<div className="resetPassword">
			<form className="resetPasswordForm" onSubmit={handleSubmit}>
				<Typography variant="h3" style={{ padding: "2vmax" }}>
					Social App
				</Typography>

				<input
					type="password"
					placeholder="New Password"
					required
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>

				<Button disabled={loading} type="submit">
					Reset Password
				</Button>

				<Link to="/">
					<Typography>Login!</Typography>
				</Link>
				<Typography>Or</Typography>

				<Link to="/forgot/password">
					<Typography>Request Another Token!</Typography>
				</Link>
			</form>
			<ToastContainer
				position="top-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</div>
	);
};

export default ResetPassword;
