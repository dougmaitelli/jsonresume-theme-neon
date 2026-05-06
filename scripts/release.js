import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const pkgPath = new URL('../package.json', import.meta.url)
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

const versionTypes = ['patch', 'minor', 'major']
const defaultBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim()

console.log(`\n  Current version: ${pkg.version}`)
console.log(`  Current branch:  ${defaultBranch}\n`)

let bumpType = null

const release = (choice) => {
  switch (choice.trim().toLowerCase()) {
    case 'p': case 'patch': bumpType = 'patch'; break
    case 'm': case 'minor': bumpType = 'minor'; break
    case 'M': case 'major': bumpType = 'major'; break
    default:
      if (versionTypes.includes(choice.trim().toLowerCase())) {
        bumpType = choice.trim().toLowerCase()
      } else {
        console.error(`  Invalid choice: ${choice}. Use p, m, or M.\n`)
        process.exit(1)
      }
  }

  const parts = pkg.version.split('.')
  const next =
    bumpType === 'major'
      ? `${parseInt(parts[0]) + 1}.0.0`
      : bumpType === 'minor'
        ? `${parts[0]}.${parseInt(parts[1]) + 1}.0`
        : `${parts[0]}.${parts[1]}.${parseInt(parts[2]) + 1}`

  console.log(`\n  => Bumping ${pkg.version} → ${next} (${bumpType})\n`)

  // 1. Bump version in package.json
  pkg.version = next
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`  [1/4] Updated package.json version to ${next}`)

  // 2. Stage and commit
  execSync(`git add package.json`, { stdio: 'inherit' })
  execSync(`git commit -m "v${next}"`, { stdio: 'inherit' })
  console.log(`  [2/4] Committed "v${next}"`)

  // 3. Create git tag
  execSync(`git tag -a "v${next}" -m "Release v${next}"`, { stdio: 'inherit' })
  console.log(`  [3/4] Tagged v${next}`)

  // 4. Publish to npm
  console.log(`  [4/4] Publishing to npm...`)
  execSync(`yarn publish --new-version ${next} --access public`, { stdio: 'inherit' })

  console.log(`\n  Published v${next} to npm!\n`)
  console.log(`  Next steps:`)
  console.log(`    git push origin ${defaultBranch}`)
  console.log(`    git push origin v${next}\n`)

  execSync(`git push origin ${defaultBranch}`, { stdio: 'inherit' })
  execSync(`git push origin v${next}`, { stdio: 'inherit' })
}

// Allow: npm run release -- --patch, npm run release -- --minor, npm run release -- --major
const arg = process.argv.find(a => a.startsWith('--'))
if (arg) {
  bumpType = arg.replace(/^--/, '')
  if (!versionTypes.includes(bumpType)) {
    console.error(`  Invalid bump type: ${bumpType}. Must be one of: ${versionTypes.join(', ')}\n`)
    process.exit(1)
  }
  release(bumpType)
} else {
  // Interactive prompt via stdin
  process.stdout.write(`  Bump type [p]atch, [m]inor, [M]ajor? (patch) `)

  const readLine = () => {
    return new Promise((resolve) => {
      process.stdin.setEncoding('utf8')
      process.stdin.resume()
      process.stdin.once('data', (chunk) => {
        const line = chunk.toString().trim()
        process.stdin.pause()
        resolve(line)
      })
    })
  }

  ;(async () => {
    const choice = await readLine()
    release(choice)
  })()
}
