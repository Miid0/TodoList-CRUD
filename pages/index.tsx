import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { connectToDatabase } from "../utils/mongodb";
import { ObjectId } from "mongodb";
import {IoTrashOutline} from "react-icons/io5";
import {HiOutlinePencil} from "react-icons/hi";
import {BiSave} from 'react-icons/bi'
import {MdChecklistRtl} from 'react-icons/md'

interface Data {
	_id: ObjectId;
	content?: string;
	inserted?: number;
	updated?: number;
}

const Home: NextPage = () => {
	const [data, setData] = useState<Array<Data>>([]);
	const [value, setValue] = useState("");
	const [invalidData, setinvalidData] = useState<boolean>(true);
	const [editing, setEditing] = useState<{
		id?: ObjectId | null;
		text?: string;
	}>({ text: "" });

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/todos");
			const data = await res.json();
			setData(data.todos);
			setinvalidData(false);
		};
		if (invalidData) fetchData();
	}, [invalidData]);

	const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (value !== "") {
			fetch(`/api/insert?content=${value}`, { method: "POST" })
				.then((res) => {
					if (res.status == 200) setinvalidData(true);
					setValue("");
				})
				.catch((err) => console.log(err));
		}
	};

	const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let tmp_value = e.target.value;
		setValue(tmp_value);
	};

	const deleteHandler = (
		e: React.SyntheticEvent<HTMLButtonElement>,
		id: ObjectId
	) => {
		e.preventDefault();
		fetch(`/api/delete?_id=${id}`, { method: "POST" })
			.then((res) => {
				if (res.status == 200) setinvalidData(true);
				setValue("");
			})
			.catch((err) => console.log(err));
	};

	const handleUpdateTodo = (
		e: React.SyntheticEvent<HTMLButtonElement>,
		id: ObjectId
	) => {
		e.preventDefault();
		fetch(`/api/update?id=${id}&content=${editing?.text || ""}`, {
			method: "GET",
		})
			.then((res) => {
				if (res.status == 200) setinvalidData(true);
				setEditing({ ...editing, id: null, text: "" });
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="flex min-h-screen flex-col items-center bg-slate-300">
			<Head>
				<title>Todo list</title>
				<meta name="description" content="Todo list" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SearchBar
				SubmitHandler={SubmitHandler}
				ChangeHandler={ChangeHandler}
				value={value}
			/>
			<div className="w-[80%] md:w-[60%] lg:w-[50%]">
				<ul className="m-4 text-lg flex flex-col gap-3">
					{data?.length > 0 &&
						data.map((todo, index) => (
							<li key={index} className="flex justify-between bg-slate-200 p-3 rounded-md">
								{todo._id == editing?.id ? (
									<input className="bg-transparent outline-none pb-1.5 italic"
										value={editing?.text || ""}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setEditing({ ...editing, text: e.target.value })
										}
									></input>
								) : (
									todo.content
								)}
								<div>
								{editing?.text === "" ? (
									<button className="mx-2 py-1.5 px-3 rounded-md bg-slate-300 outline-none"
									onClick={() =>
										setEditing({ id: todo._id, text: todo.content })
									}
									>
										<HiOutlinePencil size={20}/>
									</button>
								) : (
									<button className="mx-2 py-1.5 px-3 rounded-md bg-emerald-400 outline-none" onClick={(e) => handleUpdateTodo(e, todo._id)}>
										<BiSave size={20}/>
									</button>
								)}
								<button className="rounded-md px-2 py-1.5 bg-red-400 outline-none" onClick={(e) => deleteHandler(e, todo._id!)}><IoTrashOutline size={20}/></button>
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};
export default Home;
