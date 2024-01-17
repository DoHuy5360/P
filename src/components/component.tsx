"use client";
import { ConvertStringToJSX, Item, convertStringToJSX } from "@/app/home/page";
import { useCallback, useEffect, useState } from "react";
import { TransferData, TransferTypes } from "./tray";

type ComponentProps = {
	data: Item;
	index: number;
};
function Component({ data, index }: ComponentProps) {
	const [Component, setComponent] = useState<null | (() => JSX.Element)>(null);
	const convertItemToJSX = useCallback((data: null | string | (() => JSX.Element)) => {
		if (data !== null) {
			data = convertStringToJSX[data as keyof ConvertStringToJSX];
		}
		return data;
	}, []);
	useEffect(() => {
		const jsxItem = convertItemToJSX(data.jsx);
		const temp = () => jsxItem;
		setComponent(temp);
	}, []);
	const handleDragStart = useCallback(
		(e: any) => {
			const transferData: TransferData = {
				dataTransfer: {
					index,
					obj: data,
					jsx: data.jsx,
					type: TransferTypes.sidebarRight,
				},
			};
			e.dataTransfer.setData("application/json", JSON.stringify(transferData));
		},
		[data]
	);
	return (
		<div>
			{Component !== null && (
				<div onDragStart={handleDragStart} draggable={true}>
					<Component />
				</div>
			)}
		</div>
	);
}

export default Component;
