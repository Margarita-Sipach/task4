import { memo } from "react"

interface PageContainerPropa{
	children: React.ReactElement
	title: string;
}

export const PageContainer = ({children, title}: PageContainerPropa) => (
	<>
		<h1 className="text-center mb-3">{title}</h1>
		{children}
	</>
);