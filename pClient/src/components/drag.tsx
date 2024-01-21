import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from "react";
import { TransferData, TransferTypes, convertItemToJSX } from "./tray";
import { Component } from "@/app/ver2/page";

type DragAndDropProps<T> = {
	children: ReactNode;
	index: number;
	elementT: Component<T>;
	arrayT: Component<T>[];
	setArrayT: Dispatch<SetStateAction<Component<T>[]>>;
	setComponentItem: Dispatch<SetStateAction<((de: any) => JSX.Element) | null>>;
	setStyles: Dispatch<SetStateAction<string>>;
};
function DragAndDrop<T>({ children, index, elementT, arrayT, setArrayT, setComponentItem, setStyles }: DragAndDropProps<T>) {
	useEffect(() => {
		const jsxItem = convertItemToJSX(elementT.items === null ? null : elementT.items);
		const temp = () => jsxItem;
		setComponentItem(temp);
	}, []);
	const handleDrop = useCallback(
		(e: any) => {
			e.preventDefault();
			var { dataTransfer }: Pick<TransferData<T>, "dataTransfer"> = JSON.parse(e.dataTransfer.getData("application/json"));
			if (dataTransfer.type === TransferTypes.inForm) {
				arrayT.splice(dataTransfer.index, 1);
				arrayT.splice(index, 0, dataTransfer.obj);
				setArrayT([...arrayT]);
			} else if (dataTransfer.type === TransferTypes.sidebarTop) {
				// update UI
				const jsxItem = convertItemToJSX(dataTransfer.jsx === null ? null : dataTransfer.jsx);
				const temp = () => jsxItem;
				setComponentItem(temp);
				//  update json
				arrayT[index] = dataTransfer.obj;
				setArrayT([...arrayT]);
			}
			setStyles("bg-white");
		},
		[index, elementT, arrayT, setArrayT]
	);
	const handleDragOver = useCallback(
		(e: any) => {
			e.preventDefault();
			setStyles("bg-green-100");
		},
		[index, elementT, arrayT, setArrayT]
	);
	const handleDragLeave = useCallback(
		(e: any) => {
			e.preventDefault();
			setStyles("bg-white");
		},
		[index, elementT, arrayT, setArrayT]
	);
	const handleDragStart = useCallback(
		(e: any) => {
			const transferData: TransferData<T> = {
				dataTransfer: {
					index,
					obj: elementT,
					jsx: elementT.items === null ? null : elementT.items,
					type: TransferTypes.inForm,
				},
			};
			e.dataTransfer.setData("application/json", JSON.stringify(transferData));
		},
		[index, elementT, arrayT, setArrayT]
	);
	return (
		<div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragStart={handleDragStart}>
			{children}
		</div>
	);
}

export default DragAndDrop;
