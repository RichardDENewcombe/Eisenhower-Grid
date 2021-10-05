<script context="module">
    export async function load({ fetch }) {
        const res = await fetch('/todos');
        const jsonRes = await res.json();
        return {
            props: {
                todos: jsonRes.todos
            }
        }
    }
</script>

<script>

    import { update } from '$stores/stores.js'

    $: if( $update === true) {
        fetchTodos()
        update.update(n => n = false)
    }

    export let todos;

    import List from '$lib/List.svelte'

    let doTodo;
    let decideTodo;
    let delegateTodo;
    let deleteTodo;

    async function completeTodo(todo) {
        try {
            await fetch('/todos', {
                method: 'PUT',
                body: JSON.stringify(todo.detail),
            });
            fetchTodos()
        } catch(err) {
            alert(err)
        }
    }

    async function fetchTodos() {
        const res = await fetch('/todos');
        const jsonRes = await res.json();
        todos = jsonRes.todos;
    }

    async function promote(todo) {
        if (todo.detail.rank == 1) {
            return
        }

        let updatedTodo = todo.detail;
        console.log(updatedTodo)
        
        updatedTodo.rank = String(Number(updatedTodo.rank) - 1);

        try {
            await fetch('/todos/promote', {
                method: 'PUT',
                body: JSON.stringify(updatedTodo)
            });
            fetchTodos()
            } catch(err) {
                alert(err)
            }
    }

    async function demote(todo) {
        if (todo.detail.rank == 4) {
            return
        }

        let updatedTodo = todo.detail

        updatedTodo.rank = String(Number(updatedTodo.rank) + 1);
        
        try {
            await fetch('/todos/demote', {
            method: 'put',
            body: JSON.stringify(updatedTodo)
        });
        fetchTodos();
        } catch(err) {
            alert(err)
        }
}

    $: {
        doTodo = todos.filter(todo => todo.rank == 1);
        decideTodo = todos.filter(todo => todo.rank == 2);
        delegateTodo = todos.filter(todo => todo.rank == 3);
        deleteTodo = todos.filter(todo => todo.rank == 4);
    }

</script>

<div class="container">
    <div class="do box">DO
        <div class="content">
            <List todos={doTodo} on:change={completeTodo}  on:promote={promote} on:demote={demote} />
        </div>
    </div>
    <div class="decide box">SCHEDULE
        <div class="content">
            <List todos={decideTodo} on:change={completeTodo} on:promote={promote} on:demote={demote} />
        </div>
    </div>
    <div class="delegate box">DELEGATE
        <div class="content">
            <List todos={delegateTodo} on:change={completeTodo} on:promote={promote} on:demote={demote} />
        </div>
    </div>
    <div class="delete box">DELETE
        <div class="content">
            <List todos={deleteTodo} on:change={completeTodo} on:promote={promote} on:demote={demote} />
        </div>
    </div>
    <div class="urgent center hidden-small"><h2>Urgent</h2></div>
    <div class="not-urgent center hidden-small"><h2>Not Urgent</h2></div>
    <div class="important vertical center hidden-small"><h2>Important</h2></div>
    <div class="not-important vertical center hidden-small"><h2>Not Important</h2></div>
</div>

<style>

    .container {
        display: grid; 
        grid-template-columns: 0.05fr 1fr 1fr; 
        grid-template-rows: 0.05fr 1fr 1fr; 
        gap: 15px 15px; 
        grid-template-areas: 
            ". urgent not-urgent"
            "important do decide"
            "not-important delegate delete"; 
        margin: auto;
        width: 65%;
        height: 40%;
    }

    .do { 
        grid-area: do;
        background-color: rgb(0, 208, 138);
        color: #00744e;
        box-shadow: 3px 3px 3px 3px
    }

    .decide { 
        grid-area: decide; 
        background-color: rgb(234, 195, 28);
        color: #a48914;
        box-shadow: 3px 3px 3px 3px
    }

    .delegate { 
        grid-area: delegate;
        background-color: rgb(0, 138, 162);
        color: #006171;
        box-shadow: 3px 3px 3px 3px
    }

    .delete { 
        grid-area: delete;
        background-color:rgb(208, 44, 0); 
        color: #921f00;
        box-shadow: 3px 3px 3px 3px;
    }

    .urgent { grid-area: urgent; }
    .not-urgent { grid-area: not-urgent; }
    .important { grid-area: important; }
    .not-important { grid-area: not-important; }

    .vertical {
        transform: rotate(180deg);
        writing-mode: vertical-lr;
        text-align: center;
    }

    .box {
        height: 300px;
        width: 500px;
        border-radius: 10px;
        font-size: 80px;
    }

    .content {
        height: 200px;
        overflow: auto;
        font-size: 1rem;
        color: black;
        display: flex;
        align-items: flex-start;
    }

    .center {
        text-align: center;
    }

    @media only screen and (max-width: 1100px) {
        .container {
            margin: 0;
            width: auto;
            padding: 10px;
        }

        .box {
            width: auto;
        }
    }

    @media only screen and (max-width: 900px) {
        .container {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr 0fr 0fr 0fr 0fr;
            gap: 15px 0px;
            grid-auto-flow: row;
            grid-template-areas:
                "do"
                "decide"
                "delegate"
                "delete"
                "urgent"
                "not-urgent"
                "important"
                "not-important";
            padding: 10px;
            margin: 0 auto;
        }

        .do { grid-area: do; }

        .decide { grid-area: decide; }

        .delegate { grid-area: delegate; }

        .delete { grid-area: delete; }

        .urgent { grid-area: urgent; }

        .not-urgent { grid-area: not-urgent; }

        .important { grid-area: important; }

        .not-important { grid-area: not-important; }

        .box {
            width: auto;
            font-size: 40px;
        }

        .hidden-small {
            display: none;
        }

    }

</style>