"use client";
import { Forms, keyFactor } from "@/app/home/page";
import { useCallback, useEffect, useState } from "react";
import Item01 from "./items/item01";
import Item02 from "./items/item02";
import Center from "./buttons/center";
import { GoPlus } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";

type TrayProps = {
	index: number;
	forms: Forms[];
	data: Forms;
	setForms: Function;
};
export type CV = {
	Item01: typeof Item01;
	Item02: typeof Item02;
};
export const cv: CV = {
	Item01: Item01,
	Item02: Item02,
};
function Tray({ index, forms, data, setForms }: TrayProps) {
	const [styles, setStyles] = useState<string>("bg-slate-50");
	const [ComponentItem, setComponentItem] = useState<null | (() => JSX.Element)>(null);
	const convertItemToJSX = useCallback((data: null | string | (() => JSX.Element)) => {
		if (data !== null) {
			data = cv[data as keyof CV];
		}
		return data;
	}, []);
	useEffect(() => {
		const jsxItem = convertItemToJSX(data.items.jsx);
		const temp = () => jsxItem;
		setComponentItem(temp);
	}, []);
	const [isShowActions, setShowActions] = useState(false);
	const handleAddAbove = useCallback(() => {
		const newForm: Forms = {
			id: keyFactor(),
			items: {
				id: "it:1",
				jsx: convertItemToJSX(null),
			},
		};
		if (index === 0) {
			setForms([newForm, ...forms]);
		} else {
			forms.splice(index, 0, newForm);
			setForms([...forms]);
		}
	}, [index, data, forms, setForms]);
	const handleAddBelow = useCallback(() => {
		const newForm: Forms = {
			id: keyFactor(),
			items: {
				id: "it:1",
				jsx: convertItemToJSX(null),
			},
		};
		if (index === forms.length) {
			setForms([...forms, newForm]);
		} else {
			forms.splice(index + 1, 0, newForm);
			setForms([...forms]);
		}
	}, [index, data, forms, setForms]);
	const handleDelete = useCallback(() => {
		forms.splice(index, 1);
		setForms([...forms]);
	}, [index, data, forms, setForms]);
	const handleMoveUp = useCallback(() => {
		const temp = forms[index - 1];
		forms[index - 1] = forms[index];
		forms[index] = temp;
		setForms([...forms]);
	}, [index, data, forms, setForms]);
	const handleMoveDown = useCallback(() => {
		const temp = forms[index + 1];
		forms[index + 1] = forms[index];
		forms[index] = temp;
		setForms([...forms]);
	}, [index, data, forms, setForms]);
	const handleDrop = useCallback(
		(e: any) => {
			e.preventDefault();
			var { form } = JSON.parse(e.dataTransfer.getData("application/json"));
			forms.splice(form.index, 1);
			forms.splice(index, 0, form.data);
			setForms([...forms]);
			setStyles("bg-slate-50");
		},
		[index, data, forms, setForms]
	);
	const handleDragOver = useCallback(
		(e: any) => {
			e.preventDefault();
			setStyles("bg-green-100");
		},
		[index, data, forms, setForms]
	);
	const handleDragLeave = useCallback(
		(e: any) => {
			e.preventDefault();
			setStyles("bg-slate-50");
		},
		[index, data, forms, setForms]
	);
	const handleDragStart = useCallback(
		(e: any) => {
			e.dataTransfer.setData(
				"application/json",
				JSON.stringify({
					form: {
						data,
						index,
					},
				})
			);
		},
		[index, data, forms, setForms]
	);
	return (
		<div
			onMouseOver={() => {
				setShowActions(true);
			}}
			onMouseLeave={() => {
				setShowActions(false);
			}}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`min-h-32 hover:border-slate-900 border-2 border-transparent relative select-none ${styles}`}
		>
			{ComponentItem === null ? (
				<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
					<div className='hover:bg-slate-300 w-10 h-10 rounded-[50%] '>
						<Center onClick={() => {}} Icon={<GoPlus />} />
					</div>
				</div>
			) : (
				<div onDragStart={handleDragStart} draggable={true} className='cursor-grab'>
					<ComponentItem />
				</div>
			)}

			{isShowActions && (
				<div
					onClick={handleAddAbove}
					className='w-5 h-5 bg-yellow-300 cursor-pointer absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%] z-10 border-2 border-solid border-slate-900'
				>
					<Center onClick={() => {}} Icon={<GoPlus />} />
				</div>
			)}
			{isShowActions && (
				<div
					onClick={handleAddBelow}
					className='w-5 h-5 bg-yellow-300 cursor-pointer absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] z-10 border-2 border-solid border-slate-900'
				>
					<Center onClick={() => {}} Icon={<GoPlus />} />
				</div>
			)}
			{isShowActions && (
				<div
					onClick={handleDelete}
					className='w-5 h-5 bg-red-300 cursor-pointer absolute top-[50%] right-0 translate-x-[50%] translate-y-[-50%] z-10 border-2 border-solid border-slate-900'
				>
					<Center Icon={<IoClose />} />
				</div>
			)}
			{isShowActions && index !== 0 && (
				<div
					onClick={handleMoveUp}
					className='w-5 h-5 bg-blue-300 rounded-tl-[50%] rounded-tr-[50%] cursor-pointer absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] z-10 border-2 border-solid border-slate-900'
				>
					<Center Icon={<IoIosArrowUp />} />
				</div>
			)}
			{isShowActions && index + 1 !== forms.length && (
				<div
					onClick={handleMoveDown}
					className='w-5 h-5 bg-blue-300 rounded-bl-[50%] rounded-br-[50%]  cursor-pointer absolute bottom-0 right-0 translate-x-[50%] translate-y-[50%] z-10 border-2 border-solid border-slate-900'
				>
					<Center Icon={<IoIosArrowDown />} />
				</div>
			)}
		</div>
	);
}

export default Tray;
