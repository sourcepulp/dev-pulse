import { Layout } from "antd";
import AppHeader from "./app-header";
import Content from "./content";
import { BoardContextProvider } from "../board/context";
import { TransformersJS } from "@paulkinlan/transformerjs-breadboard-kit";

const Main = (): React.JSX.Element => {
	return (
		<Layout>
			<AppHeader />
			<BoardContextProvider
				graph="https://raw.githubusercontent.com/sourcepulp/transformerjs-breadboard-kit/main/graphs/sentiment-node.json"
				kits={{
					"@paulkinlan/transformersjs-breadboard-kit": TransformersJS,
				}}
			>
				<Content />
			</BoardContextProvider>
		</Layout>
	);
};

export default Main;
