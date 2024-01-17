import { DataSourceContext } from "@/context/dataSourceProvider";
import { useContext } from "react";

function Item02() {
	const { projects } = useContext(DataSourceContext);
	return (
		<div className='bg-slate-200 w-full'>
			{projects.map((project, j) => {
				return (
					<div className='flex flex-col' key={j}>
						<div>{project.name}</div>
						<div className='flex gap-2'>
							{project.images.map((img, i) => {
								return <img src={img} className='w-20' key={i} alt='' draggable={false} />;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Item02;
