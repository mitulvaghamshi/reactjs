import { React, react } from "../deps.ts";

const TodoApp1 = (props) => {
  const [todoList, updateList] = react.useState(new Map());
  const [todo, onSelect] = react.useState(Item());

  react.useEffect(() => {
    const tempList = new Map();
    props.initialTodo.forEach((todo) => tempList.set(todo.id, todo));
    updateList(tempList);
  }, [props.initialTodo]);

  const handleClick = (action, todo) => {
    const tempList = new Map(todoList);
    if (action === "SET") {
      tempList.set(todo.id, todo);
      updateList(tempList);
    } else if (action === "DELETE") {
      tempList.delete(todo.id);
      updateList(tempList);
    }
    onSelect(action === "EDIT" ? todo : Item());
  };

  const listItems: any[] = [];
  let index = 1;
  for (const key of todoList.keys()) {
    const item = todoList.get(key);
    listItems.push(
      <ListItem
        key={key}
        todo={item}
        index={index++}
        onClick={handleClick}
        isActive={item.id === todo.id}
      />,
    );
  }

  return (
    <div className="app1">
      <label className="title">xTodo App</label>
      <br />
      <br />
      <Form onSubmit={handleClick} todo={todo} />
      <div className="Todo-list">{listItems}</div>
    </div>
  );
};

const ListItem = (props) => (
  <div>
    <li className="List-item">
      <label
        className={"Item-thumb" + (props.isActive ? " Active-item" : "")}
        onClick={props.onClick}
      >
        {props.isActive ? "↩" : props.index}
      </label>
      <input
        type="text"
        className="Item-content"
        readOnly
        value={props.todo.value}
      />
      <div className="Item-controls">
        <button
          className="Action-btn Edit"
          onClick={() => props.onClick("EDIT", props.todo)}
        >
          ✍🏻
        </button>
        <button
          className="Action-btn Delete"
          onClick={() => props.onClick("DELETE", props.todo)}
        >
          ✖
        </button>
      </div>
    </li>
  </div>
);

const Form = (props) => {
  const [action, setAction] = react.useState("ADD");
  const [input, setInput] = react.useState("");
  const [id, setId] = react.useState(0);

  const handleClick = (event) => {
    event.preventDefault();
    if (input !== "") {
      let xId = id;
      if (action === "ADD") {
        setId(id + 1);
      } else {
        xId = props.todo.id;
      }
      props.onSubmit("SET", Item(xId, input));
      setInput("");
    }
  };

  react.useEffect(() => {
    setInput(props.todo.value);
    setAction(props.todo.value === "" ? "ADD" : "UPDATE");
  }, [props.todo]);

  return (
    <form className="Input-form">
      <input
        className="Input-element"
        type="search"
        autoFocus
        placeholder="What to do...?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="Item-controls">
        <button className="Action-btn Add" onClick={handleClick}>
          {action}
        </button>
      </div>
    </form>
  );
};

const Item = (id = -1, value = "") => ({ id, value });

export default function App1() {
  return (
    <TodoApp1
      initialTodo={[
        Item(1001, "Submit ASP.NET assignment tonight before it due."),
        Item(1002, "Watch recorded lecture videos."),
        Item(1003, "Get milk from walmart."),
        Item(1004, "Start Data Structure after dinner."),
        Item(1005, "Delete node_modules after submitting assignment."),
      ]}
    />
  );
}
