import './App.css';
import Editor from "@monaco-editor/react";

function App() {
  return (
    <>
    <div style={{ width: '90%', margin: 'auto' }}>
      <Editor
        className="texteditor"
        height="400px"
        theme="vs-dark"
        defaultLanguage='typescript'
        value=''
        onChange={e => console.log(e)} />
    </div>
    <div>Hrd</div>
    
    
    </>
  );
}

export default App;
