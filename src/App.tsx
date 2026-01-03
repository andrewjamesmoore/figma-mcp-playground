import Card from "./components/Card";
import "./App.css";

function App() {
	return (
		<Card
			title="I am a card."
			description="I usually have something important to say."
			primaryAction={{
				label: "Let's Go",
				onClick: () => alert("Primary action clicked!"),
			}}
			secondaryAction={{
				label: "Cancel",
				onClick: () => alert("Secondary action clicked!"),
			}}
		/>
	);
}

export default App;
