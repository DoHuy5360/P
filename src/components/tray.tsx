"use client";
import { Forms, convertItemToJSX, keyFactor } from "@/app/home/page";
import { useCallback, useState } from "react";

type TrayProps = {
	index: number;
	forms: Forms[];
	data: Forms;
	setForms: Function;
};

function Tray({ index, forms, data, setForms }: TrayProps) {
	const [isShowActions, setShowActions] = useState(false);
	const handleAddAbove = useCallback(() => {
		const newForm: Forms[] = convertItemToJSX([
			{
				id: keyFactor(),
				items: {
					id: "it:1",
					jsx: "Item01",
				},
				background: "lightgreen",
			},
		]);
		if (index === 0) {
			setForms([...newForm, ...forms]);
		} else {
			forms.splice(index, 0, ...newForm);
			setForms([...forms]);
		}
	}, [index, data, forms, setForms]);
	const handleAddBelow = useCallback(() => {
		const newForm: Forms[] = convertItemToJSX([
			{
				id: keyFactor(),
				items: {
					id: "it:1",
					jsx: "Item01",
				},
				background: "lightpink",
			},
		]);
		if (index === forms.length) {
			setForms([...forms, ...newForm]);
		} else {
			forms.splice(index + 1, 0, ...newForm);
			setForms([...forms]);
		}
	}, [index, data, forms, setForms]);
	const handleDelete = useCallback(() => {
		forms.splice(index, 1);
		setForms([...forms]);
	}, [index, data, forms, setForms]);
	return (
		<div
			onMouseOver={() => {
				setShowActions(true);
			}}
			onMouseLeave={() => {
				setShowActions(false);
			}}
			style={{
				background: data.background,
			}}
			className='flex flex-col items-center hover:border-slate-900 border-2 border-transparent relative'
		>
			{isShowActions && (
				<div
					onClick={handleAddAbove}
					className='w-5 bg-yellow-300 cursor-pointer absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%] z-10'
				>
					+
				</div>
			)}
			<div className='w-full h-20'>
				{data.id}|{index}
			</div>
			<data.items.jsx />

			{isShowActions && (
				<div
					onClick={handleAddBelow}
					className='w-5 bg-yellow-300 cursor-pointer absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] z-10'
				>
					+
				</div>
			)}
			{isShowActions && (
				<div onClick={handleDelete} className='w-5 bg-red-500 cursor-pointer absolute top-[50%] right-0 translate-x-[50%] translate-y-[-50%] z-10'>
					x
				</div>
			)}
		</div>
	);
}

export default Tray;
