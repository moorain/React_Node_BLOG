export const cdnOptions = [
  { label: 'react', value: 'react' },
  { label: 'bigNumber', value: 'bigNumber' },
  { label: 'moment', value: 'moment' },
];
export const CDN_ENUM_OBJ = {
  react: {
    scripts: [
      "https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js",
      "https://cdn.staticfile.org/react-dom/17/umd/react-dom.development.js",
      "https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"
    ],
    code: ''
  },
  moment: {
    scripts: [
      "https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"
    ],
    code: `console.log('moment is added...')`
  }
}

