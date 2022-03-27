import "./App.css";
import Button from "@material-ui/core/Button";
import SaveAltRoundedIcon from "@material-ui/icons/SaveAltRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import OpenInBrowserRoundedIcon from "@material-ui/icons/OpenInBrowserRounded";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Editor from "@monaco-editor/react";
import React, { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    console.log(editorRef.current.getValue());
  }
  return (
    <header className="App-header">
      <div>
        <Button
          variant="contained"
          color="Secondary"
          className={classes.button}
          startIcon={<AddCircleOutlineRoundedIcon />}
        >
          Nuevo
        </Button>

        <Button
          variant="contained"
          color="Secondary"
          className={classes.button}
          startIcon={<OpenInBrowserRoundedIcon />}
        >
          Abrir
        </Button>

        <Button
          variant="contained"
          color="Secondary"
          className={classes.button}
          startIcon={<SaveAltRoundedIcon />}
        >
          Guardar
        </Button>
      </div>
      <div className="editores">
        <div className="espacio"></div>

        <div style={{ width: "50%" }}>
          <Editor
            className="texteditor"
            height="400px"
            theme="vs-dark"
            defaultLanguage="typescript"
            value="//Waler Gustavo Cotí Xalin - 201700522"
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="espacio"></div>
        <div style={{ width: "50%" }}>
          <input className="consola" 
          type="textare" 
          name="textValue"
          value="hola mundo"
           />
        
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<PlayArrowIcon />}
      >
        Ejecutar
      </Button>
    </header>
  );
}

export default App;
