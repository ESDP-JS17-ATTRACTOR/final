export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3000',
      show: true,
      windowSize: '1200x900'
    }
  },
  include: {
    I: './steps_file.ts'
  },
  gherkin: {
    features: "./features/*.feature",
    steps: [
      "./step_definitions/steps.ts"
    ]
  },
  name: 'tests'
}