import GridContainer from "./components/GridContainer";

function App() {
  console.log("App component rendered");
  return (
    <div className="min-h-screen bg-grey-100 flex flex-col ">
      <header className="w-full p-4">
        <h1 className="text-3xl font-bold text-center">YouTube</h1>
      </header>
      <GridContainer />
    </div>
  );
}

export default App;
