import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BoardService } from "./service";

type BoardContextType = {
	runOnce: (model: string, input: string) => Promise<any>;
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
		if(board){
			initializeBoard();
		}
	}, [board]);

	const runOnce = useCallback(async (model: string, input: string) => {
		const result = await board.runOnce(model, input);
		return result;
	
	}, [initialized])

	return <BoardContext.Provider value={{runOnce}}> {children} </BoardContext.Provider>;
 };

export const useBoardContext = () => {
	const context = useContext(BoardContext);
	if (context === null) {
		throw new Error("useBoardContext must be used within a BoardContextProvider");
	}
	return context;
}