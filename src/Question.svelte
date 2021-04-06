<script lang="ts">
    import draw from "./draw";
    import type { Q } from "./Q";
    import { createEventDispatcher } from "svelte";

    export let questions: [Q, Q, Q, Q];
    $: q = draw(questions);
    const lang: "de" | "en" = draw(["en", "de"]);
    const other = lang === "de" ? "en" : "de";
    const dispatch = createEventDispatcher();

    function guess(answer) {
        dispatch("guess", answer == q[other]);
    }
</script>

<div class="card">
    <h2>{q[lang]}</h2>
    <h3>{q.category}</h3>

    <div class="questions">
        {#each questions as qs}
            <button on:click={() => guess(qs[other])}>{qs[other]}</button>
        {/each}
    </div>
</div>

<style>
    .card {
        min-width: 720px;
        background-color: #e0e0ce;
        border: 5px solid var(--color);
        border-radius: 20px;
        border-top-left-radius: 0;
        box-shadow: 0 0 2em rgba(0, 0, 0, 0.3);
        text-align: center;
    }

    button {
        background: #f2af29;
        border: 3px solid black;
        border-radius: 10px;
        flex: 1;
        margin: 1em 0.5em;
        cursor: pointer;
        transition: 0.15s;
        height: 4em;
    }

    button:hover {
        background: #d4910c;
    }

    .questions {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: auto;
    }
</style>
