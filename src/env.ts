import fs from 'fs'
import path from 'path'

interface Environment {
  [envVar: string]: number | string | string[] | number[]
}

function getEnvVar(
  varName: string,
  value: string | number | string[] | number[]
) {
  let valueStr = value.toString()

  if (Array.isArray(value)) {
    valueStr = value.map((v) => v.toString()).join(',')
  }

  return `${varName}=${valueStr}`
}

function getEnv(environment: Environment) {
  return Object.keys(environment)
    .map((key) => getEnvVar(key, environment[key]))
    .join('\n')
}

function getExampleEnv(environment: Environment) {
  return Object.keys(environment)
    .map((key) => {
      if (Array.isArray(environment[key])) {
        return getEnvVar(key, '"toBeModified, toBeModified"')
      }

      return getEnvVar(key, 'toBeModified')
    })
    .join('\n')
}

function writeEnv(environment: Environment, targetPath: string) {
  if (!fs.existsSync(targetPath)) {
    const dir = path.dirname(targetPath)
    fs.mkdirSync(dir)
  }

  const envContents = getEnv(environment)
  const envExampleContents = getExampleEnv(environment)

  fs.writeFileSync(targetPath, envContents)
  fs.writeFileSync(targetPath + '.example', envExampleContents)
}

export default writeEnv
