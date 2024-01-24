import { ReactNode, useCallback, useState } from "react";
import Center from "@/components/buttons/center";
import { AiOutlineClear } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
type ItemActionsProps = {
	children: ReactNode;
	index: number;
	elementT: any;
	arrayT: any[];
	reload: Function;
	getNewItem: Function;
};
function ItemActions({ children, index, arrayT, elementT, reload, getNewItem }: ItemActionsProps) {
	const [isShowActions, setShowActions] = useState(false);
	const handleClearItem = useCallback(() => {
		arrayT[index].items = null;
		reload();
	}, [index, elementT, arrayT]);

	const handleAddAbove = useCallback(() => {
		const newElement = getNewItem();
		if (index === 0) {
			arrayT.unshift(newElement);
		} else {
			arrayT.splice(index, 0, newElement);
		}
		reload();
	}, [index, elementT, arrayT.length]);
	const handleAddBelow = useCallback(() => {
		const newElement = getNewItem();
		if (index === arrayT.length) {
			arrayT.push(newElement);
		} else {
			arrayT.splice(index + 1, 0, newElement);
		}
		reload();
	}, [index, elementT, arrayT.length]);
	const handleDelete = useCallback(() => {
		arrayT.splice(index, 1);
		reload();
	}, [index, elementT, arrayT]);

	const handleMoveUp = useCallback(() => {
		const temp = arrayT[index - 1];
		arrayT[index - 1] = arrayT[index];
		arrayT[index] = temp;
		reload();
	}, [index, elementT, arrayT]);

	const handleMoveDown = useCallback(() => {
		const temp = arrayT[index + 1];
		arrayT[index + 1] = arrayT[index];
		arrayT[index] = temp;
		reload();
	}, [index, elementT, arrayT]);

	return (
		<div
			className='relative w-fit'
			onMouseOver={() => {
				setShowActions(true);
			}}
			onMouseLeave={() => {
				setShowActions(false);
			}}
		>
			{children}
			{isShowActions && (
				<div className='w-5 h-5 bg-yellow-300 cursor-pointer absolute left-[50%] top-[1px] translate-x-[-50%] translate-y-[-100%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleAddAbove} Icon={<GoPlus />} />
				</div>
			)}
			{isShowActions && (
				<div className='w-5 h-5 bg-yellow-300 cursor-pointer absolute left-[50%] bottom-[1px] translate-x-[-50%] translate-y-[100%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleAddBelow} Icon={<GoPlus />} />
				</div>
			)}
			{isShowActions && arrayT.length > 1 && (
				<div className='w-5 h-5 bg-red-300 cursor-pointer absolute top-[50%] right-[1px] translate-x-[100%] translate-y-[-50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleDelete} Icon={<IoClose />} />
				</div>
			)}
			{isShowActions && index !== 0 && (
				<div className='w-5 h-5 bg-blue-300 rounded-tl-[50%] rounded-tr-[50%] cursor-pointer absolute top-[1px] right-[1px] translate-y-[-100%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleMoveUp} Icon={<IoIosArrowUp />} />
				</div>
			)}
			{isShowActions && index + 1 !== arrayT.length && (
				<div className='w-5 h-5 bg-blue-300 rounded-bl-[50%] rounded-br-[50%]  cursor-pointer absolute bottom-[1px] right-[1px] translate-y-[100%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleMoveDown} Icon={<IoIosArrowDown />} />
				</div>
			)}
		</div>
	);
}

export default ItemActions;
