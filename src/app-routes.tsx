import { Route, Routes } from "react-router";
import HackerNewsNavigation from "./components/pages/hacker-news-navigation";
import SentimentAnalysis from "./components/pages/sentiment-analysis";
import Home from "./components/pages/home";

const routeItems: { path: string; element: React.ReactNode }[] = [
	{

		path: "/",
		element: <Home />
	},
	{

		path: "/phrase-sentiment/*",
		element: <SentimentAnalysis />
	},
	{

		path: "/hacker-news-sentiment/*",
		element: <HackerNewsNavigation />
	}
];

const AppRoutes = (): React.JSX.Element => {

	return (
		<Routes>
			{routeItems.map((route, key) => (
				<Route path={route.path} element={route.element} key={key} />
			))}
		</Routes>
	);

};

export default AppRoutes;