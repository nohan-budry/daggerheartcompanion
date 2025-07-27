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

    function convertMultiDomainCardInput(input: string): any {
        if (input.length == 0) {
            return '-';
        }

        try {
            let lines = input.split('\n').reverse();

            let elements: string[] = [];
            while (peek(lines)) {
                if (/^([A-Z]|\s|‑|-)+$/.test(peek(lines)!)) {
                    elements.push(pop(lines)!);
                } else {
                    elements[elements.length - 1] += "\n" + pop(lines)!;
                }
            }
            return elements.map(convertDomainCardInput).join(",\n");
        } catch (error) {
            return error;
        }
    }

    function convertDomainCardInput(input: string): any {
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
            result.name = pop(lines)!.toLowerCase()
                .split(" ")
                .map(line => line.slice(0, 1).toUpperCase() + line.slice(1))
                .join(" ")
                .split("-")
                .map(line => line.slice(0, 1).toUpperCase() + line.slice(1))
                .join("-");

            const [_ignored1, level, _ignored2, type] = pop(lines)!.split(" ");
            result.level = parseInt(level);
            result.type = type;
            result.recallCost = parseInt(pop(lines)!.split(": ")[1]);

            if (!peek(lines)!.includes(": ")) {
                let featureLines: string[] = [];
                while (peek(lines)) {
                    featureLines.push(pop(lines)!);
                }
                result.feature = featureLines.join(" ");
            } else {
                result.features = [];
                while (peek(lines)) {
                    let [name, description] = pop(lines)!.split(": ");

                    while (peek(lines) && !peek(lines)!.includes(": ")) {
                        description += " " + pop(lines)!;
                    }
                    result.features.push({name, description});
                }
            }

            return JSON.stringify(result, null, 2);

        } catch (error) {
            return error;
        }
    }

    let multiElements: boolean = $state(true);
    let input = $state("");
    let convertedInput = $derived(multiElements ? convertMultiDomainCardInput(input) : convertDomainCardInput(input));
</script>

<div class="mb-4 flex gap-4">
    <label for="input" class="text-2xl block">Input</label>
    <button class="border px-2 py-1 cursor-pointer hover:bg-blue-200 active:bg-blue-300"
            onclick={() => pasteFromClipboard()}>
        Paste
    </button>
    <button class="border px-2 py-1 cursor-pointer hover:bg-blue-200 active:bg-blue-300"
            onclick={() => multiElements = !multiElements}>
        {multiElements ? "Multi" : "Single"}
    </button>
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