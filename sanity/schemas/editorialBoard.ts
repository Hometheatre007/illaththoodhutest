import { defineType, defineField } from 'sanity';

export const editorialBoard = defineType({
  name: 'editorialBoard',
  title: 'Editorial Board',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coordinatorName',
      title: 'Coordinator Name',
      type: 'string',
    }),
    defineField({
      name: 'coordinatorTitle',
      title: 'Coordinator Title',
      type: 'string',
    }),
    defineField({
      name: 'coordinatorPhoto',
      title: 'Coordinator Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'editorName',
      title: 'Editor Name',
      type: 'string',
    }),
    defineField({
      name: 'editorTitle',
      title: 'Editor Title',
      type: 'string',
    }),
    defineField({
      name: 'editorPhoto',
      title: 'Editor Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'editorName',
      subtitle: 'year',
      media: 'editorPhoto',
    },
  },
});