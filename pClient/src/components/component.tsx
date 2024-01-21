"use client";
import { useCallback, useEffect, useState } from "react";
import { TransferData, TransferTypes } from "./tray";
import { Component, ConvertStringToJSX, KeyManager, convertStringToJSX } from "@/app/ver2/page";

type ComponentProps<T> = {
	data: Component<T>;
	index: number;
};
function Component<T>({ data, index }: ComponentProps<T>) {
	const [Component, setComponent] = useState<null | ((data: Component<T>) => JSX.Element)>(null);
	const convertItemToJSX = useCallback((data: null | string | ((data: Component<any>) => JSX.Element)) => {
		if (data !== null) {
			data = convertStringToJSX[data as keyof ConvertStringToJSX];
		}
		return data;
	}, []);
	useEffect(() => {
		const jsxItem = convertItemToJSX(data.items);
		const temp = () => jsxItem;
		setComponent(temp);
	}, []);
	const handleDragStart = useCallback(
		(e: any) => {
			const transferData: TransferData<T> = {
				dataTransfer: {
					index,
					obj: data,
					jsx: data.items,
					type: TransferTypes.sidebarTop,
				},
			};
			e.dataTransfer.setData("application/json", JSON.stringify(transferData));
		},
		[data]
	);
	const handleDragEnd = useCallback(() => {
		data.id = KeyManager.getKey();
	}, [data]);
	return (
		<div>
			{Component !== null && (
				<div onDragStart={handleDragStart} onDragEnd={handleDragEnd} draggable={true}>
					<Component {...data} />
				</div>
			)}
		</div>
	);
}

export default Component;
