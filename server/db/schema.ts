import { pgTable, timestamp, text } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const posts = pgTable('posts', {
	id: text().primaryKey().$defaultFn(createId),
	title: text().notNull(),
	slug: text().notNull(),
	content: text(),
	createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
})
