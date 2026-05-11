import { defineType, defineField } from 'sanity';

export const blackboard = defineType({
  name: 'blackboard',
  title: 'Blackboard',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
});