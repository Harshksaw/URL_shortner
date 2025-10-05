import { serverConfig } from '../config';
import { CacheRepository } from '../repositories/cache.repository';
import { UrlRepository } from '../repositories/url.repository';
import { fromBase62, toBase62 } from '../utils/base62';
export class UrlService{
    constructor(private readonly urlRepository: UrlRepository,
        private readonly cacheRepository: CacheRepository
    ){}

        async createShortUrl(originalUrl: string){

            const nextId = await this.cacheRepository.getNextId();

            const shortUrl = toBase62(nextId);

            const url = await this.urlRepository.createUrl({
                originalUrl,
                shortUrl
            })

            //cache the url mapping
            await this.cacheRepository.setUrlMapping(shortUrl, originalUrl);

            const baseUrl = serverConfig.BASE_URL;
            const fullUrl = `${baseUrl}/${shortUrl}`;
            
            return {
                id: url.id.toString(),
                originalUrl: url.originalUrl,
                shortUrl: fullUrl,
                fullUrl,
                createdAt: url.createdAt,
                updatedAt: url.updatedAt
            };
        }

        async getOriginalUrl(shortUrl: string) {

            const originalUrl = await this.cacheRepository.getUrlMapping(shortUrl);
            if(originalUrl){
                    await this.urlRepository.incrementClicks(shortUrl);
                return {originalUrl,shortUrl};
            }

            const url = await this.urlRepository.findByShortUrl(shortUrl);

            if(url){
                await this.cacheRepository.setUrlMapping(shortUrl, url.originalUrl);
                await this.urlRepository.incrementClicks(shortUrl);
                return {originalUrl: url.originalUrl, shortUrl};
            }
            return null;
        }
    

    
}