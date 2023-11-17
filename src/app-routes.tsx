import { Route, Routes } from "react-router-dom";
import HackerNewsNavigation from "./components/pages/hacker-news-navigation";
import SentimentAnalysis from "./components/pages/sentiment-analysis";
import Home from "./components/pages/home";

const routeItems: { path: string; element: React.ReactNode }[] = [
	{

		path: "home",
		element: <Home />
	},
	{

		path: "phrase-sentiment",
		element: <SentimentAnalysis />
	},
	{

		path: "hacker-news-sentiment/*",
		element: <HackerNewsNavigation />
	}
];

const AppRoutes = (): JSX.Element => (
	<Routes>
		{routeItems.map((route, key) => (
			<Route key={key} path={route.path} element={route.element} />
		))}
	</Routes>
);

export default AppRoutes;