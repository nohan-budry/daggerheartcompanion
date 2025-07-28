<script lang="ts">
    function copyToClipboard(data: string) {
        navigator.clipboard.writeText(data);
    }

    async function pasteFromClipboard() {
        try {
            input = await navigator.clipboard.readText();
        } catch (err) {
            console.error('Failed to read clipboard:', err);
        }
    }

    function pop(lines: string[]): string | undefined {
        return lines.pop();
    }

    function peek(lines: string[]): string | undefined {
        return lines.length > 0 ? lines[lines.length - 1] : undefined;
    }

    function convertAdversaryInput(input: string, tier: string): any {
        if (input.length == 0) {
            return '-';
        }

        try {
            let bugWords = ['Diffi culty', 'profi t', 'fi nely', 'fi nancial', 'infl ate', 'diff erent', 'refl ection', 'fl am', 'bonfi re', 'fi re', 'amoufl age', 'benefi ts', 'fi eld', 'eff ect', 'fi ve', 'fi nd', 'fl esh', 'defi ler', 'Defi ler'];
            bugWords.forEach(bugWord => {
                input = input.replaceAll(bugWord, bugWord.replace(' ', ''));
            });

            let lines = input.split('\n').reverse();
            let result: any = {};
            result.name = pop(lines)!.toLowerCase()
                .split(" ")
                .map(line => line.slice(0, 1).toUpperCase() + line.slice(1))
                .join(" ");

            result.tier = parseInt(tier);
            result.type = pop(lines)!.split(" ").slice(2).join(" ");
            result.description = pop(lines)!;
            while (!peek(lines)!.startsWith("Impulses: ")) {
                result.description += " " + pop(lines)!;
            }

            result.impulses = pop(lines)!.split(": ")[1];
            while (!peek(lines)!.startsWith("Diffi")) {
                result.impulses += " " + pop(lines)!;
            }
            result.impulses = result.impulses.toLowerCase().split(", ");

            result.difficulty = parseInt(pop(lines)!.split(": ")[1]);
            result.adversaries = pop(lines)!.split(": ")[1];
            while (!peek(lines)!.startsWith("FEATURES")) {
                result.adversaries += " " + pop(lines)!;
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
            console.log(error);
            return error;
        }
    }

    let tier = $state("1");
    let input = $state("");
    let convertedInput = $derived(convertAdversaryInput(input, tier));
</script>

<div class="mb-4 flex gap-4">
    <label for="input" class="text-2xl block">Input</label>
    <button class="border px-2 py-1 cursor-pointer hover:bg-blue-200 active:bg-blue-300"
            onclick={() => pasteFromClipboard()}>
        Paste
    </button>
</div>
<div class="mb-4 flex gap-4 items-center">
    <label for="tier" class="text-xl block">Tier</label>
    <select bind:value={tier} id="tier" class="border p-2">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
</div>
<textarea id="input" bind:value={input} class="w-full border p-2" rows="10"></textarea>

<div class="my-4 flex gap-4">
    <h1 class="text-2xl">Result</h1>
    <button class="border px-2 py-1 cursor-pointer hover:bg-blue-200 active:bg-blue-300"
            onclick={() => copyToClipboard(convertedInput)}>
        Copy
    </button>
</div>

<pre>{convertedInput}</pre>