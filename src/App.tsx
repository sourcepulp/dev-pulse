import { useEffect } from "react";
import Main from "./components/main";
import { ApplicationContext } from "./core/application-context";

function App() {
	useEffect(() => {
		ApplicationContext.init();
	}, []);

	return <Main />;
}

export default App;
