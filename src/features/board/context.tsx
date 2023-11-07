import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { BoardService } from "./service";
import { Result, ResultWithValue } from "./types";
import { NodeValue } from "@google-labs/breadboard";

type BoardContextType = {
	runOnce: (model: string, input: string) => Promise<any>;
	runOnceOnMany: (model: string, input: string[]) => Promise<any>;
};

export const BoardContext = createContext<BoardContextType | null>(null);

type BoardContextProviderProps = {
	graph: any;
	kits: Record<string, any>;
	children: ReactNode;
};

export const BoardContextProvider: React.FC<BoardContextProviderProps> = ({
	graph,
	kits,
	children,
}) => {
	const [initialized, setInitialized] = useState(false);
	const board = useMemo(() => new BoardService(), []);

	useEffect(() => {
		const initializeBoard = async () => {
			await board.init(graph, kits);
			setInitialized(true);
		};
		if (board) {
			initializeBoard();
		}
	}, [board]);

	const runOnce = useCallback(
		async (model: string, input: string) => {
			const result = await board.runOnce(model, input);
			return result;
		},
		[initialized]
	);

	const runOnceOnMany = useCallback(
		async (model: string, inputValues: string[]) => {
			const result: ResultWithValue[] = await Promise.all(
				inputValues.map(async (inputValue) => {
					const r = await board.runOnce(model, inputValue);
					return { value: inputValue, result: r as unknown as Result };
				})
			);
			return result;
		},
		[initialized]
	);

	return (
		<BoardContext.Provider value={{ runOnce, runOnceOnMany }}>
			{" "}
			{children}{" "}
		</BoardContext.Provider>
	);
};

export const useBoardContext = () => {
	const context = useContext(BoardContext);
	if (context === null) {
		throw new Error(
			"useBoardContext must be used within a BoardContextProvider"
		);
	}
	return context;
};
