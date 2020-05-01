import { LitElement, html, css } from "https://unpkg.com/lit-element?module";

class TodosList extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        color: blue;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      button {
        background-color: transparent;
        border: none;
      }
    `;
  }

  render() {
    return html`
      <ol>
        ${this.todos.map(
          (todo) =>
            html`
              <li>
                ${todo.text} (${todo.finished ? "Finished" : "UnFinished"})
                <input
                  type="checkbox"
                  .checked=${todo.finished}
                  @change=${(e) => this._changeTodoFinished(e, todo)}
                />
                <button @click="${() => this._removeElement(todo)}">X</button>
              </li>
            `
        )}
      </ol>
    `;
  }

  _changeTodoFinished(e, changedTodo) {
    const eventDetails = { changedTodo, finished: e.target.checked };
    this.dispatchEvent(
      new CustomEvent("change-todo-finished", { detail: eventDetails })
    );
  }

  _removeElement(todo) {
    this.dispatchEvent(new CustomEvent("remove-todo", { detail: todo }));
  }
}
customElements.define("todos-list", TodosList);
