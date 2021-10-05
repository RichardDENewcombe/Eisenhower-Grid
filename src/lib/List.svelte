<script>
    export let todos

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<ul>
    {#each todos as todo}
        <li>
            <svg on:click={() => dispatch('promote', todo)} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <g id="Layer_2" data-name="Layer 2">
                    <path xmlns="http://www.w3.org/2000/svg" d="M1,16A15,15,0,1,1,16,31,15,15,0,0,1,1,16Zm2,0A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z"/>
                    <path xmlns="http://www.w3.org/2000/svg" d="M10.41,19.87,16,14.29l5.59,5.58a1,1,0,0,0,1.41,0h0a1,1,0,0,0,0-1.41L16.64,12.1a.91.91,0,0,0-1.28,0L9,18.46a1,1,0,0,0,0,1.41H9A1,1,0,0,0,10.41,19.87Z"/>
                </g>
            </svg>
            <svg on:click={() => dispatch('demote', todo)} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <g id="Layer_2" data-name="Layer 2">
                    <path xmlns="http://www.w3.org/2000/svg" d="M16,1A15,15,0,1,1,1,16,15,15,0,0,1,16,1Zm0,28A13,13,0,1,0,3,16,13,13,0,0,0,16,29Z"/>
                    <path xmlns="http://www.w3.org/2000/svg" d="M10.41,12.13,16,17.71l5.59-5.58a1,1,0,0,1,1.41,0h0a1,1,0,0,1,0,1.41L16.64,19.9a.91.91,0,0,1-1.28,0L9,13.54a1,1,0,0,1,0-1.41H9A1,1,0,0,1,10.41,12.13Z"/>
                </g>
            </svg>
            <input type="checkbox" bind:checked={todo.completed} on:change={() => dispatch('change', todo)}>
            <span>{todo.text}</span>
        </li>
    {/each}
</ul>

<style>

    ul {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 0;
    }

    svg {
        text-align: center;
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        width: 15px;
    }

    li {
        list-style: none;
        cursor: default;
    }

</style>