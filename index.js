import { LitElement, html } from "https://unpkg.com/lit-element?module";
import "./todos-list.js";

const author = "Wasim Almadfaa";
const github_account = "https://github.com/wmadfaa";
const footerTemplate = html`
  <footer>
    Made with love by
    <a href=${github_account}>${author}</a>
  </footer>
`;

class TodoApp extends LitElement {
  constructor() {
    super();

    this._todos = [
      { text: "Do A", finished: true },
      { text: "Do B", finished: false },
      { text: "Do C", finished: false },
    ];
  }

  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  set todos(newTodos) {
    if (this._todos === newTodos) return;
    this._todos = newTodos;

    this.requestUpdate();
  }

  get todos() {
    return this._todos;
  }

  _addTodo() {
    const input = this.shadowRoot.getElementById("addTodoInput");
    const text = input.value;
    input.value = "";

    this.todos = [...this.todos, { text, finished: false }];

    this.requestUpdate();
  }

  _changeTodoFinished(e) {
    const {changedTodo, finished} = e.detail;

    this.todos = this.todos.map((todo) => {
      if (todo !== changedTodo) {
        return todo;
      }
      return { ...changedTodo, finished };
    });
  }

  _removeElement(e) {
    this.todos = this.todos.filter((todo) => todo !== e.detail);
  }

  render() {
    const finishedCount = this.todos.filter((todo) => todo.finished).length;
    const unfinishedCount = this.todos.length - finishedCount;

    return html`
      <h1>Todo App</h1>

      <input type="text" id="addTodoInput" placeholder="add todo" />
      <button @click="${this._addTodo}">add</button>
      <todos-list 
      .todos="${this.todos}"
      @change-todo-finished="${this._changeTodoFinished}"
      @remove-todo="${this._removeElement}"
      ></todos-list>
      <div>Total finished: ${finishedCount}</div>
      <div>Total unfinished: ${unfinishedCount}</div>

      ${footerTemplate}
    `;
  }
}
customElements.define("todo-app", TodoApp);
