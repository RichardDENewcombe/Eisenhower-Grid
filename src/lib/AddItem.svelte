<script>

    import { update } from '$stores/stores.js'

    let rank;
    let text;

    function submit(event) {
        if (event.key === 'Enter') {
            addTodo()
        }
    }

    async function addTodo() {
        if (!text) { return };

        try {
            const todo = {
                rank: rank,
                text: text,
                completed: false,
            };

            await fetch('/todos', {
                method: 'POST',
                body: JSON.stringify(todo),
            });
            update.update(n => n = true)
            text = '';
        } catch(err) {
            alert(err)
            text = '';
        }
    }
</script>
<div class="container">
    <input  on:keydown={submit} type="text" placeholder="" bind:value={text}>
    <select name="rank" id="rank" bind:value={rank}>
        <option value="1">Do</option>
        <option value="2">Schedule</option>
        <option value="3">Delegate</option>
        <option value="4">Delete</option>
    </select>
    <button on:click={() => {addTodo()}}>Add</button>
</div>

<style>

    @media only screen and (min-width: 1601px) {
        .container {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
        }
    }

    input {
        margin: 5px;
    }

    select {
        margin: 5px;
    }

    button {
        text-align: center;
        margin: 5px;
    }

    @media only screen and (max-width: 1600px) {
        .container {
            max-width: 200px;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
        }
    }



</style>