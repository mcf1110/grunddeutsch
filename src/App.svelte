<script lang="ts">
	import { data } from "./data";
	import draw from "./draw";
	import type { Q } from "./Q";
	import Question from "./Question.svelte";
	console.log(data);
	export let name: string;

	let totalQuestions = 0;
	let correctQuestions = 0;

	let currentQuestions: [Q, Q, Q, Q];
	let wasCorrect = true;
	run();

	function run() {
		currentQuestions = Array(4)
			.fill("")
			.map(() => draw(data)) as [Q, Q, Q, Q];
	}

	function next(correct: boolean) {
		totalQuestions++;
		correct && correctQuestions++;
		wasCorrect = correct;
		run();
	}
</script>

<main class={wasCorrect ? "correct" : "incorrect"}>
	<h1>
		{correctQuestions} / {totalQuestions}
		<small>
			({totalQuestions
				? Math.round((100 * correctQuestions) / totalQuestions)
				: 0}%)
		</small>
	</h1>
	<Question
		questions={currentQuestions}
		on:guess={({ detail }) => next(detail)}
	/>
</main>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap");

	main.correct {
		--color: #70ae6e;
	}

	main.incorrect {
		--color: #ad343e;
	}

	h1 {
		background: var(--color);
		display: inline-block;
		margin: 0;
		padding: 0.2em 1.5em;
		border-radius: 20px 20px 0 0;
		width: 20rem;
	}

	h1 small {
		font-size: 2rem;
	}
</style>
