/**
 * Structured logging configuration for PokeClaude
 * Uses pino for fast, structured logging with pretty output in development
 */

import pino from 'pino';

const isDevelopment = process.env.NODE_ENV !== 'production';

const transport = isDevelopment
	? {
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					ignore: 'pid,hostname',
					translateTime: 'HH:MM:ss.l',
				},
			},
		}
	: {};

const logger = pino({
	level: process.env.LOG_LEVEL || 'info',
	...transport,
	// Redact sensitive information
	redact: {
		paths: ['[].headers.authorization', '[].headers.cookie'],
		remove: true,
	},
});

export default logger;
