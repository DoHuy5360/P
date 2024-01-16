"use client";
import { Item } from "@/app/home/page";
import { useCallback, useEffect, useState } from "react";
import { CV, cv } from "./tray";

type ComponentProps = {
	data: Item;
};
function Component({ data }: ComponentProps) {
	const [styles, setStyles] = useState<string>("bg-slate-50");
	const [Component, setComponent] = useState<null | (() => JSX.Element)>(null);
	const convertItemToJSX = useCallback((data: null | string | (() => JSX.Element)) => {
		if (data !== null) {
			data = cv[data as keyof CV];
		}
		return data;
	}, []);
	useEffect(() => {
		const jsxItem = convertItemToJSX(data.jsx);
		const temp = () => jsxItem;
		setComponent(temp);
	}, []);
	return <div>{Component !== null && <Component />}</div>;
}

export default Component;
