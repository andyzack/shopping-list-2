import React from "react";

export interface HelloProps { 
  compiler: string;
  framework: string;
}

function App(props: HelloProps) {
  return(
    <h1>Hello from {props.compiler} and {props.framework}!</h1>
  )
}

export default App
