"use client";
import { DataSourceContext } from "@/context/dataSourceProvider";
import { useContext } from "react";

function Item01() {
	const { name, avatar, birth, phone } = useContext(DataSourceContext);
	return (
		<div className='w-full h-full flex gap-5 select-none bg-blue-300'>
			<img src={avatar} className='w-30 object-cover' alt='' draggable={false} />
			<div className='flex flex-col'>
				<div>{name}</div>
				<div>{birth}</div>
				<div>{phone}</div>
			</div>
		</div>
	);
}

export default Item01;
