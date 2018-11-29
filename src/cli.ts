#!/usr/bin/env node

import {createProject} from './index'
import * as chokidar from 'chokidar'

const argv = require('yargs')
    .demandCommand(1)
    .describe('reducers', 'Directory for reducers')
    .alias('r', 'reducers')
    .nargs('r', 1)
    .describe('nodevtools', 'Disable Redux Devtools integration from the React Context API components')
    .alias('n', 'nodevtools')
    .describe('watch', 'Watch directory for changes')
    .alias('w', 'watch')
    .argv
    
const args = process.argv.slice(2);
if( args.length === 0 ) {
  console.log('ts2redux <directory>')
  process.exit()
}
const state = {
  is_running : false
}
const compileProject = async (eventArgs) => {
  if(state.is_running) return
  console.log('Compiling path: ', args[0])
  console.log(eventArgs)
  state.is_running = true
  await createProject({
    path: args[0],
    reducerPath : argv.reducers || 'reducers',
    disableDevtoolsFromContext : argv.n,
  }) 
  setTimeout(
    () => {
      state.is_running = false 
    },100)
}
const start = async() => {
  await compileProject(null)
  if( argv.watch ) {
    const watcher = chokidar.watch( args[0], {
      ignored:'*.tsx'
    })
    watcher
    .on('add', compileProject)
    .on('change', compileProject)
    .on('unlink', compileProject);
  }  
}
start()

