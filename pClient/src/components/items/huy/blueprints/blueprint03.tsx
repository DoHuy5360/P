import { Component, KeyManager } from "@/app/page";
import { CSSProperties, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import LabelWrap from "./title";
import { CareerPath, DataSourceContext } from "@/context/dataSourceProvider";
import FakeInput from "@/components/inputs/fakeInput";

import useUpdateDataSource from "@/components/hooks/useUpdateDataSource";
import ItemActions from "@/components/itemActions";
import { ViewImageContext } from "@/context/viewImageProvider";

function Experience() {
	const { dataSource, actions } = useUpdateDataSource({});
	const getNewItem = useCallback(() => {
		return {
			company: {
				name: "Name?",
				address: "Address?",
				images: [
					{
						name: "Image name?",
						source: "",
					},
				],
			},
			time: {
				from: "From?",
				to: "To?",
			},
			role: {
				name: "Role?",
				tasks: ["task?"],
			},
		};
	}, []);
	return (
		<LabelWrap
			title={<FakeInput value={dataSource.experience.title} onInput={actions.updateExperienceTitle} />}
			body={
				<div className='flex flex-col gap-2'>
					{dataSource.experience.careerPaths.map((career, i) => (
						<div key={i} className='pb-2'>
							<ItemActions index={i} elementT={career} arrayT={dataSource.experience.careerPaths} reload={actions.reload} getNewItem={getNewItem}>
								<Company index={i} career={career} />
							</ItemActions>
						</div>
					))}
				</div>
			}
		/>
	);
}

function Company({ index, career }: { index: number; career: CareerPath }) {
	const { actions } = useUpdateDataSource({ index });
	const { setSource } = useContext(ViewImageContext);
	const getNewItem = useCallback(() => {
		return "";
	}, []);
	return (
		<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
			<div className='sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 w-fit gap-2'>
				{career.company.images.map((dataImage, i) => {
					return (
						<img
							src={dataImage.source}
							onClick={() => {
								setSource(dataImage.source);
							}}
							className='h-fit break-inside-avoid-column mb-2 duration-500 ease-in-out border-inputBorder border-[1px] cursor-pointer bg-white'
							alt={dataImage.name}
							key={i}
							draggable={false}
						/>
					);
				})}
			</div>
			<div className='flex flex-col gap-2'>
				<div className='font-bold'>
					<FakeInput value={career.company.name} onInput={actions.updateCompanyName} />
				</div>
				<FakeInput value={career.company.address} onInput={actions.updateCompanyAddress} />
				<div className='flex items-center gap-2 flex-wrap'>
					<FakeInput value={career.time.from} onInput={actions.updateExperienceTimeFrom} />
					<FakeInput value={career.time.to} onInput={actions.updateExperienceTimeTo} />
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='font-bold'>
					<FakeInput value={career.role.name} onInput={actions.updateExperienceRoleName} />
				</div>
				<div className='flex gap-2 flex-wrap'>
					{career.role.tasks.map((task, i) => (
						<div key={i}>
							<ItemActions index={i} elementT={task} arrayT={career.role.tasks} reload={actions.reload} getNewItem={getNewItem}>
								<Task parentIndex={index} index={i} task={task} />
							</ItemActions>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
function Task({ task, parentIndex, index }: { task: string; parentIndex: number; index: number }) {
	const { actions } = useUpdateDataSource({ index, parentIndex });
	return <FakeInput value={task} onInput={actions.updateExperienceTask} />;
}

export default Experience;
