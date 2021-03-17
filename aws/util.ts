import { readdirSync, statSync } from 'fs';

export default class Util {

    protected crawlDirectory(directory: string, f: (_: string) => void): void {
        const files = readdirSync(directory);
        for (const file of files) {
            const filePath = `${directory}/${file}`;
            const status = statSync(filePath);
            if (status.isDirectory()) this.crawlDirectory(filePath, f);
            if (status.isFile()) f(filePath);
        }
    }

    protected getDomainAndSubdomain(domain: string): { subdomain: string, parentDomain: string } {
        const parts = domain.split('.');
        if (parts.length < 2) throw new Error(`No TLD found on ${domain}`);
        if (parts.length === 2) return { subdomain: '', parentDomain: domain };
        const subdomain = parts[0];
        parts.shift();
        return { subdomain, parentDomain: parts.join('.') + '.' };
    }

}