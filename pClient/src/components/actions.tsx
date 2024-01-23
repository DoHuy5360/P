"use client";

import React, { Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";
import Center from "./buttons/center";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Component } from "@/app/page";
import { AiOutlineClear } from "react-icons/ai";

type ActionsProps<T> = {
	children: ReactNode;
	index: number;
	elementT: Component<T>;
	arrayT: Component<T>[];
	setArrayT: Dispatch<SetStateAction<Component<T>[]>>;
	getNewItem: () => Component<T>;
};

function Actions<T>({ children, index, arrayT, elementT, setArrayT, getNewItem }: ActionsProps<T>) {
	const { clearing } = elementT.component.permissions;
	const [isShowActions, setShowActions] = useState(false);
	const handleClearItem = useCallback(
		(e: any) => {
			e.stopPropagation();
			arrayT[index].items = null;
			setArrayT([...arrayT]);
		},
		[index, elementT, arrayT, setArrayT]
	);

	const handleAddAbove = useCallback(
		(e: any) => {
			e.stopPropagation();
			const newForm: Component<T> = getNewItem();
			if (index === 0) {
				setArrayT([newForm, ...arrayT]);
			} else {
				arrayT.splice(index, 0, newForm);
				setArrayT([...arrayT]);
			}
		},
		[index, elementT, arrayT.length, setArrayT]
	);
	const handleAddBelow = useCallback(
		(e: any) => {
			e.stopPropagation();
			const newForm: Component<T> = getNewItem();
			if (index === arrayT.length) {
				setArrayT([...arrayT, newForm]);
			} else {
				arrayT.splice(index + 1, 0, newForm);
				setArrayT([...arrayT]);
			}
		},
		[index, elementT, arrayT.length, setArrayT]
	);
	const handleDelete = useCallback(
		(e: any) => {
			e.stopPropagation();
			arrayT.splice(index, 1);
			setArrayT([...arrayT]);
		},
		[index, elementT, arrayT, setArrayT]
	);

	const handleMoveUp = useCallback(
		(e: any) => {
			e.stopPropagation();
			const temp = arrayT[index - 1];
			arrayT[index - 1] = arrayT[index];
			arrayT[index] = temp;
			setArrayT([...arrayT]);
		},
		[index, elementT, arrayT, setArrayT]
	);

	const handleMoveDown = useCallback(
		(e: any) => {
			e.stopPropagation();
			const temp = arrayT[index + 1];
			arrayT[index + 1] = arrayT[index];
			arrayT[index] = temp;
			setArrayT([...arrayT]);
		},
		[index, elementT, arrayT, setArrayT]
	);

	return (
		<div
			className='relative min-h-[inherit]'
			onMouseOver={() => {
				setShowActions(true);
			}}
			onMouseLeave={() => {
				setShowActions(false);
			}}
		>
			{children}
			{isShowActions && clearing && (
				<div className='w-5 h-5 bg-green-300 cursor-pointer absolute left-0 top-[50%] translate-x-[-50%] translate-y-[-50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleClearItem} Icon={<AiOutlineClear />} />
				</div>
			)}
			{isShowActions && (
				<div className='w-5 h-5 bg-yellow-300 cursor-pointer absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleAddAbove} Icon={<GoPlus />} />
				</div>
			)}
			{isShowActions && (
				<div className='w-5 h-5 bg-yellow-300 cursor-pointer absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleAddBelow} Icon={<GoPlus />} />
				</div>
			)}
			{isShowActions && arrayT.length > 1 && (
				<div className='w-5 h-5 bg-red-300 cursor-pointer absolute top-[50%] right-0 translate-x-[50%] translate-y-[-50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleDelete} Icon={<IoClose />} />
				</div>
			)}
			{isShowActions && index !== 0 && (
				<div className='w-5 h-5 bg-blue-300 rounded-tl-[50%] rounded-tr-[50%] cursor-pointer absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleMoveUp} Icon={<IoIosArrowUp />} />
				</div>
			)}
			{isShowActions && index + 1 !== arrayT.length && (
				<div className='w-5 h-5 bg-blue-300 rounded-bl-[50%] rounded-br-[50%]  cursor-pointer absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleMoveDown} Icon={<IoIosArrowDown />} />
				</div>
			)}
		</div>
	);
}

export default Actions;
