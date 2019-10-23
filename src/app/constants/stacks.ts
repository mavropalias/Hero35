const STACKS = [
  {
    color: "#007AFF",
    featured: true,
    label: "Accessibility",
    slug: "accessibility"
  },
  {
    color: "#E23237",
    label: "Angular",
    slug: "angular"
  },
  {
    color: "#3FC8F2",
    label: "Architecture",
    slug: "architecture"
  },
  {
    color: "#F25CC1",
    featured: true,
    label: "Apollo",
    slug: "apollo"
  },
  {
    color: "#1A74E8",
    label: "App Store",
    slug: "app-store"
  },
  {
    color: "#000000",
    label: "Apple",
    slug: "apple"
  },
  {
    color: "#00979C",
    label: "Arduino",
    slug: "arduino"
  },
  {
    color: "#EB5424",
    label: "Auth0",
    slug: "auth0"
  },
  {
    color: "#FF9900",
    featured: true,
    label: "AWS",
    slug: "aws"
  },
  {
    color: "#7A3E65",
    label: "AWS Cognito",
    slug: "aws-cognito"
  },
  {
    color: "#F68536",
    label: "AWS Lambda",
    slug: "aws-lambda"
  },
  {
    color: "#0089D6",
    label: "Azure",
    slug: "azure"
  },
  {
    color: "#F9DC3E",
    label: "Babel",
    slug: "babel"
  },
  {
    color: "#000000",
    label: "Bem",
    slug: "bem"
  },
  {
    color: "#0060A9",
    label: "Bluetooth",
    slug: "bluetooth"
  },
  {
    color: "#1B598E",
    label: "C++",
    slug: "c++"
  },
  {
    color: "#A1070C",
    label: "Chai",
    slug: "chai"
  },
  {
    color: "#343434",
    label: "CircleCI",
    slug: "circleci"
  },
  {
    color: "#90B4FE",
    label: "Clojure",
    slug: "clojure"
  },
  {
    color: "#5F7FBF",
    label: "ClojureScript",
    slug: "clojurescript"
  },
  {
    color: "#FA2A00",
    label: "CocoaPods",
    slug: "cocoapods"
  },
  {
    color: "#333333",
    label: "Components",
    slug: "components"
  },
  {
    color: "#E42528",
    label: "CouchDB",
    slug: "couchdb"
  },
  {
    color: "#1072BA",
    label: "Chrome",
    slug: "chrome"
  },
  {
    color: "#264DE4",
    featured: true,
    label: "CSS",
    slug: "css"
  },
  {
    color: "#5C5C5E",
    label: "Cypress",
    slug: "cypress"
  },
  {
    color: "#F7974E",
    featured: true,
    label: "D3",
    slug: "d3"
  },
  {
    color: "#2396ED",
    label: "Docker",
    slug: "docker"
  },
  {
    color: "#2D72B8",
    label: "DynamoDB",
    slug: "dynamodb"
  },
  {
    color: "#47848F",
    label: "Electron",
    slug: "electron"
  },
  {
    color: "#5FB4CB",
    label: "Elm",
    slug: "elm"
  },
  {
    color: "#E24B31",
    label: "Ember",
    slug: "ember"
  },
  {
    color: "#F26522",
    label: "ES6",
    slug: "es6"
  },
  {
    color: "#4B32C3",
    label: "ESLint",
    slug: "eslint"
  },
  {
    color: "#8C8C8C",
    label: "Ethereum",
    slug: "ethereum"
  },
  {
    color: "#1173B6",
    label: "Expo",
    slug: "expo"
  },
  {
    color: "#000000",
    label: "Express",
    slug: "express"
  },
  {
    color: "#FCCA3F",
    label: "Firebase",
    slug: "firebase"
  },
  {
    color: "#FF6711",
    label: "Firefox",
    slug: "firefox"
  },
  {
    color: "#FFD642",
    label: "Flow",
    slug: "flow"
  },
  {
    color: "#00569E",
    label: "Flutter",
    slug: "flutter"
  },
  {
    color: "#44B74A",
    label: "Flux",
    slug: "flux"
  },
  {
    color: "#9911FF",
    label: "Framer Motion",
    slug: "framer-motion"
  },
  {
    color: "#A0ECFF",
    label: "Frontend application bundle",
    slug: "frontend-application-bundle"
  },
  {
    color: "#4285F4",
    featured: true,
    label: "Functional Programming",
    slug: "functional-programming"
  },
  {
    color: "#744C9E",
    featured: true,
    label: "Gatsby",
    slug: "gatsby"
  },
  {
    color: "#DE4C36",
    label: "Git",
    slug: "git"
  },
  {
    color: "#000000",
    label: "GitHub",
    slug: "github"
  },
  {
    color: "#F8835A",
    label: "Glimmer",
    slug: "glimmer"
  },
  {
    color: "#4285F4",
    label: "Google Cloud Platform",
    slug: "google-cloud-platform"
  },
  {
    color: "#00D3FF",
    label: "Google Play",
    slug: "google-play"
  },
  {
    color: "#7AB852",
    label: "Grails",
    slug: "grails"
  },
  {
    color: "#f25f3f",
    label: "Graphene",
    slug: "graphene"
  },
  {
    color: "#E535AB",
    featured: true,
    label: "GraphQL",
    slug: "graphql"
  },
  {
    color: "#DE4C36",
    label: "Grunt",
    slug: "grunt"
  },
  {
    color: "#D34A47",
    label: "Gulp",
    slug: "gulp"
  },
  {
    color: "#174d73",
    label: "GuessJS",
    slug: "guessjs"
  },
  {
    color: "#FFFF00",
    label: "Hadoop",
    slug: "hadoop"
  },
  {
    color: "#423426",
    label: "Handlebars",
    slug: "handlebars"
  },
  {
    color: "#F97E2F",
    label: "Haskell",
    slug: "haskell"
  },
  {
    color: "#102954",
    label: "Hasura",
    slug: "hasura"
  },
  {
    color: "#430098",
    label: "Heroku",
    slug: "heroku"
  },
  {
    color: "#86AAB2",
    featured: true,
    label: "React Hooks",
    slug: "hooks"
  },
  {
    color: "#E44D26",
    label: "HTML5",
    slug: "html5"
  },
  {
    color: "#FC4349",
    label: "Immutable",
    slug: "immutable"
  },
  {
    color: "#4E8EF7",
    label: "Ionic",
    slug: "ionic"
  },
  {
    color: "#000000",
    label: "iOS",
    slug: "ios"
  },
  {
    color: "#20C6B7",
    label: "JAMstack",
    slug: "jamstack"
  },
  {
    color: "#8A4182",
    label: "Jasmine",
    slug: "jasmine"
  },
  {
    color: "#E76F00",
    label: "Java",
    slug: "java"
  },
  {
    color: "#F7DF1E",
    label: "JavaScript",
    slug: "javascript"
  },
  {
    color: "#99425B",
    label: "Jest",
    slug: "jest"
  },
  {
    color: "#000000",
    label: "JSON",
    slug: "json"
  },
  {
    color: "#F37726",
    label: "Jupyter",
    slug: "jupyter"
  },
  {
    color: "#2181FB",
    label: "Kotlin",
    slug: "kotlin"
  },
  {
    color: "#326DE6",
    label: "Kubernetes",
    slug: "kubernetes"
  },
  {
    color: "#3492FF",
    label: "Lodash",
    slug: "lodash"
  },
  {
    color: "#343741",
    label: "Logstash",
    slug: "logstash"
  },
  {
    color: "#000000",
    label: "Markdown",
    slug: "markdown"
  },
  {
    color: "#0081CB",
    label: "Material UI",
    slug: "material-ui"
  },
  {
    color: "#00ADEF",
    label: "Microsoft",
    slug: "microsoft"
  },
  {
    color: "#EA6618",
    featured: true,
    label: "MobX",
    slug: "mobx"
  },
  {
    color: "#8D6748",
    label: "Mocha",
    slug: "mocha"
  },
  {
    color: "#529990",
    label: "MomentJs",
    slug: "momentjs"
  },
  {
    color: "#499D4A",
    label: "MongoDB",
    slug: "mongodb"
  },
  {
    color: "#00546B",
    label: "MySQL",
    slug: "mysql"
  },
  {
    color: "#000000",
    featured: true,
    label: "NextJS",
    slug: "nextjs"
  },
  {
    color: "#009639",
    label: "Nginx",
    slug: "nginx"
  },
  {
    color: "#539E43",
    label: "Node",
    slug: "node"
  },
  {
    color: "#76D04B",
    label: "Nodemon",
    slug: "nodemon"
  },
  {
    color: "#CB3837",
    label: "NPM",
    slug: "npm"
  },
  {
    color: "#48B884",
    label: "Nuxt",
    slug: "nuxt"
  },
  {
    color: "#EF7C08",
    label: "OCaml",
    slug: "ocaml"
  },
  {
    color: "#5586A4",
    label: "OpenGL",
    slug: "opengl"
  },
  {
    color: "#27346A",
    label: "Paypal",
    slug: "paypal"
  },
  {
    color: "#617186",
    featured: true,
    label: "Performance",
    slug: "performance"
  },
  {
    color: "#6181B6",
    label: "PHP",
    slug: "php"
  },
  {
    color: "#FF4081",
    label: "Polymer",
    slug: "polymer"
  },
  {
    color: "#1FD3EF",
    label: "PM2",
    slug: "pm2"
  },
  {
    color: "#336791",
    label: "PostgreSQL",
    slug: "postgresql"
  },
  {
    color: "#673AB8",
    label: "Preact",
    slug: "preact"
  },
  {
    color: "#BF85BF",
    label: "Prettier",
    slug: "prettier"
  },
  {
    color: "#5A0FC8",
    label: "Progressive Web Apps",
    slug: "progressive-web-apps"
  },
  {
    color: "#366994",
    label: "Python",
    slug: "python"
  },
  {
    color: "#EE4C2C",
    label: "PyTorch",
    slug: "pytorch"
  },
  {
    color: "#FF6600",
    label: "RabbitMQ",
    slug: "rabbitmq"
  },
  {
    color: "#00D8FF",
    label: "React",
    slug: "react"
  },
  {
    color: "#61DAFB",
    featured: true,
    label: "React Native",
    slug: "react-native"
  },
  {
    color: "#D0021B",
    label: "React Router",
    slug: "react-router"
  },
  {
    color: "#DD4B39",
    featured: true,
    label: "Reason",
    slug: "reason"
  },
  {
    color: "#C6302B",
    label: "Redis",
    slug: "redis"
  },
  {
    color: "#764ABC",
    featured: true,
    label: "Redux",
    slug: "redux"
  },
  {
    color: "#89D96D",
    label: "Redux Saga",
    slug: "redux-saga"
  },
  {
    color: "#F26B00",
    label: "Relay",
    slug: "relay"
  },
  {
    color: "#313942",
    label: "Rest",
    slug: "rest"
  },
  {
    color: "#9E0C00",
    label: "Ruby",
    slug: "ruby"
  },
  {
    color: "#FD6A00",
    label: "Rust",
    slug: "rust"
  },
  {
    color: "#ED168F",
    featured: true,
    label: "RxJS",
    slug: "rxjs"
  },
  {
    color: "#3375F8",
    label: "Safari",
    slug: "safari"
  },
  {
    color: "#CD6799",
    label: "Sass",
    slug: "sass"
  },
  {
    color: "#F26D61",
    featured: true,
    label: "Serverless",
    slug: "serverless"
  },
  {
    color: "#FDAD00",
    label: "Sketch",
    slug: "sketch"
  },
  {
    color: "#C7402B",
    label: "Solr",
    slug: "solr"
  },
  {
    color: "#FF4785",
    featured: true,
    label: "Storybook",
    slug: "storybook"
  },
  {
    color: "#FFB13B",
    label: "SVG",
    slug: "svg"
  },
  {
    color: "#F05138",
    label: "Swift",
    slug: "swift"
  },
  {
    color: "#FFA800",
    label: "TensorFlow",
    slug: "tensorflow"
  },
  {
    color: "#000000",
    label: "Terminal",
    slug: "terminal"
  },
  {
    color: "#93232C",
    label: "Travis CI",
    slug: "travis-ci"
  },
  {
    color: "#55ACEE",
    label: "Twitter",
    slug: "twitter"
  },
  {
    color: "#007ACC",
    featured: true,
    label: "TypeScript",
    slug: "typescript"
  },
  {
    color: "#222C37",
    label: "Unity",
    slug: "unity"
  },
  {
    color: "#019833",
    label: "Vim",
    slug: "vim"
  },
  {
    color: "#30A3F1",
    label: "Visual Studio Code",
    slug: "visual-studio-code"
  },
  {
    color: "#41B883",
    label: "Vue",
    slug: "vue"
  },
  {
    color: "#654FF0",
    featured: true,
    label: "WebAssembly",
    slug: "webassembly"
  },
  {
    color: "#E44D26",
    label: "WebComponents",
    slug: "webcomponents"
  },
  {
    color: "#1C78C0",
    featured: true,
    label: "Webpack",
    slug: "webpack"
  },
  {
    color: "#00ADEF",
    label: "Windows",
    slug: "windows"
  },
  {
    color: "#464342",
    label: "Wordpress",
    slug: "wordpress"
  },
  {
    color: "#2D2E47",
    label: "Xstate",
    slug: "xstate"
  },
  {
    color: "#368FB9",
    label: "Yarn",
    slug: "yarn"
  }
];

export default STACKS;
