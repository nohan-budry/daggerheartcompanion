export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replaceAll(/[^a-z0-9]/g, '-');
}