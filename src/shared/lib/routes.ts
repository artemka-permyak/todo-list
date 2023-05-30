import { RoutesType } from '@/shared/model/routes'

export const routes: Record<RoutesType, string> = {
  get main() {
    return '/'
  },
  get edit() {
    return this.main + ':id'
  },
}
