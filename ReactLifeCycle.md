# React App Lifecycle (Deno.js)

ReactJS: React app LifeCycle app.

## Sources

- [tsconfig.json](#tsconfigjson)
- [deno.json](#denojson)
- [deps.ts](#depsts)
- [index.html](#indexhtml)
- [index.ts](#indexts)
- [form.ts](#formts)
- [app.ts](#appts)

## tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "react",
    "noImplicitAny": true,
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ]
  }
}
```

## deno.json

```json
{
  "tasks": {
    // install create-react-app for deno.js
    "install-cra": "deno install -A --unstable -n deno-create-react-app https://deno.land/x/create_react_app/mod.ts",
    // run app
    "run": "deno-create-react-app run",
    // build (compile) app
    "build": "deno-create-react-app build",
    // run compiled app on local web server
    "serve": "deno run --allow-net --allow-read https://deno.land/std@0.157.0/http/file_server.ts dist/build/"
  }
}
```

## deps.ts

```ts
export * as ReactDOM from "https://jspm.dev/react-dom@18.2.0/client";

import * as React from "https://jspm.dev/react@18.2.0";

const { default: any, ...rest } = React;
const react = React.default;

export { react as React };
export { rest as react };
```

## index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#646464" />
    <meta name="description" content="React Lifecycle App created using Deno" />
    <title>ReactJS Lifecycle</title>
</head>

<body style="background-color: azure;">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
<!-- load compiled js -->
<script src="./static/js/main.js"></script>

</html>
```

## index.ts

```ts
import { React, ReactDOM } from "./deps.ts";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LifecycleApp value="Hello World!" />
  </React.StrictMode>,
);
```

## form.ts

```ts
import { React, react } from "./deps.ts";

const Form = (props) => {
  const [inputValue, updateValue] = react.useState("");

  const handleClick = (event) => {
    event.preventDefault();
    props.onSubmit(inputValue);
    updateValue("");
  };

  return (
    <form>
      <input
        style={{
          margin: "10px",
          padding: "10px",
          fontSize: "18px",
          borderRadius: "10px",
        }}
        type="text"
        value={inputValue}
        onChange={(event) => updateValue(event.target.value)}
      />
      <button
        style={{ margin: "10px", padding: "10px" }}
        onClick={handleClick}
      >
        Update State
      </button>
    </form>
  );
};
```

## app.ts

```ts
import { React } from "./deps.ts";
import { Form } from "./form.tsx";

class LifecycleApp extends React.Component {
  state: { value: string };
  props: any;

  constructor(props) {
    super(props);
    console.log(`Constructor called! [ props: ${props.value} ]`);
    this.state = { value: "State 101" };
  }

  // (method)
  // React.ComponentLifecycle<any, any, any>.componentDidMount?(): void
  componentDidMount() {
    // Called immediately after a component is mounted.
    // Setting state here will trigger re-rendering.
    console.log("Method componentDidMount() called!");
  }

  // (method)
  // React.ComponentLifecycle<any, any, any>.componentWillUnmount?(): void
  componentWillUnmount() {
    // Called immediately before a component is destroyed.
    // Perform any necessary cleanup in this method,
    // such as cancelled network requests,
    // or cleaning up any DOM elements created in componentDidMount.
    console.log("Method componentWillUnmount() called!");
  }

  // (method)
  // React.NewLifecycle<any, any, any>.componentDidUpdate?(
  //      prevProps: Readonly<any>,
  //      prevState: Readonly<any>,
  //      snapshot?: any
  // ): void
  componentDidUpdate(prevProp, prevState, snapshot) {
    // Called immediately after updating occurs.
    // Not called for the initial render.

    // The snapshot is only present if getSnapshotBeforeUpdate
    // is present and returns non-null.
    console.log(`Method componentDidUpdate() called! [
          prevProp: ${prevProp.value},
          prevState: ${prevState.value},
          snapshot: ${snapshot.exampleData.x}
      ]`);
  }

  // (method)
  // React.ComponentLifecycle<any, any, any>.shouldComponentUpdate?(
  //      nextProps: Readonly<any>,
  //      nextState: Readonly<any>,
  //      nextContext: any
  // ): boolean
  shouldComponentUpdate(nextProp, nextState, nextContext) {
    // Called to determine whether the change
    // in props and state should trigger a re-render.

    // Component always returns true.

    // PureComponent implements a shallow comparison on props and state
    // and returns true if any props or states have changed.

    // If false is returned, Component#render, componentWillUpdate
    // and componentDidUpdate will not be called.
    console.log(`Method shouldComponentUpdate() called! [
          nextProp: ${nextProp.value},
          nextState: ${nextState.value},
          nextContext: ${nextContext}
      ]`);
    return true;
  }

  // (method)
  // React.NewLifecycle<any, any, any>.getSnapshotBeforeUpdate?(
  //      prevProps: Readonly<any>,
  //      prevState: Readonly<any>
  // ): any
  getSnapshotBeforeUpdate(prevProp, prevState) {
    // Runs before React applies the result of render to the document,
    // and returns an object to be given to componentDidUpdate.
    // Useful for saving things such as scroll position
    // before render causes changes to it.

    // Note: the presence of getSnapshotBeforeUpdate prevents
    // any of the deprecated lifecycle events from running.
    console.log(`Method getSnapshotBeforeUpdate() called! [
          prevProp: ${prevProp.value},
          prevState: ${prevState.value}
      ]`);
    return { exampleData: { x: 0.101, y: 1.504 } };
  }

  // (method)
  // React.ComponentLifecycle<any, any, any>.componentDidCatch?(
  //      error: Error,
  //      errorInfo: React.ErrorInfo
  // ): void
  componentDidCatch(error, errorInfo) {
    // Catches exceptions generated in descendant components.
    // Unhandled exceptions will cause the entire component tree to unmount.
    console.log(`Method componentDidCatch() called! [
          Error: ${error},
          errorInfo: ${errorInfo}
      ]`);
  }

  // (method)
  // Member function of this component
  updateStateValue(newValue) {
    this.setState({ value: newValue }, () => this.postStateUpdate(newValue));
    console.log(`Method updateStateValue() called! [
          newValue: ${newValue}
      ]`);
  }

  // (method)
  // State post update callback
  // Member function of this component
  postStateUpdate(value) {
    console.log(`Method postStateUpdate() called! [
          value: ${value}
      ]`);
  }

  // (method)
  // React.Component<any, any, any>.render(): React.ReactNode
  render() {
    return (
      <div style={{ width: "50%", margin: "auto" }}>
        <h2>Prop value: {this.props.value}</h2>
        <h2>State value: {this.state.value}</h2>
        <Form onSubmit={(value) => this.updateStateValue(value)} />
        <p style={{ color: "red" }}>Open DevTool (F12) to see Debug Output!</p>
      </div>
    );
  }
}
```
