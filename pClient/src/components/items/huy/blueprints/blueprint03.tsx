import { Component, KeyManager } from "@/app/ver2/page";
import Contenteditable from "@/components/inputs/fakeInput";
import { Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import LabelWrap from "./title";
import { CareerPath, DataSourceContext } from "@/context/dataSourceProvider";
import FakeInput from "@/components/inputs/fakeInput";
import Center from "@/components/buttons/center";
import { AiOutlineClear } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Experience() {
	const { dataSource, dispatch } = useContext(DataSourceContext);
	const updateExperienceTitle = useCallback((value: string) => {
		dispatch({
			type: "Update-Experience-Title",
			value,
		});
	}, []);
	return (
		<LabelWrap
			title={<FakeInput value={dataSource.experience.title} onInput={updateExperienceTitle} />}
			body={
				<div className='flex flex-col'>
					{dataSource.experience.careerPaths.map((career, i) => (
						<div key={i}>
							<Company index={i} career={career} />
						</div>
					))}
				</div>
			}
		/>
	);
}

function Company({ index, career }: { index: number; career: CareerPath }) {
	const { dispatch } = useContext(DataSourceContext);
	const updateCompanyName = useCallback((value: string) => {
		dispatch({
			type: "Update-Company-Name",
			value,
			index,
		});
	}, []);
	const updateCompanyAddress = useCallback((value: string) => {
		dispatch({
			type: "Update-Company-Address",
			value,
			index,
		});
	}, []);
	const updateExperienceTimeFrom = useCallback((value: string) => {
		dispatch({
			type: "Update-Experience-Time-From",
			value,
			index,
		});
	}, []);
	const updateExperienceTimeTo = useCallback((value: string) => {
		dispatch({
			type: "Update-Experience-Time-To",
			value,
			index,
		});
	}, []);
	const updateExperienceRoleName = useCallback((value: string) => {
		dispatch({
			type: "Update-Experience-Role-Name",
			value,
			index,
		});
	}, []);
	const reload = useCallback(() => {
		dispatch({
			type: "Reload",
		});
	}, []);
	const getNewItem = useCallback(() => {
		return "";
	}, []);
	return (
		<div className='flex gap-2'>
			<div className='flex flex-col w-[30%] gap-2'>
				<div className='font-bold'>
					<FakeInput value={career.company.name} onInput={updateCompanyName} />
				</div>
				<FakeInput value={career.company.address} onInput={updateCompanyAddress} />
				<div className='flex items-center gap-2 flex-wrap'>
					<Contenteditable value={career.time.from} onInput={updateExperienceTimeFrom} />
					<Contenteditable value={career.time.to} onInput={updateExperienceTimeTo} />
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='font-bold'>
					<Contenteditable value={career.role.name} onInput={updateExperienceRoleName} />
				</div>
				<div className='flex flex-col gap-2'>
					{career.role.tasks.map((task, i) => (
						<div key={i}>
							<Actions index={i} elementT={task} arrayT={career.role.tasks} reload={reload} getNewItem={getNewItem}>
								<Task parentIndex={index} index={i} task={task} />
							</Actions>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
function Task({ task, parentIndex, index }: { task: string; parentIndex: number; index: number }) {
	const { dispatch } = useContext(DataSourceContext);
	const updateExperienceTask = useCallback((value: string) => {
		dispatch({
			type: "Update-Experience-Role-Task",
			value,
			parentIndex,
			index,
		});
	}, []);
	return <FakeInput value={task} onInput={updateExperienceTask} />;
}

type ActionsProps = {
	children: ReactNode;
	index: number;
	elementT: any;
	arrayT: any[];
	reload: Function;
	getNewItem: Function;
};
function Actions({ children, index, arrayT, elementT, reload, getNewItem }: ActionsProps) {
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
				<div className='w-5 h-5 bg-green-300 cursor-pointer absolute left-0 top-[50%] translate-x-[-100%] translate-y-[-50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleClearItem} Icon={<AiOutlineClear />} />
				</div>
			)}
			{isShowActions && (
				<div className='w-5 h-5 bg-yellow-300 cursor-pointer absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-100%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleAddAbove} Icon={<GoPlus />} />
				</div>
			)}
			{isShowActions && (
				<div className='w-5 h-5 bg-yellow-300 cursor-pointer absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[100%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleAddBelow} Icon={<GoPlus />} />
				</div>
			)}
			{isShowActions && arrayT.length > 1 && (
				<div className='w-5 h-5 bg-red-300 cursor-pointer absolute top-[50%] right-0 translate-x-[100%] translate-y-[-50%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleDelete} Icon={<IoClose />} />
				</div>
			)}
			{isShowActions && index !== 0 && (
				<div className='w-5 h-5 bg-blue-300 rounded-tl-[50%] rounded-tr-[50%] cursor-pointer absolute top-0 right-0 translate-x-[100%] translate-y-[-100%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleMoveUp} Icon={<IoIosArrowUp />} />
				</div>
			)}
			{isShowActions && index + 1 !== arrayT.length && (
				<div className='w-5 h-5 bg-blue-300 rounded-bl-[50%] rounded-br-[50%]  cursor-pointer absolute bottom-0 right-0 translate-x-[100%] translate-y-[100%] z-10 border-[1px] border-solid border-slate-900'>
					<Center onClick={handleMoveDown} Icon={<IoIosArrowDown />} />
				</div>
			)}
		</div>
	);
}
export default Experience;
