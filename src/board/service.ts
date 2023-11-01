import { Board, BoardRunner } from "@google-labs/breadboard";

export class BoardService {
	private board?: BoardRunner;
	public async init(graph: any, kit: Record<string, any>) {
		this.board = await Board.load(graph, {
			kits: kit,
		});
	}
	
	public getBoard(): BoardRunner | undefined {
		if (!this.board) {
			throw new Error("Board not initialized");
		}
		return this.board;
	}

	public async runOnce(model: string, input: string) {
		const result = await this.board?.runOnce({ model, input });
		return result;
	}
}
