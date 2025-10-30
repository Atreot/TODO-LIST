// routes.ts
import type { RouteObject } from 'react-router-dom';
import { UiTaskCardDetail } from '../Components/UiTaskCardDetail/UiTaskCardDetail';



export const routes: RouteObject[] = [

  {
    path: '/TaskCards/:id',
    element: <UiTaskCardDetail/>,
  },

];