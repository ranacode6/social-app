import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import "./ForgotPassword.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const { loading, message, error } = useSelector((state) => state.like);

	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(forgotPassword(email));
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
			dispatch({ type: "clearMessages" });
		}
	}, [error, dispatch, message]);
	return (
		<div className="forgotPassword">
			<form className="forgotPasswordForm" onSubmit={handleSubmit}>
				<Typography variant="h3" style={{ padding: "2vmax" }}>
					Social App
				</Typography>
				<input
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button type="submit" disabled={loading}>
					Send Token
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

export default ForgotPassword;
