import { useState } from "react";

function App() {
    const [title, setTitle] = useState("Hello World");

    return (
        <>
            <div className="text-50px">hello world</div>
        </>
    );
}

export default App;
