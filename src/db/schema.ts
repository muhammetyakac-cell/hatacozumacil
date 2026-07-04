import { pgTable, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const categories = pgTable('hc_categories', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const errors = pgTable('hc_errors', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').references(() => categories.id).notNull(),
  errorCode: varchar('error_code', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  sourceUrls: text('source_urls').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tags = pgTable('hc_tags', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
});

export const errorTags = pgTable('hc_error_tags', {
  errorId: text('error_id').references(() => errors.id).notNull(),
  tagId: text('tag_id').references(() => tags.id).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  errors: many(errors),
}));

export const errorsRelations = relations(errors, ({ one, many }) => ({
  category: one(categories, {
    fields: [errors.categoryId],
    references: [categories.id],
  }),
  tags: many(errorTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  errors: many(errorTags),
}));

export const errorTagsRelations = relations(errorTags, ({ one }) => ({
  error: one(errors, {
    fields: [errorTags.errorId],
    references: [errors.id],
  }),
  tag: one(tags, {
    fields: [errorTags.tagId],
    references: [tags.id],
  }),
}));
