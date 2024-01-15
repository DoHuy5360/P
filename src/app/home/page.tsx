"use client";

import Item01 from "@/components/items/item01";
import Tray from "@/components/tray";
import DataSourceProvider from "@/context/dataSourceProvider";
import DragProvider from "@/context/dragProvider";
import { useCallback, useEffect, useState } from "react";

export type Item = {
	id: string;
	jsx: string | (() => JSX.Element);
};

export const itemContainer: Item[] = [
	{
		id: "it:1",
		jsx: "Item01",
	},
	{
		id: "it:2",
		jsx: "Item02",
	},
	{
		id: "it:3",
		jsx: "Item03",
	},
];
export type Forms = {
	id: string;
	items: Item;
	background: string;
};
const initForms = [
	{
		id: "fo:1",
		items: {
			id: "it:1",
			jsx: "Item01",
		},
		background: "lightblue",
	},
];
type CV = {
	Item01: typeof Item01;
};
const cv: CV = {
	Item01: Item01,
};
let amountKeyExisting = initForms.length;
export const keyFactor = () => {
	return `fo:${++amountKeyExisting}`;
};
export const convertItemToJSX = (data: Forms[]) => {
	return data.map((form: Forms) => {
		form.items.jsx = cv[form.items.jsx as keyof CV];
		return form;
	});
};
export default function Form() {
	const [forms, setForms] = useState<Forms[]>([]);

	useEffect(() => {
		const initForms = [
			{
				id: "fo:1",
				items: {
					id: "it:1",
					jsx: "Item01",
				},
				background: "lightblue",
			},
		];
		const formConverted = convertItemToJSX(initForms);
		setForms(formConverted);
	}, []);
	return (
		<div className='bg-white w-full'>
			<DragProvider>
				<DataSourceProvider>
					<div className='flex'>
						<div className='bg-slate-100 w-[80%] h-dvh flex flex-col'>
							{forms.map((form: Forms, i: number) => {
								return <Tray key={form.id} index={i} data={form} forms={forms} setForms={setForms} />;
							})}
						</div>
						<div className='flex-col w-[20%] h-dvh bg-green-100'></div>
					</div>
				</DataSourceProvider>
			</DragProvider>
		</div>
	);
}
