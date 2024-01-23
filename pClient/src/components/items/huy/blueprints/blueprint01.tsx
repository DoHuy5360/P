"use client";

import useUpdateDataSource from "@/components/hooks/useUpdateDataSource";
import FakeInput from "@/components/inputs/fakeInput";
import { ViewImageContext } from "@/context/viewImageProvider";
import { useContext } from "react";

function Personal() {
	const { dataSource, actions } = useUpdateDataSource({});
	const { setSource } = useContext(ViewImageContext);
	return (
		<div className='flex p-4 gap-2'>
			<div className='flex flex-col gap-2'>
				<img
					src={dataSource.avatar}
					onClick={() => {
						setSource(dataSource.avatar);
					}}
					className='w-32 border-inputBorder border-[1px]'
					alt=''
				/>
				<FakeInput value={dataSource.work.position} onInput={actions.updateWorkPosition} />
			</div>
			<div className='flex flex-col gap-2'>
				<FakeInput value={dataSource.name} onInput={actions.updateName} title='Name' />
				<FakeInput value={dataSource.phone} onInput={actions.updatePhone} title='Phone' />
				<FakeInput value={dataSource.birth} onInput={actions.updateBirth} title='Birth' />
				<FakeInput value={dataSource.gender} onInput={actions.updateGender} title='Gender' />
			</div>
		</div>
	);
}
export default Personal;
