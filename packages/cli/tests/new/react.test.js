const {createCommonFilesAndFolders} = require('../../new/utils/createCommonFiles')
const {addLinter} = require('../../new/utils/addLinter')
const {installReactTesting} = require('../../new/utils/addReactTesting')
const {e2eSetup} = require('../../new/utils/addEndToEndTesting')
const {newProjectInstructions} = require('../../new/utils/newProjectInstructions')
const {createBackend} = require('../../new/backend');
const store = require('../../new/store')
const helpers = require('../../helpers')
const reactMod = require('../../new/react')
const addAPIScripts = require('../../new/utils/addAPIScript')
const {
  react,
  cssLibrary,
  createSrcContents,
  reactOnly,
  reactRouter,
  redux,
  reactRouterRedux,
  scripts,
  reactScripts,
  reactRouterScripts,
  reduxScripts,
  reactRouterReduxScripts,
  packages,
  createWebpack
} = require('../../new/react')

jest.mock('../../new/utils/createCommonFiles')
jest.mock('../../helpers')
jest.mock('../../new/utils/addEndToEndTesting')
jest.mock('../../new/backend')
jest.mock('../../new/utils/addLinter')
jest.mock('../../new/utils/addEndToEndTesting')
jest.mock('../../new/utils/addReactTesting')
jest.mock('../../new/utils/newProjectInstructions')
jest.mock('../../new/utils/createCommonFiles', () => ({
  createCommonFilesAndFolders: jest.fn()
}))
jest.mock('../../new/utils/addAPIScript')

