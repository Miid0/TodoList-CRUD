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

export default function Task({ todo, inserted }: updateTask) {
	return (
		<div>
			<h2>{todo}</h2>
			<span>{inserted}</span>
		</div>
	)
}