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

    function convertMulti(input: string,  tier: string): any {
        if (input.length == 0) {
            return '-';
        }

        try {
            let lines = input.split('\n').toReversed();

            let elements: string[][] = [[]];
            while (peek(lines) !== undefined) {
                if (peek(lines)!.length == 0) {
                    pop(lines);
                    elements.push([]);
                } else {
                    elements[elements.length - 1].push(pop(lines)!);
                }
            }

            elements = elements.filter((element) => element.length);
            return {
                count: elements.length,
                elements: elements
                    .map(element => convertSingle(element.join("\n"), tier))
                    .join(",\n")
            };
        } catch (error) {
            return error;
        }
    }

    function convertSingle(input: string, tier: string): any {
        if (input.length == 0) {
            return '-';
        }

        try {
            let bugWords = ['Diffi culty', 'profi t', 'fi nely', 'fi nancial', 'infl ate', 'diff erent', 'refl ection', 'fl am', 'bonfi re', 'fi re', 'amoufl age', 'benefi ts', 'fi eld', 'eff ect', 'fi ve', 'fi nd', 'fl esh'];
            bugWords.forEach(bugWord => {
                input = input.replaceAll(bugWord, bugWord.replace(' ', ''));
            });

            // the first - is a different character from the normal -.
            input = input.replaceAll('‑', '-');

            let lines = input.split('\n').reverse();
            let result: any = {};

            result.type = 'Armor';
            result.tier = parseInt(tier);
            result.name = [];

            let data = pop(lines)!.split(" ").reverse();
            while (!/^\d+$/.test(peek(data)!)) {
                result.name.push(pop(data)!);
            }
            result.name = result.name.join(" ");
            result.thresholds = pop(data)! + pop(data)! + pop(data)!;
            result.score = parseInt(pop(data)!);

            if (peek(data) !== '—') {
                let feature: {name: any, description: any} = {
                    name: [],
                    description: []
                };

                while (!peek(data)!.endsWith(':')) {
                    feature.name.push(pop(data)!);
                }
                feature.name.push(pop(data)!.slice(0, feature.name.length - 1));
                feature.name = feature.name.join(" ");

                while (peek(data)) {
                    feature.description.push(pop(data)!);
                }
                while (peek(lines)) {
                    feature.description.push(pop(lines)!);
                }
                feature.description = feature.description.join(" ");

                result.features = [feature];
            }

            return JSON.stringify(result, null, 2);

        } catch (error) {
            return error;
        }
    }

    let tier = $state("1");
    let input = $state("");
    let convertedInput = $derived(convertMulti(input, tier));
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
            onclick={() => copyToClipboard(convertedInput.elements)}>
        Copy
    </button>
</div>

<pre>{convertedInput.count} Element(s)</pre>
<pre>{convertedInput.elements}</pre>