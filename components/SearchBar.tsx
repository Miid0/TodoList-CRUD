import React from 'react'

interface SearchProps {
	SubmitHandler: any;
	value: string;
	ChangeHandler: any;
}

export default function SearchBar({ SubmitHandler, value, ChangeHandler }: SearchProps) {
	return (
		<form onSubmit={SubmitHandler}>
			<input type="text" placeholder='tasks' value={value} onChange={ChangeHandler} />
			<button type='submit' onClick={SubmitHandler}>Add</button>
		</form>
	)
}