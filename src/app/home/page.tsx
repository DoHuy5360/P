"use client";

import Component from "@/components/component";
import Item01 from "@/components/items/item01";
import Item02 from "@/components/items/item02";
import Tray from "@/components/tray";
import DataSourceProvider from "@/context/dataSourceProvider";
import DragProvider from "@/context/dragProvider";
import { useCallback, useEffect, useState } from "react";

export type Item = {
	id: string;
	jsx: null | string | (() => JSX.Element);
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
	// {
	// 	id: "it:3",
	// 	jsx: "Item03",
	// },
];
export type Forms = {
	id: string;
	items: Item;
};
const initForms = [
	{
		id: "fo:1",
		items: {
			id: "it:1",
			jsx: "Item01",
		},
	},
	{
		id: "fo:2",
		items: {
			id: "it:2",
			jsx: "Item02",
		},
	},
];

let amountKeyExisting = initForms.length;
export const keyFactor = () => {
	return `fo:${++amountKeyExisting}`;
};
export default function Form() {
	const [forms, setForms] = useState<Forms[]>([]);
	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		setForms(initForms);
	}, []);
	return (
		<div className='bg-white w-full'>
			<DragProvider>
				<DataSourceProvider>
					<div className='flex'>
						<div className='w-[80%] h-dvh overflow-y-scroll overflow-x-hidden p-5 flex flex-col'>
							{forms.map((form: Forms, i: number) => {
								return <Tray key={form.id} index={i} data={form} forms={forms} setForms={setForms} />;
							})}
						</div>
						<div className='flex flex-col'>
							{itemContainer.map((item, i) => {
								return <Component data={item} key={i} />;
							})}
						</div>
					</div>
				</DataSourceProvider>
			</DragProvider>
		</div>
	);
}
