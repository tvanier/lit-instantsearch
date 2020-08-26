const fs = require('fs')
const path = require('path')
const glob = require('glob')
const css = require('css')

const code = fs.readFileSync('node_modules/instantsearch.css/themes/algolia.css', { encoding: 'UTF8' })

const ast = css.parse(code)

function extractStyles(regexp) {
  const rules = ast.stylesheet.rules.filter(rule => rule.selectors.some(selector => regexp.test(selector)))

  return css.stringify({
    stylesheet: {
      rules: rules.map(rule => ({
        ...rule,
        selectors: rule.selectors.filter(selector => regexp.test(selector))
      }))
    }
  })
}

// extractStyles(/.ais-SearchBox/)
const poweredBy = extractStyles(/.ais-PoweredBy/)
// console.log(poweredBy)

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

const insertCssRE = /\/\* INSERT CSS selector=([\.\-\w]+) \*\//i

glob('src/**/*.js', (err, files) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`found ${files.length} files`)

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8')
    const match = insertCssRE.exec(content)
    if (match) {
      const selector = match[1]
      const styles = extractStyles(new RegExp(selector))
      content = content.replace(insertCssRE, styles)
    }

    fs.writeFileSync(path.join('dist', path.basename(file)), content)
  })
})

console.log('done')