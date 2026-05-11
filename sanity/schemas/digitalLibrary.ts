import { defineType, defineField } from 'sanity';

export const digitalLibrary = defineType({
  name: 'digitalLibrary',
  title: 'Digital Library',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
    }),
    defineField({
      name: 'edition',
      title: 'Edition Number',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pdfLink',
      title: 'PDF Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'edition',
      subtitle: 'year',
      media: 'coverImage',
    },
  },
});