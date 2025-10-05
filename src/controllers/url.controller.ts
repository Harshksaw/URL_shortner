import { z } from "zod";
import { publicProcedure } from "../routers/trpc/context";

import logger from "../config/logger.config";
import { UrlService } from "../services/url.service";
import { UrlRepository } from "../repositories/url.repository";
import { CacheRepository } from "../repositories/cache.repository";
import { InternalServerError } from "../utils/errors/app.error";
const urlService = new UrlService(new UrlRepository(), new CacheRepository());

export const urlController = 
{

    create: publicProcedure.input(z.object({
        originalUrl: z.string().url('Invalid URL')
    }))
    .mutation(async ({input,ctx})=>{
        try {

            const result = await urlService.createShortUrl(input.originalUrl);
            return result;
            
        } catch (error) {
            logger.error('Error creating short URL:', error);
            throw new InternalServerError('Failed to create short URL');
        }
    }),

    getOrignalUrl: publicProcedure.input(z.object({
        shortUrl: z.string().min(1,'Short URL is required')
    }))
    .query(async({input,ctx})=>{
        try {
            const result = await urlService.getOriginalUrl(input.shortUrl);
            return result;
        } catch (error) {
            logger.error('Error fetching original URL:', error);
            throw new InternalServerError('Failed to fetch original URL');
        }
    })

}