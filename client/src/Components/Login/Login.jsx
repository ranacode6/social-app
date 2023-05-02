import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const { error } = useSelector((state) => state.user);
	const { message } = useSelector((state) => state.like);

	const loginHandler = (e) => {
		e.preventDefault();
		dispatch(loginUser(email, password));
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
	}, [error, dispatch, message]);
	return (
		<div className="login">
			<form className="loginForm" onSubmit={loginHandler}>
				<Typography variant="h3" style={{ padding: "2rem" }}>
					Social App
				</Typography>
				<input
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Link to="/forgot/password">
					<Typography>Forgot Password?</Typography>
				</Link>
				<Button type="submit">Login</Button>
				<Link to="/register">
					<Typography>New User?</Typography>
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

export default Login;
