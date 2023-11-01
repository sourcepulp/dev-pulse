import { Layout } from "antd";
import AppHeader from "./app-header";
import Content from "./content";

const Main = (): React.JSX.Element => {
	return (
		<Layout>
			<AppHeader />
			<Content />
		</Layout>
	);
};

export default Main;
