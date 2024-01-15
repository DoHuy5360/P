"use client";
import { DataSourceContext } from "@/context/dataSourceProvider";
import { useContext } from "react";

function Item01() {
	const { name } = useContext(DataSourceContext);
	return <div>{name}</div>;
}

export default Item01;
