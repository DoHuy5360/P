"use client";

import FakeInput from "@/components/inputs/fakeInput";
import { DataSourceContext } from "@/context/dataSourceProvider";
import { ChangeEvent, memo, useCallback, useContext, useEffect, useRef, useState } from "react";

export function Section01() {
	const { dataSource, dispatch } = useContext(DataSourceContext);
	const updateWorkPosition = useCallback((value: string) => {
		dispatch({
			type: "Update-Work-Position",
			value,
		});
	}, []);
	const updateName = useCallback((value: string) => {
		dispatch({
			type: "Update-Name",
			value,
		});
	}, []);
	const updatePhone = useCallback((value: string) => {
		dispatch({
			type: "Update-Phone",
			value,
		});
	}, []);
	const updateBirth = useCallback((value: string) => {
		dispatch({
			type: "Update-Birth",
			value,
		});
	}, []);
	const updateGender = useCallback((value: string) => {
		dispatch({
			type: "Update-Gender",
			value,
		});
	}, []);
	return (
		<div className='flex p-4 gap-2'>
			<div className='flex flex-col gap-2'>
				<img src={dataSource.avatar} className='w-32 border-inputBorder border-[1px]' alt='' />
				<FakeInput value={dataSource.work.position} onInput={updateWorkPosition} />
			</div>
			<div className='flex flex-col gap-2'>
				<FakeInput value={dataSource.name} onInput={updateName} />
				<FakeInput value={dataSource.phone} onInput={updatePhone} />
				<FakeInput value={dataSource.birth} onInput={updateBirth} />
				<FakeInput value={dataSource.gender} onInput={updateGender} />
			</div>
		</div>
	);
}
