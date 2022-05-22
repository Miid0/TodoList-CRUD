import React from 'react'

interface creatTask {
	todo: string;
	inserted: number;
}

interface updateTask extends creatTask {
	updated?: number;
}

const getTime = (timestamp: number) => {
	const d = new Date(timestamp);
	return (d.toString().split(' ').slice(1, 5).join(' '));
}

interface Props {
	children: JSX.Element | JSX.Element[]
}

export default function Task({ children }: Props) {
	return (
		<div className="w-[80%] flex justify-between">
			{children}
		</div>
	)
}