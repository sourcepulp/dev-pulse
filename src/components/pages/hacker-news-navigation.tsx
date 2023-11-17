import { useHackerNewsPost, useHackerNewsPosts } from "../../features/ingress/hacker-news/hooks";
import SentimentOnMany from "../../features/board/components/sentiment-on-many";
import { Route, Routes, useNavigate, useParams } from "react-router";
import HackerNewsPostView from "../../features/board/components/hacker-news-post";

const HackerNewsSentiment = (): React.JSX.Element => {
	const navigate = useNavigate();
	const { posts } = useHackerNewsPosts({ prefetch: true });

	const handlePostClick = (id: string): void => {
		navigate(`/hacker-news-sentiment/posts/${id}`);
	};

	const { hackerNewsPost } = useHackerNewsPost("38166420");

	return (
		<div>
			<Routes>
				<Route path="/" element={<SentimentOnMany values={posts.map(p => ({ value: p.title, id: p.id }))} handlePostClick={handlePostClick} />} />
				<Route path="/:id" element={<HackerNewsPostView hackerNewsPost={hackerNewsPost} />} />
			</Routes>
		</div>
	);
};

export default HackerNewsSentiment;
