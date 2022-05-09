import { merge, skip } from 'rxjs';

import getQuestion$ from './math/getQuestion';
import tickAnimation$ from './lightbox/tickAnimation';
import navigation$ from './core/navigation';

export default merge(
  getQuestion$,
  tickAnimation$,
  navigation$.pipe(skip(1))
);
