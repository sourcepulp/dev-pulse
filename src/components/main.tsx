import { Layout } from "antd";
import AppHeader from "./app-header";
import { BoardContextProvider } from "../features/board/context";
import { TransformersJS } from "@paulkinlan/transformerjs-breadboard-kit";
import AppRoutes from "../app-routes";
import { Link } from "react-router-dom";
import styles from "./main.module.scss";



const Main = (): React.JSX.Element => {
	const { Content: ContentLayout, Sider } = Layout;
	return (
		<>
			<AppHeader />
			<Layout style={{ minHeight: '100vh' }}>
				<Sider width="280">
					<div className={styles.navLinkContainer}>
						<Link className={styles.navLink} to="/">Home</Link>
						<Link className={styles.navLink} to="/phrase-sentiment">Phrase Sentiment Analysis</Link>
						<Link className={styles.navLink} to="/hacker-news-sentiment">Hacker News Sentiment</Link>
					</div>
				</Sider>
				<Layout>

					<BoardContextProvider
						graph="https://raw.githubusercontent.com/sourcepulp/transformerjs-breadboard-kit/main/graphs/sentiment-node.json"
						kits={{
							"@paulkinlan/transformersjs-breadboard-kit": TransformersJS,
						}}
					>
						<ContentLayout>
							<AppRoutes />
						</ContentLayout>
					</BoardContextProvider>
				</Layout>
			</Layout>
		</>
	);
};

export default Main;
