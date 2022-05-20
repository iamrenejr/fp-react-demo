import React from 'react';
import ReactDOM from 'react-dom/client';
import { pairwise, startWith } from 'rxjs';

import { identity } from '../../fp/pointfree';

export const createUI = (el, ui$) =>
  ui$
    .pipe(startWith(null), pairwise())
    .subscribe(([prevApp, app]) =>
      ReactDOM.createRoot(el).render(
        <React.StrictMode>
          {(app || prevApp).fold(identity)}
        </React.StrictMode>
      )
    );
