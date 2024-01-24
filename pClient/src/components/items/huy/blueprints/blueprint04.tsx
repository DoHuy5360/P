import { useCallback, useContext } from "react";
import LabelWrap from "./title";
import { DataImage, DataSourceContext, Projects } from "@/context/dataSourceProvider";
import FakeInput from "@/components/inputs/fakeInput";
import useUpdateDataSource from "@/components/hooks/useUpdateDataSource";
import { ViewImageContext } from "@/context/viewImageProvider";
import ItemActions from "@/components/itemActions";

function Gallery() {
	const { dataSource, actions } = useUpdateDataSource({});
	const getNewItem = useCallback(() => {
		return {
			name: "name?",
			type: "type?",
			members: "members?",
			technologies: [
				{
					name: "Technology?",
					source: "",
				},
			],
			reference: "reference?",
			description: "description?",
			images: [
				{
					name: "Project image",
					source: "",
				},
			],
			role: "role?",
			time: {
				from: "from?",
				to: "to?",
			},
		};
	}, []);
	return (
		<LabelWrap
			title={<FakeInput value={dataSource.gallery.title} onInput={actions.updateProjectTitle} />}
			body={
				<div className='flex flex-col'>
					{dataSource.gallery.projects.map((prj, i) => {
						return (
							<div key={i} className='pb-2'>
								<ItemActions index={i} elementT={prj} arrayT={dataSource.gallery.projects} reload={actions.reload} getNewItem={getNewItem}>
									<Project index={i} project={prj} />
								</ItemActions>
							</div>
						);
					})}
				</div>
			}
		/>
	);
}

type ProjectProps = {
	index: number;
	project: Projects;
};

function Project({ index, project }: ProjectProps) {
	const { actions } = useUpdateDataSource({ index });
	const { setSource } = useContext(ViewImageContext);
	return (
		<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
			<div className='sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 w-fit gap-2'>
				{project.images.map((img, i) => {
					return (
						<img
							src={img.source}
							onClick={() => {
								setSource(img.source);
							}}
							className='h-fit break-inside-avoid-column mb-2 border-inputBorder border-[1px] cursor-pointer bg-white'
							alt={img.name}
							key={i}
							draggable={false}
						/>
					);
				})}
			</div>
			<div className='flex flex-col gap-2'>
				<div className='font-bold'>
					<FakeInput value={project.name} onInput={actions.updateProjectName} />
				</div>
				<FakeInput value={project.role} onInput={actions.updateProjectRole} />
				<FakeInput value={project.type} onInput={actions.updateProjectType} />
				<FakeInput value={project.members} onInput={actions.updateProjectMembers} />
				<div className='flex items-center gap-2 flex-wrap'>
					<FakeInput value={project.time.from} onInput={actions.updateProjectTimeFrom} />
					<FakeInput value={project.time.to} onInput={actions.updateProjectTimeTo} />
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='flex gap-2 flex-wrap'>
					{project.technologies.map((tech, i) => {
						return (
							<div key={i}>
								<Technology parentIndex={index} technology={tech} index={i} />
							</div>
						);
					})}
				</div>
				<FakeInput value={project.description} onInput={actions.updateProjectDescription} />
				<FakeInput value={project.reference} onInput={actions.updateProjectReference} />
			</div>
		</div>
	);
}
type TechnologyProps = {
	technology: DataImage;
	index: number;
	parentIndex: number;
};
function Technology({ technology, parentIndex, index }: TechnologyProps) {
	const { actions } = useUpdateDataSource({ index, parentIndex });

	return (
		<div className='flex gap-2 items-center'>
			<img src={technology.source} className='w-8 h-8' alt={technology.name} draggable={false} />
			<FakeInput value={technology.name} onInput={actions.updateProjectTechnologies} />
		</div>
	);
}

export default Gallery;
