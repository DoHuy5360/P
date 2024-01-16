"use client";

import Component from "@/components/component";
import Item01 from "@/components/items/item01";
import Item02 from "@/components/items/item02";
import Tray from "@/components/tray";
import DataSourceProvider from "@/context/dataSourceProvider";
import ViewProvider, { ViewContext } from "@/context/viewProvider";
import { useContext, useEffect, useState } from "react";

let amountKeyExisting = 0;
export const keyFactor = () => {
	return `id:${++amountKeyExisting}`;
};

export type Item = {
	id: string;
	jsx: null | string | (() => JSX.Element);
};

export type ConvertStringToJSX = {
	Item01: typeof Item01;
	Item02: typeof Item02;
};
export const convertStringToJSX: ConvertStringToJSX = {
	Item01: Item01,
	Item02: Item02,
};
export const itemContainer: Item[] = [
	{
		id: keyFactor(),
		jsx: "Item01",
	},
	{
		id: keyFactor(),
		jsx: "Item02",
	},
];
export type Forms = {
	id: string;
	items: Item | null;
};
const initForms = [
	{
		id: keyFactor(),
		items: {
			id: keyFactor(),
			jsx: "Item01",
		},
	},
	{
		id: keyFactor(),
		items: {
			id: keyFactor(),
			jsx: "Item02",
		},
	},
	{
		id: keyFactor(),
		items: null,
	},
];

export default function Form() {
	return (
		<div className='bg-white w-full'>
			<ViewProvider>
				<DataSourceProvider>
					<div className='flex overflow-x-hidden'>
						<Body />
						<SidebarRight />
					</div>
				</DataSourceProvider>
			</ViewProvider>
		</div>
	);
}
function Body() {
	const [forms, setForms] = useState<Forms[]>([]);

	useEffect(() => {
		setForms(initForms);
	}, []);
	return (
		<div className='w-[80%] h-dvh overflow-y-scroll overflow-x-hidden p-5 flex flex-col'>
			{forms.map((form: Forms, i: number) => {
				return <Tray key={form.id} index={i} data={form} forms={forms} setForms={setForms} />;
			})}
		</div>
	);
}

function SidebarRight() {
	const [items, setItems] = useState<Item[]>([]);
	const { isShowSidebarRight } = useContext(ViewContext);
	useEffect(() => {
		setItems(itemContainer);
	}, []);
	return (
		<div className={`flex flex-col w-[20%] transition duration-300 select-none ${isShowSidebarRight ? "translate-x-0" : "translate-x-[100%]"}`}>
			{items.map((item, i) => {
				return <Component data={item} index={i} key={i} />;
			})}
		</div>
	);
}