describe('new/react', () => {

  describe('react', () => {

    it('calls createCommonFilesAndFolders', () => {
      helpers.mkdirSync.mockReturnValue(true)
      helpers.writeFile.mockReturnValue(true)

      react()

      expect(createCommonFilesAndFolders).toBeCalled()
    })

    it('creates react folder structure', () => {
      const mockMkdirSync = helpers.mkdirSync.mockReturnValue(true)

      react()

      expect(mockMkdirSync).toBeCalledTimes(3)
      expect(mockMkdirSync.mock.calls[0][0]).toEqual("dist")
      expect(mockMkdirSync.mock.calls[1][0]).toEqual("src")
      expect(mockMkdirSync.mock.calls[2][0]).toEqual("src/api")
    })

    it('calls createSrcContents', () => {
      const mockCreate = reactMod.createSrcContents = jest.fn()
      mockCreate.mockReturnValue(true)

      react()

      expect(mockCreate).toBeCalled()
    })

    it('creates config files, postcss and .babelrc', () => {
      const mockWrite = helpers.writeFile.mockReturnValue(true)
      const mockCreateWebpack = reactMod.createWebpack = jest.fn()
      const mockScripts = reactMod.scripts = jest.fn()
      mockCreateWebpack.mockReturnValue(true)
      mockScripts.mockReturnValue(true)

      react()

      expect(mockWrite).toBeCalled()
      expect(mockWrite).toBeCalledTimes(2)
      expect(mockWrite.mock.calls[0][0]).toEqual('postcss.config.js')
      expect(mockWrite.mock.calls[1][0]).toEqual('.babelrc')
    })

    it('calls createWebpack', () => {
      const mockCreateWebpack = reactMod.createWebpack = jest.fn()
      mockCreateWebpack.mockReturnValue(true)

      react()

      expect(mockCreateWebpack).toBeCalled()
    })

    it('calls addLinter', () => {
      react()
      expect(addLinter).toBeCalled()
    })

    it('calls cssLibrary', () => {
      const mockCssLibrary = reactMod.cssLibrary = jest.fn()
      mockCssLibrary.mockReturnValue(true)

      react()

      expect(mockCssLibrary).toBeCalled()
    })

    it('calls installReactTesting', () => {
      react()
      expect(installReactTesting).toBeCalled()
    })

    it('calls e2eSetup', () => {
      react()
      expect(e2eSetup).toBeCalled()
    })

    it('calls scripts', () => {
      const mockScripts = reactMod.scripts = jest.fn()
      mockScripts.mockReturnValue(true)

      react()

      expect(mockScripts).toBeCalled()
    })

    it('calls packages', () => {
      const mockPackages = reactMod.packages = jest.fn()
      mockPackages.mockReturnValue(true)

      react()

      expect(mockPackages).toBeCalled()
    })

    it('sets backendType and calls createBackend if backend is added to store', () => {
      store.backend = {backend: true}

      react()

      expect(store.backendType).toEqual('standard')
      expect(createBackend).toBeCalled()
    })

    it('calls installAllPackages and newProjectInstructions if no backend selected', () => {
      store.backend = {backend: false}
      const mockInstallAllPackages = helpers.installAllPackages = jest.fn()
      mockInstallAllPackages.mockReturnValue(true)

      react()

      expect(mockInstallAllPackages).toBeCalled()
      expect(newProjectInstructions).toBeCalled()
    })
  })

  describe('cssLibrary', () => {
    it('adds @material-ui/core to store.devDependencies if material is in the store', () => {
      store.reactCSS = 'material'

      cssLibrary()

      expect(helpers.addDependenciesToStore).toBeCalledWith('@material-ui/core', 'dev')
    })

    it('adds react-bootstrap to store.devDependencies if bootstrap is in the store', () => {
      store.reactCSS = 'bootstrap'

      cssLibrary()

      expect(helpers.addDependenciesToStore).toBeCalledWith("react-bootstrap", "dev")
    })

    it('adds styled-components to store.devDependencies if styled is in the store', () => {
      store.reactCSS = 'styled'

      cssLibrary()

      expect(helpers.addDependenciesToStore).toBeCalledWith('styled-components', 'dev')
    })
  })

  describe('createSrcContents', () => {
    afterEach(() => {
      store.reactType = ''
    })

    it('calls reactOnly if react is selected', () => {
      const mockReactOnly = reactMod.reactOnly = jest.fn().mockReturnValue(true)
      store.reactType = 'react'

      createSrcContents()

      expect(mockReactOnly).toBeCalled()
    })

    it('calls reactRouter if react-router is selected', () => {
      const mockreactRouter = reactMod.reactRouter = jest.fn().mockReturnValue(true)
      store.reactType = 'react-router'

      createSrcContents()

      expect(mockreactRouter).toBeCalled()
    })

    it('calls redux if redux is selected', () => {
      const mockredux = reactMod.redux = jest.fn()
      mockredux.mockReturnValue(true)
      store.reactType = 'redux'

      createSrcContents()

      expect(mockredux).toBeCalled()
    })

    it('calls reactRouterRedux if reactRouter-redux is selected', () => {
      const mockReactRouterRedux = reactMod.reactRouterRedux = jest.fn().mockReturnValue(true)
      store.reactType = 'reactRouter-redux'

      createSrcContents()

      expect(mockReactRouterRedux).toBeCalled()
    })
  })

  describe('reactOnly', () => {

    it('creates a src/App directory', () => {
      const mockMkdirSync = helpers.mkdirSync = jest.fn()
      helpers.writeFile = jest.fn().mockReturnValue(true)

      reactOnly()

      expect(mockMkdirSync).toBeCalled()
      expect(mockMkdirSync.mock.calls[0][0]).toEqual('src/App')
    })

    it('creates index.js, App.js and App.css', () => {
      const mockWriteFile = helpers.writeFile = jest.fn()
      helpers.mkdirSync = jest.fn().mockReturnValue(true)

      reactOnly()

      expect(mockWriteFile).toBeCalled()
      expect(mockWriteFile).toBeCalledTimes(3)
      expect(mockWriteFile.mock.calls[0][0]).toEqual('src/index.js')
      expect(mockWriteFile.mock.calls[1][0]).toEqual('src/App/App.js')
      expect(mockWriteFile.mock.calls[2][0]).toEqual('src/App/App.css')
    })
  })

  describe('reactRouter', () => {
    it('creates components, Navbar, views, and styles directories', () => {
      const mockMkdirSync = helpers.mkdirSync = jest.fn()
      helpers.writeFile = jest.fn().mockReturnValue(true)

      reactRouter()

      expect(mockMkdirSync).toBeCalled()
      expect(mockMkdirSync).toBeCalledTimes(4)
      expect(mockMkdirSync.mock.calls[0][0]).toEqual('src/components')
      expect(mockMkdirSync.mock.calls[1][0]).toEqual('src/components/Navbar')
      expect(mockMkdirSync.mock.calls[2][0]).toEqual('src/views')
      expect(mockMkdirSync.mock.calls[3][0]).toEqual('src/styles')
    })

    it('creates reactRouter files', () => {
      const mockWriteFile = helpers.writeFile = jest.fn()
      helpers.mkdirSync = jest.fn().mockReturnValue(true)

      reactRouter()

      expect(mockWriteFile).toBeCalled()
      expect(mockWriteFile).toBeCalledTimes(6)
      expect(mockWriteFile.mock.calls[0][0]).toEqual('src/index.js')
      expect(mockWriteFile.mock.calls[1][0]).toEqual('src/Router.js')
      expect(mockWriteFile.mock.calls[2][0]).toEqual('src/components/Navbar/Navbar.js')
      expect(mockWriteFile.mock.calls[3][0]).toEqual('src/components/Navbar/Navbar.css')
      expect(mockWriteFile.mock.calls[4][0]).toEqual('src/views/Home.js')
      expect(mockWriteFile.mock.calls[5][0]).toEqual('src/styles/global.css')
    })

    it('adds devDependencies to the store', () => {
      helpers.writeFile = jest.fn().mockReturnValue(true)
      helpers.mkdirSync = jest.fn().mockReturnValue(true)

      reactRouter()

      expect(helpers.addDependenciesToStore).toBeCalledWith('react-router-dom', 'dev')
    })
  })

  describe('redux', () => {
    it('creates App, actions and reducers directories', () => {
      const mockMkdirSync = helpers.mkdirSync = jest.fn()
      helpers.writeFile = jest.fn().mockReturnValue(true)

      redux()

      expect(mockMkdirSync).toBeCalled()
      expect(mockMkdirSync).toBeCalledTimes(3)
      expect(mockMkdirSync.mock.calls[0][0]).toEqual('src/App')
      expect(mockMkdirSync.mock.calls[1][0]).toEqual('src/actions')
      expect(mockMkdirSync.mock.calls[2][0]).toEqual('src/reducers')
    })

    it('creates redux files', () => {
      const mockWriteFile = helpers.writeFile = jest.fn()
      helpers.mkdirSync = jest.fn().mockReturnValue(true)

      redux()

      expect(mockWriteFile).toBeCalled()
      expect(mockWriteFile).toBeCalledTimes(7)
      expect(mockWriteFile.mock.calls[0][0]).toEqual('src/index.js')
      expect(mockWriteFile.mock.calls[1][0]).toEqual('src/App/App.js')
      expect(mockWriteFile.mock.calls[2][0]).toEqual('src/App/AppContainer.js')
      expect(mockWriteFile.mock.calls[3][0]).toEqual('src/App/App.css')
      expect(mockWriteFile.mock.calls[4][0]).toEqual('src/actions/index.js')
      expect(mockWriteFile.mock.calls[5][0]).toEqual('src/reducers/rootReducer.js')
      expect(mockWriteFile.mock.calls[6][0]).toEqual('src/configStore.js')
    })

    it('adds devDependencies to the store', () => {
      helpers.writeFile = jest.fn().mockReturnValue(true)
      helpers.mkdirSync = jest.fn().mockReturnValue(true)

      redux()

      expect(helpers.addDependenciesToStore).toBeCalledWith('redux react-redux', 'dev')
    })
  })

  describe('reactRouterRedux', () => {
    it('creates reactRouterRedux folders', () => {
      const mockMkdirSync = helpers.mkdirSync = jest.fn()
      helpers.writeFile = jest.fn().mockReturnValue(true)

      reactRouterRedux()

      expect(mockMkdirSync).toBeCalled()
      expect(mockMkdirSync).toBeCalledTimes(6)
      expect(mockMkdirSync.mock.calls[0][0]).toEqual('src/components')
      expect(mockMkdirSync.mock.calls[1][0]).toEqual('src/components/Navbar')
      expect(mockMkdirSync.mock.calls[2][0]).toEqual('src/views')
      expect(mockMkdirSync.mock.calls[3][0]).toEqual('src/styles')
      expect(mockMkdirSync.mock.calls[4][0]).toEqual('src/actions')
      expect(mockMkdirSync.mock.calls[5][0]).toEqual('src/reducers')
    })

    it('creates reactRouterRedux files', () => {
      const mockWriteFile = helpers.writeFile = jest.fn()
      helpers.mkdirSync = jest.fn().mockReturnValue(true)

      reactRouterRedux()

      expect(mockWriteFile).toBeCalled()
      expect(mockWriteFile).toBeCalledTimes(10)
      expect(mockWriteFile.mock.calls[0][0]).toEqual('src/index.js')
      expect(mockWriteFile.mock.calls[1][0]).toEqual('src/Router.js')
      expect(mockWriteFile.mock.calls[2][0]).toEqual('src/components/Navbar/Navbar.js')
      expect(mockWriteFile.mock.calls[3][0]).toEqual('src/components/Navbar/NavbarContainer.js')
      expect(mockWriteFile.mock.calls[4][0]).toEqual('src/components/Navbar/Navbar.css')
      expect(mockWriteFile.mock.calls[5][0]).toEqual('src/views/Home.js')
      expect(mockWriteFile.mock.calls[6][0]).toEqual('src/styles/global.css')
      expect(mockWriteFile.mock.calls[7][0]).toEqual('src/actions/index.js')
      expect(mockWriteFile.mock.calls[8][0]).toEqual('src/reducers/rootReducer.js')
      expect(mockWriteFile.mock.calls[9][0]).toEqual('src/configStore.js')
    })

    it('adds devDependencies to the store', () => {
      helpers.writeFile = jest.fn().mockReturnValue(true)
      helpers.mkdirSync = jest.fn().mockReturnValue(true)

      reactRouterRedux()

      expect(helpers.addDependenciesToStore).toBeCalledWith('redux react-redux react-router-dom', 'dev')
    })
  })

  describe('scripts', () => {
    it('adds webpack-dev-server script to packageJson if backend is not selected', () => {
      const mockaddScriptToPackageJSON = helpers.addScriptToPackageJSON = jest.fn()
      helpers.writeFile = jest.fn().mockReturnValue(true)
      store.backend = {backend: false}

      scripts()

      expect(mockaddScriptToPackageJSON).toBeCalled()
      expect(mockaddScriptToPackageJSON).toBeCalledTimes(3)
      expect(mockaddScriptToPackageJSON.mock.calls[0][0]).toEqual('start')
      expect(mockaddScriptToPackageJSON.mock.calls[0][1]).toEqual("webpack-dev-server --output-public-path=/dist/ --inline --hot --open --port 3000 --mode='development'")
    })

    it('creates an index.html if backend is not selected', () => {
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)
      const mockWrite = helpers.writeFile = jest.fn()
      store.backend = {backend: false}

      scripts()

      expect(mockWrite).toBeCalled()
      expect(mockWrite).toBeCalledTimes(1)
      expect(mockWrite.mock.calls[0][0]).toEqual('index.html')
    })

    it('Only creates dev and build scripts if backend is selected', () => {
      const mockaddScriptToPackageJSON = helpers.addScriptToPackageJSON = jest.fn()
      store.backend = {backend: true}

      scripts()

      expect(mockaddScriptToPackageJSON).toBeCalled()
      expect(mockaddScriptToPackageJSON).toBeCalledTimes(2)
      expect(mockaddScriptToPackageJSON.mock.calls[0]).toEqual(["dev", "webpack --watch --mode='development'"])
      expect(mockaddScriptToPackageJSON.mock.calls[1]).toEqual(["build", "webpack --mode='production'"])
    })

    it('calls reactScripts if reactType is react', () => {
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)
      const mockReactScripts = reactMod.reactScripts = jest.fn().mockReturnValue(true)
      store.backend = {backend: true}
      store.reactType = 'react'

      scripts()

      expect(mockReactScripts).toBeCalled()
    })

    it('calls reactRouterScripts if reactType is react-router', () => {
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)
      const mockReactScripts = reactMod.reactRouterScripts = jest.fn().mockReturnValue(true)
      store.backend = {backend: true}
      store.reactType = 'react-router'

      scripts()

      expect(mockReactScripts).toBeCalled()
    })

    it('calls reduxScripts if reactType is redux', () => {
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)
      const mockReactScripts = reactMod.reduxScripts = jest.fn().mockReturnValue(true)
      store.backend = {backend: true}
      store.reactType = 'redux'

      scripts()

      expect(mockReactScripts).toBeCalled()
    })

    it('calls reactRouterReduxScripts if reactType is reactRouterRedux', () => {
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)
      const mockReactScripts = reactMod.reactRouterReduxScripts = jest.fn().mockReturnValue(true)
      store.backend = {backend: true}
      store.reactType = 'reactRouter-redux'

      scripts()

      expect(mockReactScripts).toBeCalled()
    })

    it('calls addAPIScript', () => {
      scripts()

      expect(addAPIScripts).toBeCalled()
    })
  })

  describe('reactScripts', () => {
    it('creates reactScript files', () => {
      const mockWrite = helpers.writeFile = jest.fn()
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)

      reactScripts()

      expect(mockWrite).toBeCalled()
      expect(mockWrite).toBeCalledTimes(3)
      expect(mockWrite.mock.calls[0][0]).toEqual('scripts/component.js')
      expect(mockWrite.mock.calls[1][0]).toEqual('scripts/templates/statefulComponent.js')
      expect(mockWrite.mock.calls[2][0]).toEqual('scripts/templates/statelessComponent.js')
    })

    it('adds scripts to new package.json', () => {
      helpers.writeFile = jest.fn().mockReturnValue(true)
      const mockaddScriptToPackageJSON = helpers.addScriptToPackageJSON = jest.fn()

      reactScripts()

      expect(mockaddScriptToPackageJSON).toBeCalled()
      expect(mockaddScriptToPackageJSON.mock.calls[0]).toEqual(['component', 'node scripts/component.js'])
    })
  })

  describe('reactRouterScripts', () => {
    it('creates reactRouter Script files', () => {
      const mockWrite = helpers.writeFile = jest.fn()
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)

      reactRouterScripts()

      expect(mockWrite).toBeCalled()
      expect(mockWrite).toBeCalledTimes(4)
      expect(mockWrite.mock.calls[0][0]).toEqual('scripts/component.js')
      expect(mockWrite.mock.calls[1][0]).toEqual('scripts/templates/statefulComponent.js')
      expect(mockWrite.mock.calls[2][0]).toEqual('scripts/templates/statelessComponent.js')
      expect(mockWrite.mock.calls[3][0]).toEqual('scripts/view.js')
    })

    it('adds scripts to new package.json', () => {
      helpers.writeFile = jest.fn().mockReturnValue(true)
      const mockaddScriptToPackageJSON = helpers.addScriptToPackageJSON = jest.fn()

      reactRouterScripts()

      expect(mockaddScriptToPackageJSON).toBeCalled()
      expect(mockaddScriptToPackageJSON).toBeCalledTimes(2)
      expect(mockaddScriptToPackageJSON.mock.calls[0]).toEqual(['component', 'node scripts/component.js'])
      expect(mockaddScriptToPackageJSON.mock.calls[1]).toEqual(['view', 'node scripts/view.js'])
    })
  })

  describe('reduxScripts', () => {
    it('creates redux Script files', () => {
      const mockWrite = helpers.writeFile = jest.fn()
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)

      reduxScripts()

      expect(mockWrite).toBeCalled()
      expect(mockWrite).toBeCalledTimes(7)
      expect(mockWrite.mock.calls[0][0]).toEqual('scripts/action.js')
      expect(mockWrite.mock.calls[1][0]).toEqual('scripts/templates/action.js')
      expect(mockWrite.mock.calls[2][0]).toEqual('scripts/templates/reducer.js')
      expect(mockWrite.mock.calls[3][0]).toEqual('scripts/component.js')
      expect(mockWrite.mock.calls[4][0]).toEqual('scripts/templates/statefulComponent.js')
      expect(mockWrite.mock.calls[5][0]).toEqual('scripts/templates/statelessComponent.js')
      expect(mockWrite.mock.calls[6][0]).toEqual('scripts/templates/container.js')
    })

    it('adds scripts to new package.json', () => {
      helpers.writeFile = jest.fn().mockReturnValue(true)
      const mockaddScriptToPackageJSON = helpers.addScriptToPackageJSON = jest.fn()

      reduxScripts()

      expect(mockaddScriptToPackageJSON).toBeCalled()
      expect(mockaddScriptToPackageJSON).toBeCalledTimes(2)
      expect(mockaddScriptToPackageJSON.mock.calls[0]).toEqual(['component', 'node scripts/component.js'])
      expect(mockaddScriptToPackageJSON.mock.calls[1]).toEqual(['action', 'node scripts/action.js'])
    })
  })

  describe('reactRouterReduxScripts', () => {
    it('creates redux Script files', () => {
      const mockWrite = helpers.writeFile = jest.fn()
      helpers.addScriptToPackageJSON = jest.fn().mockReturnValue(true)

      reactRouterReduxScripts()

      expect(mockWrite).toBeCalled()
      expect(mockWrite).toBeCalledTimes(8)
      expect(mockWrite.mock.calls[0][0]).toEqual('scripts/action.js')
      expect(mockWrite.mock.calls[1][0]).toEqual('scripts/templates/action.js')
      expect(mockWrite.mock.calls[2][0]).toEqual('scripts/templates/reducer.js')
      expect(mockWrite.mock.calls[3][0]).toEqual('scripts/component.js')
      expect(mockWrite.mock.calls[4][0]).toEqual('scripts/templates/statefulComponent.js')
      expect(mockWrite.mock.calls[5][0]).toEqual('scripts/templates/statelessComponent.js')
      expect(mockWrite.mock.calls[6][0]).toEqual('scripts/templates/container.js')
      expect(mockWrite.mock.calls[7][0]).toEqual('scripts/view.js')
    })

    it('adds scripts to new package.json', () => {
      helpers.writeFile = jest.fn().mockReturnValue(true)
      const mockaddScriptToPackageJSON = helpers.addScriptToPackageJSON = jest.fn()

      reactRouterReduxScripts()

      expect(mockaddScriptToPackageJSON).toBeCalled()
      expect(mockaddScriptToPackageJSON).toBeCalledTimes(3)
      expect(mockaddScriptToPackageJSON.mock.calls[0]).toEqual(['component', 'node scripts/component.js'])
      expect(mockaddScriptToPackageJSON.mock.calls[1]).toEqual(['action', 'node scripts/action.js'])
      expect(mockaddScriptToPackageJSON.mock.calls[2]).toEqual(['view', 'node scripts/view.js'])
    })
  })

  describe('packages', () => {
    it('adds webpack-dev-server as a devDependency if backend is not selected', () => {
      store.backend = {backend: false}

      packages()

      expect(helpers.addDependenciesToStore).toBeCalledWith('webpack-dev-server', 'dev')
      expect(helpers.addDependenciesToStore).toBeCalledWith('react react-dom webpack webpack-cli babel-loader css-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/runtime style-loader sass-loader node-sass extract-text-webpack-plugin cssnano postcss postcss-preset-env postcss-import postcss-loader', 'dev')
    })

    it('only adds devDependencies to the store if backend is selected', () => {
      store.backend = {backend: true}

      packages()

      expect(helpers.addDependenciesToStore).not.toBeCalledWith('react react-dom webpack webpack-cli babel-loader css-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/runtime style-loader sass-loader node-sass extract-text-webpack-plugin cssnano postcss postcss-preset-env postcss-import postcss-loader')
    })
  })

  describe('createWebpack', () => {
    it('sets up webpack with hot reloading if backend is selected', () => {
      const mockWrite = helpers.writeFile = jest.fn()
      const mockAppend = helpers.appendFile = jest.fn()
      store.backend = {backend: true}

      createWebpack()

      expect(mockWrite).toBeCalled()
      expect(mockWrite.mock.calls[0][0]).toEqual('webpack.config.js')
      expect(mockWrite.mock.calls[0][1]).toContain('webpack.HotModuleReplacementPlugin()')
      expect(mockAppend.mock.calls[0][0]).toEqual('src/index.js')
      expect(mockAppend.mock.calls[0][1]).toEqual('\nif (module.hot) {\n\tconsole.clear()\n\tmodule.hot.accept();\n}')
    })

    it('creates a default webpack config if backend is not selected', () => {
      const mockWrite = helpers.writeFile = jest.fn()
      store.backend = {backend: false}

      createWebpack()

      expect(mockWrite).toBeCalled()
      expect(mockWrite.mock.calls[0][0]).toEqual('webpack.config.js')
      expect(mockWrite.mock.calls[0][1]).not.toContain('webpack.HotModuleReplacementPlugin()')

    })
  })

})

