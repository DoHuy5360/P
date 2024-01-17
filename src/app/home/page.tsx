"use client";

import Center from "@/components/buttons/center";
import Component from "@/components/component";
import Item01 from "@/components/items/huy/item01";
import Item02 from "@/components/items/huy/item02";
import Item03 from "@/components/items/huy/item03";
import Tray from "@/components/tray";
import AlertProvider, { AlertContext } from "@/context/alertProvider";
import DataSourceProvider from "@/context/dataSourceProvider";
import ViewProvider, { ViewContext } from "@/context/viewProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

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
	Item03: typeof Item03;
};
export const convertStringToJSX: ConvertStringToJSX = {
	Item01: Item01,
	Item02: Item02,
	Item03: Item03,
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
	{
		id: keyFactor(),
		jsx: "Item03",
	},
];
export type Forms = {
	id: string;
	items: Item | null;
};
const initForms: Forms[] = [
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
		<AlertProvider>
			<div className='relative bg-white w-full'>
				<Alert />
				<ViewProvider>
					<DataSourceProvider>
						<div className='flex h-dvh overflow-x-hidden'>
							<Body />
							<SidebarRight />
						</div>
					</DataSourceProvider>
				</ViewProvider>
			</div>
		</AlertProvider>
	);
}
function Alert() {
	const [isShowAlertData, setShowAlertData] = useState(false);
	const { alertData } = useContext(AlertContext);
	const colors = {
		success: "bg-green-500",
		fail: "bg-red-500",
	};
	useEffect(() => {
		setShowAlertData(true);
		setTimeout(() => {
			setShowAlertData(false);
		}, 2000);
	}, [alertData]);
	return (
		isShowAlertData &&
		alertData !== null && (
			<div className='absolute bottom-4 left-4 flex bg-slate-50 border-2 border-solid'>
				<div className={`px-2 ${colors[alertData.type]}`}>!</div>
				<div className='px-2'>{alertData.message}</div>
			</div>
		)
	);
}

function Body() {
	const [forms, setForms] = useState<Forms[]>([]);
	const { setAlertData } = useContext(AlertContext);

	useEffect(() => {
		const rawDataStorage = localStorage.getItem("data-form");
		if (rawDataStorage !== null) {
			setForms(JSON.parse(rawDataStorage) as Forms[]);
		} else {
			setForms(initForms);
		}
	}, []);
	const handleStoreFormData = useCallback(() => {
		localStorage.setItem("data-form", JSON.stringify(forms));
		setAlertData({ type: "success", message: "Storing successfully" });
	}, [forms]);
	return (
		<div className='relative w-[80%]'>
			<div className='overflow-y-scroll overflow-x-hidden p-5 flex flex-col'>
				{forms.map((form: Forms, i: number) => {
					return <Tray key={form.id} index={i} data={form} forms={forms} setForms={setForms} />;
				})}
			</div>
			<div className='absolute bottom-0 right-0 hover:bg-slate-300 w-10 h-10'>
				<Center onClick={handleStoreFormData} Icon={<AiOutlineSave />} />
			</div>
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
