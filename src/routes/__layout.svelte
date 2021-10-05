<script>

    import AddItem from'$lib/AddItem.svelte'

</script>

<div class="container">
    <div class="grid">
        <slot />
    </div>
    <div class="add-item">
        <h1>Eisenhower Matrix</h1>
        <AddItem />
    </div>
    <div class="how-to">
        <h3>How to Use</h3>
        <p>The Eisenhower Matrix is a simple tool for considering the long-term outcomes of your daily tasks and focusing on what will make you most effective, not just most productive.</p>
        <p>Each task can be promoted and demoted between categories depending on how priorities change using the up and down arrows next to each item.</p>
        <h4>Do</h4>
        <p>Tasks with clear deadlines and significant consequences if not completed in a timely fashion.</p>
        <h4>Schedule</h4>
        <p>Tasks with no set deadline but bring you closer to your long-term goals.</p>
        <h4>Delegate</h4>
        <p>Tasks that need to get done, but don't need your expertise in order to be completed.</p>
        <h4>Delete</h4>
        <p>Tasks that distract you from your preferred course, and don't add any measurable value.</p>
    </div>

  </div>

<style>

    h4 {
        margin-bottom: 0;
    }

    p {
        margin-top: 2px;
    }

    .container {
        margin-left: 10px;
        display: grid;
        grid-template-columns: 0.2fr 1fr;
        grid-template-rows: 0.2fr 0.5fr;
        gap: 0px 0px;
        grid-auto-flow: row;
        grid-template-areas:
            "add-item grid"
            "how-to grid";
        margin-top: 20px;
    }

    .grid { grid-area: grid; }

    .add-item { 
        grid-area: add-item; 
        margin: 0 auto;
    }

    .how-to {
        grid-area: how-to;
        margin-top: 40px;
    }

@media only screen and (max-width: 1600px) {
    .container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: .05fr auto .5fr;
        gap: 10px 0px;
        grid-auto-flow: row;
        grid-template-areas:
            "add-item"
            "grid"
            "how-to";
    }

    .add-item {
        margin-top: 5px;
    }

    .how-to {
        text-align: center;
        max-width: 400px;
        margin: 0 auto;
    }
}

</style>