import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const [avatar, setAvatar] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.user);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		const Reader = new FileReader();
		Reader.readAsDataURL(file);

		Reader.onload = () => {
			if (Reader.readyState === 2) {
				setAvatar(Reader.result);
			}
		};
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(registerUser(name, email, password, avatar));
	};

	useEffect(() => {
		if (error) {
			toast.error(error, {
				toastId: "error1",
			});
			dispatch({ type: "clearErrors" });
		}
	}, [error, dispatch]);

	return (
		<div className="register">
			<form className="registerForm" onSubmit={submitHandler}>
				<Typography variant="h3" style={{ padding: "2vmax" }}>
					Social App
				</Typography>

				<Avatar
					src={avatar}
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
					className="registerInputs"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Email"
					className="registerInputs"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="registerInputs"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button disabled={loading} type="submit">
					Register
				</Button>
				<Link to="/">Already Signed Up! Login Now</Link>
			</form>
			<ToastContainer
				position="top-center"
				hideProgressBar={true}
				theme="dark"
			/>
		</div>
	);
};

export default Register;
