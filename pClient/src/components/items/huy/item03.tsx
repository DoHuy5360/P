"use client";

import { DataSourceContext } from "@/context/dataSourceProvider";
import { useContext } from "react";

function Item03() {
	const { companies } = useContext(DataSourceContext);
	return (
		<div className='bg-slate-200 w-full'>
			{companies.map((company, j) => {
				return (
					<div className='flex flex-col' key={j}>
						<div>{company.name}</div>
						<div className='flex gap-2'>
							{company.images.map((img, i) => {
								return <img src={img} className='w-20' key={i} alt='' draggable={false} />;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Item03;
