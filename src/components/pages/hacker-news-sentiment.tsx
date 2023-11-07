import { useHackerNewsPost, useHackerNewsPosts } from "../../features/ingress/hacker-news/hooks";
import SentimentOnMany from "../../features/board/components/sentiment-on-many";
import { Route, Routes, useLocation, useNavigate, useNavigation, useParams } from "react-router";
import HackerNewsPostView from "./hacker-news-post";

const HackerNewsSentiment = (): React.JSX.Element => {
	const navigate = useNavigate();
	const { posts } = useHackerNewsPosts({ prefetch: true });
	const id = "38166420";
	const { hackerNewsPost } = useHackerNewsPost(id);
	const { pathname } = useLocation();
	console.log(pathname);

	const handlePostClick = (): void => {
		navigate(`/hacker-news-sentiment/${id}`)
	};

	return (
		<div>
			<Routes>
				<Route path="" element={<SentimentOnMany values={posts.map(p => p.title)} handlePostClick={handlePostClick} />} />
				<Route path=":id" element={<HackerNewsPostView hackerNewsPost={hackerNewsPost} />} />
			</Routes>
		</div>
	);
};

export default HackerNewsSentiment;
