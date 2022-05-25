import React from 'react'

interface SearchProps {
	SubmitHandler: any;
	value: string;
	ChangeHandler: any;
}

export default function SearchBar({ SubmitHandler, value, ChangeHandler }: SearchProps) {
	return (
		<form onSubmit={SubmitHandler} className="my-8 w-full md:w-[80%] flex justify-center">
			<input type="text" placeholder='tasks' value={value} onChange={ChangeHandler} 
				className=" bg-transparent placeholder:text-slate-500 placeholder:italic py-1 px-1.5 outline-none w-[50%]
					focus:border-b-2 focus:border-slate-700 focus:border-opacity-100 transition-all duration-100" />
			<button type='submit' onClick={SubmitHandler} 
				className=" mx-2 rounded-md bg-slate-700 hover:bg-slate-800 transition-all ease-in-out duration-100 text-gray-100 py-1 px-5 outline-none">Add</button>
		</form>
	)
}