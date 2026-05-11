import { type SchemaTypeDefinition } from 'sanity';

import { notice } from './schemas/notice';
import { blackboard } from './schemas/blackboard';
import { editorialBoard } from './schemas/editorialBoard';
import { founder } from './schemas/founder';
import { yearBook } from './schemas/yearBook';
import { digitalLibrary } from './schemas/digitalLibrary';
import { journey } from './schemas/journey';
import { blog } from './schemas/blog';
import { newsletter } from './schemas/newsletter';
import { gallery } from './schemas/gallery';
import { postType } from './schemas/post';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    notice,
    blackboard,
    editorialBoard,
    founder,
    yearBook,
    digitalLibrary,
    journey,
    blog,
    newsletter,
    gallery,
    postType,
  ],
};
