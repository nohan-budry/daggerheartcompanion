<script lang="ts">
    function copyToClipboard(data: string) {
        navigator.clipboard.writeText(data);
    }

    function pop(lines: string[]): string | undefined {
        return lines.pop();
    }

    function peek(lines: string[]): string | undefined {
        return lines.length > 0 ? lines[lines.length - 1] : undefined;
    }


    function convertMultiAdversariesInput(input: string): any {
        if (input.length == 0) {
            return '-';
        }

        try {
            let lines = input.split('\n').reverse();

            let elements: string[] = [];
            while (peek(lines)) {
                if (/^([A-Z]|\s|‑|-)+$/.test(peek(lines)!) && !peek(lines)!.includes("FEATURES")) {
                    elements.push(pop(lines)!);
                } else {
                    elements[elements.length - 1] += "\n" + pop(lines)!;
                }
            }
            return elements.map(convertAdversaryInput).join(",\n");
        } catch (error) {
            return error;
        }
    }

    function convertAdversaryInput(input: string): any {
        if (input.length == 0) {
            return '-';
        }

        try {
            let bugWords = ['Diffi culty', 'profi t', 'fi nely', 'fi nancial', 'infl ate', 'diff erent', 'refl ection', 'fl am', 'bonfi re', 'fi re', 'amoufl age', 'benefi ts', 'fi eld', 'eff ect', 'fi ve', 'fi nd', 'fl esh'];
            bugWords.forEach(bugWord => {
                input = input.replaceAll(bugWord, bugWord.replace(' ', ''));
            });

            let lines = input.split('\n').reverse();
            let result: any = {};
            result.name = pop(lines)!.toLowerCase()
                .split(" ")
                .map(line => line.slice(0, 1).toUpperCase() + line.slice(1))
                .join(" ");

            result.tier = 2;
            result.type = pop(lines)!.split(" ").slice(2).join(" ");
            result.description = pop(lines)!;
            while (!peek(lines)!.startsWith("Motives & Tactics: ")) {
                result.description += " " + pop(lines)!;
            }

            result.motivesAndTactics = pop(lines)!.split(": ")[1];
            while (!peek(lines)!.startsWith("Diffi")) {
                result.motivesAndTactics += " " + pop(lines)!;
            }
            result.motivesAndTactics = result.motivesAndTactics.toLowerCase().split(", ");

            let data = (pop(lines)! + " | " + pop(lines)!).split(" | ");
            result.difficulty = parseInt(data[0].split(": ")[1]);
            result.thresholds = data[1].split(": ")[1];
            result.hitPoints = parseInt(data[2].split(": ")[1]);
            result.stress = parseInt(data[3].split(": ")[1]);
            result.attack = {
                bonus: parseInt(data[4].split(": ")[1].replaceAll('−', '-')),
                name: data[5].split(": ")[0],
                range: data[5].split(": ")[1],
                damage: data[6],
            }

            if (peek(lines)!.startsWith("Experience")) {
                result.experiences = pop(lines)!.split(": ")[1].split(", ");
            } else {
                result.experiences = [];
            }

            pop(lines)!;

            result.features = [];
            while (peek(lines)) {
                let info = /^([^()]+) \(?([^()]+)?\)? ?- (.+): (.+)$/.exec(pop(lines)!)!;
                let [name, value, type, description] = [info[1], info[2], info[3], info[4]];

                while (peek(lines) && !peek(lines)!.match(/^.+ - .+: .+$/)) {
                    description += " " + pop(lines)!;
                }
                result.features.push({type, name, value, description});
            }

            return JSON.stringify(result, null, 2);

        } catch (error) {
            return error;
        }
    }

    let input = $state("");
    let convertedInput = $derived(convertMultiAdversariesInput(input));
</script>

<label for="input" class="text-2xl mb-4 block">Input</label>
<textarea id="input" bind:value={input} class="w-full border p-2" rows="10"></textarea>

<div class="my-4 flex gap-4">
    <h1 class="text-2xl">Result</h1>
    <button class="border px-2 py-1 cursor-pointer hover:bg-blue-200 active:bg-blue-300"
            onclick={() => copyToClipboard(convertedInput)}>
        Copy
    </button>
</div>
<!--<p class="mb-4">{JSON.parse(convertedInput ?? '[]')?.length}</p>-->
<pre style="white-space: pre-wrap; overflow-wrap: break-word;">{convertedInput}</pre>