import type Adversary from "$lib/models/Adversary";
import type Ancestry from "$lib/models/Ancestry";
import type ClassData from "$lib/models/ClassData";
import type Community from "$lib/models/Community";
import type Domain from "$lib/models/Domain";
import type Environment from "$lib/models/Environment";
import type Equipment from "$lib/models/Equipment";
import type Loot from "$lib/models/Loot";
import Content from "$lib/models/Content";

interface Fetch {
    (input: (RequestInfo | URL), init?: RequestInit): Promise<Response>
    (input: (string | URL | globalThis.Request), init?: RequestInit): Promise<Response>
}

export default class ContentApiService {
    baseUrl: string = '';
    fetch: Fetch;

    constructor(baseUrl: string, fetch: Fetch) {
        this.baseUrl = baseUrl;
        if (this.baseUrl.endsWith('/')) {
            this.baseUrl = this.baseUrl.slice(0, -1);
        }
        this.fetch = fetch;
    }

    private resourceUrl(resource: string) {
        return `${this.baseUrl}/${resource}`;
    }

    private async get<T>(resource: string): Promise<T> {
        const response = await this.fetch(this.resourceUrl(resource))
        return await response.json() as T;
    }

    private getAdversaries(): Promise<Adversary[]> {
        return this.get<any>('adversaries.json');
    }

    private getAncestries(): Promise<Ancestry[]> {
        return this.get<any>('ancestries.json');
    }

    private getClasses(): Promise<ClassData[]> {
        return this.get<any>('classes.json');
    }

    private getCommunities(): Promise<Community[]> {
        return this.get<any>('communities.json');
    }

    private getDomains(): Promise<Domain[]> {
        return this.get<any>('domains.json');
    }

    private getEnvironments(): Promise<Environment[]> {
        return this.get<any>('environments.json');
    }

    private getEquipments(): Promise<Equipment[]> {
        return this.get<any>('equipments.json');
    }

    private getConsumables(): Promise<Loot[]> {
        return this.get<any>('loots/consumables.json');
    }

    private getReusables(): Promise<Loot[]> {
        return this.get<any>('loots/reusables.json');
    }

    public getContent(): Promise<Content> {
        return Promise.all([
            this.getAncestries(),
            this.getCommunities(),
            this.getClasses(),
            this.getDomains(),
            this.getEquipments(),
            this.getConsumables(),
            this.getReusables(),
            this.getAdversaries(),
            this.getEnvironments()
        ]).then((
            [
                ancestries,
                communities,
                classes,
                domains,
                equipments,
                consumables,
                reusables,
                adversaries,
                environments,
            ]: [
                Ancestry[],
                Community[],
                ClassData[],
                Domain[],
                Equipment[],
                Loot[],
                Loot[],
                Adversary[],
                Environment[],
            ],
        ) => {
            return new Content(
                ancestries,
                communities,
                classes,
                domains,
                equipments,
                consumables,
                reusables,
                adversaries,
                environments,
            );
        })
    }
}