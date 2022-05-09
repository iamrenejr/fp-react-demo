import { merge } from 'rxjs';
import getQuestion$ from './math/getQuestion';
import tickAnimation$ from './lightbox/tickAnimation';

export default merge(getQuestion$, tickAnimation$);
