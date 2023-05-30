import { MainPage } from '@/pages/main'
import { EditPage } from '@/pages/edit'
import { routes } from '@/shared/lib/routes'

export default [
  { path: routes.main, component: MainPage },
  { path: routes.edit, component: EditPage },
]
