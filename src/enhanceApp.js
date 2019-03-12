import options from '@dynamic/redirect-options'
import { join } from 'path'

export default ({ router, siteData }) => {
  const { routes } = router.options
  const { redirectors = [] } = options

  function isRouteExists (path) {
    return routes.filter(route => route.path.toLowerCase() === path.toLowerCase()).length
  }

  // default redirectors
  if (options.locales && siteData.locales) {
    const localeKeys = Object.keys(siteData.locales)
    const locales = localeKeys.map((key) => ({
      key: key.replace(/^\/|\/$/, ''),
      lang: siteData.locales[key].lang,
    }))
    if (typeof options.locales !== 'object') {
      options.locales = {}
    }
    const { fallback, storage = true } = options.locales
    if (fallback) {
      localeKeys.unshift(fallback)
    }
    redirectors.unshift({
      storage,
      base: '/',
      alternative() {
        if (typeof navigator !== 'undefined') {
          for (const lang of (navigator.languages || [navigator.language])) {
            for (const locale of locales) {
              if (lang === locale.lang) return locale.key
            }
          }
        }
        return localeKeys
      },
    })
  }

  // resolve redirectors
  redirectors.forEach((redirector) => {
    const { base = '/', storage } = redirector
    redirector.base = base

    // resolve storage
    if (storage) {
      if (typeof storage !== 'object') {
        const key = typeof storage !== 'string'
          ? 'vuepress:redirect:' + base
          : storage
        redirector.storage = {
          get() {
            if (typeof localStorage === 'undefined') return null
            return localStorage.getItem(key)
          },
          set(val) {
            if (typeof localStorage === 'undefined') return
            localStorage.setItem(key, val)
          },
        }
      } else if (!storage.get || !storage.set) {
        // warning
        redirector.storage = null
      }
    }
  })

  router.beforeEach((to, from, next) => {
    // if router exists, skip redirection
    if (isRouteExists(to.path)) return next()

    let target

    for (const redirector of redirectors) {
      const { base, storage } = redirector
      let { alternative } = redirector
      if (!to.path.startsWith(base)) continue
      
      // get rest of the path
      // ensure ending slash at root
      const rest = to.path.slice(base.length) || '/'

      if (storage) {
        const alt = storage.get()
        if (alt) {
          const path = join(base, alt, rest)
          if (isRouteExists(path)) {
            target = path
            break
          }
        }
      }

      // resolve alternatives
      if (typeof alternative === 'function') {
        alternative = alternative(rest)
      }
      if (!alternative) continue
      if (typeof alternative === 'string') {
        alternative = [alternative]
      }

      for (const alt of alternative) {
        const path = join(base, alt, rest)
        if (isRouteExists(path)) {
          target = path
          break
        }
      }

      if (target) break
    }

    next(target)
  })

  router.afterEach((to) => {
    // if router doesn't exist, skip storage
    if (!isRouteExists(to.path)) return

    for (const redirector of redirectors) {
      const { base, storage } = redirector
      if (!storage || !to.path.startsWith(base)) continue
      const alt = to.path.slice(base.length).split('/')[0]
      if (alt) {
        storage.set(alt)
      }
    }
  })
}
