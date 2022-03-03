import { plugin as Slicksort } from 'vue-slicksort'

export default function installSlicksortPlugin (app) {
  app.use(Slicksort)
}
